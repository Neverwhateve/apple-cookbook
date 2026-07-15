---
schemaVersion: 2
id: iphone-sos-no-service-searching
title: iPhone 显示 SOS、无服务或正在搜索
slug: iphone-sos-no-service-searching
summary: >-
  iPhone 或蜂窝版 iPad 状态栏显示“SOS”“无服务”或“正在搜索”时，设备没有正常接入运营商蜂窝网络。先用 Apple
  的官方顺序重新接入网络、检查运营商账户和设置，再判断是否需要运营商处理或 Apple 服务。
symptoms:
  - “右上角一直显示 SOS。”
  - “手机有 Wi-Fi，但没有蜂窝网络。”
  - “更新后变成无服务。”
  - “信号满格一会儿又掉到 SOS。”
  - “插了 SIM 卡还是正在搜索。”
  - “出国回来以后 eSIM / SIM 线路没有服务。”
devices:
  - iPhone
  - iPad
platforms: []
systemVersions:
  - iOS 18
categories:
  - iPhone
tags:
  - iPhone
  - iPad
  - Cellular
  - SIM
  - eSIM
  - Carrier
  - Network
keywords: []
aliases:
  - iPhone SOS only
  - iPhone No Service
  - iPhone Searching
  - iPhone cellular not working
  - iPhone keeps dropping to SOS
  - iPhone 更新后无服务
  - iPhone 显示 SOS
  - iPhone 一直正在搜索
  - iPhone 没有蜂窝网络
errorMessages:
  - “右上角一直显示 SOS。”
  - “更新后变成无服务。”
  - “信号满格一会儿又掉到 SOS。”
  - iPhone SOS only
  - iPhone No Service
  - iPhone keeps dropping to SOS
  - iPhone 更新后无服务
  - iPhone 显示 SOS
officialTerms: []
communityTerms: []
difficulty: Moderate
estimatedTime: null
verificationLevel: Official
status: canonical
canonicalArticleId: iphone-sos-no-service-searching
solutions:
  - id: solution-a30547b91be0
    title: Apple 官方方案
    summary: null
    kind: recommended
    steps:
      - 打开“设置”，开启“飞行模式”至少 15 秒，然后关闭“飞行模式”，让设备重新尝试接入蜂窝网络。
      - 重新启动 iPhone 或蜂窝版 iPad。
      - 如果看到“SOS”或“SOS only”，先说明设备未连接到自己的运营商网络；在澳大利亚、加拿大和美国，仍可能通过其他运营商网络拨打紧急电话。
      - >-
        如果 iPhone 运行 iOS 18 或更高版本，下载最新版本的“Apple 支持”App
        并运行蜂窝网络相关诊断，帮助判断问题更像运营商、账户、软件设置还是硬件方向。
      - 联系运营商确认账户处于活跃状态、所在区域有覆盖、没有服务中断、设备没有被阻止，并且数据套餐正确。
      - 如果 iPhone 最初购买于其他国家或地区，向运营商确认当地政府是否要求注册 IMEI 才能使用。
      - 将 iPhone 或 iPad 更新到最新版本的 iOS 或 iPadOS。
      - 连接 Wi-Fi，打开设置 通用 关于本机，查看是否出现运营商设置更新。
      - 如果插入了新的 SIM 卡，下载适用于新运营商的运营商设置。
      - 如果使用双 SIM 或 eSIM，打开设置 蜂窝网络，点进对应线路，确认号码已经启用。
      - 如果看不到蜂窝号码，联系运营商设置 eSIM，或确认实体 SIM 已正确插入。
      - 如果使用实体 SIM，取出后重新放入。若 SIM 损坏、尺寸不合适或来自旧设备，请让运营商提供新的 SIM。
      - 如果正在国外旅行，打开对应线路的“数据漫游”。
      - 如果运营商确认账户和网络没有问题，但怀疑硬件问题，安排 Apple 支持或服务检测。
    verificationLevel: Official
    sourceIds:
      - official-f2c651734c37
      - official-126958f0c892
      - official-f4de63858b53
    warnings: []
    limitations: []
warnings: []
limitations: []
sources:
  - id: official-f2c651734c37
    title: Apple 支持：如果你在 iPhone 或 iPad 上看到“SOS”、“无服务”或“正在搜索”
    url: 'https://support.apple.com/zh-cn/120000'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-126958f0c892
    title: >-
      Apple Support: If you see SOS, No Service, or Searching on your iPhone or
      iPad
    url: 'https://support.apple.com/en-us/120000'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-f4de63858b53
    title: Apple 支持：了解你的 iPhone 或 iPad 使用哪种类型的 SIM 卡
    url: 'https://support.apple.com/zh-cn/118569'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: community-d0b74bfdb6ea
    title: Apple Support Community 旧版引文（原始标题未记录）
    url: 'https://discussions.apple.com/thread/255375639'
    publisher: Apple Support Community
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
  - id: community-d32ee3179033
    title: Apple Support Community 旧版引文（原始标题未记录）
    url: 'https://discussions.apple.com/thread/255491162'
    publisher: Apple Support Community
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
  - id: community-53ebce321e83
    title: Reddit 旧版引文（原始标题未记录）
    url: >-
      https://www.reddit.com/r/applehelp/comments/1t9h19j/iphone_with_no_service_but_connects_with_wifi/
    publisher: Reddit
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
  - id: community-cf57daf30587
    title: Reddit 旧版引文（原始标题未记录）
    url: >-
      https://www.reddit.com/r/iphone/comments/1nqbsm8/who_is_still_having_cellular_connectivity_issues/
    publisher: Reddit
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
lastVerifiedAt: '2026-07-13'
lastUpdatedAt: '2026-07-13'
createdAt: null
relatedArticles:
  - iphone-imessage-messages-not-sending-green-waiting-activation
  - iphone-invalid-sim-no-sim
  - iphone-esim-setup-transfer-fails
  - iphone-ipad-wifi-no-internet-unable-to-join
  - iphone-battery-drains-after-update
popular: true
---

# iPhone 显示 SOS、无服务或正在搜索

iPhone 或蜂窝版 iPad 状态栏显示“SOS”“无服务”或“正在搜索”时，设备没有正常接入运营商蜂窝网络。先用 Apple 的官方顺序重新接入网络、检查运营商账户和设置，再判断是否需要运营商处理或 Apple 服务。

---

## 症状

- “右上角一直显示 SOS。”
- “手机有 Wi-Fi，但没有蜂窝网络。”
- “更新后变成无服务。”
- “信号满格一会儿又掉到 SOS。”
- “插了 SIM 卡还是正在搜索。”
- “出国回来以后 eSIM / SIM 线路没有服务。”

---

## 可能原因

1. **设备没有接入可用的运营商网络**
   - Apple 说明，看到“无服务”或“正在搜索”表示 iPhone 或蜂窝版 iPad 没有接入蜂窝网络。
   - 如果状态栏显示“SOS”或“SOS only”，Apple 美国支持说明设备没有接入自己的蜂窝网络，但在澳大利亚、加拿大和美国仍可通过其他运营商网络拨打紧急电话。
2. **运营商账户、覆盖或套餐存在问题**
   - Apple 要求联系运营商确认账户状态、所在区域覆盖、服务中断、设备是否被阻止，以及数据套餐是否正确。
3. **运营商设置或系统版本需要更新**
   - Apple 建议更新 iOS 或 iPadOS，并在“设置 > 通用 > 关于本机”中检查运营商设置更新。
4. **设备购买地、运营商注册或 IMEI 要求不匹配**
   - Apple 建议联系运营商确认当地政府是否要求为最初在其他国家或地区购买的 iPhone 注册 IMEI。
5. **双 SIM、eSIM 或实体 SIM 线路没有启用**
   - Apple 建议在“蜂窝网络”中检查对应号码是否启用；如果看不到号码，需要联系运营商设置 eSIM 或插入实体 SIM。
6. **实体 SIM 或 SIM 卡托架问题**
   - Apple 说明，如果 SIM 损坏、无法贴合卡托，或来自另一台设备，需让运营商提供新的 SIM 卡。
7. **旅行、漫游或 3G 退网影响**
   - Apple 建议国外旅行时检查数据漫游；使用旧设备和 3G 网络时，可能需要联系运营商讨论可用选项。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 打开“设置”，开启“飞行模式”至少 15 秒，然后关闭“飞行模式”，让设备重新尝试接入蜂窝网络。
2. 重新启动 iPhone 或蜂窝版 iPad。
3. 如果看到“SOS”或“SOS only”，先说明设备未连接到自己的运营商网络；在澳大利亚、加拿大和美国，仍可能通过其他运营商网络拨打紧急电话。
4. 如果 iPhone 运行 iOS 18 或更高版本，下载最新版本的“Apple 支持”App 并运行蜂窝网络相关诊断，帮助判断问题更像运营商、账户、软件设置还是硬件方向。
5. 联系运营商确认账户处于活跃状态、所在区域有覆盖、没有服务中断、设备没有被阻止，并且数据套餐正确。
6. 如果 iPhone 最初购买于其他国家或地区，向运营商确认当地政府是否要求注册 IMEI 才能使用。
7. 将 iPhone 或 iPad 更新到最新版本的 iOS 或 iPadOS。
8. 连接 Wi-Fi，打开**设置 > 通用 > 关于本机**，查看是否出现运营商设置更新。
9. 如果插入了新的 SIM 卡，下载适用于新运营商的运营商设置。
10. 如果使用双 SIM 或 eSIM，打开**设置 > 蜂窝网络**，点进对应线路，确认号码已经启用。
11. 如果看不到蜂窝号码，联系运营商设置 eSIM，或确认实体 SIM 已正确插入。
12. 如果使用实体 SIM，取出后重新放入。若 SIM 损坏、尺寸不合适或来自旧设备，请让运营商提供新的 SIM。
13. 如果正在国外旅行，打开对应线路的“数据漫游”。
14. 如果运营商确认账户和网络没有问题，但怀疑硬件问题，安排 Apple 支持或服务检测。

参考来源：

- [Apple 支持：如果你在 iPhone 或 iPad 上看到“SOS”、“无服务”或“正在搜索”](https://support.apple.com/zh-cn/120000)
- [Apple Support: If you see SOS, No Service, or Searching on your iPhone or iPad](https://support.apple.com/en-us/120000)
- [Apple 支持：了解你的 iPhone 或 iPad 使用哪种类型的 SIM 卡](https://support.apple.com/zh-cn/118569)

---

## 已验证的非官方处理思路

非官方

### 让运营商重新推送或刷新线路

- 来源：Apple Support Community 和 Reddit 中，多名用户把 SOS / 无服务问题归因于运营商线路、SIM 或账户状态，并建议联系运营商处理。
- 成功概率：中等，尤其适合同一运营商、同一区域、多台设备同时受影响，或设备显示运营商信息异常的情况。
- 风险：低到中等。需要确认不会误删 eSIM 或取消可用套餐。
- 备注：这不是 Apple 官方步骤的替代项；应在完成飞行模式、重启、系统更新、运营商设置和线路启用检查后执行。
- 验证级别：较可能

### 重置网络设置

- 来源：社区讨论中常见，但 Apple 当前 SOS / 无服务文章没有把“还原网络设置”列为核心步骤。
- 成功概率：未知到中等。
- 风险：中等。会清除已保存的 Wi-Fi、VPN 和蜂窝相关网络设置，可能增加顾客后续登录和重新配置成本。
- 备注：只适合在顾客已备好 Wi-Fi 密码、运营商账户信息，并且官方步骤无法恢复时作为后段尝试。
- 验证级别：较可能

---

## 零售排查流程

1. 先确认状态栏文字：SOS、SOS only、无服务、正在搜索、无 SIM，还是某条 eSIM 关闭。
2. 问清楚发生场景：刚更新、刚换机、刚换 SIM / eSIM、旅行回来、某个地点才发生，还是所有地点都发生。
3. 现场先做飞行模式 15 秒、重启、Wi-Fi 下检查系统更新和运营商设置更新。
4. iOS 18 或更新版本的 iPhone，运行 Apple 支持 App 的蜂窝网络相关诊断并记录结果；如果诊断无法启动，也记录 App 版本、网络状态和屏幕提示。
5. 打开**设置 > 蜂窝网络**，确认线路已启用，并记录运营商名称、号码是否可见、是否有数据漫游需求。
6. 如果是跨国家或地区购买的 iPhone，提醒顾客向运营商确认 IMEI 注册要求。
7. 如果是实体 SIM，检查 SIM 是否能贴合卡托；不要裁剪或改造 SIM。需要换 SIM 时转运营商。
8. 如果同一运营商同一区域多人异常，优先考虑覆盖、停机或运营商故障，而不是直接判断硬件故障。
9. 如果运营商确认账户、覆盖、SIM / eSIM 都正常，再根据诊断结果评估 Apple 服务路径。
10. 不要把 Reddit 或社区里的“某型号普遍有问题”当作官方结论。把它记录为顾客表述，并回到设备、运营商和诊断证据。

---

## 升级处理

联系 Apple 支持：

- 完成官方步骤后仍长期显示 SOS、无服务或正在搜索。
- 运营商确认账户、覆盖、套餐、SIM / eSIM 都正常，但设备仍无法接入。
- iOS 18 或更新版本设备需要运行 Apple 支持 App 的蜂窝网络相关诊断来帮助定位根因。

前往 Apple Store 或授权维修点：

- 运营商怀疑硬件问题。
- 多张有效 SIM 或 eSIM 都无法被同一设备识别。
- 同一 SIM / eSIM 在其他设备可用，但这台设备持续无服务。

维修或更换硬件：

- 只有在诊断或服务检查确认蜂窝硬件、SIM 接触、主板相关问题时才进入维修路径。

---

## 相关问题

- [iPhone 无法发送或接收信息，iMessage 变绿色或等待激活](/recipes/iPhone/iphone-imessage-messages-not-sending-green-waiting-activation)
- [iPhone 显示无 SIM 卡或无效 SIM 卡](/recipes/iPhone/iphone-invalid-sim-no-sim)
- [iPhone 无法设置或转移 eSIM](/recipes/iPhone/iphone-esim-setup-transfer-fails)
- [iPhone 或 iPad 无法连接 Wi-Fi 或显示无互联网连接](/recipes/Networking/iphone-ipad-wifi-no-internet-unable-to-join)
- [iPhone 更新后掉电快或发热](/recipes/iPhone/iphone-battery-drains-after-update)
- iPhone 无法激活 eSIM
- iPhone 出国后无法使用蜂窝数据

---

## 标签

- 设备：iPhone、蜂窝版 iPad
- 系统：iOS、iPadOS
- 功能：蜂窝网络、SIM、eSIM、运营商设置
- 网络：蜂窝网络、漫游、运营商覆盖
- Apple ID：通常不涉及
- 连续互通：不适用
- 隐私：IMEI、运营商账户信息
- 维修：可能涉及蜂窝硬件或 SIM 接触
- 配件：SIM 卡、SIM 卡托架

---

## 元信息

- 最后更新：2026-07-13
- 来源数量：7
- 验证级别：Apple 官方
- 支持系统：当前 iOS、iPadOS；iOS 18 或更新版本可通过 Apple 支持 App 运行蜂窝网络相关诊断
- 可信度：高
