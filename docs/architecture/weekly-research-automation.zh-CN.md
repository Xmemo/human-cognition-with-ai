# 每周研究自动化｜GPT + GitHub 混合架构

[English](weekly-research-automation.md)

## 决策

Human Cognition with AI 的每周更新采用**混合自动化架构**：

- **GPT 自动任务 = Research Engine（研究引擎）**：负责开放世界检索、阅读来源、证据判断、综合、研究缺口识别与双语编辑。
- **GitHub 仓库 = Canonical Research State（标准研究状态）**：保存研究协议、Baseline、Weekly 历史、参考文献、来源台账与 Open Questions & Research Gaps。
- **GitHub Actions = Deterministic Control Plane（确定性控制层）**：负责 schema / invariant 检查、双语来源一致性、DOI 去重、网站构建与部署。
- **Human = Epistemic Gate（认识论闸门）**：负责 Baseline、Research Map、方法论以及 Gap → Research Lab 的高层判断。

除非未来确实需要自建完整 Research Agent 基础设施，否则**不把开放世界科研检索迁入 GitHub Actions**。

```text
周五 08:00
GPT 自动任务
      ↓
读取 main 上的标准研究协议
      ↓
发现 → 核验 → 冻结证据集
      ↓
生成 Evidence Manifest
      ↓
由同一 Manifest 生成 EN + ZH-CN
      ↓
创建 Weekly Research PR
      ↓
Research QA + Site CI
      ↓
风险闸门
  ┌─────────────┬───────────────────┐
  │ ROUTINE     │ INTERPRETIVE /    │
  │ 全部绿灯    │ EPISTEMIC         │
  ↓             ↓                   │
自动合并       人工审核             │
  └─────────────┴──────────┬────────┘
                           ↓
                         main
                           ↓
                    GitHub Pages
```

---

## 1｜研究协议只有一个事实源

GPT 自动任务的 prompt 不再复制整套研究方法论。每次运行开始时，必须读取 `main` 分支最新版本的以下标准文件：

1. `methodology/search-protocol.md`
2. `methodology/evidence-grading.md`
3. `methodology/open-questions-research-gaps.md`
4. `methodology/publishing-policy.md`
5. `docs/architecture/bilingual-seo-policy.md`
6. `docs/architecture/evidence-observatory-and-autonomous-research-lab.md`
7. `docs/architecture/weekly-research-automation.md`
8. `weekly/evidence-manifest.schema.json`

如果无法读取这些文件，不允许悄悄退回模型记忆中的旧规则，应报告：

`PROTOCOL_READ_BLOCKED`

并在正式发布前停止。

这样一来，**修改 GitHub 方法论文档，就等于修改下一次自动研究任务的行为**，避免长 prompt 与仓库规则发生 configuration drift（配置漂移）。

---

## 2｜一个自动任务，内部拆成五个阶段

暂时不把发现、核验、翻译、发布拆成多个互相独立的定时任务。继续使用一个 Weekly Task，但明确阶段边界。

### Phase A｜Discover

通过三层检索扫描全部 9 条 Radar，形成一个统一候选池。

### Phase B｜Verify

核验标准来源、真实发表日期、DOI / URL、研究设计、证据等级、限制与时间标签，并在综合前完成去重。

### Phase C｜Freeze

在撰写任何一个语言版本之前，先生成：

`weekly/YYYY/YYYY-MM-DD.evidence.json`

它是中英文共享的机器可读证据契约，不是新的科学证据，也不意味着其中的解释已经被证明为真。

### Phase D｜Synthesize

从冻结证据集生成英文和简体中文 Weekly。英文是默认编辑版本；中文是真正的第二语言版本。**论文原始标题在两种语言中都保留英文。**

同时分别比较：

- Current Baseline；
- Open Questions & Research Gaps 长期台账。

### Phase E｜Publish by PR

创建类似下面的分支：

`research/weekly-YYYY-MM-DD`

然后写入 Weekly 双语文件、Evidence Manifest、参考文献 / 来源台账，以及本轮真正有依据的状态变化，再创建 Pull Request。**不直接写 main。**

---

## 3｜Frozen Evidence Manifest

正式切换日期：**2026-08-29**。

从这个日期起，每轮 Weekly 必须有三件套：

```text
weekly/YYYY/YYYY-MM-DD.en.md
weekly/YYYY/YYYY-MM-DD.zh-CN.md
weekly/YYYY/YYYY-MM-DD.evidence.json
```

v1 Manifest 冻结以下信息：

- 运行日期；
- EN / ZH-CN 版本身份；
- 三层检索是否全部使用；
- R1–R9 覆盖状态；
- 与哪个 Baseline 比较及 Baseline 决策；
- 入选来源身份；
- 原始英文论文题名；
- 发表日期；
- NEW / NEWLY INDEXED / NEWLY DISCOVERED；
- Radar 标签；
- Evidence Grade；
- DOI / canonical URL；
- 长期 Gap 状态变化。

标准 schema：

`weekly/evidence-manifest.schema.json`

2026-08-29 的 Manifest 标记为 `retrofitted: true`，因为当时 Weekly 已经发布，Manifest 规则后来才建立。以后必须**先 Freeze，再写双语正文**。

---

## 4｜Deterministic Research QA

`.github/workflows/research-qa.yml` 会执行：

`.github/scripts/research_qa.py`

只检查不依赖科学判断的 invariant（不变量）：

- cutover 之后每份英文 Weekly 都有中文配对和 Manifest；
- Manifest 日期与文件日期一致；
- 9 条 Radar 都有覆盖状态；
- 三层检索都被声明；
- source ID 与 DOI 不重复；
- DOI 在中英文公开版本中一致存在；
- 非 retrofit 运行中，论文标准英文标题必须原样出现在中英文两版；
- title 附近的 Evidence Grade 与 Radar 标签与 Manifest 一致；
- 中英文都存在正式 `Open Questions & Research Gaps` 栏目；
- Manifest 引用的长期 Gap ID 必须真实存在；
- Baseline decision 指向真实 Baseline 文件；
- `references/master.bib` 不允许 DOI 重复。

这些检查证明的是：

> **研究交付物在机器契约上保持一致。**

它们不能证明：

> **论文被模型解释得一定正确。**

因此 Research QA 全绿 ≠ 科学结论已被验证。

---

## 5｜PR 风险等级

Research QA 根据变更文件进行保守风险分级。

### ROUTINE｜常规更新

典型包括：

- 当周 EN / ZH-CN Weekly；
- 当周 Evidence Manifest；
- `references/master-bibliography.md`；
- `references/master.bib`；
- dated Consensus provenance；
- Research Hub 最新链接维护。

只有当所有 Research QA 与 Site CI 都通过后，GPT 自动任务才可以 squash merge ROUTINE PR。

### INTERPRETIVE｜解释性变化

典型包括：

- `methodology/open-questions-research-gaps*`；
- Topic 综合结论变化；
- Researcher Watch 的解释发生变化；
- 任何未明确列入 ROUTINE 的未知文件修改。

必须保留 PR 给人审核，不自动合并。

### EPISTEMIC｜认识论变化

典型包括：

- 新建或修改 Evidence Baseline；
- Research Map 变化；
- Search / Grading / Publishing 方法论变化；
- Observatory ↔ Research Lab 边界变化；
- Evidence Manifest schema 或 Research QA 机制本身变化。

永远不自动合并，必须人工审核。

风险等级是 workflow control（工作流控制），不是 Evidence Grade（证据等级）。

---

## 6｜每周发布规则

GPT 自动任务通常**不再每周修改根目录 README**。网站首页已经稳定指向当前 Weekly 与 Baseline 路由。

只有真正有依据时才修改长期状态：

- 新来源通过核验后更新 bibliography / provenance；
- Gap 被正式建立、重新定义、缩小、关闭或状态升级时，才修改长期 Gap Ledger；
- Baseline Policy 被触发时才创建新的 dated Baseline；
- 不能因为本周某个发现就顺手修改 methodology。

历史 Weekly 是当时的 research-state snapshot（研究状态快照），不因文风而重写。

---

## 7｜失败状态

自动任务使用显式失败语义：

- `PROTOCOL_READ_BLOCKED`：无法读取 GitHub 标准协议；
- `RESEARCH_INCOMPLETE`：必要 Radar / Retrieval Layer 没有完成扫描；
- `EVIDENCE_FREEZE_FAILED`：无法生成自洽 Evidence Manifest；
- `GITHUB_SYNC_BLOCKED`：研究完成但无法创建 GitHub 分支 / PR；
- `QA_BLOCKED`：PR 已创建，但确定性 QA 失败；
- `HUMAN_REVIEW_REQUIRED`：PR 属于 INTERPRETIVE 或 EPISTEMIC。

不能把部分失败的运行包装成“已成功发布”。

---

## 8｜GitHub Actions 不负责什么

GitHub Actions 不应判断：

- 一篇论文的因果解释是否充分；
- 某个新理论是否正确；
- Gap 是否应该升级成 hypothesis；
- 一篇反方向论文是否足以推翻 Baseline；
- 是否应该启动 Research Lab。

最终原则：

> **LLM 负责开放世界判断；确定性 CI 负责不变量；人保留高层认识论权力。**
