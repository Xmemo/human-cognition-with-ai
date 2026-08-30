import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(siteRoot, '..');
const docsRoot = path.join(siteRoot, 'src', 'content', 'docs');
const repoUrl = 'https://github.com/Xmemo/human-cognition-with-ai';
const rawBasePath = process.env.BASE_PATH?.trim() || '';
const basePath = rawBasePath && rawBasePath !== '/'
  ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}`
  : '';

const toPosix = (value) => value.split(path.sep).join('/');
const yamlQuote = (value) => JSON.stringify(String(value));
const publicRoute = (route) => {
  const normalized = route.startsWith('/') ? route : `/${route}`;
  if (!basePath) return normalized;
  return normalized === '/' ? `${basePath}/` : `${basePath}${normalized}`;
};

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
const sourceToRoutes = new Map();
const directoryRoutes = new Map([
  ['weekly', { en: '/weekly/', 'zh-CN': '/zh-cn/weekly/' }],
  ['weekly/2026', { en: '/weekly/', 'zh-CN': '/zh-cn/weekly/' }],
]);

function register(source, output, route, options = {}) {
  const sourceRel = toPosix(source);
  const locale = options.locale || 'en';
  registrations.push({ source: sourceRel, output: toPosix(output), route, locale, ...options });
  const routes = sourceToRoutes.get(sourceRel) || {};
  routes[locale] = route;
  sourceToRoutes.set(sourceRel, routes);
}

function localizedRouteFor(source, locale) {
  const routes = sourceToRoutes.get(source);
  if (!routes) return null;
  return routes[locale] || routes.en || routes['zh-CN'] || null;
}

async function requirePair(enSource, zhSource) {
  const enExists = await exists(path.join(repoRoot, enSource));
  const zhExists = await exists(path.join(repoRoot, zhSource));
  if (!enExists || !zhExists) {
    throw new Error(`Bilingual parity violation: ${enSource} <-> ${zhSource}`);
  }
}

const rootFiles = await fs.readdir(path.join(repoRoot, 'research'));
const baselineEnFiles = rootFiles.filter((name) => /^baseline-\d{4}-\d{2}-\d{2}\.en\.md$/.test(name)).sort();
if (baselineEnFiles.length === 0) throw new Error('No English baseline found under research/');
const latestBaselineEn = baselineEnFiles.at(-1);
const latestBaselineDate = latestBaselineEn.match(/(\d{4}-\d{2}-\d{2})/)[1];
const latestBaselineZh = `baseline-${latestBaselineDate}.zh-CN.md`;
await requirePair(`research/${latestBaselineEn}`, `research/${latestBaselineZh}`);

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
await requirePair(`weekly/2026/${latestWeeklyDate}.en.md`, `weekly/2026/${latestWeeklyDate}.zh-CN.md`);

const methodologyFiles = (await listMarkdown('methodology')).filter((source) => !source.endsWith('.zh-CN.md'));
for (const source of methodologyFiles) {
  const stem = path.posix.basename(source, '.md');
  const zhSource = `methodology/${stem}.zh-CN.md`;
  await requirePair(source, zhSource);
  if (stem === 'research-map') {
    register(source, 'research-map.md', '/research-map/', { locale: 'en' });
    register(zhSource, 'zh-cn/research-map.md', '/zh-cn/research-map/', { locale: 'zh-CN' });
  } else {
    register(source, `methodology/${stem}.md`, `/methodology/${stem}/`, { locale: 'en' });
    register(zhSource, `zh-cn/methodology/${stem}.md`, `/zh-cn/methodology/${stem}/`, { locale: 'zh-CN' });
  }
}

const topicFiles = (await listMarkdown('topics')).filter((source) => !source.endsWith('.zh-CN.md'));
for (const source of topicFiles) {
  const stem = path.posix.basename(source, '.md');
  const zhSource = `topics/${stem}.zh-CN.md`;
  await requirePair(source, zhSource);
  register(source, `topics/${stem}.md`, `/topics/${stem}/`, { locale: 'en' });
  register(zhSource, `zh-cn/topics/${stem}.md`, `/zh-cn/topics/${stem}/`, { locale: 'zh-CN' });
}

const peopleFiles = (await listMarkdown('people')).filter((source) => !source.endsWith('.zh-CN.md'));
for (const source of peopleFiles) {
  const stem = path.posix.basename(source, '.md');
  const zhSource = `people/${stem}.zh-CN.md`;
  await requirePair(source, zhSource);
  register(source, `people/${stem}.md`, `/people/${stem}/`, { locale: 'en' });
  register(zhSource, `zh-cn/people/${stem}.md`, `/zh-cn/people/${stem}/`, { locale: 'zh-CN' });
}

// Reference records intentionally preserve original paper titles. The Chinese routes are
// localized navigation shells over the same canonical bibliographic source rather than a
// second copy of the evidence database.
register('references/master-bibliography.md', 'references/bibliography.md', '/references/bibliography/', { locale: 'en' });
register('references/master-bibliography.md', 'zh-cn/references/bibliography.md', '/zh-cn/references/bibliography/', {
  locale: 'zh-CN',
  titleOverride: '主参考文献',
  prepend: '> 本页保留论文原始标题与书目信息，不对论文题名进行中文改写。\n\n',
});
register('references/consensus.md', 'references/consensus/index.md', '/references/consensus/', { locale: 'en' });
register('references/consensus.md', 'zh-cn/references/consensus/index.md', '/zh-cn/references/consensus/', {
  locale: 'zh-CN',
  titleOverride: 'Consensus 来源台账',
  prepend: '> 本页是来源与核验台账；论文标题和平台记录保留原文。\n\n',
});
for (const source of await listMarkdown('references/consensus')) {
  const stem = path.posix.basename(source, '.md');
  register(source, `references/consensus/${stem}.md`, `/references/consensus/${stem}/`, { locale: 'en' });
  register(source, `zh-cn/references/consensus/${stem}.md`, `/zh-cn/references/consensus/${stem}/`, {
    locale: 'zh-CN',
    titleOverride: `Consensus 来源台账｜${stem}`,
    prepend: '> 来源记录保留论文与数据库的原始英文元数据。\n\n',
  });
}

function fallbackGitHubUrl(resolved) {
  return `${repoUrl}/blob/main/${resolved}`;
}

function rewriteLinks(markdown, sourceRel, locale) {
  return markdown.replace(/\]\(([^)]+)\)/g, (full, rawTarget) => {
    const target = rawTarget.trim();
    if (!target || target.startsWith('#') || /^(https?:|mailto:)/i.test(target)) return full;

    const [targetPath, fragment = ''] = target.split('#', 2);
    const sourceDir = path.posix.dirname(sourceRel);
    const resolved = path.posix.normalize(path.posix.join(sourceDir, targetPath)).replace(/^\.\//, '').replace(/\/$/, '');
    const suffix = fragment ? `#${fragment}` : '';

    const mapped = localizedRouteFor(resolved, locale) || directoryRoutes.get(resolved)?.[locale];
    if (mapped) return `](${publicRoute(mapped)}${suffix})`;

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
      `      link: ${yamlQuote(publicRoute(zh ? `/zh-cn/weekly/${latestWeeklyDate}/` : `/weekly/${latestWeeklyDate}/`))}`,
      '      icon: right-arrow',
      `    - text: ${yamlQuote(zh ? '当前研究基线' : 'Current Baseline')}`,
      `      link: ${yamlQuote(publicRoute(zh ? '/zh-cn/baseline/' : '/baseline/'))}`,
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
  const rewritten = rewriteLinks(raw, item.source, item.locale);
  const fallbackTitle = path.posix.basename(item.source, '.md');
  const extracted = extractTitle(rewritten, fallbackTitle);
  const title = item.titleOverride || extracted.title;
  const body = `${item.prepend || ''}${extracted.body}`;
  const description = item.descriptionOverride || descriptionFrom(
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
      ? '这里按时间倒序汇总公开研究更新。**周报 / 研究刷新记录最近发生了什么；研究基线记录目前证据总体能支持什么。**'
      : 'Dated research updates are listed newest first. **Weekly / Research Refresh tracks what changed; the Baseline tracks what the evidence currently supports.**',
    '',
  ];

  for (const date of sortedWeeklyDates) {
    const sourceSuffix = zh ? `${date}.zh-CN.md` : `${date}.en.md`;
    const hasLocale = weeklyFiles.some((file) => file.endsWith(sourceSuffix));
    if (!hasLocale) continue;
    lines.push(`- **[${date}](${publicRoute(`${prefix}/weekly/${date}/`)})**`);
  }
  return `${lines.join('\n')}\n`;
}

await fs.mkdir(path.join(docsRoot, 'weekly'), { recursive: true });
await fs.writeFile(path.join(docsRoot, 'weekly', 'index.md'), weeklyArchive('en'), 'utf8');
await fs.mkdir(path.join(docsRoot, 'zh-cn', 'weekly'), { recursive: true });
await fs.writeFile(path.join(docsRoot, 'zh-cn', 'weekly', 'index.md'), weeklyArchive('zh-CN'), 'utf8');

console.log(`Generated ${registrations.length + 2} Starlight pages from canonical repository content.`);
console.log(`Current baseline: ${latestBaselineDate}; latest research update: ${latestWeeklyDate}.`);
console.log('Bilingual parity enforced for core methodology, topic, people, latest weekly, and baseline pages.');
console.log(`Public base path: ${basePath || '/'}; generated internal links use locale-aware deployment-safe routes.`);
