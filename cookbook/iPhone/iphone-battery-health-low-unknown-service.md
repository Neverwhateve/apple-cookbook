---
schemaVersion: 2
id: iphone-battery-health-low-unknown-service
title: iPhone 电池健康下降、显示维修或无法验证电池
slug: iphone-battery-health-low-unknown-service
summary: iPhone 电池健康容量下降、显示“维修”、意外关机，或提示无法验证电池时，先查看电池健康与部件维修历史，再区分自然老化、非正品电池和需要 Apple 服务的情况。
symptoms:
  - iPhone 电池健康下降
  - iPhone 电池健康显示维修
  - iPhone 电池容量低于 80%
  - iPhone 提示无法验证电池
  - iPhone 电池显示未知部件
  - iPhone 电量跳变或意外关机
  - iPhone 换电池后电池健康不准确
devices:
  - iPhone
platforms:
  - iOS
systemVersions:
  - 当前支持的 iOS
categories:
  - iPhone
tags:
  - iPhone
  - 电池
  - 电池健康
  - 电池维修
  - 部件与维修历史
keywords:
  - 电池健康
  - 最大容量
  - 电池维修
  - 未知部件
  - 正品电池
aliases:
  - iPhone battery health service
  - iPhone battery maximum capacity low
  - iPhone battery health unavailable
  - iPhone unable to verify battery
  - iPhone battery unknown part
  - iPhone 电池健康不准确
  - iPhone 电池需要维修
errorMessages:
  - 电池健康状况显著下降
  - 无法验证此 iPhone 电池是正品 Apple 电池
  - 重要电池信息
  - 未知部件
officialTerms:
  - 电池健康
  - 最大容量
  - 峰值性能容量
  - 部件与维修历史
  - 正品 Apple 电池
communityTerms:
  - 电池健康掉到 80
  - 电池寿命到了
  - 换电池后显示未知
  - 电池鼓包
difficulty: Quick
estimatedTime: 5-15 分钟；需要服务时更久
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: inspect-battery-health-and-device-history
    title: 先查看电池健康和部件维修历史
    summary: Apple 建议在“设置”>“电池”中查看电池健康；支持的机型还可查看循环计数、生产日期和首次使用日期，并在“设置”>“通用”>“关于本机”查看部件与维修历史。
    kind: recommended
    steps:
      - 打开“设置”>“电池”，在 iPhone 14 或更早机型中查看“电池健康与充电”，在 iPhone 15 或更新机型中查看“电池健康”。
      - 记录“最大容量”、峰值性能相关信息，以及是否出现“电池健康状况显著下降”或“维修”提示。
      - 在 iPhone XR、iPhone XS 及更新机型上，打开“设置”>“通用”>“关于本机”，查看“部件与维修历史”中的电池状态。
      - 不要只根据百分比判断故障；同时记录意外关机、电量跳变、无法充电或明显发热等症状。
    verificationLevel: Official
    sourceIds:
      - apple-battery-health
      - apple-battery-performance
      - apple-genuine-battery
    warnings:
      - 电池容量会随使用和充电循环自然下降，单独看到较低百分比不等于立即存在安全风险。
      - 不要把“电池健康”读数当作第三方检测的精确诊断。
    limitations:
      - 菜单名称和可见字段会随机型与 iOS 版本不同。
  - id: distinguish-aging-from-unverified-battery
    title: 区分自然老化、未知部件和无法验证
    summary: “电池健康状况显著下降”主要说明容量和性能已受影响；“无法验证”或“未知部件”则表示电池身份、维修关联或工作状态无法确认，健康信息可能不准确。
    kind: recommended
    steps:
      - 如果只显示容量下降或“电池健康状况显著下降”，结合续航、性能和意外关机情况评估电池服务需求。
      - 如果显示“无法验证此 iPhone 电池是正品 Apple 电池”，不要据此断言真实容量；Apple 说明电池健康详细信息可能不准确。
      - 如果“部件与维修历史”显示“未知”，记录是否近期更换过电池、维修是否完成验证，以及设备是否出现充电或性能异常。
      - 不要为了让百分比恢复而抹掉 iPhone、关闭安全功能或安装所谓电池校准工具。
    verificationLevel: Official
    sourceIds:
      - apple-battery-performance
      - apple-genuine-battery
    warnings:
      - 非正品、二手、损坏或不匹配的电池可能带来容量、性能、充电和安全问题。
      - 社区中的“校准电池健康”方法不是 Apple 官方修复，不能解决无法验证或硬件问题。
    limitations:
      - 远程步骤不能确认电池是否为正品或是否存在内部损坏。
  - id: choose-battery-service-and-safety-escalation
    title: 需要更换或出现安全迹象时联系 Apple 服务
    summary: 电池健康提示维修、续航和意外关机已经影响使用，或电池出现鼓包、异常发热、异味和外壳顶起时，应停止自行拆机并联系 Apple 或 Apple 授权服务提供商。
    kind: escalation
    steps:
      - 先备份重要数据；如果设备仍能使用，记录电池健康页面和部件维修历史页面，便于服务人员判断。
      - 通过 Apple 支持、Apple Store 或 Apple 授权服务提供商获取电池检查和维修选项；具体价格与资格需以设备检查和所在地页面为准。
      - 如果出现鼓包、漏液、刺鼻气味、异常发热、冒烟或外壳被顶开，立即停止充电和继续使用，把设备放在远离可燃物的位置，并尽快联系专业服务；不要挤压、穿刺、加热或自行拆机。
      - 如果只是容量下降但没有安全迹象，可先继续使用并安排合适的电池服务，不要承诺“低于某个百分比就一定免费更换”。
    verificationLevel: Official
    sourceIds:
      - apple-battery-service
      - apple-genuine-battery
    warnings:
      - 锂离子电池是敏感组件，Apple 建议由受训技术人员更换。
      - 服务选项、费用和 AppleCare 保障会因机型、地点和检查结果不同。
    limitations:
      - 本文不能替代对电池温度、形变或内部损坏的现场检查。
warnings:
  - 电池健康百分比不是“还能用几天”的承诺，也不是单独的安全检测结果。
  - 看到“无法验证”或“未知部件”时，电池健康信息可能不准确。
  - 任何鼓包、漏液、冒烟、异味或异常发热都应优先按安全和服务路径处理。
limitations:
  - 本文覆盖 iPhone 内置电池健康、正品验证和服务分流；不覆盖 iPad、Mac 或第三方电池测试仪。
  - 本文不提供自行拆机、更换电池、修改电池健康数值或绕过部件验证的方法。
sources:
  - id: apple-battery-health
    title: 了解 iPhone 电池用量和健康
    url: https://support.apple.com/zh-cn/guide/iphone/iphd453d043a/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
  - id: apple-battery-performance
    title: iPhone 电池和性能
    url: https://support.apple.com/zh-cn/101575
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2026-06-12
    official: true
  - id: apple-genuine-battery
    title: 关于正品 iPhone 电池
    url: https://support.apple.com/zh-cn/103269
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2026-05-29
    official: true
  - id: apple-battery-service
    title: 适用于 iPhone 电池的 Apple 服务和维修
    url: https://support.apple.com/zh-cn/iphone/repair/battery-replacement
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-19
lastUpdatedAt: 2026-07-19
createdAt: 2026-07-19
relatedArticles:
  - iphone-battery-drains-after-update
  - iphone-charging-paused-80-temperature-charge-limit
  - iphone-wont-charge-wired-liquid-detected
popular: true
---

# iPhone 电池健康下降、显示维修或无法验证电池

看到电池健康下降、提示“维修”或“无法验证此 iPhone 电池是正品 Apple 电池”时，先不要抹掉设备或购买所谓校准工具。先把电池自然老化、维修后无法验证和需要立即处理的安全迹象分开。

## 症状

- “电池健康掉到 80% 以下，是不是必须马上换？”
- “电池健康显示维修，手机还可以继续用吗？”
- “换过电池后提示无法验证，百分比准不准？”
- “电量从几十跳到个位数，手机经常意外关机。”
- “设置里显示未知部件或重要电池信息。”
- “电池鼓包把屏幕顶起来，能不能继续充电？”

## 可能原因

1. **可充电电池自然老化**：容量和提供峰值性能的能力会随使用和充电循环下降。
2. **电池健康提示需要服务**：电池的容量或峰值性能已经明显受影响，续航、性能或意外关机问题可能更明显。
3. **电池身份或维修状态无法验证**：非正品、无法正常使用、维修后未完成验证或无法关联到设备时，可能显示“未知”，相关健康信息也可能不准确。
4. **充电、网络或 App 问题被误认为电池故障**：单个 App 耗电、弱信号、更新后的后台任务和温度保护可能造成短期续航变化。
5. **电池存在安全或硬件异常**：鼓包、漏液、异常发热、异味或电量跳变需要优先按服务和安全路径处理。

## Apple 官方方案

验证级别：Apple 官方

1. 打开**设置 > 电池**，在 iPhone 14 或更早机型中查看“电池健康与充电”，在 iPhone 15 或更新机型中查看“电池健康”。
2. 记录最大容量、峰值性能提示，以及支持机型提供的循环计数、生产日期和首次使用日期。
3. 在 iPhone XR、iPhone XS 及更新机型上，打开**设置 > 通用 > 关于本机**，查看“部件与维修历史”中的电池状态。
4. 如果出现“电池健康状况显著下降”或“维修”，结合续航、意外关机和性能变化，联系 Apple 支持或授权服务提供商评估电池服务。
5. 如果出现“无法验证此 iPhone 电池是正品 Apple 电池”或“未知部件”，不要把当前百分比当作准确容量；带上维修记录和设备信息做专业检查。
6. 如果出现鼓包、漏液、冒烟、异味或异常发热，立即停止充电和继续使用，跳过普通软件排查并联系专业服务。

参考来源：

- [Apple 支持：了解 iPhone 电池用量和健康](https://support.apple.com/zh-cn/guide/iphone/iphd453d043a/ios)
- [Apple 支持：iPhone 电池和性能](https://support.apple.com/zh-cn/101575)
- [Apple 支持：关于正品 iPhone 电池](https://support.apple.com/zh-cn/103269)
- [Apple 支持：适用于 iPhone 电池的 Apple 服务和维修](https://support.apple.com/zh-cn/iphone/repair/battery-replacement)

## 先做安全分流

如果设备出现鼓包、外壳或屏幕被顶起、漏液、冒烟、刺鼻气味或异常发热，立即停止充电和继续使用，远离可燃物并联系 Apple 或授权服务提供商。不要挤压电池、用针刺破、加热、冷冻或自行拆机。

如果没有这些迹象，打开**设置 > 电池**查看电池健康。在 iPhone 14 或更早机型中通常进入“电池健康与充电”；在 iPhone 15 或更新机型中进入“电池健康”。支持的机型还可以查看循环计数、生产日期和首次使用日期。[Apple 的中文使用手册](https://support.apple.com/zh-cn/guide/iphone/iphd453d043a/ios)说明了这些入口和字段。

## 如何理解不同提示

### 只是最大容量下降

可充电电池属于消耗品，容量和峰值性能会随时间和充电循环下降。把最大容量当作评估线索，不要把某个百分比当作所有机型、所有地区都适用的强制更换线。还要结合续航、意外关机、性能变化和充电表现判断。

### “电池健康状况显著下降”或“维修”

Apple 说明，这类提示表示电池容量或提供峰值性能的能力已经明显受影响；设备通常仍可使用，但续航和性能问题可能更明显。若已经影响日常使用，安排电池检查或更换通常比反复重启、抹掉设备更有针对性。[iPhone 电池和性能](https://support.apple.com/zh-cn/101575)是判断这类提示的主要官方依据。

### “无法验证”或“未知部件”

在 iPhone XR、iPhone XS 及更新机型上，打开**设置 > 通用 > 关于本机**，查看“部件与维修历史”。Apple 说明，电池不是正品、无法正常使用、维修后未完成验证或无法关联到设备时，可能显示“未知”；如果无法验证电池是正品，电池健康详细信息可能不准确。[关于正品 iPhone 电池](https://support.apple.com/zh-cn/103269)还说明了正品部件与维修记录的限制。

这不等于可以仅凭提示断定维修店或电池一定有某一种故障。记录维修时间、维修渠道、设备型号、当前 iOS 版本和实际症状，再交给专业服务检查。

## Apple 官方排查与处理顺序

1. 备份重要数据，截图保存“电池健康”和“部件与维修历史”页面。
2. 记录最大容量、峰值性能提示、循环计数（如果机型提供）和是否意外关机。
3. 如果问题只是续航下降，查看**设置 > 电池**中的每日用量，先排除某个 App、弱信号或更新后后台任务造成的额外耗电。
4. 如果出现“维修”、反复意外关机、明显电量跳变或设备只能插电使用，联系 Apple 支持、Apple Store 或 Apple 授权服务提供商评估电池服务。[适用于 iPhone 电池的 Apple 服务和维修](https://support.apple.com/zh-cn/iphone/repair/battery-replacement)会根据机型、所在地和保障情况提供选项。
5. 如果出现“无法验证”或“未知部件”，不要继续用百分比判断电池实际容量，也不要安装第三方校准工具；带着维修记录和设备去做专业检查。
6. 如果出现鼓包、漏液、冒烟、异味或异常发热，跳过普通软件排查，立即按安全分流停止使用并升级服务。

## 不建议的处理

- 不要通过抹掉 iPhone、降级系统或反复充放电来“修复”电池健康百分比。
- 不要把社区里的“电池校准”“修改健康度”方案写成 Apple 官方方法。
- 不要自行拆卸或更换内置锂离子电池。
- 不要承诺低于某个百分比就一定免费更换；费用、保障和服务选项需要以 Apple 检查结果及所在地为准。

## 零售排查流程

1. 先问清楚提示原文、设备型号、iOS 版本、最近是否换过电池，以及是否出现过跌落、进水、鼓包或异常发热。
2. 打开“电池健康”和“部件与维修历史”页面，记录最大容量、维修提示、未知部件和峰值性能信息。
3. 如果只是续航变差，查看“设置 > 电池”的每日用量，区分 App、弱信号、更新后台任务和电池老化。
4. 如果有意外关机、电量跳变或“维修”提示，说明软件设置不会恢复已经衰退的电池容量，转入电池服务评估。
5. 如果有维修后“未知”或“无法验证”提示，保留维修凭证并升级到 Apple 或专业服务提供商，不建议反复抹掉设备。
6. 如果有形变、漏液、异味、冒烟或异常发热，停止充电和使用，按安全流程隔离并升级服务。

## 升级处理

联系 Apple 支持或前往 Apple Store、Apple 授权服务提供商：

- 电池健康显示“维修”或“显著下降”，且续航、性能或意外关机已经影响使用。
- 电池更换后显示“无法验证”或“未知部件”，需要确认部件和维修状态。
- 电量跳变、只能插电使用、反复意外关机或充电异常无法通过基础检查解释。

立即停止使用并优先处理安全问题：

- 电池鼓包导致屏幕或外壳被顶起。
- 出现漏液、冒烟、刺鼻气味或异常发热。
- 设备在充电或静置时持续升温。

不要承诺具体费用、免费资格或维修后一定恢复原有续航；服务选项会因机型、所在地、保障和检查结果而变化。

## 相关问题

- [iPhone 更新后掉电快或发热](/recipes/iPhone/iphone-battery-drains-after-update)
- [iPhone 充电停在 80% 或显示充电暂停](/recipes/iPhone/iphone-charging-paused-80-temperature-charge-limit)
- [iPhone 无法充电、有线充电没反应或提示液体检测](/recipes/iPhone/iphone-wont-charge-wired-liquid-detected)
- [iPhone 黑屏、无法开机或电量耗尽后没反应](/recipes/iPhone/iphone-black-screen-wont-turn-on-after-battery-drained)
