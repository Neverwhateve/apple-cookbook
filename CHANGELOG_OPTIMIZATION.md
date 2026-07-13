# Apple Cookbook 优化变更记录

日期：2026-07-13
分支：`codex/cookbook-project-optimization`

## 第八轮：治理 PR 发布与 ruleset 第二阶段启用

- 精确发布：74 个优化/治理文件提交为 `173f7d7` 并推送到专用分支；9 个并发 Harvest/用户路径全部保持在提交之外。
- Draft PR：创建 [#12](https://github.com/Neverwhateve/apple-cookbook/pull/12)，目标为 `main`，未自动标记 Ready 或合并。
- 远端前置检查：`Validate pull request` 依次通过依赖安装、Harvest manifest、内容校验、lint、TypeScript、112 项测试和 production build。
- ruleset 更新：只对现有 ID `18863035` 做 PUT，加入精确 context `Validate pull request` 和 strict/up-to-date；没有 POST 重复 ruleset，bypass 仍为空。
- 回读与审计：effective main rules 包含 deletion、non-fast-forward、pull-request、required-status-checks；只读治理 checker 返回 exit 0、0 findings。
- 剩余边界：workflow 源文件尚未进入 `main`；必须在明确批准后合并 PR #12，并在合并后再次要求治理审计 exit 0。剩余 32 篇 v1 迁移继续暂停。

## 第七轮：远端 `main` ruleset 第一阶段启用

- 远端写入：在 `Neverwhateve/apple-cookbook` 创建并启用 `Protect main`（ruleset ID `18863035`），仅目标 `refs/heads/main`。
- 已强制：所有变更经 PR；禁止删除 `main`；禁止 non-fast-forward/force push；允许 merge/squash/rebase；审批数维持单维护者可用的 0；bypass 列表为空，API 回读为 `current_user_can_bypass: never`。
- 安全分期：远端尚无 `.github/workflows/content-quality.yml`，也没有近 7 天成功的 `Validate pull request` check。GitHub 只要求该检查近期在同一仓库成功，不要求先在默认分支运行；本阶段没有提前加入 required check，避免所有 PR 永久等待。
- 回读验证：repository rules API 返回 deletion、non-fast-forward、pull-request 三条 active 规则。治理 checker 现在不再报告 `main` 未保护，只准确保留 `RULE_MISSING`、`REQUIRED_CHECK_MISSING` 和 `REMOTE_WORKFLOW_MISSING` 三项第二阶段 drift。
- 范围：没有提交、推送或合并本地项目代码；剩余 32 篇 v1 迁移按用户指示暂停。

## 第六轮：搜索意图边界、第三篇 v2 迁移与治理告警精确化

### 真实语料搜索意图边界

- 原问题：AirPods 充电盒、屏幕时间限额、Apple Pay 付款/加卡等口语查询会被相邻文章抢占；`钱包添加不了卡` 甚至误召回 Mac Mail。`Apple ID 密码忘了` 会优先命中 iPhone 锁屏密码文章，可能把账户问题误导到抹除设备流程。
- 修改：新增充电盒故障、屏幕时间限额、Apple Pay 被拒、Wallet 加卡和 Apple 账户密码等必要概念；只有 title、aliases 或专门的 `intentKeywords` 能显式声明主意图。普通 `keywords` 仍含 tags 并参与召回，但不会再让 `App Limits` 等泛标签冒充 canonical；正文或症状中的旁支提及同样不能越过门槛。
- 80% 边界：即使显式从语料移除 untracked 的 80% 充电 canonical，掉电或 AirPods 文章中顺带出现的“80%/充电上限”也不会成为替代答案。
- 真实基准：`src/lib/search-corpus.test.ts` 现有 17 个稳定 top-1 id/route 映射，以及 4 个 80%/Screen Time canonical 和普通 tag 边界用例；19 个搜索核心测试与 21 个真实语料测试共 40 项。

### iPad 屏幕键盘 Article Schema v2 等价迁移

- 修改：只迁移 `cookbook/iPad/ipad-keyboard-small-floating-split-moving.md` 的 frontmatter。按统一的 `SHA-256(gray-matter.content.trim())` 口径，正文前后均为 `986f37b06b16f9e818f35bc5efc711372f34c14fd0e6fdd26b3b78fc69473a51`，标题、slug、路由及 6 个来源 URL 原顺序不变。
- 来源：逐页核对 4 个 Apple Support 页面及 2 个 Apple Support Community 页面。悬浮/拆分恢复和 iPadOS 26.0.1 特定修复为 `Official`；辅助功能与外接键盘的因果应用保持 `Likely`，社区页面明确 `official: false`。
- 兼容性：历史 `difficulty: Easy` 规范为 v2 枚举 `Quick`，运行时原本就按 Quick 展示，因此没有页面行为变化。
- 验证：单篇 preview 为 0 review issue，正文 hash、route、source URL 顺序均通过等价检查；全库变为 32 v1 + 4 v2，遗留人工判断项从 345 降到 337。
- 独立内容修正：迁移验收后发现 Markdown 正文仍把辅助功能/外接键盘 Likely 排查放在 Apple 官方章节。现已移入“社区经验与补充排查”，明确 `较可能（Likely）`，把无证据的“成功概率中等”改为未知，并从该 solution 移除不匹配的社区 sourceId；6 条来源记录均保留。修正后正文 SHA-256 为 `90adca9bc5764a4b5162e57f9e56d5cbbf875349a034153a52fff9f855d97c2d`，与前述 frontmatter 等价迁移分开记录。

### 内容治理告警与 Official solution 边界

- 两篇 `seed` 内容改为 `popular: false`，并同步修正 v1 Schema 示例；seed 仍可站内搜索，但不再携带矛盾的热门元数据。
- popular 统计改为只计算 `reviewed/canonical`，当前 33/34 仍准确暴露“热门失去精选语义”的 P1 债务，不为清零 warning 随意改文章。
- 原先恒响的“Official + community”改为 31 篇 v1 缺少 solution-level sourceIds 的迁移债务；含社区来源却没有“非官方/社区”章节标题的文章会逐文件告警。当前唯一命中的是用户/Harvest 正在修改的电池文章，本轮没有覆盖。
- v2 Official solution 现在要求全部 sourceIds 都属于显式官方、allowlisted 且 ID 唯一的 Apple 来源；混入社区、未知或歧义 ID 会被 validator 拒绝，并在运行时降为 `Unknown`。若首个推荐方案缺失或不是 Official，validator 直接拒绝文章级 Official，运行时也同步把顶层降为 `Unknown`；后置 Official 推荐不能掩盖问题，不安全的 alternative 则不连带降低安全主方案。新增 runtime 与 validator 正反向测试锁定这些信任边界。

## 第五轮：真实语料基准与首篇原生 v2 canonical

### “Mac 系统数据很大”内容缺口

- 原问题：合成搜索 fixture 能证明存在目标文档时的排序能力，但真实 cookbook 没有对应答案；修复 precision 前还会误召回 iCloud 储存或系统更新文章。
- 修改：先把 `system-data` 设为必要概念，确保缺文时诚实返回无结果；随后逐页核对 10 个 Apple 官方页面，新增 `cookbook/Mac/mac-system-data-storage-apfs-snapshots-purgeable-space.md`。文章从源头使用 v2，区分系统数据分类、实际可用/可清除空间、Time Machine 本地快照和通用 APFS 快照。
- 可信边界：Apple 官方主路径只覆盖储存空间检查、可管理内容清理、Time Machine 设置和临时安全模式。磁盘工具确实可以查看/删除 APFS 快照，但把任意快照删除用于“系统数据很大”仍是个案推断，因此结构化方案和正文均标为 `Likely`；文章不声称快照一定属于系统数据，也不推荐终端批量删除或第三方清理工具。
- 用户收益：`系统数据很大`、`Mac其他空间很大`、`APFS快照占空间` 和 `purgeable space Mac` 均能命中一篇来源透明、风险明确的 canonical，而不是得到泛化储存答案。
- 验证：单篇 v2 preview 为 0 review issue；全库内容校验为 36 篇（33 v1 + 3 v2）、0 error。

### 真实 cookbook 搜索基准

- 新增 `src/lib/search-corpus.test.ts`，直接读取公开 cookbook，而不是复制一组脱离内容库的 fixture。
- 固定 4 个稳定 top-1 id/route：家人位置、Wi-Fi、Mac Mail 和 Mac 系统数据；80% 充电根据 canonical 是否存在分别要求目标 top-1 或空结果，因此不会依赖审计前的 untracked Harvest 文件。
- `charge-at-eighty` 也成为必要概念，并增加合成负例：缺少 80% 目标文章时不得用普通“无法充电”文章替代。
- 验证：11 个搜索核心测试 + 5 个真实语料测试全部通过。

## 第四轮：公开生命周期、快照完整性与第二篇 v2

### draft 隔离与 seed 可信提示

- 原问题：内容模型虽然有 `draft/seed/reviewed/canonical`，公开页面仍普遍读取全量文章；仅靠自动化要求新文为 draft，不能保证工作稿不会出现在搜索、分类、相关文章、静态路由或 sitemap。
- 修改：在 `cookbook.ts` 建立单一 lifecycle 边界。`draft` 不进入公开详情、首页搜索、分类、标签、相关文章、静态参数或 sitemap；审计/迁移仍可用全量读取。`seed` 保留站内可发现性，但卡片和详情统一提示“待进一步复核”，metadata 为 `noindex, follow`；sitemap 只收 `reviewed/canonical`。
- 用户收益：自动化草稿不会意外上线；尚未完全复核的问题仍可帮助用户，但不会伪装成成熟答案或主动提交给搜索引擎。
- 验证：5 个 lifecycle fixture 测试；构建产物确认两个 seed 均 noindex 且不在 sitemap，canonical 正常 index；当前没有 draft，因此既有可访问文章数不变。

### 反馈快照离线 verify

- 原问题：快照虽有 SHA-256 manifest，但仍依赖人工逐项比对，也没有统一拒绝路径穿越、符号链接、额外/缺失文件和不兼容 manifest 的恢复前门禁。
- 修改：recovery CLI 增加只读 `verify --snapshot PATH`。它严格校验 format v1、四个受控路径、bytes/hash、布局和 Unix 权限；不获取 live queue lock、不写快照，也不输出反馈正文、异常文件名、manifest 原值或 symlink target。
- 用户收益：快照复制到耐久存储后可以自动检查传输或后续篡改；不健康快照会在进入人工恢复设计前 fail closed。
- 兼容影响：权限偏宽是 warning；verify 证明“与自身 manifest 一致”，不证明原队列语义健康，也仍不自动 restore。

### Mac Mail Article Schema v2 等价迁移

- 原问题：首篇 Wi-Fi 试点不足以覆盖来源多、分支多且第三方邮箱边界复杂的文章。
- 修改：先仅迁移 `cookbook/Mac/mac-mail-cant-send-receive-email.md` 的 frontmatter；按统一的 `SHA-256(gray-matter.content.trim())` 口径，该迁移验收点正文前后均为 `10e550b0d1bb95089edf6ec810bad839309c477a9dadac947f0e7d208e301ddd`，标题、slug、路由和 9 个来源 URL 顺序不变。5 个 Apple 来源逐页核对为 official，4 个社区来源显式非官方；服务商迁移、Exchange/IMAP 与 SMTP 分支保持 `Likely`。
- 后续独立修正：把公开正文中“Exchange 或 IMAP 同步混乱时重建邮箱”的验证级别从过度的“Apple 官方”改为“较可能”，把 Apple 官方重建步骤从“搜索或同步异常”收窄到来源明确支持的“搜索异常”，并把“这不是 Mac 硬件问题”改为非绝对的概率判断；修正后正文 SHA-256 为 `acc92f1d16315205da05eed3bd88a3a0f6b2c6077bfbb8f68a1ef6d9a791fab1`。这些是内容正确性修复，不伪装成 frontmatter 等价迁移的一部分。
- 用户收益：页面可展示真实来源标题、发布方和日期，并把官方主方案与社区支持的个案分支落实到 solution/source 级，而不改写既有正文。
- 验证：实际搜索 4 条 Mac Mail 症状均 top-1；单篇 preview 0 review issue。该轮结束时为 33 v1 + 2 v2；第五轮新增原生 v2 后为 33 v1 + 3 v2，旧文仍有 345 项必须人工判断。

### 搜索覆盖口径纠正

- `系统数据很大` 的正向行为测试使用合成文档，只证明“存在匹配文档时”的排序能力。真实 35 篇 cookbook 没有对应 Mac canonical；修复前实际回放会误召回 iCloud 储存和系统更新文章。
- 新增必要概念约束和负向回归测试后，真实查询先改为返回无结果，不再用泛化储存文章代替答案。第五轮完成官方来源研究和人工审核后才新增 canonical；报告继续区分 synthetic ranking 与 corpus coverage。

### Official host 精确 allowlist

- 原问题：运行时与校验器曾把任意 `*.apple.com` 当成可支撑 Official 的来源，因此 Apple Support Community 若被错误写成 `official: true`，可能穿过信任边界。
- 修改：运行时、validator 与 JSON Schema 统一只允许 `https://support.apple.com`。两个 Apple 社区域、其他 Apple 子域、HTTP 和 lookalike 域均不能支撑 Official；运行时降级文章/方案到 `Unknown`，校验器 fail closed。
- 兼容影响：当前 12 个结构化 official 来源全部在 allowlist 内，合法语料无变化；未来若确需 Apple Developer/政策等其他官方 host，必须在来源语义和测试审阅后显式扩展，不能恢复通配符。

### slug 异常输入安全 404

- 原问题：公开详情 lookup 对 route params 无条件 `decodeURIComponent`，字面 `%`、畸形百分号或非法 Unicode 可能抛 `URIError` 并返回 500。
- 修改：使用确定顺序的安全编码候选，正常支持中文、空格、编码/混合参数和字面 `%`；无法解码/编码的输入返回 `undefined`，由页面进入 404。
- 兼容影响：正常路由语义保持；该修复不替代未来以稳定 id/slug 和 redirects 管理 URL 的工作。

## 第三轮：治理闭环、恢复能力与 v2 试点

### GitHub main 策略与只读漂移检查

- 原问题：仓库内已有 PR workflow，但远端 `main` 是否保护、必需检查的精确 context、bypass 和参数漂移都只能靠人工记忆。
- 修改：新增 `.github/rulesets/main.json`、只读 GitHub checker、12 个治理测试和操作文档。检查器核对 main target、PR、deletion/force-push、required check、workflow 状态、参数和空 bypass；GitHub 信息不足时 fail closed，绝不自动修改远端。
- 当时结论：2026-07-13 初次只读审计确认远端 rulesets 为空、`main` 未保护、Content quality workflow 尚未合并；该阶段 drift exit 1 是正确结果。
- 兼容影响：必须先合并 workflow 并让 job `Validate pull request` 成功运行，再由管理员显式启用规则集。机器 context 是 job name，不是 UI 可能显示的 `Content quality / Validate pull request`。

### 反馈队列 doctor 与原子快照

- 原问题：文件锁已能避免并发覆盖，但缺少不泄露内容的对账工具、可校验备份和首次备份/首次提交竞态保护。
- 修改：新增 `feedback:doctor` 和 `feedback:backup` CLI。doctor 检查损坏 JSONL、重复/跨分区 ID、状态、同步标记和 daily-work 投影；backup 始终使用同一 queue lock，写入私有临时目录、逐文件 SHA-256 manifest，再原子 rename，拒绝覆盖。
- 用户收益：维护人员可在不改源数据、不回显正文/联系方式的前提下判断队列健康并取得一致快照。本地真实队列检查为 0 error/0 warning。
- 兼容影响：没有实现 restore 或数据库切换；生产仍需在 ECS 上执行加密快照、异地保存和 manifest 校验。

### 首篇 Article Schema v2 等价迁移

- 原问题：v2 双读只有 fixture，尚未证明真实 canonical 文章可在不改正文、路由和来源边界的情况下迁移。
- 修改：仅迁移 `cookbook/Networking/iphone-ipad-wifi-no-internet-unable-to-join.md`。正文 SHA-256、标题、slug、路由和原 10 个来源 URL 保持不变；7 个 Apple 页面实际核对标题/日期，3 个社区来源显式 `official: false`，DNS fallback 保持 `Unknown`。
- 页面收益：文章页现在读取结构化 summary、系统、最后验证和来源元数据，展示真实来源标题/发布方/日期；v1 文章继续兼容。文章 metadata 增加 canonical URL 和 article Open Graph。
- 验证：35 篇内容为 34 v1 + 1 v2，试点 preview reviewIssues=0，正文和 URL 哈希等价；迁移预览 CLI 同时修复 package-manager 裸 `--` 参数透传并增加回归测试。

## 第二轮：自动化、反馈存储与内容模型

### Harvest draft PR 与冲突门禁

- 原问题：仓库虽要求 AI 先生成 draft/PR，但没有实际生成器或机器门禁；历史 Harvest 可直接创建 canonical 内容并写 main。
- 修改：新增 run manifest Schema、校验器、8 个行为测试、PR-only Content quality workflow 和操作文档。门禁核对 PR base SHA、整文件 base/proposed SHA-256、manifest 与实际 Cookbook diff、create/update/redirect、draft、Official 来源、重复/no-op、path traversal 和 symlink。
- 用户收益：main 前进或人工修改文章后，旧自动提案会明确失败，不再静默覆盖；自动新文不能直接变为已发布内容。
- 兼容影响：普通人工 PR 没有 manifest 时跳过专用门禁；`harvest/*` 与 `automation/harvest/*` 分支必须提交一个 manifest。该轮实施时 GitHub main ruleset 尚待在仓库设置中启用。

### 反馈队列单 ECS 并发加固

- 原问题：提交、管理员状态更新和 GitHub 同步都可能 read-modify-write 覆盖；管理员 GET 还会触发归档写入；Vercel `/tmp` 会返回伪成功。
- 修改：新增共享 `.queue.lock`、owner token/stale 恢复、同目录 temp + fsync + atomic rename。网页提交、管理员更新、只读一致快照和远端 GitHub 同步统一使用该协议；Vercel 明确返回“未保存”。
- 用户收益：24 路并发提交和 16 路并发归档测试均不丢记录，读取队列不再修改 inbox/archive；存储失败会在表单返回可重试提示。
- 兼容影响：inbox 是事实源、daily-work 是可重建投影。两个文件仍不是崩溃原子事务，也不能支持多主机写入；最终仍需 SQLite 或外部数据库迁移。

### Article Schema v2 双读

- 原问题：v1 只有 URL 数组和文章级 verification，无法记录来源标题、访问日期、方案级可信度、sourceIds、系统版本和 canonical identity。
- 修改：新增 v1/v2 normalize adapter、结构化 Schema、5 个 adapter 测试、v2-aware 内容校验和只读迁移预览。`cookbook.ts` 最小接入，旧 UI 继续读取 device/category/verification/updated/source URL 兼容别名，结构化搜索字段可直接进入索引。
- 信任边界：v2 来源只有显式 `official: true` 且属于 Apple 域才满足 Official；Official solution 必须引用该官方 source ID，域名或 publisher 不会自动抬高可信度。
- 当时状态：35 篇文章仍全部为 v1，预览产生 364 个人工审阅项；第三轮仅完成 1 篇人工试迁移，仍不批量填充无法证明的 accessedAt、lastVerifiedAt、createdAt 或来源标题。

## 安全与隐私

### 生产管理员认证 fail closed

- 原问题：生产缺 token/password 时，session 校验仍可能使用公开固定 fallback secret。
- 修改：生产必须同时配置非空密码和至少 128-bit 估算熵的高熵 token；配置不完整时 credential/session 都拒绝。
- 用户收益：避免攻击者伪造管理员 Cookie 访问反馈队列。
- 涉及：`src/lib/feedback-admin.ts`、`.env.example`。
- 兼容影响：生产环境若没有安全 token，管理员登录会停止工作，必须先按 `.env.example` 配置并轮换旧凭据。

### 公开 GitHub Issue 脱敏

- 原问题：反馈中的姓名、门店或联系方式会写入公开 Issue。
- 修改：workflow 不再读取或输出 contact；原始 contact 只留在私有 ECS 反馈队列。表单增加隐私说明。
- 用户收益：降低个人信息公开泄露风险。
- 涉及：`.github/workflows/sync-feedback-intake.yml`、`article-feedback-widget.tsx`。
- 兼容影响：Issue 处理人需要在私有管理员队列查看联系方式。

### 依赖与响应头

- 通过 pnpm override 将 Next 的 PostCSS 传递依赖统一到 8.5.16；`pnpm audit --prod` 从 1 个 moderate 变为 0。
- 新增 nosniff、frame deny、referrer policy 和 permissions policy。
- 增加反馈多行字段 4,000 字符上限。
- 涉及：`pnpm-workspace.yaml`、`pnpm-lock.yaml`、`next.config.ts`、`feedback.ts` 和反馈组件。

## 搜索

### 新搜索核心

- 原问题：中文无空格整句、中英连写、错字和数字组合会漏召回；完整正文整体下发客户端。
- 修改：新增紧凑 SearchDocument、CJK n-gram、中英边界、同义词、英文单编辑模糊、错误码精确、字段权重和 coverage。
- 用户收益：口语化描述更容易找到 canonical article；`为什么看不到家人的位置`、`wifi连不上`、`充电80` 浏览器实测首条均正确。
- 涉及：`src/lib/search.ts`、`search.test.ts`、`cookbook.ts`、`search-panel.tsx`。
- 验证：11/11 搜索核心测试、5/5 真实语料测试；三类既有真实 UI 搜索通过；`系统数据很大` 现在稳定命中新 canonical。
- 边界说明：合成测试只验证排名机制；真实覆盖由读取 cookbook 的稳定 id/route 断言负责。系统数据和 80% 充电概念在目标文章缺失时都不得退回泛化文章。

### 搜索结果体验

- 增加首屏搜索、明确 placeholder、热门症状按钮、结果数、最佳答案、命中字段、片段高亮、清除按钮和无结果建议。
- seed 结果明确标“待进一步复核”，不进入首页热门/最近更新。
- 首页 HTML/RSC 分别约下降 38%/45%。
- 涉及：首页和 SearchPanel。

## 首页与导航

- 将搜索移到 hero，重写产品承诺为症状语言。
- 修复 Continuity 分类链接和聚合计数不一致。
- 空 `Vision Pro` 目录不再生成首页设备入口或空分类。
- 移动端增加分类入口，搜索/主题按钮提升到 44px。
- 涉及：`src/app/page.tsx`、`layout.tsx`、`theme-toggle.tsx`、`cookbook.ts`。

## 文章可信度与阅读

- “Apple 官方”改为“主方案：Apple 官方”，并解释社区经验单独标注。
- 官方方案和社区方案标题使用蓝色/琥珀色区分。
- 隐藏普通用户无价值的内部 status，保留设备、难度和内容更新日期。
- 增加 Apple 官方来源快捷按钮、复制、原生分享和官方/社区来源分组。
- “升级处理”在 UI 中改为“如果仍未解决”。
- 修复中文 heading fragment 生成。
- 涉及：recipe page、article actions、verification badge、labels、article card、CSS。

## 内容质量门禁

- 新增 `pnpm validate:content`，校验 frontmatter、枚举、日期、slug、来源、章节、步骤、风险、内部链接和热门异常。
- 现有 `difficulty: Easy` 在运行时安全映射为 Quick，但校验继续 warning；未直接修改用户文章。
- CI 新增 validate content、typecheck 和 test，再进入 build。
- 新增 `typecheck`、`test`、`verify` 脚本和 Node/pnpm 版本声明。
- 涉及：validator、package、tsconfig、deploy workflow、cookbook loader。

## SEO、错误状态和 Accessibility

- 新增 metadataBase、title template、Open Graph、robots、sitemap、分类/标签 metadata 和 noindex 管理页/反馈页。
- 新增全局 error boundary。
- 新增 skip link、focus-visible、search landmark、独立 aria-live、动态主题 label。
- 404 和反馈页返回链接直接指向首页搜索。
- 涉及：`src/app` metadata/robots/sitemap/error、layout、globals、not-found。

## 文件清单

### 新增

- `.env.example`
- `PROJECT_AUDIT.md`
- `OPTIMIZATION_ROADMAP.md`
- `CHANGELOG_OPTIMIZATION.md`
- `scripts/validate-content.mjs`
- `scripts/validate-content.test.mjs`
- `scripts/validate-harvest-run.mjs`
- `scripts/validate-harvest-run.test.mjs`
- `scripts/preview-content-migration.mjs`
- `scripts/preview-content-migration.test.mjs`
- `scripts/check-github-governance.mjs`
- `scripts/check-github-governance.test.mjs`
- `scripts/feedback-recovery.ts`
- `scripts/feedback-recovery.test.mjs`
- `schemas/article-v2.schema.json`
- `schemas/harvest-run.schema.json`
- `docs/ARTICLE_SCHEMA_V2.md`
- `docs/HARVEST_WORKFLOW.md`
- `docs/GITHUB_GOVERNANCE.md`
- `docs/FEEDBACK_RECOVERY.md`
- `.github/rulesets/main.json`
- `.github/workflows/content-quality.yml`
- `src/lib/search.ts`
- `src/lib/search.test.ts`
- `src/lib/search-corpus.test.ts`
- `src/lib/cookbook.test.ts`
- `src/lib/article-schema.ts`
- `src/lib/article-schema.test.ts`
- `src/lib/file-store.ts`
- `src/lib/feedback.test.ts`
- `src/components/article-actions.tsx`
- `src/components/verification-badge.tsx`
- `src/app/error.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`

### 修改

- `.github/workflows/deploy-aliyun-ecs.yml`
- `.github/workflows/sync-feedback-intake.yml`
- `.gitignore`
- `README.md`、`docs/ARTICLE_SCHEMA.md`、`docs/ALIYUN_ECS_DEPLOY.md`
- `docs/ARTICLE_SCHEMA_V2.md`、`docs/HARVEST_WORKFLOW.md`
- `package.json`、`pnpm-lock.yaml`、`pnpm-workspace.yaml`、`tsconfig.json`、`next.config.ts`
- 首页、布局、文章、分类、标签、反馈、404 和管理员页面
- 搜索、卡片、主题、反馈组件
- cookbook/feedback/labels 相关 lib
- `cookbook/Networking/iphone-ipad-wifi-no-internet-unable-to-join.md`（只迁移 frontmatter；正文不变）
- `cookbook/Mac/mac-mail-cant-send-receive-email.md`（frontmatter 等价迁移后，另行修正 3 处可信表达）
- `cookbook/Mac/mac-system-data-storage-apfs-snapshots-purgeable-space.md`（新增原生 v2 canonical；10 个 Apple 官方来源）
- `cookbook/iPad/ipad-keyboard-small-floating-split-moving.md`（frontmatter 等价迁移后，另行修正官方/Likely 正文边界）

## 保留且未改写的用户/Harvest 内容

开始审计前已存在：

- 两篇已修改 iPhone 文章。
- `indexes/categories.md`、`indexes/related.md`。
- 7 月 13 日新增报告和 source harvest 日志。
- 新增 `iphone-charging-paused-80-temperature-charge-limit.md`。

实施期间又出现：

- `iphone-black-screen-wont-turn-on-after-battery-drained.md`。
- `iphone-unavailable-security-lockout-forgot-passcode.md` 的后段外部更新。

上述内容均视为外部/用户工作，本轮没有批量改写、删除或重置。

## 暂未处理

- Draft PR #12 已发布完整 Content quality workflow 依赖并成功运行检查，现有 ruleset 已加入严格 `Validate pull request`；PR 的明确审核/合并和真实 Harvest 生成器接入仍待处理。
- 反馈数据库迁移、跨主机事务、幂等/rate limit、生产备份/恢复演练；单 ECS 并发、doctor/backup/offline verify 和 Vercel fail closed 已处理。Snapshot manifest 尚无签名、大小上限或流式哈希。
- 剩余 32 篇 v1 内容的逐篇 v2 人工迁移、verificationHistory 和稳定 URL redirect；双读/Schema/预览与三篇试点已完成。
- popular 的真实精选或匿名统计。
- 浮动反馈 dialog 的完整焦点管理。
- redirect aliases、OG 图片和 JSON-LD；article canonical URL 已完成。
- 拼音、最近搜索、可分享搜索筛选和千篇级索引。
- 继续用脱敏真实零结果/点击数据扩充 query benchmark；当前已有 17 个稳定映射与 4 个 canonical/tag 边界用例。
- v2 `solutions/warnings/limitations` 尚未直接驱动公开正文，仍需迁移时做人工一致性对照。

## 验证方式

- `pnpm validate:content`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- 精确 PR 发布闭包：排除 9 个外部 Harvest/用户路径后，`pnpm verify` 为 34 篇（30 v1 + 4 v2）、0 errors、64 个 unit + 48 个 automation = 112/112 tests、164 个页面；只读迁移预览剩余 317 个待人工判断项。
- 完整本地工作区：`pnpm verify` 为 36 篇（32 v1 + 4 v2）、0 errors、112/112 tests、167 个页面；多出的两篇为未纳入 PR 的外部 Harvest 内容。
- `pnpm audit --prod`
- `pnpm preview:content-v2`（完整工作区 32 篇 v1、4 篇 v2、只读；旧文剩余 337 个待人工判断项；三篇迁移试点和一篇原生 v2 均 0 review issue）
- `pnpm feedback:doctor -- --json`（本地真实队列 0 error、0 warning）
- `pnpm feedback:verify -- --snapshot <path>`（有效、篡改、路径、symlink、布局和权限黑盒用例）
- `node scripts/check-github-governance.mjs --json`（ruleset 第二阶段后返回 exit 0、0 findings；观察到 Active `Protect main`、精确 required check 和三条 workflow 路径）
- `git diff --check`、规则集/Schema JSON、GitHub workflow YAML 解析。
- 前一轮视觉回归：桌面首页与自然语言搜索、v2 文章、390×844 来源卡/无横向溢出、404、错误覆盖层与控制台均通过。
- 最终 production server HTTP 回归：首页、seed、Mac Mail、sitemap 均 200；未知与畸形 slug 均 404；seed 标题先于提示且为 noindex、seed 不在 sitemap、canonical/source/date/可信修正均存在。
- 第五轮 production Browser 回归：in-app Browser 已实际检查“Mac 系统数据很大”文章的桌面与 390×844 移动端布局，可信等级、系统版本、日期和 10 张来源卡均正常，无错误覆盖层或横向溢出；首页搜索 `系统数据很大` 返回唯一且正确的 canonical 结果。新文章 HTTP 为 200 并已进入 sitemap。当前环境仍缺 `agent-browser` CLI，但不再影响本轮可视验证结论。
- 第六轮 production Browser 回归：AirPods 充电盒、Screen Time 限额、Apple Pay 付款、Wallet 加卡、Apple 账户密码中英文查询均返回唯一且正确的首条结果；无结果提示和 404 正常。iPad 键盘文章桌面与 390×844 移动端均显示 Official 主方案、Quick、系统版本、验证日期、4 张官方与 2 张社区来源卡，社区补充排查明确为 `Likely`；无控制台错误、错误覆盖层或横向溢出，复制/分享按钮均为 44px。文章 HTTP 为 200 并已进入 sitemap。
