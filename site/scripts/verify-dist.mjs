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
  'zh-cn/research-map/index.html',
  'methodology/search-protocol/index.html',
  'zh-cn/methodology/search-protocol/index.html',
  'methodology/evidence-grading/index.html',
  'zh-cn/methodology/evidence-grading/index.html',
  'methodology/publishing-policy/index.html',
  'zh-cn/methodology/publishing-policy/index.html',
  'topics/human-cognitive-change/index.html',
  'zh-cn/topics/human-cognitive-change/index.html',
  'topics/cognitive-augmentation-governance/index.html',
  'zh-cn/topics/cognitive-augmentation-governance/index.html',
  'topics/machine-culture-collective-cognition/index.html',
  'zh-cn/topics/machine-culture-collective-cognition/index.html',
  'people/iyad-rahwan/index.html',
  'zh-cn/people/iyad-rahwan/index.html',
  'references/bibliography/index.html',
  'zh-cn/references/bibliography/index.html',
  'references/consensus/index.html',
  'zh-cn/references/consensus/index.html',
  'llms.txt',
  'sitemap-index.xml',
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

  const hasNoindex = html.includes('name="robots" content="noindex,follow"');
  const isChineseReferenceMirror = rel.startsWith('zh-cn/references/');
  if (isChineseReferenceMirror && !hasNoindex) {
    throw new Error(`Chinese reference mirror must be noindex,follow: ${rel}`);
  }
  if (!isChineseReferenceMirror && hasNoindex) {
    throw new Error(`Unexpected noindex directive on translated/indexable page: ${rel}`);
  }
}

const homeHtml = await fs.readFile(path.join(distRoot, 'index.html'), 'utf8');
const zhHomeHtml = await fs.readFile(path.join(distRoot, 'zh-cn', 'index.html'), 'utf8');
for (const [label, html, marker] of [
  ['English homepage', homeHtml, 'Start with what the evidence supports now'],
  ['Chinese homepage', zhHomeHtml, '先看现在知道什么'],
]) {
  if (!html.includes('data-observatory-hero')) {
    throw new Error(`${label} did not render the ObservatoryHero override`);
  }
  if (!html.includes('data-cognitive-field')) {
    throw new Error(`${label} did not render the animated CognitiveField visual`);
  }
  if (html.includes('class="crv-instrument"')) {
    throw new Error(`${label} still renders the retired working-model hero panel`);
  }
  if (!html.includes('data-observatory-portal')) {
    throw new Error(`${label} did not render the server-side research portal`);
  }
  if (!html.includes(marker)) {
    throw new Error(`${label} is missing portal copy marker ${JSON.stringify(marker)}`);
  }
  if (html.includes('observatoryGrouped')) {
    throw new Error(`${label} still contains the retired client-side DOM regrouping script`);
  }
  if (!html.includes('hreflang="en"') || !html.includes('hreflang="zh-CN"') || !html.includes('hreflang="x-default"')) {
    throw new Error(`${label} is missing bilingual hreflang alternates`);
  }
}

const chineseRouteMarkers = new Map([
  ['zh-cn/research-map/index.html', '研究地图｜3 个领域 × 9 条雷达'],
  ['zh-cn/methodology/search-protocol/index.html', '每周检索协议'],
  ['zh-cn/methodology/evidence-grading/index.html', '证据分级'],
  ['zh-cn/topics/human-cognitive-change/index.html', '人类认知变化'],
  ['zh-cn/topics/cognitive-augmentation-governance/index.html', '认知增强与治理'],
  ['zh-cn/topics/machine-culture-collective-cognition/index.html', '机器文化与集体认知'],
  ['zh-cn/people/iyad-rahwan/index.html', '前沿追踪'],
]);

for (const [route, marker] of chineseRouteMarkers) {
  const html = await fs.readFile(path.join(distRoot, route), 'utf8');
  if (!html.includes(marker)) {
    throw new Error(`Chinese parity route ${route} does not contain expected Chinese source marker ${JSON.stringify(marker)}`);
  }
  if (!html.includes('hreflang="en"') || !html.includes('hreflang="zh-CN"')) {
    throw new Error(`Translated Chinese route ${route} is missing reciprocal hreflang`);
  }
}

for (const route of ['zh-cn/references/bibliography/index.html', 'zh-cn/references/consensus/index.html']) {
  const html = await fs.readFile(path.join(distRoot, route), 'utf8');
  if (html.includes('hreflang="zh-CN"')) {
    throw new Error(`Raw English metadata mirror must not advertise itself as a translated hreflang target: ${route}`);
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
console.log('CognitiveField hero and server-rendered research portal checks passed.');
console.log(`Chinese parity markers passed for ${chineseRouteMarkers.size} core routes.`);
console.log('English-first / Chinese-second robots and hreflang rules passed.');
console.log('JSON-LD, sitemap, llms.txt, and Pagefind checks passed.');
console.log('Built public-output scan passed with publishing-policy-only marker exceptions.');
