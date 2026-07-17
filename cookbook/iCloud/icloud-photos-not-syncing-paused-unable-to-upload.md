---
schemaVersion: 2
id: icloud-photos-not-syncing-paused-unable-to-upload
title: iCloud 照片无法同步、已暂停或显示无法上传
slug: icloud-photos-not-syncing-paused-unable-to-upload
summary: iPhone、iPad 或 Mac 的 iCloud 照片停在正在同步、已暂停、无法上传，或新照片没有出现在其他设备时，先查看“照片”App 的图库状态，再按电源、网络、低电量/低数据模式、iCloud 空间、共享图库和“无法上传”相簿分流。
symptoms:
  - iCloud 照片无法同步
  - iCloud 照片已暂停
  - 照片一直正在上传到 iCloud
  - iPhone 照片没有同步到 iPad 或 Mac
  - Mac 照片没有同步到 iPhone
  - 照片 App 显示无法上传
  - 无法将项目同步到 iCloud
  - 优化储存空间后照片原片打不开或下载很慢
  - 共享图库照片不见了
  - iCloud 储存空间已满导致照片同步暂停
devices:
  - iPhone
  - iPad
  - Mac
  - Apple Vision Pro
  - Windows PC
platforms:
  - iOS
  - iPadOS
  - macOS
  - visionOS
  - Windows
systemVersions:
  - iOS 17 或更低版本的图库状态入口在“图库 > 所有照片”底部
  - iOS 18 的暂停入口在“照片”App 个人资料按钮中
  - iOS 26 或更高版本的同步状态入口在“照片 > 精选集”顶部个人资料按钮中
  - macOS 的图库状态在“照片”App 的“图库/所有照片”底部
categories:
  - iCloud
tags:
  - iCloud
  - Photos
  - Sync
  - Storage
  - Backup
  - Mac
  - iPhone
  - iPad
keywords:
  - iCloud 照片同步
  - 已暂停与 iCloud 同步
  - 无法上传相簿
  - 无法将项目同步到 iCloud
  - 优化 iPhone 储存空间
  - 下载并保留原片
  - iCloud 共享照片图库
  - 照片原片下载
aliases:
  - iCloud Photos not syncing
  - iCloud Photos sync paused
  - iCloud Photos unable to upload
  - Photos stuck uploading to iCloud
  - iPhone photos not syncing to Mac
  - Mac photos not syncing to iPhone
  - iCloud Photos low power mode paused
  - iCloud Photos storage full
  - iCloud 照片不同步
  - iCloud 照片暂停同步
  - 照片无法上传 iCloud
errorMessages:
  - 已暂停与 iCloud 同步
  - 低数据模式
  - 低电量模式
  - 正在优化电池电量
  - 正在优化系统性能
  - 网络连接不佳
  - 电池电量不足
  - 设备需要降温
  - iCloud 储存空间已满
  - 将照片移至个人图库以继续同步
  - 无法将项目同步到 iCloud
  - 无法上传
officialTerms:
  - iCloud 照片
  - 同步此 iPhone
  - 同步此 iPad
  - 同步此 Mac
  - 优化储存空间
  - 下载并保留原片
  - 导出未修改的原片
  - iCloud 共享照片图库
  - 无法上传
  - 最近删除
communityTerms:
  - 照片卡上传
  - 照片云端不同步
  - 原片下载不了
  - 换手机照片少了
  - iCloud 照片一直转圈
difficulty: Moderate
estimatedTime: 10-30 分钟；大图库、弱网络或首次上传可能需要过夜
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-library-status-first
    title: 先查看“照片”App 的图库状态，不要先关闭 iCloud 照片
    summary: Apple 要求先检查设备设置和“照片”App 的图库状态；同步暂停时关闭 iCloud 或 iCloud 照片会让同步重新开始，通常会拖慢排查。
    kind: recommended
    steps:
      - 将设备接入电源并连接稳定无线局域网；如果图库很大，安排过夜不间断同步。
      - 确认这台设备已登录 iCloud，并且 Apple 账户与其他需要同步的设备相同。
      - 在 iPhone 或 iPad 上打开“照片”App，按当前系统入口查看图库状态；iOS 26 或更高版本在“精选集”顶部个人资料按钮，iOS 17 或更低版本在“图库 > 所有照片”底部。
      - 在 Mac 上打开“照片”App，选择“图库”或“所有照片”，滚动到底部查看状态。
      - 根据状态信息处理，不要先关闭 iCloud 或“iCloud 照片”。
      - 如果只是在个人图库里找不到照片，同时使用了 iCloud 共享照片图库，先切换图库视图；移到共享图库的照片不会继续显示在个人图库中。
    verificationLevel: Official
    sourceIds:
      - apple-icloud-photos-sync-paused
      - apple-setup-use-icloud-photos
    warnings:
      - 不要为了“刷新同步”直接关闭 iCloud 或 iCloud 照片；Apple 明确提示这会让同步过程重新开始。
      - 在没确认云端和本机副本前，不要批量删除照片或清空“最近删除”。
    limitations:
      - 大图库和慢网络无法通过文章承诺固定完成时间；需要看图库大小、网络速度和设备状态。
  - id: map-paused-status-to-cause
    title: 按暂停原因处理电量、网络、温度和 iCloud 空间
    summary: “低数据模式”“低电量模式”“网络连接不佳”“设备需要降温”和“iCloud 储存空间已满”代表不同暂停原因，处理顺序不同。
    kind: recommended
    steps:
      - 如果状态显示“低数据模式”或“低电量模式”，先按需要关闭对应模式，或接入电源并使用不限量、稳定的无线局域网。
      - 如果显示“电池电量不足”，先给设备充电；低于 20% 时同步可能暂停。
      - 如果显示“正在优化电池电量”“正在优化系统性能”或“网络连接不佳”，可轻点“现在同步”，也可以等待系统自动恢复。
      - 如果显示设备需要降温，把设备移到凉爽环境，停止高负载使用并等待降温后再同步。
      - 如果显示 iCloud 储存空间已满，先管理 iCloud 储存空间或升级 iCloud+，不要只清理 iPhone 本机空间。
      - 如果共享图库提示“将照片移至个人图库以继续同步”，把项目移回个人图库，或等待共享图库所有者释放/升级 iCloud 空间。
    verificationLevel: Official
    sourceIds:
      - apple-icloud-photos-sync-paused
      - apple-setup-use-icloud-photos
    warnings:
      - 清理 iCloud 照片会影响所有打开 iCloud 照片并使用同一 Apple 账户的设备。
      - 关闭低电量或低数据模式会增加电量或网络数据使用；先确认用户能接受。
    limitations:
      - 文章不能判断 Apple 系统状态、家庭或公司网络策略、运营商数据策略是否正在影响同步。
  - id: confirm-icloud-photos-settings-and-storage-model
    title: 确认同步开关、同一 Apple 账户和照片储存模型
    summary: iCloud 照片需要每台设备打开对应同步开关；开启后照片和视频会进 iCloud 照片，不会在 iCloud 云备份里重复备份。
    kind: recommended
    steps:
      - 在 iPhone、iPad 或 Apple Vision Pro 上打开“设置 > [你的姓名] > iCloud > 照片”，确认“同步此 [设备]”已打开。
      - 在 Mac 上打开“系统设置 > [你的姓名] > iCloud > 照片”，确认“同步此 Mac”已打开。
      - 确认所有设备使用同一 Apple 账户；不同账户之间不会自动出现同一套个人 iCloud 照片图库。
      - 解释“优化储存空间”：原始高分辨率版本保留在 iCloud，本机在空间不足时保留较小版本，需要网络再下载原片。
      - 如果要长期保留本机全尺寸照片，iPhone/iPad 选择“下载并保留原片”，Mac 选择“将原片下载到此 Mac”，并确认本机空间足够。
      - 告知用户：打开 iCloud 照片后，照片和视频不会在 iCloud 云备份中重复备份；仍应另存图库备份副本。
    verificationLevel: Official
    sourceIds:
      - apple-setup-use-icloud-photos
      - apple-iphone-backup-sync-photos
    warnings:
      - “优化储存空间”不是照片丢失，但没有网络或 iCloud 异常时，原片下载会受影响。
      - 不要把 iCloud 云备份成功误认为已经单独备份了所有 iCloud 照片；Apple 说明开启 iCloud 照片后不会重复进入 iCloud 云备份。
    limitations:
      - Windows 版 iCloud、第三方照片管理器和 NAS 同步工具不在本文深入排查范围内。
  - id: fix-unable-to-upload-album
    title: 处理“无法上传”相簿前先导出，再重新导入
    summary: Apple 对“无法上传”项目的路径是导出未上传项目、确认文件已保存、从照片图库删除对应项目，再重新导入；编辑内容或关键词可能丢失。
    kind: recommended
    steps:
      - 在“照片”App 中查找“无法上传”相簿，或从图库状态旁的“查看”进入无法同步项目。
      - 在 iPhone 或 iPad 上选择“无法上传”中的项目，先通过共享菜单保存到“文件”App 的本机位置，并打开“文件”确认导出成功。
      - 确认已导出后，再从“无法上传”相簿删除这些项目，并按需要从“最近删除”中删除。
      - 从“文件”App 重新选择这些文件，通过共享菜单保存回“照片”。
      - 在 Mac 上选择“无法上传”相簿中的项目，导出未修改原片到安全位置，确认导出成功后删除原项目，再通过“文件 > 导入”重新导入。
      - 重新导入后等待 iCloud 照片同步，并检查是否还出现同样项目。
    verificationLevel: Official
    sourceIds:
      - apple-photos-unable-to-upload
    warnings:
      - Apple 提醒重新导出/导入可能丢失对这些照片或视频做过的编辑内容或关键词。
      - 删除前必须先确认导出的文件能在“文件”App、Finder 或目标文件夹中打开；不要删除唯一副本。
    limitations:
      - 如果文件格式损坏、来自第三方 App 的元数据异常，或本机储存空间不足，重新导入仍可能失败。
  - id: download-originals-before-transfer-or-disable
    title: 需要迁移、导入电脑或关闭 iCloud 照片前先下载原片
    summary: 开启 iCloud 照片和优化储存空间后，本机可能只有节省空间版本；导入电脑、外置储存或关闭 iCloud 照片前要先下载全分辨率原片。
    kind: alternative
    steps:
      - 需要在 iPhone 或 iPad 上导出少量项目时，先更新系统并连接无线局域网，在“照片”中选择项目，使用“导出未修改的原片”保存到“文件”App、外置储存或其他位置。
      - 需要在 Mac 保留完整图库时，打开“照片 > 设置 > iCloud”，选择“将原片下载到此 Mac”，并等待下载完成。
      - 需要从 icloud.com 下载时，登录 iCloud 照片，选择项目后使用下载选项；移动端一次最多选择 1,000 个项目。
      - 如果要关闭 iCloud 照片，先确认设备空间足够并选择下载照片和视频；否则优化后的本机项目不一定是原始分辨率。
      - 如果要把照片从 iPhone 或 iPad 导入 Windows PC，先确认 iCloud 原片已下载到设备。
    verificationLevel: Official
    sourceIds:
      - apple-download-icloud-photos
      - apple-turn-off-icloud-photos
      - apple-transfer-photos-to-computer
    warnings:
      - 下载原片可能需要大量本机空间、时间和稳定网络；空间不足时不要强行关闭同步。
      - 从任一设备删除 iCloud 照片内容，会同步删除 iCloud 和其他开启 iCloud 照片的设备上的对应内容。
    limitations:
      - 本文不提供批量迁移大型图库的时间估算；需要按图库大小、网络速度和目标储存设备性能评估。
warnings:
  - 不要在确认云端、本机和导出副本前批量删除照片、视频或“最近删除”。
  - 不要把“优化储存空间”误判为照片丢失；它可能只是本机保留较小版本，原片需要联网下载。
  - 不要用关闭 iCloud 或 iCloud 照片当作第一步排查同步暂停；这可能让同步重新开始。
  - 不要把 iCloud 云备份成功等同于 iCloud 照片已经有单独备份副本。
limitations:
  - 本文覆盖 iCloud 照片同步、暂停、无法上传、优化储存空间、原片下载和共享图库分流；不覆盖误删照片恢复、第三方相册 App、Windows 版 iCloud 深度故障或 Apple 账户被锁定。
  - 如果 Apple 系统状态异常、网络被管理策略限制、文件损坏或设备储存严重不足，远程文章只能给出分流，不能保证同步完成。
sources:
  - id: apple-icloud-photos-sync-paused
    title: 如果你的“iCloud 照片”无法同步或已暂停与 iCloud 同步
    url: https://support.apple.com/zh-cn/101559
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-17
    publishedAt: 2026-06-25
    official: true
  - id: apple-setup-use-icloud-photos
    title: 设置和使用“iCloud 照片”
    url: https://support.apple.com/zh-cn/108782
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-17
    publishedAt: 2025-12-17
    official: true
  - id: apple-photos-unable-to-upload
    title: 如果你在“照片”App 中看到“无法上传”
    url: https://support.apple.com/zh-cn/101984
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-17
    publishedAt: 2026-05-21
    official: true
  - id: apple-download-icloud-photos
    title: 下载 iCloud 照片和视频
    url: https://support.apple.com/zh-cn/111762
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-17
    publishedAt: null
    official: true
  - id: apple-iphone-backup-sync-photos
    title: 通过 iCloud 备份和同步照片及视频
    url: https://support.apple.com/zh-cn/guide/iphone/iph961b96c4d/ios
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-17
    publishedAt: null
    official: true
  - id: apple-turn-off-icloud-photos
    title: 如何关闭“iCloud 照片”
    url: https://support.apple.com/zh-cn/102179
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-17
    publishedAt: 2026-06-11
    official: true
  - id: apple-transfer-photos-to-computer
    title: 将照片和视频从 iPhone 或 iPad 传输到 Mac 或 PC
    url: https://support.apple.com/zh-cn/120267
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-17
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-17
lastUpdatedAt: 2026-07-17
createdAt: 2026-07-17
relatedArticles:
  - icloud-storage-full-iphone-backup-fails
  - iphone-system-data-storage-too-large
  - app-store-cant-download-update-apps
  - locked-notes-forgot-password
popular: true
---

# iCloud 照片无法同步、已暂停或显示无法上传

iCloud 照片不同步时，先不要关闭 iCloud 或“iCloud 照片”。最快的排查顺序是：看“照片”App 的图库状态，确认同一 Apple 账户和同步开关，再按低电量、低数据、网络、温度、iCloud 空间、共享图库和“无法上传”相簿分流。

如果只是照片原片打不开、导入电脑缺照片，问题可能不是同步失败，而是“优化储存空间”让本机只保留了较小版本；这时需要下载原片或导出未修改的原片。

---

## 症状

- “iCloud 照片一直正在同步，晚上也没动。”
- “照片 App 显示已暂停与 iCloud 同步。”
- “iPhone 新拍的照片没有出现在 iPad 或 Mac。”
- “Mac 导入的照片没有回到 iPhone。”
- “照片里出现‘无法上传’相簿。”
- “提示无法将几个项目同步到 iCloud。”
- “开了优化储存空间，导入电脑时照片不完整。”
- “个人图库里照片不见了，但好像进了共享图库。”
- “iCloud 空间满了以后照片不再上传。”

---

## 可能原因

1. **设备没有满足持续同步条件**
   - iCloud 照片同步需要设备登录同一 Apple 账户、打开同步开关，并有稳定网络和足够时间。大图库首次上传或恢复后同步可能需要过夜。
2. **低电量、低数据、弱网络、系统性能或温度导致暂停**
   - Apple 的图库状态会直接提示暂停原因，例如低数据模式、低电量模式、网络连接不佳、设备需要降温或电池电量不足。
3. **iCloud 储存空间或共享图库所有者空间已满**
   - iCloud 照片占用 iCloud 空间；共享图库相关暂停还可能取决于共享图库所有者的 iCloud 空间。
4. **照片被移到 iCloud 共享照片图库**
   - 移到共享图库后，照片不会继续显示在个人图库中。先检查图库视图，而不是判断照片丢失。
5. **存在“无法上传”相簿或不兼容/异常项目**
   - Apple 要求查看“无法上传”相簿，并通过导出、删除、重新导入尝试重新同步；这个过程可能丢失编辑内容或关键词。
6. **优化储存空间让本机没有全分辨率原片**
   - “优化储存空间”会在设备空间有限时保留较小版本，原始高分辨率版本在 iCloud 中。导入电脑或关闭同步前要先下载原片。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 把设备接入电源和稳定无线局域网；大图库先安排过夜同步。
2. 确认这台设备和其他设备使用同一 Apple 账户登录 iCloud。
3. 打开“设置 > [你的姓名] > iCloud > 照片”，确认 iPhone、iPad 或 Apple Vision Pro 上“同步此 [设备]”已打开；Mac 上确认“同步此 Mac”已打开。
4. 在“照片”App 查看图库状态：iOS 26 或更高版本在“精选集”顶部个人资料按钮；iOS 17 或更低版本在“图库 > 所有照片”底部；Mac 在“图库/所有照片”底部。
5. 按状态处理：低电量就充电，低数据/低电量模式按需要关闭，网络差就换稳定无线局域网，过热就等待降温，iCloud 空间满就释放或升级 iCloud 空间。
6. 如果使用 iCloud 共享照片图库，切换图库视图确认照片是否在共享图库；看到共享图库空间相关提示时，按提示移回个人图库或处理共享图库所有者空间。
7. 如果看到“无法上传”相簿，先导出这些项目并确认导出副本可用，再按 Apple 流程删除原项目并重新导入。
8. 如果要迁移、导入电脑或关闭 iCloud 照片，先下载原片或导出未修改的原片，确认本机或目标储存空间足够。
9. 如果其他 iCloud 服务也异常，检查无线局域网和 Apple 系统状态，再决定是否联系 Apple 支持。

参考来源：

- [Apple 支持：如果你的“iCloud 照片”无法同步或已暂停与 iCloud 同步](https://support.apple.com/zh-cn/101559)
- [Apple 支持：设置和使用“iCloud 照片”](https://support.apple.com/zh-cn/108782)
- [Apple 支持：如果你在“照片”App 中看到“无法上传”](https://support.apple.com/zh-cn/101984)
- [Apple 支持：下载 iCloud 照片和视频](https://support.apple.com/zh-cn/111762)
- [iPhone 使用手册：通过 iCloud 备份和同步照片及视频](https://support.apple.com/zh-cn/guide/iphone/iph961b96c4d/ios)

---

## 图库状态怎么读

验证级别：Apple 官方

1. “低数据模式”或“低电量模式”：同步暂停是为了减少数据用量或节省电量。需要立刻同步时，改用稳定无线局域网、接入电源，并按需要关闭对应模式。
2. “正在优化电池电量”“正在优化系统性能”或“网络连接不佳”：可以轻点“现在同步”，也可以等待系统自动恢复。
3. “电池电量不足”：先充电；低电量状态下不要反复重启或关闭同步。
4. “[设备] 需要降温”：先让设备降温；过热时强行同步通常没有意义。
5. “iCloud 储存空间已满”：释放 iCloud 空间或升级 iCloud+；清理本机储存空间不能直接解决 iCloud 空间上限。
6. “将照片移至个人图库以继续同步”：按提示把项目移回个人图库，或等待共享图库所有者处理 iCloud 空间。

参考来源：

- [Apple 支持：如果你的“iCloud 照片”无法同步或已暂停与 iCloud 同步](https://support.apple.com/zh-cn/101559)

---

## 出现“无法上传”相簿

验证级别：Apple 官方

1. 在“照片”App 中打开“无法上传”相簿，或从图库状态旁边的“查看”进入无法同步项目。
2. iPhone 或 iPad：选择这些项目，先保存到“文件”App 的本机位置，并打开“文件”确认导出成功。
3. 确认导出后，再从“无法上传”相簿删除对应项目，并按需要从“最近删除”中删除。
4. 从“文件”App 重新选择这些文件，通过共享菜单保存回“照片”。
5. Mac：从“无法上传”相簿导出未修改原片到安全位置，确认文件存在后删除原项目，再用“文件 > 导入”重新导入。
6. 重新导入后等待 iCloud 照片同步，并检查是否仍有同样项目无法上传。

参考来源：

- [Apple 支持：如果你在“照片”App 中看到“无法上传”](https://support.apple.com/zh-cn/101984)

风险：重新导出和重新导入可能丢失这些项目之前的编辑内容或关键词。删除前必须确认导出的文件可打开，避免删除唯一副本。

---

## 优化储存空间和原片下载

验证级别：Apple 官方

1. “优化储存空间”会在 iCloud 保留原始高分辨率版本，本机按空间情况保留较小版本。
2. 如果照片在设备上能看到但导入电脑缺原片，先把原片下载到 iPhone、iPad 或 Mac。
3. iPhone 或 iPad 少量导出：在“照片”中选择项目，轻点共享按钮，选择“导出未修改的原片”，保存到“文件”App、外置储存或其他位置。
4. Mac 完整图库：打开“照片 > 设置 > iCloud”，选择“将原片下载到此 Mac”，等待下载完成。
5. 关闭 iCloud 照片前，先选择下载照片和视频，并确认本机空间足够；否则本机留下的可能不是原始分辨率版本。
6. 使用 Windows PC 导入 iPhone 或 iPad 照片前，如果开启了 iCloud 照片，应先把原始全分辨率版本下载到设备。

参考来源：

- [Apple 支持：设置和使用“iCloud 照片”](https://support.apple.com/zh-cn/108782)
- [Apple 支持：下载 iCloud 照片和视频](https://support.apple.com/zh-cn/111762)
- [Apple 支持：如何关闭“iCloud 照片”](https://support.apple.com/zh-cn/102179)
- [Apple 支持：将照片和视频从 iPhone 或 iPad 传输到 Mac 或 PC](https://support.apple.com/zh-cn/120267)

---

## 零售排查流程

1. 先问清楚是所有照片不同步，还是只有几个项目“无法上传”，或只是原片下载不了。
2. 让顾客打开“照片”App 的图库状态，不要只看 iCloud 设置页。
3. 记录状态原文：低数据、低电量、网络连接不佳、电池不足、设备需要降温、iCloud 空间已满、共享图库提示或无法上传。
4. 确认同一 Apple 账户、同步开关和稳定无线局域网；大图库给出过夜同步预期。
5. iCloud 空间满时，转到 iCloud 空间管理，不要只清理 iPhone 储存空间。
6. 共享图库相关问题先切换图库视图，避免把共享图库里的照片误判为丢失。
7. “无法上传”项目先导出验证，再删除和重新导入；不要让顾客直接清空相簿。
8. 涉及导入电脑、换机或关闭 iCloud 照片时，先确认原片是否已经下载。
9. 如果其他 iCloud 服务也不正常，检查无线局域网和 Apple 系统状态，再联系 Apple 支持。

---

## 升级处理

联系 Apple 支持：

- 同一 Apple 账户、同步开关、网络、电源和 iCloud 空间都正常，但图库长期停在同一状态。
- 其他 iCloud 服务同时异常，且 Apple 系统状态或账户状态需要进一步确认。
- “无法上传”项目按导出/重新导入流程后仍反复失败。
- 关闭 iCloud 照片、下载原片或共享图库迁移前存在高价值照片风险，需要人工确认边界。

联系网络管理员或运营商：

- 只在公司、学校、酒店或受管理无线局域网中无法同步。
- 只在蜂窝网络或低数据模式下同步失败。

---

## 不适用范围

- 误删照片超过“最近删除”保留期后的数据恢复。
- 第三方相册、网盘、NAS、微信或社交 App 内部照片同步。
- Windows 版 iCloud 安装、登录或文件资源管理器集成的深度排查。
- Apple 账户锁定、双重认证无法登录或 iCloud 条款无法同意。

---

## 相关问题

- iCloud 储存空间已满、iPhone 或 iPad 无法备份：先处理 iCloud 空间和备份大小，不要只看照片同步。
- iPhone 系统数据很大、储存空间快满：先区分本机储存和 iCloud 储存。
- App Store 无法下载或更新：如果只是本机空间不足，按 App Store 下载路径处理。
- 备忘录密码忘记：属于 iCloud 资料访问和密码边界，不是照片同步问题。

---

## 元信息

- 适用设备：iPhone、iPad、Mac、Apple Vision Pro、Windows PC
- 适用系统：iOS、iPadOS、macOS、visionOS、Windows 版 iCloud
- 关键路径：照片 App 图库状态、设置 > [姓名] > iCloud > 照片、照片 > 设置 > iCloud
- 数据风险：照片、视频、编辑记录、关键词、最近删除、共享图库
- 网络：无线局域网、蜂窝网络、低数据模式、Apple 系统状态
- Apple ID：iCloud 照片要求同一 Apple 账户；共享图库涉及所有者 iCloud 空间
