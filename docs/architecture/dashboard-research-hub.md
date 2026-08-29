# Dashboard & Research Hub Architecture

## Purpose

The public repository has two reader-facing layers:

1. **Dashboard (`README.md` / `README.zh-CN.md`)** — answers what this project is, what changed recently, and what the evidence currently supports.
2. **Research Hub (`research/README.md` / `research/README.zh-CN.md`)** — routes readers into the Baseline, weekly stream, evidence base, methodology, and research history.

The design principle is:

> **Findings before taxonomy; change before archive; reader questions before file structure.**

## Dashboard order

The homepage follows a stable sequence:

1. Hero and three project questions.
2. Latest Research — 2–4 field-level signals.
3. Current Findings — five high-level evidence-backed conclusions.
4. Control / Retention / Variance working model.
5. Start Here — intent-based navigation.
6. Three Research Domains.
7. Machine Culture frontier.
8. How We Research.

`Latest` and `Baseline` remain distinct:

- **Latest:** what changed recently?
- **Baseline:** what does the evidence currently support?

A weekly research update does not automatically create a new Baseline.

## Research Hub

The second-level hub stays organized into four blocks:

- **Current State** — current Baseline, research map, priority evidence gaps.
- **Research Stream** — latest research refresh and archive.
- **Evidence Base** — bibliography, BibTeX, Consensus provenance, evidence grading, search protocol.
- **Research Evolution** — research history and framework migration.

The Hub must not become a duplicate synthesis page.

## Retrieval model

The public research pipeline uses three retrieval layers:

```text
9 Research Radars
      ↓
Consensus — Evidence Backbone
+ Publishers / arXiv / Conferences — Freshness Layer
+ Researchers / Labs / Workshops — Frontier Signal Layer
      ↓
Candidate Pool
      ↓
Canonical Source Verification
      ↓
Evidence Grading
      ↓
Weekly Research Brief
      ↓
Compare with Current Baseline
```

Temporal labels are explicit:

- `NEW` — actually released in the current scan window.
- `NEWLY INDEXED` — older work newly entering bibliographic indexing.
- `NEWLY DISCOVERED` — older work first detected by the observatory.

## Bilingual contract

Research is performed once. One evidence set is frozen before publication. Chinese and English editions preserve the same source identity, ordering, evidence grades, temporal semantics, and substantive caveats, while allowing idiomatic editorial differences.

## Public boundary

Public repository and website content must not expose private editorial/advisory material, personalized project strategy, private book planning, or conversational coaching.
