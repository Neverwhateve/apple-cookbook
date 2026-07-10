---
title: 屏幕使用时间请求收不到或批准后不生效
slug: screen-time-requests-not-working
device:
  - iPhone
  - iPad
  - Mac
  - Apple Watch
category: Family Sharing
tags:
  - Family Sharing
  - Screen Time
  - App Limits
  - Messages
  - Apple ID
  - Notifications
aliases:
  - Screen Time approvals not working
  - Screen Time requests not showing
  - Screen Time request approved but not working
  - App exception request not received
  - Ask for More Time not working
  - 屏幕使用时间请求收不到
  - 屏幕时间批准后没反应
  - 孩子请求更多时间家长收不到
verification: Official
difficulty: Moderate
updated: 2026-07-10
official_sources:
  - https://support.apple.com/zh-cn/125399
  - https://support.apple.com/zh-cn/108806
  - https://support.apple.com/zh-cn/118233
community_sources:
  - https://discussions.apple.com/thread/254278383
  - https://discussions.apple.com/thread/255204888
  - https://www.reddit.com/r/applehelp/comments/1l87ca5/screen_time_approvals_not_working/
status: canonical
popular: true
---

# 屏幕使用时间请求收不到或批准后不生效

孩子点了“请求更多时间”或请求 App 例外后，家长没有收到信息或通知；也可能家长已经批准，但孩子设备仍然打不开 App。

---

## 症状

- “孩子请求更多时间，我这边没有弹窗。”
- “信息里收到了请求，但点批准后孩子那边还是锁着。”
- “以前 Apple Watch 可以批准，现在点了没反应。”
- “请求只在信息里出现，不再像屏幕时间通知那样弹出。”
- “App 限额能限制，但批准更多时间不生效。”
- “孩子那边一直显示等待批准。”

---

## 可能原因

1. **请求现在通过“信息”传递**
   - Apple 说明，孩子发送 App 例外请求后，家长会在“信息”App 中收到信息，并可从信息通知或“信息”App 批准或拒绝。
2. **家人共享设备没有都更新**
   - Apple 要求保持家人共享群组中的所有设备均为最新软件版本，才能让屏幕使用时间设置和其他家长控制按预期工作。
3. **家长 Apple 账户邮箱没有加入 iMessage 信息**
   - Apple 明确要求家长可以使用自己的 Apple 账户邮箱通过 iMessage 信息发送和接收信息。
4. **家长近期没有正常使用 iMessage 信息**
   - Apple 说明，若要通过“信息”接收这类请求，需要在过去 30 天内使用 iMessage 信息发送和接收过信息。
5. **信息通知或 iCloud 通讯录不同步**
   - 如果“信息”通知关闭，或 iCloud 通讯录没有同步到接收设备，请求可能不会按预期显示。
6. **顾客把三类请求混在一起**
   - “购买前询问”、App 年龄分级例外和“请求更多时间”都可能表现为家长批准请求，但入口、限制类型和排查重点不同。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先确认孩子发起的是哪一种请求：购买或下载请求、App 年龄分级例外，还是 App 限额后的更多时间请求。
2. 将家长设备和孩子设备都更新到当前可用的最新系统版本。
3. 在家长设备上打开“信息”，确认是否已经收到孩子的请求信息。
4. 在“设置” > “信息”中确认 iMessage 信息可用，并且家长的 Apple 账户电子邮件地址可以用于发送和接收。
5. 如果家长长期没有用过 iMessage 信息，先用 iMessage 信息正常发送和接收一条信息，再让孩子重新发送请求。
6. 打开“信息”的通知，避免请求到了但没有提醒。
7. 确认 iCloud 通讯录已经同步到家长想接收请求的设备。
8. 如果孩子在身边，可在孩子设备上打开 App Store 或对应请求页面，使用“亲自批准”完成 App 例外请求。
9. 如果批准后 App 仍被限制，打开**设置 > 屏幕时间 > 内容与隐私限制 > App Store、媒体、网页与游戏 > App**，查看已批准的 App 例外是否仍在列表中；必要时移除后让孩子重新请求。
10. 如果问题其实是购买或下载 App 请求收不到，改按“购买前询问”流程检查家人共享、专注模式、设备名称、联系人名片和购买账户。

参考来源：

- [Apple 支持：如何管理孩子的 App 例外请求](https://support.apple.com/zh-cn/125399)
- [Apple 支持：使用“屏幕时间”来管理孩子的 iPhone 或 iPad](https://support.apple.com/zh-cn/108806)
- [Apple 支持：如果“购买前询问”无法正常使用](https://support.apple.com/zh-cn/118233)

---

## 已验证的非官方处理思路

非官方

### 重发请求前重启家长和孩子设备

- 来源：Apple Support Community 和 Reddit 中常见的家庭共享通知排查动作；Apple 的 App 例外请求文章没有把重启列为核心步骤。
- 成功概率：未知到中等，适合请求链路短暂卡住时尝试。
- 风险：低。
- 备注：重启后仍要回到官方路径，确认软件版本、iMessage 信息、信息通知和 iCloud 通讯录。
- 验证级别：较可能

### 临时关闭再打开 iMessage 信息

- 来源：Apple Support Community 中有用户报告关闭 iMessage 信息、等待片刻后重新打开，恢复了部分屏幕使用时间请求批准能力。
- 成功概率：未知。该方法在同一讨论中并非对所有用户有效。
- 风险：中等。短时间关闭 iMessage 信息可能影响信息收发、设备同步和双重认证相关体验。
- 备注：只作为官方检查完成后的后段尝试；不要把它说成 Apple 官方建议。
- 验证级别：较可能

---

## 零售排查流程

1. 让孩子现场重新发起请求，确认家长设备是完全没收到，还是收到后批准不生效。
2. 先分流：购买前询问、App 例外请求、更多时间请求，分别记录触发 App、孩子设备、家长接收设备和限制类型。
3. 检查双方系统版本，优先更新后再继续测试。
4. 检查家长设备“信息”App、iMessage 信息收发地址、信息通知和 iCloud 通讯录同步。
5. 如果 App 例外请求到达但家长设备批准失败，让孩子在现场使用“亲自批准”验证限制本身是否可解除。
6. 如果只有 Apple Watch 上批准失败，但 iPhone 或 Mac 可以批准，先指导顾客用 iPhone 或 Mac 完成请求，并记录 watchOS、iOS 和现象。
7. 如果所有设备都无法收到或批准，按 Apple 支持升级处理，不要删除儿童账号或重建家庭群组。

---

## 升级处理

联系 Apple 支持：

- 软件、iMessage 信息、通知、通讯录和家人共享都正确，但请求长期收不到。
- 家长能收到请求，但批准后孩子设备仍不解锁。
- 请求只在 Apple Watch、Mac 或某一台设备上失败，需要确认具体系统版本行为。
- 顾客需要处理儿童账户、出生日期、地区规则或家庭成员移除问题。

前往 Apple Store 或授权维修点：

- 设备同时存在无法联网、无法登录 Apple 账户、信息完全无法收发，或系统设置无法保存的问题。

维修或更换硬件：

- 单纯屏幕使用时间请求问题通常不是硬件维修问题。只有独立诊断显示网络、存储或其他硬件异常时才考虑维修路径。

---

## 相关问题

- [购买前询问请求不显示](/recipes/Family%20Sharing/ask-to-buy-requests-not-showing)
- [家长看不到儿童账号屏幕使用时间明细](/recipes/Family%20Sharing/screen-time-child-usage-not-showing)
- [屏幕使用时间限额到时仍能继续使用](/recipes/Family%20Sharing/screen-time-limits-not-blocking)
- App 限额到时间但没有阻止
- 儿童账号无法移出家人共享

---

## 标签

- 设备：iPhone、iPad、Mac、Apple Watch
- 系统：iOS、iPadOS、macOS、watchOS
- 功能：家人共享、屏幕使用时间、App 限额、信息
- 网络：需要 Apple 服务和 iMessage 信息
- Apple ID：必需
- 连续互通：多设备请求接收可能相关
- 隐私：儿童账户、家长控制
- 维修：通常不涉及
- 配件：不适用

---

## 元信息

- 最后更新：2026-07-10
- 来源数量：6
- 验证级别：Apple 官方
- 支持系统：当前 iOS、iPadOS、macOS、watchOS 版本
- 可信度：高
