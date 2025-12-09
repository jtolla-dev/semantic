# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Strata** is an AI data plane and agent layer for enterprise file systems. The goal is to build a storage-native semantic layer over enterprise file estates (NFS/SMB/object stores) that enables AI agents to safely understand, query, and govern unstructured file data.

This repository currently contains design documents and specifications for the v0 design-partner build.

## Architecture (v0)

The system consists of five main components:

1. **On-Prem SMB Connector Agent** (Python) - Runs in customer environment, mounts SMB shares read-only, scans files/ACLs, sends events to the control plane
2. **Strata Control Plane** (Python/FastAPI) - Central HTTP API for ingestion, worker coordination, and query APIs
3. **Worker Services** (Python) - Background job processors for content extraction, chunking, enrichment (embeddings + sensitivity + exposure)
4. **Data Stores** - Postgres with pgvector extension for relational data and embeddings
5. **Web UI** (React/Next.js) - Dashboard and findings table for sensitive content discovery

## Key Technical Decisions

- **Backend**: Python with FastAPI
- **Database**: Postgres with pgvector extension
- **Job Queue**: Simple DB-backed job table using `SELECT ... FOR UPDATE SKIP LOCKED`
- **Auth**: Static API keys per tenant (Bearer token) for v0
- **Embeddings**: Optional OpenAI embeddings via environment-provided API key
- **Content Extraction**: pdfminer.six (PDF), python-docx (DOCX), python-pptx (PPTX optional)

## Data Model

Core entities include: `tenant`, `estate`, `share`, `file`, `principal`, `group_membership`, `file_acl_entry`, `file_effective_access`, `document`, `chunk`, `chunk_embedding`, `sensitivity_finding`, `document_exposure`, `job`, `file_event`.

All tables include `tenant_id` for multi-tenant isolation. ACL-aware queries filter by caller's effective principals.

## Key API Endpoints

- `POST /v0/ingest/events` - Receive file events from connector agents
- `POST /v0/sensitivity/find` - Query sensitive content with ACL filtering
- `POST /v0/search/chunks` - Semantic search over document chunks

## Domain Context

This is a compliance/security-focused product targeting enterprises with large file estates. Key use cases:
- Sensitive data discovery (PII, PHI, secrets)
- Exposure analysis (over-broad file access)
- ACL-aware semantic search
- Continuous compliance monitoring
