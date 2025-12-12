# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Topos** is a headless semantic and safety data plane for enterprise file systems. The goal is to build a storage-native semantic layer over enterprise file estates (NFS/SMB/object stores) that enables AI agents to safely understand, query, and govern unstructured file data.

Key capabilities:
- Document type classification (CONTRACT, POLICY, RFC, OTHER)
- Structured field extraction from documents
- Type-aware chunking that preserves semantic boundaries
- Agent-based policy enforcement (raw/redacted/summary views)
- Document versioning with semantic diff
- RAG with source citations and interaction observability

## Build & Run Commands

### Quick Start (Makefile)
```bash
make run       # Start all services
make test      # Run tests
make check     # Run code quality checks
make logs      # Tail logs
make stop      # Stop services
make nuke      # Remove everything (containers, volumes, images)
```

### Manual Docker Commands
```bash
docker-compose up -d --build      # Start all services
docker-compose exec api alembic upgrade head  # Run migrations
docker-compose logs -f api worker  # View logs
```

### Agent Setup (standalone)
```bash
cd topos_agent
cp config.example.yaml config.yaml
# Edit config.yaml with your shares and API key

uv sync
uv run topos-agent --config config.yaml --once  # Single scan
uv run topos-agent --config config.yaml         # Continuous
```

### Testing
```bash
make test                                         # Run all tests
docker-compose exec api pytest -v tests/test_extraction.py  # Single file
```

### Code Quality
```bash
make check      # Run all checks (ruff, vulture, bandit)
make fmt        # Format code
make typecheck  # Run mypy
```

## Architecture

The system consists of five main components:

1. **On-Prem SMB Connector Agent** (`topos_agent/`) - Scans SMB shares, sends file events to API
2. **Topos Control Plane** (`apps/api/app/`) - FastAPI server for ingestion, query, and RAG APIs
3. **Worker Services** (`apps/api/app/workers/`) - Process extraction, enrichment, and semantic extraction jobs
4. **Data Stores** - Postgres with pgvector extension
5. **Web UI** (not yet implemented) - Dashboard for sensitive content discovery

## Key Files

**API Layer:**
- `apps/api/app/main.py` - FastAPI application entry point
- `apps/api/app/models.py` - SQLAlchemy ORM models (Document, Chunk, Agent, Policy, Interaction, etc.)
- `apps/api/app/api/admin.py` - Tenant/estate/share/agent management
- `apps/api/app/api/ingest.py` - Ingestion endpoint for file events
- `apps/api/app/api/query.py` - Query, RAG, and observability APIs

**Services:**
- `apps/api/app/services/extraction.py` - Text extraction + type-aware chunking
- `apps/api/app/services/classification.py` - Document type classification (CONTRACT/POLICY/RFC/OTHER)
- `apps/api/app/services/semantic_extraction.py` - Structured field extraction via LLM
- `apps/api/app/services/semantic_diff.py` - Compute diff between document versions
- `apps/api/app/services/policy_engine.py` - Agent policy evaluation and LLM-safe views
- `apps/api/app/services/observability.py` - RAG interaction tracking
- `apps/api/app/services/sensitivity.py` - Regex-based PII/secret detection
- `apps/api/app/services/exposure.py` - Exposure score calculation

**Workers:**
- `apps/api/app/workers/extraction.py` - EXTRACT_CONTENT job processor (includes classification)
- `apps/api/app/workers/enrichment.py` - ENRICH_CHUNKS job processor
- `apps/api/app/workers/semantics.py` - EXTRACT_SEMANTICS job processor
- `apps/api/app/workers/runner.py` - Worker process entrypoint

**Agent:**
- `topos_agent/topos_agent/scanner.py` - File system scanner
- `topos_agent/topos_agent/client.py` - Topos API client
- `topos_agent/topos_agent/config.py` - YAML config loading
- `topos_agent/topos_agent/main.py` - CLI entrypoint

**Configuration:**
- `pyproject.toml` (root) - Shared tool config (ruff, mypy, bandit, vulture)
- `.pre-commit-config.yaml` - Pre-commit hooks configuration
- `.gitignore` - Git ignore patterns

## Key Technical Decisions

- **Backend**: Python 3.11+ with FastAPI
- **Database**: Postgres with pgvector extension
- **Job Queue**: DB-backed using `SELECT ... FOR UPDATE SKIP LOCKED`
- **Auth**: Static API keys per tenant and per agent (Bearer token)
- **LLM**: OpenAI GPT-4o-mini for classification, extraction, and answer generation
- **Content Extraction**: pdfminer.six (PDF), python-docx (DOCX), python-pptx (PPTX)

## API Endpoints

**Admin:**
- `POST /v0/admin/tenant` - Create tenant (returns API key)
- `POST /v0/admin/estate` - Create estate
- `POST /v0/admin/share` - Create share
- `POST /v0/admin/agent` - Create agent (returns API key)
- `GET /v0/admin/agents` - List agents
- `POST /v0/admin/agents/{id}/policies/{id}` - Assign policy to agent

**Query & RAG:**
- `POST /v0/ingest/events` - Receive file events from agents
- `POST /v0/sensitivity/find` - Query sensitive content
- `POST /v0/search/chunks` - Agent-aware search with policy enforcement
- `POST /v0/answer_with_evidence` - RAG with source citations
- `POST /v0/semantic_diff` - Compute diff between document versions
- `GET /v0/dashboard/metrics` - Dashboard metrics
- `GET /v0/documents/{id}` - Document details with findings

**Observability:**
- `GET /v0/interactions` - List RAG interactions
- `GET /v0/interactions/{id}` - Get interaction trace
- `GET /v0/agents/{id}/stats` - Agent interaction statistics

## Data Model

**Core entities:** `tenant`, `estate`, `share`, `file`, `principal`, `group_membership`, `file_acl_entry`, `file_effective_access`, `document`, `chunk`, `chunk_embedding`, `sensitivity_finding`, `document_exposure`, `job`, `file_event`, `agent`, `policy`, `agent_policy`, `interaction`, `interaction_chunk`, `semantic_diff_result`

**Document fields:** `doc_type` (CONTRACT/POLICY/RFC/OTHER), `structured_fields` (JSONB), `version_number`, `previous_version_id`

**Chunk fields:** `section_path` (hierarchical path), `redacted_text`, `summary_text`

All tables include `tenant_id` for multi-tenant isolation.
