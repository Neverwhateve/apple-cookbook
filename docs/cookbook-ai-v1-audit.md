# Cookbook AI 排查助手 V1 审查

审查日期：2026-07-31

## 当前架构概览

- 前端与服务端：Next.js 15.1、React 19、TypeScript、Tailwind CSS；使用 App Router。页面主要为服务端组件，交互搜索为客户端组件，服务端能力通过 Route Handler 提供。
- 知识库：`cookbook/` 下的 Markdown + YAML frontmatter 是文章唯一权威来源。`gray-matter` 读取文章，`src/lib/article-schema.ts` 提供 v1/v2 兼容的规范化读取。文章正文不存入数据库。
- 搜索：`src/lib/search.ts` 是无依赖的内存混合检索器，已覆盖标题、摘要、症状、关键词、别名、设备、系统、错误文本、类目和正文提取字段，并包含可信度与更新时间排序。当前没有全文索引服务、向量数据库或语义检索。
- 可写数据：没有数据库或 ORM。ECS 单实例使用 `APPLE_COOKBOOK_DATA_DIR` 指向持久目录，文件锁与原子替换保证反馈和投票数据安全；Vercel 环境的可写能力会失败关闭。
- 后台与权限：管理员通过 cookie 会话访问 `/admin`、反馈和文章编辑；编辑会写入持久提案并由 GitHub 工作流发布，不能直接更改正式 Markdown。
- 部署：Alibaba Cloud ECS + Nginx + systemd；Next.js 使用 standalone 输出。GitHub Actions 可验证、部署及同步反馈。现有脚本会把 `cookbook/` 复制进 standalone 包。
- 测试：Node 内置测试运行 `src/lib/*.test.ts`，另有自动化脚本测试；`pnpm verify` 组合内容校验、lint、类型检查、测试与构建。

## 当前文章能力

文章已支持 `summary`、`symptoms`、`devices`/兼容字段 `device`、`category`、`keywords`、`verification`、`updated`、正文、状态和来源等字段。`risk_level` 不是现有文章元数据；V1 将按问题本身计算风险，且保持旧文章完全兼容。

## 可复用能力

- 现有混合搜索和文章 ID/路由可作为 AI 检索的唯一文章候选来源。
- 文章 schema 的 `verification`、`updated`、`summary`、`symptoms` 和 `solutions` 可安全展示真实元数据。
- 文件锁、原子写入和 ECS 数据目录可承载匿名 JSONL 事件记录。
- 现有反馈页、无结果态与可信度标签可继续作为人工接手和普通搜索降级路径。
- `output: standalone` 和现有 systemd 环境变量配置可直接承载只在服务端调用的 DeepSeek 客户端。

## 当前缺失能力

- 没有 AI 提示词、模型客户端、结构化响应校验、输入脱敏、模型限流或预算控制。
- 没有匿名搜索日志、AI 问题记录、文章级“是否解决”反馈或 API 使用统计。
- 首页搜索尚未区分关键词查询与完整问题，也没有 AI 结果层。
- 没有数据库，因此不存在可执行的 SQL migration 体系。

## 主要风险

1. 当前生产写入是单 ECS 主机的文件存储，不能横向扩展为多写入节点；V1 继续使用同一模式，并把 AI 日志视作可删除的匿名遥测，而非业务真相。
2. Markdown 文章在 standalone 部署时必须随构建复制；AI 路由只读取已部署的文章，绝不写入文章。
3. DeepSeek 是外部服务。功能必须默认关闭、设定超时/重试/每日预算，并在每个失败分支回退到本地搜索。
4. 请求文本可能含个人信息。脱敏必须发生在任何模型调用、持久化或错误日志之前；客户端提醒不能取代服务端处理。
5. 工作区已有未提交的搜索相关改动。本次实现将保留它们，只做局部、可合并的增量修改。

## 建议修改文件

- 新增 `src/ai/`：系统提示词。
- 新增 `src/lib/ai-*.ts` 和 `src/lib/deepseek-client.ts`：配置、脱敏、结构化协议、限流、日志、服务编排。
- 新增 `src/app/api/ai/*/route.ts`：分析、检索和反馈 API。
- 增量更新 `src/components/search-panel.tsx`：保留一个输入框，在其下显示 AI 辅助结果与普通结果。
- 更新 `.env.example`、ECS 部署文档、README、测试与 V1 使用文档。

## 数据库变更建议

当前无数据库、ORM 或 migration 目录，故不应伪造 SQL migration。V1 使用版本化、仅追加的 JSONL 事件结构存放于 `APPLE_COOKBOOK_DATA_DIR/ai/`：`search-logs.jsonl`、`questions.jsonl`、`feedback.jsonl`、`usage.jsonl`。每条记录不含原始输入、姓名、IP 或账号信息。若未来迁移到 SQLite/Postgres，应以正式 migration 创建 `search_logs`、`ai_questions`、`article_feedback`、`ai_usage_logs` 四张表，并从 JSONL 脱敏记录导入。

## 实施顺序

1. 新增配置、脱敏、结构化校验和模型客户端。
2. 用现有搜索生成真实文章候选，完成分析/检索/反馈 API 与匿名记录。
3. 以单一首页输入框接入 AI 辅助和明确的本地搜索降级。
4. 补充测试、环境变量、运行/部署/回滚文档并运行验证。

## 回滚方式

立即设置 `AI_ASSISTANT_ENABLED=false` 即可停止所有模型请求，同时普通搜索继续可用。需要移除代码时可回退本次应用版本；`APPLE_COOKBOOK_DATA_DIR/ai/` 中的匿名 JSONL 与发布包分离，不会被应用回滚覆盖。如需删除遥测数据，先备份后仅删除该 `ai/` 子目录，绝不触碰文章或现有反馈目录。
