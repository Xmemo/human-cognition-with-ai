# Evidence Observatory and Autonomous Research Lab

[简体中文](evidence-observatory-and-autonomous-research-lab.zh-CN.md)

## Decision

**Do not merge autonomous research directly into the observatory's literature-ingestion loop.**

The repository has two distinct epistemic roles:

1. **Evidence Observatory** — accumulate and compare the external research record as neutrally as possible.
2. **Research Lab** — only after a recurring gap, contradiction, or open question has emerged, investigate a deliberately selected hypothesis or research question.

Between them sits an explicit **Gap Detection** layer.

```text
Evidence Observatory
        ↓
Verified literature accumulation
        ↓
Gap / contradiction / anomaly detection
        ↓
Open Questions & Research Gaps
        ↓
Human promotion gate
        ↓
Research Lab
        ↓
Hypothesis / adversarial search / analysis / experiment
        ↓
Independent evaluation
        ↓
Return as evidence to the Observatory
```

The Observatory is the referee. The Research Lab is a participant. The Research Lab must not automatically rewrite the Baseline.

---

## Why this separation matters

A hypothesis-driven autonomous agent tends to reshape later search around its current theory. That is useful when deliberately testing a hypothesis, but dangerous for an evidence observatory whose primary job is to preserve field heterogeneity, contradiction, and uncertainty.

The failure mode is a self-reinforcing epistemic loop:

```text
repository evidence
→ project-generated theory
→ autonomous search around that theory
→ project-generated analysis
→ theory written back as stronger evidence
→ narrower future search
```

The architecture therefore protects two different agent dispositions:

### Observatory agent

- conservative;
- records rather than explains prematurely;
- preserves conflicting evidence;
- marks unknowns explicitly;
- does not optimize searches around a preferred grand theory;
- treats a quiet radar or unresolved contradiction as a valid result.

### Research agent

- hypothesis-driven;
- actively seeks mechanisms;
- searches for disconfirming evidence;
- can fork competing approaches;
- may iterate against explicit evaluators or experiments;
- is allowed to be exploratory because it operates behind a separate promotion gate.

---

# What we learned from autonomous-research systems

This architecture review examined four main reference projects.

## 1. ARIS / Auto-Research-In-Sleep

Repository: `wanshuiyin/Auto-claude-code-research-in-sleep`

Most useful mechanisms:

- methodology-first research loop rather than a single platform;
- plan → draft/experiment → adversarial review → iteration → persistent research wiki;
- cross-model review;
- persistent state outside conversation memory;
- explicit integrity / anti-autoresearch auditing in the broader ecosystem.

What to borrow:

> **Research spiral + adversarial review + persistent research state.**

What not to place inside the Observatory:

> autonomous theory generation that immediately controls the next literature scan.

## 2. ScaleAutoResearch-Ramsey

Repository: `ypwang61/ScaleAutoResearch-Ramsey`

Most useful mechanisms:

- many independent research agents run in parallel;
- an **immutable verifier** evaluates candidate results;
- machine-readable results and human-readable experiment records;
- stronger experimental states can be inherited or forked;
- diversity is created through independent search width and depth.

What to borrow:

> **Verifier-before-agent, parallel exploration, and strategy inheritance where the evaluation target is genuinely measurable.**

Important limitation for this repository:

Ramsey witnesses can be checked by a deterministic verifier. Open-ended cognition research cannot. We should therefore use deterministic verification only where it is real: DOI resolution, metadata, dates, deduplication, source identity, citation anchors, and similar properties. High-level scientific interpretation remains judgment rather than a fake numerical verifier.

## 3. DeliAutoResearch

Repository: `LiuYihey/DeliAutoResearch`

Most useful mechanisms:

- explicit treatment of cognitive loops, stalling, and runtime fragility;
- fresh sessions rather than indefinitely resumed contexts;
- progress/state persisted to files;
- `directions_tried` history;
- separate execution from evaluation;
- stall detector, forced structural pivot, and watchdog layers;
- independent post-iteration verification;
- provenance-first citation and claim grounding.

What to borrow if/when the Research Lab runs long-horizon tasks:

> **anti-loop state management, fresh-session iteration, directions-tried memory, watchdogs, and independent verification.**

What not to copy as governance:

> zero-interaction autonomy as a default for changing public scientific conclusions.

## 4. Academic Research Skills (ARS)

Repository: `Imbad0202/academic-research-skills`

Most useful mechanisms:

- explicitly human-in-the-loop research positioning;
- citation existence and metadata verification;
- claim–source alignment and locator infrastructure;
- provenance / material-passport thinking;
- integrity gates;
- cross-model review envelopes;
- clear declaration of verification limits.

The most important lesson is epistemic modesty:

> **verified provenance is not verified truth. Evidence aligned with a claim is not proof that the claim is universally true.**

ARS is therefore the best reference for the Research Lab's evidence discipline even when ARIS/Deli-style autonomy is used for execution.

---

# Recommended future Research Lab architecture

When a question is manually promoted from the gap ledger, the future Research Lab can combine the strongest mechanisms above.

```text
Research Contract
      ↓
Independent search / analysis branches
      ↓
Deterministic verifiers where possible
      ↓
Evidence + claim ledger
      ↓
Independent red-team / adversarial review
      ↓
Iteration with persisted state and directions tried
      ↓
Candidate conclusion
      ↓
Human judgment gate
      ↓
Return to Observatory as one evidence object
```

## Six layers

### L1｜Research State

Store the question, scope, prior attempts, failed directions, and unresolved uncertainties outside conversation history.

### L2｜Deterministic Verifiers

Examples:

- DOI resolves;
- source exists;
- title/authors/venue match canonical metadata;
- source is inside the requested time window;
- duplicate already exists;
- quoted numerical claim has a locator;
- required artifact exists.

Do not pretend open-ended scientific interpretation is deterministic.

### L3｜Parallel Exploration

Possible branches:

- evidence backbone;
- freshness search;
- frontier search;
- explicit red-team / counterevidence search;
- competing mechanisms or analyses when a promoted question requires them.

Branches should share a Research Contract and curated state, not one giant accumulated conversation context.

### L4｜Claim and Evidence Trace

For Research Lab work, unlike the neutral Observatory, a structured claim ledger becomes useful:

```text
claim
→ supporting evidence
→ counterevidence
→ scope
→ uncertainty
→ provenance
```

### L5｜Adversarial Review

A fresh reviewer should ask:

- What would falsify this conclusion?
- Which evidence was selected because it fit the hypothesis?
- Which credible alternative mechanism remains?
- Does the language outrun the study design?
- What evidence would reverse the conclusion?

### L6｜Human Judgment

The Research Lab may produce a **candidate conclusion**. It may not directly upgrade the Observatory Baseline.

---

# Promotion gate from Observatory to Research Lab

The Observatory should remain question-centered. A gap may be proposed for Research Lab promotion when several of the following are present:

- repeated signal across independent scans;
- unresolved contradiction among credible studies;
- high theoretical or practical leverage;
- measurable or operationalizable construct;
- additional literature/data/analysis/experiment can reduce uncertainty;
- narrow enough to investigate without becoming a general worldview claim.

Promotion is a human decision.

---

# Return path: Research Lab → Observatory

Project-generated research receives **no privileged status**.

A Lab output returns to the Observatory as another evidence object and must pass the same public standards applied to external work:

- provenance;
- method transparency;
- evidence grade;
- caveats;
- counterevidence;
- explicit distinction between observation, interpretation, and hypothesis.

The system must never implement:

```text
our hypothesis
→ our agent validates it
→ automatic Baseline update
```

Instead:

```text
our research output
→ independent review
→ Observatory intake
→ comparison with all external evidence
→ only then possible Baseline revision
```

---

# Near-term implementation decision

**Do not implement the full autonomous Research Lab yet.**

The immediate Observatory addition is only:

> **Open Questions & Research Gaps**

This layer captures problems exposed by the literature without turning them into project-owned theories. It creates the evidence-backed queue from which a future Research Lab can later select a genuinely important question.

The practical sequence is therefore:

```text
Phase 1 — Observatory
Search → Verify → Grade → Accumulate → Compare

Phase 1.5 — Gap Detection
Convergence → Contradiction → Open Question / Research Gap

Phase 2 — Research Lab (future)
Human-selected question → autonomous/semi-autonomous research loop
```

This boundary is a deliberate protection of the observatory's objectivity.