# Dashboard README & Research Hub Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the repository homepage into a reader-first research dashboard, move structural complexity into a second-layer Research Hub, and formalize the three-layer literature retrieval mechanism.

**Architecture:** Keep the existing evidence assets, Baseline, weekly briefs, 3×3 map, bibliography, and history intact. Redesign only the navigation and synthesis surfaces: `README*` becomes the public dashboard; `research/README*` becomes the research navigation hub; `methodology/search-protocol.md` becomes the canonical retrieval workflow. The weekly automation is updated to maintain the new dashboard fields and three-layer retrieval semantics.

**Tech Stack:** GitHub Markdown, GitHub repository contents API, connected Consensus search/fetch, existing ChatGPT automation.

**Spec:** `docs/superpowers/specs/2026-08-29-dashboard-research-hub-redesign.md`

## Global Constraints

- Preserve the existing 3 domains × 9 radars; do not create a new taxonomy.
- Preserve historical weekly briefs and dated baselines.
- Preserve evidence grades `[A] [B] [C] [S]`.
- Public GitHub must exclude `专家说`, `元认知重构`, personalized writing strategy, private book strategy, and user-specific coaching.
- Chinese and English pages must use the same information architecture and evidence identities; English is editorially idiomatic, not an independent research pass.
- `Latest` means what changed recently; `Baseline` means what the evidence currently supports.
- Consensus is the **Evidence Backbone**, not the sole freshness source.
- Discovery date must never be represented as publication date.

---

### Task 1: Rebuild the English and Chinese README dashboards

**Files:**
- Modify: `README.md`
- Modify: `README.zh-CN.md`

**Interfaces:**
- Consumes: current Baseline `research/baseline-2026-08-29.*`, latest weekly brief `weekly/2026/2026-08-28.*`, current map `methodology/research-map.md`.
- Produces: stable dashboard section order that the weekly automation can update without rewriting the whole homepage.

- [ ] **Step 1: Replace the long hero navigation with three primary reader links**

English hero links: `Current Findings · Latest Research · Research Map`.
Chinese hero links: `核心研究成果 · 最新研究更新 · 完整研究地图`.

- [ ] **Step 2: Move `Latest Signals` immediately below the hero**

Use the current 2026-08-28 brief to surface 2–4 field-level signals, not a copied item list. Include links to both language editions and state explicitly that weekly briefs track change while Baseline tracks current supported conclusions.

- [ ] **Step 3: Compress current conclusions into five findings**

Use exactly these five conceptual headings in both languages:
1. Assisted performance is not retained capability.
2. What is delegated matters more than how much AI is used.
3. Metacognition / epistemic agency is emerging as a control layer.
4. Human + AI does not automatically produce synergy.
5. Individual cognitive effects can propagate into collective and cultural effects.

Each receives one concise explanatory paragraph and a clear link to the current Baseline.

- [ ] **Step 4: Add a distinct Control / Retention / Variance working-model section**

Include the three questions and the explicit caveat that this is a research-organizing model, not a fully validated grand theory.

- [ ] **Step 5: Add `Start Here` navigation by reader intent**

Destinations: Current Baseline, Latest Weekly Brief, 3×3 Map, Master Bibliography, Research History, Methodology.

- [ ] **Step 6: Collapse the full 9-radar homepage map into three compact domain summaries**

Retain the three domain questions and representative keywords only; link to `methodology/research-map.md` for full radar detail.

- [ ] **Step 7: Keep Machine Culture and How We Research compact**

Machine Culture: one explanatory paragraph, Brinkmann et al. 2026 anchor, Rahwan watch link.
How We Research: one compact pipeline from nine radars through three retrieval layers, verification, grading, weekly brief, and Baseline comparison.

- [ ] **Step 8: Verify bilingual structural parity and public-filter compliance**

Checks:
- same section order in English and Chinese;
- same five findings;
- same current Baseline and latest brief dates;
- no `专家说`, `元认知重构`, private-book or personalized strategy text.

- [ ] **Step 9: Commit Task 1**

Commit message: `docs: redesign README as research dashboard`

---

### Task 2: Convert `research/README*` into the second-layer Research Hub

**Files:**
- Modify: `research/README.md`
- Modify: `research/README.zh-CN.md`

**Interfaces:**
- Consumes: existing Baseline, weekly archive, bibliography, Consensus ledgers, evidence grading, search protocol, research history.
- Produces: a four-block navigation hub with no duplicated long-form baseline synthesis.

- [ ] **Step 1: Replace `Research Synthesis` framing with `Research Hub`**

Explain that the Hub separates current state, research stream, evidence base, and research evolution.

- [ ] **Step 2: Add `Current State` block**

Link the current Baseline, research map, and evidence gaps. Explain the difference between Baseline and Weekly Brief in two short paragraphs or less.

- [ ] **Step 3: Add `Research Stream` block**

Link the latest bilingual weekly brief and the `weekly/2026/` archive. State that weekly updates do not automatically create a new baseline.

- [ ] **Step 4: Add `Evidence Base` block**

Link `references/master-bibliography.md`, `references/master.bib`, `references/consensus.md`, `references/consensus/2026-08-29.md`, `methodology/evidence-grading.md`, and `methodology/search-protocol.md`.

- [ ] **Step 5: Add `Research Evolution` block**

Link the bilingual research history and briefly explain the migration from cognitive protection/augmentation and writing-as-thinking into the current 3×3 map.

- [ ] **Step 6: Verify the Hub does not reproduce the homepage five findings or the full Baseline**

The Hub is navigation + conceptual separation, not another synthesis article.

- [ ] **Step 7: Commit Task 2**

Commit message: `docs: turn research README into navigation hub`

---

### Task 3: Formalize the three-layer literature retrieval protocol

**Files:**
- Modify: `methodology/search-protocol.md`

**Interfaces:**
- Consumes: existing nine radars, evidence grades, Consensus provenance rules.
- Produces: canonical retrieval semantics for weekly scanning and automation.

- [ ] **Step 1: Replace the current two-family search framing with the three-layer radar**

Document:
- Layer 1 — `Consensus: Evidence Backbone`
- Layer 2 — `Publishers / arXiv / Conferences: Freshness Layer`
- Layer 3 — `Researchers / Labs / Workshops: Frontier Signal Layer`

- [ ] **Step 2: Specify Consensus workflow and metadata precedence**

Canonical flow:
`Consensus.search → Candidate → Consensus.fetch → DOI/publisher/arXiv verification → Evidence Pool`.

Rules:
- search snippets cannot be cited;
- retained records must be fetched;
- citation count is not evidence strength;
- canonical publisher/DOI/arXiv metadata overrides conflicting aggregator metadata;
- deduplicate by DOI, then normalized title.

- [ ] **Step 3: Add freshness time labels**

Define exactly:
- `NEW` — released in the current scan window;
- `NEWLY INDEXED` — older publication newly entering Consensus/bibliographic indexing;
- `NEWLY DISCOVERED` — older publication first detected by this observatory.

State that discovery/indexing dates cannot be represented as publication dates.

- [ ] **Step 4: Define Frontier Signal rules**

Researchers/labs/workshops/programs are `[S] Strategic Signal` unless backed by empirical work. Machine Culture uses researcher/lab-first monitoring including Rahwan/CHM and close collaborators because the frontier is sparse and fast-moving.

- [ ] **Step 5: Add canonical end-to-end pipeline**

`9 Radars → three retrieval layers → Candidate Pool → Verification → Evidence Grading → Weekly Brief → Compare with Baseline → Weekly only or new dated Baseline`.

- [ ] **Step 6: Preserve negative rules and bilingual evidence-freeze rule**

Keep causal safeguards, no padding, no detector-based authorship claims, and one frozen evidence set for both languages.

- [ ] **Step 7: Commit Task 3**

Commit message: `docs: formalize three-layer literature radar`

---

### Task 4: Update the weekly automation to maintain the redesigned repository

**Files / systems:**
- Update automation: `Human Cognition with AI Weekly` (`6a545cb760748191b8a4b1800d9ad938`)

**Interfaces:**
- Consumes: the new README section contract, Research Hub contract, and three-layer search protocol.
- Produces: future weekly runs that keep `Latest Signals`, references, and Baseline links coherent without expanding homepage complexity.

- [ ] **Step 1: Change search instructions to name all three retrieval layers explicitly**

Consensus remains the evidence backbone; fresh publication sources compensate for indexing lag; researcher/lab/workshop monitoring detects frontier signals.

- [ ] **Step 2: Add `NEW / NEWLY INDEXED / NEWLY DISCOVERED` labeling semantics**

The weekly run must never describe a newly indexed/discovered older paper as newly published.

- [ ] **Step 3: Change README sync behavior**

Each run updates only the compact `Latest Signals` section, latest-brief links/date, and—when a material Baseline change occurs—the `Current Findings`/Baseline links. It must not re-expand the homepage into full 9-radar definitions or bibliography dumps.

- [ ] **Step 4: Keep `research/README*` as a Hub**

Only update Current Baseline / Latest Weekly references and evidence-gap pointers when necessary; never turn the Hub back into a duplicated synthesis page.

- [ ] **Step 5: Preserve dated Consensus ledgers and bibliography deduplication**

New verified Consensus results go to dated provenance ledgers; the initial ledger stays historical.

- [ ] **Step 6: Verify automation remains enabled on the same Friday schedule**

No cadence change.

---

### Task 5: PR review, public-content audit, merge, and post-merge verification

**Files:**
- Review all files changed on `docs/dashboard-research-hub-redesign-2026-08-29`.

**Interfaces:**
- Produces: verified `main` branch with reader-first dashboard and stable future-update contract.

- [ ] **Step 1: Compare branch with `main`**

Expected substantive implementation files: `README.md`, `README.zh-CN.md`, `research/README.md`, `research/README.zh-CN.md`, `methodology/search-protocol.md`, plus spec/plan documents.

- [ ] **Step 2: Create a non-draft PR and inspect its patch**

Review for duplicated sections, broken relative paths, inconsistent dates, translation drift, accidental deletion of evidence assets, and homepage over-expansion.

- [ ] **Step 3: Run public-filter searches**

Repository/PR search must return no public content hits for `专家说`, `元认知重构`, or private-book strategy in the implementation files.

- [ ] **Step 4: Verify linked target files exist**

At minimum: current Baseline pair, latest weekly pair, research map, evidence grading, search protocol, master bibliography, BibTeX, Consensus ledgers, research history, Rahwan page.

- [ ] **Step 5: Merge only when PR is mergeable and head SHA is stable**

Use squash merge with a descriptive commit message.

- [ ] **Step 6: Re-read `main` after merge**

Confirm the homepage begins with Hero → Latest Signals → Current Findings → Working Model → Start Here; confirm Research Hub has four blocks; confirm search protocol names all three retrieval layers and all three time labels.

- [ ] **Step 7: Confirm automation state after merge**

The Friday weekly task remains enabled and points to the redesigned sync contract.
