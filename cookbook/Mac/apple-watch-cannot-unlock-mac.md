---
schemaVersion: 2
id: apple-watch-cannot-unlock-mac
title: Apple Watch 无法自动解锁 Mac
slug: apple-watch-cannot-unlock-mac
summary: >-
  佩戴并解锁 Apple Watch 后，Mac 从睡眠唤醒仍要求输入密码，或“使用 Apple Watch 解锁 App 和 Mac”的设置无法打开。先区分首次开机、重新启动或退出登录后的正常密码要求，再检查相同 Apple 账户、双重认证、Wi-Fi、蓝牙、手表密码和距离。
symptoms:
  - “Apple Watch 不能解锁 Mac。”
  - “Mac 唤醒后还是要输入密码。”
  - “使用 Apple Watch 解锁 App 和 Mac”选项打不开或消失。
  - “Apple Watch 明明戴在手上，Mac 还是锁着。”
  - “以前可以自动解锁，更新后失效。”
  - “Apple Watch 可以解锁 iPhone，但不能解锁 Mac。”
  - “Mac 能看到手表，但自动解锁没有反应。”
devices:
  - Mac
  - Apple Watch
platforms:
  - macOS
  - watchOS
systemVersions:
  - macOS 13 或更高版本
  - macOS 10.13 或更高版本
categories:
  - Mac
tags:
  - Apple Watch
  - 自动解锁
  - Mac
  - macOS
  - 连续互通
keywords:
  - Apple Watch 解锁 Mac
  - 自动解锁
aliases:
  - Apple Watch cannot unlock Mac
  - Apple Watch unlock Mac not working
  - Apple Watch 自动解锁 Mac 失败
  - Mac 唤醒仍要求密码
  - Apple Watch 解锁 App 和 Mac
errorMessages:
  - 使用 Apple Watch 解锁 App 和 Mac
  - 允许 Apple Watch 解锁 Mac
officialTerms:
  - 自动解锁
  - 使用 Apple Watch 解锁 App 和 Mac
communityTerms: []
difficulty: Quick
estimatedTime: 10 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: apple-watch-mac-auto-unlock-checks
    title: 按 Apple 官方条件重新启用自动解锁
    summary: 先排除正常的密码场景，再重新检查设置和两台设备的连接条件。
    kind: recommended
    steps:
      - 如果 Mac 刚开机、刚重新启动或刚退出登录，先手动输入一次 Mac 登录密码；Apple 说明这些场景下首次登录必须使用密码，不能当作自动解锁故障。
      - 确认 Apple Watch 戴在手腕上、处于已解锁状态，并且靠近 Mac。
      - 在 Mac 和 Apple Watch 上确认登录的是同一个 Apple 账户，并且该账户已开启双重认证。
      - 确认 Mac 和 Apple Watch 的 Wi-Fi 与蓝牙均已打开。
      - 确认 Apple Watch 已设置密码；关闭手表密码会使通过 Apple Watch 解锁 Mac 等功能不可用。
      - 在 Mac 上打开苹果菜单 > 系统设置 > 触控 ID 与密码（部分机型显示“登录密码”），在 Apple Watch 区域打开手表旁的自动解锁选项。
      - 如果使用 macOS 12 或更早版本，打开苹果菜单 > 系统偏好设置 > 安全性与隐私 > 通用，选择“使用你的 Apple Watch 解锁 App 和 Mac”或“允许 Apple Watch 解锁 Mac”。
      - 佩戴已解锁的 Apple Watch，按键盘任意键或打开 Mac 笔记本电脑上盖，测试从睡眠唤醒是否自动解锁。
      - 如果仍无效，在 Mac 上关闭 Apple Watch 自动解锁设置，重新启动 Mac，再重新打开该设置。
      - 安装 Mac 和 Apple Watch 可用的最新 macOS 与 watchOS 更新后再次测试。
      - 确认 Mac 没有使用互联网共享或屏幕共享；Apple 将这两项列为自动解锁异常时需要检查的条件。
      - 若设置仍无法启用或持续失败，记录 Mac 型号、macOS 版本、Apple Watch 型号和 watchOS 版本，联系 Apple 支持进一步确认系统要求。
    verificationLevel: Official
    sourceIds:
      - official-apple-watch-unlock-mac
      - official-mac-watch-unlock-requests
      - official-watch-unlock-mac-guide
    warnings: []
    limitations:
      - 自动解锁只适用于符合 Apple 系统要求的 Mac 和 Apple Watch。
      - 自动解锁不能跳过 Mac 开机、重新启动或退出登录后的首次密码登录。
warnings:
  - 不要向任何人提供 Apple 账户密码或 Mac 登录密码。
limitations:
  - 菜单名称可能随 macOS 版本和 Mac 机型变化。
  - Apple Watch 自动解锁不等于用手表代替所有 Mac 登录安全检查。
sources:
  - id: official-apple-watch-unlock-mac
    title: 通过 Apple Watch 解锁 Mac
    url: https://support.apple.com/zh-cn/102442
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: 2026-05-15
    official: true
  - id: official-mac-watch-unlock-requests
    title: 使用 Apple Watch 解锁你的 Mac 和批准请求
    url: https://support.apple.com/zh-cn/guide/mac-help-cn/mchl4f800a42/mac
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
  - id: official-watch-unlock-mac-guide
    title: 使用 Apple Watch 解锁 Mac
    url: https://support.apple.com/zh-cn/guide/watch/apd4200675b8/26/watchos/26
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-18
lastUpdatedAt: 2026-07-18
createdAt: 2026-07-18
relatedArticles: []
popular: false
---

# Apple Watch 无法自动解锁 Mac

佩戴并解锁 Apple Watch 后，Mac 从睡眠唤醒仍要求输入密码，或“使用 Apple Watch 解锁 App 和 Mac”的设置无法打开。先区分首次开机、重新启动或退出登录后的正常密码要求，再检查相同 Apple 账户、双重认证、Wi-Fi、蓝牙、手表密码和距离。

---

## 症状

- “Apple Watch 不能解锁 Mac。”
- “Mac 唤醒后还是要输入密码。”
- “使用 Apple Watch 解锁 App 和 Mac”选项打不开或消失。
- “Apple Watch 明明戴在手上，Mac 还是锁着。”
- “以前可以自动解锁，更新后失效。”
- “Apple Watch 可以解锁 iPhone，但不能解锁 Mac。”
- “Mac 能看到手表，但自动解锁没有反应。”

## 先排除正常情况

Apple 官方说明，Mac 开机、重新启动或退出登录后的第一次登录必须手动输入 Mac 登录密码。只有完成这次登录后，Mac 从睡眠唤醒时才可能使用已佩戴且已解锁的 Apple Watch 自动登录。

## Apple 官方方案

验证级别：Apple 官方

1. 确认 Apple Watch 戴在手腕上、处于已解锁状态，并且靠近 Mac。
2. 在 Mac 和 Apple Watch 上确认登录的是同一个 Apple 账户，并且该账户已开启双重认证。
3. 确认 Mac 和 Apple Watch 的 Wi-Fi 与蓝牙均已打开。
4. 确认 Apple Watch 已设置密码；关闭手表密码会使通过 Apple Watch 解锁 Mac 等功能不可用。
5. 在 Mac 上打开“系统设置”>“触控 ID 与密码”（部分机型显示“登录密码”），在 Apple Watch 区域打开手表旁的自动解锁选项。
6. 如果使用 macOS 12 或更早版本，打开“系统偏好设置”>“安全性与隐私”>“通用”，选择“使用你的 Apple Watch 解锁 App 和 Mac”或“允许 Apple Watch 解锁 Mac”。
7. 佩戴已解锁的 Apple Watch，按键盘任意键或打开 Mac 笔记本电脑上盖，测试从睡眠唤醒是否自动解锁。
8. 如果仍无效，在 Mac 上关闭 Apple Watch 自动解锁设置，重新启动 Mac，再重新打开该设置。
9. 安装 Mac 和 Apple Watch 可用的最新 macOS 与 watchOS 更新后再次测试。
10. 确认 Mac 没有使用互联网共享或屏幕共享；Apple 将这两项列为自动解锁异常时需要检查的条件。
11. 若设置仍无法启用或持续失败，记录 Mac 型号、macOS 版本、Apple Watch 型号和 watchOS 版本，联系 Apple 支持进一步确认系统要求。

## 可能原因

- Mac 正处于开机、重新启动或退出登录后的首次登录阶段。
- Apple Watch 未佩戴、已锁定、离 Mac 太远或两台设备的 Wi-Fi、蓝牙未同时打开。
- Mac 与 Apple Watch 使用了不同的 Apple 账户，或账户未开启双重认证。
- Apple Watch 没有设置密码，或 Mac 上的自动解锁开关被关闭。
- Mac 正在使用互联网共享或屏幕共享，或者系统版本与设备不满足自动解锁要求。

## 零售排查流程

1. 先确认顾客是在 Mac 从睡眠唤醒后遇到问题，还是刚开机、重启或退出登录后首次登录。
2. 让顾客先手动登录一次，再佩戴并解锁 Apple Watch，确认手表靠近 Mac。
3. 逐项确认同一 Apple 账户、双重认证、Wi-Fi、蓝牙和 Apple Watch 密码。
4. 检查 Mac 上“触控 ID 与密码”或“登录密码”中的 Apple Watch 自动解锁开关。
5. 关闭该开关，重启 Mac，再打开开关并从睡眠唤醒测试。
6. 若仍失败，记录 Mac 型号、macOS 版本、Apple Watch 型号和 watchOS 版本，不要关闭密码或使用第三方解锁工具。

## 升级处理

如果完成官方步骤后仍不能启用自动解锁，或设置选项持续消失，停止反复修改账户与安全设置，保留设备型号、系统版本、错误画面和复现时机，联系 Apple 支持确认兼容性与系统状态。

## 相关问题

- 如果问题是 Apple Watch 无法与 iPhone 连接或配对，请参阅 Apple Watch 配对排查文章。
- 如果问题是 Mac 本身无法开机或黑屏，请参阅 Mac 无法开机排查文章。

## 风险与边界

- 不要为了绕过自动解锁而关闭 Apple Watch 密码、共享 Apple 账户或安装来路不明的解锁工具。
- 不要把开机、重启、退出登录后的首次密码要求误判成故障；这是 Apple 官方定义的安全流程。
- 菜单名称可能随 macOS 版本和 Mac 机型变化，无法看到选项时先核对系统版本与设备是否满足 Apple 的自动解锁要求。

## 参考来源

- [Apple 支持：通过 Apple Watch 解锁 Mac](https://support.apple.com/zh-cn/102442)
- [Mac 使用手册：使用 Apple Watch 解锁你的 Mac 和批准请求](https://support.apple.com/zh-cn/guide/mac-help-cn/mchl4f800a42/mac)
- [Apple Watch 使用手册：使用 Apple Watch 解锁 Mac](https://support.apple.com/zh-cn/guide/watch/apd4200675b8/26/watchos/26)
