# Apple Cookbook 项目审计

审计日期：2026-07-13
审计分支：`codex/cookbook-project-optimization`

## 1. 当前项目概况

Apple Cookbook 已经是一个可运行的 Markdown 驱动知识库，而不是空壳项目。它使用 Next.js App Router 生成公开站点，以 `cookbook/` 下的 Markdown 作为单一内容源，并提供首页搜索、分类、标签、文章阅读、反馈收集和管理员反馈队列。

远端 `main` 基线有 33 篇已跟踪文章；审计开始时，本地工作区因已有一篇未跟踪 Harvest 内容而显示 34 篇。实施期间外部 Harvest 又新增文章并更新既有内容；本轮同时根据 10 个逐页核对的 Apple 官方来源新增“Mac 系统数据很大”原生 v2 canonical，因此完整工作区最终验证为 36 篇。发布闭包严格排除了两篇外部未跟踪文章和其他 7 个外部修改，干净暂存快照为 34 篇。所有外部并发内容均未被覆盖、重置或归入本轮提交。

| 项目 | 现状 |
| --- | --- |
| 框架 | Next.js 15.5.20、React 19.2.7、TypeScript strict |
| 内容源 | Obsidian 兼容 Markdown + YAML frontmatter |
| 渲染 | 首页静态生成、文章/分类/标签 SSG、管理员页动态渲染 |
| 文章 | 远端基线 33 篇；PR 发布闭包 34 篇；含外部 Harvest 的完整工作区 36 篇 |
| 内容模型 | PR 闭包 30 篇 v1 + 3 篇人工迁移 v2 + 1 篇原生 v2；完整工作区另有 2 篇外部 v1 |
| 分类 | 12 个实际有内容的 category；另有若干空目录 |
| 来源 | 基线 201 条 Apple 官方来源、148 条社区来源 |
| 部署 | Next standalone；阿里云 ECS 文档和 GitHub Actions 已存在 |
| 最终质量 | PR 闭包：34 篇、0 errors、112/112 tests、164 页 build；完整工作区：36 篇、0 errors、112/112 tests、167 页 build |

## 2. 已经做得好的地方

- Markdown 保持为内容真源，Git diff 可审查，也便于 Obsidian、未来 CMS 和 AI 工具复用。
- 34 篇基线文章全部具备标题、症状、可能原因、官方方案、排查流程、升级处理、相关问题和元信息，没有只有标题的空文章。
- 基线共 349 条来源；Apple 官方来源全部来自 `support.apple.com`，且绝大多数为中文页面。
- 搜索原实现已具备字段权重、别名和正文检索，不是单纯标题匹配。
- App Router 边界合理：数据读取保留在服务端，搜索/主题/反馈才是客户端组件。
- 文章页阅读宽度、摘要、跳转目录、相关内容、404 和动态 metadata 基础较好。
- 系统字体和 SVG 图标避免了额外字体、大图和明显 CLS 风险。
- TypeScript 开启 strict；未发现 `any`、`@ts-ignore` 或大面积 ESLint 关闭。

## 3. 技术架构

### 当前结构

- `src/lib/cookbook.ts`：递归读取 Markdown、解析 frontmatter、生成分类/标签/相关文章。
- `src/app/`：App Router 页面、文章 catch-all 路由、反馈 Server Actions 和管理员页。
- `src/components/`：搜索、卡片、主题和反馈交互。
- `schemas/article.schema.json`：内容契约，但审计前没有执行入口。
- `feedback/*.jsonl`、`todos/`：ECS 文件型反馈队列。
- `.github/workflows/`：ECS 部署、反馈到 GitHub Issue 的同步，以及 PR 内容质量门禁。
- `src/lib/article-schema.ts`：v1/v2 双读适配；旧页面继续读取兼容别名。
- `scripts/generate-harvest-proposal.mjs` + `validate-harvest-run.mjs`：Harvest 默认 dry-run 的安全物化器，以及 base SHA、整文件 hash、draft、canonical review 和 diff allowlist 门禁。
- `.github/rulesets/main.json` + `scripts/check-github-governance.mjs`：期望 main 策略和只读远端漂移检查；不会自动修改 GitHub 设置。
- `scripts/feedback-recovery.ts`：复用生产共享锁的反馈队列 doctor 和原子快照工具。

### 主要技术债务

1. URL 由目录和文件名决定，frontmatter 的 `slug` 并不决定路由。重命名目录会破坏稳定链接，也没有 redirect alias。
2. 读取器原先对 verification、difficulty、status 直接类型断言，无效数据能通过构建。
3. `getAllArticles()` 被分类、标签、详情和 related 多次调用；规模增长后会重复扫描文件。
4. 没有完整自动化测试、错误边界、内容校验和安全头。
5. feedback JSONL 的并发覆盖已通过共享目录锁和原子替换解决，并已有只读 doctor、SHA-256 manifest 和原子快照；但 inbox/archive 两文件仍不是崩溃原子事务，也不支持多主机写入。
6. Vercel 文件反馈现已 fail closed，不再把 `/tmp` 当持久化；公开知识库可上 Vercel，但可写反馈/管理员链路仍需 ECS 持久目录或外部数据库。

详情 slug 查询现已兼容 Next 已解码参数、编码中文/空格和字面 `%`；畸形百分号与非法 Unicode 会安全返回 404，不再因 `decodeURIComponent` 抛出 500。这修复输入鲁棒性，但没有解决第 1 项稳定 URL 架构债务。

## 4. 产品结构与导航

### 审计问题

- 首页原先先展示设备和快捷卡片，再展示搜索，不符合“搜索是主入口”的产品承诺。
- `Vision Pro` 指向空分类；“设备连接”指向不存在的 `/categories/Continuity`。
- 四张问题类型卡片的统计范围大于落地页范围，数字和结果不一致。
- 缺少独立的按系统、按症状、官方精选、社区验证、未解决、今日新增入口。
- 标签页把设备、系统、功能、英文关键词和症状混成一个字母序列表。
- 移动端原先隐藏分类、标签、反馈文字导航，没有替代分类入口。

### 本轮处理

- 搜索已移到首屏主标题下，产品承诺改成用户症状语言。
- 只展示确有文章的设备入口，修复 Continuity/category 命名错误。
- 问题类型卡片改为与目标分类/标签一一对应的计数。
- 移动端增加 44px 分类入口，搜索和主题操作也提升到 44px。

## 5. 内容结构与治理

### 统计与质量

- 基线 34/34 frontmatter 必填字段齐全，标题/slug 无精确重复，内部 Recipe 链接无断链。
- 80 个社区或补充方案中，78 个具备来源、成功概率、风险、备注和验证级别。
- 没有必须立刻合并的重复文章；SIM/eSIM/SOS、两类 Apple Pay、两类充电、两类 Home、Screen Time 系列应继续保持独立 canonical，但加强症状消歧和互链。

### 高风险问题

- 34/34 基线文章均标 `Official`，33 篇同时含社区来源；文章级 Official 容易被理解成全文都是官方结论。
- 32 篇 canonical、2 篇 seed、0 draft/reviewed；Harvest 新文直接 canonical，与 PRD 的 draft → PR → review 规则冲突。
- 34/34 均 `popular: true`，热门标记已失去精选意义。
- `difficulty: Easy` 不在 Schema 枚举内；审计前 UI 会静默显示空难度。
- 审计时的 v1 sources 只是 URL 数组；完整工作区当前剩余 32 篇 v1，PR 发布闭包内为 30 篇，仍缺 title、publisher、sourceType、accessedAt、publishedAt、official 和 claim/solution 级 sourceIds。
- 剩余 v1 内容仍缺 `lastVerifiedAt`、验证历史、系统版本范围和 canonicalArticleId；4 篇 v2 已补齐可证明的字段，但 verificationHistory 仍是后续能力。
- 正文元信息、frontmatter、related 索引和 source 日志已经出现少量漂移。

### 本轮处理

- 新增只读内容校验，覆盖必填字段、枚举、日期、slug/文件名、重复、来源域、Official 来源、必需章节、编号步骤、Experimental 风险、内部链接和热门异常。
- 运行时对无效枚举 fail-safe；第三篇人工迁移将 iPad 键盘文章的历史兼容值 `Easy` 规范为 `Quick`，没有改变页面难度语义。
- 页面统一显示“主方案：Apple 官方”，并明确社区经验单独标注；官方/社区标题使用不同视觉语义。
- frontmatter 官方与社区 URL 已在页面分组展示。
- 新增 Article Schema v2、运行时双读和只读迁移预览；Networking Wi-Fi、Mac Mail 与 iPad 屏幕键盘三篇 canonical 已逐篇人工迁移，另新增一篇从源头使用 v2 的“Mac 系统数据很大”canonical。PR 发布闭包为 30 篇 v1 + 4 篇 v2；包含两篇外部未跟踪 Harvest 内容的完整工作区为 32 篇 v1 + 4 篇 v2，没有批量改写。三篇迁移试点在 frontmatter 验收点的正文、标题、路由和原来源 URL 顺序保持不变，正文 SHA-256 等价；随后独立审查分别修正 Mac Mail 与 iPad 正文的可信表达，后者把辅助功能/外接键盘排查移出 Apple 官方章节并明确为 `Likely`。原生 v2 文章使用 10 个实际打开的 Apple 官方页面，并把“查看/删除 APFS 快照的工具能力”与“将其用于系统数据问题”的推断拆开，后者保持 `Likely`。v2 只有显式 `official: true` 且来源 ID 唯一时才进入官方来源；Official solution 不得混入社区、未知或歧义 sourceId。校验器会拒绝，运行时会把方案降为 `Unknown`；首个 recommended 缺失或不是 Official 时，校验器拒绝文章级 Official，运行时也同步降级。
- 内容校验现在按 schemaVersion 分流，并检查 v2 来源 ID、Apple 官方域、可执行步骤、发布状态和验证日期。
- Official 信任不再使用宽泛的 `*.apple.com` 判断：运行时、独立 validator 与 JSON Schema 统一只允许当前语料实际使用的 `support.apple.com`。`discussions.apple.com`、`discussionschinese.apple.com`、其他 Apple 子域、HTTP 与仿冒域都不能支撑 Official 文章或 solution；运行时防御性降级为 `Unknown`，发布校验则直接拒绝。
- 发布生命周期现在集中在 cookbook 数据层：`draft` 不进入任何公开详情、搜索、分类、标签、相关文章、静态参数或 sitemap；`seed` 可供站内发现，但卡片和详情明确提示“待进一步复核”，详情为 `noindex, follow`，sitemap 只收录 `reviewed/canonical`。

文章页当前仍以 Markdown 正文作为主要步骤展示，v2 `solutions/warnings/limitations` 主要用于校验、搜索与元数据，尚未直接驱动正文区域。Mac Mail 与 iPad 试点发现的正文/结构化可信边界漂移均已人工修正，但后续 v2 迁移仍需同时比较结构化 solution 与公开正文，直到 UI 能可靠渲染结构化方案。

## 6. 搜索体验

### 审计结果

原搜索依赖按空格分词。实测：

- `为什么看不到家人的位置`：0 结果。
- `wifi连不上`：0 结果。
- `充电80`：0 结果。

搜索索引没有独立设备、系统版本、错误提示、官方术语、社区术语和解决步骤字段。首页还把完整 Markdown body 作为客户端 props；基线首页约 521KB HTML、448KB RSC。

### 本轮处理

- 构建期从文章派生紧凑 `SearchDocument`，覆盖 title、summary、symptoms、keywords、aliases、devices、platforms、systemVersions、errorMessages、officialTerms、communityTerms、solutionSteps、category 和内容状态；另保留只来自 frontmatter 显式关键词的 `intentKeywords`，不让宽泛 tags 冒充 canonical 意图。
- 支持 NFKC、中英边界、去空格匹配、CJK 2/3/4-gram、20 组受控同义词、英文单编辑错字和错误码精确约束。
- 加入字段权重、term coverage、canonical/verification 轻量排序、命中字段、纯文本 snippet、高亮、最佳答案和无结果建议。
- 新增 19 个搜索核心测试和 21 个真实 cookbook 语料基准；其中 17 条稳定 top-1 id/route 映射，另含 80% 充电 canonical 存在/缺失、Screen Time canonical 缺失和普通 tag 仍可检索等边界。覆盖中文口语、中英混合、`battrey` 错字、系统数据、AirPods 充电盒、屏幕时间限额、Apple Pay 加卡/付款、Apple 账户密码、错误码、无关查询和 limit。
- 最终 production Browser 实测 AirPods 充电盒、Screen Time 限额、Apple Pay 付款、Wallet 加卡、Apple 账户密码中英文等查询首条结果均正确；无结果状态、404、iPad 文章桌面与 390×844 移动布局也通过，无错误覆盖层、控制台告警或横向溢出。
- 首页静态体积降至约 323KB HTML、247KB RSC，分别下降约 38% 和 45%。

需要区分“检索算法可召回”和“真实内容库已有答案”。此前 `系统数据很大` 只有合成排序测试，真实语料会误召回 iCloud 储存和系统更新文章；先加入 `system-data` 必要概念约束后，它会诚实返回无结果。第二阶段又逐页核对 Apple 对系统数据、可用/可清除空间、Time Machine 本地快照、APFS 宗卷/快照和安全模式的现行说明，新增原生 v2 canonical。现在真实语料查询稳定 top-1 命中该文章，并由读取 cookbook 的 id/route 回归测试锁定。80% 充电、AirPods 充电盒、屏幕时间限额、Apple Pay 加卡/付款和 Apple 账户密码也采用必要概念边界；只有 title、aliases 或显式 `intentKeywords` 能证明 canonical 主意图，普通 tags 和正文旁支仍可参与召回但不能越过该门槛。

### 尚未实现

- 拼音/首字母、隐私友好的最近搜索和热门搜索统计。
- 可分享的 `/search?q=&device=&platform=` 路由与筛选。
- 上千篇规模下的预构建倒排索引或服务端搜索。
- 基于脱敏真实零结果/点击数据持续扩充 query benchmark；当前已有 17 条稳定映射和 4 条 corpus 边界用例，但还没有生产查询质量闭环。

## 7. 文章页、视觉与交互

### 审计问题

- 顶部把内部 workflow status 展示给普通用户。
- “Apple 官方”语义过宽；社区方法没有强视觉区分。
- 只显示来源数量，不显示 frontmatter 来源链接。
- 缺复制、分享、官方来源快捷按钮。
- “升级处理”是内部流程语言，不够面向普通用户。

### 本轮处理

- 顶部改为可信等级 badge + 操作难度，隐藏内部 status。
- 增加可信等级说明、Apple 官方来源按钮、复制链接和原生分享。
- 分组展示官方/社区来源；“升级处理”显示为“如果仍未解决”。
- v2 来源现在显示真实标题、发布方、发布日期/查阅日期；文章摘要、适用系统和最后验证日期优先读取结构化字段，v1 继续走兼容层。
- 修复中文 heading fragment 生成，保留文章目录。
- 浏览器验证确认官方/社区样式、来源、复制状态和移动布局正常。

## 8. 性能

- 共享首屏 JS 基线约 102KB，本轮仍保持约 102KB；搜索能力增加后首页首载约 113KB。
- 完整正文不再直接下发给搜索组件，最终 HTML/RSC 约为 323KB/247KB。
- `getAllArticles()` 增加 React cache，减少同一渲染周期内重复读取。
- 没有远程图片和 Web Font，LCP/CLS 风险较低。
- 未来文章达到数百篇后，应把派生搜索文档预生成到独立静态资源或服务端 API。

## 9. Accessibility

### 已有基础

- `lang="zh-CN"`、语义化 main/nav/section、搜索 aria-label、文章标题层级基本正确。

### 本轮改善

- 增加 skip link 和主内容焦点目标。
- 搜索使用 `role="search"`、可见说明、`type="search"`、清除按钮和独立 `role=status`。
- 加全局 `focus-visible`，搜索容器增加 `focus-within`。
- 主要移动操作达到 44px；主题按钮 label 随状态变化并提供 `aria-pressed`。
- 390×844 实测无横向溢出，搜索框 50px，文章复制/分享按钮 44px。
- 文章正文、来源卡片和官方来源按钮的新窗口链接增加屏幕阅读器提示。

### 尚未完成

- 浮动反馈面板仍缺完整 dialog/focus trap/Escape/焦点返回。
- 非文章页面若以后增加新窗口外链，仍需沿用相同的屏幕阅读器提示规则。
- 标签/分类页还可补更细的 landmark 和空状态。

## 10. SEO

- 本轮新增 metadataBase、title template、Open Graph 基础信息、robots、sitemap。
- 文章、分类、标签和反馈页获得更明确 metadata；管理员和反馈页设为 noindex。
- 每篇文章新增 canonical URL 与 article Open Graph URL/modifiedTime，降低重复路径信号。
- `reviewed/canonical` 文章新增 `TechArticle` JSON-LD，使用绝对 canonical、真实日期、设备/系统主题和去重 citation；Apple Cookbook 是唯一 author/publisher，Apple 与社区来源不会被包装成本站作者。seed 不输出，draft 继续不可访问。
- `seed` 页面明确 noindex，并从 sitemap 排除；`draft` 在公开路由直接 404，避免工作稿被生成或按 URL 访问。
- `seed` 仍按既定产品策略出现在可索引的分类/标签页面和站内搜索，因此搜索引擎可能读取其标题和摘要；如果未来把 seed 定义为非公开工作内容，应从全部 public facets 一并移除，而不只是 noindex 详情。
- 新增 robots 规则禁止抓取 `/admin/`。
- 新增 `nosniff`、`DENY frame`、referrer policy 和 permissions policy 响应头。
- 后续应补 OG 图片；结构化 `HowTo` 要等 v2 solutions 成为所有公开文章的正文真源后再评估，避免 Schema 与用户可见步骤漂移。

## 11. 自动化与 Harvest 兼容性

当前仓库已有第一版确定性 Harvest 安全物化器，但还没有负责联网研究的 Daily Harvest、Weekly Intelligence 调度器或远端发布器。上游只能显式提供完整 Markdown；本地 CLI 默认 dry-run、在临时副本验证全库，只有 `--write` 才按原字节写文章并最后创建单一 manifest。PR workflow 会验证 baseCommit、整文件 base/proposed SHA-256、实际 Cookbook diff、draft 状态、Official 来源、redirect、canonical review、no-op、重复路径和 traversal/symlink。

已完成的一期保护：

- `harvest/*` 与 `automation/harvest/*` PR 强制 manifest；普通人工 PR 无 manifest 时只跳过专用检查，仍运行内容、lint、类型、测试和 build。
- 新文章必须 `status: draft`，更新必须基于 PR 当前 base SHA 和精确文件 hash；main 前进或人工改文即失败并要求重新生成。
- CLI 只接受精确 run branch，限制输入体积和文件数，拒绝未知字段、未声明工作区变更、目标/父级 symlink、旧 runId 覆盖和人工冲突；no-op 不产 manifest，完全相同输入重复执行不改文件。
- canonical 匹配不再只停留在 prose：manifest v2 保存实际查询、命中的文章 ID、create/update/redirect 决策与说明，update/redirect 还校验目标 identity。
- CI diff 边界已修复原先忽略删除/重命名的问题；Harvest PR 只能 A/M 已声明的 `cookbook/**/*.md` 并新增一个 manifest，夹带 workflow、代码、配置、source log、report、index、删除、重命名或类型变化都会失败。
- 文档明确只开 draft PR，自动化不得直写 main；远端 `Protect main` ruleset 已要求 PR、严格 `Validate pull request`，并禁止删除/force push，空 bypass。
- 期望策略已版本化到 `.github/rulesets/main.json`，只读 checker 会核对 PR、force-push/deletion、空 bypass、精确 check context、workflow 可用性和参数漂移。
- 2026-07-13 初始远端审计确认 rulesets 为空；15:40 +08:00 创建 Active `Protect main`（ID `18863035`）。PR #12 的 `Validate pull request` 在 16:01 首次成功后，16:02 将同一 ruleset 原位更新为 strict required check；API 回读无 bypass、无重复 ruleset。PR #12 经明确授权、最新检查成功后合并，workflow 进入默认分支，合并后治理 checker 继续 exit 0。

仍存在的自动化风险：

- 已有 runId、base commit 和整文件 hash；尚无 managed-fields 三方合并，一期选择更严格的整文件冲突失败。
- 同一天日志追加顺序混乱、URL 大量重复，容易并发冲突和产生无意义 diff。
- ruleset 没有 bypass，`Validate pull request` 已成为严格必需检查，workflow 也已进入默认分支；后续风险转为 job 被误改名、ruleset 参数漂移或自动化凭据被过度授权。
- 物化器验证结构和可追溯证据，但不能判断自然语言结论是否真实准确；联网采集、来源时效核验和人工内容审核仍是独立信任边界。
- 仓库刻意没有可写 Harvest Action。应先用 2–3 次人工创建的 Draft PR 证明幂等、冲突和无 diff 行为，再评估只读调度；可写发布仍需短时 GitHub App token 和独立人工批准环境。
- 索引和正文元信息人工重复维护，已经漂移。

下一阶段流程：

1. 用最新 `origin/main` 创建精确的 `harvest/<run-id>`，把输入 JSON 放在 checkout 外，先 dry-run 再显式 `--write`。
2. 以 normalized URL + canonicalArticleId + evidenceHash 为幂等键，并把症状/aliases/错误词查询和匹配决策写入 canonicalReview。
3. 只提供 evidence-backed 完整 Markdown；新文章保持 draft。发现人工修改、陈旧 base 或未声明路径立即停止，不做 force/覆盖。
4. 依次运行 schema、发布状态、来源、Official claim、Experimental 风险、内部链接、重复候选、no-op 与 diff allowlist 校验。
5. 用人的凭据提交并开 Draft PR；人工复核后再用独立变更 reviewed/canonical，永不自动 ready/approve/merge。
6. 如需来源抓取明细，未来增加不可变 `sources/runs/<timestamp>-<runId>.json` 契约，不能恢复对每日累计日志的并发追加。
7. `lastHarvestedAt`、`lastUpdatedAt`、`lastVerifiedAt` 分离；无实质变化不更新日期。

## 12. 安全与部署

### 已修复

- 生产管理员会话原先可能使用公开固定 fallback secret；现在生产必须同时配置密码和高熵 token，否则 fail closed。
- 公开 GitHub Issue 原先包含 contact；现在 contact 只留在私有 ECS JSONL，不再同步公开 Issue。
- 多行反馈增加 4,000 字符服务端和客户端上限。
- PostCSS 传递依赖 advisory 通过 pnpm override 修复，`pnpm audit --prod` 为 0。

### 仍需处理

- 单 ECS JSONL 已有 `.queue.lock`、fsync + atomic rename；GitHub 远端同步也使用同一协议，GET 不再改写队列。
- 新增不回显反馈内容的 doctor，以及锁内读取、逐文件 SHA-256 manifest、私有权限和原子发布的 snapshot 工具；又增加完全离线、只读的 manifest 校验，拒绝路径穿越、符号链接、额外/缺失文件及 bytes/hash 不一致。本地队列对账为 0 error/0 warning。生产快照仍需由运维在 ECS 数据目录实际执行、校验并转移到独立耐久存储。
- Snapshot manifest 尚未签名；攻击者若能同时替换数据和 manifest，哈希本身无法证明来源真实性。verify 也会整体读文件，暂无大小上限/流式哈希，并存在“遍历后再打开”的本地 TOCTOU 边界；应只在权限受控、静态的离线副本上运行。
- inbox 是事实源、daily-work 是可重建投影；两个文件之间仍没有崩溃事务，后续需 SQLite/外部数据库和迁移对账。
- 没有跨实例 rate limit、幂等键和持久化健康检查；Vercel 已明确拒绝文件写入而非伪成功。
- ECS 在当前 checkout 中构建并重启，不是 release 目录 + symlink 的原子部署，也没有自动 rollback。
- 已跟踪的 `feedback/inbox.jsonl` 不适合长期存放真实用户数据，应迁移为私有运行时文件并只提交 sample。

## 13. 主要风险与优先级

| 优先级 | 风险 | 状态 |
| --- | --- | --- |
| P0 | 生产管理员固定 fallback、公开 Issue 泄露 contact | 本轮已修复 |
| P0 | Harvest 自动 canonical/main、缺冲突停止或夹带代码/删除 | ruleset、strict required check、空 bypass、A/M allowlist 与本地安全物化器均已完成；联网采集和远端 Draft PR 编排仍未自动化 |
| P0 | JSONL 并发覆盖、Vercel 反馈不持久 | 单 ECS 并发、doctor/backup 已完成，Vercel fail closed；事务存储迁移待做 |
| P1 | 中文自然语言召回差、完整正文下发 | 本轮已改善 |
| P1 | 合成搜索用例有答案，但真实语料缺“Mac 系统数据很大” canonical | 10 个 Apple 来源复核、原生 v2 canonical 与真实语料基准均已完成 |
| P1 | Schema 不执行、非法枚举静默进入 UI | 本轮已改善 |
| P1 | Official 覆盖社区语义、来源不可见 | UI 与 v2 双读已改善；3 篇迁移 + 1 篇原生 v2 完成，其余需逐篇复核 |
| P1 | popular/status/taxonomy 缺治理 | draft/seed 公开边界已完成；popular 与 taxonomy 待治理 |
| P2 | SEO、焦点、移动触控、错误状态 | 本轮已改善 |
| P3 | CMS、版本历史、拼音、分析、上千篇搜索 | 未来能力 |

## 14. 优先级建议

1. 用真实但低风险的单篇提案执行 2–3 次人工 Draft PR 试运行，确认本地物化器不会直写 `main`、不会覆盖人工修改、不会夹带其他路径，且 no-op 不产生 diff；保持远端自动化只读。
2. 在 ECS 生产数据目录实际运行 doctor、加密快照和离线 `verify`，异地保存并做恢复前演练，再设计 SQLite/外部数据库双写迁移；当前文件锁是单机安全边界，不是最终事务存储。
3. 剩余 32 篇 v1 迁移继续按当前用户指示暂停；只有收到单独授权后才恢复逐篇处理，不做批量迁移。
