# Evidence Observatory 与 Autonomous Research Lab｜证据观测站与自动科研实验层

[English](evidence-observatory-and-autonomous-research-lab.md)

## 核心决策

**不要把自动科研直接接入观测站的文献摄入主循环。**

这个仓库应长期区分两个认识论角色：

1. **Evidence Observatory｜证据观测站**：尽可能中立地累积、比较外部研究记录。
2. **Research Lab｜研究实验层**：只有当某个缺口、矛盾或开放问题反复出现后，才针对一个经过人工选择的问题提出假设并进行更主动的研究。

两者之间增加一个明确的 **Gap Detection｜缺口发现层**。

```text
Evidence Observatory
        ↓
经过核验的文献持续累积
        ↓
Gap / contradiction / anomaly detection
        ↓
Open Questions & Research Gaps
        ↓
人工升级门槛
        ↓
Research Lab
        ↓
Hypothesis / adversarial search / analysis / experiment
        ↓
独立评估
        ↓
作为一种证据重新回到 Observatory
```

**Observatory 是裁判，Research Lab 是运动员。** Research Lab 不能自动改写 Baseline。

---

## 为什么一定要分开

假设驱动的自动 Agent 很容易让后续检索围绕自己当前的理论逐渐收缩。在真正检验一个假设时，这种进攻性很有价值；但对于一个证据观测站来说，它会破坏最重要的能力：保留领域异质性、冲突与未知。

最危险的失败模式是自我强化的认识论反馈回路：

```text
资料库里的证据
→ 项目自己生成理论
→ Agent 围绕这个理论继续搜索
→ 项目自己生成分析
→ 分析写回资料库成为“更强证据”
→ 后续搜索进一步收窄
```

因此应该刻意保护两种不同的 Agent 心态。

### Observatory Agent｜观测站 Agent

- 保守；
- 优先记录，而不是过早解释；
- 保留冲突证据；
- 明确标记未知；
- 不围绕某个宏大理论优化所有搜索；
- 某条 Radar 没有信号、或者冲突暂时无法解决，本身也属于有效结果。

### Research Agent｜研究 Agent

- 假设驱动；
- 主动寻找机制；
- 主动寻找反例；
- 可以 fork 多个竞争方向；
- 可以围绕显式 verifier、数据或实验迭代；
- 因为运行在单独的升级门槛之后，所以允许更探索、更进攻。

---

# 对自主科研开源体系的研究结论

本轮重点分析四套参考体系。

## 1｜ARIS / Auto-Research-In-Sleep

仓库：`wanshuiyin/Auto-claude-code-research-in-sleep`

最值得借鉴的机制：

- 把自主科研定义成 methodology（方法论），而不是绑定单一平台；
- plan → draft/experiment → adversarial review → iteration → persistent research wiki；
- 跨模型审查；
- 长期状态放在文件 / research wiki，而不是依赖对话记忆；
- 整个生态进一步发展了 Anti-Autoresearch 等完整性审计思想。

最值得拿走的是：

> **Research Spiral（研究螺旋）+ Adversarial Review（对抗审查）+ Persistent Research State（持久研究状态）。**

不应该直接放进 Observatory 的部分：

> 让系统自动生成理论，然后立刻让下一轮文献扫描围绕该理论运行。

## 2｜ScaleAutoResearch-Ramsey

仓库：`ypwang61/ScaleAutoResearch-Ramsey`

最值得借鉴的机制：

- 多个独立研究 Agent 并行；
- 通过 **immutable verifier（不可修改验证器）** 判断结果；
- 同时保存机器可读结果与人类可读实验记录；
- 更强的实验状态可以被其他 Agent 继承或 fork；
- 通过并行宽度与探索深度制造真正的搜索多样性。

最值得拿走的是：

> **Verifier-before-Agent、并行探索，以及只有在目标真正可测量时才进行优胜状态继承。**

但必须承认本项目与 Ramsey 问题不同。

Ramsey graph witness 可以通过确定性程序验证；开放式的人类认知研究不具备这种条件。因此，我们只应在确实可机器验证的地方使用 deterministic verifier，例如：

- DOI 是否可解析；
- 标题 / 作者 / venue 是否与 canonical metadata 一致；
- 发表日期；
- 去重；
- source identity；
- citation locator；
- 必需 artifact 是否存在。

高层科学解释仍然属于 judgment，不能伪装成一个客观数字 verifier。

## 3｜DeliAutoResearch

仓库：`LiuYihey/DeliAutoResearch`

最值得借鉴的机制：

- 明确把长期 Agent 的主要失败拆成 cognitive loop、stalling、runtime fragility；
- fresh session，而不是无限 resume 同一个上下文；
- 把 progress / state 持久化到文件；
- `directions_tried` 历史；
- execution 与 evaluation 分离；
- stall detector、structural pivot 与 watchdog；
- 独立的 post-iteration verification；
- provenance-first 的 citation / claim grounding。

如果未来 Research Lab 真的开始跑长时间研究，最值得继承的是：

> **anti-loop 状态管理、fresh-session 迭代、directions-tried、watchdog 和独立验证。**

不应该直接复制成项目治理规则的是：

> 把 zero-interaction 全自动自治当成修改公开科学结论的默认方式。

## 4｜Academic Research Skills（ARS）

仓库：`Imbad0202/academic-research-skills`

最值得借鉴的机制：

- 明确采用 human-in-the-loop；
- citation existence 与 metadata verification；
- claim–source alignment 与 locator；
- provenance / Material Passport 思想；
- integrity gates；
- cross-model handoff envelope；
- 对“验证能证明什么、不能证明什么”有清楚边界。

ARS 对本项目最重要的启发不是某个具体工具，而是认识论上的克制：

> **Verified provenance ≠ verified truth。某条证据能够支持一个 claim，也不等于该 claim 已经成为普遍真理。**

因此，即使未来执行层大量借鉴 ARIS / Deli 的自治机制，Research Lab 的证据纪律仍应更多参考 ARS。

---

# 未来 Research Lab 的推荐架构

当一个问题从 gap ledger（缺口台账）中被人工升级后，可以组合上面几套体系的长处：

```text
Research Contract
      ↓
多个独立搜索 / 分析分支
      ↓
能确定验证的部分交给 deterministic verifier
      ↓
Evidence + Claim Ledger
      ↓
独立 Red Team / adversarial review
      ↓
通过持久状态与 directions tried 继续迭代
      ↓
Candidate Conclusion
      ↓
Human Judgment Gate
      ↓
作为一种证据返回 Observatory
```

## 六层结构

### L1｜Research State

把问题、范围、已有尝试、失败方向和未解决不确定性保存到文件，而不是依赖 conversation history。

### L2｜Deterministic Verifiers

可以包括：

- DOI 能否解析；
- 来源是否真实存在；
- title / authors / venue 是否匹配标准元数据；
- 是否位于要求的时间窗口；
- 是否已经重复；
- 数字 claim 是否有 locator；
- 必需 artifact 是否真实存在。

不要把开放式科学判断伪装成确定性验证。

### L3｜Parallel Exploration

可以拆成：

- Evidence Backbone；
- Freshness search；
- Frontier search；
- 显式 Red Team / counterevidence search；
- 一个研究问题需要时，再加入不同竞争机制或分析路线。

不同分支共享的是 Research Contract 与 curated state，而不是一个无限膨胀的共同对话上下文。

### L4｜Claim and Evidence Trace

与中立的 Observatory 不同，进入 Research Lab 后可以正式建立结构化 claim ledger：

```text
claim
→ supporting evidence
→ counterevidence
→ scope
→ uncertainty
→ provenance
```

### L5｜Adversarial Review

独立 reviewer 应主动问：

- 什么证据会推翻这个结论？
- 哪些材料可能只是因为符合假设才被选择？
- 还有哪些可信的替代机制？
- 结论语气是否超过研究设计能支持的强度？
- 什么新证据会让当前判断反转？

### L6｜Human Judgment

Research Lab 可以输出 **candidate conclusion（候选结论）**，但不能直接升级 Observatory Baseline。

---

# Observatory → Research Lab 的升级门槛

Observatory 始终应该以问题为中心。只有同时满足若干条件时，一个 gap 才应该被提交给 Research Lab：

- 同一信号在多个独立扫描中反复出现；
- 高质量研究之间仍然存在真实冲突；
- 问题具有较高的理论或实践杠杆；
- 构念可以被测量或操作化；
- 新文献、数据、分析或实验有能力实质降低不确定性；
- 问题足够窄，不会退化成一个泛化世界观命题。

最终是否升级必须由人决定。

---

# Research Lab → Observatory 的回流规则

项目自己产生的研究**不能享有任何证据特权**。

Research Lab 的输出回到 Observatory 时，只能作为另一种 evidence object，并接受与外部研究相同的公开标准：

- provenance；
- 方法透明度；
- evidence grade；
- caveats；
- counterevidence；
- 明确区分 observation、interpretation 与 hypothesis。

系统绝不能变成：

```text
我们的 hypothesis
→ 我们自己的 Agent 验证
→ 自动升级 Baseline
```

而应是：

```text
我们的研究输出
→ independent review
→ Observatory intake
→ 与全部外部证据重新比较
→ 才可能触发 Baseline revision
```

---

# 当前阶段的实施决定

**暂时不实现完整 Autonomous Research Lab。**

目前只在 Observatory 中增加一个轻量层：

> **Open Questions & Research Gaps｜开放问题与研究缺口**

它负责保存文献自己暴露出来的问题，却不把这些问题自动升级成项目拥有的理论。未来 Research Lab 真正启动时，就可以从这里选择已经反复出现、重要而且足够具体的问题。

因此当前正确顺序是：

```text
Phase 1｜Observatory
Search → Verify → Grade → Accumulate → Compare

Phase 1.5｜Gap Detection
Convergence → Contradiction → Open Question / Research Gap

Phase 2｜Research Lab（未来）
人工选择问题 → 自动 / 半自动科研循环
```

这条边界的目的，就是保护 Evidence Observatory 最核心的价值：**尽量忠实地描述领域，而不是把资料库变成我们自己理论的证据收集机器。**