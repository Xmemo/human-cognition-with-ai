# Human Cognition with AI — GitHub Deployment Spec

## 1. Project identity

**Repository name:** `human-cognition-with-ai`

**Public title:** Human Cognition with AI

**Subtitle:** A bilingual research observatory on human cognition in the age of AI.

**Chinese descriptor:** AI 时代人类认知研究观测站

**Core promise:** Track how AI changes, augments, and culturally reshapes human cognition — with evidence grading, explicit caveats, and a living research map.

## 2. Research map: 3 domains × 9 radars

### 01 | Human Cognitive Change

1. Cognitive Offloading, Skill Formation & Expertise
2. Metacognition, Epistemic Agency & Judgment
3. Critical Thinking, Memory, Creativity & Writing Cognition

### 02 | Cognitive Augmentation & Governance

4. Tools for Thought & Cognitive Augmentation
5. Human–AI Collaboration & Hybrid Intelligence
6. Cognitive Resilience, Authorship & Responsibility

### 03 | Machine Culture & Collective Cognition

7. Machine Culture & Cultural Evolution
8. Collective Intelligence & Human–AI Groups
9. Social Learning, Norms & Cultural Feedback

All 9 radars must be scanned on every scheduled run. Final weekly selection is value-ranked rather than quota-based.

## 3. Scheduled research workflow

Existing weekly task remains the source workflow.

Every run should:

1. Scan all 9 radars using paper/preprint queries plus research-program / lab / report / event queries.
2. Maintain a candidate pool and select the 12 most worthwhile new or newly relevant items.
3. Prioritize original papers, peer-reviewed research, high-quality preprints, institutional reports, workshops/research-program signals, and substantive first-party long-form material.
4. Maintain special monitoring of Iyad Rahwan and the Center for Humans and Machines, including Machine Culture, machine behaviour, cumulative cultural evolution, human–AI groups, social learning, AI metacognition/wisdom, and related collaborators.
5. For each selected item preserve title, source, publication date, type, claim/finding, evidence strength, caveats, radar tags, and significance.
6. Generate an internal coverage record across all 9 radars (High / Medium / Low / No qualifying signal).

## 4. Public GitHub publishing filter

The ChatGPT-facing report may remain richer and personalized.

The public GitHub version MUST exclude these conversation-specific sections:

- Chinese article-series recommendations / custom writing-topic recommendations
- `专家说`
- `元认知重构`
- private book-project strategy or personal project references

Personalized phrases such as “why this matters to your book/article series” must be rewritten as neutral public language, e.g. `Why it matters`.

Everything else that is evidence-based and publication-safe should be retained.

## 5. Bilingual publishing model

Chinese is the canonical editorial version. English is generated only after the final evidence set and Chinese report are frozen.

English generation rules:

- Do not conduct a second independent research pass.
- Preserve original English paper titles, author names, journal names, DOI, URLs, and technical terminology.
- Translate/synthesize only the editorial prose.
- Prefer terminology used in the cited research rather than literal Chinese-to-English wording.
- Evidence labels, caveats, radar classification, and citation identity must remain identical across languages.
- If a concept has no stable English equivalent, use the source-paper terminology rather than inventing a new translation.

This avoids duplicated research cost while producing an English-native public version.

## 6. Repository structure

```text
human-cognition-with-ai/
├── README.md
├── README.zh-CN.md
├── LICENSE
├── CITATION.cff
├── weekly/
│   └── 2026/
│       ├── 2026-08-28.zh-CN.md
│       └── 2026-08-28.en.md
├── topics/
│   ├── human-cognitive-change.md
│   ├── cognitive-augmentation-governance.md
│   └── machine-culture-collective-cognition.md
├── people/
│   └── iyad-rahwan.md
├── methodology/
│   ├── research-map.md
│   ├── search-protocol.md
│   ├── evidence-grading.md
│   └── publishing-policy.md
└── references/
    ├── consensus.md
    ├── master-bibliography.md
    └── master.bib
```

Keep the structure intentionally small. Do not add a website, database, or application layer at launch.

## 7. README design

The README is a landing page, not a file index.

First screen:

```markdown
# Human Cognition with AI

### A bilingual research observatory on human cognition in the age of AI.

How does human thinking change, persist, and evolve as intelligence becomes increasingly external?

中文 | English

**Updated weekly · Evidence-first · No AI panic · No AI hype**
```

Then present:

- a concise project thesis;
- the 3-domain / 9-radar research map;
- `Latest Brief` with Chinese and English links;
- recent briefs;
- `Frontier Track: Machine Culture`;
- `Researchers to Watch`, initially Iyad Rahwan / Center for Humans and Machines;
- methodology and evidence grading;
- foundational references;
- contribution / citation instructions.

The README should not become an ever-growing weekly archive. Keep only the newest brief plus a small recent-history block; older reports remain under `weekly/`.

## 8. Mechanism / theoretical foundations

The public repository should explicitly explain that the project is not based on a single “AI makes people smarter/dumber” hypothesis. It tracks multiple competing mechanisms.

### Cognitive offloading
External tools redistribute cognitive work; the relevant question is what is offloaded, under what metacognitive control, and what remains internally available.

### Metacognition and epistemic agency
AI use changes not only task execution but monitoring, calibration, confidence, judgment, and decisions about what to believe.

### Distributed cognition
Cognition can be distributed across people, artifacts, interfaces, and environments. Therefore externalization is not inherently harmful; the research problem is the allocation of agency, learning, feedback, and control.

### Cognitive augmentation / human–AI complementarity
Human–AI systems should be evaluated against humans alone and AI alone, not assumed to be synergistic. Immediate performance gains must be distinguished from learning, transfer, and post-AI residual capability.

### Cognitive resilience / sustainability
A long-term criterion is whether AI-supported workflows preserve or improve capacities such as retrieval, judgment, independent problem solving, authorship, responsibility, and self-regulation.

### Machine culture and cumulative cultural evolution
AI may alter cultural variation, social learning, transmission, norms, collective search, and the inheritance of strategies across human groups. This is a distinct population/cultural layer beyond individual cognition.

## 9. Evidence grading

- **A — Strong empirical evidence:** robust peer-reviewed experiments, high-quality meta-analyses/systematic reviews, or convergent evidence.
- **B — Moderate / promising evidence:** credible empirical work with meaningful limitations, high-quality preprints, or narrower experimental evidence.
- **C — Conceptual / exploratory:** theoretical frameworks, position papers, small exploratory studies, or substantive long-form interpretation.
- **S — Strategic signal:** research programs, workshops, institutional agenda shifts, lab launches, calls, or policy signals rather than direct causal evidence.

Always state caveats. Do not upgrade a conceptual paper into causal evidence.

## 10. Consensus reference policy

All papers surfaced through Consensus and retained in project outputs must be bibliographically normalized and deduplicated.

For every retained Consensus paper, store when available:

- title
- authors
- year
- journal / venue
- study type
- DOI
- canonical paper URL
- Consensus record URL
- radar tags
- date added

Maintain:

- `references/consensus.md` — human-readable source ledger;
- `references/master-bibliography.md` — curated public bibliography grouped by research domain;
- `references/master.bib` — deduplicated BibTeX by DOI/title.

Weekly reports should cite sources inline and link to original DOI/publisher/arXiv pages where possible. Consensus is used as a research-discovery and bibliographic verification layer, not as a substitute for the original paper.

## 11. Search quality rules

- Every scheduled run scans all 9 radars.
- Do not force one item per radar.
- Prefer primary research for scientific claims.
- Search recent week first; broaden to recent months only for newly relevant work.
- Distinguish peer-reviewed, preprint, institutional report, research-program signal, and long-form analysis.
- Explicitly say when a radar has no qualifying signal.
- Avoid “AI makes us dumb” / “AI makes us smarter” framing unless supported by direct evidence.
- Keep facts, interpretation, and speculation separable.

## 12. English automation decision

GitHub does not natively translate Markdown repositories. Automation is possible through GitHub Actions only if the workflow calls an external translation model/API or runs a local translation model.

For this project, recommended implementation is **single-pass research + bilingual editorial generation inside the existing scheduled ChatGPT task**:

1. Perform research once.
2. Freeze the 12 selected items and citations.
3. Produce the Chinese public edition.
4. Produce the English edition from the same frozen evidence set.
5. Sync both files to GitHub.

This consumes additional model-generation tokens for the English prose, but avoids duplicating web/Consensus research and keeps evidence alignment much safer than an independent translation pipeline.

A future GitHub Actions translation workflow is optional, not launch scope.

## 13. Launch acceptance criteria

Launch is complete when:

- public repository exists under `Xmemo/human-cognition-with-ai`;
- bilingual README is polished;
- 3×3 research map is documented;
- methodology, evidence grading, search protocol, and publishing policy are public;
- initial Consensus bibliography is imported and deduplicated;
- Iyad Rahwan / CHM watch page exists;
- at least the latest available research brief has Chinese and English public editions;
- weekly scheduled task is updated to scan all 9 radars and sync filtered bilingual outputs plus bibliography updates to GitHub;
- no private `专家说`, `元认知重构`, personal article-planning, or book-strategy content is published.

## 14. Non-goals for v1

No standalone website, newsletter backend, database, custom crawler, social-post generator, or GitHub Pages deployment in v1. Those can be evaluated only after the research repository establishes a useful publication cadence.
