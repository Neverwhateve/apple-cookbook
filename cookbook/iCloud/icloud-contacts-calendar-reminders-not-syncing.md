---
schemaVersion: 2
id: icloud-contacts-calendar-reminders-not-syncing
title: iCloud 通讯录、日历或提醒事项不同步
slug: icloud-contacts-calendar-reminders-not-syncing
summary: iPhone、iPad、Mac 或 iCloud.com 上的通讯录、日历或提醒事项不出现、更新不一致或新增内容没有同步时，先核对 Apple 账户、iCloud 开关、默认账户、日期时间和服务状态，再区分设备、网页与 Windows Outlook 的同步范围。
symptoms:
  - iPhone 新增的通讯录没有出现在 iPad 或 Mac
  - iCloud 日历在另一台设备上不显示或更新滞后
  - 提醒事项只在一台设备上出现
  - iCloud.com 上看不到设备中的通讯录、日历或提醒事项
  - Windows 版 iCloud 与 Outlook 的通讯录或日历不同步
  - 退出登录后重新登录 iCloud，数据仍然没有出现
devices:
  - iPhone
  - iPad
  - Mac
  - Windows PC
platforms:
  - iOS
  - iPadOS
  - macOS
  - Windows
systemVersions:
  - 当前可用的 iOS
  - 当前可用的 iPadOS
  - 当前可用的 macOS
categories:
  - iCloud
tags:
  - iCloud
  - 通讯录
  - 日历
  - 提醒事项
  - 同步
keywords:
  - iCloud 通讯录不同步
  - iCloud 日历不显示
  - iCloud 提醒事项不同步
  - 联系人没有同步到 iPad
  - 日历跨设备不同步
  - 提醒事项只在一台设备显示
aliases:
  - iCloud contacts not syncing
  - iCloud calendar not syncing
  - iCloud reminders not syncing
  - iPhone contacts not showing on Mac
  - iCloud 通讯录不更新
  - iCloud 日历不同步
errorMessages:
  - 通讯录没有同步
  - 日历不见了
  - 提醒事项不同步
  - iCloud 数据不显示
officialTerms:
  - 已存至 iCloud
  - 通讯录
  - 日历
  - 提醒事项
  - 默认账户
  - iCloud.com
communityTerms:
  - 联系人少了一部分
  - 新建日程看不到
  - 待办事项没有同步
difficulty: Quick
estimatedTime: 5-15 分钟；等待网络或服务恢复的时间另计
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-icloud-account-and-switches
    title: 核对 Apple 账户和 iCloud 同步开关
    summary: 同一账户和对应的 iCloud 功能开关是跨设备同步的前提。
    kind: recommended
    steps:
      - 在每台设备上打开 iCloud 设置，确认登录的是同一个 Apple 账户；不要只根据设备名称判断账户是否一致。
      - 在 iPhone 或 iPad 上前往“设置 > 你的姓名 > iCloud”，轻点“查看全部”，确认“通讯录”“日历”和“提醒事项”已打开。
      - 在 Mac 上打开“系统设置 > 你的姓名 > iCloud”，检查相应项目是否已打开；Windows 版 iCloud 用户检查 iCloud 设置中的通讯录和日历选项。
      - 如果系统询问如何处理本机已有数据，先确认是否需要保留本机副本；不要在未确认数据来源前选择删除或合并。
    verificationLevel: Official
    sourceIds:
      - apple-icloud-pim-sync
      - apple-icloud-settings
    warnings:
      - 关闭 iCloud 功能可能让该账户的数据暂时不在设备上显示；操作前先确认 iCloud.com 或其他设备仍有需要保留的内容。
    limitations:
      - 这些步骤不能恢复已经从 iCloud 和所有设备永久删除的数据。
  - id: verify-default-accounts-and-app-views
    title: 检查默认账户和 App 中的显示范围
    summary: 数据可能保存到了 Google、Exchange 或“我的 iPhone”等其他账户，而不是 iCloud。
    kind: alternative
    steps:
      - 在“通讯录”App 中检查列表或账户来源；在“日历”App 中轻点“日历”查看当前显示的日历；在“提醒事项”中检查列表所属账户。
      - 将“通讯录”的默认账户设为 iCloud：前往“设置 > App > 通讯录 > 默认账户”；旧版系统可直接前往“设置 > 通讯录”。
      - 将“日历”的默认日历设为 iCloud，并将“提醒事项”的默认列表设为 iCloud；这些设置只影响之后新建的项目，不会自动搬移旧数据。
      - 登录 iCloud.com，分别打开通讯录、日历和提醒事项，确认问题是设备没有显示，还是数据本身没有出现在 iCloud。
    verificationLevel: Official
    sourceIds:
      - apple-icloud-pim-sync
    warnings:
      - 不同账户中的通讯录、日历和提醒事项不是同一个同步源；把默认账户改为 iCloud 不会自动合并或迁移其他账户中的旧项目。
    limitations:
      - iCloud.com 只能显示存储在 iCloud 中的相应内容，Google、Exchange 或“我的 iPhone”中的项目不会因此出现。
  - id: check-time-network-and-service-status
    title: 检查日期时间、网络和 iCloud 服务状态
    summary: 连接或时间设置异常会阻止更新到达其他设备。
    kind: alternative
    steps:
      - 检查 iCloud 系统状态，确认通讯录、日历或提醒事项服务没有中断。
      - 将设备更新到当前可用的 iOS、iPadOS 或 macOS，并确认设备能稳定访问互联网。
      - 打开“设置 > 通用 > 日期与时间”，确认日期与时间设置正确；不要为了追赶同步手动修改日期。
      - 重新打开对应 App，必要时重新启动 iPhone、iPad 或 Mac，然后在 Wi‑Fi 下再次检查 iCloud.com 和其他设备。
    verificationLevel: Official
    sourceIds:
      - apple-icloud-pim-sync
    warnings:
      - Apple 官方页面没有承诺固定的同步完成时间；不要在同步尚未确认前反复关闭 iCloud 或删除项目。
    limitations:
      - 如果服务端仍在中断或账户本身受限，本地重启不会解决服务问题。
  - id: check-windows-outlook-sync
    title: Windows 与 Outlook 同步异常时更新并重新登录
    summary: Windows 版 iCloud 的通讯录和日历同步有额外的 Outlook 与软件版本条件。
    kind: alternative
    steps:
      - 确认 Windows 和 Windows 版 iCloud 已更新到可用的最新版本；如果通过 Outlook 同步通讯录和日历，也确认 Outlook 已更新。
      - 在 Outlook 中点按“刷新”，查看通讯录和日历是否出现；不要把 iCloud 云端提醒事项误当作 Outlook 已支持的同一数据范围。
      - 如果仍未更新，在 Windows 版 iCloud 中取消选择“日历和通讯录”，点按“应用”，再重新选择并应用；操作前保留需要的本机副本。
      - 退出 Windows 版 iCloud 并重新登录同一个 Apple 账户，再分别在 iCloud.com 和 Outlook 中核对结果。
    verificationLevel: Official
    sourceIds:
      - apple-icloud-pim-sync
    warnings:
      - 重新配置 Windows 版 iCloud 可能改变 Outlook 中的同步状态；不要在未确认 iCloud.com 数据存在前清空本地 Outlook 数据。
    limitations:
      - Windows 版 iCloud 与 Outlook 的同步范围和表现取决于当前软件版本，不能据此推断 iPhone 或 Mac 上的 iCloud 数据已丢失。
  - id: escalate-after-cross-device-check
    title: 交叉核对后仍不一致时保留证据并联系 Apple
    summary: 如果账户、开关、默认账户、网络和 iCloud.com 都已核对，继续删除或反复切换可能增加数据风险。
    kind: escalation
    steps:
      - 记录缺失项目的名称、最后一次出现的设备和时间，并截图每台设备及 iCloud.com 的显示结果。
      - 记录 Apple 账户、设备型号、系统版本、问题涉及的账户类型，以及是否使用 Windows Outlook 或设备管理描述文件。
      - 不要抹掉设备、批量删除账户内容或用第三方“同步修复”工具；携带这些记录联系 Apple 支持继续排查。
    verificationLevel: Official
    sourceIds:
      - apple-icloud-pim-sync
    warnings:
      - 在没有确认其他副本前，不要关闭账户、删除本机账户或删除 iCloud.com 中的通讯录、日历和提醒事项。
    limitations:
      - 远程排查无法保证恢复已经永久删除或从未同步到 iCloud 的项目。
warnings:
  - 不要把 iCloud 同步、iCloud 云备份和第三方账户同步混为同一种功能。
  - 将默认账户改为 iCloud 只影响后续新建项目，不会自动搬移其他账户中的旧数据。
  - 关闭同步、退出账户或删除内容前，先在 iCloud.com 或其他设备确认需要保留的数据。
limitations:
  - 本文覆盖 iCloud 通讯录、日历和提醒事项在 Apple 设备、iCloud.com 及 Windows Outlook 之间不显示或不同步，不覆盖第三方 App 自身的数据同步故障。
  - 不同系统版本的“设置”路径和 App 布局可能略有不同；以设备当前显示为准。
  - Apple 官方页面没有承诺所有服务中断或账户问题都能通过本地步骤解决。
sources:
  - id: apple-icloud-pim-sync
    title: 如果你的 iCloud 通讯录、日历或提醒事项没有同步
    url: https://support.apple.com/zh-cn/102543
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
  - id: apple-icloud-settings
    title: 在 iPhone 上使用 iCloud
    url: https://support.apple.com/zh-cn/guide/iphone/iphde0f868fd/ios
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-19
lastUpdatedAt: 2026-07-19
createdAt: 2026-07-19
relatedArticles:
  - icloud-photos-not-syncing-paused-unable-to-upload
  - icloud-storage-full-iphone-backup-fails
popular: false
---

# iCloud 通讯录、日历或提醒事项不同步

## 症状

- 在 iPhone、iPad、Mac 或 iCloud.com 上看不到另一台设备新增的通讯录、日历或提醒事项。
- 同一个项目只在一台设备出现，或者不同设备显示的内容不一致。
- Windows 版 iCloud 与 Outlook 中的通讯录或日历没有更新。

## 先分清问题范围

1. **iCloud 开关或 Apple 账户不一致**：设备没有使用同一个 Apple 账户，或对应项目没有存储到 iCloud。
2. **默认账户不同**：新项目可能保存在 Google、Exchange、“我的 iPhone”或其他账户中，不会出现在 iCloud 设备上。
3. **网络、日期时间或服务状态异常**：设备无法连接 iCloud 服务时，更新不会及时到达其他设备。
4. **Windows Outlook 是额外同步链路**：Windows 版 iCloud、Outlook 和 iCloud.com 可能显示不同范围，不能只看 Outlook 判断 iCloud 数据是否丢失。

## 可能原因

1. 设备登录了不同的 Apple 账户，或对应的 iCloud 功能没有打开。
2. 新项目保存到了 Google、Exchange、“我的 iPhone”或其他账户，而不是 iCloud。
3. 通讯录、日历或提醒事项在 App 中被隐藏，或者当前查看的列表、日历不是 iCloud 来源。
4. 网络、日期时间、系统版本或 iCloud 服务状态阻止了更新。
5. Windows 版 iCloud、Outlook 与 iCloud.com 之间的同步链路没有刷新。

## Apple 官方排查顺序

1. 确认每台设备登录同一个 Apple 账户，并在 iCloud 设置中打开“通讯录”“日历”和“提醒事项”。
2. 在三个 App 中检查项目所属账户、列表和日历视图；确认新建项目不是保存在其他账户或“我的 iPhone”中。
3. 登录 iCloud.com 分别打开通讯录、日历和提醒事项，判断数据是否已经到达 iCloud。
4. 检查 iCloud 系统状态、网络、系统更新和日期时间，然后重新启动设备并再次查看。
5. 如果使用 Windows Outlook，更新 Windows 版 iCloud 和 Outlook，刷新 Outlook，并按官方流程重新应用“日历和通讯录”同步选项。

## Apple 官方方案

1. 核对每台设备的 Apple 账户，并在 iCloud 设置中打开“通讯录”“日历”和“提醒事项”。
2. 检查三个 App 的账户来源、列表和日历视图，把后续新建项目的默认账户设为 iCloud（如确有需要）。
3. 登录 iCloud.com 交叉查看数据是否已经到达 iCloud。
4. 检查 iCloud 系统状态、网络、系统更新和日期时间，重新启动设备后再次测试。
5. 如果使用 Windows Outlook，更新软件并重新应用“日历和通讯录”同步设置。

### 1. 检查 iCloud 设置

在 iPhone 或 iPad 上前往“设置 > 你的姓名 > iCloud > 查看全部”，确认“通讯录”“日历”和“提醒事项”已打开。在 Mac 上检查“系统设置 > 你的姓名 > iCloud”；每台设备都要核对 Apple 账户是否相同。

### 2. 检查默认账户和显示范围

在“通讯录”中查看列表来源，在“日历”中查看当前勾选的日历，在“提醒事项”中查看列表所属账户。需要让新项目默认保存到 iCloud 时，在设置中将通讯录默认账户、默认日历和默认提醒事项列表改为 iCloud。这个操作只影响后续新项目，不会自动迁移旧项目。

### 3. 用 iCloud.com 交叉验证

登录 iCloud.com，分别查看通讯录、日历和提醒事项。如果网页端有项目而设备没有，优先检查设备的 iCloud 开关、Apple 账户、网络和 App 视图；如果网页端也没有，先核对项目原本属于哪个账户，不要直接删除或退出账户。

### 4. 检查网络、时间和服务状态

确认 iCloud 服务没有中断，设备已更新并能稳定联网；在“设置 > 通用 > 日期与时间”中确认日期和时间正确。重新打开相关 App，必要时重新启动设备，再在 Wi‑Fi 下检查同步结果。

### 5. Windows Outlook 用户

确认 Windows 版 iCloud 和 Outlook 已更新。在 Outlook 中刷新；如果通讯录或日历仍不更新，在 Windows 版 iCloud 中取消选择“日历和通讯录”并应用，再重新选择并应用，最后退出并重新登录同一个 Apple 账户。先确认 iCloud.com 中的数据存在，再处理本机 Outlook 数据。

## 不要尝试

- 不要把 iCloud 云备份当作实时同步；备份和同步保护数据的方式不同。
- 不要在没有确认 iCloud.com 或其他设备有副本前关闭同步、退出账户或删除内容。
- 不要把“我的 iPhone”、Google 或 Exchange 中的项目误判为 iCloud 项目。
- 不要为了强制同步手动修改日期、抹掉设备或安装第三方同步修复工具。

## 零售排查流程

1. 先记录缺失的是通讯录、日历还是提醒事项，以及项目最后一次出现的设备和时间。
2. 在每台设备上核对 Apple 账户、iCloud 功能开关、App 的账户来源和当前显示列表。
3. 登录 iCloud.com 做交叉验证，区分“设备没有显示”和“项目没有存到 iCloud”。
4. 检查系统状态、网络、日期时间和软件版本；Windows 用户额外记录 Outlook 与 iCloud.com 的结果。
5. 在没有确认副本前，不关闭同步、不退出账户、不删除内容；保留截图和项目名称。

## 升级处理

- iCloud.com 和所有设备都找不到重要项目，且无法确认是否曾经同步：保留现状和记录，联系 Apple 支持。
- iCloud.com 有数据但多台设备持续不显示：提供 Apple 账户、设备型号、系统版本、同步开关和已完成步骤。
- Windows Outlook 单独异常：记录 Windows 版 iCloud、Outlook 版本及刷新或重新应用同步选项后的结果。
- 设备受公司或学校描述文件管理，或服务状态持续异常：联系管理员或 Apple 支持，不要自行删除管理配置。

## 什么时候需要服务

如果 Apple 账户、iCloud 开关、默认账户、App 视图、iCloud.com、网络、日期时间和 Windows Outlook 设置都已核对，内容仍持续不一致，请记录设备、系统版本、账户来源、缺失项目和每台设备的显示结果，再联系 Apple 支持。不要承诺可以恢复从未同步到 iCloud 或已经永久删除的项目。

## 相关问题

- [iCloud 照片无法同步、已暂停或显示无法上传](/recipes/iCloud/icloud-photos-not-syncing-paused-unable-to-upload)
- [iCloud 储存空间已满，iPhone 或 iPad 无法备份](/recipes/iCloud/icloud-storage-full-iphone-backup-fails)

## 参考来源

- [Apple 支持：如果你的 iCloud 通讯录、日历或提醒事项没有同步](https://support.apple.com/zh-cn/102543)
- [Apple 支持：在 iPhone 上使用 iCloud](https://support.apple.com/zh-cn/guide/iphone/iphde0f868fd/ios)
