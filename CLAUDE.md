# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Strata** is an AI data plane and agent layer for enterprise file systems. The goal is to build a storage-native semantic layer over enterprise file estates (NFS/SMB/object stores) that enables AI agents to safely understand, query, and govern unstructured file data.

## Build & Run Commands

### Using Docker Compose (recommended)
```bash
# Start all services (db, api, worker)
docker-compose up -d

# Run database migrations
docker-compose exec api alembic upgrade head

# View logs
docker-compose logs -f api worker
```

### Local Development

```bash
# Backend setup
cd backend
pip install -e ".[dev]"
cp .env.example .env

# Start Postgres with pgvector (requires Docker)
docker run -d --name strata-db -p 5432:5432 \
  -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=strata \
  pgvector/pgvector:pg16

# Run migrations
alembic upgrade head

# Start API server
uvicorn app.main:app --reload

# Start workers (separate terminal)
python -m app.workers.runner
```

### Agent Setup
```bash
cd agent
pip install -e .
cp config.example.yaml config.yaml
# Edit config.yaml with your shares and API key

# Run single scan
strata-agent --config config.yaml --once

# Run continuously
strata-agent --config config.yaml
```

### Testing
```bash
cd backend
pytest
pytest tests/test_extraction.py -v  # Run single test file
```

## Architecture (v0)

The system consists of five main components:

1. **On-Prem SMB Connector Agent** (`agent/`) - Scans SMB shares, sends file events to API
2. **Strata Control Plane** (`backend/app/`) - FastAPI server for ingestion and query APIs
3. **Worker Services** (`backend/app/workers/`) - Process extraction and enrichment jobs
4. **Data Stores** - Postgres with pgvector extension
5. **Web UI** (not yet implemented) - Dashboard for sensitive content discovery

## Key Files

- `backend/app/main.py` - FastAPI application entry point
- `backend/app/models.py` - SQLAlchemy ORM models
- `backend/app/api/ingest.py` - Ingestion endpoint for file events
- `backend/app/api/query.py` - Query endpoints for sensitivity/search
- `backend/app/workers/extraction.py` - Content extraction worker
- `backend/app/workers/enrichment.py` - Sensitivity detection and exposure calculation
- `backend/app/services/sensitivity.py` - Regex-based PII/secret detection
- `agent/agent/scanner.py` - File system scanner

## Key Technical Decisions

- **Backend**: Python 3.11+ with FastAPI
- **Database**: Postgres with pgvector extension
- **Job Queue**: DB-backed using `SELECT ... FOR UPDATE SKIP LOCKED`
- **Auth**: Static API keys per tenant (Bearer token)
- **Embeddings**: Optional OpenAI embeddings
- **Content Extraction**: pdfminer.six (PDF), python-docx (DOCX), python-pptx (PPTX)

## API Endpoints

- `POST /v0/admin/tenant` - Create tenant (returns API key)
- `POST /v0/admin/estate` - Create estate
- `POST /v0/admin/share` - Create share
- `POST /v0/ingest/events` - Receive file events from agents
- `POST /v0/sensitivity/find` - Query sensitive content
- `POST /v0/search/chunks` - Text search over chunks
- `GET /v0/dashboard/metrics` - Dashboard metrics
- `GET /v0/documents/{id}` - Document details with findings

## Data Model

Core entities: `tenant`, `estate`, `share`, `file`, `principal`, `group_membership`, `file_acl_entry`, `file_effective_access`, `document`, `chunk`, `chunk_embedding`, `sensitivity_finding`, `document_exposure`, `job`, `file_event`.

All tables include `tenant_id` for multi-tenant isolation.
