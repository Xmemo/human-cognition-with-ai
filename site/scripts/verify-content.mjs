import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(siteRoot, '..');
const docsRoot = path.join(siteRoot, 'src', 'content', 'docs');

const corePairs = [
  ['README.md', 'README.zh-CN.md'],
  ['research/README.md', 'research/README.zh-CN.md'],
  ['research/research-history.en.md', 'research/research-history.zh-CN.md'],
  ['methodology/research-map.md', 'methodology/research-map.zh-CN.md'],
  ['methodology/search-protocol.md', 'methodology/search-protocol.zh-CN.md'],
  ['methodology/evidence-grading.md', 'methodology/evidence-grading.zh-CN.md'],
  ['methodology/publishing-policy.md', 'methodology/publishing-policy.zh-CN.md'],
  ['topics/human-cognitive-change.md', 'topics/human-cognitive-change.zh-CN.md'],
  ['topics/cognitive-augmentation-governance.md', 'topics/cognitive-augmentation-governance.zh-CN.md'],
  ['topics/machine-culture-collective-cognition.md', 'topics/machine-culture-collective-cognition.zh-CN.md'],
  ['people/iyad-rahwan.md', 'people/iyad-rahwan.zh-CN.md'],
];

const requiredCanonical = [
  ...new Set(corePairs.flat()),
  'references/master-bibliography.md',
  'references/consensus.md',
];

const requiredGenerated = [
  'index.md',
  'zh-cn/index.md',
  'baseline/index.md',
  'zh-cn/baseline/index.md',
  'research/index.md',
  'zh-cn/research/index.md',
  'weekly/index.md',
  'zh-cn/weekly/index.md',
  'research-map.md',
  'zh-cn/research-map.md',
  'methodology/search-protocol.md',
  'zh-cn/methodology/search-protocol.md',
  'methodology/evidence-grading.md',
  'zh-cn/methodology/evidence-grading.md',
  'methodology/publishing-policy.md',
  'zh-cn/methodology/publishing-policy.md',
  'topics/human-cognitive-change.md',
  'zh-cn/topics/human-cognitive-change.md',
  'topics/cognitive-augmentation-governance.md',
  'zh-cn/topics/cognitive-augmentation-governance.md',
  'topics/machine-culture-collective-cognition.md',
  'zh-cn/topics/machine-culture-collective-cognition.md',
  'people/iyad-rahwan.md',
  'zh-cn/people/iyad-rahwan.md',
  'references/bibliography.md',
  'zh-cn/references/bibliography.md',
  'references/consensus/index.md',
  'zh-cn/references/consensus/index.md',
];

const universallyProhibited = ['半神之后'];
const policyExampleMarkers = ['专家说', '元认知重构'];
const policyPages = new Set([
  'methodology/publishing-policy.md',
  'zh-cn/methodology/publishing-policy.md',
]);
const untranslatedChineseEditorialMarkers = [
  '**Source:**',
  '**Authors:**',
  '**Status:**',
  '**Radars:**',
  '**Why it matters：**',
  'Field Signals',
  'Domain 1｜Human Cognitive Change',
  'Domain 2｜Cognitive Augmentation & Governance',
  'Domain 3｜Machine Culture & Collective Cognition',
  'R1 Cognitive Offloading, Skill Formation & Expertise',
];

async function assertFile(base, rel) {
  const full = path.join(base, rel);
  try {
    const stat = await fs.stat(full);
    if (!stat.isFile()) throw new Error(`${rel} is not a file`);
  } catch {
    throw new Error(`Missing required file: ${rel}`);
  }
}

for (const rel of requiredCanonical) await assertFile(repoRoot, rel);
for (const rel of requiredGenerated) await assertFile(docsRoot, rel);

for (const [en, zh] of corePairs) {
  await assertFile(repoRoot, en);
  await assertFile(repoRoot, zh);
}

async function collectMarkdown(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await collectMarkdown(full)));
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

const generated = await collectMarkdown(docsRoot);
if (generated.length < 26) throw new Error(`Expected at least 26 generated Markdown pages, found ${generated.length}`);

for (const file of generated) {
  const text = await fs.readFile(file, 'utf8');
  const rel = path.relative(docsRoot, file).split(path.sep).join('/');

  for (const needle of universallyProhibited) {
    if (text.includes(needle)) {
      throw new Error(`Prohibited public string ${JSON.stringify(needle)} found in ${rel}`);
    }
  }

  if (!policyPages.has(rel)) {
    for (const needle of policyExampleMarkers) {
      if (text.includes(needle)) {
        throw new Error(`Private-only marker ${JSON.stringify(needle)} found outside publishing-policy pages: ${rel}`);
      }
    }
  }

  if (rel.startsWith('zh-cn/') && !rel.startsWith('zh-cn/references/')) {
    for (const needle of untranslatedChineseEditorialMarkers) {
      if (text.includes(needle)) {
        throw new Error(`Chinese editorial page still contains untranslated interface/taxonomy marker ${JSON.stringify(needle)}: ${rel}`);
      }
    }
  }

  const unresolved = text.match(/\]\((?!https?:|mailto:|#)[^)]+\.md(?:#[^)]+)?\)/);
  if (unresolved) {
    throw new Error(`Unresolved Markdown source link in ${rel}: ${unresolved[0]}`);
  }
}

const weeklyZh = generated.filter((file) => /[/\\]zh-cn[/\\]weekly[/\\]\d{4}-\d{2}-\d{2}\.md$/.test(file));
const weeklyEn = generated.filter((file) =>
  /[/\\]weekly[/\\]\d{4}-\d{2}-\d{2}\.md$/.test(file) &&
  !/[/\\]zh-cn[/\\]/.test(file),
);
if (weeklyEn.length === 0 || weeklyZh.length === 0) {
  throw new Error('Expected at least one dated weekly page in both English and Chinese');
}

const enDates = new Set(weeklyEn.map((file) => path.basename(file, '.md')));
const zhDates = new Set(weeklyZh.map((file) => path.basename(file, '.md')));
for (const date of enDates) {
  if (!zhDates.has(date)) throw new Error(`English weekly research lacks Chinese translation: ${date}`);
}
for (const date of zhDates) {
  if (!enDates.has(date)) throw new Error(`Chinese weekly research lacks English source edition: ${date}`);
}

console.log(`Verified ${generated.length} generated Markdown pages.`);
console.log(`Bilingual core contract passed for ${corePairs.length} canonical page pairs.`);
console.log(`Weekly parity passed for ${enDates.size} English/Chinese dated research updates.`);
console.log('Chinese editorial-label localization checks passed; paper titles remain exempt.');
console.log('Public-content scan passed with publishing-policy-only marker exceptions.');
