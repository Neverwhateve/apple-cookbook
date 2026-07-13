---
title: Mac 邮件无法发送或接收邮件
slug: mac-mail-cant-send-receive-email
device:
  - Mac
category: Mac
tags:
  - Mac
  - macOS
  - Mail
  - Email
  - iCloud
  - Network
  - VPN
  - Storage
aliases:
  - Mac Mail can't send email
  - Mac Mail can't receive email
  - Mail account offline Mac
  - Mail keeps asking for password Mac
  - Mac Mail messages missing
  - Mac 邮件收不到
  - Mac 邮件发不出去
  - 邮件账户离线
  - 邮件一直要求输入密码
  - 邮件不显示旧邮件
verification: Official
difficulty: Moderate
updated: 2026-07-13
official_sources:
  - https://support.apple.com/en-us/102422
  - https://support.apple.com/en-us/117379
  - https://support.apple.com/en-us/102413
  - https://support.apple.com/en-us/102562
  - https://support.apple.com/en-us/102088
community_sources:
  - https://discussions.apple.com/thread/255584918
  - https://discussions.apple.com/thread/255182550
  - https://discussions.apple.com/thread/252678597
  - https://www.reddit.com/r/applehelp/comments/1rv7hif/mail_app_wont_show_me_older_emails_and_even_apple/
status: canonical
popular: true
---

# Mac 邮件无法发送或接收邮件

Mac 上“邮件”App 发不出、收不到、账户离线、一直要求输入密码，或邮件明明在网页邮箱里但 Mac 不显示时，先判断问题在网络、邮箱服务、账户认证、邮箱容量、显示过滤，还是 Mail 本地账户设置。最快路径通常是先用网页邮箱验证账户，再按 Mail 状态提示处理。

---

## 症状

- “Mac 邮件收不到邮件，但手机可以。”
- “邮件一直显示账户离线。”
- “发邮件卡在发件箱。”
- “一直弹窗让我输入邮箱密码。”
- “网页邮箱能登录，Mac 邮件不行。”
- “只看得到最近一个月邮件，旧邮件不显示。”
- “换到 Yahoo / Outlook / Exchange 以后 Mac Mail 不能同步。”
- “iCloud 邮件能收不能发。”

---

## 可能原因

1. **网络、VPN 或安全软件影响 Mail 连接**
   - Apple 说明，如果 Mail 显示网络离线或无法连接服务器，要检查 VPN 或其他会监控、干预网络连接的软件。
2. **邮箱服务临时中断或账户被服务商限制**
   - Apple 建议查看邮箱服务状态；服务商也可能因临时故障、条款未接受、账户暂停或发送限制影响收发。
3. **密码或认证方式不再被邮箱服务商接受**
   - Apple 说明，Mail 能连接服务商但无法登录账户时，服务商可能拒绝密码；原因包括密码已更改、需要 App 专用密码、账户被暂停，或服务商更改认证方式。
4. **邮箱容量、发送限额或附件大小超限**
   - Apple 说明，邮箱服务商可能限制服务器存储量、每日发送数量和邮件大小，超限会影响发送或接收。
5. **邮件被过滤、分类、规则、垃圾邮件或屏蔽发件人隐藏**
   - Apple 的缺失邮件文章要求检查侧边栏、过滤、macOS Sequoia 15.4 或更新版本的邮件分类、垃圾邮件、屏蔽发件人、规则和搜索。
6. **选择了错误的邮箱提供商或账号设置过旧**
   - Apple 说明添加账户时可能需要选择正确提供商；有些地址虽然域名不同，但认证实际依赖 Yahoo、Exchange、Aol. 等服务商。
7. **iCloud Mail 有专属分支**
   - iCloud Mail 需要检查 iCloud Mail 是否启用、iCloud Mail 系统状态、iCloud 存储和邮箱大小限制，以及 Mac 上 iCloud 账户是否在线。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先确认 Mac 可以正常上网。用 Safari 打开普通网页；如果全机网络异常，先转入网络排查。
2. 在 Mail 侧边栏或窗口右上角查找警告符号或闪电图标，点按它读取状态信息。
3. 如果 Mail 显示网络离线或无法连接服务器，暂时关闭 VPN、代理、安全软件或网络过滤工具后复测。
4. 用网页邮箱测试同一账户：iCloud 用 iCloud.com/mail，Gmail、Outlook、Yahoo 或公司邮箱用对应网页入口。
5. 如果网页邮箱也不能登录、收发或显示服务异常，联系邮箱服务商或等待服务恢复；这不是 Mac 硬件问题。
6. 如果 Mail 反复要求密码，先退出 Mail，到**系统设置 > 互联网账户**检查该邮箱账户；如有密码字段，重新输入当前正确密码。
7. 如果邮箱服务商启用了两步验证、App 专用密码或新的认证方式，按服务商要求更新认证；必要时移除账户后重新添加。
8. 如果能收到不能发送，检查发件箱、收件人地址、退信内容、SMTP / outgoing server 状态和服务商发送限制。
9. 如果是 iCloud Mail，确认 Mac 上 iCloud Mail 已启用且账户在线；检查 iCloud Mail 系统状态、iCloud 储存空间、邮箱大小和发送限制。发件箱卡住时，确认 iCloud 是发件服务器。
10. 如果以为邮件丢失，先检查侧边栏是否显示目标邮箱、账户是否启用、邮件过滤是否开启、邮件分类是否只显示某一类、垃圾邮件、已屏蔽发件人和邮件规则。
11. 如果搜索或同步异常，选择对应邮箱，从**邮箱 > 重建**重建邮箱。
12. 如果没有其他方案奏效，移除该邮箱账户再重新添加；添加时按 Apple 的提供商列表选择正确服务商，或向邮箱服务商索取 IMAP / POP / SMTP 设置。

参考来源：

- [Apple Support: If you can't send or receive email on Mac](https://support.apple.com/en-us/102422)
- [Apple Support: If you can't see email messages in Mail on Mac](https://support.apple.com/en-us/117379)
- [Apple Support: If Mail on your Mac keeps asking for your password](https://support.apple.com/en-us/102413)
- [Apple Support: If iCloud Mail isn't working](https://support.apple.com/en-us/102562)
- [Apple Support: Choose the correct email provider when adding an account to Mail](https://support.apple.com/en-us/102088)

---

## 常见分支

### 网页邮箱正常，但 Mac Mail 不正常

验证级别：Apple 官方

1. 记录网页邮箱能否收、能否发、是否能看到缺失邮件。
2. 回到 Mail 查看状态图标和账户错误。
3. 检查 VPN、安全软件、账户密码、认证方式和账户设置。
4. 如果仍失败，移除并重新添加账户，确保选择正确邮箱服务商。

### 邮件看起来丢了

验证级别：Apple 官方

1. 先选中具体邮箱，而不是只看“所有收件箱”。
2. 关闭邮件过滤和邮件分类。
3. 查垃圾邮件、废纸篓、屏蔽发件人和规则。
4. 搜索发件人、主题或关键字。
5. 搜索异常时重建邮箱。
6. 如果从未确认收到过该邮件，回到收信问题分支。

### iCloud Mail 能收不能发

验证级别：Apple 官方

1. 检查 iCloud Mail 系统状态和 iCloud 储存空间。
2. 检查发件箱、草稿、已发送和退信。
3. 在 Mail 的账户服务器设置中确认 iCloud 是发件服务器。
4. 如果使用非 iCloud SMTP 服务器，不要用 iCloud 邮箱地址作为发件地址。
5. 如果对方未收到且无退信，可能被 iCloud Mail 或收件方服务器过滤；让收件人检查垃圾邮件，必要时联系 Apple 支持或邮件管理员。

---

## 已验证的非官方处理思路

非官方

### 迁移后的邮箱可能要选新的提供商

- 来源：Apple Support Community 中 Cox / Frontier / Yahoo 迁移相关讨论，以及 Apple 的“选择正确邮箱提供商”官方文章。
- 成功概率：中等到高，适合“手机能用、Mac 添加不了”“服务商迁移到 Yahoo / Outlook 后失效”的场景。
- 风险：低到中等。移除账户前要确认邮件不是只保存在本机的 POP 邮箱。
- 备注：服务商迁移规则由邮箱服务商决定。Apple 官方能确认添加 Mail 时要选正确提供商，但具体迁移细节要以服务商为准。
- 验证级别：较可能

### Exchange 或 IMAP 同步混乱时重建邮箱

- 来源：Apple 的缺失邮件文章支持重建邮箱；Apple Support Community 中 Exchange/IMAP 同步异常常引用该路径。
- 成功概率：中等，适合网页邮箱正常、Mac 本地显示不一致、搜索异常或旧邮件不显示。
- 风险：低到中等。大型邮箱重建需要时间和稳定网络。
- 备注：先确认网页邮箱里邮件仍存在，再重建；不要在未确认服务器端数据前随意删除本地账户。
- 验证级别：Apple 官方

### App 专用密码或重新授权

- 来源：Apple 说明服务商可能要求 App 专用密码或更改认证方式；社区中 Gmail、Yahoo、Exchange 账号常见。
- 成功概率：中等，取决于邮箱服务商。
- 风险：低。
- 备注：App 专用密码和授权入口由邮箱服务商提供。不要让顾客把 Apple 账户密码当成所有邮箱密码。
- 验证级别：Apple 官方

---

## 零售排查流程

1. 先问清楚是不能收、不能发、反复要密码、邮件丢失，还是只在 Mac 不同步。
2. 现场先用网页邮箱验证账户本身是否正常。网页邮箱也失败时，优先转邮箱服务商。
3. 看 Mail 的警告图标或闪电图标，记录原始错误文字。
4. 暂时排除 VPN、安全软件、代理、公司网络和校园网络影响。
5. 密码问题先用网页邮箱验证，再看服务商是否需要 App 专用密码或重新授权。
6. iCloud Mail 按 iCloud 专属流程检查：iCloud Mail 开关、系统状态、iCloud 储存空间、发送限制和发件服务器。
7. 缺失邮件先关闭过滤、分类和规则，查垃圾邮件/废纸篓/屏蔽发件人，再搜索和重建邮箱。
8. 只有在确认服务器端邮件安全、顾客知道密码或认证方式后，才移除并重新添加账户。
9. POP 邮箱、公司邮箱、迁移邮箱和本机归档邮箱要特别谨慎，先确认邮件是否只保存在这台 Mac。
10. 不要把“重装 macOS”“清空 Mail 文件夹”“删除所有邮件数据库”作为常规首选步骤。

---

## 升级处理

联系邮箱服务商或公司 IT：

- 网页邮箱也无法登录、发送或接收。
- 账户被暂停、要求接受条款、需要 App 专用密码或多因素认证重置。
- SMTP、IMAP、POP、Exchange 设置、容量、发送限额或迁移规则不清楚。
- 公司、学校或运营商邮箱需要管理员处理。

联系 Apple 支持：

- iCloud Mail 按官方流程检查后仍不能收发。
- Mail App 崩溃、无法打开、账户设置界面异常或 macOS 更新后持续异常。
- 多个不同服务商账户都在同一台 Mac 上失败，但网页邮箱都正常。

前往 Apple Store 或授权维修点：

- Mac 同时存在无法联网、系统异常、存储错误或硬件故障迹象。
- Apple 支持要求现场诊断。

---

## 相关问题

- [iPhone 或 iPad 无法连接 Wi-Fi 或显示无互联网连接](/recipes/Networking/iphone-ipad-wifi-no-internet-unable-to-join)
- [Apple 账户验证失败](/recipes/Apple%20ID/apple-account-verification-failed)
- Mac 储存空间不足
- iCloud 储存空间已满
- Safari 无法打开网页

---

## 标签

- 设备：Mac
- 系统：macOS
- 功能：Mail、Email、iCloud Mail、SMTP、IMAP、POP、Exchange
- 网络：互联网、VPN、代理、邮箱服务器
- Apple ID：iCloud Mail 使用 Apple 账户；第三方邮箱使用服务商账户
- 隐私：邮箱密码、App 专用密码、邮件内容
- 维修：通常不是硬件问题；全机网络或存储异常时再考虑硬件/系统服务
- 配件：不适用

---

## 元信息

- 最后更新：2026-07-13
- 来源数量：9
- 验证级别：Apple 官方
- 支持系统：当前 macOS；Mail 分类分支适用于 macOS Sequoia 15.4 或更新版本
- 可信度：高
