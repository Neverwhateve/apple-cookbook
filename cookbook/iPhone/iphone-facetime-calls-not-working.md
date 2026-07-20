---
schemaVersion: 2
id: iphone-facetime-calls-not-working
title: iPhone 或 iPad FaceTime 无法拨打、接听或等待激活
slug: iphone-facetime-calls-not-working
summary: iPhone 或 iPad 的 FaceTime 无法拨打或接听、一直等待激活、黑屏或通话掉线时，先确认中国大陆的功能与运营商可用性，再检查网络、蜂窝数据、账号地址、限制和日期时间。
symptoms:
  - FaceTime 无法拨打或接听
  - FaceTime 一直显示正在等待激活
  - FaceTime 通话黑屏、卡顿或掉线
  - FaceTime 没有声音或无法连接
  - FaceTime 设置入口不见了
  - 新 iPhone 设置后 FaceTime 不能使用
devices: [iPhone, iPad]
platforms: [iOS, iPadOS]
systemVersions:
  - 当前支持的 iOS 或 iPadOS；设置名称可能随版本略有变化
categories: [iPhone]
tags: [iPhone, iPad, FaceTime, 视频通话, 网络]
keywords: [FaceTime 无法使用, FaceTime 无法激活, FaceTime 黑屏, FaceTime 掉线]
aliases: [FaceTime not working on iPhone, FaceTime activation waiting, FaceTime can't make calls, FaceTime can't receive calls, FaceTime video call black screen]
errorMessages: [正在等待激活, 无法连接, FaceTime 通话失败]
officialTerms: [FaceTime 通话, 使用蜂窝数据, 内容与隐私限制, 自动设置]
communityTerms: [FaceTime 打不通, FaceTime 接不到, FaceTime 卡激活, FaceTime 黑屏]
difficulty: Moderate
estimatedTime: 5–20 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: confirm-facetime-availability-and-network
    title: 先确认功能可用性和网络连接
    summary: FaceTime 需要 Wi‑Fi 或蜂窝网络，并且可能受国家、地区或运营商限制；先排除这些边界，再继续改设置。
    kind: recommended
    steps:
      - 先确认所在国家或地区、运营商和当前设备支持 FaceTime；Apple 明确说明 FaceTime 视频和音频通话可能不适用于部分国家、地区或运营商。
      - 使用 Safari 打开一个网页，确认设备确实能通过 Wi‑Fi 或蜂窝数据访问互联网；如果使用蜂窝网络，确认“设置”>“蜂窝网络”中已允许 FaceTime 通话使用数据。
      - 如果 Wi‑Fi 下无法连接，暂时换一个可靠网络测试；路由器、防火墙或安全软件限制互联网访问时，先处理网络侧限制。
      - 分别测试拨打和接听，并记录是无法连接、黑屏、无声音还是通话掉线，不要把不同症状混为一个故障。
    verificationLevel: Official
    sourceIds: [apple-facetime-not-working]
    warnings: [中国大陆的运营商、网络策略和服务可用性必须按当前实际情况确认，不要用其他国家或地区页面推断可用性。]
    limitations: [网页可访问不代表 FaceTime 服务、对方设备或运营商侧完全正常。]
  - id: refresh-facetime-settings-after-device-setup
    title: 新设备或等待激活时刷新 FaceTime 设置
    summary: 新设备设置完成后，重新确认电话号码、FaceTime 开关和地址；等待激活时先关闭再打开并等待网络注册。
    kind: recommended
    steps:
      - 将 iPhone 或 iPad 更新到 Apple 当前提供的适用系统版本。
      - 如果是 iPhone 双卡，前往“设置”>“蜂窝网络”，确认要用于 FaceTime 的电话号码已启用并选中；iPad 则确认对应蜂窝数据已启用。
      - 前往“设置”>“App”>“FaceTime 通话”，关闭“FaceTime 通话”后重新打开；确认用于 FaceTime 的电话号码或电子邮件地址正确。
      - 如果显示“正在等待激活”，先保持设备联网，关闭再打开 FaceTime；不要在没有记录状态的情况下反复退出 Apple 账户。
      - 用一个已知可用的联系人再次拨打，并请对方回拨，区分拨出方向和接听方向的问题。
    verificationLevel: Official
    sourceIds: [apple-facetime-not-working]
    warnings: [电话号码激活可能受运营商短信、账户和地区条件影响；文章不能承诺等待固定时长后必然激活。]
    limitations: [Apple 账户验证、电话号码或电子邮件地址错误时，单纯重启不会修复身份配置。]
  - id: check-restrictions-time-and-escalate
    title: 检查限制、日期时间并升级处理
    summary: 设置入口缺失、持续失败或伴随黑屏掉线时，检查屏幕使用时间和自动日期时间；仍失败就保留证据联系 Apple 或运营商。
    kind: escalation
    steps:
      - 如果看不到 FaceTime 设置，前往“设置”>“屏幕时间”>“内容与隐私限制”>“允许的 App 与功能”，确认“相机”和“FaceTime 通话”没有被关闭。
      - 前往“设置”>“通用”>“日期与时间”，打开“自动设置”，然后重新启动设备并复测。
      - 如果画面黑屏、视频卡顿或通话掉线，分别用更快的 Wi‑Fi 和蜂窝网络测试；记录发生方向、网络类型、时间和错误提示。
      - 若多种网络、重启、系统更新和设置检查后仍无法拨打或接听，联系 Apple 支持；涉及号码、SIM/eSIM、运营商服务或地区限制时同时联系运营商。
    verificationLevel: Official
    sourceIds: [apple-facetime-not-working]
    warnings: [不要为了修复 FaceTime 直接抹掉设备；先保留错误提示、系统版本、网络类型和运营商检查结果。]
    limitations: [远程排查不能证明 FaceTime 服务端、对方设备摄像头麦克风或运营商路由是否正常。]
warnings:
  - FaceTime 视频和音频通话可能受国家、地区或运营商限制；中国大陆用户应以当前 Apple 中国大陆页面和运营商实际支持为准。
  - “正在等待激活”、无法连接、黑屏和无声音是不同故障信号，应分别记录和测试。
  - 不要把普通电话无法拨打或接听误判为 FaceTime 故障；普通电话请查看对应的电话文章。
limitations:
  - 本文覆盖 iPhone 或 iPad 自带 FaceTime 无法拨打、接听、激活和连接的通用排查，不覆盖 Mac FaceTime、第三方视频通话 App 或对方设备硬件故障。
  - Apple 官方页面没有承诺固定激活时长、成功率或所有国家和运营商均可用。
sources:
  - id: apple-facetime-not-working
    title: 如果你无法在 iPhone 或 iPad 上拨打或接听 FaceTime 通话
    url: https://support.apple.com/zh-cn/102558
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-21
    publishedAt: 2026-01-15
    official: true
  - id: apple-facetime-guide
    title: 在 iPhone 或 iPad 上使用 FaceTime 通话
    url: https://support.apple.com/zh-cn/facetime
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-21
    publishedAt: 2025-09-22
    official: true
lastVerifiedAt: 2026-07-21
lastUpdatedAt: 2026-07-21
createdAt: 2026-07-21
relatedArticles: [iphone-cant-make-receive-calls, iphone-ipad-camera-flash-not-working-black-screen, iphone-cellular-data-not-working-no-internet]
popular: false
---

# iPhone 或 iPad FaceTime 无法拨打、接听或等待激活

FaceTime 故障先按现象分类：是无法拨出或接听、一直“正在等待激活”，还是已接通但黑屏、无声音或掉线。FaceTime 需要 Wi‑Fi 或蜂窝网络，而且 Apple 明确提示视频和音频通话可能受国家、地区或运营商限制；中国大陆用户不要用其他地区的可用性经验替代当前实际确认。

## 症状

- “FaceTime 打不出去，提示无法连接。”
- “新 iPhone 设置好后，FaceTime 一直显示正在等待激活。”
- “能接通但视频黑屏、卡顿，或者通话很快掉线。”
- “FaceTime 设置不见了，或只有某个电话号码不能用。”

## 可能原因

1. 当前国家、地区、运营商或账户不支持所需的 FaceTime 功能。
2. Wi‑Fi、蜂窝数据、路由器、防火墙或安全软件阻止了连接。
3. 新设备的电话号码未启用，或 FaceTime 地址、开关没有正确注册。
4. 屏幕使用时间限制隐藏了 FaceTime 或相机，日期时间不正确也可能影响激活。
5. 对方设备、FaceTime 服务或摄像头麦克风存在独立问题。

## Apple 官方方案

1. 用 Safari 打开网页确认网络正常；再分别用 Wi‑Fi 和蜂窝网络测试 FaceTime。
2. 使用蜂窝网络时，前往“设置”>“蜂窝网络”，确认 FaceTime 通话已允许使用蜂窝数据。
3. 前往“设置”>“App”>“FaceTime 通话”，关闭后重新打开，并确认电话号码或电子邮件地址正确。
4. 新 iPhone 使用双卡时，在“设置”>“蜂窝网络”中确认用于 FaceTime 的电话号码已启用并选中。
5. 如果显示“正在等待激活”，保持设备联网，关闭再打开 FaceTime；然后更新系统、重新启动并再次测试。
6. 如果没有 FaceTime 设置，检查“设置”>“屏幕时间”>“内容与隐私限制”>“允许的 App 与功能”中的“相机”和“FaceTime 通话”。
7. 前往“设置”>“通用”>“日期与时间”，打开“自动设置”。黑屏、卡顿或掉线时，用更快的网络重新测试。

## 零售排查流程

1. 让用户用一个已知可用联系人分别拨出和接听，记录是无法连接、等待激活、黑屏、无声音还是掉线。
2. 记录设备型号、iOS 或 iPadOS 版本、电话号码是否启用、网络类型、运营商和完整错误提示。
3. 先测试网页、蜂窝数据权限和 FaceTime 开关，再做系统更新和重启；不要直接退出 Apple 账户或抹掉设备。
4. 对黑屏或无声音问题，让双方分别测试摄像头和麦克风，并在另一种网络下复测，避免把对方设备问题归到本机。
5. 若多个网络、重启、更新和限制检查后仍失败，带上上述记录联系 Apple 支持；涉及号码、SIM/eSIM、运营商或地区可用性时联系运营商。

## 升级处理

- FaceTime 长时间等待激活，且电话号码、网络、系统和开关均已确认。
- 多个可靠网络下都无法拨打或接听，或反复出现无法连接、黑屏、掉线。
- FaceTime 设置持续缺失，屏幕使用时间限制无法修改，或设备由组织管理。
- 普通电话、蜂窝网络或 SIM/eSIM 也异常；转到电话、蜂窝数据或运营商相关文章。

## 相关问题

- [iPhone 无法拨打或接听电话、来电不响](/recipes/iPhone/iphone-cant-make-receive-calls)
- [iPhone 蜂窝数据已打开但无法上网，或只有部分 App 无法联网](/recipes/Networking/iphone-cellular-data-not-working-no-internet)
- [iPhone 或 iPad 相机黑屏、模糊或闪光灯无法使用](/recipes/iPhone/iphone-ipad-camera-flash-not-working-black-screen)

## 标签

- 设备：iPhone、iPad
- 系统：iOS、iPadOS
- 服务：FaceTime、视频通话、蜂窝数据、Wi‑Fi
- 风险：地区或运营商可用性不同；不要直接抹掉设备
