# Bilingual SEO Policy

## Language hierarchy

- **English is the primary/default editorial language.** It is served at the root URL with no language prefix.
- **Simplified Chinese is the default secondary language.** It is served under `/zh-cn/`.
- English remains the source language for most paper metadata because the literature is predominantly published in English.
- Chinese pages are not thin navigation shells. Public research prose should be genuinely translated and edited for Chinese readers.

## URL and indexing contract

- English: `/topic/`
- Chinese: `/zh-cn/topic/`
- Keep equivalent slugs across languages to make page pairing stable.
- Every indexable English page and its translated Chinese counterpart must use **self-referencing canonical URLs**.
- Do **not** canonicalize a Chinese translation to the English page.
- Paired pages must expose reciprocal `hreflang="en"` and `hreflang="zh-CN"` links.
- `hreflang="x-default"` points to the English version because English is the site default.
- Do not automatically redirect visitors by detected browser language. The language selector must remain an explicit user choice.
- A Starlight fallback page that displays English content under a Chinese URL must be `noindex,follow` until a real Chinese translation exists.
- Chinese mirror pages whose visible body is almost entirely untranslated source metadata (for example raw provenance ledgers) should not be treated as Chinese SEO landing pages.

## Chinese editorial contract

For Chinese research pages:

1. UI, headings, navigation, summaries, explanations, evidence interpretation and methodological prose are Chinese-first.
2. A technical concept is written as **Chinese term（English term）** on first meaningful use; later uses normally use the Chinese term only.
3. Proper nouns, model names, author names, journal names, conference names, DOI strings and bibliographic metadata remain in their canonical form.
4. **Paper titles remain in the original English. Do not translate paper titles.**
5. Avoid English-only section labels such as `Field Signals`, `Why it matters`, `Source`, or `Status` on Chinese pages. Translate the label while preserving the value or paper metadata when needed.
6. Avoid paragraphs whose grammar is primarily English with Chinese connective words. A Chinese page should read naturally as Chinese research prose.

## Core terminology

| English | Preferred Simplified Chinese |
|---|---|
| Cognitive Offloading | 认知外包 |
| Skill Formation | 技能形成 |
| Expertise | 专业能力 |
| Metacognition | 元认知 |
| Epistemic Agency | 认识论能动性 |
| Critical Thinking | 批判性思维 |
| Writing Cognition | 写作认知 |
| Tools for Thought | 思维工具 |
| Cognitive Augmentation | 认知增强 |
| Human–AI Collaboration | 人机协作 |
| Hybrid Intelligence | 混合智能 |
| Cognitive Resilience | 认知韧性 |
| Authorship | 作者性 |
| Machine Culture | 机器文化 |
| Collective Cognition | 集体认知 |
| Social Learning | 社会学习 |
| Cultural Feedback | 文化反馈 |
| Control | 控制 |
| Retention | 保留 |
| Variance | 差异 |

## Translation priority

Chinese translation work follows this order:

1. Homepage / portal
2. Current Baseline
3. Latest Weekly / Research Refresh
4. Research Map and three Topic pages
5. Research Hub and methodology pages
6. People / researcher watch pages
7. Historical updates

Raw bibliography and provenance records are evidence infrastructure rather than Chinese-language editorial pages. Their paper titles and metadata remain English.

## SEO QA

The build should fail or warn when:

- a core translated route is missing;
- the latest English research update has no Chinese counterpart;
- a fallback page is accidentally indexable;
- `hreflang` points to a page that is only fallback content;
- Chinese pages lose their `zh-CN` language metadata;
- the homepage regresses to client-side DOM rewriting for critical content.

The goal is **English-first publishing with a real Chinese edition**, not duplicated URLs with different navigation chrome.
