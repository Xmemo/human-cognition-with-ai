# Weekly Research Automation｜Hybrid GPT + GitHub Architecture

[简体中文](weekly-research-automation.zh-CN.md)

## Decision

The weekly Human Cognition with AI update uses a **hybrid automation model**:

- **GPT Scheduled Task = Research Engine** — open-world discovery, source reading, evidence judgment, synthesis, gap detection, bilingual editing.
- **GitHub repository = Canonical Research State** — protocols, Baseline, Weekly archive, bibliography, provenance, Open Questions & Research Gaps.
- **GitHub Actions = Deterministic Control Plane** — schema/invariant checks, bilingual source identity, DOI dedupe, site build, and deployment.
- **Human = Epistemic Gate** — Baseline changes, Research Map changes, methodology changes, and promotion of a gap into a Research Lab.

Do not migrate open-world literature research into GitHub Actions unless the project later has a specific reason to operate its own research-agent infrastructure.

```text
Friday 08:00
GPT Scheduled Task
      ↓
Read canonical protocols from main
      ↓
Discover → Verify → Freeze evidence set
      ↓
Create evidence manifest
      ↓
Write EN + ZH-CN from the same manifest
      ↓
Open weekly research PR
      ↓
Deterministic Research QA + Site CI
      ↓
Risk gate
  ┌───────────────┬────────────────────────┐
  │ ROUTINE       │ INTERPRETIVE/EPISTEMIC│
  │ all green     │                        │
  ↓               ↓                        │
auto-merge      human review              │
  │               │                        │
  └───────────────┴───────────────┬────────┘
                                  ↓
                              main branch
                                  ↓
                           GitHub Pages deploy
```

---

## 1. Canonical protocol ownership

The Scheduled Task must not carry a second full copy of the research methodology in its prompt. At the start of every run it reads the current `main` versions of the canonical protocol files:

1. `methodology/search-protocol.md`
2. `methodology/evidence-grading.md`
3. `methodology/open-questions-research-gaps.md`
4. `methodology/publishing-policy.md`
5. `docs/architecture/bilingual-seo-policy.md`
6. `docs/architecture/evidence-observatory-and-autonomous-research-lab.md`
7. `docs/architecture/weekly-research-automation.md`
8. `weekly/evidence-manifest.schema.json`

If the Scheduled Task cannot read these files, it should not silently fall back to remembered rules. Report `PROTOCOL_READ_BLOCKED` and stop before publication.

This makes GitHub the single source of truth and prevents configuration drift between a long automation prompt and the repository.

---

## 2. Five execution phases inside one Scheduled Task

Keep one weekly task rather than splitting discovery, verification, translation, and publication into independent scheduled jobs. State boundaries should be explicit:

### Phase A — Discover

Search all 9 radars through the three-layer retrieval architecture. Build one candidate pool.

### Phase B — Verify

Resolve canonical source identity, publication date, DOI/URL, study design, evidence grade, caveat, and temporal label. Deduplicate before synthesis.

### Phase C — Freeze

Create `weekly/YYYY/YYYY-MM-DD.evidence.json` from the verified evidence set **before** drafting either public language edition.

The manifest is the transport contract shared by both editions. It does not prove that the scientific interpretation is true.

### Phase D — Synthesize

Generate English and Simplified Chinese Weekly files from the frozen manifest and the verified source notes. English is the default editorial edition; Chinese is a genuine second edition. Original paper titles remain English in both.

Compare the evidence set with:

- the current Baseline;
- the long-lived Open Questions & Research Gaps ledger.

### Phase E — Publish by PR

Create a branch such as:

`research/weekly-YYYY-MM-DD`

Write the weekly pair, evidence manifest, bibliography/provenance updates, and only the state changes actually justified by the run. Open a Pull Request instead of writing directly to `main`.

---

## 3. Frozen Evidence Manifest

Cutover date: **2026-08-29**.

For every weekly run on or after the cutover date, require:

```text
weekly/YYYY/YYYY-MM-DD.en.md
weekly/YYYY/YYYY-MM-DD.zh-CN.md
weekly/YYYY/YYYY-MM-DD.evidence.json
```

The v1 manifest freezes:

- run date;
- EN / ZH-CN editorial identity;
- all three retrieval layers;
- R1–R9 coverage state;
- Baseline compared against and Baseline decision;
- selected source identity;
- original paper title;
- publication date;
- temporal status;
- radar tags;
- evidence grade;
- DOI / canonical URL;
- long-lived gap-state changes.

The schema is `weekly/evidence-manifest.schema.json`.

The 2026-08-29 manifest is explicitly marked `retrofitted: true` because the manifest contract was introduced after that refresh was already published. Future manifests must be created before bilingual drafting.

---

## 4. Deterministic Research QA

`.github/workflows/research-qa.yml` runs `.github/scripts/research_qa.py`.

It checks invariants that do not require scientific interpretation:

- every post-cutover English Weekly has a Chinese pair and evidence manifest;
- manifest date matches filenames;
- all 9 radars have a coverage state;
- all 3 retrieval layers are declared;
- selected source IDs and DOIs are unique;
- DOI identity is present in both public language editions;
- for non-retrofitted runs, the canonical English paper title appears verbatim in both language editions;
- evidence grade and radar tags agree near each selected title;
- the required Open Questions & Research Gaps section exists in both editions;
- all referenced long-lived gap IDs exist in the canonical gap ledger;
- Baseline decisions point to real Baseline files;
- `references/master.bib` has no duplicate DOI records.

These checks verify **transport integrity**, not scientific truth. A green Research QA check does not mean the interpretation of a paper is correct.

---

## 5. PR risk classes

Research QA classifies changed files conservatively.

### ROUTINE

Typical examples:

- dated Weekly EN / ZH-CN;
- dated evidence manifest;
- `references/master-bibliography.md`;
- `references/master.bib`;
- dated Consensus provenance;
- Research Hub latest-link maintenance.

A ROUTINE PR may be automatically squash-merged by the Scheduled Task **only after all required Research QA and Site CI checks are green**.

### INTERPRETIVE

Typical examples:

- `methodology/open-questions-research-gaps*`;
- Topic synthesis changes;
- researcher-watch interpretation changes;
- any unknown file change not explicitly classified as routine.

Leave the PR open for human review.

### EPISTEMIC

Typical examples:

- a new or modified Evidence Baseline;
- Research Map changes;
- search / grading / publishing methodology changes;
- the Observatory ↔ Research Lab boundary;
- evidence-manifest schema or Research QA mechanism changes.

Never auto-merge. Human review is mandatory.

Risk classification is a workflow control, not an evidence grade.

---

## 6. Weekly task publication rules

The Scheduled Task should normally **not edit the root README files every week**. The website portal already points readers to the current Weekly and Baseline routes.

Only change durable state when justified:

- update bibliography/provenance for new verified sources;
- update the long-lived gap ledger only when a gap is established, re-scoped, narrowed, closed, or changes status;
- create a new dated Baseline only when the Baseline policy is triggered;
- do not modify methodology just to accommodate one week's findings.

Historical Weekly files remain research-state snapshots. Do not rewrite them for style.

---

## 7. Failure semantics

Use explicit failure states:

- `PROTOCOL_READ_BLOCKED` — canonical GitHub protocols could not be read.
- `RESEARCH_INCOMPLETE` — a required radar/retrieval layer was not adequately scanned.
- `EVIDENCE_FREEZE_FAILED` — the manifest could not be produced consistently.
- `GITHUB_SYNC_BLOCKED` — research completed but GitHub branch/PR publication failed.
- `QA_BLOCKED` — PR opened but deterministic checks failed.
- `HUMAN_REVIEW_REQUIRED` — the PR is INTERPRETIVE or EPISTEMIC.

Do not represent a partially completed run as successfully published.

---

## 8. What GitHub Actions must not do

GitHub Actions must not decide:

- whether a paper's causal interpretation is defensible;
- whether a new theory is correct;
- whether a gap should become a hypothesis;
- whether an apparently contradictory study overturns the Baseline;
- whether a Research Lab should start.

The governing rule is:

> **LLMs handle open-world judgment; deterministic CI handles invariants; humans retain high-level epistemic authority.**
