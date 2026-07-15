---
schemaVersion: 2
id: locked-notes-forgot-password
title: "忘记备忘录密码，锁定备忘录打不开"
slug: locked-notes-forgot-password
summary: "忘记“备忘录”自定义密码时，先分清是设备密码/登录密码锁定，还是自定义备忘录密码锁定；重设密码只能用于以后锁定的新备忘录，不能打开已经用旧密码锁住的内容。"
symptoms:
  - 备忘录 app 有上锁的内容，密码忘记了
  - 忘记备忘录密码
  - 锁定备忘录打不开
  - Notes locked note forgot password
  - 重设备忘录密码后旧笔记还是打不开
  - iCloud.com 看不到锁定备忘录
devices:
  - iPhone
  - iPad
  - Mac
platforms:
  - iOS
  - iPadOS
  - macOS
  - iCloud.com
systemVersions:
  - iOS 16 或更高版本
  - iPadOS 16 或更高版本
  - macOS Ventura 或更高版本
  - 当前 iCloud.com
categories:
  - iCloud
tags:
  - Notes
  - iCloud
  - Password
  - Passcode
  - End-to-end encryption
keywords:
  - 备忘录密码
  - 锁定备忘录
  - 忘记备忘录密码
  - 重设备忘录密码
  - iCloud 备忘录
  - Notes password reset
aliases:
  - locked notes forgot password
  - forgot Notes password
  - reset Notes password old notes
  - Notes locked content password forgotten
  - 备忘录上锁忘记密码
  - 备忘录锁定内容打不开
errorMessages:
  - 输入密码错误
  - Wrong password
officialTerms:
  - 锁定备忘录
  - 自定义密码
  - iPhone 密码
  - iPad 密码
  - 登录密码
  - 重设密码
communityTerms:
  - 备忘录加密打不开
  - 备忘录旧密码忘了
  - 上锁笔记找回
  - 解锁备忘录
difficulty: Moderate
estimatedTime: 10 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: identify-lock-method-before-resetting
    title: 先确认锁定方式，再决定能不能找回访问
    summary: iOS 16 以后锁定备忘录可以用设备密码/登录密码，也可以用自定义备忘录密码；两者忘记后的结果不同。
    kind: recommended
    steps:
      - 先问顾客是在 iPhone、iPad、Mac 还是 iCloud.com 打不开锁定备忘录，并确认是否还记得当前设备密码、Mac 登录密码或旧的备忘录自定义密码。
      - 如果这些备忘录是用 iPhone 密码、iPad 密码或 Mac 登录密码锁定，优先回到对应设备上的“备忘录”App，用该设备密码、登录密码、Face ID、Touch ID 或已启用的生物识别解锁。
      - 如果这些备忘录是用自定义备忘录密码锁定，输入可能的旧密码；如果输错两次，查看密码提示是否能帮助回忆。
      - 不要把 Apple 账户密码、iCloud 密码或新设置的备忘录密码说成可以打开旧锁定备忘录，除非旧锁定备忘录原本就使用对应的设备密码或登录密码方式。
      - 如果顾客能用旧自定义密码打开某条旧备忘录，按屏幕提示把这条备忘录更新到当前密码，减少以后管理多个密码的风险。
    verificationLevel: Official
    sourceIds:
      - apple-lock-notes-iphone-ipad
      - apple-lock-notes-iphone-guide
      - apple-change-locked-notes-password-mac
    warnings:
      - Apple 说明，如果忘记自定义备忘录密码，将无法访问用这个密码锁定的备忘录。
      - 不要让顾客反复随机尝试大量密码；先看密码提示和其他已登录设备是否仍能解锁。
    limitations:
      - 本步骤不能绕过旧的自定义备忘录密码。
      - 不同账户可能有不同的备忘录密码，必须先选对 iCloud 或本机账户。
  - id: reset-custom-notes-password-for-future-notes
    title: 重设备忘录自定义密码只影响以后锁定的新备忘录
    summary: 忘记自定义备忘录密码时可以重设，但旧锁定备忘录仍然需要锁定时使用的旧密码。
    kind: alternative
    steps:
      - 如果确认顾客忘记的是自定义备忘录密码，先说明结果：重设不会打开之前已经锁定的备忘录。
      - 在 iPhone 或 iPad 上，打开“设置 > App > 备忘录 > 密码”，选择对应账户，然后轻点“重设密码”。
      - 按提示验证 Apple 账户或设备身份后，设置新的备忘录密码和密码提示。
      - 在 Mac 上，打开“备忘录”，进入“备忘录 > 设置”，选择对应账户后点按“重设密码”，再设置新密码和提示。
      - 重设后，用新密码只锁定后续新备忘录；旧锁定备忘录仍要输入旧密码。
      - 如果旧密码之后被想起来，打开旧锁定备忘录时把它更新到当前密码，避免以后无法判断哪条备忘录对应哪个旧密码。
    verificationLevel: Official
    sourceIds:
      - apple-lock-notes-iphone-ipad
      - apple-change-locked-notes-password-mac
    warnings:
      - 重设密码可能导致顾客同时管理多个备忘录密码，旧笔记和新笔记使用的密码可能不同。
      - 不要承诺 Apple Store、Apple 支持或第三方工具可以恢复旧锁定备忘录内容。
    limitations:
      - 重设密码不是数据恢复；它只改变以后锁定新备忘录时使用的密码。
      - 如果顾客无法完成账户验证或设备验证，需要先处理 Apple 账户或设备登录问题。
  - id: use-icloud-and-other-devices-correctly
    title: 正确使用 iCloud.com 和其他设备排查
    summary: iCloud.com 只能查看使用自定义备忘录密码锁定的部分 iCloud 备忘录；用设备密码或登录密码锁定的备忘录不能在 iCloud.com 上查看。
    kind: alternative
    steps:
      - 让顾客检查其他已登录同一 Apple 账户的 iPhone、iPad 或 Mac，看看是否曾经启用 Face ID、Touch ID 或登录密码解锁锁定备忘录。
      - 如果在某台设备上仍能打开旧锁定备忘录，立即复制重要内容、移除锁定后重新锁定，或按提示更新到当前密码。
      - 如果要在 iCloud.com 查看锁定备忘录，先确认这些备忘录是用自定义备忘录密码锁定，而不是用设备密码或 Mac 登录密码锁定。
      - 如果 iCloud.com 要求输入锁定备忘录时创建的密码，输入旧自定义密码；新重设的密码只能打开用新密码锁定的备忘录。
      - 如果任何设备和 iCloud.com 都无法打开旧锁定备忘录，且旧自定义密码也想不起来，按无法恢复旧内容处理，并帮助顾客设置新的密码提示和备份习惯。
    verificationLevel: Official
    sourceIds:
      - apple-icloud-view-locked-notes
      - apple-lock-notes-iphone-ipad
      - apple-lock-notes-mac-guide
    warnings:
      - iCloud.com 不是绕过设备密码或备忘录密码的恢复工具。
      - 复制、移除锁定或重新锁定敏感内容前，先确认顾客身份和隐私环境。
    limitations:
      - 如果锁定方式是设备密码或 Mac 登录密码，Apple 说明这些锁定备忘录不能在 iCloud.com 上查看。
      - 如果旧自定义密码已经遗忘，iCloud 同步不会让 Apple 或其他设备解密旧内容。
warnings:
  - 不要把重设备忘录密码写成可以打开旧锁定备忘录。
  - 不要把 Apple 账户密码、iCloud 密码、iPhone 锁屏密码和备忘录自定义密码混为一谈。
  - 第三方“找回/破解备忘录密码”工具不是 Apple 官方方案，可能造成隐私泄露或数据损坏。
limitations:
  - 本文适用于 Apple“备忘录”App 的锁定备忘录；不覆盖第三方笔记 App、企业受管理数据或已删除备忘录恢复。
  - 如果旧锁定备忘录使用自定义备忘录密码且密码已遗忘，Apple 官方资料说明无法访问这些旧锁定备忘录。
sources:
  - id: apple-lock-notes-iphone-ipad
    title: 如何在 iPhone 或 iPad 上锁定或解锁备忘录
    url: https://support.apple.com/zh-cn/102537
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-lock-notes-iphone-guide
    title: 在 iPhone 上锁定备忘录
    url: https://support.apple.com/zh-cn/guide/iphone/iphf177bb154/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-change-locked-notes-password-mac
    title: 更改用于锁定备忘录的密码
    url: https://support.apple.com/zh-cn/guide/notes/apdb021fd5a9/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-lock-notes-mac-guide
    title: 在 Mac 上锁定备忘录
    url: https://support.apple.com/zh-cn/guide/notes/not28c5f5468/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-icloud-view-locked-notes
    title: 在 iCloud.com 上查看备忘录和已锁定的备忘录
    url: https://support.apple.com/zh-cn/guide/icloud/mm000b55f946/icloud
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-14
lastUpdatedAt: 2026-07-14
createdAt: 2026-07-14
relatedArticles:
  - iphone-unavailable-security-lockout-forgot-passcode
  - mac-forgot-login-password-reset
  - apple-account-verification-failed
popular: true
---

# 忘记备忘录密码，锁定备忘录打不开

顾客说“备忘录 app 有上锁的内容，密码忘记了”时，第一句话要先分清密码类型。Apple 的“备忘录”可以用 iPhone/iPad 设备密码、Mac 登录密码，或单独的自定义备忘录密码来锁定。忘记自定义备忘录密码时，重设密码只能用于以后锁定的新备忘录，不能打开已经用旧密码锁住的内容。

---

## 症状

- “备忘录里有上锁内容，密码忘了。”
- “重设备忘录密码后，原来的锁定备忘录还是打不开。”
- “Face ID 以前能打开，现在要输入密码。”
- “我知道 Apple ID 密码，但备忘录锁打不开。”
- “iCloud.com 里看不到锁住的备忘录。”
- “旧手机上能打开，新手机上打不开。”

---

## 可能原因

1. **锁定方式不同，忘记后的结果不同**
   - iOS 16 以后，“备忘录”可以使用 iPhone/iPad 密码锁定，也可以使用只用于“备忘录”的自定义密码。Mac 上也可以使用登录密码或自定义密码。
2. **自定义备忘录密码忘记后，旧锁定内容不能被新密码打开**
   - Apple 说明，忘记自定义备忘录密码时，即使重设密码，也无法访问之前用旧密码锁定的备忘录；新密码只用于以后锁定的新备忘录。
3. **Apple 无法代替顾客访问锁定备忘录**
   - Apple 官方说明无法访问锁定的备忘录，也无法在顾客忘记备忘录密码时协助访问这些备忘录。
4. **Face ID / Touch ID 不是唯一凭证**
   - Apple 在 iPhone 使用手册中提醒，不要把 Face ID 或 Touch ID 当作解锁备忘录的唯一方式；更改生物识别设置或更改备忘录密码时，可能需要重新输入备忘录密码。
5. **iCloud.com 有查看限制**
   - Apple 说明，可以在 iCloud.com 输入创建锁定备忘录时使用的密码查看锁定备忘录；但如果备忘录是用设备密码或 Mac 登录密码锁定，不能在 iCloud.com 上查看。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先确认顾客打不开的是 Apple“备忘录”App 的锁定备忘录，不是第三方笔记 App、相册隐藏项目、文件加密或设备锁屏密码问题。
2. 问清楚锁定备忘录的方式：当时是选择使用 iPhone/iPad 密码、Mac 登录密码，还是创建了单独的“备忘录”自定义密码。
3. 如果是设备密码或 Mac 登录密码锁定，回到同一 Apple 账户下的 iPhone、iPad 或 Mac，在“备忘录”App 里尝试用当前设备密码、登录密码、Face ID 或 Touch ID 解锁。
4. 如果是自定义备忘录密码锁定，先尝试顾客记得的旧密码。连续两次输错后，查看密码提示。
5. 如果某台旧设备仍能通过 Face ID、Touch ID 或已缓存的解锁状态打开旧备忘录，立即复制重要内容、移除锁定后重新锁定，或按屏幕提示更新到当前密码。
6. 如果顾客忘记的是自定义备忘录密码，先说明边界：Apple 不能协助访问旧锁定备忘录；重设密码也不能打开旧备忘录。
7. 需要继续使用锁定功能时，在 iPhone 或 iPad 上进入**设置 > App > 备忘录 > 密码**，选择对应账户，轻点**重设密码**，然后设置新密码和新提示。
8. 在 Mac 上，打开**备忘录 > 设置**，选择对应账户，点按**重设密码**，然后设置新密码和提示。
9. 重设后，用新密码锁定后续新备忘录；旧锁定备忘录仍要输入锁定时的旧密码。
10. 如果之后想起旧密码，打开旧锁定备忘录时按提示把这条备忘录更新到当前密码，减少多套密码混用。
11. 如果顾客打算使用 iCloud.com，先确认这些备忘录是用自定义备忘录密码锁定；用设备密码或 Mac 登录密码锁定的备忘录不能在 iCloud.com 上查看。
12. 如果所有设备和 iCloud.com 都无法打开旧锁定备忘录，且旧自定义密码无法回忆，按旧内容无法访问处理，不再承诺恢复。

参考来源：

- [Apple 支持：如何在 iPhone 或 iPad 上锁定或解锁备忘录](https://support.apple.com/zh-cn/102537)
- [iPhone 使用手册：在 iPhone 上锁定备忘录](https://support.apple.com/zh-cn/guide/iphone/iphf177bb154/ios)
- [Apple 支持：更改用于锁定备忘录的密码](https://support.apple.com/zh-cn/guide/notes/apdb021fd5a9/mac)
- [Mac 使用手册：在 Mac 上锁定备忘录](https://support.apple.com/zh-cn/guide/notes/not28c5f5468/mac)
- [iCloud 使用手册：在 iCloud.com 上查看备忘录和已锁定的备忘录](https://support.apple.com/zh-cn/guide/icloud/mm000b55f946/icloud)

---

## 什么时候重设密码，什么时候继续找旧密码

验证级别：Apple 官方

1. 如果顾客还能想起旧自定义密码，先用旧密码打开旧锁定备忘录，再把它更新到当前密码。
2. 如果顾客只是不确定大小写、数字或提示含义，先根据提示尝试少量高可信组合，不要现场鼓励随机撞库。
3. 如果旧密码完全想不起来，重设自定义备忘录密码只能让以后新锁定的备忘录继续可用。
4. 如果顾客需要访问旧锁定备忘录的内容，重设不是恢复路径；只有旧密码、仍可解锁的已登录设备，或顾客自己保存的内容副本能帮助访问。
5. 如果顾客同时有多个 iCloud 或本机备忘录账户，先选对账户再更改或重设密码。

---

## iCloud.com 和多设备检查

验证级别：Apple 官方

iCloud.com 可以帮助确认一部分 iCloud 备忘录，但它不是绕过密码的工具。Apple 说明，使用设备密码或 Mac 登录密码锁定的备忘录不能在 iCloud.com 上查看；使用自定义备忘录密码锁定的备忘录，仍需要输入创建锁定时使用的密码。

多设备排查的价值在于：某台旧 iPhone、iPad 或 Mac 可能仍处于已解锁状态，或仍能用生物识别和正确的本机凭证打开。只要还能打开，就先保护内容，再重新设置可记住的锁定方式。

---

## 不建议的非官方处理

非官方

### 不建议使用第三方“破解备忘录密码”工具

- 来源：Apple 官方资料没有提供忘记自定义备忘录密码后由工具恢复旧锁定备忘录的流程。
- 成功概率：未知。
- 风险：高。锁定备忘录通常包含隐私内容，把设备备份、Apple 账户、笔记数据库或本机文件交给第三方工具可能造成隐私泄露、数据损坏或账户风险。
- 备注：如果顾客没有旧密码，也没有任何仍能打开的设备，处理重点应转为说明数据边界，并设置新的备忘录密码、提示和备份习惯。
- 验证级别：未知

---

## 零售排查流程

1. 复述问题：“你忘的是备忘录自己的锁定密码，还是手机/电脑开机密码？”
2. 确认设备和账户：iPhone、iPad、Mac、iCloud.com；iCloud 账户还是本机账户。
3. 询问是否最近更改过 Face ID、Touch ID、设备密码、Mac 登录密码、Apple 账户密码或备忘录密码。
4. 让顾客查看密码提示，并尝试少量高可信旧密码。
5. 检查其他仍登录同一 Apple 账户的设备，尤其是旧 iPhone、旧 iPad 或 Mac。
6. 能打开旧锁定备忘录时，先复制或导出重要内容，再更新锁定密码。
7. 不能打开且旧自定义密码遗忘时，先说明 Apple 官方边界，再按需重设自定义密码以保护以后新备忘录。
8. 不承诺 Apple、门店维修、刷机、iCloud.com 或第三方软件可以读取旧锁定备忘录内容。
9. 处理完成后，帮助顾客设置清晰密码提示，并解释不要只依赖 Face ID 或 Touch ID。

---

## 升级处理

联系 Apple 支持：

- 顾客无法完成 Apple 账户验证，导致不能重设备忘录自定义密码。
- 设备密码、Mac 登录密码或 Apple 账户本身也忘记，需要分别走对应账户或设备恢复流程。
- iCloud 备忘录同步异常、设备看不到同一批备忘录，且已经排除网络和账户选择问题。

前往 Apple Store 或授权维修点：

- 设备无法开机、无法联网、触控失灵或键盘无法输入，导致无法尝试已知密码。
- 顾客需要现场协助区分设备密码、Apple 账户密码、Mac 登录密码和备忘录自定义密码。

---

## 相关问题

- [iPhone 不可用、安全锁定或忘记锁屏密码](/recipes/iPhone/iphone-unavailable-security-lockout-forgot-passcode)
- [Mac 忘记登录密码，无法进入 macOS](/recipes/Mac/mac-forgot-login-password-reset)
- [Apple 账户显示验证失败或连接服务器出错](/recipes/Apple%20ID/apple-account-verification-failed)
- iCloud 备忘录没有同步到新设备
- 备忘录误删或丢失

---

## 标签

- 设备：iPhone、iPad、Mac
- 系统：iOS、iPadOS、macOS、iCloud.com
- 功能：备忘录、锁定备忘录、自定义密码、设备密码、登录密码
- Apple ID：Apple 账户、iCloud 备忘录、端到端加密
