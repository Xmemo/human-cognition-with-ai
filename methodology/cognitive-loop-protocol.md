# Cognitive Loop Protocol v0.1 — Intervention and Evaluation

**Status: methodological proposal / unvalidated | 2026-10-09**  
[中文](cognitive-loop-protocol.zh-CN.md) · [Cognitive Ecology](../research/cognitive-ecology.md) · [Research Gaps](open-questions-research-gaps.md)

## 0 | Purpose and first principles

**Purpose:** test whether different human–AI interaction architectures change cognitive outcomes, not merely how much thinking users feel they did.

**Not the goal:** maximize chat turns, force Socratic questioning, prohibit delegation, prescribe walking universally, or invent an "insight score."

Decompose each task into cognitive operations. Identify the human-owned judgment checkpoints, external resources, feedback and failure modes; then test whether a proposed intervention has net value.

- Automate low-value mechanical tasks without artificial friction.
- In learning, measure independent performance after AI removal.
- In applied work, also measure *coupled* system performance, resilience, and time cost.
- Body, representations, and genuine social interaction are optional cognitive resources.
- Tool dependence, human control, and skill loss are distinct constructs.

## 1 | Task specification

Before testing, declare:
1. **Task family:** mechanical / learning / creative exploration / judgment / behavior change.
2. **Ground truth:** objective answer, blinded rubric, or delayed real-world outcomes?
3. **Cognitive checkpoints:** framing, initial hypothesis, search, manipulation, explanation, counterevidence, evaluation, decision, stopping.
4. **Available resources:** unaided, paper, visual interface, AI, real people, bodily activity.
5. **Privacy / safety:** do not induce unjustified reliance in safety-critical settings; minimize voice, health, and social data collection.

## 2 | Three arms, not one bundled ritual

| Arm | Experience | Hypothesis |
|---|---|---|
| A. Answer-first | Prompt → full AI answer → user reviews | Fastest immediate delivery |
| B. Human-led scaffold | User's initial model → targeted AI challenge/evidence → evaluation/revision | May support calibration, ownership, or transfer |
| C. Cognitive ecology loop | B + **voluntary** external action with writing, visual manipulation, walking, or real human feedback → revised model | May add value for certain tasks |

**Identification caveat:** C adds time and attention. Test walking- or social-specific mechanisms against **time-matched** controls and factorial component designs. Do not attribute a bundled treatment's effect to a single component.

Optional activity sequence:
- **Capture** an initial claim/hypothesis (skippable).
- **Externalize** relations into editable notes, cards, or diagrams.
- **Challenge** using falsifiable counterexamples, uncertainty, or sourced evidence.
- **World contact** (optional): observe, move, measure, or interview.
- **Evaluate / revise** the claim, reasons, and remaining unknowns.
- **Stop or return**, with a stopping rule and without forced recursion.

For users simply completing a task, retain a direct Answer-first path.

## 3 | Minimal event schema

No default storage of raw private content is required:

| Event | Suggested fields |
|---|---|
| task_started | random_task_id, task_type, arm, timestamp |
| initial_model | claim_present, confidence_0_100, human_authored, optional_text_opt_in |
| tool_action | actor (human/AI/shared), kind (search/edit/move/speech/walk/interview/check), duration_sec |
| evidence_check | independently_verified, contradicting_evidence_found, source_kind |
| revision | claim_changed, reason_code (evidence/reinterpretation/social-feedback/other), confidence_0_100 |
| exit | stopped_by, duration_sec, subjective_effort |
| assessment | immediate_score, delayed_no_AI_score, transfer_score, error_detection, recovery_score, rater_blinded |

Default to **no** raw audio, location, physiology, or third-party interview content. Obtain specific permission before storing identifying material, and provide delete/export controls. These variables are proposals, not validated psychometrics.

## 4 | Six separately reported outcomes

| Outcome | Behavioral operationalization | Limit |
|---|---|---|
| **Control** | Who frames, accepts/rejects AI, and finalizes; confidence–accuracy calibration | Self-reported autonomy is not direct behavioral control |
| **Internal Retention** | AI-off reconstruction, repair, and near transfer after 24–72h | Short delays do not establish years-long skill effects |
| **Extended Capability** | Human+AI vs human-only and AI-only quality | Beating humans does not imply synergy relative to AI-only |
| **System Resilience** | Safe simulated error/outage; detection, recovery time, fallback | Do not inject mistakes in real high-stakes tasks |
| **Variance** | Predeclared diversity metrics for ideas, reasons, and solutions; blind novelty ratings | More diversity is not automatically better quality |
| **Effort / Agency** | Time, effort, authorship, actual next-step completion | More clicks, longer sessions ≠ cognitive benefit |

Pre-specify primary and secondary endpoints, scoring rubric, rater blinding, AI model/version, and whether a scale has been validated.

## 5 | Feasibility pilot then mechanism test

**Pilot (do not claim efficacy):**
- Choose one task domain, e.g. product-idea reasoning, and pilot-test task difficulty.
- Randomly allocate A/B/C; pre-register the primary outcome (e.g. delayed AI-off reasoning quality) and meaningful minimum effect.
- Record completion, skipping, time, AI decisions, and usable evidence.
- Repeat a no-AI assessment after 24–72h; also use new task material for transfer.
- Report distributions, effect sizes, uncertainty, null findings, and extra time cost.
- Do not substitute post-hoc satisfaction ratings for preregistered outcomes.

A tiny convenience pilot establishes usability at most; it cannot establish improved cognition. Apply appropriate ethics review when research involves learning effects or personal data.

**Mechanism phase:** isolate draft-first, AI challenges, visual actions, walking, and real conversations; use time-matched controls and pre-specify interactions / multiplicity.

## 6 | Product gates

- **Gate 0 / Problem:** locate a real user/task failure with answer-first interfaces.
- **Gate 1 / Experience:** usable loop with genuine skip/stop and no coercive metrics.
- **Gate 2 / Cognitive value:** a preregistered behavioral benefit outweighs incremental time/effort.
- **Gate 3 / Commercial value:** repeated need and willingness to pay are separately established.
- **Gate 4 / Persistence:** retest delayed and naturalistic effects; degrade or discontinue features that fail.

Retention and revenue are commercial metrics, **not proof** of cognitive improvement.

## 7 | Research / product separation

- **Human Cognition with AI:** literature, evidence grades, gaps, public synthesis.
- **Research Lab (future):** studies only after human promotion; hypotheses do not update the Baseline automatically.
- **Soul Agent:** optional real-world action, social feedback, and claim revision.
- **Kapi:** voluntary regulation/rest experience before tasks; physiology is not correctness.
- **Knowledge base:** preserve initial beliefs, evidence, revisions, and uncertainty, not just final AI text.

## 8 | Priority falsification questions

1. Does the loop merely increase time compared with answer-first?
2. Does scaffolding hinder experts or mechanical tasks?
3. Is real-world feedback incrementally useful beyond AI critique?
4. Can augmented capability improve while internal skill stagnates or declines, and at what cost?
5. Do measured effects persist after novelty dissipates?
6. Does use of similar prompts reduce cross-user solution diversity?

**A valuable loop is optional, testable, and removable when no net benefit exists.**