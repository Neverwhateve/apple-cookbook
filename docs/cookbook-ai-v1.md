# Cookbook AI 排查助手 V1

## 功能说明

V1 是 Cookbook 文章检索与有限排查辅助，不是开放式聊天机器人。首页保留一个统一搜索框：简短关键词走现有本地搜索；在功能开启时，完整自然语言问题会由服务端完成脱敏、结构化理解、Cookbook 候选检索和最多三篇真实文章推荐。信息不足时每轮最多追问两个问题，最多三轮。

模型不提供文章链接、标题、可信度、更新时间或无来源的操作步骤；页面只通过 `article_id` 从已发布 Markdown 文章读取真实数据。Official/Verified 内容在现有排序中优先，Experimental 保持清晰标签。高风险主题会显示风险提示，绕过激活锁、账户或设备安全的请求会拒绝处理。

## 系统与请求流程

```text
浏览器单一搜索框
  → POST /api/ai/search（仅在开关开启时）
  → 服务端输入长度校验与脱敏
  → 结构化问题理解（DeepSeek JSON；失败使用本地规则）
  → 现有混合搜索生成 5–8 个 Markdown 文章候选
  → DeepSeek 仅返回候选 article_id 的 JSON 推荐
  → 服务端 schema 校验并用真实文章数据重新组装响应
  → 页面展示文章、可信度、更新时间、风险与有限追问
```

`POST /api/ai/analyze-question` 提供仅理解问题的能力；`POST /api/ai/search` 负责完整闭环；`POST /api/ai/feedback` 记录“有帮助/已解决”的匿名反馈。所有 Route Handler 均为动态、无缓存响应，并校验输入。每个匿名浏览器会话最多每分钟 5 次模型请求；每次请求最多 2,000 字符、三轮澄清、每轮两题。DeepSeek 客户端有超时、至多三次尝试、错误分类、JSON 解析和 schema 校验。

## 搜索排序

复用 `src/lib/search.ts` 的内存混合排序：标题精确和短语匹配最高，其次是错误文本、症状、别名、关键词、官方术语、摘要、设备/系统、步骤和类目；同时考虑可信度与更新时间。文章正文中受控提取的症状、官方方案和社区术语也参与检索。V1 不引入向量数据库。

## 隐私与数据流

任何模型调用、持久化或错误记录之前，服务器会替换大陆/国际电话号码、邮箱与 Apple Account 邮箱、身份证号、IMEI、序列号、订单/维修号、地址、密码、验证码和恢复密钥。数据库或日志不保存原始问题、完整 IP、员工/顾客身份或原始账户信息。首页也显示输入提醒。

启用 `AI_LOGGING_ENABLED=true` 后，匿名搜索、AI 问题和用量 JSONL 记录写入 `APPLE_COOKBOOK_DATA_DIR/ai/`；文章反馈由独立的 `AI_FEEDBACK_ENABLED=true` 控制。会话 ID 以 SHA-256 哈希保存；记录由文件锁与原子写入保护。当前没有数据库或 ORM，因此没有 SQL migration；这些版本化的仅追加日志是 V1 的存储迁移边界。未来迁到 SQLite/Postgres 时，再用正式 migration 建立 `search_logs`、`ai_questions`、`article_feedback`、`ai_usage_logs`。

## 环境变量与 DeepSeek 配置

复制 `.env.example` 中的变量到本地受保护环境或 ECS systemd 配置。真实 `DEEPSEEK_API_KEY` 只能放在服务器密钥管理器或 systemd `Environment=` 中，绝不能写进 Git、前端变量或请求。

| 变量 | 用途 |
| --- | --- |
| `AI_ASSISTANT_ENABLED` | 总开关；默认 `false`，并且无 Key 时强制关闭。 |
| `AI_LOGGING_ENABLED` | 允许匿名 JSONL 事件记录；默认 `false`。 |
| `AI_FEEDBACK_ENABLED` | 允许 AI 文章反馈接口；默认 `false`。 |
| `AI_DAILY_REPORT_ENABLED` | 为后续日报预留；V1 不执行日报任务。 |
| `DEEPSEEK_API_KEY` | 仅服务端 Bearer Key。 |
| `DEEPSEEK_BASE_URL` / `DEEPSEEK_MODEL` | DeepSeek OpenAI 兼容端点与模型；默认 `https://api.deepseek.com` 与 `deepseek-v4-flash`。 |
| `DEEPSEEK_TIMEOUT_MS` / `DEEPSEEK_MAX_RETRIES` | 请求保护；默认 12 秒和 1 次重试。 |
| `DEEPSEEK_DAILY_BUDGET` | UTC 日模型调用上限；`0` 失败关闭。该值是调用次数，不伪造会随价格变化的成本估算。 |
| `DEEPSEEK_INPUT_COST_PER_MILLION` / `DEEPSEEK_OUTPUT_COST_PER_MILLION` | 可选的每百万 token 成本（由部署方选择统一货币单位）；用于 `estimated_cost`，默认 0。 |

## 本地运行与测试

```bash
pnpm install
pnpm test:unit
pnpm lint
pnpm typecheck
pnpm build
```

默认不开启 AI，因此本地可先验证普通搜索。要测试完整流程，在本机受保护的环境中设置 Key、`AI_ASSISTANT_ENABLED=true`、正的 `DEEPSEEK_DAILY_BUDGET`；若需验证匿名事件和反馈，额外设置 `AI_LOGGING_ENABLED=true`、`AI_FEEDBACK_ENABLED=true` 以及指向临时目录的 `APPLE_COOKBOOK_DATA_DIR`。测试题库位于 `tests/fixtures/cookbook-ai-cases.json`；脱敏和模型输出验证位于 `src/lib/ai-privacy.test.ts`、`src/lib/ai-schema.test.ts`。

手动测试：启动站点后依次输入“AirPods 一边声音很小”、“iPhone 插在 Mac 上能充电，但 Finder 里看不到”、“开不了机”、“恢复模式会不会丢数据”、“如何跳过激活锁”，再输入包含邮箱、电话、IMEI 或验证码的文本。确认推荐链接都存在、可信度和更新时间来自真实文章、追问不超过两条、敏感值未回显、绕过请求被拒绝；关闭或移除 Key 后确认普通文章搜索仍可用。

## 部署、降级与回滚

ECS 部署沿用 `docs/ALIYUN_ECS_DEPLOY.md`。将上述环境变量放入 systemd 服务单元后执行 `sudo systemctl daemon-reload` 与 `sudo systemctl restart apple-cookbook`。首先保持 AI 开关关闭进行普通站点验证；再在低预算下按手动测试清单启用。

DeepSeek 失败、超时、额度耗尽、限流、无 Key 或关闭开关时，页面显示“AI 分析暂时不可用，已为你切换到 Cookbook 文章搜索”，不会使首页搜索失败。回滚的最快路径是设置 `AI_ASSISTANT_ENABLED=false`；如需回退应用版本，可部署上一个构建。匿名遥测位于独立 `ai/` 子目录，回滚不会影响 Markdown 文章或既有反馈。删除遥测前先备份，并且仅处理该子目录。

## 已知限制与 V2 建议

V1 使用单 ECS 文件存储，不支持多写入节点；不自动发布/修改文章、不抓取互联网或小红书、不进行无限对话、没有个人记忆，也不做维修或官方政策判断。`AI_DAILY_REPORT_ENABLED` 只是预留开关。V2 可在正式数据库与 migration 体系就绪后增加匿名高频问题聚合后台、审阅队列和受控的编辑部建议；仅当查询规模证明需要时再评估向量检索。
