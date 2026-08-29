# Human Cognition with AI — Dashboard README & Research Hub Redesign

**Date:** 2026-08-29  
**Status:** Approved design, implementation pending spec review  
**Scope:** Information architecture, reader navigation, research-discovery methodology, bilingual parity

## 1. Problem

The repository now contains a serious research system — current evidence baseline, weekly radar, 3×3 research map, methodology, bibliography, Consensus provenance, and research history — but the homepage still exposes too much of that internal structure at the same visual level.

A new reader currently has to distinguish between `Current Baseline`, `Research Synthesis`, `Research History`, `Research Map`, `Bibliography`, and the weekly brief before understanding the basic product promise. The repository is logically sound but reader-heavy.

The redesign will separate:

- **reader-facing research product** — what this is, what changed recently, what we currently know;
- **second-layer research hub** — where to go for baseline, weekly stream, evidence base, methodology, and research history;
- **research infrastructure** — search protocol, evidence grading, provenance, bibliography.

The core principle is:

> **Findings before taxonomy; change before archive; reader questions before file structure.**

## 2. Goals

1. A first-time visitor should understand the project in under 30 seconds.
2. A returning visitor should see the newest meaningful research changes immediately.
3. The repository's current strongest research conclusions should appear before methodology and taxonomy.
4. `Latest` and `Baseline` must become the two primary dynamic concepts:
   - **Latest:** what changed recently?
   - **Baseline:** what does the evidence currently support?
5. `research/README*` becomes a true second-layer Research Hub rather than another synthesis page.
6. The academic retrieval mechanism must explicitly combine Consensus, fresh publication sources, and researcher/lab monitoring rather than imply that one database is sufficient.
7. Chinese and English versions must remain structurally equivalent without requiring literal sentence-by-sentence translation.

## 3. Non-goals

- No new website or static-site generator.
- No new taxonomy beyond the existing 3 domains × 9 radars.
- No deletion or rewriting of historical weekly briefs or baselines.
- No attempt to backfill every historical research item.
- No new public sections for private editorial material such as `专家说`, `元认知重构`, personalized writing strategy, or private book strategy.
- No change to evidence grades `[A] [B] [C] [S]`.

## 4. Primary Reader Model

The public repository must support two dominant paths.

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
→ If yes, inspect new Baseline
```

## 5. README Information Architecture

Both `README.md` and `README.zh-CN.md` will use the same section order.

### 5.1 Hero

Purpose: explain the project, not expose the repository file tree.

Required content:

- `Human Cognition with AI`
- bilingual research-observatory positioning;
- one short description of the core problem;
- the three research questions:
  1. How is AI changing human cognition?
  2. How can AI augment rather than substitute for cognition?
  3. What happens when these changes propagate through groups and culture?
- compact trust line: `Bilingual · Updated weekly · Evidence-first`;
- only three first-level navigation links:
  - **Current Findings**
  - **Latest Research**
  - **Research Map**

The current long top navigation list (`Baseline · Synthesis · History · Map · Bibliography ...`) is removed from the hero.

### 5.2 Latest Signals

This appears before the current findings so returning readers can immediately see whether the field changed.

Required structure:

- date of latest weekly brief;
- 2–4 strongest field-level signals from that brief;
- each signal uses concise mechanism-first language;
- optional radar/evidence tags;
- direct links to the Chinese and English full weekly briefs.

Selection rule:

- do **not** mechanically copy the first items from the weekly brief;
- select signals that best represent a meaningful change in field state;
- if no important baseline-relevant signal exists, explicitly state that no major baseline-changing signal was found rather than fabricating novelty.

### 5.3 Current Findings

Purpose: surface the repository's intellectual output, not another mini literature review.

Compress the current seven-point summary into five higher-level findings:

1. **Assisted performance is not retained capability.**
2. **The important question is what gets delegated, not simply how much AI is used.**
3. **Metacognition / epistemic agency is emerging as a control layer.**
4. **Human + AI does not automatically produce synergy.**
5. **Individual cognitive effects can propagate into collective and cultural effects.**

Each finding receives one short explanatory paragraph and links implicitly or explicitly to the full current Evidence Baseline.

The Baseline remains the canonical source for evidence grades, caveats, counterevidence, unsupported conclusions, and detailed references.

### 5.4 Working Model — Control / Retention / Variance

Present the current organizing model as a distinct box/section, not a sixth conclusion:

- **Control:** who controls critical cognitive nodes?
- **Retention:** what remains after AI is removed?
- **Variance:** how much collective search space remains?

The page must explicitly state that this is a **research-organizing working model, not a fully validated grand theory**.

### 5.5 Start Here

Navigation is organized by reader intent rather than repository filenames.

Required entries:

| Reader question | Destination |
|---|---|
| What has this project found so far? | Current Evidence Baseline |
| What is new this week? | Latest Weekly Brief |
| What exactly does the project track? | 3×3 Research Map |
| Where are the papers and DOIs? | Master Bibliography |
| How did the framework evolve? | Research History |
| How are papers found and graded? | Methodology |

### 5.6 Three Research Domains

README shows only the three domain-level questions and compact keywords.

Do **not** reproduce the full nine-radar definitions on the homepage.

1. **Human Cognitive Change** — offloading, metacognition, critical thinking / creativity / writing.
2. **Cognitive Augmentation & Governance** — tools for thought, human–AI collaboration, cognitive resilience.
3. **Machine Culture & Collective Cognition** — machine culture, collective intelligence, social learning.

Link to the complete research map for detailed radar definitions and search logic.

### 5.7 Frontier Track — Machine Culture

Retain Machine Culture as the signature frontier track, but keep it compact.

Include:

- one paragraph explaining why it changes the unit of analysis;
- one canonical experimental anchor (Brinkmann et al. 2026);
- one link to the Iyad Rahwan watch page.

Do not allow this section to become another long bibliography.

### 5.8 How We Research

README exposes only the compact public version:

```text
9 Radars
→ Evidence Backbone + Freshness Layer + Frontier Layer
→ Candidate Pool
→ Source Verification
→ Evidence Grading
→ Weekly Brief
→ Compare with Baseline
```

Then link to `methodology/search-protocol.md`, evidence grading, bibliography, and research hub.

Detailed research operations live below the homepage.

## 6. Research Hub Information Architecture

`research/README.md` and `research/README.zh-CN.md` stop being duplicated synthesis pages and become the navigation center for the research layer.

Use four blocks.

### 6.1 Current State

Answers: **What does the project currently believe the evidence can support?**

Links:

- Current Evidence Baseline;
- current 3×3 Research Map;
- current evidence gaps / open questions.

Include a concise explanation of the difference between a Baseline and a Weekly Brief.

### 6.2 Research Stream

Answers: **What changed recently?**

Links:

- Latest Weekly Brief;
- Weekly Archive.

Explain that weekly briefs can update without forcing a new baseline.

### 6.3 Evidence Base

Answers: **What evidence supports the repository?**

Links:

- Master Bibliography;
- BibTeX;
- Consensus provenance ledgers;
- Evidence Grading;
- Search Protocol.

### 6.4 Research Evolution

Answers: **How did the current framework emerge?**

Links:

- Research History & Migration;
- prior cognitive-protection / augmentation and writing-as-thinking lineage;
- methodology documents where relevant.

The Hub does not repeat all seven/eight baseline conclusions. Its job is navigation and conceptual separation.

## 7. Three-Layer Literature Retrieval Mechanism

`methodology/search-protocol.md` is upgraded from a two-family search description to an explicit three-layer radar.

### Layer 1 — Consensus: Evidence Backbone

Purpose: retrieve and verify research already entering the formal academic record.

Priority content:

- peer-reviewed papers;
- systematic reviews;
- meta-analyses;
- controlled experiments;
- longitudinal / observational work;
- recent journal papers.

Required workflow:

```text
Consensus.search
→ Candidate
→ Consensus.fetch
→ DOI / canonical publisher verification
→ Evidence Pool
```

Rules:

- a search-result snippet is never a citation;
- retained Consensus results must be fetched before citation;
- citation count is not an evidence grade;
- canonical DOI / publisher / arXiv metadata takes precedence over conflicting aggregator metadata;
- Consensus is the evidence backbone, not the sole freshness source.

### Layer 2 — Freshness Layer

Purpose: catch research that may be too new for weekly academic-database ingestion.

Sources include:

- publisher Online First / Early View pages;
- arXiv and equivalent preprint servers;
- ACM / CHI / conference accepted-paper pages;
- Nature / Science / Springer / Elsevier and other canonical publication pages.

Time labels:

- `NEW` — actually published/released inside the current scan window;
- `NEWLY INDEXED` — previously published but newly indexed by Consensus / bibliographic infrastructure this week;
- `NEWLY DISCOVERED` — previously available but first detected by this observatory this week.

A discovery date must never be misrepresented as a publication date.

### Layer 3 — Frontier Signal Layer

Purpose: detect where the field is moving before it produces a conventional paper record.

Sources include:

- researcher pages;
- lab / center pages;
- workshops;
- special issues;
- institutional research programs;
- substantive keynotes / research talks;
- policy or institutional research signals.

All non-empirical field signals remain `[S] Strategic Signal` unless accompanied by empirical evidence.

Machine Culture receives researcher/lab-first monitoring, including Rahwan / CHM and relevant collaborators, because this frontier is sparse, fast-moving, and often visible through preprints and lab networks before broad indexing.

## 8. Weekly Retrieval and Baseline Flow

The canonical flow becomes:

```text
                         ┌─ Consensus
                         │  Evidence Backbone
                         │
9 Radar Queries ─────────┼─ Publishers / arXiv / Conferences
                         │  Freshness Layer
                         │
                         └─ Researchers / Labs / Workshops
                            Frontier Signal Layer
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

Baseline update rules remain unchanged:

- create a new dated baseline only when evidence materially changes claim strength, claim boundaries/caveats, major evidence gaps, or the organizing model;
- never overwrite a historical baseline merely to look active.

## 9. Bilingual Publishing

Chinese and English versions remain structurally aligned.

Rules:

- research is performed once;
- one evidence set is frozen before bilingual publication;
- Chinese is the canonical editorial edition;
- English is an idiomatic editorial rewrite from the same evidence set, not an independent second research pass;
- paper titles, source identity, DOI, evidence grade, caveats, and signal timing labels remain identical across languages;
- README section order and Research Hub structure remain equivalent in both languages.

## 10. Files to Modify

Implementation is limited to the existing structure:

- `README.md`
- `README.zh-CN.md`
- `research/README.md`
- `research/README.zh-CN.md`
- `methodology/search-protocol.md`
- weekly automation prompt for `Human Cognition with AI Weekly`

Historical Baselines, weekly briefs, bibliography files, Consensus ledgers, research map, and research history remain intact unless a factual link correction is needed.

## 11. Automation Changes

The existing weekly automation will be updated to mirror the public methodology:

- explicitly treat Consensus as the Evidence Backbone rather than sole source;
- explicitly run a freshness pass across publisher / arXiv / conference sources;
- explicitly run researcher/lab/workshop frontier monitoring;
- tag discoveries as `NEW`, `NEWLY INDEXED`, or `NEWLY DISCOVERED` where relevant;
- preserve the existing 9-radar scan, evidence grading, bilingual freeze, Consensus fetch verification, bibliography update, public/private filter, and baseline-maintenance rules.

If GitHub synchronization fails, the research brief still succeeds and reports `GITHUB_SYNC_BLOCKED` rather than pretending publication succeeded.

## 12. Acceptance Criteria

Implementation is complete only if all are true:

1. README begins with Hero → Latest Signals → Current Findings, not taxonomy or asset lists.
2. README visibly distinguishes Latest from Baseline.
3. README contains no more than three hero navigation links.
4. README shows five high-level current findings and the Control / Retention / Variance working model.
5. README contains a reader-intent `Start Here` navigation table.
6. README compresses the 3×3 map to three domains only.
7. `research/README*` is a Research Hub with Current State / Research Stream / Evidence Base / Research Evolution.
8. `methodology/search-protocol.md` documents all three literature layers and timing labels.
9. Weekly automation uses the same three-layer mechanism and timing semantics.
10. Chinese and English navigation structures match.
11. Existing Baselines, weekly briefs, bibliography, Consensus ledgers, research history, evidence grades, and private-content publishing filters remain preserved.
12. Public repository search returns no accidental private headings such as `专家说` or `元认知重构`.
13. Final PR diff is reviewed before merge, merged to `main`, and key files are re-fetched from `main` after merge for verification.

## 13. Validation Plan

Before merge:

- compare branch with `main`;
- inspect README section ordering in both languages;
- inspect Research Hub section ordering in both languages;
- inspect `search-protocol.md` for three-layer retrieval and timing-label definitions;
- verify links point to existing repository files;
- search the branch/repository for excluded private headings;
- confirm no historical baseline / weekly / reference assets were deleted.

After merge:

- fetch `README.md`, `README.zh-CN.md`, `research/README.md`, `research/README.zh-CN.md`, and `methodology/search-protocol.md` from `main`;
- confirm PR merged state and merge commit SHA;
- confirm automation remains enabled with weekly Friday schedule and updated prompt.