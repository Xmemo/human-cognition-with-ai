# Dashboard README & Research Hub Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the repository homepage into a reader-first research dashboard, move structural complexity into a second-layer Research Hub, and formalize the three-layer literature retrieval mechanism.

**Architecture:** Preserve existing Baselines, weekly briefs, the 3×3 map, bibliography, Consensus provenance, and research history. Redesign only the reader/navigation surfaces and retrieval contract: `README*` becomes the public dashboard; `research/README*` becomes the navigation hub; `methodology/search-protocol.md` becomes the canonical retrieval workflow; the weekly automation maintains those contracts.

**Tech Stack:** GitHub Markdown, GitHub repository contents API, Consensus search/fetch, existing ChatGPT automation.

**Spec:** `docs/superpowers/specs/2026-08-29-dashboard-research-hub-redesign.md`

## Global Constraints

- Preserve 3 domains × 9 radars.
- Preserve historical weekly briefs and dated Baselines.
- Preserve `[A] [B] [C] [S]` evidence grades.
- Public GitHub excludes private editorial/advisory material, personalized writing/book strategy, user-specific projects, and conversational coaching.
- Chinese and English use the same information architecture and evidence identities.
- `Latest` means recent change; `Baseline` means current supported state.
- Consensus is the Evidence Backbone, not the sole freshness source.
- Discovery/indexing date is never represented as publication date.

---

## Task 1 — Rebuild bilingual README dashboards

**Files:** `README.md`, `README.zh-CN.md`

- [ ] Replace long hero navigation with exactly three primary links: Current Findings / Latest Research / Research Map (Chinese equivalents in the Chinese README).
- [ ] Put `Latest Research` immediately after Hero with 2–4 field-level signals from the current weekly brief, plus both language links.
- [ ] Compress the current research state into exactly five findings:
  1. Assisted performance is not retained capability.
  2. What is delegated matters more than how much AI is used.
  3. Metacognition / epistemic agency is emerging as a control layer.
  4. Human + AI does not automatically produce synergy.
  5. Individual cognitive effects can propagate into collective and cultural effects.
- [ ] Add a distinct Control / Retention / Variance working-model section with explicit non-grand-theory caveat.
- [ ] Add `Start Here` navigation by reader intent: Baseline, Latest Weekly, Research Map, Bibliography, Research History, Methodology.
- [ ] Collapse homepage research taxonomy to three compact domain summaries; link to the full 3×3 map.
- [ ] Keep Machine Culture compact: mechanism, Brinkmann et al. 2026 anchor, Rahwan watch link.
- [ ] Keep `How We Research` compact and show the three retrieval layers.
- [ ] Verify Chinese/English structural parity and current dates.
- [ ] Commit: `docs: redesign README as research dashboard`

## Task 2 — Convert bilingual `research/README*` into Research Hub

**Files:** `research/README.md`, `research/README.zh-CN.md`

- [ ] Replace Research Synthesis framing with `Research Hub`.
- [ ] Add `Current State`: current Baseline, research map, evidence gaps, Baseline-vs-Weekly distinction.
- [ ] Add `Research Stream`: latest bilingual weekly links, weekly archive, no automatic Baseline update.
- [ ] Add `Evidence Base`: Master Bibliography, BibTeX, Consensus ledgers, Evidence Grading, Search Protocol.
- [ ] Add `Research Evolution`: bilingual research history and migration rule.
- [ ] Verify Hub does not duplicate the five homepage findings or full Baseline.
- [ ] Commit: `docs: turn research README into navigation hub`

## Task 3 — Formalize three-layer literature radar

**File:** `methodology/search-protocol.md`

- [ ] Document Layer 1 `Consensus: Evidence Backbone`.
- [ ] Require `Consensus.search → Candidate → Consensus.fetch → canonical DOI/publisher/arXiv verification → Evidence Pool`.
- [ ] State metadata precedence, DOI/title deduplication, and citation-count limitation.
- [ ] Document Layer 2 `Publishers / arXiv / Conferences: Freshness Layer`.
- [ ] Define temporal labels exactly: `NEW`, `NEWLY INDEXED`, `NEWLY DISCOVERED`.
- [ ] Document Layer 3 `Researchers / Labs / Workshops: Frontier Signal Layer` and `[S]` rule.
- [ ] Preserve Machine Culture researcher/lab-first monitoring.
- [ ] Add canonical end-to-end pipeline through Weekly → Baseline comparison.
- [ ] Preserve causal safeguards, quiet-radar allowance, and one frozen bilingual evidence set.
- [ ] Commit: `docs: formalize three-layer literature radar`

## Task 4 — Update weekly automation

**Automation:** `Human Cognition with AI Weekly` (`6a545cb760748191b8a4b1800d9ad938`)

- [ ] Name all three retrieval layers explicitly.
- [ ] Add `NEW / NEWLY INDEXED / NEWLY DISCOVERED` semantics.
- [ ] Preserve Consensus fetch + canonical verification + dated provenance ledgers.
- [ ] Update Dashboard sync contract: only compact Latest signals/date/links weekly; Current Findings only when Baseline materially changes.
- [ ] Preserve Research Hub as four-block navigation layer.
- [ ] Preserve Baseline versioning rules and public/private filter.
- [ ] Verify task remains enabled on the same Friday 08:00 schedule.

## Task 5 — Review, merge, and post-merge verification

- [ ] Compare branch with `main`; substantive implementation files should be the two READMEs, two Research Hub files, and search protocol, plus spec/plan documentation.
- [ ] Create non-draft PR.
- [ ] Inspect PR patch for duplication, broken relative paths, inconsistent dates, translation drift, asset deletion, or homepage re-expansion.
- [ ] Audit public implementation files for private/personalized material.
- [ ] Verify linked targets exist: current Baseline pair, latest weekly pair, research map, evidence grading, search protocol, bibliography, BibTeX, Consensus ledgers, research history, Rahwan page.
- [ ] Merge only when PR is mergeable and head SHA is stable; use squash merge.
- [ ] Re-read from `main`: both READMEs, both Research Hub files, search protocol.
- [ ] Confirm README order Hero → Latest → Current Findings → Working Model → Start Here; Research Hub four blocks; search protocol three layers + three temporal labels.
- [ ] Confirm weekly automation remains enabled with redesigned sync contract.

## Verification Checklist

Before making a completion claim, fresh evidence must confirm:

- Dashboard bilingual structure matches approved spec.
- Research Hub bilingual structure has exactly the four intended blocks.
- Three-layer retrieval and temporal labels are present in the canonical protocol.
- Historical Baselines, weekly briefs, bibliography, and provenance assets were not deleted.
- Public implementation contains no private/personalized editorial material.
- PR is merged and key files are actually present on `main`.
- Weekly automation is enabled with unchanged Friday cadence and the updated prompt.