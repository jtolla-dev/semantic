import logging
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import and_, func, select
from sqlalchemy.orm import selectinload

from app.auth import get_tenant_context, TenantContext
from app.models import (
    Chunk,
    Document,
    DocumentExposure,
    File,
    SensitivityFinding,
    Share,
)
from app.schemas import (
    AccessSummary,
    ChunkSearchResult,
    DashboardMetrics,
    DocumentDetailResponse,
    FindSensitiveContentRequest,
    FindSensitiveContentResponse,
    SearchChunksRequest,
    SearchChunksResponse,
    SensitiveContentItem,
    SensitivityFindingDetail,
)

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/sensitivity/find", response_model=FindSensitiveContentResponse)
async def find_sensitive_content(
    request: FindSensitiveContentRequest,
    ctx: TenantContext = Depends(get_tenant_context),
) -> FindSensitiveContentResponse:
    """
    Find documents with sensitive content, filtered by scope, sensitivity types,
    and exposure levels.
    """
    # Base query for documents with exposure
    query = (
        select(Document, DocumentExposure, File, Share)
        .join(DocumentExposure, DocumentExposure.document_id == Document.id)
        .join(File, File.id == Document.file_id)
        .join(Share, Share.id == File.share_id)
        .where(Document.tenant_id == ctx.tenant_id)
    )

    # Apply scope filters
    if request.scope:
        if request.scope.share_id:
            query = query.where(File.share_id == request.scope.share_id)
        if request.scope.path_prefix:
            query = query.where(
                File.relative_path.startswith(request.scope.path_prefix)
            )

    # Apply exposure level filter
    if request.exposure_levels:
        query = query.where(
            DocumentExposure.exposure_level.in_(request.exposure_levels)
        )

    # Apply sensitivity type filter - requires subquery
    if request.sensitivity_types:
        subq = (
            select(SensitivityFinding.document_id)
            .where(
                SensitivityFinding.tenant_id == ctx.tenant_id,
                SensitivityFinding.sensitivity_type.in_(request.sensitivity_types),
            )
            .distinct()
        )
        query = query.where(Document.id.in_(subq))

    # Get total count
    count_query = select(func.count()).select_from(query.subquery())
    total_result = await ctx.session.execute(count_query)
    total = total_result.scalar() or 0

    # Apply pagination
    offset = (request.page - 1) * request.page_size
    query = query.offset(offset).limit(request.page_size)
    query = query.order_by(DocumentExposure.exposure_score.desc())

    # Execute query
    result = await ctx.session.execute(query)
    rows = result.fetchall()

    # Build response items
    items = []
    for doc, exposure, file, share in rows:
        # Get sensitivity summary for this document
        sens_result = await ctx.session.execute(
            select(
                SensitivityFinding.sensitivity_type,
                func.count(SensitivityFinding.id),
            )
            .where(SensitivityFinding.document_id == doc.id)
            .group_by(SensitivityFinding.sensitivity_type)
        )
        sens_counts = {row[0].value: row[1] for row in sens_result.fetchall()}

        items.append(
            SensitiveContentItem(
                document_id=doc.id,
                file_id=file.id,
                share_id=share.id,
                relative_path=file.relative_path,
                file_type=file.file_type,
                sensitivity_summary=sens_counts,
                exposure_level=exposure.exposure_level,
                exposure_score=exposure.exposure_score,
                access_summary=AccessSummary(**exposure.access_summary),
            )
        )

    return FindSensitiveContentResponse(
        items=items,
        page=request.page,
        page_size=request.page_size,
        total=total,
    )


@router.post("/search/chunks", response_model=SearchChunksResponse)
async def search_chunks(
    request: SearchChunksRequest,
    ctx: TenantContext = Depends(get_tenant_context),
) -> SearchChunksResponse:
    """
    Search for chunks matching a query.
    For v0, this is simple text search. Embeddings-based search can be added later.
    """
    # Build search query
    search_term = f"%{request.query}%"

    query = (
        select(Chunk, Document, File)
        .join(Document, Document.id == Chunk.document_id)
        .join(File, File.id == Document.file_id)
        .where(
            Chunk.tenant_id == ctx.tenant_id,
            Chunk.text.ilike(search_term),
        )
    )

    # Apply scope filters
    if request.scope:
        if request.scope.share_id:
            query = query.where(File.share_id == request.scope.share_id)
        if request.scope.path_prefix:
            query = query.where(
                File.relative_path.startswith(request.scope.path_prefix)
            )

    # Limit results
    query = query.limit(request.k)

    # Execute query
    result = await ctx.session.execute(query)
    rows = result.fetchall()

    # Build response
    results = []
    for chunk, doc, file in rows:
        # Create a snippet from the chunk text
        snippet = chunk.text[:200] + "..." if len(chunk.text) > 200 else chunk.text

        results.append(
            ChunkSearchResult(
                chunk_id=chunk.id,
                document_id=doc.id,
                file_id=file.id,
                relative_path=file.relative_path,
                snippet=snippet,
                score=1.0,  # No real scoring for text search in v0
            )
        )

    return SearchChunksResponse(results=results)


@router.get("/dashboard/metrics", response_model=DashboardMetrics)
async def get_dashboard_metrics(
    ctx: TenantContext = Depends(get_tenant_context),
) -> DashboardMetrics:
    """Get dashboard metrics for the authenticated tenant."""
    # Total files
    result = await ctx.session.execute(
        select(func.count(File.id)).where(
            File.tenant_id == ctx.tenant_id,
            File.deleted == False,  # noqa: E712
        )
    )
    total_files = result.scalar() or 0

    # Total documents
    result = await ctx.session.execute(
        select(func.count(Document.id)).where(Document.tenant_id == ctx.tenant_id)
    )
    total_documents = result.scalar() or 0

    # Documents with findings
    result = await ctx.session.execute(
        select(func.count(func.distinct(SensitivityFinding.document_id))).where(
            SensitivityFinding.tenant_id == ctx.tenant_id
        )
    )
    documents_with_findings = result.scalar() or 0

    # High exposure documents
    result = await ctx.session.execute(
        select(func.count(DocumentExposure.id)).where(
            DocumentExposure.tenant_id == ctx.tenant_id,
            DocumentExposure.exposure_level == "HIGH",
        )
    )
    high_exposure_documents = result.scalar() or 0

    # Findings by type
    result = await ctx.session.execute(
        select(
            SensitivityFinding.sensitivity_type,
            func.count(SensitivityFinding.id),
        )
        .where(SensitivityFinding.tenant_id == ctx.tenant_id)
        .group_by(SensitivityFinding.sensitivity_type)
    )
    findings_by_type = {row[0].value: row[1] for row in result.fetchall()}

    # Documents by exposure level
    result = await ctx.session.execute(
        select(
            DocumentExposure.exposure_level,
            func.count(DocumentExposure.id),
        )
        .where(DocumentExposure.tenant_id == ctx.tenant_id)
        .group_by(DocumentExposure.exposure_level)
    )
    documents_by_exposure = {row[0].value: row[1] for row in result.fetchall()}

    return DashboardMetrics(
        total_files=total_files,
        total_documents=total_documents,
        documents_with_findings=documents_with_findings,
        high_exposure_documents=high_exposure_documents,
        findings_by_type=findings_by_type,
        documents_by_exposure=documents_by_exposure,
    )


@router.get("/documents/{document_id}", response_model=DocumentDetailResponse)
async def get_document_detail(
    document_id: UUID,
    ctx: TenantContext = Depends(get_tenant_context),
) -> DocumentDetailResponse:
    """Get detailed information about a document."""
    # Load document with related data
    result = await ctx.session.execute(
        select(Document, File, Share)
        .join(File, File.id == Document.file_id)
        .join(Share, Share.id == File.share_id)
        .where(
            Document.id == document_id,
            Document.tenant_id == ctx.tenant_id,
        )
    )
    row = result.fetchone()

    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    doc, file, share = row

    # Get exposure
    result = await ctx.session.execute(
        select(DocumentExposure).where(DocumentExposure.document_id == document_id)
    )
    exposure = result.scalar_one_or_none()

    # Get findings
    result = await ctx.session.execute(
        select(SensitivityFinding)
        .where(SensitivityFinding.document_id == document_id)
        .order_by(SensitivityFinding.created_at)
    )
    findings = result.scalars().all()

    return DocumentDetailResponse(
        id=doc.id,
        file_id=file.id,
        share_id=share.id,
        relative_path=file.relative_path,
        title=doc.title,
        file_type=doc.file_type,
        size_bytes=doc.size_bytes,
        last_indexed_at=doc.last_indexed_at,
        exposure_level=exposure.exposure_level if exposure else None,
        exposure_score=exposure.exposure_score if exposure else None,
        access_summary=AccessSummary(**exposure.access_summary) if exposure else None,
        findings=[
            SensitivityFindingDetail(
                id=f.id,
                sensitivity_type=f.sensitivity_type,
                sensitivity_level=f.sensitivity_level,
                snippet=f.snippet,
                created_at=f.created_at,
            )
            for f in findings
        ],
    )
