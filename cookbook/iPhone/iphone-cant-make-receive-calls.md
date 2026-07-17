---
schemaVersion: 2
id: iphone-cant-make-receive-calls
title: iPhone 无法拨打或接听电话、来电不响
slug: iphone-cant-make-receive-calls
summary: iPhone 打不出去、接不到电话或来电不响时，先区分蜂窝网络、运营商设置、屏蔽联系人、呼叫转移和静音未知来电，再按 Apple 官方路径逐项测试。
symptoms:
  - iPhone 无法拨打电话
  - iPhone 无法接听电话
  - iPhone 来电不响
  - iPhone 电话打不进来
  - iPhone 显示无服务或正在搜索
  - iPhone 呼叫失败
devices: [iPhone]
platforms: [iOS]
systemVersions:
  - 当前支持的 iOS；设置名称可能随版本略有变化
categories: [iPhone]
tags: [iPhone, 电话, 蜂窝网络, SIM, 来电]
keywords: [iPhone 打不出电话, iPhone 接不到电话, 来电不响, 呼叫失败, 无服务]
aliases: [iPhone can't make calls, iPhone can't receive calls, iPhone calls failing, iPhone incoming calls not ringing]
errorMessages: [呼叫失败, 无服务, 正在搜索, SOS]
officialTerms: [飞行模式, 运营商设置更新, 屏蔽的联系人, 呼叫转移, 静音未知来电, 还原网络设置]
communityTerms: [电话打不出去, 别人打不进来, 电话不响, 来电自动挂断]
difficulty: Moderate
estimatedTime: 5-20 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-network-and-carrier
    title: 先确认蜂窝网络、账户和运营商状态
    summary: Apple 建议确认账户、服务中断、账单状态，并检查运营商设置更新和 iOS 更新。
    kind: recommended
    steps:
      - 查看状态栏是否显示“无服务”“正在搜索”或“SOS”；如果显示，先转到蜂窝网络和 SIM/eSIM 排查。
      - 联系运营商确认账户已设置为使用这台 iPhone、所在地区没有服务中断、账户没有因账单问题被冻结，并确认运营商系统没有通话错误。
      - 打开“设置”>“通用”>“关于本机”，等待运营商设置更新提示；再在“软件更新”中检查 iOS 更新。
      - 打开再关闭“飞行模式”，等待五秒钟后重新测试；并在另一个位置拨打和接听测试电话。
    verificationLevel: Official
    sourceIds: [apple-call-failure]
    warnings: [运营商账户、账单和当地网络中断只能由运营商确认，不要据此直接判断 iPhone 硬件故障。]
    limitations: [本方案不能替代运营商对号码、套餐、VoLTE 或当地网络的检查。]
  - id: check-iphone-call-settings
    title: 检查屏蔽联系人、呼叫转移和未知来电设置
    summary: Apple 的通话故障路径包含屏蔽联系人、呼叫转移和静音未知来电，这些设置可能让用户误以为电话没有接通。
    kind: recommended
    steps:
      - 前往“设置”>“App”>“电话”>“屏蔽的联系人”，确认重要联系人没有被屏蔽。
      - 前往“设置”>“App”>“电话”>“呼叫转移”，确认不需要转移时该开关已关闭。
      - 检查“静音未知来电”；如果陌生号码不响，先关闭该开关并测试，再将重要来电者存入“通讯录”。
      - 若只是来电不响，检查“设置”>“专注模式”>“勿扰模式”，并从已存联系人和陌生号码分别拨入测试。
    verificationLevel: Official
    sourceIds: [apple-call-failure, apple-receive-call-guide]
    warnings: [“静音未知来电”主要解释来电不响，不等同于蜂窝网络无法拨打电话。]
    limitations: [第三方电话 App、企业通信策略和运营商语音信箱可能有独立行为。]
  - id: reset-network-after-safe-checks
    title: 运营商确认正常后再还原网络设置
    summary: 如果不同位置仍无法拨打或接听，且运营商确认账户和服务正常，可记录配置后还原网络设置。
    kind: escalation
    steps:
      - 先记录需要重新输入的 Wi-Fi 密码，以及当前 VPN、APN 和其他网络配置。
      - 前往“设置”>“通用”>“传输或还原 iPhone”>“还原”>“还原网络设置”。
      - 等待 iPhone 重新连接蜂窝网络，再测试拨打、接听和短信；不要把“抹掉所有内容和设置”当作第一步。
      - 若仍失败，保留运营商检查结果、错误提示、设备型号、iOS 版本、SIM/eSIM 状态和测试地点，联系 Apple 支持或运营商。
    verificationLevel: Official
    sourceIds: [apple-call-failure]
    warnings: [还原网络设置会删除已存储的 Wi-Fi 密码、VPN 和 APN 设置；未确认账户和运营商状态前不要反复执行。]
    limitations: [如果是 SIM/eSIM、运营商账户、欠费或区域网络故障，网络设置重置可能没有效果。]
warnings:
  - 中国大陆的运营商账户、套餐、服务中断、SIM/eSIM 和通话能力必须由运营商确认，不要根据其他地区页面推断。
  - “来电不响”与“无法接通”要分开记录：前者可能是过滤设置，后者更需要检查蜂窝网络和运营商。
  - 还原网络设置前说明会删除 Wi-Fi 密码、VPN 和 APN 等网络配置；不得直接建议抹掉设备。
limitations:
  - 本文覆盖 iPhone 自带“电话”无法拨打、无法接听和来电不响的通用排查，不覆盖 FaceTime、第三方通话 App、Apple Watch 独立蜂窝服务或运营商专属故障。
  - 远程文章不能证明账户状态、当地覆盖、SIM/eSIM 硬件或运营商侧路由是否正常。
sources:
  - id: apple-call-failure
    title: 如果你的通话失败或在 iPhone 上无法接听电话
    url: https://support.apple.com/zh-cn/118427
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: 2026-02-04
    official: true
  - id: apple-receive-call-guide
    title: 在 iPhone 上接听或拒接来电
    url: https://support.apple.com/zh-cn/guide/iphone/iph3c9947bf/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-18
lastUpdatedAt: 2026-07-18
createdAt: 2026-07-18
relatedArticles: [iphone-sos-no-service-searching, iphone-invalid-sim-no-sim, iphone-ipad-speaker-microphone-audio-not-working]
popular: false
---

# iPhone 无法拨打或接听电话、来电不响

先把问题拆成两类：是 iPhone 根本无法拨出或接通，还是电话能够到达但没有正常响铃。前一类优先检查蜂窝网络、运营商账户、运营商设置和 SIM/eSIM；后一类还要检查屏蔽联系人、呼叫转移和“静音未知来电”。不要一开始就抹掉 iPhone。

## 症状

- “iPhone 显示‘呼叫失败’，电话打不出去。”
- “别人打我电话时提示无法接通，或电话直接进语音信箱。”
- “只有陌生号码不响，通讯录里的联系人可以打进来。”
- “状态栏显示‘无服务’‘正在搜索’或‘SOS’。”

## 可能原因

1. 蜂窝网络、运营商账户、账单或当地服务中断。
2. 飞行模式、过期的运营商设置、待更新的 iOS 或 SIM/eSIM 状态异常。
3. 相关号码被屏蔽，或“呼叫转移”已开启。
4. “静音未知来电”让陌生号码没有按预期响铃。
5. 网络设置损坏，或电话硬件/系统需要进一步服务。

## Apple 官方方案

1. 查看状态栏并联系运营商确认账户、账单、服务中断和通话记录状态。
2. 前往“设置”>“通用”>“关于本机”检查运营商设置更新，再检查 iOS 更新。
3. 打开再关闭飞行模式，等待五秒钟后重新拨打和接听测试电话。
4. 前往“设置”>“App”>“电话”，检查“屏蔽的联系人”“呼叫转移”和“静音未知来电”。
5. 将测试号码存入通讯录，分别测试已存联系人和陌生号码，区分网络故障与来电过滤。
6. 在另一个位置测试。运营商确认账户和服务正常但问题仍在时，先记录 Wi-Fi、VPN、APN 配置，再前往“设置”>“通用”>“传输或还原 iPhone”>“还原”>“还原网络设置”。
7. 还原后重新连接网络并测试；若仍失败，带上设备型号、iOS 版本、SIM/eSIM 状态、错误提示、地点和运营商检查结果，联系 Apple 支持或运营商。

## 零售排查流程

1. 让用户拨打一个已存联系人、一个陌生号码，并请另一部手机分别拨入；记录是拨出、接听、响铃还是语音信箱异常。
2. 记录状态栏、信号位置、SIM/eSIM 是否启用、运营商名称、设备型号和 iOS 版本。
3. 先做飞行模式五秒切换和运营商设置检查，再复测，不要直接进入抹掉设备流程。
4. 仅来电不响时，优先看屏蔽联系人、呼叫转移、静音未知来电和专注模式。
5. 运营商确认正常后，说明还原网络设置的影响，再由用户决定是否执行。

## 升级处理

- 状态栏持续显示“无服务”“正在搜索”或“SOS”。
- 运营商确认账户和区域服务正常，但不同位置仍无法拨打或接听。
- 还原网络设置后仍失败，或 SIM/eSIM 无法启用、反复掉线。
- 伴随听筒、麦克风或扬声器异常；转到音频文章并安排硬件检查。

## 相关问题

- [iPhone 显示 SOS、无服务或正在搜索](/recipes/iPhone/iphone-sos-no-service-searching)
- [iPhone 显示无效 SIM、没有 SIM 或 SIM 无法使用](/recipes/iPhone/iphone-invalid-sim-no-sim)
- [iPhone 或 iPad 扬声器无声、通话听不清或麦克风没声音](/recipes/iPhone/iphone-ipad-speaker-microphone-audio-not-working)

## 标签

- 设备：iPhone
- 系统：iOS
- 服务：电话、蜂窝网络、运营商、SIM/eSIM
- 风险：还原网络设置会删除已保存的网络配置
