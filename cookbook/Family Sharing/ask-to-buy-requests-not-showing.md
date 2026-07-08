---
title: 购买前询问请求不显示
slug: ask-to-buy-requests-not-showing
device:
  - iPhone
  - iPad
  - Mac
category: Family Sharing
tags:
  - Family Sharing
  - Ask to Buy
  - Screen Time
  - Apple ID
  - Notifications
aliases:
  - Ask to Buy requests not showing
  - Ask to Buy not working
  - Not receiving Ask to Buy requests
  - 家人共享购买前询问收不到
  - 孩子下载 App 请求收不到
  - 家长收不到购买请求
verification: Official
difficulty: Moderate
updated: 2026-07-09
official_sources:
  - https://support.apple.com/zh-cn/118233
  - https://support.apple.com/zh-cn/guide/iphone/iph00ba7d632/ios
  - https://support.apple.com/zh-cn/guide/ipad/ipad02e876e6/ipados
community_sources:
  - https://discussions.apple.com/thread/8444829
  - https://discussions.apple.com/thread/254521556
  - https://discussions.apple.com/thread/254509339
status: canonical
popular: true
---

# 购买前询问请求不显示

孩子点了购买、下载 App 或请求更多权限后，家长设备没有弹出“购买前询问”通知，或者请求只出现在某一台设备上。

---

## 症状

- “孩子已经点了请求，但我手机没有通知。”
- “购买前询问以前能收到，最近突然收不到。”
- “请求只到 Mac，不到 iPhone。”
- “孩子说已经发送了，家长端没有任何弹窗。”
- “关掉购买前询问就能下载，打开后请求卡住。”

---

## 可能原因

1. **家人共享或购买前询问没有正确开启**
   - Apple 要求先设置家人共享，再为儿童打开“购买前询问”。
2. **家长或孩子设备软件版本过旧**
   - Apple 官方排查的第一步包括确认家长设备和儿童设备都安装最新版软件。
3. **专注模式或通知中心没有显示即时通知**
   - 如果家长设备打开专注模式，购买请求这类即时通知可能不会正常提醒。
4. **家长设备和孩子设备名称相同**
   - Apple 明确要求家长和儿童设备采用不同名称，以减少请求路由混乱。
5. **孩子联系人名片信息不匹配**
   - Apple 说明儿童联系人名片需要包含正确姓名和 Apple 账户电子邮件地址或电话号码，帮助系统通过“信息”发送和接收请求。
6. **购买所用 Apple 账户和家人共享账户不一致**
   - 孩子设备如果在 App Store 或媒体购买中使用了另一个 Apple 账户，家长可能收不到预期请求。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 在家长设备上确认已经设置“家人共享”，并且孩子在家庭成员列表里。
2. 在家长设备上进入“设置” > 家庭成员 > 孩子姓名，确认“购买前询问”已打开。
3. 将家长设备和孩子设备都更新到当前可用的最新系统版本。
4. 如果家长设备打开了专注模式，检查允许的通知，或临时关闭专注模式后重新发送请求。
5. 检查家长设备和孩子设备名称是否不同。必要时进入“设置” > “通用” > “关于本机”修改名称。
6. 检查孩子的联系人名片，确认姓名、Apple 账户电子邮件地址或电话号码正确。
7. 在家长设备的“信息”或通知中心里查找请求。Apple 说明购买请求也可能通过“信息”显示。
8. 检查孩子用于购买项目的 Apple 账户是否属于这个家人共享群组。

参考来源：

- [Apple 支持：如果“购买前询问”无法正常使用](https://support.apple.com/zh-cn/118233)
- [iPhone 使用手册：在 iPhone 上使用“家人共享”设置家长控制](https://support.apple.com/zh-cn/guide/iphone/iph00ba7d632/ios)
- [iPad 使用手册：在 iPad 上使用“家人共享”设置家长控制](https://support.apple.com/zh-cn/guide/ipad/ipad02e876e6/ipados)

---

## 已验证的非官方处理思路

非官方

### 重新发送请求前重启双方设备

- 来源：Apple Support Community 多个讨论中，用户常把重启作为已尝试或临时恢复手段；Apple 官方 Ask to Buy 文章没有把重启列为核心步骤。
- 成功概率：未知到中等，适合通知链路短暂异常时尝试。
- 风险：低。
- 备注：不要用重启代替官方检查。重启后仍要确认家人共享、专注模式、设备名称、联系人名片和购买账户。
- 验证级别：较可能

### 关闭后重新打开“购买前询问”

- 来源：Apple Support Community 中反复出现的用户排查动作，但不是 Apple 官方文章的明确建议。
- 成功概率：未知。
- 风险：中等。短暂关闭期间，孩子可能无需批准即可下载或购买符合条件的项目。
- 备注：只有在家长理解风险、并能立即重新打开时才考虑。不要在未解释风险时建议顾客关闭管控功能。
- 验证级别：较可能

---

## 零售排查流程

1. 先确认顾客的问题是**收不到购买请求**，还是**屏幕使用时间请求不生效**、**App 限额不阻止**、**孩子已经能绕过限制**。
2. 让孩子现场发送一个免费 App 下载请求，确认家长设备是否即时收到通知。
3. 检查家人共享成员关系和“购买前询问”开关。
4. 检查双方系统版本、专注模式、通知中心和“信息”。
5. 检查双方设备名称，避免家长和孩子设备重名。
6. 检查孩子联系人名片和购买所用 Apple 账户。
7. 如果请求只出现在 Mac 或另一台设备上，记录能收到的设备、收不到的设备、登录账户和系统版本，再转 Apple 支持。
8. 不要直接删除儿童账号、重建家庭或修改出生日期。那些动作会影响购买、数据和家庭管理，应作为升级处理。

---

## 升级处理

联系 Apple 支持：

- 家人共享、购买前询问、系统版本、专注模式、设备名称、联系人名片和购买账户都正确，但仍长期收不到请求。
- 请求只到某一台家长设备，另一台同账户设备始终收不到。
- 涉及儿童账号出生日期、家庭成员无法移除、重复儿童账号或购买记录异常。

前往 Apple Store 或授权维修点：

- 设备同时存在无法联网、无法登录 Apple 账户、通知完全不工作，或系统设置无法保存的问题。

维修或更换硬件：

- 单纯“购买前询问”请求不显示通常不是硬件维修问题。只有独立诊断确认网络、存储或其他硬件异常时才考虑维修路径。

---

## 相关问题

- [家长看不到儿童账号屏幕使用时间明细](/recipes/Family%20Sharing/screen-time-child-usage-not-showing)
- [Apple 账户验证失败](/recipes/Apple%20ID/apple-account-verification-failed)
- 儿童账号无法移出家人共享
- 屏幕使用时间请求不生效

---

## 标签

- 设备：iPhone、iPad、Mac
- 系统：iOS、iPadOS、macOS
- 功能：家人共享、购买前询问、通知、信息
- 网络：需要 Apple 服务同步
- Apple ID：必需
- 连续互通：多设备通知可能相关
- 隐私：儿童账户、家长控制
- 维修：通常不涉及
- 配件：不适用

---

## 元信息

- 最后更新：2026-07-09
- 来源数量：6
- 验证级别：Apple 官方
- 支持系统：当前 iOS、iPadOS、macOS 版本
- 可信度：高
