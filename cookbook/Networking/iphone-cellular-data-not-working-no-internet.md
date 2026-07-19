---
schemaVersion: 2
id: iphone-cellular-data-not-working-no-internet
title: iPhone 蜂窝数据已打开但无法上网，或只有部分 App 无法联网
slug: iphone-cellular-data-not-working-no-internet
summary: iPhone 已显示 5G、LTE 或 4G，但网页和 App 仍无法通过蜂窝数据联网时，先区分蜂窝数据开关、双 SIM 卡数据号码、单个 App 权限、运营商服务和 VPN/描述文件问题。
symptoms:
  - iPhone 蜂窝数据打不开网页
  - 移动数据已打开但没有网络
  - 5G 或 LTE 显示但 App 无法联网
  - 只有某个 App 用不了流量
  - 双 SIM 卡选错蜂窝数据号码
  - 更新 iOS 后蜂窝数据无法使用
devices:
  - iPhone
  - iPad（无线局域网 + 蜂窝网络）
platforms:
  - iOS
  - iPadOS
systemVersions:
  - iOS 或 iPadOS 18 或更高版本
categories:
  - Networking
tags:
  - Cellular Data
  - Mobile Data
  - SIM
  - eSIM
  - VPN
  - iOS
keywords:
  - 蜂窝数据无法上网
  - 移动数据没网
  - 5G 有信号但不能上网
  - LTE 无法联网
  - App 流量权限
  - 双卡蜂窝数据
aliases:
  - iPhone cellular data not working
  - iPhone mobile data not working
  - cellular data is on but no internet
  - 5G connected but apps have no internet
  - one app cannot use cellular data
errorMessages:
  - 无法接入蜂窝网络
  - 无服务
  - 正在搜索
  - SOS
officialTerms:
  - 蜂窝数据
  - 蜂窝网络
  - 移动数据
  - 蜂窝数据选项
  - 数据漫游
  - 运营商设置
communityTerms:
  - 手机流量打不开网页
  - 开了流量还是没网
  - 流量只有一个软件不能用
  - 双卡流量切错
difficulty: Moderate
estimatedTime: 5-20 分钟；运营商或账户问题可能需要更久
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: verify-cellular-data-line-and-app-permissions
    title: 先确认蜂窝数据开关、双卡数据号码和 App 权限
    summary: iPhone 可能已显示信号，但蜂窝数据被关闭、双卡选择了没有套餐的号码，或只有出问题的 App 被禁止使用蜂窝数据。
    kind: recommended
    steps:
      - 打开“设置”>“蜂窝网络”，确认“蜂窝数据”已打开；在 iPad 上可能显示为“蜂窝数据”。
      - 如果 iPhone 使用双 SIM 卡，轻点“蜂窝数据”，确认选中的是当前有数据套餐且已启用的号码；蜂窝数据同一时间只能使用一个号码。
      - 在“设置”>“蜂窝网络”中向下滚动，确认出问题的 App 旁边的蜂窝数据开关已打开。关闭后，该 App 只能使用无线局域网传输数据。
      - 暂时关闭“低数据模式”后重新打开网页或 App，避免把后台更新暂停误判为完全断网。
      - 关闭无线局域网后，用 Safari 打开一个 HTTPS 网站；不要只依据状态栏的 5G、LTE 或 4G 图标判断互联网一定可用。
    verificationLevel: Official
    sourceIds:
      - apple-use-cellular-data
      - apple-change-cellular-settings
    warnings:
      - 打开蜂窝数据可能产生运营商流量费用；双卡用户不要为了排查随意删除或停用仍在使用的号码。
      - 如果只有一个 App 失败，先检查该 App 的蜂窝数据权限，不要直接还原整台设备。
    limitations:
      - 这些步骤只能确认设备侧开关和权限，不能确认运营商账户、套餐或当地网络是否正常。
  - id: refresh-network-and-check-carrier-settings
    title: 用飞行模式、重新启动和运营商设置更新刷新连接
    summary: 临时注册异常或运营商设置过期时，重新注册蜂窝网络并安装可用的运营商设置更新，再判断是否仍然无法联网。
    kind: recommended
    steps:
      - 打开“设置”中的“飞行模式”，保持至少 15 秒后关闭，让 iPhone 重新尝试接入蜂窝网络。
      - 重新启动 iPhone 或蜂窝网络版 iPad，然后在无线局域网下打开“设置”>“通用”>“关于本机”。
      - 如果出现运营商设置更新提示，安装更新；更换新的 SIM 卡后也要检查这一步。
      - 如果状态栏显示“无服务”“正在搜索”或“SOS”，先按 Apple 的蜂窝网络排查流程处理；这已经不是单纯的 App 流量权限问题。
      - 将设备更新到当前可用的 iOS 或 iPadOS；Apple 说明 iOS 26.0.1 曾修复少数用户更新至 iOS 26 后无法接入蜂窝网络的问题。
    verificationLevel: Official
    sourceIds:
      - apple-sos-no-service
      - apple-ios-26-updates
    warnings:
      - 更新系统前先完成备份并连接可靠电源和网络；不要根据网络传言降级系统或安装非 Apple 配置文件。
      - iOS 更新说明中的“少数用户”不代表所有蜂窝数据故障都由该版本造成。
    limitations:
      - 运营商设置、覆盖范围和账户状态由运营商管理，设备端无法替代运营商确认。
  - id: separate-vpn-profile-and-network-boundary
    title: 排除 VPN、描述文件或第三方网络安全软件
    summary: 如果系统服务能联网但浏览器或多个 App 异常，VPN、内容拦截器、筛选器或配置描述文件可能改变网络路径；先停用并重试。
    kind: alternative
    steps:
      - 在“设置”中搜索“VPN”“描述文件”“防火墙”和“筛选器”，记录是否有你认识的配置或第三方网络 App。
      - 按对应 App 的说明暂时关闭 VPN、防火墙、内容拦截器或家长控制功能，然后只测试一个网页和一个受影响的 App。
      - 如果设备由公司或学校管理，不要自行删除管理描述文件；联系管理员确认网络策略。
      - 仍未恢复时，再考虑“设置”>“通用”>“传输或还原 iPhone”>“还原”>“还原网络设置”；这会移除已保存的 Wi-Fi、VPN 和网络配置，需要重新输入密码。
    verificationLevel: Official
    sourceIds:
      - apple-network-vpn-security
    warnings:
      - 不要在受组织管理的设备上删除描述文件，也不要向第三方 App 提供 Apple 账户密码或验证码。
      - 还原网络设置不是清除所有内容，但会改变网络配置；操作前确认你知道 Wi-Fi 密码和 VPN 设置。
    limitations:
      - VPN 或描述文件恢复后，故障可能再次出现；需要由对应供应商或组织管理员继续处理。
  - id: contact-carrier-or-escalate-hardware
    title: 设备侧正常但仍无法联网时联系运营商
    summary: 账户、套餐、欠费、覆盖中断、SIM/eSIM 状态和设备限制只能由运营商核实；运营商确认正常后再考虑硬件服务。
    kind: escalation
    steps:
      - 在无线局域网下联系运营商，确认账户处于活跃状态、数据套餐有效、当地没有服务中断，也没有被限制使用数据。
      - 如果你在国外或使用漫游，进入“设置”>“蜂窝网络”>“蜂窝数据选项”确认是否需要打开“数据漫游”，并先确认费用。
      - 双卡用户确认对应号码已启用；如果看不到号码、实体 SIM 损坏或 eSIM 无法设置，请让运营商重新设置或更换 SIM。
      - 如果运营商确认账户和网络没有问题，但多个 App 在不同地点仍无法使用蜂窝数据，再联系 Apple 支持或授权服务提供商评估硬件。
    verificationLevel: Official
    sourceIds:
      - apple-sos-no-service
      - apple-cellular-service
    warnings:
      - 不要臆测 APN、IMEI 或运营商限制；中国大陆的套餐、漫游和 eSIM 可用性以运营商和 Apple 中国大陆页面的当前信息为准。
      - 不要为了测试而拨打紧急服务号码；“SOS”状态只说明常规蜂窝网络不可用，不是测试信号的方法。
    limitations:
      - 本文不处理运营商账单争议、企业移动设备管理策略或第三方 App 自身服务器故障。
warnings:
  - 蜂窝数据是否可用取决于设备、SIM/eSIM、运营商账户、覆盖范围、系统设置和所在地区；显示 5G、LTE 或 4G 不等于某个网站或 App 一定可访问。
  - “SOS”“无服务”“正在搜索”表示没有接入蜂窝网络，应与“有蜂窝信号但数据请求失败”分开排查。
  - 还原网络设置会移除已保存的网络配置；企业或学校管理的设备应先咨询管理员。
  - 关闭蜂窝数据或打开数据漫游会影响连接并可能产生费用，先确认运营商套餐。
limitations:
  - 本文只覆盖 iPhone 或蜂窝网络版 iPad 的蜂窝数据无法联网，不覆盖 Wi-Fi 无法加入、个人热点无法共享、App 服务器故障或陌生 VPN 的具体配置。
  - Apple 的系统版本、运营商设置和功能可用性会变化；以设备当前显示、运营商确认和 Apple 中国大陆中文支持页面为准。
sources:
  - id: apple-use-cellular-data
    title: 在 iPhone 或 iPad 上使用蜂窝数据
    url: https://support.apple.com/zh-cn/109323
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2025-12-26
    official: true
  - id: apple-change-cellular-settings
    title: 在 iPhone 上查看或更改蜂窝数据设置
    url: https://support.apple.com/zh-cn/guide/iphone/iph3dd5f213/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
  - id: apple-sos-no-service
    title: 如果你在 iPhone 或 iPad 上看到“SOS”、“无服务”或“正在搜索”
    url: https://support.apple.com/zh-cn/120000
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2026-07-07
    official: true
  - id: apple-ios-26-updates
    title: 关于 iOS 26 更新
    url: https://support.apple.com/zh-cn/123075
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
  - id: apple-network-vpn-security
    title: 如果你的设备存在网络连接问题，请检查是不是安装了 VPN 和其他第三方安全软件
    url: https://support.apple.com/zh-cn/102281
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2025-12-11
    official: true
  - id: apple-cellular-service
    title: 在 iPhone 上设置蜂窝网络服务
    url: https://support.apple.com/zh-cn/guide/iphone/iph3f11fba92/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-19
    publishedAt: null
    official: true

lastVerifiedAt: 2026-07-19
lastUpdatedAt: 2026-07-19
createdAt: 2026-07-19
relatedArticles:
  - iphone-ipad-wifi-no-internet-unable-to-join
  - iphone-personal-hotspot-not-working-greyed-out
  - iphone-sos-no-service-searching
popular: false
---

# iPhone 蜂窝数据已打开但无法上网，或只有部分 App 无法联网

如果 iPhone 已显示 5G、LTE 或 4G，但网页和 App 仍无法通过蜂窝数据联网，先不要修改 APN 或抹掉设备。更稳的顺序是：确认蜂窝数据和数据号码，区分单个 App 权限问题，再刷新运营商连接并排除 VPN；最后才联系运营商或 Apple 支持。

## 症状

- 关闭无线局域网后，Safari 打不开网页，或多个 App 都提示无法连接。
- 状态栏显示 5G、LTE 或 4G，但实际没有数据传输。
- 只有某个 App 无法使用流量，其他 App 正常。
- 双 SIM 卡 iPhone 选择了错误的蜂窝数据号码。
- 更新 iOS 后出现蜂窝数据异常，或状态栏变成“无服务”“正在搜索”或“SOS”。

## 可能原因

1. “蜂窝数据”被关闭，或双 SIM 卡选中的数据号码没有有效套餐。
2. 某个 App 的蜂窝数据权限被关闭，或“低数据模式”改变了后台行为。
3. 临时网络注册异常、运营商设置过期，或系统版本包含已知修复前的问题。
4. VPN、内容拦截器、筛选器或管理描述文件改变了网络路径。
5. 运营商账户、套餐、覆盖范围、SIM/eSIM 或硬件需要进一步核实。

## Apple 官方方案

### 先区分单个 App 和整个蜂窝网络

关闭无线局域网，用 Safari 打开一个 HTTPS 网站，再测试一个以上受影响的 App。如果只有一个 App 失败，优先检查该 App 在“设置”>“蜂窝网络”中的开关；如果多个 App 都失败，再继续设备和运营商排查。

### 1. 确认蜂窝数据、双卡数据号码和 App 权限

1. 打开“设置”>“蜂窝网络”，确认“蜂窝数据”已打开；在 iPad 上可能显示为“蜂窝数据”。
2. 如果 iPhone 使用双 SIM 卡，轻点“蜂窝数据”，确认选中的是当前有数据套餐且已启用的号码。蜂窝数据同一时间只能使用一个号码。
3. 在“设置”>“蜂窝网络”中向下滚动，确认出问题的 App 旁边的蜂窝数据开关已打开。
4. 暂时关闭“低数据模式”后重新打开网页或 App。
5. 不要只依据 5G、LTE 或 4G 图标判断互联网一定可用；实际网页请求成功才算完成测试。

### 2. 刷新蜂窝网络并检查运营商设置

1. 打开“设置”中的“飞行模式”，保持至少 15 秒后关闭。
2. 重新启动 iPhone 或蜂窝网络版 iPad。
3. 在无线局域网下打开“设置”>“通用”>“关于本机”。如果出现运营商设置更新提示，安装更新。
4. 将设备更新到当前可用的 iOS 或 iPadOS。Apple 说明 iOS 26.0.1 曾修复少数用户更新至 iOS 26 后无法接入蜂窝网络的问题。
5. 如果状态栏显示“无服务”“正在搜索”或“SOS”，按 Apple 的蜂窝网络流程继续排查；这已经不是单纯的 App 流量权限问题。

### 3. 排除 VPN、描述文件和第三方网络安全软件

1. 在“设置”中搜索“VPN”“描述文件”“防火墙”和“筛选器”，记录是否有你认识的配置或第三方网络 App。
2. 按对应 App 的说明暂时关闭 VPN、防火墙、内容拦截器或家长控制功能，然后只测试一个网页和一个受影响的 App。
3. 如果设备由公司或学校管理，不要自行删除管理描述文件；联系管理员确认网络策略。
4. 仍未恢复时，再考虑“设置”>“通用”>“传输或还原 iPhone”>“还原”>“还原网络设置”。这会移除已保存的 Wi-Fi、VPN 和网络配置，需要重新输入密码。

## 零售排查流程

1. 关闭无线局域网，分别测试 Safari 和至少两个受影响的 App。
2. 确认蜂窝数据已开、双卡数据号码正确、对应 App 的蜂窝数据权限已开。
3. 打开并关闭飞行模式，重新启动设备，并检查“关于本机”中的运营商设置更新。
4. 暂时停用可识别的 VPN 或内容筛选器；管理设备先找管理员。
5. 记录机型、系统版本、运营商、SIM/eSIM、出现时间和是否只影响某个 App。

## 升级处理

- 运营商确认账户、套餐和当地网络正常，但多个 App 在不同地点仍无法使用蜂窝数据。
- 看不到蜂窝号码、SIM 损坏或 eSIM 无法设置；让运营商重新设置或更换 SIM。
- 设备近期摔落或进液，且蜂窝数据、通话或其他无线功能同时异常。
- 只有一个 App 失败时，优先联系该 App 开发者；不要直接把单个 App 服务器故障归因于 iPhone。

## 不建议的做法

- 不要臆测或修改 APN、IMEI，也不要安装来源不明的运营商配置文件。
- 不要在受组织管理的设备上删除描述文件。
- 不要为了测试蜂窝服务而拨打紧急服务号码。
- 还原网络设置前确认 Wi-Fi 密码和 VPN 设置；它不会清除所有内容，但会移除网络配置。

## 相关问题

- [iPhone 或 iPad 已连接 Wi-Fi 但无法上网](/recipes/Networking/iphone-ipad-wifi-no-internet-unable-to-join)
- [iPhone 个人热点显示灰色或其他设备无法连接](/recipes/Networking/iphone-personal-hotspot-not-working-greyed-out)
- [iPhone 显示“SOS”“无服务”或“正在搜索”](/recipes/iPhone/iphone-sos-no-service-searching)

## 参考来源

- [Apple 支持：在 iPhone 或 iPad 上使用蜂窝数据](https://support.apple.com/zh-cn/109323)
- [Apple 使用手册：在 iPhone 上查看或更改蜂窝数据设置](https://support.apple.com/zh-cn/guide/iphone/iph3dd5f213/ios)
- [Apple 支持：如果你在 iPhone 或 iPad 上看到“SOS”、“无服务”或“正在搜索”](https://support.apple.com/zh-cn/120000)
- [Apple 支持：关于 iOS 26 更新](https://support.apple.com/zh-cn/123075)
- [Apple 支持：如果你的设备存在网络连接问题，请检查是不是安装了 VPN 和其他第三方安全软件](https://support.apple.com/zh-cn/102281)
- [Apple 使用手册：在 iPhone 上设置蜂窝网络服务](https://support.apple.com/zh-cn/guide/iphone/iph3f11fba92/ios)
