---
schemaVersion: 2
id: screen-time-passcode-forgot-reset
title: 忘记屏幕使用时间密码，无法修改限制
slug: screen-time-passcode-forgot-reset
summary: 忘记屏幕使用时间密码时，先分清是自己的设备还是孩子的设备；官方恢复路径通常需要用当初设置恢复用的 Apple 账户重设。
symptoms:
  - 屏幕使用时间密码忘记了
  - 忘记屏幕时间密码
  - 改屏幕使用时间设置要密码但不记得
  - 孩子的屏幕使用时间密码忘了
  - 关不掉 App 限额因为忘了屏幕时间密码
devices:
  - iPhone
  - iPad
  - Mac
platforms:
  - iOS
  - iPadOS
  - macOS
systemVersions:
  - 当前 iOS
  - 当前 iPadOS
  - 当前 macOS
categories:
  - Family Sharing
tags:
  - Family Sharing
  - Screen Time
  - Passcode
  - Apple ID
keywords:
  - 屏幕使用时间密码
  - 屏幕时间密码
  - Screen Time passcode
  - 家长控制密码
aliases:
  - Forgot Screen Time passcode
  - Reset Screen Time passcode
  - Screen Time password forgot
  - 屏幕使用时间密码忘了
  - 屏幕时间密码忘记
errorMessages: []
officialTerms:
  - 屏幕使用时间
  - 锁定屏幕时间设置
  - 更改屏幕使用时间密码
  - 屏幕使用时间密码恢复
  - 家人共享
communityTerms:
  - 家长控制密码
  - 屏幕时间锁
difficulty: Quick
estimatedTime: 5-15 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: reset-own-screen-time-passcode
    title: 重设自己设备的屏幕使用时间密码
    summary: 在“设置 > 屏幕使用时间”中选择更改密码，并用设置恢复时绑定的 Apple 账户验证。
    kind: recommended
    steps:
      - 在 iPhone 或 iPad 上打开“设置”App。
      - 轻点“屏幕使用时间”。
      - 轻点“更改屏幕使用时间密码”，再轻点一次“更改屏幕使用时间密码”。
      - 按提示输入用于设置屏幕使用时间密码恢复的 Apple 账户邮箱地址和密码。
      - 输入新的屏幕使用时间密码，并再次输入确认。
      - 如果同一 Apple 账户开启了“在设备之间共享”，重设后的屏幕使用时间密码会同步到这些设备。
    verificationLevel: Official
    sourceIds:
      - apple-forgot-screen-time-passcode
    warnings: []
    limitations:
      - 必须使用当初设置屏幕使用时间密码恢复时使用的同一 Apple 账户；它可能不同于当前登录设备的 Apple 账户。
      - 如果当初跳过了屏幕使用时间密码恢复，官方文章没有提供 Apple 可代查原密码的路径。
  - id: reset-child-screen-time-passcode
    title: 重设孩子设备的屏幕使用时间密码
    summary: 使用家庭组织者自己的设备进入孩子的屏幕使用时间设置，而不是直接在孩子设备上重设。
    kind: recommended
    steps:
      - 先将家人共享群组中的设备更新到当前可用的软件版本。
      - 在家庭组织者的 iPhone 或 iPad 上打开“设置”App。
      - 轻点“屏幕使用时间”，在“家人”下选择孩子姓名。
      - 在“限制”下轻点“管理屏幕使用时间”。
      - 轻点“更改屏幕使用时间密码”，再轻点一次“更改屏幕使用时间密码”。
      - 输入新的屏幕使用时间密码，并再次输入确认。
      - 如果使用 Mac 管理孩子，进入“系统设置 > 屏幕使用时间”，选择对应家庭成员后再管理屏幕使用时间密码。
    verificationLevel: Official
    sourceIds:
      - apple-forgot-screen-time-passcode
      - apple-iphone-screen-time-passcode-guide
      - apple-mac-screen-time-passcode-guide
    warnings: []
    limitations:
      - 使用家人共享管理孩子 Apple 账户时，Apple 要求由家庭组织者在自己的设备上重设，不是在孩子设备上直接处理。
      - 如果看不到家庭成员，先确认家庭组织者已登录 Apple 账户并已设置家人共享。
  - id: cannot-reset-screen-time-passcode
    title: 无法重设时核对账户和恢复条件
    summary: 重点确认 Apple 账户是否就是当初设置恢复用的账户；Apple 无法提供遗忘的屏幕使用时间密码。
    kind: escalation
    steps:
      - 询问顾客当初设置屏幕使用时间密码恢复时使用的是哪个 Apple 账户邮箱或电话号码。
      - 如果 Apple 账户密码也忘记，先按 Apple 账户密码重设流程处理。
      - 如果是孩子的屏幕使用时间，确认当前操作者是否为家庭组织者，且正在自己的设备上管理孩子。
      - 如果仍无法重设，记录设备、系统版本、家庭成员关系、当前登录 Apple 账户和曾尝试的账户，再联系 Apple 支持。
    verificationLevel: Official
    sourceIds:
      - apple-forgot-screen-time-passcode
      - apple-set-screen-time-passcode
      - apple-forgot-apple-account-password
    warnings:
      - 不要让顾客分享 Apple 账户密码、孩子账户密码或屏幕使用时间密码。
      - 不要把忘记屏幕使用时间密码误判成忘记设备锁屏密码；抹掉设备不是屏幕使用时间密码的第一步。
    limitations:
      - Apple 明确强调需要使用设置恢复时的同一 Apple 账户；如果账户信息无法确认，可能无法移除或重设屏幕使用时间密码。
warnings:
  - 不要让顾客分享 Apple 账户密码、孩子账户密码或屏幕使用时间密码。
  - 不要把忘记屏幕使用时间密码误判成忘记设备锁屏密码；抹掉设备不是屏幕使用时间密码的第一步。
limitations:
  - 官方重设路径依赖当初设置屏幕使用时间密码恢复时使用的 Apple 账户，或依赖家庭组织者权限。
  - 菜单名称可能随 iOS、iPadOS 或 macOS 版本变化。
sources:
  - id: apple-forgot-screen-time-passcode
    title: If you forgot the Screen Time passcode for an iPhone or iPad
    url: https://support.apple.com/en-us/102677
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-iphone-screen-time-passcode-guide
    title: Create, manage, and keep track of a Screen Time passcode on iPhone
    url: https://support.apple.com/guide/iphone/create-manage-track-a-screen-time-passcode-iph272b4c4bd/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-mac-screen-time-passcode-guide
    title: Set, change or remove a Screen Time passcode on Mac
    url: https://support.apple.com/guide/mac-help/set-change-remove-a-screen-time-passcode-mac-mchl336af525/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-set-screen-time-passcode
    title: How to set a Screen Time passcode on an iPhone or iPad
    url: https://support.apple.com/en-us/126533
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: 2026-06-12
    official: true
  - id: apple-forgot-apple-account-password
    title: If you forgot your Apple Account password
    url: https://support.apple.com/en-us/102656
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-14
lastUpdatedAt: 2026-07-14
createdAt: 2026-07-14
relatedArticles:
  - screen-time-limits-not-blocking
  - screen-time-requests-not-working
  - apple-account-verification-failed
popular: true
---

# 忘记屏幕使用时间密码，无法修改限制

顾客说“屏幕使用时间密码忘记了”时，先不要按锁屏密码或刷机处理。屏幕使用时间密码是用来锁定屏幕时间和家长控制设置的四位密码；Apple 的官方重设路径取决于这是自己的设备，还是家人共享中孩子的设备。

---

## 症状

- “屏幕使用时间密码忘记了。”
- “想关 App 限额，但系统要屏幕时间密码。”
- “孩子的屏幕时间密码不知道是谁设的。”
- “Apple ID 密码知道，但改不了屏幕使用时间。”
- “换设备后屏幕时间密码也同步过来了。”

---

## 可能原因

1. **忘记的是屏幕使用时间密码，不是设备锁屏密码**
   - 设备锁屏密码用于解锁 iPhone、iPad 或 Mac；屏幕使用时间密码用于防止别人更改屏幕时间限制。
2. **需要用设置恢复时绑定的 Apple 账户验证**
   - Apple 建议设置屏幕使用时间密码恢复；忘记密码时，需要使用当初添加到恢复中的同一 Apple 账户。
3. **孩子设备需要由家庭组织者重设**
   - 使用家人共享管理孩子 Apple 账户时，Apple 要求家庭组织者在自己的设备上重设孩子的屏幕使用时间密码。
4. **当前登录 Apple 账户可能不是当初设置恢复的账户**
   - Apple 说明，如果无法重设，要确认使用的是当初设置屏幕使用时间密码时使用的同一 Apple 账户；这可能不同于设备当前登录的账户。
5. **多设备共享会同步新的屏幕使用时间密码**
   - Apple 说明，如果开启“在设备之间共享”，重设后的屏幕使用时间密码会自动更新到这些设备。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先确认顾客忘记的是**屏幕使用时间密码**，不是 iPhone、iPad 或 Mac 的登录/锁屏密码。
2. 如果是自己的 iPhone 或 iPad，打开**设置 > 屏幕使用时间 > 更改屏幕使用时间密码 > 更改屏幕使用时间密码**。
3. 按提示输入当初用于设置屏幕使用时间密码恢复的 Apple 账户邮箱地址和密码。
4. 输入新的屏幕使用时间密码，并再次输入确认。
5. 如果是孩子的 iPhone 或 iPad，由家庭组织者在自己的设备上打开**设置 > 屏幕使用时间**，在“家人”下选择孩子姓名。
6. 进入**管理屏幕使用时间 > 更改屏幕使用时间密码**，再设置新的屏幕使用时间密码。
7. 如果使用 Mac 管理孩子，进入**系统设置 > 屏幕使用时间**，选择家庭成员后管理屏幕使用时间密码。
8. 重设前后，将家人共享群组中的设备更新到当前可用的软件版本，避免屏幕使用时间设置同步异常。
9. 如果 Apple 账户密码也忘记，先走 Apple 账户密码重设流程；不要把 Apple 账户密码、屏幕使用时间密码和设备锁屏密码混为同一个问题。

参考来源：

- [Apple Support: If you forgot the Screen Time passcode for an iPhone or iPad](https://support.apple.com/en-us/102677)
- [iPhone User Guide: Create, manage, and keep track of a Screen Time passcode](https://support.apple.com/guide/iphone/create-manage-track-a-screen-time-passcode-iph272b4c4bd/ios)
- [Mac User Guide: Set, change or remove a Screen Time passcode on Mac](https://support.apple.com/guide/mac-help/set-change-remove-a-screen-time-passcode-mac-mchl336af525/mac)
- [Apple Support: How to set a Screen Time passcode on an iPhone or iPad](https://support.apple.com/en-us/126533)
- [Apple Support: If you forgot your Apple Account password](https://support.apple.com/en-us/102656)

---

## 零售排查流程

1. 复述确认：“你忘的是屏幕使用时间/家长控制密码，不是解锁手机或电脑的密码，对吗？”
2. 问清场景：自己的设备、孩子设备、家人共享管理，还是别人以前设置的限制。
3. 如果是自己的设备，让顾客尝试屏幕使用时间密码重设入口，并准备当初设置恢复用的 Apple 账户。
4. 如果是孩子设备，确认面前操作的人是否为家庭组织者；不是组织者时不要在孩子设备上反复尝试。
5. 如果系统提示 Apple 账户不匹配，询问是否曾用其他 Apple 账户、家庭成员账户或孩子账户设置过屏幕使用时间密码恢复。
6. 如果 Apple 账户密码也忘记，先处理 Apple 账户密码重设，再回到屏幕使用时间密码。
7. 如果顾客其实无法解锁设备，改按锁屏密码/设备不可用流程处理，并明确说明那条路径可能抹掉设备。
8. 处理完成后建议顾客记录恢复用 Apple 账户，并避免把屏幕使用时间密码告诉需要被限制的孩子。

---

## 升级处理

联系 Apple 支持：

- 使用同一 Apple 账户仍无法重设屏幕使用时间密码。
- 家庭组织者在自己的设备上看不到孩子或无法管理孩子的屏幕使用时间。
- 设备、家人共享和 Apple 账户状态都正确，但新密码没有同步到其他设备。

前往 Apple Store 或授权维修点：

- 设备同时存在无法登录 Apple 账户、无法联网、系统设置无法保存，或设备锁屏密码也忘记的问题。

维修或更换硬件：

- 单纯忘记屏幕使用时间密码通常不是硬件维修问题。只有另有独立硬件故障时才进入维修路径。

---

## 相关问题

- [屏幕使用时间限额到时仍能继续使用](/recipes/Family%20Sharing/screen-time-limits-not-blocking)
- [屏幕使用时间请求收不到或批准后不生效](/recipes/Family%20Sharing/screen-time-requests-not-working)
- [Apple 账户验证失败或无法登录](/recipes/Apple%20ID/apple-account-verification-failed)
- iPhone 不可用、安全锁定或忘记锁屏密码

---

## 标签

- 设备：iPhone、iPad、Mac
- 系统：iOS、iPadOS、macOS
- 功能：屏幕使用时间、家人共享、家长控制
- 网络：Apple 账户验证和家人共享同步可能需要联网
- Apple ID：必需
- 连续互通：在设备之间共享会同步屏幕使用时间密码
- 隐私：儿童账户、家长控制、Apple 账户
- 维修：通常不涉及
- 配件：不适用

---

## 元信息

- 最后更新：2026-07-14
- 来源数量：5
- 验证级别：Apple 官方
- 支持系统：当前 iOS、iPadOS、macOS 版本
- 可信度：高
