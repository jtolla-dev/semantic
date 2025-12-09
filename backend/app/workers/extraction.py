import logging
import os
from datetime import datetime
from uuid import uuid4

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.models import Chunk, Document, File, Job, JobType, Share
from app.services.extraction import chunk_text, extract_content
from app.workers.base import BaseWorker

logger = logging.getLogger(__name__)


class ExtractionWorker(BaseWorker):
    """Worker that extracts content from files and creates chunks."""

    job_type = JobType.EXTRACT_CONTENT

    async def process_job(self, session: AsyncSession, job: Job) -> None:
        """
        Process an EXTRACT_CONTENT job:
        1. Load file and share
        2. Compute full path
        3. Extract text content
        4. Create/update document
        5. Create chunks
        6. Schedule ENRICH_CHUNKS job
        """
        if not job.file_id:
            raise ValueError("EXTRACT_CONTENT job requires file_id")

        # Load file
        file = await session.get(File, job.file_id)
        if not file:
            raise ValueError(f"File {job.file_id} not found")

        # Load share
        share = await session.get(Share, file.share_id)
        if not share:
            raise ValueError(f"Share {file.share_id} not found")

        # Compute full path
        full_path = os.path.join(share.root_path, file.relative_path.lstrip("/"))
        logger.info(f"Extracting content from: {full_path}")

        # Check if file exists
        if not os.path.exists(full_path):
            raise FileNotFoundError(f"File not found: {full_path}")

        # Extract content
        extracted = extract_content(full_path, file.file_type)
        logger.info(f"Extracted {len(extracted.text)} characters from {file.name}")

        # Find or create document
        result = await session.execute(
            select(Document).where(
                Document.tenant_id == job.tenant_id,
                Document.file_id == file.id,
            )
        )
        document = result.scalar_one_or_none()
        now = datetime.utcnow()

        if document:
            # Update existing document
            document.title = extracted.title
            document.file_type = file.file_type
            document.size_bytes = file.size_bytes
            document.last_indexed_at = now
            document.content_hash = file.content_hash

            # Delete existing chunks
            await session.execute(
                delete(Chunk).where(Chunk.document_id == document.id)
            )
        else:
            # Create new document
            document = Document(
                id=uuid4(),
                tenant_id=job.tenant_id,
                file_id=file.id,
                title=extracted.title,
                file_type=file.file_type,
                size_bytes=file.size_bytes,
                last_indexed_at=now,
                content_hash=file.content_hash,
            )
            session.add(document)
            await session.flush()

        # Create chunks
        chunk_specs = chunk_text(
            extracted.text,
            chunk_size=settings.chunk_size,
            chunk_overlap=settings.chunk_overlap,
        )

        for spec in chunk_specs:
            chunk = Chunk(
                id=uuid4(),
                tenant_id=job.tenant_id,
                document_id=document.id,
                chunk_index=spec.index,
                text=spec.text,
                char_start=spec.char_start,
                char_end=spec.char_end,
            )
            session.add(chunk)

        logger.info(f"Created {len(chunk_specs)} chunks for document {document.id}")

        # Create ENRICH_CHUNKS job
        enrich_job = Job(
            id=uuid4(),
            tenant_id=job.tenant_id,
            job_type=JobType.ENRICH_CHUNKS,
            document_id=document.id,
        )
        session.add(enrich_job)

        await session.commit()
        logger.info(f"Scheduled enrichment job {enrich_job.id} for document {document.id}")
