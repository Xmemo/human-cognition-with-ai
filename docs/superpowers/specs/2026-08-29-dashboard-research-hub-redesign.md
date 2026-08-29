# Human Cognition with AI — Dashboard README & Research Hub Redesign

**Date:** 2026-08-29  
**Status:** Approved  
**Scope:** Information architecture, reader navigation, research-discovery methodology, bilingual parity

## 1. Problem

The repository contains a serious research system — current evidence baseline, weekly radar, 3×3 research map, methodology, bibliography, Consensus provenance, and research history — but the homepage exposes too much internal structure at the same visual level.

A new reader should not need to distinguish between Baseline, Research Hub, Research History, Research Map, Bibliography, and weekly briefs before understanding the project. The redesign separates:

- **reader-facing research product** — what this is, what changed recently, what we currently know;
- **second-layer Research Hub** — where to go for baseline, weekly stream, evidence base, methodology, and history;
- **research infrastructure** — retrieval protocol, evidence grading, provenance, and bibliography.

> **Findings before taxonomy; change before archive; reader questions before file structure.**

## 2. Goals

1. A first-time visitor can understand the project in under 30 seconds.
2. A returning visitor sees the newest meaningful research changes immediately.
3. Current research findings appear before methodology and taxonomy.
4. `Latest` and `Baseline` are the two primary dynamic concepts:
   - **Latest:** what changed recently?
   - **Baseline:** what does the evidence currently support?
5. `research/README*` becomes a true second-layer Research Hub rather than another synthesis page.
6. Retrieval explicitly combines Consensus, fresh publication sources, and researcher/lab monitoring.
7. Chinese and English versions remain structurally equivalent without literal sentence-by-sentence translation.

## 3. Non-goals

- No website or static-site generator.
- No new taxonomy beyond the existing 3 domains × 9 radars.
- No deletion or style rewrite of historical weekly briefs or baselines.
- No attempt to backfill every historical research item.
- No public exposure of private editorial/advisory sections, personalized writing/book strategy, user-specific projects, or conversational coaching.
- No change to evidence grades `[A] [B] [C] [S]`.

## 4. Primary Reader Model

### First-time reader

```text
What is this?
→ What changed recently?
→ What have you learned so far?
→ What is the current working model?
→ Where do I go deeper?
```

### Returning reader

```text
Latest Signals
→ Weekly Brief
→ Did this materially change the Baseline?
→ If yes, inspect the new Baseline
```

## 5. README Information Architecture

Both `README.md` and `README.zh-CN.md` use the same section order.

### 5.1 Hero

Required:
- project name and bilingual research-observatory positioning;
- short statement of the problem;
- three research questions:
  1. How is AI changing human cognition?
  2. How can AI augment rather than substitute for cognition?
  3. What happens when these changes propagate through groups and culture?
- compact trust line: `Bilingual · Updated weekly · Evidence-first`;
- only three primary navigation links: **Current Findings · Latest Research · Research Map**.

### 5.2 Latest Research

Appears immediately after the hero.

Required:
- latest weekly date;
- 2–4 strongest field-level signals;
- concise mechanism-first language;
- links to both language editions;
- explicit distinction between Weekly and Baseline.

Do not mechanically copy the first weekly items. If no meaningful shift is found, say so rather than fabricate novelty.

### 5.3 Current Findings

Compress the current research state into five high-level findings:

1. Assisted performance is not retained capability.
2. What gets delegated matters more than how much AI is used.
3. Metacognition / epistemic agency is emerging as a control layer.
4. Human + AI does not automatically produce synergy.
5. Individual cognitive effects can propagate into collective and cultural effects.

Each receives one concise explanation. The dated Baseline remains canonical for detailed evidence grades, caveats, counterevidence, unsupported conclusions, and references.

### 5.4 Working Model — Control / Retention / Variance

Present separately from the five findings:
- **Control:** who controls critical cognitive nodes?
- **Retention:** what remains after AI is removed?
- **Variance:** how much collective search space remains?

State explicitly that this is a **research-organizing working model, not a fully validated grand theory**.

### 5.5 Start Here

Navigation is organized by reader intent:

| Reader question | Destination |
|---|---|
| What has this project found so far? | Current Evidence Baseline |
| What is new this week? | Latest Weekly Brief |
| What exactly does the project track? | 3×3 Research Map |
| Where are the papers and DOIs? | Master Bibliography |
| How did the framework evolve? | Research History |
| How are papers found and graded? | Research Hub / Methodology |

### 5.6 Three Research Domains

Homepage shows only the three domain-level questions and compact keywords:

1. **Human Cognitive Change** — offloading, metacognition, critical thinking / creativity / writing.
2. **Cognitive Augmentation & Governance** — tools for thought, human–AI collaboration, cognitive resilience.
3. **Machine Culture & Collective Cognition** — machine culture, collective intelligence, social learning.

Full nine-radar definitions remain in `methodology/research-map.md`.

### 5.7 Frontier Track — Machine Culture

Keep compact:
- one paragraph on why it changes the unit of analysis;
- Brinkmann et al. 2026 as an experimental anchor;
- link to the Iyad Rahwan watch page.

### 5.8 How We Research

Homepage exposes only the compact public pipeline:

```text
9 Radars
→ Evidence Backbone + Freshness Layer + Frontier Layer
→ Candidate Pool
→ Source Verification
→ Evidence Grading
→ Weekly Brief
→ Compare with Baseline
```

Detailed operations live in methodology documents.

## 6. Research Hub Information Architecture

`research/README.md` and `research/README.zh-CN.md` become a four-block navigation hub.

### 6.1 Current State
- Current Evidence Baseline
- current 3×3 Research Map
- priority evidence gaps
- concise Baseline vs Weekly distinction

### 6.2 Research Stream
- Latest Weekly Brief
- Weekly Archive
- explanation that weekly updates do not force Baseline updates

### 6.3 Evidence Base
- Master Bibliography
- BibTeX
- Consensus provenance ledgers
- Evidence Grading
- Search Protocol

### 6.4 Research Evolution
- Research History & Migration
- earlier cognitive-protection / augmentation and writing-as-thinking lineage
- migration rule: legacy questions may survive; unverifiable old claims do not automatically enter the current Baseline

The Hub must not reproduce the homepage five findings or the full Baseline.

## 7. Three-Layer Literature Retrieval Mechanism

`methodology/search-protocol.md` is the canonical retrieval contract.

### Layer 1 — Consensus: Evidence Backbone

Purpose: retrieve and verify work entering the formal academic record.

Workflow:

```text
Consensus.search
→ Candidate
→ Consensus.fetch
→ DOI / publisher / arXiv canonical verification
→ Evidence Pool
```

Rules:
- search-result snippets are never citations;
- retained Consensus records must be fetched;
- citation count is not an evidence grade;
- canonical DOI/publisher/arXiv metadata overrides conflicting aggregator metadata;
- deduplicate by DOI, then normalized title;
- Consensus is the evidence backbone, not the sole freshness source.

### Layer 2 — Publishers / arXiv / Conferences: Freshness Layer

Purpose: catch work too new for weekly database ingestion.

Sources include publisher Online First / Early View pages, arXiv/equivalent preprints, ACM/CHI or other conference accepted/proceedings pages, and canonical publisher records.

Temporal labels:
- `NEW` — actually released in the current scan window;
- `NEWLY INDEXED` — older publication newly entering bibliographic indexing;
- `NEWLY DISCOVERED` — older publication first detected by the observatory.

Discovery or indexing date must never be presented as publication date.

### Layer 3 — Researchers / Labs / Workshops: Frontier Signal Layer

Purpose: detect field movement before every development becomes a conventional paper record.

Sources include researcher pages, labs/centers, workshops, special issues, institutional research programs, substantive first-party talks, and policy/research signals.

Non-empirical frontier items remain `[S] Strategic Signal` unless separately backed by empirical evidence.

Machine Culture receives researcher/lab-first monitoring, including Rahwan / CHM and relevant collaborators, because the frontier is sparse and fast-moving.

## 8. Weekly Retrieval and Baseline Flow

```text
                         ┌─ Consensus — Evidence Backbone
9 Radar Queries ─────────┼─ Publishers / arXiv / Conferences — Freshness
                         └─ Researchers / Labs / Workshops — Frontier
                                      ↓
                               Candidate Pool
                                      ↓
                              Source Verification
                                      ↓
                              Evidence Grading
                                      ↓
                              Weekly Research Brief
                                      ↓
                           Compare with Current Baseline
                                  /              \
                       no material change      material change
                              ↓                     ↓
                         Weekly only          New dated Baseline
```

Create a new dated Baseline only when verified evidence materially changes claim strength, claim boundaries/caveats, major evidence gaps, the Control/Retention/Variance model, or the 3×3 research map. Historical Baselines are not overwritten merely to appear active.

## 9. Bilingual Publishing

- Research is performed once.
- One evidence set is frozen before bilingual publication.
- Chinese is the canonical editorial edition.
- English is an idiomatic editorial rewrite from the same evidence set, not a second research pass.
- Paper titles, source identity, DOI, evidence grade, caveats, and temporal labels remain aligned.
- README section order and Research Hub structure remain equivalent.

## 10. Files / Systems Modified

- `README.md`
- `README.zh-CN.md`
- `research/README.md`
- `research/README.zh-CN.md`
- `methodology/search-protocol.md`
- weekly automation `Human Cognition with AI Weekly`
- this design spec and its implementation plan

Historical Baselines, weekly briefs, bibliography files, Consensus ledgers, research map, and research history remain intact unless a factual link correction is required.

## 11. Automation Contract

The weekly automation must:
- scan all 9 radars;
- use all three retrieval layers;
- distinguish `NEW`, `NEWLY INDEXED`, and `NEWLY DISCOVERED`;
- preserve Consensus fetch verification and canonical metadata precedence;
- preserve one frozen bilingual evidence set;
- update only compact Latest Research signals and links on the Dashboard unless a material Baseline change occurs;
- keep `research/README*` as a navigation Hub;
- preserve public/private publishing boundaries;
- report `GITHUB_SYNC_BLOCKED` if GitHub write access fails instead of pretending sync succeeded.

## 12. Acceptance Criteria

Implementation is complete only if all are true:

1. README begins with Hero → Latest Research → Current Findings, before taxonomy or asset lists.
2. README clearly distinguishes Latest from Baseline.
3. Hero contains only three primary navigation links.
4. README shows five high-level findings and the Control / Retention / Variance working model.
5. README contains reader-intent `Start Here` navigation.
6. README compresses the map to three domains only.
7. `research/README*` contains Current State / Research Stream / Evidence Base / Research Evolution.
8. `methodology/search-protocol.md` documents all three retrieval layers and all three temporal labels.
9. Weekly automation uses the same mechanism and sync contract.
10. Chinese and English navigation structures match.
11. Existing research assets and evidence grades are preserved.
12. Public implementation files contain no private editorial/advisory content or personalized strategy.
13. Final PR diff is reviewed before merge; key files are re-read from `main` after merge.

## 13. Validation Plan

Before merge:
- compare feature branch with `main`;
- inspect bilingual README and Hub ordering;
- inspect the three-layer search protocol and temporal labels;
- verify key linked files exist;
- audit public implementation files for private/personalized content;
- confirm no historical Baseline, weekly, bibliography, or reference assets were deleted.

After merge:
- re-fetch README, Research Hub, and search protocol from `main`;
- confirm PR merged state and merge SHA;
- confirm weekly automation remains enabled on the Friday schedule with the updated prompt.