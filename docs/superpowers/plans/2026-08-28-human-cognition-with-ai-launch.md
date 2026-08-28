# Human Cognition with AI Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Launch a polished bilingual public research observatory with a 3-domain/9-radar research map, evidence methodology, normalized Consensus bibliography, Iyad Rahwan / CHM frontier watch, bilingual launch brief, and an updated weekly scheduled workflow that publishes filtered Chinese and English editions to GitHub.

**Architecture:** GitHub is the public canonical archive. The existing scheduled ChatGPT research task remains the research engine: it scans all nine radars once, freezes one evidence set, generates a Chinese public edition plus an English-native editorial edition, filters private/personalized sections, and writes both to GitHub. Consensus is the bibliographic discovery/verification layer; original publisher/DOI/arXiv links remain the public citation targets where possible.

**Tech Stack:** GitHub Markdown, BibTeX, CITATION.cff, Consensus academic search, web research for first-party verification, ChatGPT scheduled task, GitHub connector.

**Spec:** `docs/superpowers/specs/2026-08-28-human-cognition-with-ai-design.md`

## Global Constraints

- Public project name is exactly `Human Cognition with AI`.
- Repository is `Xmemo/human-cognition-with-ai`.
- Chinese is the canonical editorial edition; English is generated from the same frozen evidence set without a second research pass.
- Every scheduled run scans all 9 radars, but final selection is value-ranked rather than quota-based.
- Public GitHub outputs MUST exclude `专家说`, `元认知重构`, private book strategy, and personalized Chinese article-planning sections.
- Consensus references retained in project outputs must be normalized and deduplicated; original DOI/publisher/arXiv links are preferred for public citations.
- Scientific claims must distinguish evidence, interpretation, and strategic signal.
- No website, GitHub Pages, database, crawler, newsletter backend, or social-post generator in v1.

---

### Task 1: Build the public research-observatory shell

**Files:**
- Create: `README.md`
- Create: `README.zh-CN.md`
- Create: `LICENSE`
- Create: `CITATION.cff`
- Create: `methodology/research-map.md`
- Create: `methodology/search-protocol.md`
- Create: `methodology/evidence-grading.md`
- Create: `methodology/publishing-policy.md`
- Create: `topics/human-cognitive-change.md`
- Create: `topics/cognitive-augmentation-governance.md`
- Create: `topics/machine-culture-collective-cognition.md`
- Create: `people/iyad-rahwan.md`

**Interfaces:**
- Consumes: approved design spec.
- Produces: stable public navigation targets used by all weekly reports and future README updates.

- [ ] **Step 1: Write the English landing page**

Create `README.md` with, in order: project title/subtitle; Chinese-language link; one-paragraph thesis; `Updated weekly · Evidence-first · No AI panic · No AI hype`; 3-domain/9-radar map; Latest Brief placeholder linking to launch brief paths; Frontier Track: Machine Culture; Researchers to Watch with Iyad Rahwan / Center for Humans and Machines; methodology/evidence links; foundational-reference section; citation/contribution section.

- [ ] **Step 2: Write the Chinese landing page**

Create `README.zh-CN.md` as an editorially natural Chinese counterpart, preserving the exact research map, evidence policy, and link structure rather than literal sentence-by-sentence translation.

- [ ] **Step 3: Publish the research-map mechanism document**

Create `methodology/research-map.md` defining the nine radars exactly as:
1. Cognitive Offloading, Skill Formation & Expertise
2. Metacognition, Epistemic Agency & Judgment
3. Critical Thinking, Memory, Creativity & Writing Cognition
4. Tools for Thought & Cognitive Augmentation
5. Human–AI Collaboration & Hybrid Intelligence
6. Cognitive Resilience, Authorship & Responsibility
7. Machine Culture & Cultural Evolution
8. Collective Intelligence & Human–AI Groups
9. Social Learning, Norms & Cultural Feedback

For each radar include: core question, 3–6 canonical search terms, typical evidence types, inclusion signal, and exclusion/noise examples.

- [ ] **Step 4: Publish the search protocol**

Create `methodology/search-protocol.md` with the exact weekly flow: scan all nine radars; search recent week first; run paper/preprint and program/lab/report/event searches; prioritize first-party sources; build one candidate pool; value-rank to 12 items; explicitly record radars with no qualifying signal; run Rahwan/CHM priority checks; freeze evidence set before bilingual editorial generation.

- [ ] **Step 5: Publish evidence grading and publishing policy**

Create `methodology/evidence-grading.md` defining A/B/C/S labels and examples of what does not qualify for each label. Create `methodology/publishing-policy.md` defining the public filter, bilingual rules, source-link rules, private-section exclusions, and no-second-research-pass rule for English.

- [ ] **Step 6: Publish topic overview pages and Rahwan watch page**

Each topic page must explain why the domain matters, list its three radars, and link back to methodology. `people/iyad-rahwan.md` must describe Rahwan’s role as a long-term frontier watch focused on machine behaviour, machine culture, cumulative cultural evolution, human–AI groups, social learning, AI wisdom/metacognition, and collaborators; it must not claim every weekly update contains a Rahwan item.

- [ ] **Step 7: Add citation metadata and license**

Create a permissive documentation-oriented license suitable for public reuse with attribution, and `CITATION.cff` with repository title, author handle `Xmemo`, repository URL, and a note that weekly research briefs should be cited by dated Markdown file.

- [ ] **Step 8: Verify Task 1**

Fetch every created file from GitHub. Confirm all README links resolve to intended repository paths, all nine radars appear identically across both language landing pages and `research-map.md`, and no excluded private sections appear.

- [ ] **Step 9: Commit checkpoint**

Use commit message: `docs: launch bilingual research observatory shell`.

---

### Task 2: Import and normalize the initial Consensus evidence base

**Files:**
- Create: `references/consensus.md`
- Create: `references/master-bibliography.md`
- Create: `references/master.bib`

**Interfaces:**
- Consumes: Consensus paper records fetched and verified individually before public citation.
- Produces: canonical bibliographic ledger referenced by README, topic pages, and weekly reports.

- [ ] **Step 1: Re-fetch every Consensus paper already surfaced for this project**

For each previously surfaced record, call Consensus `fetch(id)` before citation. Capture title, authors, year, journal/venue, study type, DOI, Consensus URL, and any canonical source URL returned by the record. Do not publish a bibliographic entry that has only an unverified search snippet.

- [ ] **Step 2: Normalize and deduplicate records**

Deduplicate primarily by DOI; if DOI is absent, deduplicate by normalized lowercase title. Preserve multiple discovery paths only as metadata, not duplicate bibliography entries.

- [ ] **Step 3: Write the Consensus source ledger**

Create `references/consensus.md` with one compact record per verified paper: bibliographic citation, study type, DOI, Consensus record link, radar tags, and `Date added: 2026-08-28`. Mark low-confidence or peripheral papers as `candidate/reference-only` rather than silently promoting them to foundational status.

- [ ] **Step 4: Write the curated master bibliography**

Create `references/master-bibliography.md`, grouped by the three main domains. Include only records relevant enough to the 3×3 map, and separate `Foundational / high-value` from `Additional evidence / candidates` so quantity does not imply equal evidentiary weight.

- [ ] **Step 5: Write BibTeX**

Create `references/master.bib` with stable citation keys such as `vaccaro2024humanai`, `yan2024promises`, `fan2025metacognitive`, and `rahwan...` where applicable. DOI must be stored as DOI, not as an arbitrary tracking URL.

- [ ] **Step 6: Verify Task 2**

Check that every item in `master-bibliography.md` exists in `consensus.md`; every DOI appears at most once in `master.bib`; no fabricated journal/year/DOI fields are present; and references marked foundational are supported by their actual study design/venue.

- [ ] **Step 7: Commit checkpoint**

Use commit message: `docs: add normalized Consensus bibliography`.

---

### Task 3: Publish the first bilingual public research brief

**Files:**
- Create: `weekly/2026/2026-08-28.zh-CN.md`
- Create: `weekly/2026/2026-08-28.en.md`
- Modify: `README.md`
- Modify: `README.zh-CN.md`

**Interfaces:**
- Consumes: one freshly verified 12-item evidence set plus normalized bibliography.
- Produces: the launch publication that establishes the public weekly format.

- [ ] **Step 1: Re-run a fresh 9-radar scan for the launch brief**

Use current web/Consensus research. Do not copy any earlier chat weekly brief without re-verifying title, date, venue, methodology, and primary source. Scan all nine radars and Rahwan/CHM even if some produce no selected item.

- [ ] **Step 2: Freeze one 12-item evidence set**

For each item record: title, primary source, publication date, item type, radar tag(s), main finding/claim, evidence grade, caveat, and neutral `Why it matters`. Record internal coverage for all nine radars.

- [ ] **Step 3: Generate the Chinese public edition**

Write `weekly/2026/2026-08-28.zh-CN.md`. Exclude `专家说`, `元认知重构`, personalized article ideas, book strategy, and direct references to the user. Include inline source links and a short `本周研究地图信号` section based only on observed evidence.

- [ ] **Step 4: Generate the English public edition from the frozen set**

Write `weekly/2026/2026-08-28.en.md` without a second research pass. Preserve original paper titles and technical terms; rewrite editorial prose idiomatically in English; keep evidence grades, caveats, ordering, and citation identity aligned with Chinese.

- [ ] **Step 5: Update both README Latest Brief blocks**

Point `README.md` and `README.zh-CN.md` to both launch-language files. Keep README concise; do not inline the full brief.

- [ ] **Step 6: Verify bilingual parity**

Confirm both editions contain the same 12 source identities and grades, no extra scientific claim exists in only one language, and all excluded private sections are absent.

- [ ] **Step 7: Commit checkpoint**

Use commit message: `research: publish 2026-08-28 bilingual brief`.

---

### Task 4: Upgrade the existing weekly scheduled task into the publication engine

**Files:**
- External scheduled automation: `AI Cognition Research Brief`
- Repository outputs on each future run: `weekly/YYYY/YYYY-MM-DD.zh-CN.md`, `weekly/YYYY/YYYY-MM-DD.en.md`, `references/*`, and README Latest Brief links.

**Interfaces:**
- Consumes: the existing Friday scheduled research task.
- Produces: recurring bilingual GitHub publication plus user-facing full report.

- [ ] **Step 1: Replace the automation prompt with the 3×3 radar protocol**

The prompt must explicitly name all nine radars, require every radar to be scanned, require a unified candidate pool, prohibit quota-filling, prioritize Rahwan/CHM, and require peer-reviewed/preprint/institutional/program-signal distinctions.

- [ ] **Step 2: Add Consensus bibliography synchronization requirements**

For every retained Consensus-discovered paper, require a verified bibliographic record and deduplicated update of `references/consensus.md`, `references/master-bibliography.md`, and `references/master.bib`.

- [ ] **Step 3: Add the dual-output publishing filter**

Require the full ChatGPT report to retain the user-facing analytical sections, but GitHub public editions to exclude `专家说`, `元认知重构`, article-series recommendations, book strategy, and other personalized content. Require personalized `why this matters to you` language to be rewritten as neutral `Why it matters`.

- [ ] **Step 4: Add bilingual generation rules**

Require Chinese public edition first; freeze evidence; then create English edition from the same evidence without a second research pass. Preserve source identity and technical terminology.

- [ ] **Step 5: Add GitHub write/update behavior**

On each run, create or update dated weekly files, refresh README Latest Brief links, and update bibliography only when new verified records exist. Never rewrite historical briefs solely to change style.

- [ ] **Step 6: Verify automation configuration**

Read back the updated automation and confirm all nine radar names, GitHub repository name, bilingual rule, Consensus sync rule, publishing exclusions, and Rahwan/CHM priority are present.

---

### Task 5: Final public-repository audit

**Files:**
- Read-only audit of all launch files and current automation.

**Interfaces:**
- Consumes: Tasks 1–4.
- Produces: a verified launch state with explicit known limitations.

- [ ] **Step 1: Repository completeness check**

Confirm the repository contains bilingual README, 4 methodology files, 3 topic files, Rahwan page, 3 reference files, 2 launch brief files, license, citation metadata, design spec, and implementation plan.

- [ ] **Step 2: Private-content leakage check**

Search repository text for `专家说`, `元认知重构`, private book-project references, and personalized article-series planning. Expected result: no public-content occurrences outside design/policy documentation that explicitly names them as excluded categories.

- [ ] **Step 3: Bibliographic integrity check**

Sample at least five high-value references across different radars and verify title, year, journal/venue, DOI, and original URL against first-party or canonical records.

- [ ] **Step 4: Bilingual integrity check**

Compare the source list and evidence grades of the launch Chinese and English briefs. Expected: exact source identity and grade parity.

- [ ] **Step 5: Automation integrity check**

Confirm the Friday schedule is still enabled and its prompt contains all publication requirements.

- [ ] **Step 6: Report launch status**

Report: repository URL, files created, latest brief links, bibliography count, automation status, translation model decision, and any limitation that could not be verified. Do not claim success for any unverified item.
