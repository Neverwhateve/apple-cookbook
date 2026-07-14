---
schemaVersion: 2
id: mac-camera-not-working-permission-facetime
title: Mac 内建摄像头无法使用、视频会议黑屏或没有画面
slug: mac-camera-not-working-permission-facetime
summary: Mac 的内建摄像头在 FaceTime、Photo Booth、Safari 或视频会议 App 中没有画面、无法选择或提示没有权限时，先区分权限、屏幕使用时间、App 选择、连续互通摄像头和硬件服务边界。
symptoms:
  - Mac 摄像头打不开
  - FaceTime 没有画面
  - Photo Booth 黑屏
  - 视频会议 App 找不到摄像头
  - 摄像头权限已经打开但还是黑屏
  - Mac 摄像头绿灯闪烁
  - Safari 网站无法使用摄像头
  - 使用 iPhone 当 Mac 摄像头时无法连接
  - 外接摄像头没有出现在 Mac App 中
devices:
  - Mac
  - iPhone
platforms:
  - macOS
  - iOS
systemVersions:
  - macOS Mojave 10.14 或更高版本（摄像头隐私权限）
  - macOS Catalina 10.15 或更高版本（屏幕使用时间限制）
  - macOS Ventura 13 或更高版本（本文采用“系统设置”路径；旧版可能显示为“系统偏好设置”）
  - 支持连续互通摄像头的 macOS 与 iPhone 组合
categories:
  - Mac
tags:
  - Mac
  - Camera
  - FaceTime
  - Privacy
  - Screen Time
  - Continuity Camera
keywords:
  - Mac 摄像头
  - 内建摄像头
  - FaceTime 黑屏
  - Photo Booth 黑屏
  - 视频会议黑屏
  - 摄像头权限
  - 屏幕使用时间摄像头限制
  - 外接摄像头
  - 连续互通摄像头
  - iPhone 摄像头当 Mac 摄像头
aliases:
  - Mac camera not working
  - built-in camera not working on Mac
  - FaceTime camera black screen Mac
  - Photo Booth black screen
  - Mac webcam not detected
  - Mac camera permission denied
  - Continuity Camera not working
  - external camera not showing Mac
errorMessages:
  - No camera available
  - There is no connected camera
  - Camera not available
  - 没有可用的摄像头
officialTerms:
  - 内建摄像头
  - 摄像头
  - 隐私与安全性
  - 屏幕使用时间
  - 内容与隐私
  - App 限额
  - FaceTime
  - Photo Booth
  - 连续互通摄像头
  - 外接摄像头
communityTerms:
  - 摄像头黑屏
  - 视频会议没画面
  - 网课打不开摄像头
  - 绿灯亮但没画面
  - 摄像头被占用
  - Mac webcam black screen
difficulty: Moderate
estimatedTime: 5-20 分钟；若需要服务检测则另计
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-permission-screen-time-and-app-state
    title: 先检查权限、屏幕使用时间和 App 是否真的能调用摄像头
    summary: Apple 将 Mac 内建摄像头不可用的首要排查放在软件更新、屏幕使用时间、摄像头权限和重启上；先确认这些开关，再判断是否是 App 或硬件问题。
    kind: recommended
    steps:
      - 先保存工作，确认 macOS 已更新到当前可用版本；如果刚更新或刚安装视频会议 App，先退出相关 App 再重新打开。
      - 打开“系统设置 > 隐私与安全性 > 摄像头”，为需要使用摄像头的第三方 App 打开权限；如果系统提示需要退出并重新打开 App，按提示操作。
      - 如果列表里没有某个 App，先确认它是否已经请求过摄像头权限；FaceTime、Photo Booth 等 Mac 自带 App 自动拥有摄像头访问权，不需要在这个列表里手动授权。
      - 如果是在 Safari 网站里使用摄像头，打开 Safari 的网站设置，检查该网站的摄像头权限。
      - 打开“系统设置 > 屏幕使用时间 > 内容与隐私”，确认摄像头没有被 App 限制关闭；再检查 App 限额中使用摄像头的 App 没有被限额阻止。
      - 打开 Photo Booth 或 FaceTime 测试内建摄像头。若只有一个第三方 App 黑屏，优先在该 App 的设置、权限和更新中处理；若多个 Apple 自带 App 也无法使用，再继续下一步。
      - Apple 芯片 Mac 先重启；Intel Mac 在常规重启无效后按 Apple 指引重置 SMC。
    verificationLevel: Official
    sourceIds:
      - apple-built-in-camera-not-working
      - apple-control-camera-access
    warnings:
      - 不要为了恢复摄像头而授予不信任 App 或网站摄像头权限；第三方收集的数据受其条款和隐私政策约束。
      - 不要把“绿灯亮”解读为一定是硬件损坏；先确认是否有 App 或网页正在调用摄像头。
    limitations:
      - 受管理 Mac、学校或公司设备可能由配置描述文件限制摄像头，普通用户无法自行修改。
      - macOS 版本不同，“系统设置”和“系统偏好设置”的入口名称可能不同。
  - id: isolate-facetime-or-selected-camera
    title: 区分 FaceTime 问题、选错摄像头和外接摄像头问题
    summary: 如果摄像头只在 FaceTime 或某个 App 中失败，先用另一个 App 交叉测试，并检查菜单里选择的摄像头。
    kind: alternative
    steps:
      - 退出 FaceTime 后重新打开；如果仍无画面，重启 Mac。
      - 确认 FaceTime 没有打开时，用 Photo Booth 测试摄像头；如果 Photo Booth 也失败，问题通常不只在 FaceTime。
      - 如果连接了外接摄像头或把 iPhone 当摄像头，在 FaceTime 的“视频”菜单中选择正确的摄像头；Photo Booth、QuickTime Player 和第三方 App 也各有自己的摄像头选择入口。
      - 在第三方会议 App 中打开它自己的音视频设置，确认没有选到断开的外接摄像头、iPhone 摄像头或虚拟摄像头。
      - 如果只有通话质量差、连接警告或视频块上有感叹号，再按网络和 FaceTime 连接质量方向排查，而不是继续改摄像头权限。
    verificationLevel: Official
    sourceIds:
      - apple-facetime-not-working-mac
      - apple-choose-external-camera
    warnings: []
    limitations:
      - 第三方 App 的菜单名称和设置位置由开发者决定；Apple 只给出通用选择原则。
      - 本文不覆盖麦克风、扬声器或 FaceTime 登录失败的完整排查。
  - id: check-continuity-camera-path
    title: 单独处理 iPhone 连续互通摄像头
    summary: iPhone 当 Mac 摄像头时，先确认两台设备、距离、Wi-Fi、蓝牙、Apple 账户、方向和 App 中的摄像头选择。
    kind: alternative
    steps:
      - 确认 Mac 和 iPhone 都满足连续互通摄像头的系统要求，并且两台设备都已打开 Wi-Fi 和蓝牙。
      - 确认 Mac 与 iPhone 登录同一个 Apple 账户，距离在 10 米内，iPhone 稳定放置，后置摄像头朝向使用者。
      - 在 iPhone 上进入“设置 > 通用 > AirPlay 与连续互通”，确认“连续互通摄像头”已打开。
      - 在 FaceTime 或会议 App 的视频菜单、摄像头菜单或设置里选择这台 iPhone；如果 App 自动没有切过去，手动选择。
      - 如果 iPhone 被解锁、来电、点了暂停、移出蓝牙范围或断开连接，按 Apple 指引重新锁定、放回支架、恢复或重新选择 iPhone。
      - 如果无线不稳定，使用合适的 USB 线连接 Mac 和 iPhone，并按系统提示信任电脑或允许配件连接。
    verificationLevel: Official
    sourceIds:
      - apple-continuity-camera-support
      - apple-use-iphone-webcam-guide
    warnings:
      - 使用 iPhone 作为摄像头会占用 iPhone 电量；长时间会议建议接入电源或 USB。
      - 不要在不稳定支架上使用 iPhone 摄像头，避免设备跌落。
    limitations:
      - 连续互通摄像头的问题不等同于 Mac 内建摄像头硬件故障；两条路径需要分开验证。
      - 旧款设备、不同 Apple 账户或组织管理策略可能不满足功能要求。
  - id: escalate-service-or-admin
    title: 绿灯闪烁、所有 App 都失败或受管理设备时升级
    summary: 完成官方软件和权限步骤后，如果内建摄像头仍不可用，或摄像头指示灯闪烁绿色，应转 Apple 服务、组织管理员或 App 开发者。
    kind: escalation
    steps:
      - 记录 Mac 型号、macOS 版本、失败 App 名称、是否外接摄像头、是否使用连续互通摄像头，以及哪些 App 已经测试过。
      - 如果内建摄像头在 FaceTime、Photo Booth 和其他 App 中都不可用，且完成更新、权限、屏幕使用时间、重启或 SMC 步骤后仍失败，联系 Apple 支持安排服务。
      - 如果摄像头旁的指示灯闪烁绿色，按 Apple 文档将其视为可能需要服务的信号。
      - 如果设备由公司或学校管理，先联系组织管理员确认摄像头是否被配置策略限制。
      - 如果只有某个第三方 App 或网站失败，把系统级测试结果发给该 App 或网站提供方继续排查。
    verificationLevel: Official
    sourceIds:
      - apple-built-in-camera-not-working
      - apple-control-camera-access
    warnings:
      - 不要拆机、遮挡硬件排线或安装来历不明的“摄像头修复”工具。
      - 送修或交给组织管理员前，先备份重要数据并移除不必要的私人资料。
    limitations:
      - 远程文章不能替代 Apple 对摄像头模组、显示屏排线或主板的硬件诊断。
warnings:
  - 摄像头权限属于隐私权限；只给可信 App 和网站开启。
  - 不要把所有视频黑屏都当作硬件故障，先用 Apple 自带 App 和系统权限路径交叉验证。
  - 不要安装来源不明的驱动、虚拟摄像头或修复工具来绕过系统权限。
limitations:
  - 本文覆盖 Mac 内建摄像头、外接摄像头选择和 iPhone 连续互通摄像头的常见分流，不覆盖 iPhone 自身相机硬件故障。
  - 第三方会议 App、浏览器网站和受管理设备可能有自己的权限、账户或组织策略。
  - Apple 官方资料没有提供终端命令强制重置摄像头服务作为标准修复，本文不把这类做法列为官方方案。
sources:
  - id: apple-built-in-camera-not-working
    title: If the built-in camera isn't working on your Mac
    url: https://support.apple.com/en-us/102437
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: 2026-03-27
    official: true
  - id: apple-control-camera-access
    title: Control access to the camera on Mac
    url: https://support.apple.com/guide/mac-help/control-access-to-your-camera-mchlf6d108da/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-facetime-not-working-mac
    title: If FaceTime isn't working on your Mac
    url: https://support.apple.com/en-us/102203
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: 2024-09-16
    official: true
  - id: apple-choose-external-camera
    title: Choose an external camera on Mac
    url: https://support.apple.com/guide/mac-help/choose-an-external-camera-mchl034033f4/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-continuity-camera-support
    title: "Continuity Camera: Use iPhone as a webcam for Mac"
    url: https://support.apple.com/en-us/102546
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-use-iphone-webcam-guide
    title: Use your iPhone as a webcam on Mac
    url: https://support.apple.com/guide/mac-help/use-iphone-as-a-webcam-mchl77879b8a/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-14
lastUpdatedAt: 2026-07-14
createdAt: 2026-07-14
relatedArticles:
  - iphone-wechat-camera-black-screen-lag
popular: false
---

# Mac 内建摄像头无法使用、视频会议黑屏或没有画面

## 症状

- FaceTime、Photo Booth、Safari、Zoom、腾讯会议、Teams 或其他视频会议 App 中没有画面。
- App 提示没有摄像头、找不到摄像头，或摄像头权限被拒绝。
- 摄像头绿灯亮但画面黑，或者绿灯闪烁绿色。
- 外接摄像头、虚拟摄像头或 iPhone 连续互通摄像头被选中后没有画面。
- 同一台 Mac 上有些 App 能用摄像头，有些 App 不能用。

## 可能原因

1. macOS 或 App 尚未更新，或 App 需要退出后重新读取权限。
2. “隐私与安全性 > 摄像头”没有给第三方 App 开启访问权限。
3. 屏幕使用时间的“内容与隐私”或 App 限额限制了摄像头或会议 App。
4. App 选错了摄像头，例如选到了断开的外接摄像头、iPhone 摄像头或虚拟摄像头。
5. FaceTime 或某个会议 App 本身异常，而不是系统摄像头硬件异常。
6. iPhone 连续互通摄像头不满足距离、账户、Wi-Fi、蓝牙、方向或锁定状态要求。
7. 受管理 Mac 被组织策略限制，或内建摄像头需要 Apple 服务检测。

## Apple 官方方案

1. 更新 macOS 和相关 App，退出再重新打开需要摄像头的 App。
2. 打开“系统设置 > 隐私与安全性 > 摄像头”，给需要使用摄像头的第三方 App 打开权限。FaceTime、Photo Booth 等 Mac 自带 App 自动拥有摄像头访问权，不需要手动授权。
3. 如果是 Safari 网站，进入 Safari 的网站设置检查该站点的摄像头权限。
4. 打开“系统设置 > 屏幕使用时间 > 内容与隐私”，确认摄像头没有被关闭；再检查 App 限额中相关 App 没有被限制。
5. 用 Photo Booth 和 FaceTime 交叉测试：如果只有某个第三方 App 失败，优先检查该 App 的音视频设置和更新；如果 Apple 自带 App 也失败，再继续系统级排查。
6. 如果连接了外接摄像头或使用 iPhone 连续互通摄像头，在 FaceTime 的“视频”菜单、Photo Booth 的“摄像头”菜单、QuickTime Player 或会议 App 设置里选择正确摄像头。
7. Apple 芯片 Mac 先重启；Intel Mac 在常规重启无效后按 Apple 指引重置 SMC。
8. 如果内建摄像头仍无法使用，或摄像头旁指示灯闪烁绿色，联系 Apple 支持安排服务。

参考来源：

- [Apple 支持：If the built-in camera isn't working on your Mac](https://support.apple.com/en-us/102437)
- [Apple 使用手册：Control access to the camera on Mac](https://support.apple.com/guide/mac-help/control-access-to-your-camera-mchlf6d108da/mac)
- [Apple 支持：If FaceTime isn't working on your Mac](https://support.apple.com/en-us/102203)
- [Apple 使用手册：Choose an external camera on Mac](https://support.apple.com/guide/mac-help/choose-an-external-camera-mchl034033f4/mac)

## 分流：只有 FaceTime 或某个 App 不能用

1. 退出 FaceTime 或会议 App 后重新打开；必要时重启 Mac。
2. 在 FaceTime 关闭时打开 Photo Booth。如果 Photo Booth 正常，说明内建摄像头本身更可能正常，继续检查 FaceTime 或第三方 App 的设置。
3. 在 App 的视频、摄像头或设备菜单里确认选中的摄像头。外接摄像头、iPhone 摄像头和虚拟摄像头都可能让用户误以为内建摄像头坏了。
4. 如果只有某个网页失败，检查浏览器对该网站的摄像头授权，并确认网页本身没有选择错误设备。
5. 如果是连接质量差、视频块上有感叹号或通话断开，按网络和 FaceTime 连接质量排查，不要继续反复切换摄像头权限。

## 分流：iPhone 连续互通摄像头不能用

1. 确认 Mac 和 iPhone 支持连续互通摄像头，并且两台设备已打开 Wi-Fi 和蓝牙。
2. 确认两台设备登录同一个 Apple 账户，距离在 10 米内，iPhone 稳定放置，后置摄像头朝向使用者。
3. 在 iPhone 上打开“设置 > 通用 > AirPlay 与连续互通”，确认“连续互通摄像头”已打开。
4. 在 FaceTime 或会议 App 的视频菜单、摄像头菜单或设置中选择这台 iPhone。
5. 如果 iPhone 被解锁、接到电话、点了暂停、移出蓝牙范围或被断开，重新锁定并放回支架，再在 App 中重新选择 iPhone。
6. 无线不稳定时改用 USB 连接，并按提示信任电脑或允许配件连接。

参考来源：

- [Apple 支持：Continuity Camera: Use iPhone as a webcam for Mac](https://support.apple.com/en-us/102546)
- [Apple 使用手册：Use your iPhone as a webcam on Mac](https://support.apple.com/guide/mac-help/use-iphone-as-a-webcam-mchl77879b8a/mac)

## 不建议作为官方方案的做法

- 不建议安装来历不明的“摄像头修复”工具、驱动或虚拟摄像头来绕过系统权限。
- 不建议为了临时会议给不信任的网站或 App 开启摄像头权限。
- 不建议把终端命令强制重启摄像头相关进程写成 Apple 官方修复。Apple 当前官方资料没有把这类命令列为标准排查路径。
- 不建议拆机、按压屏幕边框或自行处理排线；这些属于硬件服务边界。

## 零售排查流程

1. 询问失败发生在哪个 App、是否所有 App 都失败、是否最近更新 macOS 或安装会议软件。
2. 记录 Mac 型号、macOS 版本、外接摄像头、虚拟摄像头、iPhone 连续互通摄像头和组织管理状态。
3. 先用 Photo Booth 或 FaceTime 测试内建摄像头，再测试顾客实际使用的 App。
4. 检查“隐私与安全性 > 摄像头”和“屏幕使用时间 > 内容与隐私”。
5. 检查 App 内部选择的摄像头，排除误选外接设备或 iPhone 摄像头。
6. Apple 芯片 Mac 重启；Intel Mac 在适用时重置 SMC。
7. 如果所有 App 都失败，或绿灯闪烁绿色，停止软件绕路，转 Apple 支持或硬件服务。

## 升级处理

- 所有 Apple 自带 App 和第三方 App 都无法使用内建摄像头。
- 摄像头指示灯闪烁绿色。
- Mac 由学校、公司或 MDM 管理，普通用户无法打开摄像头权限。
- 摄像头权限正常，但会议 App 仍只在该 App 内失败，需要 App 开发者或网站支持继续排查。
- 用户怀疑硬件损坏、进液、跌落或屏幕维修后出现问题。

## 相关问题

- iPhone 微信拍照黑屏或卡顿：这是 iPhone 第三方 App 相机路径，不等同于 Mac 内建摄像头。
- iMessage 或 FaceTime 激活失败：这是账户和服务激活路径，不等同于 Mac 摄像头无画面。
- Mac Wi-Fi 或 FaceTime 通话质量差：先按网络质量分流，不要直接判定摄像头硬件故障。

## 标签

- 设备：Mac、iPhone
- 系统：macOS、iOS
- 功能：摄像头、FaceTime、Photo Booth、Safari、连续互通摄像头、外接摄像头
- 风险：隐私授权、组织管理、硬件服务

## 元信息

- 验证等级：Official
- 最后验证：2026-07-14
- 来源数量：6
