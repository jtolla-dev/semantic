## 1. Positioning grid: who’s already “AI-ifying” unstructured data?

Think of the space in three vertical layers:

* **Content platforms** (own the storage + AI on top)
* **Work AI / enterprise search platforms** (sit over many apps, shallow on storage)
* **Cloud AI / RAG infra** (developer services, no ownership of your storage)

Here is a simplified grid with representative players:

| Category                          | Example                                                       | What they’re actually optimizing for                                                                                                                                                          | Key strengths                                                                                                                                                           | Gaps vs “AI-native file data platform”                                                                                                                                                                                            |
| --------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Content platform + AI**         | **Box AI / Box AI Agents / Box Extract**                      | Make Box the “intelligent content management” hub: agents that automate workflows on Box content, with AI enrichment of contracts, invoices, handwritten forms, etc.                          | Deep control over *their* storage; strong security posture; mature enrichment pipeline (Box Extract); now agentic workflows via AWS/Bedrock and Claude.                 | Locked to Box as the file system; not a general data plane for NFS/SMB/object estates; APIs are for integrating into Box-centric workflows, not for deeply controlling arbitrary file infrastructure.                             |
| **Work AI / enterprise search**   | **Glean Work AI**                                             | “One horizontal agent platform” that connects to enterprise data sources (Drive, Confluence, Slack, etc.), builds a semantic index, and powers assistants/agents across all that content.     | Great connectors + unified search; strong story around Work AI agents; deeply focused on knowledge worker productivity.                                                 | Limited control over underlying file systems; dependence on each SaaS’s APIs and terms; mostly chat/search UX and agents, less about close-to-storage semantics (snapshots, multi-site, file workflows).                          |
| **Cloud AI search & agents**      | **Vertex AI Search / Agent Builder**                          | Provide “Google-quality” search and RAG as a service: ingest from GCS, Drive, websites, etc., then use that to power agents built with Agent Builder.                                         | Strong infra, built-in RAG, observability, multi-modal; latest updates make agents easier to build and deploy at scale.                                                 | You still have to solve ingest, ACLs, and file semantics; they don’t know about your specific NAS/NFS estate, snapshots, or per-share policies unless you build that layer.                                                       |
| **Productivity suite + AI index** | **Microsoft 365 Copilot + Semantic Index + Graph Connectors** | Create a semantic index over M365 data (SharePoint, OneDrive, Exchange) and any external data pushed via Graph connectors; Copilot then answers questions and automates work over that index. | Native to where knowledge workers live; strong access control model via Graph; Graph connectors pull in external file data (e.g., Nasuni’s File Share Graph Connector). | Focused on the M365 universe; external file systems become “just another connector” rather than a first-class, richly modeled data plane; limited visibility into non-M365 behaviors like snapshots, caching, multi-site DR, etc. |
| **RAG / unstructured infra**      | **Unstructured.io, Vectara, LlamaIndex, LangChain loaders**   | Make it easier for devs to parse unstructured docs, chunk them, compute embeddings, and build RAG apps.                                                                                       | Great *building blocks* for your pipeline: parsing, chunking, hybrid search, orchestration.                                                                             | They don’t own storage, permissions, or file workflows; they expect you to build the data plane and semantics around them.                                                                                                        |
| **File platform + AI connector**  | **Nasuni + Microsoft Graph Connector for Copilot**            | Expose Nasuni file data into Microsoft’s semantic index so Copilot and Search can see it.                                                                                                     | Provides AI-readable access to Nasuni data via Graph; leverages M365 Copilot for search and Q&A over file data.                                                         | The AI “brain” is in Microsoft; Nasuni’s role is to feed the index. Very little in the way of an independent, programmable AI semantic layer or agent tooling over the file data itself.                                          |

So yes, pieces of what you described exist. But note the pattern:

* **No one is truly “storage-native” and “agent-first” for generic enterprise file estates.**
* File data is either:

  * owned by a single SaaS (Box, OneDrive/SharePoint), where AI is an add-on, or
  * *fed into* someone else’s AI index (Copilot, Vertex, Glean), where your file system is just a connector.

That’s the opening.

---

## 2. A sharp thesis for your startup

You do **not** want to pitch “another enterprise search company.” That category is crowded and noisy.

The tight thesis I’d frame is:

> **“We are the AI data plane and agent layer for enterprise file systems.”**
> Not a search bar, not a new drive—an AI-native control plane that sits *beside* existing storage and makes file estates legible, controllable, and automatable for AI agents.

Concretely, I’d differentiate on three axes.

### 2.1 Storage-native, ecosystem-neutral

You live *close to the file systems themselves*:

* NFS/SMB shares, NAS appliances, object stores.
* Cloud-backed systems (e.g., Nasuni-like), traditional NAS, and even pure S3/GCS/Azure Blob “file lakes.”

Your platform:

* Hooks into file events, snapshots, and ACLs.
* Builds a semantic representation of the **file estate** (not just docs): directories, versions, shares, locations, retention policies.
* Exposes that representation both:

  * to your own agents/UX, and
  * as a service into others (Copilot, Vertex, Glean, Box AI, etc.).

You’re not trying to replace Copilot or Vertex; you make them *smarter* about unstructured file data.

### 2.2 Agent-first operations over files

Instead of “search + chat,” your primary surface is **tools for agents**, such as:

* `search_chunks`, `summarize_folder`, `diff_versions`, `find_sensitive_content`, `monitor_pattern`, `remediate_acl`, etc.
* All strictly permissions-aware and tenant-scoped.
* Available via SDKs so customers can build:

  * compliance agents,
  * knowledge agents,
  * operational agents (e.g., for DR hygiene, stale data cleanup).

You might still ship a human-facing “Copilot for files” UI, but your core story to engineering / platform buyers is:

> “Give your agents a safe, rich, audited interface to your file estate.”

### 2.3 Deep semantics and governance for file-heavy domains

You focus where files are **the** system of record:

* AEC (drawings, plans, RFIs, submittals).
* Manufacturing (CAD, BOMs, specs, QC docs).
* Legal (contracts, discovery, filings).
* Insurance & claims (photos, PDFs, scanned forms).
* Life sciences / pharma (protocols, lab reports, study docs).

You then:

* Build doc-type-aware pipelines (contracts, invoices, RFIs, etc.) and
* Attach governance:

  * sensitivity classification,
  * retention suggestions,
  * “shadow IT” detection (PII in public shares),
  * human-in-the-loop workflows.

This is a different buyer story from “employees can ask better questions.” It’s closer to:

> “We turn your legacy file estate into something AI can reason about and govern—with agents you can trust.”

---

## 3. Wedge & beachhead: where do you credibly start?

If you’re leaving Nasuni to do this, you already know a lot about:

* Multi-site file workloads
* Hybrid file architectures (on-prem gateway, cloud object)
* The realities of large file estates (latency, DR, migrations, snapshots)

You want a wedge that:

1. **Needs “near-storage” awareness** (not just SaaS connectors).
2. **Has painful unstructured-data problems.**
3. **Isn’t already locked into Box/SharePoint for everything.**

A few plausible wedges:

### Wedge 1: “AI compliance & risk layer for shared drives”

* Target: large orgs with messy NAS / hybrid shares.
* Promise: “Find and fix sensitive content and ACL problems, continuously, with agents—not audits.”
* Features:

  * Scan and classify content (PII, PHI, trade secrets).
  * Show where confidential content lives in public or over-broad shares.
  * Suggest remediations and (optionally) apply them under policy.
  * Feed summaries & alerts into Copilot/SIEM/GRC tools.

This leans into security/compliance budgets, which are less saturated by generic “enterprise search.”

### Wedge 2: “File-native AI operations for AEC / construction”

* Target: AEC firms with multi-TB project shares across offices.
* Promise: “Agents that can read your RFIs, drawings, and specs from the shared drive and answer field questions, draft RFIs, or assemble change-order packages.”
* Features:

  * Connect to project shares.
  * Build per-project knowledge models (RFIs, submittals, drawings, photos).
  * Provide chat + APIs that project tools (or even mobile apps) can call.
  * Add governance (who can see what, project retention policies).

AEC is incredibly file-heavy and still quite legacy in many orgs—good for a “file-native AI” story.

### Wedge 3: “The AI semantic layer for your file platform partners”

Longer-term, you might even sell *to* file-platform vendors:

* Some vendors will want this AI semantic layer but not want to build it in-house.
* You could be the “AI brain” OEM’d or licensed to them.

That is realistically a second phase, but it’s strategically important: it creates a story where you’re not in direct head-on competition with every storage vendor.

---

## 4. How to pitch it so it doesn’t sound like “yet another search tool”

When you talk to investors or design partners, I’d be explicit:

1. **Not a search bar.**
   “We’re an AI data plane and agent layer for file estates, not a search widget. Our primary interface is tools and governance primitives that other agents and systems call.”

2. **Not a new storage system.**
   “We don’t replace your NAS, object store, or collaboration tools—we sit beside them, make them AI-ready, and feed higher-level stacks like Copilot and Vertex.”

3. **Different buyer/stakeholder mix.**

   * Storage & infra teams (who own the file estates).
   * Security/compliance (who worry about what’s in those files).
   * Platform/AI teams (who need a safe way for agents to work with that data).

That gives you a credible story that is distinct from:

* Box: “move your content into Box and we give you rich AI and agents there.”
* Glean: “point us at your SaaS tools and we’ll give your employees a smart assistant over everything.”
* Vertex / Copilot: “we’ll index what you feed us and let you build agents/chat on top.”
