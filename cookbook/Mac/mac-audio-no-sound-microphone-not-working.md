---
schemaVersion: 2
id: mac-audio-no-sound-microphone-not-working
title: Mac 没有声音、扬声器无声或麦克风无法使用
slug: mac-audio-no-sound-microphone-not-working
summary: Mac 播放没有声音、声音被送到错误设备、内置扬声器无声，或 App 无法使用麦克风时，先区分输出、输入、App 音量和隐私权限，再排查外接设备与硬件边界。
symptoms:
  - Mac 没有声音
  - Mac 扬声器无声
  - Mac 播放视频没有声音
  - Mac 声音从错误设备输出
  - Mac 麦克风没有声音
  - Mac 录音没有声音
  - Mac 视频会议对方听不到我
  - Mac 提示无法访问音频输入
devices: [Mac]
platforms: [macOS]
systemVersions:
  - 当前受支持的 macOS
  - macOS Ventura 13 或更高版本（本文采用“系统设置”路径；旧版可能显示为“系统偏好设置”）
categories: [Mac]
tags: [Mac, 声音, 麦克风, 扬声器]
keywords: [Mac 没声音, Mac 音频输出, Mac 声音设置, Mac 麦克风权限, Mac 内置扬声器]
aliases:
  - Mac no sound
  - Mac speakers not working
  - Mac microphone not working
  - Mac audio input not working
  - Mac audio output not working
errorMessages: [无法访问音频输入, 没有可用的音频输入设备]
officialTerms: [声音, 输出, 输入, 麦克风, 音频输入]
communityTerms: [Mac 没声音, Mac 外放没声, Mac 录音没声, Mac 开会别人听不到, Mac 耳机没声]
difficulty: Quick
estimatedTime: 5-15 分钟；更换外接设备或需要服务检测时另计
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-app-volume-and-output-device
    title: 检查 App 音量和声音输出设备
    summary: 先确认不是单个 App 静音，也不是声音被发送到耳机、显示器、USB 音频设备或隔空播放设备。
    kind: recommended
    steps:
      - 在出现问题的 App 中播放另一段音频，确认 App 自己的音量没有调到最低或静音；网页还要检查播放器和浏览器标签页是否静音。
      - 拔下耳机、USB 音频设备和外置扬声器；如果连接了 HDMI 或 USB 显示器，也暂时断开，用 Mac 内建扬声器单独测试。
      - 打开“苹果菜单 > 系统设置 > 声音 > 输出”，选择“内建扬声器”，确认输出音量不是最低且没有打开“静音”。
      - 若要使用耳机、显示器、USB 扬声器或隔空播放设备，在“输出”列表中明确选择目标设备。
    verificationLevel: Official
    sourceIds: [apple-mac-internal-speakers-not-working, apple-mac-sound-output-settings]
    warnings: []
    limitations: []
  - id: allow-microphone-and-select-input
    title: 检查麦克风权限和声音输入
    summary: 录音、视频会议或听写没有输入时，确认 App 被允许访问麦克风，并在声音设置中选中了正确的输入设备。
    kind: alternative
    steps:
      - 退出相关 App，打开“苹果菜单 > 系统设置 > 隐私与安全性 > 麦克风”，为需要录音或通话的 App 打开权限。
      - 打开“系统设置 > 声音 > 输入”，选择内建麦克风、显示器麦克风、iPhone 麦克风或已连接的外部麦克风，并提高输入音量。
      - 重新打开 App，检查 App 自己的音频输入设备选择；视频会议还要确认没有被会议主持人静音。
      - 使用 USB 麦克风或外部音频接口时，查看设备厂商的软件更新和兼容性说明。
    verificationLevel: Official
    sourceIds: [apple-mac-audio-input-recording, apple-mac-microphone-permission, apple-mac-sound-input-settings]
    warnings: []
    limitations: []
  - id: isolate-external-audio-hardware
    title: 隔离耳机、显示器和外部音频硬件
    summary: 内建音频正常、只有外接设备异常时，问题更可能在设备连接、选择、供电、驱动或厂商兼容性边界。
    kind: alternative
    steps:
      - 断开所有外接音频设备，只用 Mac 内建扬声器和麦克风测试；然后一次只连接一个目标设备。
      - 检查耳机或扬声器的插头、线缆、供电和设备音量；检查 USB 麦克风或音频接口是否被系统和 App 同时识别。
      - 显示器通过 HDMI、USB-C 或雷雳提供音频时，在“声音 > 输出”中重新选择显示器或内建扬声器。
      - 第三方设备按厂商文稿确认 macOS 版本、固件、驱动和兼容性。
    verificationLevel: Official
    sourceIds: [apple-mac-internal-speakers-not-working, apple-mac-sound-output-settings, apple-mac-audio-input-recording]
    warnings: [发现线缆、接口或设备异常发热、烧蚀、异味或进液时停止连接和测试。]
    limitations: [第三方音频设备的驱动、固件和兼容性由厂商维护。]
  - id: escalate-after-built-in-audio-test
    title: 内建音频仍然失败时联系支持或检修
    summary: 无外接设备时所有 App 都无法使用内建扬声器或麦克风，且权限与输入输出设置正确时，进入 Apple 支持或服务路径。
    kind: escalation
    steps:
      - 记录 Mac 型号、macOS 版本、受影响的 App、输入或输出设备，以及是否所有 App 都失败。
      - 确认问题不是单个 App 或外接设备后，联系 Apple 支持或 Apple 授权服务提供商。
      - 受公司或学校管理的 Mac 可能限制麦克风权限、音频设备或系统更新，必要时联系管理员。
    verificationLevel: Official
    sourceIds: [apple-mac-internal-speakers-not-working, apple-mac-audio-input-recording]
    warnings: [不要通过删除系统文件或安装来源不明的音频驱动来替代基础检查。]
    limitations: [本文不诊断主板、扬声器、麦克风、端口或第三方设备的具体硬件故障。]
warnings:
  - 不要把某个 App 没声音直接等同于 Mac 硬件损坏；先用另一款 App 和内建音频设备交叉测试。
  - 不要安装未验证来源的音频驱动或清理工具。
  - 涉及进液、烧蚀、异常发热、端口松动或明显物理损坏时停止继续插拔，进入服务检测。
limitations:
  - 菜单名称和权限页面可能随 macOS 版本变化；旧版系统可能显示“系统偏好设置”。
  - 本文覆盖常见的 Mac 本机音频输出、输入、App 权限和外接设备分流，不覆盖专业音频软件内部路由、网络音频或虚拟机音频。
  - Apple 官方资料不能确认每一款第三方音频设备的真实兼容性。
sources:
  - id: apple-mac-internal-speakers-not-working
    title: 如果 Mac 上的内置扬声器无法正常工作
    url: https://support.apple.com/zh-cn/102411
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-20
    publishedAt: null
    official: true
  - id: apple-mac-sound-output-settings
    title: 在 Mac 上更改声音输出设置
    url: https://support.apple.com/zh-cn/guide/mac-help-cn/mchlp2256/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-20
    publishedAt: null
    official: true
  - id: apple-mac-audio-input-recording
    title: 如果你无法在 Mac 上从外部来源录制音频
    url: https://support.apple.com/zh-cn/102071
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-20
    publishedAt: null
    official: true
  - id: apple-mac-microphone-permission
    title: 允许使用麦克风和音频输入
    url: https://support.apple.com/zh-cn/guide/mac-help/mchl7fa8e3cc/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-20
    publishedAt: null
    official: true
  - id: apple-mac-sound-input-settings
    title: 在 Mac 上更改声音输入设置
    url: https://support.apple.com/zh-cn/guide/mac-help/-mchlp2567/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-20
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-20
lastUpdatedAt: 2026-07-20
createdAt: 2026-07-20
relatedArticles: [mac-bluetooth-devices-wont-connect, mac-external-display-black-screen-low-resolution]
popular: false
---

# Mac 没有声音、扬声器无声或麦克风无法使用

先区分是“播放没有声音”还是“录音没有输入”。如果只有某个 App 或网页异常，先检查它自己的音量和静音；如果所有 App 都没有声音，再用 Mac 内建扬声器测试。麦克风问题也要单独检查 App 权限和声音输入设备，输出设置正确并不会自动修复输入。

## 症状

- Mac 播放视频、音乐或网页内容没有声音。
- Mac 显示有音量，但声音从耳机、显示器或其他错误设备输出。
- 内建扬声器、耳机或 USB 扬声器没有声音。
- 录音、视频会议或听写时，别人听不到 Mac 的声音。
- App 提示无法访问音频输入，或输入电平没有变化。

## 先判断问题范围

1. 播放另一段音频，并用另一款 App 或网页测试；同时确认当前 App 的音量没有静音。
2. 断开耳机、显示器、USB 音频设备和外置扬声器，只用 Mac 内建扬声器测试。
3. 录音时打开“声音 > 输入”，观察内建麦克风的输入电平；只输出正常、输入异常时，转到麦克风权限和输入路径。
4. 只有一个 App 失败时，优先处理 App 的音量、静音、权限或设备选择；多个 App 都失败时，再检查系统声音设置。

## 可能原因

1. App、网页播放器或浏览器标签页被单独静音。
2. macOS 将声音输出到耳机、显示器、USB 设备或隔空播放设备，而不是内建扬声器。
3. App 没有访问麦克风和音频输入的权限，或“声音 > 输入”选错了设备。
4. 耳机、线缆、显示器、扩展坞、音频接口或第三方驱动存在连接或兼容性问题。
5. 没有外接设备且权限正确时，内建扬声器或麦克风可能需要 Apple 支持检测。

## Apple 官方方案

1. 断开外接音频设备，用另一款 App 和 Mac 内建扬声器测试。
2. 打开“系统设置 > 声音 > 输出”，选择内建扬声器并检查音量和静音。
3. 录音或通话无输入时，在“隐私与安全性 > 麦克风”允许 App，并在“声音 > 输入”选择正确设备。
4. 一次只连接一个外接设备；仍失败时记录型号和版本并联系 Apple 支持。

### 1. 重新选择声音输出

打开“苹果菜单 > 系统设置 > 声音 > 输出”，选择“内建扬声器”，确认输出音量不是最低且没有打开“静音”。需要使用耳机、显示器或 USB 扬声器时，在同一列表中明确选择目标设备。

拔掉外接音频设备后再测试一次。如果内建扬声器恢复，说明问题集中在设备选择、连接或外接设备，而不是所有 Mac 音频都失效。

### 2. 检查 App 音量

在受影响的 App 内播放另一段内容，检查 App 自己的音量和静音按钮。网页播放器、浏览器标签页、音乐和视频 App 都可能拥有独立的音量控制；系统音量正常不代表这些控制没有静音。

如果只有一个 App 没声音，先更新或重新打开该 App，并检查它自己的音频输出设备。不要为了单个 App 的问题直接抹掉 Mac 或安装第三方“音频修复”工具。

### 3. 检查麦克风权限和输入设备

打开“苹果菜单 > 系统设置 > 隐私与安全性 > 麦克风”，为需要录音、通话或听写的 App 打开权限。然后打开“系统设置 > 声音 > 输入”，选择实际使用的内建麦克风、显示器麦克风、iPhone 麦克风或外部麦克风，并提高输入音量。

退出并重新打开 App 后再录音。如果 App 仍没有输入，检查 App 自己的音频输入选择；对 USB 麦克风或外部音频接口，还要按设备厂商说明检查软件、固件和 macOS 兼容性。

### 4. 一次只连接一个外接设备

断开所有外接音频设备后用内建音频测试，再一次只连接一个耳机、显示器、USB 麦克风或音频接口。检查设备供电、插头、线缆和设备本身的音量；不要同时连接多个可能提供音频的设备后凭感觉判断系统使用了哪一个。

如果连接显示器后声音消失，回到“声音 > 输出”重新选择内建扬声器或显示器。若只有第三方设备失败，联系厂商确认驱动、固件和兼容性；Apple 官方页面不能替厂商确认具体型号的音频能力。

## 风险与边界

不要把某个 App 没声音直接等同于 Mac 硬件损坏；不要安装来源不明的音频驱动或清理工具。发现进液、烧蚀、异常发热、端口松动或明显物理损坏时，停止继续插拔和测试。

## 零售排查流程

1. 记录是播放无声、录音无输入，还是某个 App 单独异常。
2. 断开外接音频设备，用另一款 App 和内建扬声器测试。
3. 在“声音 > 输出”重新选择设备，并检查 App 自己的音量和静音。
4. 在“隐私与安全性 > 麦克风”和“声音 > 输入”检查权限及输入设备。
5. 一次只连接一个外接设备；仍失败时记录型号和版本并升级处理。

## 升级处理

在没有耳机、显示器或其他外接设备时，如果所有 App 都无法播放内建扬声器，或权限和输入设备正确后内建麦克风仍没有输入，记录 Mac 型号、macOS 版本、受影响的 App 和测试结果，联系 Apple 支持或 Apple 授权服务提供商。

如果看到进液、烧蚀、异常发热、端口松动或明显物理损坏，停止继续插拔和测试。不要把具体故障直接断定为主板、扬声器或麦克风损坏，交由服务人员检测。

## 相关问题

- [Mac 蓝牙设备无法连接、配对失败或频繁断开](/recipes/Mac/mac-bluetooth-devices-wont-connect)
- [Mac 外接显示器黑屏、检测不到或分辨率低](/recipes/Mac/mac-external-display-black-screen-low-resolution)
- [iPhone 或 iPad 扬声器无声、通话听不清或麦克风没声音](/recipes/iPhone/iphone-ipad-speaker-microphone-audio-not-working)

## 参考来源

- [如果 Mac 上的内置扬声器无法正常工作](https://support.apple.com/zh-cn/102411)
- [在 Mac 上更改声音输出设置](https://support.apple.com/zh-cn/guide/mac-help-cn/mchlp2256/mac)
- [如果你无法在 Mac 上从外部来源录制音频](https://support.apple.com/zh-cn/102071)
- [允许使用麦克风和音频输入](https://support.apple.com/zh-cn/guide/mac-help/mchl7fa8e3cc/mac)
- [在 Mac 上更改声音输入设置](https://support.apple.com/zh-cn/guide/mac-help/-mchlp2567/mac)
