# Open Questions & Research Gaps

[简体中文](open-questions-research-gaps.zh-CN.md) · [Research Hub](../research/README.md)

This page is the observatory's **problem-discovery layer**. It records unresolved questions, contradictions, and evidence gaps that emerge from repeated literature scanning.

It is deliberately **not** a hypothesis registry and **not** an autonomous research agenda. The purpose is to preserve uncertainty without turning the observatory into a system that searches for evidence to support its own theories.

## Boundary

The observatory asks:

> **What does the evidence currently show, where does it conflict, and what remains unknown?**

A future Research Lab may ask:

> **Which of these unresolved questions is important and testable enough to investigate as a hypothesis?**

These two roles must remain separate.

```text
Evidence Observatory
        ↓
Verified literature accumulation
        ↓
Convergence / contradiction / missing evidence
        ↓
Open Questions & Research Gaps
        ↓
Human selection only
        ↓
Possible future Research Lab hypothesis
```

A gap never becomes a hypothesis automatically.

---

## Gap types

Every retained item should use one primary type:

- **MEASUREMENT GAP** — an important construct is not measured directly or reliably.
- **TIME-HORIZON GAP** — evidence exists only over short periods but the important claim is long-term.
- **POPULATION GAP** — evidence is concentrated in students, novices, one profession, or another narrow population.
- **MECHANISM GAP** — an effect is observed but the active component or causal pathway remains unresolved.
- **CONTRADICTION** — credible studies point in materially different directions.
- **ECOLOGICAL GAP** — controlled-task evidence has not been established in real organizations, institutions, or cultural systems.
- **METHOD GAP** — available designs cannot distinguish between competing explanations.
- **TRANSFER GAP** — supported performance is measured but independent performance, transfer, or post-AI capability is not.

The goal is not to maximize the number of gaps. Several papers may support one persistent gap.

---

## Required record

Each gap should contain:

| Field | Meaning |
|---|---|
| **Question** | Neutral research question; avoid building the desired answer into the wording. |
| **Radar(s)** | Which of the 9 research radars exposed the gap. |
| **Gap type** | One primary type from the taxonomy above. |
| **Observed basis** | What verified evidence, disagreement, or absence makes this a real gap. |
| **Why unresolved** | What the current literature still cannot distinguish or establish. |
| **Last reviewed** | Date of the most recent full scan that evaluated it. |
| **Status** | `OBSERVE`, `REPEAT`, or `CANDIDATE`. |

### Status meanings

- **`OBSERVE`** — detected once or supported by a limited evidence base; continue monitoring.
- **`REPEAT`** — the same gap has reappeared across multiple independent scans or evidence clusters.
- **`CANDIDATE`** — repeated, important, and sufficiently concrete to be considered for human promotion into a separate Research Lab.

`CANDIDATE` does **not** mean a hypothesis has been accepted or that autonomous research should start automatically.

---

# Current gap ledger

## G01｜What remains after sustained AI use over months or years?

- **Radars:** R1, R3, R4, R6
- **Type:** TIME-HORIZON GAP / TRANSFER GAP
- **Status:** `REPEAT`
- **Observed basis:** Recent education and writing studies increasingly use AI-on → AI-off, no-AI near-transfer, or return-to-manual-work designs, but the retained outcomes are still mostly measured over short task windows.
- **Why unresolved:** Short-term post-AI performance cannot establish professional deskilling, durable learning loss, or long-term cognitive adaptation.
- **Last reviewed:** 2026-08-29

## G02｜How does sustained AI use change expert cognition rather than novice performance?

- **Radars:** R1, R3, R5
- **Type:** POPULATION GAP / TIME-HORIZON GAP
- **Status:** `REPEAT`
- **Observed basis:** Evidence that professional artists retain advantages in AI-mediated work argues against simple leveling, while much of the broader literature still relies on students or short tasks.
- **Why unresolved:** We do not yet know whether expertise is preserved, amplified, reorganized, or partly eroded under sustained AI use.
- **Last reviewed:** 2026-08-29

## G03｜Which component of bounded AI support actually preserves independent capability?

- **Radars:** R1, R2, R3, R4
- **Type:** MECHANISM GAP / METHOD GAP
- **Status:** `REPEAT`
- **Observed basis:** Guardrails, compulsory reflection, draft-first workflows, verification prompts, and delayed assistance often appear together in successful interventions.
- **Why unresolved:** Bundled interventions make it difficult to isolate whether reflection, delayed help, self-generation, verification, or another component drives retention.
- **Last reviewed:** 2026-08-29

## G04｜Do measures of epistemic agency predict durable real-world behavior?

- **Radars:** R2, R3, R6
- **Type:** MEASUREMENT GAP / ECOLOGICAL GAP
- **Status:** `OBSERVE`
- **Observed basis:** Critical-AI-use measures increasingly operationalize verification, motivation, and reflection and show short-task behavioral correlations.
- **Why unresolved:** Scale validity and short behavioral tasks do not yet establish stable long-term epistemic conduct in real work.
- **Last reviewed:** 2026-08-29

## G05｜What human–AI network structures improve performance without collapsing collective variance?

- **Radars:** R3, R5, R8, R9
- **Type:** MECHANISM GAP / ECOLOGICAL GAP
- **Status:** `REPEAT`
- **Observed basis:** Model-led co-creation can reduce diversity, while some hybrid human–AI collective-search designs preserve both performance and outcome diversity. A 2026-09-01 norm-estimation study adds a concrete complementarity mechanism: across 555 everyday scenarios, strong LLMs outperformed individual humans, but model errors were substantially more correlated while human errors were more independent; human aggregation improved strongly and human–LLM hybrids achieved the lowest error.
- **Why unresolved:** Error correlation now provides one empirically supported mechanism for hybrid advantage, but the field still has not mapped how interaction topology, group composition, model heterogeneity, transmission, task type, and time scale jointly determine performance and collective variance in real systems.
- **Last reviewed:** 2026-09-04

## G06｜Do Machine Culture feedback loops persist in real social systems?

- **Radars:** R7, R8, R9
- **Type:** ECOLOGICAL GAP / TIME-HORIZON GAP
- **Status:** `REPEAT`
- **Observed basis:** Controlled studies now show AI-linked strategy transmission, social learning, norm-informed coordination, and partner-selection effects.
- **Why unresolved:** It remains unclear whether these effects persist, compound, or reorganize norms in real organizations and cultural ecosystems over long periods.
- **Last reviewed:** 2026-08-29

---

## Weekly integration

Every Weekly Brief / Full Research Refresh should end with an **Open Questions & Research Gaps** section.

The section should:

1. report only gaps grounded in the current or accumulated verified evidence;
2. distinguish **newly detected** gaps from **persistent** gaps;
3. state when new evidence narrows or closes a previous gap;
4. avoid brainstorming hypotheses merely because they are interesting;
5. update this long-lived ledger only when the gap itself materially changes.

Recommended weekly format:

```text
## Open Questions & Research Gaps

### Newly exposed
- Gxx ... — basis: ...

### Persistent
- G03 ... — new evidence narrows X but Y remains unresolved.

### Narrowed / closed
- none this week.
```

---

## Promotion gate to a future Research Lab

A gap may be proposed for a future autonomous or semi-autonomous research workflow only when several of the following are true:

- the signal recurs across independent evidence clusters;
- credible studies remain in unresolved conflict;
- the gap has high theoretical or practical leverage;
- the question can be operationalized;
- additional literature, data, analysis, or experiments could materially reduce uncertainty;
- the question is narrow enough to attack without turning into a general worldview claim.

Promotion requires **human selection**. The Observatory records the problem; it does not select its own theory.

---

## Negative rules

Do not:

- turn every limitation paragraph into a research gap;
- treat absence from one database as evidence of a field-wide gap;
- phrase a gap so that one preferred theory is already assumed true;
- automatically increase status because many papers cite each other;
- let a future Research Lab rewrite this ledger without passing through the Observatory's normal evidence review;
- allow project-generated hypotheses or analyses to receive privileged evidentiary status.

The objective is to let the literature **reveal where the map is incomplete**, while preserving the observatory's epistemic neutrality.