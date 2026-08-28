# Publishing Policy

## Public vs. private analytical layers

The scheduled research workflow may produce a richer private/user-facing report than the public GitHub edition. Public files are intentionally filtered.

### Public GitHub edition includes

- current field judgment / week-level synthesis;
- selected papers, preprints, institutional reports, research programs, workshops, and substantive long-form research analysis;
- source, publication date, item type, study design where relevant;
- main finding / claim;
- evidence grade and methodological caveat;
- neutral `Why it matters` analysis;
- 3×3 radar tags and field-signal summary;
- Rahwan / Center for Humans and Machines developments when they qualify;
- evidence-convergence and counterevidence sections;
- verified references and canonical source links.

### Public GitHub edition excludes

- `专家说`;
- `元认知重构`;
- personalized Chinese article-series recommendations;
- private book-project strategy;
- direct references to the user's personal projects or private goals;
- conversational coaching that is not part of the public research record.

A personalized sentence such as `why this matters to you` must be rewritten as the neutral heading **Why it matters**.

## Bilingual policy

1. Research is performed once.
2. The evidence set is frozen before translation/editorial adaptation.
3. Chinese is the canonical editorial edition.
4. English is an idiomatic editorial rewrite from the same evidence set, not a literal sentence-by-sentence translation and not a second research pass.
5. Paper titles, authors, dates, DOI records, evidence grades, core caveats, item order, and source identity must remain aligned.
6. Established English technical terms should use the field's canonical terminology rather than back-translation from Chinese.

## Citation policy

- Prefer DOI, publisher, conference, official institutional, or arXiv links in public prose.
- When a paper is discovered through Consensus, fetch/verify the Consensus record before use and retain the Consensus record link in `references/consensus.md`.
- Never cite a search snippet as if it were the underlying paper.
- Do not cite secondary news for a claim when the primary paper/report is available.
- Citation count is bibliographic context, not an evidence grade.

## Historical integrity

Weekly files are dated research snapshots. Do not rewrite historical briefs solely to improve prose or align them with a later theory. Correct factual/bibliographic errors when discovered and make the correction legible in version history.

## Translation mechanism

GitHub does not intrinsically translate Markdown. The project therefore uses the scheduled research model as the editorial translation layer. This avoids a second API/GitHub Actions translation stack and keeps terminology, evidence grades, and source identity under the same quality-control process.

Future GitHub Actions translation is permitted only if it preserves the frozen-evidence rule and has a documented terminology/QA layer. It is not part of v1.
