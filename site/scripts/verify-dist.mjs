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
const policyPage = 'methodology/publishing-policy/index.html';

for (const file of htmlFiles) {
  const html = await fs.readFile(file, 'utf8');
  const rel = path.relative(distRoot, file).split(path.sep).join('/');

  for (const needle of universallyProhibited) {
    if (html.includes(needle)) {
      throw new Error(`Prohibited public string ${JSON.stringify(needle)} in ${rel}`);
    }
  }

  if (rel !== policyPage) {
    for (const needle of policyExampleMarkers) {
      if (html.includes(needle)) {
        throw new Error(`Private-only marker ${JSON.stringify(needle)} found outside the publishing-policy page: ${rel}`);
      }
    }
  }
}

const pagefindCandidates = ['pagefind/pagefind.js', '_pagefind/pagefind.js'];
if (!(await Promise.all(pagefindCandidates.map(exists))).some(Boolean)) {
  throw new Error('Pagefind search bundle was not generated');
}

console.log(`Verified ${requiredRoutes.length} required routes and ${htmlFiles.length} HTML pages.`);
console.log('Pagefind search bundle detected.');
console.log('Built public-output scan passed with policy-only marker exceptions.');
