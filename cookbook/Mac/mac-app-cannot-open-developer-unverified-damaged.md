---
schemaVersion: 2
id: mac-app-cannot-open-developer-unverified-damaged
title: Mac App 无法打开、开发者无法验证或提示已损坏
slug: mac-app-cannot-open-developer-unverified-damaged
summary: Mac 打开 App 时提示“无法验证开发者”“Apple 无法检查是否包含恶意软件”“App 不是来自 Mac App Store”或“App 已损坏”时，先确认来源、更新和错误类型，再决定是否使用“仍要打开”；不要为了绕过安全警告运行来历不明的软件。
symptoms:
  - Mac App 点开没有反应或无法打开
  - Mac 提示“无法验证开发者”
  - Mac 提示“Apple 无法检查某个 App 是否包含恶意软件”
  - Mac 提示“App 不是来自 Mac App Store”
  - Mac 提示“App 已损坏”或“将损坏你的电脑”
  - App 更新 macOS 后无法打开
  - “仍要打开”按钮找不到
devices:
  - Mac
platforms:
  - macOS
systemVersions:
  - macOS Catalina 10.15 或更高版本（Apple 对从互联网下载的软件要求公证）
  - macOS Ventura 13 或更高版本（本文采用“系统设置”路径；旧版可能显示为“系统偏好设置”）
categories:
  - Mac
tags:
  - Mac
  - App
  - 安全性
  - 门禁
  - 开发者
keywords:
  - Mac App 打不开
  - Mac 应用无法打开
  - 开发者无法验证
  - App 已损坏
  - Apple 无法检查恶意软件
  - 仍要打开
aliases:
  - Mac app won't open
  - Mac app cannot be opened
  - unidentified developer Mac app
  - app is damaged Mac
  - Apple cannot check app for malicious software
errorMessages:
  - 无法验证开发者
  - Apple 无法检查“某个 App”是否包含恶意软件
  - App 不是来自 Mac App Store
  - App 已损坏
  - 将损坏你的电脑
officialTerms:
  - 门禁
  - 公证
  - 隐私与安全性
  - 仍要打开
  - App Store 和被认可的开发者
communityTerms:
  - Mac 应用打不开
  - Mac 软件被拦截
  - Mac 安全性阻止 App
difficulty: Moderate
estimatedTime: 5-15 分钟；重新下载或联系开发者可能需要更久
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: identify-warning-and-source
    title: 先确认提示类型、下载来源和 App 是否为最新版
    summary: Apple 将 App Store、被认可的开发者、未知开发者、未公证、已修改或疑似恶意软件区分处理；不同提示不能用同一个“绕过”步骤代替。
    kind: recommended
    steps:
      - 记录警告的完整文字，不要只根据“打不开”判断为系统故障。
      - 如果 App 来自 App Store，打开 App Store 检查更新；如果来自开发者网站，前往开发者官方页面获取兼容当前 macOS 的新版本。
      - 确认下载的 App 来自你信任的开发者和原始网站；不要运行通过破解、网盘或陌生弹窗获得的副本。
      - 如果刚升级 macOS 后才失败，先确认 App 是否需要更新或重新安装。Apple 说明，部分 App 在新版本 macOS 上需要更新或重新安装。
    verificationLevel: Official
    sourceIds:
      - apple-safe-open-apps
      - apple-cannot-open-app
    warnings:
      - “无法验证开发者”和“App 已损坏/将损坏你的电脑”不是同一个风险等级；不要看到任意提示都直接覆盖安全设置。
    limitations:
      - 第三方 App 的兼容性、账号、许可证和服务器问题需要由 App 开发者确认。
  - id: use-privacy-security-open
    title: 只有在来源可信且未被篡改时使用“仍要打开”
    summary: 对于来自可信来源但尚未被 macOS 认可或公证的 App，Apple 提供一次性的安全性设置例外；这不会证明 App 安全，也不适用于疑似恶意软件或已被修改的 App。
    kind: alternative
    steps:
      - 先尝试正常打开一次该 App，然后打开“系统设置 > 隐私与安全性”。
      - 向下滚动到“安全性”，在你刚才尝试打开 App 后的一小时内查看是否出现“仍要打开”，再确认 App 名称和来源。
      - 只有在你确认 App 来自可信开发者、文件未被篡改且确实需要继续时，点按“仍要打开”，按提示输入 Mac 登录密码，并在再次出现警告时点按“打开”。
      - 以后若不再需要这个 App，删除它及其安装包；不要把“仍要打开”当成通用修复方案。
    verificationLevel: Official
    sourceIds:
      - apple-override-security
      - apple-open-unknown-developer
    warnings:
      - Apple 明确警告，覆盖安全性设置是 Mac 遭恶意软件入侵的常见方式；不确定来源时选择“移到废纸篓”或“完成”。
    limitations:
      - 受公司、学校或其他组织管理的 Mac 可能没有这个按钮，普通用户不应尝试绕过管理策略。
  - id: stop-and-redownload-damaged-app
    title: 出现“已损坏”或“将损坏你的电脑”时停止运行并重新获取
    summary: “App 已损坏”可能表示签名不匹配、文件损坏或被篡改；“将损坏你的电脑”还可能表示 macOS 检测到恶意内容或证书被撤销，不应通过“仍要打开”强行运行。
    kind: escalation
    steps:
      - 如果提示 App 已损坏、已被修改或将损坏你的电脑，先不要在“终端”执行命令，也不要关闭安全检查。
      - 将 App 移到废纸篓；从 App Store 或开发者的官方页面重新下载与 Mac 和当前 macOS 兼容的版本。
      - 如果重新下载后仍出现同一提示，联系 App 开发者确认签名、公证和当前版本，不要改用不明镜像。
      - 如果 macOS 将 App 移到废纸篓或怀疑存在恶意软件，保留警告截图、App 来源和下载时间，必要时联系 Apple 支持。
    verificationLevel: Official
    sourceIds:
      - apple-app-modified-damaged
      - apple-safe-open-apps
    warnings:
      - 不要把 Gatekeeper、终端命令或关闭 SIP 等非官方绕过方式写成修复步骤；它们会扩大安全风险。
    limitations:
      - 文章不能远程判断某个第三方 App 是否包含恶意软件，也不能替代开发者的签名和发布记录。
warnings:
  - 不要为了打开 App 关闭 macOS 安全性功能、执行网上复制的终端命令或安装所谓“修复工具”。
  - 只从 App Store 或开发者官方页面重新获取软件；对来源、文件完整性或开发者身份有疑问时停止操作。
  - “仍要打开”只适用于来源可信且你明确承担风险的场景，不等于 Apple 已审核或保证 App 安全。
limitations:
  - 本文覆盖 macOS 对第三方 App 的来源、签名、公证和安全性提示；不覆盖 App 内崩溃、账号登录、许可证、网络服务或企业软件自身故障。
  - macOS 版本不同，“系统设置”可能显示为“系统偏好设置”，按钮名称和位置也可能变化。
  - 受组织管理的 Mac 可能由管理员强制执行 App 来源策略，普通用户应联系管理员。
sources:
  - id: apple-safe-open-apps
    title: 在 Mac 上安全地打开 App
    url: https://support.apple.com/zh-cn/102445
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
  - id: apple-cannot-open-app
    title: 如果在 Mac 上无法打开 App
    url: https://support.apple.com/zh-cn/guide/mac-help-cn/mchlp1519/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
  - id: apple-override-security
    title: 通过覆盖安全性设置来打开 App
    url: https://support.apple.com/zh-cn/guide/mac-help-cn/mh40617/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
  - id: apple-open-unknown-developer
    title: 打开来自未知开发者的 Mac App
    url: https://support.apple.com/zh-cn/guide/mac-help/mh40616/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
  - id: apple-app-modified-damaged
    title: App 已被修改或者已损坏
    url: https://support.apple.com/zh-cn/guide/mac-help/mh40619/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-19
lastUpdatedAt: 2026-07-19
createdAt: 2026-07-19
relatedArticles:
  - mac-forgot-login-password-reset
  - mac-dfu-firmware-revive-restore
popular: false
---

# Mac App 无法打开、开发者无法验证或提示已损坏

## 症状

- Mac 上某个 App 点开后没有反应，或 macOS 直接阻止打开。
- 提示“无法验证开发者”“Apple 无法检查 App 是否包含恶意软件”或“App 不是来自 Mac App Store”。
- 提示“App 已损坏”“App 已被修改”或“将损坏你的电脑”。
- 升级 macOS 后，原来能打开的 App 变成无法打开。

## 可能原因

1. App 来自 App Store 之外，开发者签名或公证状态不符合 macOS 的安全性检查。
2. App 下载不完整、已被修改或签名与原始文件不匹配。
3. App 与当前 macOS 版本不兼容，或升级 macOS 后需要重新安装。
4. Mac 由公司、学校或其他组织管理，管理员限制了 App 来源。

## 先判断是哪一类问题

macOS 的安全性提示不只是普通的启动失败。Apple 的“门禁”会检查 App 的来源、开发者签名、公证状态以及是否被修改。未知开发者、未公证、签名不匹配和疑似恶意软件应分开处理。

1. **App Store 或官方开发者 App**：先在 App Store 或开发者官方页面检查更新。升级 macOS 后，部分 App 可能需要更新或重新安装。
2. **“无法验证开发者”或“Apple 无法检查是否包含恶意软件”**：先确认 App 来自你信任的开发者，且下载地址和文件没有被篡改。
3. **“App 不是来自 Mac App Store”**：检查“系统设置 > 隐私与安全性”中的 App 来源设置；不要为了一个陌生 App 放宽限制。
4. **“App 已损坏”“已被修改”或“将损坏你的电脑”**：停止运行，不要用“仍要打开”或网上命令强行绕过，按重新下载和联系开发者的路径处理。

## Apple 官方方案

1. 记录完整警告文字和 App 名称，不要只记录“打不开”。
2. 如果 App 来自 App Store，打开 App Store 检查更新；如果来自其他来源，从开发者官方页面重新获取兼容当前 macOS 的版本。
3. 确认 Mac 的日期、系统版本和 App 版本没有明显异常；如果问题从 macOS 更新后开始，先向 App 开发者确认兼容性。
4. 如果提示来自未知开发者或未公证 App，先正常尝试打开一次，再进入“系统设置 > 隐私与安全性”查看是否出现“仍要打开”。该按钮通常只在尝试打开后的约一小时内提供。
5. 只有在 App 来源可信、文件未被篡改并且你明确要承担风险时，才点按“仍要打开”，输入 Mac 登录密码，并在再次出现确认提示时点按“打开”。
6. 如果是“App 不是来自 Mac App Store”，在“隐私与安全性”的“安全性”区域确认“允许从以下位置下载的 App”设置是否适合你的使用场景；受管理的 Mac 可能无法修改。
7. 如果是“App 已损坏”“已被修改”或“将损坏你的电脑”，把 App 移到废纸篓，从 App Store 或开发者官方页面重新下载。重新下载后仍失败时，联系开发者确认签名、公证和版本发布状态。

## 零售排查流程

1. 先让用户复述完整警告，并记录 App 名称、版本、来源、Mac 型号和 macOS 版本。
2. 先区分 App Store、开发者官网、企业管理软件和不明来源；来源不明时停止安装或运行。
3. 只有在来源可信且用户明确接受风险时，才说明“仍要打开”的一次性路径；不要把它作为默认解决方案。
4. 如果提示“已损坏”或“将损坏你的电脑”，优先移除并从官方来源重新下载，不要执行网上的绕过命令。
5. 交叉确认同一来源的新版本能否打开；若仍失败，记录证据并转 App 开发者、组织管理员或 Apple 支持。

## 升级处理

如果 App 在升级 macOS 后才无法打开，先更新 App 和 macOS 到当前可用版本，并确认开发者声明的兼容性。不要为了保留旧版 App 而关闭安全检查；如果 App 已停止维护或没有兼容版本，应联系开发者或寻找可信替代品。

## 相关问题

- 如果 App 能打开但立刻闪退、卡住或无响应，转到针对 App 崩溃和无法打开的排查路径。
- 如果 Mac 本身无法开机、黑屏或停在启动过程，转到 Mac 无法开机文章，不要把它当成单个 App 的门禁问题。
- 如果只有公司或学校 App 被阻止，先联系组织管理员确认配置策略。

## 这些做法不要尝试

- 不要关闭 macOS 安全性功能或执行网上复制的终端命令来绕过警告。
- 不要从破解站、陌生网盘、弹窗或不明镜像重新下载 App。
- 不要把“仍要打开”理解为 Apple 已经检查过该 App；它只是一次安全性设置例外。
- 不要在不清楚来源时输入 Mac 登录密码，或把 Apple 账户密码提供给所谓“激活/修复”工具。

## 仍然无法打开时

向 App 开发者或 Apple 支持提供：App 名称和版本、macOS 版本、Mac 型号、完整警告截图、App 获取地址、是否刚升级 macOS，以及从官方来源重新下载后的结果。若 Mac 由公司、学校或其他组织管理，先联系管理员确认 App 来源策略；不要自行绕过管理配置。

## 参考来源

- [Apple 支持：在 Mac 上安全地打开 App](https://support.apple.com/zh-cn/102445)
- [Mac 使用手册：如果在 Mac 上无法打开 App](https://support.apple.com/zh-cn/guide/mac-help-cn/mchlp1519/mac)
- [Mac 使用手册：通过覆盖安全性设置来打开 App](https://support.apple.com/zh-cn/guide/mac-help-cn/mh40617/mac)
- [Mac 使用手册：打开来自未知开发者的 Mac App](https://support.apple.com/zh-cn/guide/mac-help/mh40616/mac)
- [Mac 使用手册：App 已被修改或者已损坏](https://support.apple.com/zh-cn/guide/mac-help/mh40619/mac)
