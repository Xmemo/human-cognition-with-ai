import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteRoot = path.resolve(__dirname, '..');
const distRoot = path.join(siteRoot, 'dist');

async function exists(rel) {
  try {
    const stat = await fs.stat(path.join(distRoot, rel));
    return stat.isFile();
  } catch {
    return false;
  }
}

const requiredRoutes = [
  'index.html',
  'zh-cn/index.html',
  'baseline/index.html',
  'zh-cn/baseline/index.html',
  'research/index.html',
  'zh-cn/research/index.html',
  'weekly/index.html',
  'zh-cn/weekly/index.html',
  'research-map/index.html',
  'methodology/search-protocol/index.html',
  'methodology/evidence-grading/index.html',
  'topics/human-cognitive-change/index.html',
  'topics/cognitive-augmentation-governance/index.html',
  'topics/machine-culture-collective-cognition/index.html',
  'people/iyad-rahwan/index.html',
  'references/bibliography/index.html',
  'llms.txt',
];

for (const rel of requiredRoutes) {
  if (!(await exists(rel))) throw new Error(`Missing built route: ${rel}`);
}

async function collectHtml(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collectHtml(full)));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const htmlFiles = await collectHtml(distRoot);
const universallyProhibited = ['半神之后'];
const policyExampleMarkers = ['专家说', '元认知重构'];
const policyPages = new Set([
  'methodology/publishing-policy/index.html',
  'zh-cn/methodology/publishing-policy/index.html',
]);

for (const file of htmlFiles) {
  const html = await fs.readFile(file, 'utf8');
  const rel = path.relative(distRoot, file).split(path.sep).join('/');

  for (const needle of universallyProhibited) {
    if (html.includes(needle)) {
      throw new Error(`Prohibited public string ${JSON.stringify(needle)} in ${rel}`);
    }
  }

  if (!policyPages.has(rel)) {
    for (const needle of policyExampleMarkers) {
      if (html.includes(needle)) {
        throw new Error(`Private-only marker ${JSON.stringify(needle)} found outside publishing-policy routes: ${rel}`);
      }
    }
  }

  if (!html.includes('application/ld+json')) {
    throw new Error(`Missing structured JSON-LD metadata: ${rel}`);
  }

  if (html.includes('name="robots" content="noindex')) {
    throw new Error(`Unexpected noindex directive in production page: ${rel}`);
  }
}

const homeHtml = await fs.readFile(path.join(distRoot, 'index.html'), 'utf8');
const zhHomeHtml = await fs.readFile(path.join(distRoot, 'zh-cn', 'index.html'), 'utf8');
for (const [label, html] of [['English homepage', homeHtml], ['Chinese homepage', zhHomeHtml]]) {
  if (!html.includes('data-observatory-hero')) {
    throw new Error(`${label} did not render the ObservatoryHero override`);
  }
  if (!html.includes('hreflang="en"') || !html.includes('hreflang="zh-CN"')) {
    throw new Error(`${label} is missing bilingual hreflang alternates`);
  }
}

const llms = await fs.readFile(path.join(distRoot, 'llms.txt'), 'utf8');
for (const needle of ['Current evidence baseline', 'Latest research update', '3×3 research map', 'Master bibliography']) {
  if (!llms.includes(needle)) throw new Error(`llms.txt missing required entry: ${needle}`);
}
if (!llms.includes('not presented as a search-ranking signal')) {
  throw new Error('llms.txt must retain the explicit non-ranking disclaimer');
}

const pagefindCandidates = ['pagefind/pagefind.js', '_pagefind/pagefind.js'];
if (!(await Promise.all(pagefindCandidates.map(exists))).some(Boolean)) {
  throw new Error('Pagefind search bundle was not generated');
}

console.log(`Verified ${requiredRoutes.length} required routes and ${htmlFiles.length} HTML pages.`);
console.log('Observatory hero, JSON-LD, hreflang, and llms.txt checks passed.');
console.log('Pagefind search bundle detected.');
console.log('Built public-output scan passed with policy-only marker exceptions.');
