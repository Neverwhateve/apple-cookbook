---
schemaVersion: 2
id: iphone-screen-recording-no-sound
title: iPhone 录屏没有声音、录不到麦克风或无法开始录制
slug: iphone-screen-recording-no-sound
summary: iPhone 录屏后没有声音、录不到自己的讲解、录屏按钮不见或无法开始时，先区分麦克风未打开、App 不允许录制、屏幕镜像冲突和 iPhone 麦克风本身异常。
symptoms:
  - iPhone 录屏没有声音
  - iPhone 屏幕录制没有声音
  - iPhone 录屏录不到自己的声音
  - iPhone 录屏麦克风打不开
  - iPhone 录屏按钮不见了
  - iPhone 录屏无法开始或自动停止
  - iPhone 录屏只有画面没有音频
devices:
  - iPhone
  - iPad
platforms:
  - iOS
  - iPadOS
systemVersions:
  - 当前 iOS 和 iPadOS；控制中心布局与控制名称可能随系统版本变化
categories:
  - iPhone
  - iPad
tags:
  - 录屏
  - 屏幕录制
  - 麦克风
  - 控制中心
  - 音频
keywords:
  - 屏幕录制没有声音
  - 麦克风
  - 控制中心
  - 屏幕镜像
  - App 权限
aliases:
  - iPhone screen recording no sound
  - iPhone screen recording audio not working
  - iPhone screen recording microphone not working
  - iPhone 录屏没声音
  - iPhone 录屏无声
errorMessages:
  - 录屏
  - 开始录制
  - 屏幕镜像
  - 麦克风
officialTerms:
  - 录屏
  - 控制中心
  - 麦克风
  - 屏幕镜像
communityTerms:
  - 录屏静音
  - 录屏没收音
  - 录屏只有画面
  - 录屏录不到人声
difficulty: Quick
estimatedTime: 3-10 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: enable-microphone-and-test
    title: 长按录屏控制并打开麦克风
    summary: Apple 的中文使用手册说明，制作带音频的录屏需要长按“录屏”按钮并打开“麦克风”。
    kind: recommended
    steps:
      - 从屏幕右上角向下轻扫打开“控制中心”。配备主屏幕按钮的机型从屏幕底部向上轻扫。
      - 找到“录屏”控制；如果没有，长按控制中心背景，轻点“添加控制”，再添加“录屏”。
      - 长按“录屏”按钮，轻点“麦克风”使其打开，再轻点“开始录制”。
      - 等待 3 秒倒计时后录制，停止后到“照片”App 的“录屏”媒体类型中播放。
    verificationLevel: Official
    sourceIds:
      - apple-screen-recording-support
      - apple-screen-recording-guide
    warnings:
      - 麦克风打开不保证每个 App 的内部音频都允许被录制。
    limitations:
      - Apple 没有承诺所有 App、通话或受保护内容都能录制音频。
  - id: rule-out-app-and-mirroring-restrictions
    title: 排除 App 限制和屏幕镜像冲突
    summary: 某些 App 可能不支持录制音频或视频，屏幕录制也不能与屏幕镜像同时使用。
    kind: alternative
    steps:
      - 退出屏幕镜像、AirPlay 或其他把 iPhone 画面输出到外部设备的功能。
      - 在主屏幕或“设置”页面做一段 5 秒测试。
      - 如果测试页有声音而目标 App 无声，优先判断为 App 或受保护内容限制。
      - 如果录屏一开始就停止，记录当时是否正在镜像或播放受限制内容。
    verificationLevel: Official
    sourceIds:
      - apple-screen-recording-support
      - apple-screen-recording-guide
    warnings:
      - 不要使用第三方工具绕过 App 的录制限制或录制受保护内容。
    limitations:
      - 仅凭录屏结果无法判断目标 App 的具体限制机制。
  - id: test-iphone-microphone
    title: 只有自己的声音异常时测试 iPhone 麦克风
    summary: 如果多个 App 和录屏都录不到自己的声音，应按 Apple 的麦克风排查方法区分开口堵塞、权限和硬件问题。
    kind: escalation
    steps:
      - 取下可能遮挡麦克风开口的保护壳或保护膜，并清除开口处可见碎屑。
      - 打开“语音备忘录”录音并播放，再用“相机”录制视频确认声音。
      - 如果只是某个 App 无法录音，前往“设置 > 隐私与安全性 > 麦克风”确认权限。
      - 如果多个 App 都没有自己的声音，记录测试结果并联系 Apple 支持或服务点。
    verificationLevel: Official
    sourceIds:
      - apple-microphone-not-working
    warnings:
      - 不要仅因一次录屏无声就抹掉 iPhone 或还原所有设置。
    limitations:
      - 本步骤不能远程确认麦克风硬件状态。
warnings:
  - 录屏可能包含通知、聊天内容、账户信息和其他敏感画面；分享前先检查视频。
  - 某些 App 可能不支持录制音频或视频，屏幕录制不能与屏幕镜像同时使用。
  - 录制通话、课程或他人声音前，应遵守适用的隐私、授权和平台规则。
limitations:
  - 本文只覆盖 iPhone 和 iPad 系统录屏，不覆盖 Mac、第三方录屏 App 或被 App 主动禁止的内容。
  - Apple 没有为所有 App 的内部音频、电话、FaceTime 或受保护媒体提供统一录制保证。
sources:
  - id: apple-screen-recording-support
    title: 如何在 iPhone 或 iPad 上录屏
    url: https://support.apple.com/zh-cn/102653
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: 2026-05-08
    official: true
  - id: apple-screen-recording-guide
    title: 在 iPhone 上录屏
    url: https://support.apple.com/zh-cn/guide/iphone/iph52f6e1987/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
  - id: apple-microphone-not-working
    title: 如果 iPhone 上的麦克风无法正常工作
    url: https://support.apple.com/zh-cn/101600
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: 2026-04-01
    official: true
lastVerifiedAt: 2026-07-18
lastUpdatedAt: 2026-07-18
createdAt: 2026-07-18
relatedArticles:
  - iphone-ipad-speaker-microphone-audio-not-working
  - iphone-ipad-app-crashes-not-opening
  - iphone-ipad-safari-cant-load-websites-crashes
popular: false
---

# iPhone 录屏没有声音、录不到麦克风或无法开始录制

录屏后只有画面没有声音，先不要把它当成扬声器故障。最常见的分流是：录屏控制没有打开麦克风、目标 App 不允许录制音频或视频，或者 iPhone 正在使用屏幕镜像。只有在多个 App 都录不到自己的声音时，才继续检查麦克风和权限。

## 症状

- 录屏视频能播放，但完全没有声音。
- 录屏没有录到自己的讲解或环境声。
- 录屏按钮在控制中心找不到。
- 录屏按钮点了没有开始，或刚开始就停止。
- 在一个 App 中无声，但其他页面录屏正常。

## 可能原因

1. 开始录屏前没有长按“录屏”控制并打开麦克风。
2. 目标 App 不支持录制音频或视频，或内容受到保护。
3. iPhone 正在使用屏幕镜像。

## Apple 官方方案

1. 先在主屏幕或“设置”页面做 5 秒测试，确认问题是否只发生在某个 App。
2. 打开控制中心，确认“录屏”控制存在；没有时添加它。
3. 长按“录屏”按钮，打开“麦克风”，再轻点“开始录制”。
4. 等待 3 秒倒计时，录制一段操作后停止。
5. 在“照片”App 的“录屏”媒体类型中播放结果。
6. 如果测试页有声音而目标 App 无声，检查该 App 是否不支持录制，或内容是否受保护。
7. 退出屏幕镜像或 AirPlay 后重试；Apple 说明屏幕录制不能与屏幕镜像同时使用。
8. 如果所有场景都录不到自己的声音，再测试语音备忘录、相机和麦克风权限。

## 不同结果怎么判断

### 只有某个 App 没有声音

这是 App 或内容限制的优先级更高。Apple 明确提醒，某些 App 可能不支持录制音频或视频。不要通过关闭系统安全设置或安装所谓“绕过限制”的工具来处理。

### 所有页面都没有自己的声音，但有画面

确认每次录制前都长按“录屏”并打开麦克风，然后用“语音备忘录”录音。如果语音备忘录和相机也没有清晰声音，按麦克风排查流程清洁开口、检查保护壳和 App 权限，并准备联系 Apple 支持。

### “录屏”控制不见了

打开控制中心，长按背景，轻点“添加控制”，从控制资源库添加“录屏”。添加一次后，后续录屏不需要重复添加。

### 录屏无法开始或很快停止

先停止屏幕镜像，关闭正在输出画面的 AirPlay 连接，再回到控制中心重试。若只在特定 App 或特定内容发生，记录 App 名称和准确提示；不要把受保护内容限制误判成设备故障。

## 不要这样处理

- 不要只调高播放音量来判断录屏是否收音；先播放同一视频并确认扬声器输出。
- 不要因为单个 App 无声就抹掉 iPhone 或还原所有设置。
- 不要把“打开麦克风”说成能解除所有 App 的录制限制。
- 不要录制包含验证码、聊天、账户信息或他人声音的视频后直接公开分享。
- 不要用第三方工具绕过 App 或受保护内容的录制限制。

## 升级处理

如果主屏幕、语音备忘录、相机和多个 App 都无法录到自己的声音，记录设备型号、系统版本和测试结果，然后联系 Apple 支持或服务点。对单个 App 的限制，应联系 App 开发者。

## 相关问题

- 只是某个 App 无声，还是所有页面都无声？
- 录屏时是否打开了麦克风？
- 是否正在使用屏幕镜像或 AirPlay？
- 语音备忘录和相机录音是否正常？

## 零售排查流程

1. 记录设备型号、系统版本、目标 App、是否屏幕镜像，以及录屏控制中麦克风是否打开。
2. 用主屏幕或“设置”页录制 5 秒，区分系统录屏和目标 App。
3. 播放录屏文件，确认是内部声音、麦克风声音，还是两者都没有。
4. 用语音备忘录和相机分别测试 iPhone 麦克风。
5. 对单个 App 问题记录 App 版本和准确提示，联系 App 开发者；对跨 App 麦克风问题联系 Apple 支持或服务点。
