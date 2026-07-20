---
schemaVersion: 2
id: iphone-ipad-mail-cant-send-receive-email
title: iPhone 或 iPad 邮件无法发送、接收或卡在发件箱
slug: iphone-ipad-mail-cant-send-receive-email
summary: iPhone 或 iPad 的“邮件”App 无法发送或接收邮件、邮件卡在发件箱、反复要求密码或 iCloud 邮件无法使用时，先区分网络、服务中断、账户授权和本地设置，再安全地重新添加账户。
symptoms:
  - 邮件卡在发件箱或提示尚未发送
  - iPhone 或 iPad 的“邮件”收不到新邮件
  - “邮件”反复要求输入密码或提示用户名密码错误
  - 只有某个邮箱账户无法发送或接收
  - iCloud 邮件无法访问或无法使用 @icloud.com 地址收发邮件
  - 删除并重新添加邮箱账户后，之前下载的邮件不见了
devices: [iPhone, iPad]
platforms: [iOS, iPadOS]
systemVersions:
  - 当前支持的 iOS 或 iPadOS；设置名称可能随版本略有变化
categories: [iPhone]
tags: [iPhone, iPad, 邮件, iCloud, 账户]
keywords: [iPhone 邮件无法发送, iPad 邮件收不到, 邮件卡在发件箱, 邮箱密码错误, iCloud 邮件无法使用]
aliases: [Mail not sending on iPhone, iPhone Mail not receiving, iPad email stuck in outbox, iPhone Mail password incorrect, iCloud Mail not working]
errorMessages: [邮件未发送, 用户名或密码错误, 无法连接邮件服务器, 发件箱]
officialTerms: [邮件, 发件箱, 邮件账户, iCloud 邮件, Apple 账户]
communityTerms: [苹果手机邮箱发不出去, iPhone 邮箱收不到邮件, 邮箱一直转圈, 邮件密码反复提示]
difficulty: Moderate
estimatedTime: 5–20 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: separate-network-service-and-direction
    title: 先区分网络、服务状态和收发方向
    summary: 先确认设备能上网、邮件服务商没有中断，并区分只有发送失败、只有接收失败，还是整个账户都无法访问。
    kind: recommended
    steps:
      - 用 Safari 打开一个可靠网页，确认 iPhone 或 iPad 已连接互联网；网页能打开不代表邮件服务商一定正常。
      - 记录是发送失败、接收不到、账户无法打开，还是只有某个收件人失败；在“邮件”的邮箱列表中检查是否有“发件箱”。
      - 如果邮件服务商有状态页面，检查是否发生服务中断；非 iCloud 邮箱的账户状态、访问限制和服务器设置应向邮件服务商或系统管理员核实。
      - 在“邮件”中打开发件箱里的邮件，检查收件人地址，再轻点“发送”；如果看不到发件箱，通常表示没有待发送邮件。
    verificationLevel: Official
    sourceIds: [apple-iphone-ipad-mail-send-failure, apple-icloud-mail-not-working]
    warnings: [网页可访问不代表邮件服务、账户授权或服务器设置完全正常。]
    limitations: [Apple 支持页不能替代第三方邮件服务商对账户状态和服务器策略的确认。]
  - id: recheck-password-and-provider-authorization
    title: 核对密码、两步验证和服务商授权
    summary: 反复要求密码或提示用户名密码错误时，不要盲目重复输入；先在服务商网站验证账户，再确认两步验证或专用密码要求。
    kind: recommended
    steps:
      - 如果“邮件”要求输入密码，先在对应邮件服务商的网站登录，确认邮箱地址和密码本身有效。
      - 如果服务商启用了两步验证、安全功能或访问限制，询问服务商或系统管理员是否需要专用密码或额外授权。
      - 记录完整提示、邮箱类型和是否只有 iPhone/iPad 失败；不要把服务商账户锁定、密码过期或安全策略误判成系统故障。
      - 如果是 iCloud 邮件，确认设备已登录正确的 Apple 账户，并检查“设置”中 iCloud 的“邮件”是否已打开。
    verificationLevel: Official
    sourceIds: [apple-iphone-ipad-mail-send-failure, apple-icloud-mail-not-working]
    warnings: [不要把 Apple 账户密码、邮箱密码或验证码提供给他人；专用密码是否需要由邮件服务商决定。]
    limitations: [Apple 官方步骤不会解除第三方服务商的账户锁定、组织策略或登录风险控制。]
  - id: safely-remove-and-readd-account
    title: 备份确认后再移除并重新添加账户
    summary: 只有确认服务器上保留了邮件，才考虑移除账户并重新添加；这样可以修复本地账户配置，但不能替代服务商侧修复。
    kind: escalation
    steps:
      - 在电脑或邮件服务商网站登录，确认需要保留的邮件已在服务器或其他设备上；iOS/iPadOS 备份会保存邮件设置，但不会备份电子邮件内容。
      - 前往“设置”>“App”>“邮件”>“邮件账户”，选择出问题的账户，记录账户类型和必要设置后再考虑“删除账户”。
      - 删除账户后重新添加，并用服务商提供的自动或手动设置完成登录；添加后先发送测试邮件，再从其他地址回复测试接收。
      - 如果重新添加后仍失败，联系邮件服务商或系统管理员核实服务中断、两步验证、专用密码、访问限制和账户设置。
    verificationLevel: Official
    sourceIds: [apple-iphone-ipad-mail-send-failure]
    warnings: [移除账户可能从设备中删除之前下载的邮件；没有确认服务器副本前不要删除账户。]
    limitations: [重新添加账户不会恢复已被本地删除且服务器上也没有保留的邮件。]
warnings:
  - 先确认邮件是否在服务器或其他设备上，再移除账户；不要用删除账户替代备份。
  - iCloud 邮件、第三方邮箱和组织邮箱的账户规则不同，密码错误或授权失败应由对应服务商确认。
  - 不要臆造邮件服务中断、账户配置或服务器参数；记录完整错误提示和邮箱类型。
limitations:
  - 本文覆盖 iPhone 或 iPad 自带“邮件”App 的常见收发故障，不覆盖 Mac“邮件”、第三方邮件 App、服务商停服或组织邮件服务器的具体配置。
  - Apple 官方页面没有承诺重新添加账户后一定恢复，也没有保证所有第三方邮件服务使用相同设置。
sources:
  - id: apple-iphone-ipad-mail-send-failure
    title: 如果你无法在 iPhone 或 iPad 上发送电子邮件
    url: https://support.apple.com/zh-cn/102556
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-21
    publishedAt: null
    official: true
  - id: apple-icloud-mail-not-working
    title: 如果 iCloud 邮件无法正常使用
    url: https://support.apple.com/zh-cn/102562?device-type=iphone
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-21
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-21
lastUpdatedAt: 2026-07-21
createdAt: 2026-07-21
relatedArticles: [mac-mail-cant-send-receive-email, iphone-imessage-messages-not-sending-green-waiting-activation, icloud-contacts-calendar-reminders-not-syncing]
popular: false
---

# iPhone 或 iPad 邮件无法发送、接收或卡在发件箱

如果 iPhone 或 iPad 的“邮件”App 发不出邮件、收不到新邮件，或邮件一直留在发件箱，先不要删除账户。先分清是网络或邮件服务中断、单封邮件地址问题、密码/授权问题，还是本地账户配置异常；这些情况的处理方式不同。

## 症状

- “邮件”显示尚未发送，邮件留在发件箱。
- 收件箱没有新邮件，但其他设备或网页端可能能收到。
- “邮件”反复要求输入密码，或提示用户名/密码错误。
- 只有某个邮箱账户失败，其他账户正常。
- iCloud 邮件无法访问，或 @icloud.com 地址无法收发邮件。

## 可能原因

1. iPhone 或 iPad 没有稳定的 Wi‑Fi 或蜂窝数据连接。
2. 邮件服务商发生中断，或账户被安全策略、两步验证或访问限制拦截。
3. 发件人、收件人地址或邮件账户密码有误。
4. 本地账户设置过期或损坏，需要重新添加账户。
5. 删除账户前没有确认服务器副本，导致设备上的已下载邮件需要重新同步或无法恢复。

## Apple 官方方案

1. 用 Safari 打开网页，确认设备能上网；然后检查邮件服务商的状态页面。
2. 在“邮件”的邮箱列表中打开“发件箱”，检查收件人地址后重新发送；看不到发件箱时，通常表示没有待发送邮件。
3. 如果“邮件”要求输入密码，先登录邮件服务商网站验证邮箱地址和密码；收到用户名或密码错误时，联系服务商或系统管理员。
4. 如果服务商启用了两步验证、安全功能或访问限制，确认是否需要专用密码或额外授权。
5. 如果使用 iCloud 邮件，前往“设置”>“你的姓名”>“iCloud”，确认“邮件”已打开，并按 iCloud 邮件页面检查推送与账户设置。
6. 只有在确认邮件已保存在服务商网站或其他设备后，才前往“设置”>“App”>“邮件”>“邮件账户”移除账户并重新添加。
7. 重新添加后先发送测试邮件，再从其他地址回复；仍失败则联系邮件服务商或系统管理员。

## 零售排查流程

1. 记录设备型号、iOS/iPadOS 版本、邮箱类型（iCloud、个人邮箱或组织邮箱）、网络类型和完整错误提示。
2. 分别测试网页端登录、发送和接收，确定故障是在设备、账户还是服务商侧。
3. 优先处理发件箱中的单封邮件、密码/授权和服务状态，不要一开始就删除账户或抹掉设备。
4. 若必须重新添加账户，先确认服务器副本，再记录账户名称和服务商要求的登录方式。
5. 若多个网络和重新添加账户后仍无法收发，带上错误提示联系邮件服务商；涉及 iCloud 邮件或 Apple 账户时联系 Apple 支持。

## 升级处理

- 网页端也无法登录、发送或接收，或服务商状态页面显示中断。
- 密码正确但仍反复要求登录，且伴随两步验证、专用密码、账户锁定或组织策略提示。
- 确认网络、账户和服务商均正常，但多个邮件账户或系统邮件 App 仍无法工作。
- 误删账户后需要恢复设备上没有服务器副本的邮件时，立即停止反复操作并寻求数据恢复帮助。

## 相关问题

- [Mac 邮件无法发送或接收邮件](/recipes/Mac/mac-mail-cant-send-receive-email)
- [iPhone 无法发送或接收信息，iMessage 变绿色或等待激活](/recipes/iPhone/iphone-imessage-messages-not-sending-green-waiting-activation)
- [iCloud 通讯录、日历或提醒事项不同步](/recipes/iCloud/icloud-contacts-calendar-reminders-not-syncing)

## 标签

- 设备：iPhone、iPad
- 系统：iOS、iPadOS
- 服务：邮件、iCloud、邮箱账户
- 风险：删除账户前必须确认服务器副本；第三方服务商规则可能不同
