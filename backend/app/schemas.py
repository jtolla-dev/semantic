from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from app.models import ExposureLevel, FileEventType, SensitivityLevel, SensitivityType


# ============================================================================
# Admin Schemas
# ============================================================================


class TenantCreate(BaseModel):
    name: str


class TenantResponse(BaseModel):
    id: UUID
    name: str
    created_at: datetime
    api_key: str | None = None  # Only returned on creation


class EstateCreate(BaseModel):
    name: str


class EstateResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    name: str
    created_at: datetime


class ShareCreate(BaseModel):
    estate_id: UUID
    name: str
    share_type: str = "SMB"
    root_path: str


class ShareResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    estate_id: UUID
    name: str
    share_type: str
    root_path: str
    created_at: datetime


# ============================================================================
# Ingestion Schemas
# ============================================================================


class AclEntryInput(BaseModel):
    principal_external_id: str
    principal_display_name: str | None = None
    principal_type: str = "USER"  # USER, GROUP, SERVICE
    rights: str  # R, RW, FULL
    source: str = "FILE"  # FILE, INHERITED


class FileEventInput(BaseModel):
    type: FileEventType
    share_name: str
    relative_path: str
    size_bytes: int | None = None
    mtime: datetime | None = None
    file_type: str | None = None
    content_hash: str | None = None
    acl_hash: str | None = None
    acl_entries: list[AclEntryInput] | None = None


class IngestEventsRequest(BaseModel):
    agent_id: str
    events: list[FileEventInput]


class IngestEventsResponse(BaseModel):
    processed: int
    jobs_created: int


# ============================================================================
# Query Schemas
# ============================================================================


class QueryScope(BaseModel):
    share_id: UUID | None = None
    path_prefix: str | None = None


class FindSensitiveContentRequest(BaseModel):
    scope: QueryScope | None = None
    sensitivity_types: list[SensitivityType] | None = None
    exposure_levels: list[ExposureLevel] | None = None
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=50, ge=1, le=100)


class SensitivitySummary(BaseModel):
    PERSONAL_DATA: int = 0
    HEALTH_DATA: int = 0
    FINANCIAL_DATA: int = 0
    SECRETS: int = 0
    OTHER: int = 0


class AccessSummary(BaseModel):
    broad_groups: list[str] = []
    principal_count_bucket: str = "0-10"


class SensitiveContentItem(BaseModel):
    document_id: UUID
    file_id: UUID
    share_id: UUID
    relative_path: str
    file_type: str
    sensitivity_summary: dict[str, int]
    exposure_level: ExposureLevel
    exposure_score: int
    access_summary: AccessSummary


class FindSensitiveContentResponse(BaseModel):
    items: list[SensitiveContentItem]
    page: int
    page_size: int
    total: int


class SearchChunksRequest(BaseModel):
    query: str
    scope: QueryScope | None = None
    k: int = Field(default=20, ge=1, le=100)


class ChunkSearchResult(BaseModel):
    chunk_id: UUID
    document_id: UUID
    file_id: UUID
    relative_path: str
    snippet: str
    score: float


class SearchChunksResponse(BaseModel):
    results: list[ChunkSearchResult]


# ============================================================================
# Dashboard Schemas
# ============================================================================


class DashboardMetrics(BaseModel):
    total_files: int
    total_documents: int
    documents_with_findings: int
    high_exposure_documents: int
    findings_by_type: dict[str, int]
    documents_by_exposure: dict[str, int]


# ============================================================================
# Document Detail Schemas
# ============================================================================


class SensitivityFindingDetail(BaseModel):
    id: UUID
    sensitivity_type: SensitivityType
    sensitivity_level: SensitivityLevel
    snippet: str
    created_at: datetime


class DocumentDetailResponse(BaseModel):
    id: UUID
    file_id: UUID
    share_id: UUID
    relative_path: str
    title: str
    file_type: str
    size_bytes: int
    last_indexed_at: datetime
    exposure_level: ExposureLevel | None
    exposure_score: int | None
    access_summary: AccessSummary | None
    findings: list[SensitivityFindingDetail]
