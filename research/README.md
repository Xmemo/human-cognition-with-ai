# Research Hub｜Human Cognition with AI

[中文](README.zh-CN.md) · [Project Dashboard](../README.md)

This is the second-layer navigation hub behind the public dashboard. It separates five research assets that should not be confused:

- **Current State** — what the evidence currently supports;
- **Open Questions & Research Gaps** — what the accumulated literature still cannot answer;
- **Research Stream** — what changed recently;
- **Evidence Base** — where claims and citations come from;
- **Research Evolution** — how the framework reached its current form.

> **Baseline = current supported state. Weekly Brief / Research Refresh = recent change. Open Questions & Research Gaps = unresolved problems exposed by the evidence.** None of these automatically becomes a project-owned hypothesis.

---

## 1｜Current State

### Current Evidence Baseline

**[Human Cognition with AI｜Evidence Baseline｜2026-08-29](baseline-2026-08-29.en.md)**

The Baseline is the canonical statement of what the project currently believes the evidence can support. It contains evidence boundaries, caveats, unsupported conclusions, open questions, and the current **Control / Retention / Variance** working model.

**2026-09-29 catch-up decision: Baseline unchanged.** The catch-up adds stronger randomized evidence that the direction and stage of evaluative judgment matter after AI withdrawal, plus new semester-long, collaboration-mode, creativity, and human-proxy evidence. These findings sharpen the interaction-architecture view but do not yet justify a new dated Baseline.

### Current Research Map

**[3 Domains × 9 Radars](../methodology/research-map.md)**

The map is a search architecture rather than a claim that the research field divides into nine clean boxes. Every radar is scanned; final selection is competitive across the whole candidate pool.

---

## 2｜Open Questions & Research Gaps

**[Living gap ledger and promotion rules](../methodology/open-questions-research-gaps.md)**

This is the observatory's problem-discovery layer. It converts repeated limitations, contradictions, missing measurements, and short time horizons into **neutral research questions**, without turning them into project hypotheses.

Current recurring gaps include:

- months/years-long AI-on / AI-off retention;
- longitudinal expert trajectories under sustained AI use;
- decomposition of which bounded-support components actually drive retention;
- behavioral validation of epistemic-agency / critical-AI-use measures;
- human–AI network structures that raise performance while preserving collective variance;
- real-world persistence of Machine Culture transmission, norm, and partner-selection effects.

**2026-09-29 catch-up:** no long-lived gap status changes. G03 becomes more concrete because a two-site randomized writing experiment identifies the **direction of evaluative judgment** as a mechanism-level signal, but multiple task components still vary together, so the mechanism gap remains open. G05 retains the 2026-09-10 narrowing around error correlation and agent proportion.

Each gap is tracked as `OBSERVE`, `REPEAT`, or `CANDIDATE`. **Only a human decision can promote a recurring gap into a future Research Lab.**

---

## 3｜Research Stream

### Latest Weekly Research Brief

- 🇬🇧 **[2026-10-23 Weekly Evidence Observatory](../weekly/2026/2026-10-23.en.md)**
- 🇨🇳 **[2026-10-23 每周证据观测](../weekly/2026/2026-10-23.zh-CN.md)**
- 🧊 **[Frozen evidence manifest](../weekly/2026/2026-10-23.evidence.json)**

This edition contrasts a new formal account of human–AI error correction with a randomized null result on clinician trust from explanation features. It also examines self-efficacy versus skill retention, creativity during AI-generation waits, and upstream selection in social learning. The **2026-08-29 Baseline remains unchanged**; G01–G06 remain open.

Weekly briefs answer **“Where did the field change?”** A new dated Baseline is created only when verified evidence materially changes a conclusion's strength, boundary, an important evidence gap, or the working model.

Every Weekly Brief / Research Refresh ends with **Open Questions & Research Gaps**, distinguishing newly exposed gaps, persistent gaps, and narrowed/closed gaps. The section must be grounded in the verified evidence set rather than free-form hypothesis generation.

### Archive

→ **[Browse the 2026 weekly research archive](../weekly/2026/)**

---

## 4｜Evidence Base

### Curated references

- **[Master Bibliography](../references/master-bibliography.md)** — curated research by domain and radar.
- **[BibTeX](../references/master.bib)** — citation-ready records.

### Consensus provenance

- **[Initial Consensus ledger](../references/consensus.md)**
- **[2026-08-29 Consensus refresh + full-rescan ledger](../references/consensus/2026-08-29.md)**
- **[2026-09-04 Consensus weekly ledger](../references/consensus/2026-09-04.md)**
- **[2026-09-29 Consensus catch-up ledger](../references/consensus/2026-09-29.md)**
- **[2026-10-23 Consensus provenance](../references/consensus/2026-10-23.md)**

A Consensus ledger records fetch-verified discovery provenance; inclusion in a ledger does not automatically promote a paper to foundational evidence.

### Retrieval and grading

- **[Weekly Search Protocol](../methodology/search-protocol.md)** — three-layer literature radar: Consensus Evidence Backbone + Freshness Layer + Frontier Signal Layer.
- **[Evidence Grading](../methodology/evidence-grading.md)** — `[A] Strong empirical`, `[B] Promising/moderate`, `[C] Conceptual/exploratory`, `[S] Strategic signal`.
- **[Open Questions & Research Gaps](../methodology/open-questions-research-gaps.md)** — evidence-grounded gap detection and promotion boundaries.
- **[Publishing Policy](../methodology/publishing-policy.md)** — bilingual and public/private publishing rules.

---

## 5｜Research Evolution

### How the current framework emerged

**[Research History & Migration](research-history.en.md)** traces the project's movement from early work on cognitive protection and augmentation, through **AI-assisted writing as a form of thinking**, toward the current `Human Cognition with AI` framing and the 3×3 radar.

The migration rule is strict: **legacy questions and conceptual structures may survive, but old claims, numerical results, or references that cannot be re-verified are not automatically promoted into the current Baseline.**

### The current observatory loop

```text
Legacy questions / broad research domains
          ↓
3×3 Radar × Three-Layer Retrieval
          ↓
Verified Evidence Pool
          ↓
Weekly Briefs / Research Refreshes
          ↓
      ┌───────────────────────────────┐
      │                               │
      ▼                               ▼
Compare with Current Baseline   Gap / contradiction detection
      │                               │
      ▼                               ▼
Baseline revision only if       Open Questions & Research Gaps
materially justified                  │
                                      ▼
                               Human promotion gate only
                                      │
                                      ▼
                               Future Research Lab
```

The Observatory and a future Research Lab remain intentionally separate. Project-generated hypotheses or research outputs receive no privileged status; they must return through the same evidence review before they can affect the Baseline.

The architecture decision is documented in **[`docs/architecture/evidence-observatory-and-autonomous-research-lab.md`](../docs/architecture/evidence-observatory-and-autonomous-research-lab.md)**.

The repository is therefore not a static bibliography or a dump of previous notes. It preserves a visible chain of **research state → new evidence → unresolved questions → justified revision**.