---
schemaVersion: 2
id: iphone-overheating-temperature-warning-too-hot
title: iPhone 过热、过冷或显示温度警告
slug: iphone-overheating-temperature-warning-too-hot
summary: iPhone 变得很烫、显示“温度：iPhone 需要降温”、屏幕变暗或暂停充电时，先停止高负载使用并移到合适环境；区分正常发热、温度保护和需要服务的异常。
symptoms:
  - iPhone 变得很烫或过热
  - iPhone 显示“温度：iPhone 需要降温”
  - iPhone 过热后屏幕变暗或黑屏
  - iPhone 过热时无法充电或充电变慢
  - iPhone 显示暂停充电且恢复正常温度后才继续
  - iPhone 在寒冷环境中无法充电或自动关机
  - iPhone 相机闪光灯或部分功能暂时不可用
devices:
  - iPhone
  - iPad
platforms:
  - iOS
  - iPadOS
systemVersions:
  - 当前支持的 iOS 或 iPadOS
categories:
  - iPhone
tags:
  - iPhone
  - 温度
  - 过热
  - 充电
  - 电池
keywords:
  - iPhone 温度警告
  - iPhone 过热
  - iPhone 需要降温
  - iPhone 暂停充电
aliases:
  - iPhone overheating
  - iPhone temperature warning
  - iPhone too hot to charge
  - iPhone needs to cool down
  - iPhone too cold to charge
  - iPhone 温度过高
  - iPhone 温度过低
errorMessages:
  - 温度：iPhone 需要降温
  - 暂停充电。设备恢复正常温度时，充电将继续。
  - 温度警告
officialTerms:
  - 工作温度
  - 温度警告屏幕
  - 暂停充电
  - 过热保护
communityTerms:
  - iPhone 发烫
  - iPhone 烫手
  - 手机太热黑屏
  - iPhone 冬天充不进电
difficulty: Quick
estimatedTime: 5-30 分钟；若反复发生或伴随硬件异常则需要服务
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: identify-and-stop
    title: 先停止高负载使用和充电
    summary: 首次设置、恢复备份、更新、无线充电、游戏、相机或高质量视频可能让设备变热；出现温度警告时应停止使用和充电。
    kind: recommended
    steps:
      - 记录发热是否发生在首次设置、恢复备份、更新、无线充电、导航、游戏、相机或播放视频期间。
      - 结束高负载任务并拔下充电器；如果没有温度警告，等待设备自然冷却。
      - 避免把设备留在车内、阳光直射处或高温环境中，也不要在超出工作温度的环境里继续充电。
      - 如果设备处于寒冷环境，移到温度适中的地方后再观察充电和性能。
    verificationLevel: Official
    sourceIds:
      - apple-iphone-temperature-management
      - apple-iphone-battery-charging
    warnings:
      - 短暂正常发热不等于可以忽略持续异常发热、形变、异味或冒烟。
    limitations:
      - 仅凭手感无法测量内部温度，也不能确认硬件是否损坏。
  - id: cool-down-warning
    title: 出现温度警告时让设备自然降温
    summary: 温度过高时充电、屏幕、蜂窝网络、相机和部分 App 可能暂时受限；出现温度警告屏幕时应关机、避开阳光并降温。
    kind: recommended
    steps:
      - 停止游戏、导航、相机、视频等高负载操作，并断开充电器。
      - 将设备关机，移到较凉爽且没有阳光直射的环境中。
      - 让设备自然降温，直到温度警告消失；恢复正常温度后再开机和充电。
      - 不要用冰袋、冰箱、冷冻室或第三方工具强行降温或解除温度保护。
    verificationLevel: Official
    sourceIds:
      - apple-iphone-temperature-management
    warnings:
      - Apple 没有承诺固定冷却等待时间；不要以冷冻或强制散热替代等待。
    limitations:
      - 恢复速度取决于环境和设备状态。
  - id: distinguish-paused-charging
    title: 区分温度暂停充电与 80% 充电限制
    summary: 高温或低温会让充电暂停并在温度恢复后继续；长期停在 80% 还可能是优化电池充电、充电上限或高温保护。
    kind: alternative
    steps:
      - 如果出现“暂停充电。设备恢复正常温度时，充电将继续”，先锁定屏幕或让设备进入睡眠状态。
      - 高温时移到更凉爽处，低温时移到更暖和处，等待温度恢复。
      - 温度恢复后重新连接可靠充电器并观察，不要反复拔插或使用第三方工具绕过保护。
      - 如果长期停在 80%，另行检查优化电池充电、充电上限和电池健康设置。
    verificationLevel: Official
    sourceIds:
      - apple-iphone-temperature-management
      - apple-iphone-charging-paused
      - apple-iphone-battery-charging
    warnings:
      - 不要为了绕过温度保护而关闭安全功能、拆机或使用不明充电配件。
    limitations:
      - 远程排查无法确认充电器、线缆、接口或电池内部故障。
  - id: escalate-repeated-overheating
    title: 反复过热或有硬件迹象时求助
    summary: 正常室温和低负载下仍持续发热，或出现鼓包、屏幕被顶起、异味、漏液、冒烟或异常烫手时，应停止测试并联系专业服务。
    kind: escalation
    steps:
      - 出现鼓包、屏幕被顶起、漏液、异味、冒烟或异常烫手时，立即停止充电和继续使用，远离可燃物。
      - 不要挤压、穿刺、拆开、加热、冷冻设备，也不要反复开机验证。
      - 设备安全且仍能使用时，备份重要数据并记录环境、充电方式、系统版本和警告截图。
      - 通过 Apple 支持、Apple Store 或 Apple 授权服务提供商获取检查和维修选项。
    verificationLevel: Official
    sourceIds:
      - apple-iphone-temperature-management
      - apple-iphone-battery-service
    warnings:
      - 锂离子电池和内部温度问题不适合自行拆机诊断。
    limitations:
      - 本文不能判断持续发热一定来自电池、主板、充电器或软件。
warnings:
  - 温度保护是设备的安全机制，不要用冷冻、冰敷、强制散热或第三方工具绕过。
  - 高温环境中继续使用或充电可能永久缩短电池续航能力。
  - 鼓包、漏液、冒烟、异味或异常发热时，优先停止使用和联系专业服务。
limitations:
  - 本文覆盖 iPhone 和 iPad 的温度管理；菜单名称会随机型和系统版本变化。
  - 本文不覆盖单纯电池健康下降、液体检测或充电器损坏的完整排查。
sources:
  - id: apple-iphone-temperature-management
    title: 如果 iPhone 或 iPad 温度过高或过低
    url: https://support.apple.com/zh-cn/118431
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-20
    publishedAt: 2026-05-19
    official: true
  - id: apple-iphone-charging-paused
    title: 如果 iPhone 或 iPad 上出现“暂停充电”通知
    url: https://support.apple.com/zh-cn/104949
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-20
    publishedAt: 2026-01-16
    official: true
  - id: apple-iphone-battery-charging
    title: 为 iPhone 电池充电并进行维护
    url: https://support.apple.com/zh-cn/105105
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-20
    publishedAt: 2025-04-08
    official: true
  - id: apple-iphone-battery-service
    title: 适用于 iPhone 电池的 Apple 服务和维修
    url: https://support.apple.com/zh-cn/iphone/repair/battery-replacement
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-20
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-20
lastUpdatedAt: 2026-07-20
createdAt: 2026-07-20
relatedArticles:
  - iphone-charging-paused-80-temperature-charge-limit
  - iphone-battery-drains-after-update
  - iphone-wont-charge-wired-liquid-detected
popular: false
---

# iPhone 过热、过冷或显示温度警告

如果 iPhone 变得很烫、显示“温度：iPhone 需要降温”、屏幕变暗或暂停充电，先停止高负载使用和充电，把设备移到没有阳光直射的较凉爽环境中。不要用冰箱、冷冻室、冰袋或第三方工具强行降温、解锁温度保护。

## 症状

- 使用导航、相机、游戏、视频或无线充电时设备明显变热。
- 屏幕变暗、黑屏，蜂窝网络信号变弱，或相机闪光灯暂时不可用。
- 屏幕显示“温度：iPhone 需要降温”，或出现温度警告屏幕。
- 锁定屏幕提示“暂停充电。设备恢复正常温度时，充电将继续。”
- 在寒冷环境中无法充电、停止充电或设备暂时关机。

## 可能原因

1. 首次设置、从备份恢复、完成软件更新、无线充电或运行高负载 App 时的暂时发热。
2. 高温天气、阳光直射、车内环境或导航、游戏、相机等持续高负载让内部温度超出正常范围。
3. 低温环境导致充电、续航和性能暂时受限。
4. 温度保护机制暂时停用充电、降低性能、调暗屏幕或停用部分相机功能。
5. 在正常环境和低负载下仍持续发热，或伴随电池、主板、充电器等硬件异常。

## Apple 官方方案

1. 停止游戏、导航、相机、视频等高负载操作，并拔下充电器。首次设置、恢复备份或更新后短暂变热且没有温度警告时，结束任务并等待设备自然冷却。
2. 出现温度警告时将设备关机，移到较凉爽且没有阳光直射的环境中，让设备自然降温。
3. 不要使用冰袋、冰箱、冷冻室或第三方工具强行降温；恢复正常温度后再开机和充电。
4. 如果锁定屏幕提示暂停充电，高温时移到更凉爽处，低温时移到更暖和处，并锁定屏幕或让设备进入睡眠状态。
5. 如果设备长期停在 80%，另行检查优化电池充电、充电上限和电池健康设置，不要把它直接等同于温度故障。

Apple 说明，iPhone 和 iPad 设计使用环境温度为 0º 至 35ºC；高温或低温可能让充电、屏幕、蜂窝网络、相机和部分 App 暂时受限。

## 零售排查流程

1. 记录发热是在首次设置、恢复备份、更新、无线充电、导航、游戏、相机还是其他场景出现。
2. 分别在不充电、低负载、无阳光直射和温度适中的环境中观察，不要同时更换多个配件或设置。
3. 记录温度警告、暂停充电通知、屏幕状态、系统版本、充电器和线缆信息。
4. 若只发生在特定充电器或无线充电器上，停止使用该配件并换用可靠配件交叉测试。
5. 若设备恢复正常且没有硬件迹象，可继续观察；若反复出现则带记录联系 Apple 支持。

## 升级处理

如果设备在正常室温、低负载且未充电时仍持续异常发热，或出现鼓包、屏幕被顶起、漏液、冒烟、异味、异常烫手或反复温度警告，应停止继续测试。设备安全时先备份并保存警告截图，再联系 Apple 支持、Apple Store 或 Apple 授权服务提供商。不要自行拆机、挤压或刺穿电池。

## 风险与边界

温度保护是设备的安全机制，不要通过冷冻、冰敷、强制散热、关闭安全功能或不明软件绕过。Apple 没有承诺固定的冷却等待时间；本文也不能判断持续发热一定来自电池、主板、充电器或软件。

## 相关问题

- [iPhone 充电停在 80% 或显示充电暂停](/recipes/iPhone/iphone-charging-paused-80-temperature-charge-limit)
- [iPhone 更新后掉电快或发热](/recipes/iPhone/iphone-battery-drains-after-update)
- [iPhone 无法充电、有线充电没反应或提示液体检测](/recipes/iPhone/iphone-wont-charge-wired-liquid-detected)
