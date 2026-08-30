import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.resolve(__dirname, '..', 'src', 'content', 'docs', 'zh-cn');

async function collectMarkdown(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collectMarkdown(full)));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

// These replacements only localize editorial labels, taxonomy names, and project
// terminology. Paper titles, author names, venue names, DOI strings, and raw
// bibliographic metadata are deliberately untouched.
const replacements = [
  ['## Baseline 决策', '## 研究基线决策'],
  ['## 本轮 Field Signals', '## 本轮研究信号'],
  ['| Radar | Signal |', '| 研究雷达 | 信号 |'],
  ['**Source:**', '**来源：**'],
  ['**Authors:**', '**作者：**'],
  ['**Status:**', '**状态：**'],
  ['**Radars:**', '**研究雷达：**'],
  ['**Evidence:', '**证据：'],
  ['**Why it matters：**', '**为什么重要：**'],
  ['｜NEWLY DISCOVERED：', '｜新发现（NEWLY DISCOVERED）：'],
  ['｜NEW：', '｜新论文（NEW）：'],
  ['Domain 1｜Human Cognitive Change', '领域 1｜人类认知变化'],
  ['Domain 2｜Cognitive Augmentation & Governance', '领域 2｜认知增强与治理'],
  ['Domain 3｜Machine Culture & Collective Cognition', '领域 3｜机器文化与集体认知'],
  ['R1 Cognitive Offloading, Skill Formation & Expertise', 'R1 认知外包、技能形成与专业能力'],
  ['R2 Metacognition, Epistemic Agency & Judgment', 'R2 元认知、认识论能动性与判断'],
  ['R3 Critical Thinking, Memory, Creativity & Writing Cognition', 'R3 批判性思维、记忆、创造力与写作认知'],
  ['R4 Tools for Thought & Cognitive Augmentation', 'R4 思维工具与认知增强'],
  ['R5 Human–AI Collaboration & Hybrid Intelligence', 'R5 人机协作与混合智能'],
  ['R6 Cognitive Resilience, Authorship & Responsibility', 'R6 认知韧性、作者性与责任'],
  ['R7 Machine Culture & Cultural Evolution', 'R7 机器文化与文化演化'],
  ['R8 Collective Intelligence & Human–AI Groups', 'R8 集体智能与人机群体'],
  ['R9 Social Learning, Norms & Cultural Feedback', 'R9 社会学习、规范与文化反馈'],
  ['3×3 Research Map', '3×3 研究地图'],
  ['Current Baseline', '当前研究基线'],
  ['Research Hub', '研究导航'],
  ['Control / Retention / Variance', '控制（Control）/ 保留（Retention）/ 差异（Variance）'],
];

const files = await collectMarkdown(docsRoot);
let changed = 0;
for (const file of files) {
  let text = await fs.readFile(file, 'utf8');
  const before = text;
  for (const [from, to] of replacements) text = text.split(from).join(to);
  if (text !== before) {
    await fs.writeFile(file, text, 'utf8');
    changed += 1;
  }
}

console.log(`Localized Chinese editorial labels in ${changed}/${files.length} generated pages.`);
console.log('Paper titles and canonical bibliographic metadata remain in original English.');
