import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(siteRoot, '..');
const docsRoot = path.join(siteRoot, 'src', 'content', 'docs');
const repoUrl = 'https://github.com/Xmemo/human-cognition-with-ai';

const toPosix = (value) => value.split(path.sep).join('/');
const yamlQuote = (value) => JSON.stringify(String(value));

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listMarkdown(dirRel) {
  const abs = path.join(repoRoot, dirRel);
  if (!(await exists(abs))) return [];
  const entries = await fs.readdir(abs, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const rel = toPosix(path.join(dirRel, entry.name));
    if (entry.isDirectory()) files.push(...(await listMarkdown(rel)));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(rel);
  }
  return files.sort();
}

function stripFrontmatter(markdown) {
  if (!markdown.startsWith('---\n')) return markdown;
  const end = markdown.indexOf('\n---\n', 4);
  return end === -1 ? markdown : markdown.slice(end + 5);
}

function extractTitle(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  if (!match) return { title: fallback, body: markdown };
  const title = match[1].replace(/\s+#*$/, '').trim();
  const body = markdown.replace(match[0], '').replace(/^\s+/, '');
  return { title, body };
}

function plainText(value) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[>*_~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function descriptionFrom(body, fallback) {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => plainText(p))
    .filter((p) => p.length >= 30 && !/^[-:]+$/.test(p));
  const text = paragraphs[0] || fallback;
  return text.length > 180 ? `${text.slice(0, 177).trimEnd()}...` : text;
}

const registrations = [];
const sourceToRoute = new Map();
const directoryRoutes = new Map([
  ['weekly', '/weekly/'],
  ['weekly/2026', '/weekly/'],
]);

function register(source, output, route, options = {}) {
  const sourceRel = toPosix(source);
  registrations.push({ source: sourceRel, output: toPosix(output), route, ...options });
  if (!sourceToRoute.has(sourceRel)) sourceToRoute.set(sourceRel, route);
}

const rootFiles = await fs.readdir(path.join(repoRoot, 'research'));
const baselineEnFiles = rootFiles.filter((name) => /^baseline-\d{4}-\d{2}-\d{2}\.en\.md$/.test(name)).sort();
if (baselineEnFiles.length === 0) throw new Error('No English baseline found under research/');
const latestBaselineEn = baselineEnFiles.at(-1);
const latestBaselineDate = latestBaselineEn.match(/(\d{4}-\d{2}-\d{2})/)[1];
const latestBaselineZh = `baseline-${latestBaselineDate}.zh-CN.md`;
if (!(await exists(path.join(repoRoot, 'research', latestBaselineZh)))) {
  throw new Error(`Missing paired Chinese baseline: research/${latestBaselineZh}`);
}

register('README.md', 'index.md', '/', { locale: 'en', home: true });
register('README.zh-CN.md', 'zh-cn/index.md', '/zh-cn/', { locale: 'zh-CN', home: true });
register('research/README.md', 'research/index.md', '/research/', { locale: 'en' });
register('research/README.zh-CN.md', 'zh-cn/research/index.md', '/zh-cn/research/', { locale: 'zh-CN' });
register('research/research-history.en.md', 'research/history.md', '/research/history/', { locale: 'en' });
register('research/research-history.zh-CN.md', 'zh-cn/research/history.md', '/zh-cn/research/history/', { locale: 'zh-CN' });
register(`research/${latestBaselineEn}`, 'baseline/index.md', '/baseline/', { locale: 'en' });
register(`research/${latestBaselineZh}`, 'zh-cn/baseline/index.md', '/zh-cn/baseline/', { locale: 'zh-CN' });

for (const name of baselineEnFiles.slice(0, -1)) {
  const date = name.match(/(\d{4}-\d{2}-\d{2})/)[1];
  register(`research/${name}`, `baseline/${date}.md`, `/baseline/${date}/`, { locale: 'en' });
  const zh = `research/baseline-${date}.zh-CN.md`;
  if (await exists(path.join(repoRoot, zh))) {
    register(zh, `zh-cn/baseline/${date}.md`, `/zh-cn/baseline/${date}/`, { locale: 'zh-CN' });
  }
}

const weeklyFiles = await listMarkdown('weekly');
const weeklyDates = new Set();
for (const source of weeklyFiles) {
  const file = path.posix.basename(source);
  const en = file.match(/^(\d{4}-\d{2}-\d{2})\.en\.md$/);
  const zh = file.match(/^(\d{4}-\d{2}-\d{2})\.zh-CN\.md$/);
  if (en) {
    weeklyDates.add(en[1]);
    register(source, `weekly/${en[1]}.md`, `/weekly/${en[1]}/`, { locale: 'en' });
  } else if (zh) {
    weeklyDates.add(zh[1]);
    register(source, `zh-cn/weekly/${zh[1]}.md`, `/zh-cn/weekly/${zh[1]}/`, { locale: 'zh-CN' });
  }
}
const sortedWeeklyDates = [...weeklyDates].sort().reverse();
if (sortedWeeklyDates.length === 0) throw new Error('No weekly research files found');
const latestWeeklyDate = sortedWeeklyDates[0];

for (const source of await listMarkdown('methodology')) {
  const stem = path.posix.basename(source, '.md');
  register(source, `methodology/${stem}.md`, `/methodology/${stem}/`, { locale: 'en' });
}
for (const source of await listMarkdown('topics')) {
  const stem = path.posix.basename(source, '.md');
  register(source, `topics/${stem}.md`, `/topics/${stem}/`, { locale: 'en' });
}
for (const source of await listMarkdown('people')) {
  const stem = path.posix.basename(source, '.md');
  register(source, `people/${stem}.md`, `/people/${stem}/`, { locale: 'en' });
}

register('references/master-bibliography.md', 'references/bibliography.md', '/references/bibliography/', { locale: 'en' });
register('references/consensus.md', 'references/consensus/index.md', '/references/consensus/', { locale: 'en' });
for (const source of await listMarkdown('references/consensus')) {
  const stem = path.posix.basename(source, '.md');
  register(source, `references/consensus/${stem}.md`, `/references/consensus/${stem}/`, { locale: 'en' });
}

function fallbackGitHubUrl(resolved) {
  return `${repoUrl}/blob/main/${resolved}`;
}

function rewriteLinks(markdown, sourceRel) {
  return markdown.replace(/\]\(([^)]+)\)/g, (full, rawTarget) => {
    const target = rawTarget.trim();
    if (!target || target.startsWith('#') || /^(https?:|mailto:)/i.test(target)) return full;

    const [targetPath, fragment = ''] = target.split('#', 2);
    const sourceDir = path.posix.dirname(sourceRel);
    const resolved = path.posix.normalize(path.posix.join(sourceDir, targetPath)).replace(/^\.\//, '').replace(/\/$/, '');
    const suffix = fragment ? `#${fragment}` : '';

    const mapped = sourceToRoute.get(resolved) || directoryRoutes.get(resolved);
    if (mapped) return `](${mapped}${suffix})`;

    if (resolved.endsWith('.md') || resolved.endsWith('.bib') || resolved === 'CITATION.cff') {
      return `](${fallbackGitHubUrl(resolved)}${suffix})`;
    }
    return full;
  });
}

function frontmatter({ title, description, source, locale, home }) {
  const lines = [
    '---',
    `title: ${yamlQuote(title)}`,
    `description: ${yamlQuote(description)}`,
    `editUrl: ${yamlQuote(`${repoUrl}/edit/main/${source}`)}`,
  ];

  if (home) {
    const zh = locale === 'zh-CN';
    lines.push(
      'template: splash',
      'hero:',
      `  title: ${yamlQuote('Human Cognition with AI')}`,
      `  tagline: ${yamlQuote(zh ? '持续追踪 AI 如何改变人类认知、协作与文化的双语证据观测站。' : 'A bilingual, evidence-first observatory tracking how AI changes human cognition, collaboration, and culture.')}`,
      '  actions:',
      `    - text: ${yamlQuote(zh ? '阅读最新研究' : 'Read latest research')}`,
      `      link: ${yamlQuote(zh ? `/zh-cn/weekly/${latestWeeklyDate}/` : `/weekly/${latestWeeklyDate}/`)}`,
      '      icon: right-arrow',
      `    - text: ${yamlQuote(zh ? '当前研究基线' : 'Current Baseline')}`,
      `      link: ${yamlQuote(zh ? '/zh-cn/baseline/' : '/baseline/')}`,
      '      variant: minimal',
    );
  }

  lines.push('---', '');
  return lines.join('\n');
}

await fs.rm(docsRoot, { recursive: true, force: true });
await fs.mkdir(docsRoot, { recursive: true });

for (const item of registrations) {
  const sourcePath = path.join(repoRoot, item.source);
  if (!(await exists(sourcePath))) throw new Error(`Required source missing: ${item.source}`);

  const raw = stripFrontmatter(await fs.readFile(sourcePath, 'utf8'));
  const rewritten = rewriteLinks(raw, item.source);
  const fallbackTitle = path.posix.basename(item.source, '.md');
  const { title, body } = extractTitle(rewritten, fallbackTitle);
  const description = descriptionFrom(
    body,
    item.locale === 'zh-CN'
      ? 'Human Cognition with AI 研究观测站内容。'
      : 'Research from the Human Cognition with AI observatory.',
  );
  const outputPath = path.join(docsRoot, item.output);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    `${frontmatter({ title, description, source: item.source, locale: item.locale, home: item.home })}${body.trim()}\n`,
    'utf8',
  );
}

function weeklyArchive(locale) {
  const zh = locale === 'zh-CN';
  const prefix = zh ? '/zh-cn' : '';
  const lines = [
    '---',
    `title: ${yamlQuote(zh ? '研究更新归档' : 'Research Update Archive')}`,
    `description: ${yamlQuote(zh ? 'Human Cognition with AI 的历次研究更新与完整扫描。' : 'Dated research updates and full scans from Human Cognition with AI.')}`,
    '---',
    '',
    zh
      ? '这里按时间倒序汇总公开研究更新。**Weekly / Research Refresh 记录最近发生了什么；Baseline 记录目前证据能支持什么。**'
      : 'Dated research updates are listed newest first. **Weekly / Research Refresh tracks what changed; the Baseline tracks what the evidence currently supports.**',
    '',
  ];

  for (const date of sortedWeeklyDates) {
    const sourceSuffix = zh ? `${date}.zh-CN.md` : `${date}.en.md`;
    const hasLocale = weeklyFiles.some((file) => file.endsWith(sourceSuffix));
    if (!hasLocale) continue;
    lines.push(`- **[${date}](${prefix}/weekly/${date}/)**`);
  }
  return `${lines.join('\n')}\n`;
}

await fs.mkdir(path.join(docsRoot, 'weekly'), { recursive: true });
await fs.writeFile(path.join(docsRoot, 'weekly', 'index.md'), weeklyArchive('en'), 'utf8');
await fs.mkdir(path.join(docsRoot, 'zh-cn', 'weekly'), { recursive: true });
await fs.writeFile(path.join(docsRoot, 'zh-cn', 'weekly', 'index.md'), weeklyArchive('zh-CN'), 'utf8');

console.log(`Generated ${registrations.length + 2} Starlight pages from canonical repository content.`);
console.log(`Current baseline: ${latestBaselineDate}; latest research update: ${latestWeeklyDate}.`);
