import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(siteRoot, '..');
const publicRoot = path.join(siteRoot, 'public');

const siteOrigin = process.env.SITE_URL?.trim() || 'https://xmemo.github.io';
const rawBase = process.env.BASE_PATH?.trim() || '/human-cognition-with-ai';
const base = rawBase === '/'
  ? '/'
  : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;
const absolute = (route = '') => new URL(`${base}${route.replace(/^\/+/, '')}`, siteOrigin).href;

const researchFiles = await fs.readdir(path.join(repoRoot, 'research'));
const baselineDates = researchFiles
  .map((name) => name.match(/^baseline-(\d{4}-\d{2}-\d{2})\.en\.md$/)?.[1])
  .filter(Boolean)
  .sort();
const latestBaseline = baselineDates.at(-1);
if (!latestBaseline) throw new Error('Cannot generate agent index: no English baseline found.');

const weeklyFiles = await fs.readdir(path.join(repoRoot, 'weekly', '2026'));
const weeklyDates = weeklyFiles
  .map((name) => name.match(/^(\d{4}-\d{2}-\d{2})\.en\.md$/)?.[1])
  .filter(Boolean)
  .sort();
const latestWeekly = weeklyDates.at(-1);
if (!latestWeekly) throw new Error('Cannot generate agent index: no English weekly research update found.');

const lines = [
  '# Human Cognition with AI',
  '',
  '> A bilingual, evidence-first research observatory tracking how AI changes human cognition, collaboration, and culture.',
  '',
  'This file is a convenience index for AI agents and retrieval systems. It is not presented as a search-ranking signal.',
  '',
  '## Canonical entry points',
  '',
  `- Website: ${absolute()}`,
  `- Chinese website: ${absolute('zh-cn/')}`,
  `- Current evidence baseline (${latestBaseline}): ${absolute('baseline/')}`,
  `- Latest research update (${latestWeekly}): ${absolute(`weekly/${latestWeekly}/`)}`,
  `- Research hub: ${absolute('research/')}`,
  `- 3×3 research map: ${absolute('research-map/')}`,
  `- Master bibliography: ${absolute('references/bibliography/')}`,
  '',
  '## Core research domains',
  '',
  `- Human Cognitive Change: ${absolute('topics/human-cognitive-change/')}`,
  `- Cognitive Augmentation & Governance: ${absolute('topics/cognitive-augmentation-governance/')}`,
  `- Machine Culture & Collective Cognition: ${absolute('topics/machine-culture-collective-cognition/')}`,
  '',
  '## Methods and provenance',
  '',
  `- Search protocol: ${absolute('methodology/search-protocol/')}`,
  `- Evidence grading: ${absolute('methodology/evidence-grading/')}`,
  `- Consensus provenance: ${absolute('references/consensus/')}`,
  '',
  '## Source repository',
  '',
  '- GitHub: https://github.com/Xmemo/human-cognition-with-ai',
  '- Canonical public research content is maintained as Markdown in the repository and rendered into the website at build time.',
  '',
].join('\n');

await fs.mkdir(publicRoot, { recursive: true });
await fs.writeFile(path.join(publicRoot, 'llms.txt'), lines, 'utf8');
console.log(`Generated llms.txt with baseline ${latestBaseline} and latest research update ${latestWeekly}.`);
