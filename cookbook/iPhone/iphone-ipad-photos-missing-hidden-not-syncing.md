---
schemaVersion: 2
id: iphone-ipad-photos-missing-hidden-not-syncing
title: iPhone 或 iPad 照片、视频不见或不显示
slug: iphone-ipad-photos-missing-hidden-not-syncing
summary: iPhone 或 iPad 的照片、视频在“照片”App 中不见、只在部分图库显示或换设备后找不到时，先检查“最近删除”“已隐藏”“共享图库”、iCloud 照片开关和 Apple 账户，再区分真正删除与尚未同步。
symptoms:
  - iPhone 照片或视频突然不见
  - iPad 照片 App 里找不到以前的照片
  - 照片只在个人图库或共享图库中显示
  - 换 iPhone 后照片没有出现
  - 照片从一台设备消失，其他设备也看不到
  - 照片 App 底部显示正在同步或无法上传
devices:
  - iPhone
  - iPad
platforms:
  - iOS
  - iPadOS
systemVersions:
  - 当前可用的 iOS
  - 当前可用的 iPadOS
categories:
  - iPhone
  - iPad
tags:
  - iPhone
  - iPad
  - 照片
  - 视频
  - iCloud
  - 同步
keywords:
  - iPhone 照片不见
  - iPad 照片不显示
  - 照片视频丢失
  - 照片找不到
  - 照片没有同步
aliases:
  - iPhone photos missing
  - iPad photos missing
  - photos disappeared from iPhone
  - photos not showing in Photos app
  - iPhone 相册照片不见了
errorMessages:
  - 照片不见了
  - 找不到照片
  - 照片无法同步
  - 无法上传
officialTerms:
  - 最近删除
  - 已隐藏
  - 共享图库
  - iCloud 照片
  - 同步此 iPhone
  - 同步此 iPad
communityTerms:
  - 相册空了
  - 换手机照片没了
  - 照片凭空消失
difficulty: Quick
estimatedTime: 5-20 分钟；若需等待图库同步，所需时间另计
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-recently-deleted-hidden-and-shared-library
    title: 先查看“最近删除”“已隐藏”和共享图库
    summary: 照片可能仍在其他精选集或图库视图中，不要先抹掉设备或关闭同步。
    kind: recommended
    steps:
      - 打开“照片”App，轻点“精选集”，向上轻扫，在“更多项目”中查看“最近删除”和“已隐藏”；按提示用面容 ID、触控 ID 或密码解锁。
      - 在“最近删除”中选择项目并轻点“恢复”。删除超过 30 天或已经从“最近删除”中永久删除的项目，不能按这一路径恢复。
      - 在“已隐藏”中选择照片或视频，轻点“更多”，然后轻点“取消隐藏”。如果看不到“已隐藏”，前往“设置 > App > 照片”，打开“显示‘已隐藏’相簿”。
      - 如果使用了 iCloud 共享照片图库，打开“照片”中的个人资料按钮，在图库视图选项中切换“两个图库”“个人图库”或“共享图库”。
    verificationLevel: Official
    sourceIds:
      - apple-photos-missing
    warnings:
      - 使用 iCloud 照片时，在一台设备上删除或隐藏项目会反映到其他设备；恢复前先确认没有误删或误隐藏其他人的共享内容。
    limitations:
      - “最近删除”以外的永久删除项目不能由此步骤恢复；Apple 官方文档没有承诺所有丢失项目都能找回。
  - id: verify-icloud-photos-and-account
    title: 确认 iCloud 照片和 Apple 账户一致
    summary: 换设备或只在一台设备看不到时，先确认 iCloud 照片已打开，并且各设备登录同一个 Apple 账户。
    kind: alternative
    steps:
      - 在 iPhone 或 iPad 上前往“设置”，轻点你的姓名，然后轻点“iCloud > 照片”。确认已打开“同步此 iPhone”或“同步此 iPad”。
      - 在“设置”顶部核对当前登录的 Apple 账户；要跨设备保持图库一致，每台设备都应使用同一个 Apple 账户登录 iCloud。
      - 打开“照片”App，连接稳定的 Wi‑Fi，等待图库状态更新后再次搜索照片或视频；大型图库可能需要更长时间。
      - 也可以登录 iCloud.com 查看照片。如果网页端有项目而设备没有，优先继续检查同步状态、账户和图库视图，不要立刻删除本地照片。
    verificationLevel: Official
    sourceIds:
      - apple-photos-missing
      - apple-icloud-photos
    warnings:
      - 不要在没有确认原片已保留或已备份前关闭 iCloud 照片；关闭同步会改变该设备后续上传、编辑和删除的同步行为。
    limitations:
      - Apple 官方页面说明同步所需时间会受图库大小和网络速度影响，但没有给出固定完成时间。
  - id: handle-unable-to-upload
    title: 看到“无法上传”时先导出，再重新导入
    summary: 如果问题不是整组照片消失，而是部分项目显示“无法上传”，先保留导出副本，再按 Apple 官方流程处理该相簿。
    kind: alternative
    steps:
      - 在“照片”App 中打开“无法上传”相簿，选择要保留的照片或视频，轻点“共享”，再将其保存到“文件”App 中的“我的 iPhone”位置。
      - 打开“文件”App 确认导出文件存在后，再从“无法上传”相簿中删除相应项目，并按提示清理“最近删除”。
      - 回到“文件”App，选择包含导出文件的文件夹，轻点“共享”，然后轻点“保存”以重新导入照片图库。
      - 重新导入后等待 iCloud 照片同步，并检查照片是否出现在图库中。
    verificationLevel: Official
    sourceIds:
      - apple-photos-unable-to-upload
    warnings:
      - Apple 提醒，重新导入前应用到这些照片或视频的编辑内容或关键词可能会丢失；必须先确认导出文件可打开，再删除原项目。
    limitations:
      - 该流程针对“无法上传”相簿中的项目，不等于能恢复已经永久删除或从未保留下来的原片。
  - id: escalate-after-account-and-library-check
    title: 检查后仍缺失时保留证据并联系 Apple
    summary: 如果“最近删除”、隐藏、共享图库、iCloud.com 和账户检查都没有找到项目，不要继续反复关闭同步或抹掉设备。
    kind: escalation
    steps:
      - 记录照片或视频最后一次出现的设备、时间、是否曾删除或隐藏，以及当前每台设备和 iCloud.com 的显示结果。
      - 确认没有在一台设备上误删项目，因为使用 iCloud 照片时删除会同步到其他设备。
      - 如果仍然无法找到需要的项目，携带 Apple 账户、设备系统版本、图库视图和同步状态信息联系 Apple 支持，说明已经完成的检查。
    verificationLevel: Official
    sourceIds:
      - apple-photos-missing
      - apple-icloud-photos
    warnings:
      - 不要在证据未保存前抹掉设备、反复关闭 iCloud 照片或清空“最近删除”。
    limitations:
      - 远程排查无法保证恢复已永久删除、未同步成功或没有任何副本的项目。
warnings:
  - 不要把“已隐藏”“共享图库”“尚未同步”和“已删除”混为同一种故障。
  - 使用 iCloud 照片时，在一台设备上删除照片或视频会从其他使用同一图库的设备中删除。
  - 看到“无法上传”时必须先导出并确认副本，再删除原项目；编辑内容或关键词可能无法保留。
limitations:
  - 本文覆盖 iPhone 和 iPad 的照片、视频不显示、图库视图不一致和部分项目无法上传，不覆盖第三方云相册或没有任何备份的永久删除恢复。
  - 不同 iOS、iPadOS 版本的“照片”App 菜单名称和位置可能略有不同。
  - Apple 官方文档没有承诺开启同步后立即显示所有照片，也没有承诺所有丢失项目都能恢复。
sources:
  - id: apple-photos-missing
    title: 如果你的照片或视频从“照片”App 中丢失
    url: https://support.apple.com/zh-cn/118558
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2026-05-04
    official: true
  - id: apple-icloud-photos
    title: 设置和使用“iCloud 照片”
    url: https://support.apple.com/zh-cn/108782
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2025-12-17
    official: true
  - id: apple-photos-unable-to-upload
    title: 如果你在“照片”App 中看到“无法上传”
    url: https://support.apple.com/zh-cn/101984
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2026-05-21
    official: true
lastVerifiedAt: 2026-07-19
lastUpdatedAt: 2026-07-19
createdAt: 2026-07-19
relatedArticles:
  - icloud-photos-not-syncing-paused-unable-to-upload
  - iphone-system-data-storage-too-large
popular: false
---

# iPhone 或 iPad 照片、视频不见或不显示

## 症状

- iPhone 或 iPad 的“照片”App 中找不到以前能看到的照片或视频。
- 换设备、登录后或打开图库后，只看到部分照片。
- 照片可能在“最近删除”“已隐藏”或共享图库中，但当前视图没有显示。
- 照片 App 显示正在同步，或出现“无法上传”相簿。

## 先分清是哪一种问题

1. **最近删除**：项目被删除后通常会在“最近删除”中保留 30 天。
2. **已隐藏**：项目仍在图库中，但只在“已隐藏”相簿中出现；该相簿本身也可以被隐藏。
3. **共享图库视图**：项目可能属于个人图库或共享图库，当前视图没有选中它。
4. **iCloud 照片或账户不一致**：同步未打开、登录了不同 Apple 账户，或图库仍在等待同步。
5. **部分项目无法上传**：项目仍在“无法上传”相簿中，不等于整组图库被删除。

## 可能原因

1. 照片或视频被删除后仍在“最近删除”中，或已经超过保留期限。
2. 项目被隐藏，或者“已隐藏”相簿本身没有显示。
3. 当前只查看个人图库或共享图库中的一种视图。
4. iCloud 照片未打开、设备登录了不同 Apple 账户，或图库仍在等待网络同步。
5. 少数照片或视频位于“无法上传”相簿，尚未成功加入 iCloud 照片。

## Apple 官方排查顺序

1. 在“照片 > 精选集 > 更多项目”中查看“最近删除”和“已隐藏”，必要时解锁相簿。
2. 在“照片”的个人资料按钮中切换“两个图库”“个人图库”和“共享图库”。
3. 前往“设置 > 你的姓名 > iCloud > 照片”，确认打开“同步此 iPhone”或“同步此 iPad”。
4. 核对每台设备是否登录同一个 Apple 账户，并连接 Wi‑Fi 等待图库状态更新。
5. 登录 iCloud.com 查看网页端是否有缺失项目。
6. 如果看到“无法上传”相簿，先导出文件并确认副本，再按官方流程重新导入。

## Apple 官方方案

1. 打开“照片 > 精选集”，向上轻扫，在“更多项目”中分别查看“最近删除”和“已隐藏”，按提示解锁并恢复或取消隐藏项目。
2. 在“照片”中轻点个人资料按钮，切换“两个图库”“个人图库”和“共享图库”，确认项目不是只存在于另一种图库视图。
3. 前往“设置 > 你的姓名 > iCloud > 照片”，确认打开“同步此 iPhone”或“同步此 iPad”，并核对登录的 Apple 账户。
4. 连接 Wi‑Fi，打开“照片”App 等待图库状态更新；同时可登录 iCloud.com 检查网页端是否有项目。
5. 如果出现“无法上传”相簿，先把项目保存到“文件”App 并确认副本，再删除并重新导入这些项目。

## 零售排查流程

1. 记录顾客最后一次看到照片的设备、时间，以及问题是整组图库不见还是少数项目不见。
2. 在 iPhone 或 iPad 上依次检查“最近删除”“已隐藏”、个人/共享图库视图和 iCloud 照片开关。
3. 核对设备顶部显示的 Apple 账户，并在 iCloud.com 上交叉查看同一图库。
4. 连接 Wi‑Fi 等待同步；若有“无法上传”相簿，先导出文件并确认可以打开。
5. 记录删除、隐藏、切换图库和导入操作是否改变结果，避免在未确认副本前清空或抹掉设备。

## 升级处理

如果上述位置、图库视图、Apple 账户、iCloud.com 和同步状态都已检查，仍找不到重要照片或视频，保留当前设备状态和检查记录并联系 Apple 支持。若问题只影响“无法上传”相簿，说明导出副本是否已确认；若项目已从“最近删除”永久删除且没有其他副本，不要承诺可以恢复。

## 如何判断下一步

- **在“最近删除”中找到**：在保留期限内选择项目并轻点“恢复”。
- **在“已隐藏”中找到**：选择项目并轻点“取消隐藏”；如果相簿不见，先在“设置 > App > 照片”中打开“显示‘已隐藏’相簿”。
- **只在共享图库中找到**：切换到“共享图库”或“两个图库”查看，不要误以为项目已丢失。
- **iCloud.com 有、设备没有**：检查 iCloud 照片开关、Apple 账户、图库视图和网络，然后等待同步。
- **只有“无法上传”中的少数项目受影响**：先导出并重新导入；保留导出副本后再删除原项目。
- **所有位置都找不到**：停止反复关闭同步或清空“最近删除”，记录设备、账户、时间和已完成的检查，再联系 Apple 支持。

## 不要尝试

- 不要在没有导出或备份前清空“最近删除”。
- 不要在没有确认 Apple 账户和原片状态前关闭 iCloud 照片。
- 不要把第三方云相册、信息附件或电脑同步照片当作 iCloud 照片来恢复。
- 不要为了“重新同步”抹掉设备或安装来历不明的照片恢复工具。

## 什么时候需要服务

如果“最近删除”“已隐藏”、共享图库、iCloud.com、iCloud 照片开关和 Apple 账户都已核对，仍找不到重要照片或视频，请保留当前状态和检查记录并联系 Apple 支持。Apple 官方页面没有承诺永久删除、未成功上传且没有副本的项目可以恢复。

## 相关问题

- [iCloud 照片无法同步、已暂停或显示无法上传](/recipes/iCloud/icloud-photos-not-syncing-paused-unable-to-upload)
- [iPhone 系统数据占用很大，储存空间快满](/recipes/iPhone/iphone-system-data-storage-too-large)

## 参考来源

- [Apple 支持：如果你的照片或视频从“照片”App 中丢失](https://support.apple.com/zh-cn/118558)
- [Apple 支持：设置和使用“iCloud 照片”](https://support.apple.com/zh-cn/108782)
- [Apple 支持：如果你在“照片”App 中看到“无法上传”](https://support.apple.com/zh-cn/101984)
