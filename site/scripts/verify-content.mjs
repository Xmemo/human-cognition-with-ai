import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(siteRoot, '..');
const docsRoot = path.join(siteRoot, 'src', 'content', 'docs');

const requiredCanonical = [
  'README.md',
  'README.zh-CN.md',
  'research/README.md',
  'research/README.zh-CN.md',
  'methodology/research-map.md',
  'methodology/search-protocol.md',
  'methodology/evidence-grading.md',
  'topics/human-cognitive-change.md',
  'topics/cognitive-augmentation-governance.md',
  'topics/machine-culture-collective-cognition.md',
  'people/iyad-rahwan.md',
  'references/master-bibliography.md',
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
  'methodology/search-protocol.md',
  'methodology/evidence-grading.md',
  'topics/human-cognitive-change.md',
  'topics/cognitive-augmentation-governance.md',
  'topics/machine-culture-collective-cognition.md',
  'people/iyad-rahwan.md',
  'references/bibliography.md',
];

const prohibited = [
  '专家说',
  '元认知重构',
  '半神之后',
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
if (generated.length < 16) throw new Error(`Expected at least 16 generated Markdown pages, found ${generated.length}`);

for (const file of generated) {
  const text = await fs.readFile(file, 'utf8');
  for (const needle of prohibited) {
    if (text.includes(needle)) {
      throw new Error(`Prohibited public string ${JSON.stringify(needle)} found in ${path.relative(docsRoot, file)}`);
    }
  }
  const unresolved = text.match(/\]\((?!https?:|mailto:|#)[^)]+\.md(?:#[^)]+)?\)/);
  if (unresolved) {
    throw new Error(`Unresolved Markdown source link in ${path.relative(docsRoot, file)}: ${unresolved[0]}`);
  }
}

const weeklyEn = generated.filter((file) => /[/\\]weekly[/\\]\d{4}-\d{2}-\d{2}\.md$/.test(file));
const weeklyZh = generated.filter((file) => /[/\\]zh-cn[/\\]weekly[/\\]\d{4}-\d{2}-\d{2}\.md$/.test(file));
if (weeklyEn.length === 0 || weeklyZh.length === 0) {
  throw new Error('Expected at least one dated weekly page in both English and Chinese');
}

console.log(`Verified ${generated.length} generated Markdown pages.`);
console.log(`Weekly pairs available: EN=${weeklyEn.length}, ZH=${weeklyZh.length}.`);
