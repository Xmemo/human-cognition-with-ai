# Weekly Search Protocol

## Objective

Detect **where the Human Cognition with AI research field changed this week**, not merely collect 12 papers.

The observatory uses a **three-layer literature radar** so no single database is mistaken for the whole field:

```text
9 Research Radars
        ↓
Layer 1 — Consensus: Evidence Backbone
Layer 2 — Publishers / arXiv / Conferences: Freshness Layer
Layer 3 — Researchers / Labs / Workshops: Frontier Signal Layer
        ↓
Candidate Pool
        ↓
Canonical Source Verification
        ↓
Evidence Grading
        ↓
Weekly Brief
        ↓
Compare with Current Baseline
        ↓
Weekly update only OR new dated Baseline
```

Coverage is mandatory across all nine radars. Selection is not.

---

## 1. Scan all nine radars

Every run actively searches all nine radars defined in [`research-map.md`](research-map.md):

1. Cognitive Offloading, Skill Formation & Expertise
2. Metacognition, Epistemic Agency & Judgment
3. Critical Thinking, Memory, Creativity & Writing Cognition
4. Tools for Thought & Cognitive Augmentation
5. Human–AI Collaboration & Hybrid Intelligence
6. Cognitive Resilience, Authorship & Responsibility
7. Machine Culture & Cultural Evolution
8. Collective Intelligence & Human–AI Groups
9. Social Learning, Norms & Cultural Feedback

Start with the last **7 days**. If a radar has too few meaningful results, expand to the last **30–90 days** for catch-up and context. Older items must be labeled according to discovery/indexing status rather than presented as newly published.

---

# 2. Three-Layer Literature Radar

## Layer 1 — Consensus: Evidence Backbone

### Purpose

Use Consensus to retrieve and verify research that has entered the formal academic record. Consensus is the project's **Evidence Backbone**, not its sole freshness source.

Priority content:

- peer-reviewed journal papers;
- systematic reviews and scoping reviews;
- meta-analyses;
- randomized or controlled experiments;
- longitudinal and observational studies;
- recent journal research relevant to the nine radars.

### Required workflow

```text
Consensus.search
        ↓
Candidate result
        ↓
Consensus.fetch
        ↓
DOI / publisher / arXiv canonical verification
        ↓
Evidence Pool
```

Rules:

1. **Never cite a Consensus search-result snippet.** A retained result must be fetched before citation or inclusion in a public evidence claim.
2. Deduplicate primarily by **DOI**, secondarily by normalized title.
3. Prefer canonical DOI, publisher, conference, or arXiv metadata in public prose.
4. If Consensus metadata conflicts with a canonical publication record, the canonical record takes precedence.
5. Citation count is contextual metadata, **not evidence strength**.
6. A paper may enter a Consensus provenance ledger without being promoted to foundational evidence.
7. Consensus coverage and indexing can lag very recent releases; absence from Consensus is not evidence that no new research exists.

### Provenance

New unique Consensus records retained by the project should be written to a dated ledger such as:

`references/consensus/YYYY-MM-DD.md`

The original [`references/consensus.md`](../references/consensus.md) remains historical provenance rather than being repeatedly rewritten.

---

## Layer 2 — Publishers / arXiv / Conferences: Freshness Layer

### Purpose

Catch research that may be too recent for weekly bibliographic ingestion or may appear first as an accepted paper, online-first article, or preprint.

Priority sources include:

- publisher Online First / Early View pages;
- DOI / Crossref-linked canonical article pages when available;
- arXiv and equivalent preprint servers;
- ACM / CHI and other conference accepted-paper or proceedings pages;
- Nature, Science, Springer, Elsevier, Wiley, Frontiers, and other canonical publisher pages relevant to the field.

A Freshness Layer item can enter the candidate pool even when Consensus has not indexed it yet, provided the canonical source is verifiable.

### Time labels

Use exactly these labels when temporal provenance matters:

- **`NEW`** — the paper, preprint, report, or research item was actually released inside the current scan window.
- **`NEWLY INDEXED`** — it was published earlier, but entered Consensus or other bibliographic indexing during the current scan window.
- **`NEWLY DISCOVERED`** — it was already available before the scan window but was detected by this observatory for the first time now.

**A discovery date or indexing date must never be presented as a publication date.**

When an item is `NEWLY INDEXED` or `NEWLY DISCOVERED`, public wording should say “recently published and newly indexed/discovered by this radar” or equivalent—not “published this week.”

---

## Layer 3 — Researchers / Labs / Workshops: Frontier Signal Layer

### Purpose

Detect where the field is moving before every development becomes a conventional bibliographic record.

Priority sources include:

- individual researcher publication / project pages;
- university research centers and labs;
- workshop and conference program pages;
- special issues and calls that indicate new research concentration;
- institutional research programs;
- substantive keynotes, invited research talks, or first-party essays;
- policy or institutional research signals that materially affect the field.

### Evidence rule

A lab announcement, workshop, keynote, research program, or institutional position is **`[S] Strategic Signal`** unless it is accompanied by empirical evidence that independently qualifies for `[A]`, `[B]`, or `[C]`.

Do not write “research proves…” when the underlying item is a program announcement or workshop agenda.

### Machine Culture researcher/lab-first monitoring

Machine Culture and collective cognition are comparatively sparse and fast-moving. In addition to keyword search, every weekly run separately checks:

- Iyad Rahwan;
- Center for Humans and Machines, Max Planck Institute for Human Development;
- Levin Brinkmann;
- Fabian Baumann;
- Maxime Derex;
- Pierre-Yves Oudeyer and close collaborators when relevant;
- machine behaviour;
- cumulative cultural evolution;
- human–AI groups / collective intelligence;
- social learning and algorithmic mediation;
- AI metacognition / wisdom.

Priority monitoring guarantees **search attention, not guaranteed inclusion**.

---

## 3. Build one candidate pool

All qualifying candidates from all three retrieval layers and all nine radars enter a single pool.

For every candidate record:

- title;
- authors / issuing institution;
- actual publication or release date;
- discovery status: `NEW`, `NEWLY INDEXED`, or `NEWLY DISCOVERED` when relevant;
- source / venue;
- item type;
- radar tag(s);
- study design / sample where applicable;
- main finding or claim;
- evidence grade;
- methodological caveat;
- canonical URL / DOI;
- Consensus discovery/fetch provenance when applicable.

Do not allow the retrieval layer to determine evidence grade automatically. A newly released preprint can be important but still `[B]` or `[C]`; a strategic lab signal remains `[S]`.

---

## 4. Source verification and metadata precedence

Before final selection, verify each retained scientific item against the best available canonical record.

Preferred order for bibliographic facts:

1. DOI-linked publisher or journal/conference record;
2. official proceedings or arXiv/preprint record;
3. fetched Consensus bibliographic record;
4. official university / research-lab page for contextual information;
5. high-quality secondary analysis only when the primary source cannot answer the contextual question.

Never use a generic search-result snippet as evidence.

If year, venue, study type, or DOI metadata conflict, resolve the conflict before public citation. If it cannot be resolved, mark the field as uncertain rather than inventing precision.

---

## 5. Rank by value, not quota

Select up to **12 highest-value items** across the whole field. A radar may contribute several items or none.

Ranking factors:

- methodological strength;
- novelty of mechanism or finding;
- relevance to the 3×3 map;
- field-level importance;
- whether it changes or challenges the current working model;
- source quality;
- recency;
- non-redundancy with already-covered work.

Never pad a quiet radar with weak material merely to achieve balance.

---

## 6. Coverage record

Maintain an internal coverage record for all nine radars:

- `HIGH` — multiple meaningful new signals or one unusually important signal;
- `MEDIUM` — at least one useful but not field-changing signal;
- `LOW` — no item strong enough for the final shortlist.

The public brief may summarize this as `This Week's Field Signals`, but only when labels are justified by observed evidence. A `LOW` radar is an acceptable research result.

---

## 7. Evidence grading

Use the repository-wide grading rules in [`evidence-grading.md`](evidence-grading.md):

- **[A] Strong empirical evidence**
- **[B] Promising / moderate evidence**
- **[C] Conceptual / exploratory**
- **[S] Strategic signal**

Evidence grade reflects what a source can support, not how interesting the topic is.

---

## 8. Freeze the bilingual evidence set

Before writing either public edition:

1. finalize source identity and citation metadata;
2. finalize actual publication date and temporal label;
3. finalize radar tag(s);
4. finalize evidence grade;
5. finalize main caveat;
6. finalize item ordering;
7. freeze the same evidence set for both languages.

No second independent English research pass is allowed. English is an idiomatic editorial version of the same evidence set, not a second retrieval pipeline.

---

## 9. Weekly Brief → Baseline comparison

Weekly briefs answer: **What changed recently?**

The Current Evidence Baseline answers: **What does the evidence currently support?**

After the weekly evidence set is finalized, compare it against the newest dated Baseline.

Create a new bilingual dated Baseline only when verified evidence materially changes at least one of:

1. the strength of a current conclusion;
2. the boundary or caveat of a conclusion;
3. an important unresolved evidence gap;
4. the `Control / Retention / Variance` working model;
5. the 3×3 research map itself.

Otherwise publish the weekly brief and bibliography/provenance updates without changing the Baseline.

Historical Baselines are immutable research-state snapshots except for explicit factual or bibliographic corrections.

---

## 10. Public Dashboard synchronization

The weekly publication process keeps the homepage reader-first.

Each run may update:

- latest Weekly Brief date and links;
- **2–4 concise `Latest Research` signals** selected for field-level importance, not simply the first items in the weekly brief;
- Current Baseline link/date when a new material Baseline is created;
- Current Findings only when a new Baseline materially changes those findings.

Do **not** expand the homepage back into:

- full nine-radar definitions;
- long methodology instructions;
- bibliography dumps;
- duplicated Baseline prose.

`research/README*` remains the second-layer Research Hub and should only need link/state updates, not weekly re-synthesis.

---

## 11. Negative rules

Do not:

- convert correlation into causation;
- infer long-term cognitive decline from a one-session performance, brain-activity, or cognitive-load measure;
- infer learning or transfer from AI-assisted output quality alone;
- infer authorship from an AI detector score;
- describe a research program, workshop, keynote, or institutional statement as empirical proof;
- treat citation count as an evidence grade;
- fabricate balance when a radar is quiet;
- call an older paper “new this week” because it was newly indexed or newly discovered;
- use future-dated or unverifiable publications;
- silently promote unresolved bibliographic metadata into precise public claims.

---

## 12. Canonical end-to-end flow

```text
All 9 Radars Searched
        ↓
┌───────────────────────────────────────────────┐
│ Consensus — Evidence Backbone                │
│ Publishers / arXiv / Conferences — Freshness │
│ Researchers / Labs / Workshops — Frontier    │
└───────────────────────────────────────────────┘
        ↓
Unified Candidate Pool
        ↓
Canonical Source Verification
        ↓
Evidence Grading + Caveats
        ↓
Select up to 12 high-value items
        ↓
Freeze one bilingual evidence set
        ↓
Weekly Brief (CN + EN)
        ↓
Compare with Current Baseline
        ↓
     Material change?
       /         \
     NO           YES
     ↓             ↓
Weekly only    New dated Baseline
     ↓             ↓
Bibliography / provenance updates
        ↓
Compact Dashboard + Research Hub link updates
```

The target is not “more papers.” It is a **traceable estimate of the current state and movement of the field**.