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

**Full-rescan decision on 2026-08-29: Baseline unchanged.** New research strengthened the empirical basis for Control and Retention and made the Variance story more explicitly conditional, but did not change the three-dimensional model or the 3×3 Research Map. No duplicate Baseline was created merely to signal activity.

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

Each gap is tracked as `OBSERVE`, `REPEAT`, or `CANDIDATE`. **Only a human decision can promote a recurring gap into a future Research Lab.**

---

## 3｜Research Stream

### Latest Full Research Refresh

- 🇬🇧 **[2026-08-29 English Research Refresh](../weekly/2026/2026-08-29.en.md)**
- 🇨🇳 **[2026-08-29 中文研究刷新](../weekly/2026/2026-08-29.zh-CN.md)**

This was not a narrow paper update. It re-scanned all **9 radars × 3 retrieval layers** under the repository's current protocol. The most important change is that more studies now directly measure no-AI transfer or return-to-manual-work outcomes, moving **Retention** further into experimental design. Cross-domain comparisons between `human-led / bounded / active` and `model-led / passive / open delegation` also give **Control** stronger empirical support.

Weekly briefs and research refreshes answer **“Where did the field change?”** A new dated Baseline is created only when verified evidence materially changes a conclusion's strength, boundary, an important evidence gap, or the working model.

Future Weekly Briefs / Research Refreshes also end with **Open Questions & Research Gaps**, distinguishing newly exposed gaps, persistent gaps, and narrowed/closed gaps. The section must be grounded in the verified evidence set rather than free-form hypothesis generation.

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