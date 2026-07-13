# Apple Cookbook 优化路线图

路线图原则：不换技术栈、不批量重写内容、不一次迁移所有 frontmatter。所有阶段都要求可回退、可验证，并保护人工修改。

## P0：正确性、数据安全与发布门禁

| 项目 | 目标 | 涉及文件/系统 | 风险 | 验证方式 | 状态 |
| --- | --- | --- | --- | --- | --- |
| 管理员认证 | 生产缺密码或高熵 token 时 fail closed | `src/lib/feedback-admin.ts`、部署 secrets | 运维未补 token 会无法登录；这是预期安全变化 | 生产/开发配置矩阵测试、登录页验证 | 已完成 |
| 公开反馈脱敏 | contact 不进入公开 Issue | `sync-feedback-intake.yml` | Issue 少了联系方式，管理员需在私有队列查看 | workflow YAML、搜索 workflow 中 contact | 已完成 |
| 内容校验 | v1/v2 枚举、来源、日期、slug、方案引用、章节和链接错误阻断 CI | validator、测试、package、workflows | 历史内容可能暴露 warning/error | `pnpm validate:content`、v2 validator/Schema 负向测试 | 已完成 v1/v2 分流与 Official host 精确 allowlist |
| Harvest 发布门禁 | 自动新文只能 draft PR，人工批准才 canonical | Harvest manifest、PR checks、Schema、ruleset policy/checker、流程文档 | 会降低自动发布速度，但保护正确性 | create/update/redirect/hash/path/no-op + GitHub drift tests | ruleset、strict required check 与 workflow 均已进入生效状态，checker exit 0 |
| 并发与持久化 | 消除 JSONL 覆盖；可对账、可做一致快照；明确 ECS/Vercel 数据架构 | `file-store.ts`、feedback libs、recovery CLI、GitHub sync、部署文档 | 文件锁只适用单一共享目录，数据库迁移仍需备份/双写 | 并发/stale lock/GET 纯读/Vercel fail closed + 14 个恢复测试 | 单 ECS 加固、snapshot 与离线 verify 已完成；生产演练/事务存储待做 |

### P0 推荐执行顺序

1. `Protect main` 已启用 PR、严格 `Validate pull request`、删除/force-push 防护与空 bypass；PR #12 的完整依赖闭包已通过检查并发布到 `main`，现有 ruleset 已原位更新，合并后治理审计继续为 exit 0。
2. 让真实 Harvest 生成器采用 `harvest/<run-id>`、单一 manifest 和 draft PR；不得再直写 main/canonical。
3. 在 ECS 对现有反馈运行 doctor，生成加密的原子快照，以离线 `verify` 核对 manifest，并确认异地保存和保留期。
4. 选择 ECS SQLite 或外部数据库；先双写、对账，再切读。
5. managed-fields 三方合并只在整文件 hash 门禁运行稳定后设计；当前任何人工改动都会更严格地停止提案。

## P1：核心搜索、内容模型与可信表达

| 项目 | 目标 | 涉及文件/系统 | 风险 | 验证方式 | 状态 |
| --- | --- | --- | --- | --- | --- |
| 搜索核心 | 支持中文整句、中英混合、错字、错误码和字段权重 | `src/lib/search.ts`、`cookbook.ts`、`search-panel.tsx` | 同义词过宽可能降低 precision | 固定 query set、人工 top-3 评审、19 个核心测试 | 已完成第一版、必要概念边界与 intent/tag 隔离 |
| 真实语料覆盖 | 让关键症状查询在实际 cookbook 中确有可审核答案 | query benchmark、canonical 内容、来源审阅 | 为补命中仓促生成低可信内容 | 区分 synthetic ranking test 与 corpus coverage；21 个真实语料断言；人工核对来源 | 17 个稳定 top-1 映射与 4 个 canonical/tag 边界用例已完成 |
| 搜索入口 | 首屏搜索、命中原因、高亮、无结果建议 | 首页、SearchPanel | 首页交互 JS 略增 | 桌面/手机浏览器验证 | 已完成 |
| 发布可见性 | draft 不公开；seed 明确警示；reviewed/canonical 进入精选 | 内容读取、搜索、分类、preview | seed 仍可站内发现，必须维持明确提示 | lifecycle fixture、route/build/sitemap/noindex 断言 | 已完成集中边界 |
| 内容模型 v2 | solution/claim 级 verification、sourceIds、warnings、versions | Schema、类型、迁移 adapter、validator、预览脚本 | 批量迁移会产生大 diff | runtime adapter、validator/Schema 测试、正文/路由/source URL 等价性 | 双读已完成；3 篇迁移 + 1 篇原生 v2 通过 |
| 稳定 URL | `id/slug` 成为 canonical 主键，旧路径重定向 | cookbook loader、Next redirects | 错误映射会造成 SEO/收藏失效 | 路由映射快照、301 检查、断链检查 | 未开始 |
| 路由输入安全 | 编码/已解码中文、空格、`%` 正常解析；畸形编码安全 404 | cookbook loader、fixture | 多候选歧义需保持确定顺序 | 正常/混合/恶意 slug 单测 | 已完成 |
| Taxonomy | categoryId + displayLabel；设备/系统/症状/功能 facet 分离 | Schema、tags/categories 页、首页配置 | 标签重命名可能破坏 URL | alias/redirect、计数一致性测试 | 未开始 |
| 反馈防滥用 | 限长、蜜罐、幂等和服务端限流 | 表单、Nginx/平台、存储 | 误拦截真实反馈 | 边界输入、限流和恢复测试 | 已完成限长；其余待做 |

### 内容模型 v2 非破坏迁移

1. 已新增 `schemaVersion`、稳定 `id` 和旧字段双读；旧路由/UI 不变。
2. 已支持 `summary`、`symptoms`、设备/平台/系统、关键词、官方/社区术语进入搜索索引。
3. 已支持结构化 `sources[]`，且只有显式 `official: true` 才建立官方信任。
4. 已支持 `solutions[]` 的 verificationLevel、sourceIds、warnings、limitations，并由 validator 检查引用；社区、未知和歧义 source ID 会 fail closed。v2 首个 recommended 缺失或不是 Official 时，validator 拒绝文章级 Official，运行时也同步降级。
5. 已支持 created/updated/verified、canonicalArticleId 和 relatedArticles；verificationHistory/redirectAliases 仍待后续版本。
6. 初次只读预览确认 35 篇全为 v1、364 项需人工判断；完成两个迁移试点后为 33 篇 v1 + 2 篇 v2、剩余 345 项人工判断。新增原生 v2 canonical 后为 36 篇（33 v1 + 3 v2）；第三篇 iPad 键盘等价迁移后，包含外部 Harvest 的完整工作区为 32 篇 v1 + 4 篇 v2、剩余 337 项人工判断。精确排除外部文件的 PR 发布闭包为 30 篇 v1 + 4 篇 v2。不得把无法证明的日期或来源标题自动填入。
7. Wi-Fi canonical 试点已通过：正文 SHA-256、标题、路由及原 10 个 source URL 不变，7 个 Apple 来源实际核对，3 个社区来源显式非官方。
8. Mac Mail canonical 的 frontmatter 等价迁移已通过：迁移验收点正文、标题、路由及原 9 个 source URL 顺序不变；5 个 Apple 来源与 4 个社区来源逐一拆分，社区支持的分支保持 `Likely`。随后独立内容修正把 Exchange/IMAP 个案从“Apple 官方”降为“较可能”，把官方重建步骤收窄到搜索异常，并移除一个过度绝对的硬件判断；这些可信度纠错与迁移等价性分开记录。后续继续一次一篇。
9. “系统数据很大”先通过必要概念约束阻止错误替代，再基于 10 个实际核对的 Apple 官方页面新增原生 v2 canonical；真实语料 benchmark 现锁定稳定 id/route。APFS 快照删除的使用场景保持 `Likely`，没有借官方工具能力扩大成通用官方修复。
10. iPad 屏幕键盘 canonical 的 frontmatter 等价迁移已通过：迁移验收点正文 SHA-256、标题、路由和原 6 个 source URL 顺序不变；4 个 Apple 来源与 2 个社区来源逐一核对。随后独立内容修正把辅助功能和外接键盘排查移出官方正文节并明确为 `Likely`，同时从该 solution 移除不匹配的社区 sourceId；当前正文 hash 单独记录，不伪装成等价迁移。

## P2：体验、SEO、Accessibility 与运维成熟度

| 项目 | 目标 | 涉及文件/系统 | 风险 | 验证方式 | 状态 |
| --- | --- | --- | --- | --- | --- |
| 文章操作 | 官方来源、复制、分享、来源分组 | article page、actions、badge | 来源在正文和详情可能重复 | 浏览器与屏幕阅读器检查 | 已完成 |
| 结构化正文渲染 | 让 v2 solutions/warnings/limitations 成为公开步骤真源 | article page、Schema、Markdown 兼容层 | 与旧正文双重展示或漂移 | 两种 schema 页面快照、正文/solution 对照 | 未开始 |
| 基础 a11y | skip link、focus-visible、44px、搜索状态 | layout、CSS、SearchPanel、ThemeToggle | 全局 focus 样式可能影响视觉 | 键盘遍历、390px 视口、axe 后续 | 已完成第一版 |
| 反馈 dialog | Escape、初始焦点、焦点返回、safe area | 两个 feedback widget | 焦点管理改动需全面测试 | 键盘/VoiceOver/手机 | 未开始 |
| SEO | metadata、robots、sitemap、canonical、OG、结构化数据 | `src/app` metadata files | canonical 配错会影响收录 | 生成 HTML、robots/sitemap 检查 | 基础、article canonical、seed noindex/draft 隔离已完成；JSON-LD 待做 |
| 错误与健康 | error boundary、可重试反馈、storage readiness | `error.tsx`、actions、health route | 过度吞错会隐藏数据问题 | 故障注入、日志检查 | error boundary/反馈错误已完成；health route 待做 |
| 原子部署 | release 目录、symlink、rollback、深度健康检查 | deploy script、systemd、workflow | 部署脚本改造需服务器演练 | staging 部署、回滚演练 | 未开始 |
| 热门/最近 | 真实精选、匿名统计、今日新增 | metadata/analytics/home | 搜索词可能含敏感信息 | 匿名化、保留期、事件测试 | 未开始 |

## P3：未来能力

| 项目 | 目标 | 前置条件 | 验证方式 |
| --- | --- | --- | --- |
| 拼音和多语言检索 | 拼音/首字母、更多英文别名、可控纠错 | 真实零结果日志且已脱敏 | 离线 query benchmark |
| 可分享搜索页 | `/search?q=&device=&platform=&verification=` | taxonomy 稳定 | URL 往返、SSR/CSR 一致性 |
| 千篇级索引 | 预构建倒排索引或服务端搜索 | 文章数/体积达到阈值 | Lighthouse、输入延迟、top-k 质量 |
| CMS/数据库 | 结构化元数据和审核流；正文继续 Markdown | v2 Schema 和迁移 adapter | 双向同步、审计日志、回滚 |
| Weekly Intelligence | 重复候选、过期文章、版本变化、质量报告 | Harvest 幂等和验证历史 | 固定数据集回放、no-op 稳定性 |

## 每阶段验收标准

- 不覆盖未提交人工修改。
- schema/content/link/source 校验通过。
- lint、typecheck、tests、build 通过。
- 搜索固定查询集 top-1/top-3 满足预期。
- 首页、搜索、文章、分类、404、空状态在桌面和手机验证。
- 生产写入变更必须有备份、回滚和并发测试。
- 无实质变化时 Harvest 不产生 diff。

## 下一阶段最推荐三项

1. P0：让真实 Harvest 生成器正式接入已经生效的 manifest/draft PR 门禁，并用一次无破坏的试运行验证完整链路。
2. P0：在 ECS 实际执行 doctor、加密快照和离线 verify，再做异地保存/恢复前演练，并设计 SQLite/外部数据库双写迁移，同时处理仍被跟踪的 inbox 隐私边界。
3. P1：剩余 32 篇 v1 迁移继续按用户指示暂停；只有收到单独授权后才逐篇恢复，不批量转换。
