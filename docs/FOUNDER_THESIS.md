# Founder Thesis – Strata

**Working Name:** Strata
**Tagline:** The AI data plane for enterprise file estates

---

## 1. Problem

Enterprises are racing to deploy AI agents and copilots over their own data. But their largest, most valuable corpus remains effectively *off limits*:

* Decades of content in **NFS/SMB shares and NAS**: contracts, policies, HR files, financials, engineering docs, RFIs, scans.
* Complex **ACLs and group memberships** that no one fully understands.
* Existing **DSPM / DLP tools** that surface risks, but do **not** provide a safe, programmable way for LLMs and agents to work with this data.

Today, AI platform teams face a hard tradeoff:

* Either they **ignore file estates** and ship neutered AI experiences, or
* They **“eyeball” a subset into a vector store**, bypassing ACLs and creating new, un-audited risk.

Security and compliance teams, rightly, say “no” or drag their feet. As a result:

> AI initiatives stall not because models are bad, but because there is no **AI-native data plane** between file storage and agents.

---

## 2. Why now

Three secular shifts collide here:

1. **Internal GPT / Copilot platforms**

   * Enterprises are standardizing on “AI hubs” (ChatGPT Enterprise, M365 Copilot, internal orchestration).
   * These teams need reliable, policy-aware tools to add high-value data sources—file systems are top of the list.

2. **Unstructured data security is board-level**

   * Ransomware, insider threats, and privacy regulations have made “What’s in our file shares, who can see it?” a board question.
   * DSPM tools map the risk; they do *not* solve safe AI runtime access.

3. **AI is moving from “Q&A” to “agents”**

   * Agents need structured tools: `search`, `read`, `summarize`, `propose_remediation` over file data.
   * Those tools must be **ACL-accurate, policy-bound, and fully auditable**.

The missing layer is a **storage-native, AI-facing data plane** for enterprise file estates.

---

## 3. Solution: Strata

Strata is a **headless semantic and safety data plane** for enterprise file systems. It sits next to existing storage and identity systems and exposes an AI-native interface to file estates.

**What Strata does**

1. **Connects to file estates**

   * Agents running near SMB/NFS/NAS scan configured shares.
   * We ingest file metadata, content, and ACLs into a tenant-scoped index.

2. **Builds a semantic + risk model**

   * Classifies documents (CONTRACT, POLICY, RFC, OTHER).
   * Performs type-aware chunking (contracts by clause, RFCs by section).
   * Detects sensitive content (PII, financials, secrets) via hybrid rules + ML/LLM.
   * Computes exposure scores (0–100) combining sensitivity and effective access breadth.

3. **Enforces policy at query time**

   * Integrates with AD/IdP to understand users, groups, and roles.
   * Every query is filtered by **live ACLs** and **org policies**:

     * Some agents see raw content,
     * Some see redacted text,
     * Some see summaries only.

4. **Provides AI-native tools and observability**

   * Headless APIs and tools for AI platforms:

     * `search_chunks`, `find_sensitive_content`, `summarize_scope`, `propose_remediation`.
   * Full interaction observability:

     * What each agent retrieved, under which principal, from which documents, and why.

Strata does **not** replace existing storage or DSPM consoles. It becomes the **runtime data plane** that AI platforms and security teams share.

---

## 4. Who it’s for

**Primary buyer / user:**

* **Internal AI Platform / ML Infra teams**

  * Own internal GPT/Copilot deployments and AI orchestration.
  * Need a clean, embeddable way to let agents work over file shares without bypassing ACLs.

**Critical co-sponsor:**

* **Security, Risk, and Compliance**

  * Define sensitivity policies and acceptable use.
  * Consume exposure maps and audit trails.
  * Use Strata as the enforcement and evidence layer for AI over file estates.

In many large accounts, Strata will:

* Integrate with existing **DSPM / data security platforms** (for labels, findings),
* While owning the **agent-facing, policy-aware retrieval and runtime control**.

---

## 5. Product v0 / v1 (what this pre-seed funds)

**v0 – Read-only AI data plane for scoped shares (12–18 months)**

* SMB/NFS connector for 1–3 high-value shares per design partner.
* Ingestion of metadata, content, and ACLs into an estate model.
* Document classification, basic type-aware chunking.
* Sensitivity detection (hybrid rules + ML/LLM) and exposure scoring.
* ACL-accurate search and sensitivity discovery APIs.
* Initial policy-driven redaction and RAG with citations.
* Per-tenant dashboard for security/AI teams: “What’s in these shares, where is risk, and how is AI using it?”

**v1 – Agent-first runtime layer**

* Structured field extraction for contracts and policies.
* Document versioning and semantic diffs for change tracking.
* Rich policy engine for agent-specific views (per agent/persona).
* Full interaction observability and audit exports (for SOC, compliance, legal).
* Deeper integrations:

  * AI orchestrators (MCP, LangChain, internal platforms).
  * Existing DSPM/UEBA tools, reusing their labels and insights.

The pre-seed round is explicitly to:

* Build v0,
* Run 3–5 design-partner deployments on real shares, and
* Prove that Strata is both **technically sound** and **economically compelling** as the AI data plane for file estates.

---

## 6. Founder / unfair advantage

I’ve spent the last ~10 years as an engineering leader at **Nasuni**, a cloud-backed enterprise file system:

* Led teams building the **management plane** for thousands of edge appliances and hundreds of petabytes of unstructured data across AWS, Azure, and GCP.
* Deep experience with:

  * SMB/NFS semantics, snapshots, ACLs, and multi-tenant management.
  * Building secure, cloud-native control planes that enterprises trust.
  * Early adoption and integration of AI inside a storage company.

This gives Strata a rare combination at day zero:

* Deep understanding of **enterprise file estates and ACLs**, and
* Hands-on experience building **management planes at scale**, and
* A clear, founder-led conviction about what AI platform and security teams will need over the next 5–10 years.
