---
schemaVersion: 2
id: mac-system-data-storage-apfs-snapshots-purgeable-space
title: Mac 系统数据很大：储存空间、APFS 快照与可清除空间
slug: mac-system-data-storage-apfs-snapshots-purgeable-space
summary: Mac 的“系统数据”占用很大时，先看真正的可用空间，再清理可管理的文件；日志、缓存、虚拟内存和本地快照不应被当作同一种问题处理。
symptoms:
  - Mac 系统数据很大
  - 系统数据占了一半硬盘
  - Mac 其他储存空间越来越大
  - 删除文件后可用空间没有马上增加
  - 磁盘明明有可清除空间但仍显示被占用
  - 时间机器本地快照占空间
  - APFS 快照很多，不知道能不能删除
  - 启动磁盘空间不足，无法更新 macOS
devices:
  - Mac
platforms:
  - macOS
systemVersions:
  - macOS Ventura 13 或更高版本（系统设置中的“储存空间”）
  - macOS Monterey 12 或更高版本（本文引用的磁盘工具 APFS 快照界面）
  - macOS High Sierra 10.13 或更高版本（APFS 与 Time Machine 本地快照；旧版入口可能不同）
categories:
  - Mac
tags:
  - Mac
  - macOS
  - Storage
  - System Data
  - APFS
  - Time Machine
  - Backup
keywords:
  - 系统数据
  - 其他储存空间
  - 可用储存空间
  - 可清除空间
  - 可清除磁盘缓存
  - APFS 快照
  - 时间机器本地快照
  - 启动磁盘已满
  - 日志文件
  - 缓存
  - VM 文件
  - 虚拟内存
  - 安全模式
  - 优化储存空间
aliases:
  - Mac System Data taking up space
  - Mac System Data too large
  - Mac Other storage is huge
  - macOS purgeable space
  - Time Machine local snapshots taking space
  - APFS snapshots taking space
  - Mac 系统资料很大
  - Mac 其他空间很大
  - Mac 储存空间莫名其妙变大
errorMessages: []
officialTerms:
  - 系统数据
  - 系统数据（旧版显示为“其他”）
  - 可用储存空间
  - 可清除磁盘缓存
  - 优化储存空间
  - 全部宗卷
  - Apple 文件系统
  - APFS 快照
  - 时间机器本地快照
communityTerms:
  - 系统数据占一半硬盘
  - 其他占用很大
  - 系统数据删不掉
  - Mac 存储爆了
  - 快照吃空间
  - system data huge
difficulty: Moderate
estimatedTime: 10–30 分钟基础检查；备份、同步和快照处理时间另计
verificationLevel: Official
status: canonical
canonicalArticleId: mac-system-data-storage-apfs-snapshots-purgeable-space
solutions:
  - id: check-available-space-and-managed-categories
    title: 先确认真正的可用空间，再清理可管理的类别
    summary: “系统数据”是汇总类别，不是一个可以整项删除的文件夹；优先处理下载、文稿、App、设备备份和废纸篓等可确认内容。
    kind: recommended
    steps:
      - 在 macOS Ventura 13 或更高版本中打开“系统设置 > 通用 > 储存空间”；较早系统打开“关于本机 > 储存空间”。
      - 记录“可用”空间，并点按“全部宗卷”查看 APFS 容器中的宗卷，而不是只看“系统数据”一项的大小。
      - 了解“系统数据”可能包含日志、缓存、VM 文件、临时文件、字体、App 支持文件、插件和其他运行时资源；其大小会随 Mac 当前状态变化。
      - 打开带有信息按钮的类别，优先检查大文件、下载项、不再使用的 App、旧 iPhone 或 iPad 备份、邮件附件、其他用户数据和废纸篓。
      - 只删除自己能确认用途、且已有备份或可重新下载的内容；移入废纸篓后还需要清倒废纸篓，空间才会真正释放。
      - 查看“储存在 iCloud 中”“优化储存空间”和“自动清倒废纸篓”等建议，并在理解同步、下载和保留规则后自行决定是否开启。
      - 清理后重新打开储存空间设置，重点确认可用空间是否增加，以及原本失败的下载、安装、拷贝或更新能否继续。
    verificationLevel: Official
    sourceIds:
      - apple-free-up-mac-storage
      - apple-find-and-delete-files
      - apple-optimize-mac-storage
      - apple-view-used-and-available-storage
      - apple-apfs-shared-space
    warnings:
      - 删除前先备份重要文件；清倒废纸篓后，文件不能再从废纸篓恢复。
      - 不要直接删除不理解的系统目录、虚拟内存、日志数据库或 App 支持目录。
      - 启用 iCloud 优化会占用 iCloud 储存空间，并可能改变哪些原始文件保留在本机。
    limitations:
      - “系统数据”是动态分类，数字变化本身不能证明磁盘故障、恶意软件或某个单一文件异常。
      - 不同 macOS 版本、App、用户账户和 APFS 宗卷布局会显示不同类别。
  - id: interpret-purgeable-space-and-local-snapshots
    title: 正确理解可清除空间和本地快照
    summary: 可用空间包含物理空闲空间和可清除缓存；Time Machine 本地快照也会被 macOS 计入可用空间，并在需要时自动移除。
    kind: alternative
    steps:
      - 在“储存空间 > 全部宗卷”中查看启动宗卷和 APFS 容器的总可用空间。
      - 记住“可用储存空间”可以同时包含空闲空间和可清除磁盘缓存，所以某些空间可能同时显示为正在使用和可以使用。
      - 如果启用了 Time Machine 自动备份且启动磁盘使用 APFS，macOS 可能保存本地快照；它们用于在备份磁盘不在线时恢复文件。
      - 不要仅因为看到本地快照就判断这些空间无法使用；Apple 说明快照会计入可用空间，并在过旧或其他内容需要空间时自动删除。
      - 如果储存空间中显示多个宗卷，按 APFS 容器整体判断空间，因为同一容器内的宗卷共享可用空间。
    verificationLevel: Official
    sourceIds:
      - apple-find-and-delete-files
      - apple-disk-utility-purgeable-space
      - apple-time-machine-local-snapshots
      - apple-time-machine-snapshots-guide
      - apple-view-used-and-available-storage
      - apple-apfs-shared-space
    warnings: []
    limitations:
      - 储存空间图表是分类视图，不等同于每个文件的物理占用清单。
      - 本地快照可能让已用和可用数字看起来不一致；Apple 资料没有说明所有快照都归入“系统数据”，不能据此认定分类归属或根因。
  - id: remove-time-machine-local-snapshots-only-when-needed
    title: 只在明确需要时手动移除本地快照
    summary: macOS 通常会自动管理 Time Machine 本地快照；如果确实需要手动移除，使用 Apple 文档中的 Time Machine 设置路径。
    kind: alternative
    steps:
      - 先完成一次外置 Time Machine 备份，或确认重要资料已有其他可靠备份。
      - 在 macOS Ventura 13 或更高版本中，前往“系统设置 > 通用 > 时间机器 > 选项”，把备份频率暂时设为“手动”。
      - 在 macOS Monterey 12 或更早版本中，前往“系统偏好设置 > 时间机器”，取消选择“自动备份”或使用关闭开关。
      - 等待几分钟，让系统处理本地快照，然后重新打开自动备份。
      - 完成后重新检查可用空间；如果没有明显变化，停止继续删除快照并回到其他储存类别排查。
    verificationLevel: Official
    sourceIds:
      - apple-time-machine-local-snapshots
      - apple-time-machine-snapshots-guide
    warnings:
      - 删除快照会失去对应时间点的本地恢复能力，不能代替正常的外置备份。
    limitations:
      - Apple 资料没有把本地快照定义为“系统数据”的固定组成；移除快照不保证该分类按同样大小下降。
      - 企业、学校或受管理 Mac 可能有组织定义的备份和快照策略，应先联系管理员。
  - id: inspect-apfs-snapshots-before-deleting
    title: 用磁盘工具查看 APFS 快照，删除只作为谨慎的个案操作
    summary: Apple 文档说明磁盘工具可以查看和删除 APFS 快照，但没有把删除任意快照列为“系统数据很大”的通用修复。
    kind: alternative
    steps:
      - 打开“磁盘工具”，选择“显示 > 显示 APFS 快照”，再选择要检查的宗卷。
      - 查看快照的创建日期、专用大小、累计大小和种类，先判断它是否与当前空间问题相关。
      - 默认只查看，不要为了降低“系统数据”数字而批量删除快照。
      - 只有在明确知道快照用途、确认不再需要对应恢复点并已有独立备份时，才选择特定快照并点按“删除快照”。
      - 删除后重新检查真正的可用空间；如果没有改善，停止继续删除并回到其他储存类别排查。
    verificationLevel: Likely
    sourceIds:
      - apple-view-apfs-snapshots
      - apple-disk-utility-purgeable-space
    warnings:
      - 删除快照会失去对应时间点的恢复能力；不要批量删除用途不明的快照。
      - 不要把未经 Apple 文档支持的终端批量删除命令当作首选步骤。
    limitations:
      - 查看和删除快照的界面能力来自 Apple 文档；把某个快照认定为“系统数据”根因仍需按个案判断。
      - 删除 APFS 快照不保证“系统数据”分类按相同容量下降。
  - id: use-safe-mode-for-temporary-space
    title: 安装或更新被卡住时临时使用安全模式
    summary: Apple 说明安全模式可能清理可自动重建的系统缓存，从而暂时释放足够空间完成一次安装或更新。
    kind: alternative
    steps:
      - 保存工作并先确认 Mac 使用 Apple 芯片还是 Intel 处理器。
      - 按 Apple 对应机型的步骤进入安全模式。
      - 在安全模式中重新检查可用空间，并只完成原本因空间不足而失败的必要操作。
      - 操作完成后正常重新启动 Mac，退出安全模式。
    verificationLevel: Official
    sourceIds:
      - apple-free-up-mac-storage
      - apple-start-mac-safe-mode
    warnings:
      - 安全模式提供的空间可能只是临时的；正常使用后缓存会按需重新创建。
      - 进入安全模式前保存未完成的工作，并确认重要数据已有备份。
    limitations:
      - 安全模式不是长期清理“系统数据”的工具，也不会识别所有第三方大文件。
  - id: escalate-after-storage-checks
    title: 官方步骤后仍无可用空间时升级处理
    summary: 不再盲目删除系统内容；先保存证据和备份，再由 Apple 支持、组织管理员或相关 App 提供商定位。
    kind: escalation
    steps:
      - 记录 macOS 版本、总容量、可用空间、“全部宗卷”视图以及最近安装、备份或更新失败的原始提示。
      - 确认重要数据已有独立备份，不要在空间极低时继续大量写入、更新或迁移数据。
      - 如果某个第三方 App 的支持文件持续增长，联系该 App 提供商确认其清理或迁移方法。
      - 如果储存空间持续下降、无法完成备份或更新，或磁盘工具显示异常，联系 Apple 支持；受管理 Mac 则联系组织管理员。
    verificationLevel: Likely
    sourceIds:
      - apple-free-up-mac-storage
      - apple-find-and-delete-files
    warnings:
      - 在没有完整备份和明确用途的情况下，不要继续删除系统管理的内容。
    limitations:
      - 远程文章不能替代 Apple 对磁盘状态、文件系统或硬件的诊断。
warnings:
  - 删除任何大文件、用户资料或快照前，先确认备份和恢复路径。
  - 不要把删除系统目录、关闭系统保护、使用终端批量删除快照或第三方“一键清理”当作标准第一步。
  - iCloud 优化会使用 iCloud 储存空间；删除云端同步内容前，先检查对应服务的同步和保留规则。
limitations:
  - “系统数据”会随日志、缓存、虚拟内存、App 支持文件和系统当前状态变化，不能仅凭一个数字确定根因。
  - Time Machine 本地快照被计入可用空间，并不代表所有 APFS 快照都可以随意删除。
  - 本文不覆盖损坏磁盘、恶意软件、企业管理策略或特定第三方 App 数据库的专项修复。
sources:
  - id: apple-free-up-mac-storage
    title: 如何清理 Mac 上的数据并释放储存空间
    url: https://support.apple.com/zh-cn/102624
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-13
    publishedAt: 2026-05-08
    official: true
  - id: apple-find-and-delete-files
    title: 在 Mac 上查找和删除文件
    url: https://support.apple.com/zh-cn/guide/mac-help/syspf5a64aa6/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-13
    publishedAt: null
    official: true
  - id: apple-optimize-mac-storage
    title: 在 Mac 上优化储存空间
    url: https://support.apple.com/zh-cn/guide/mac-help/sysp4ee93ca4/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-13
    publishedAt: null
    official: true
  - id: apple-view-used-and-available-storage
    title: 在 Mac 上查看已用和可用的储存空间
    url: https://support.apple.com/zh-cn/guide/mac-help/syspf9b375b9/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-13
    publishedAt: null
    official: true
  - id: apple-disk-utility-purgeable-space
    title: 在 Mac 上的“磁盘工具”中获取有关磁盘的详细信息
    url: https://support.apple.com/zh-cn/guide/disk-utility/dskutl1005/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-13
    publishedAt: null
    official: true
  - id: apple-time-machine-local-snapshots
    title: 关于“时间机器”本地快照
    url: https://support.apple.com/zh-cn/102154
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-13
    publishedAt: 2025-12-10
    official: true
  - id: apple-time-machine-snapshots-guide
    title: 关于 Mac 上的时间机器本地快照
    url: https://support.apple.com/zh-cn/guide/mac-help/mh35933/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-13
    publishedAt: null
    official: true
  - id: apple-apfs-shared-space
    title: 查看你的 Mac 是否在 APFS 宗卷中共享空间
    url: https://support.apple.com/zh-cn/guide/mac-help/sysp560a2952/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-13
    publishedAt: null
    official: true
  - id: apple-view-apfs-snapshots
    title: 在 Mac 上的“磁盘工具”中查看 APFS 快照
    url: https://support.apple.com/zh-cn/guide/disk-utility/dskuf82354dc/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-13
    publishedAt: null
    official: true
  - id: apple-start-mac-safe-mode
    title: 以安全模式启动 Mac
    url: https://support.apple.com/zh-cn/116946
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-13
    publishedAt: 2025-12-23
    official: true
lastVerifiedAt: 2026-07-13
lastUpdatedAt: 2026-07-13
createdAt: 2026-07-13
relatedArticles: []
popular: false
---

# Mac 系统数据很大：储存空间、APFS 快照与可清除空间

“系统数据”不是一个可以整项删除的文件夹。Apple 把日志、缓存、虚拟内存、临时文件、字体、App 支持文件、插件和其他未被单独分类的 Apple 或第三方数据归到这里。先看 **可用空间** 和实际失败的操作，再处理自己能确认的文件；不要直接删除系统目录。

---

## 症状

- “系统数据占了几十 GB，能不能直接清掉？”
- “删除了很多文件，但可用空间没有马上增加。”
- “Mac 显示还有可清除空间，为什么看起来还是被占用？”
- “时间机器本地快照是不是把硬盘吃满了？”
- “磁盘工具里有很多 APFS 快照，要不要全部删除？”
- “启动磁盘空间不足，macOS 更新或 App 安装无法继续。”
- “旧版 macOS 里的‘其他’储存空间特别大。”

---

## 可能原因

1. **“系统数据”是汇总类别**
   - Apple 说明，它会包含无法归到其他类别的系统和第三方文件，包括日志、缓存、VM 文件、临时文件、字体、App 支持文件和插件；大小会随 Mac 当前状态变化。
2. **正在使用和可以使用的空间可能重叠**
   - Apple 将“可用储存空间”定义为物理空闲空间加可清除磁盘缓存，所以某些空间可以同时显示为正在使用和可用。
3. **Time Machine 本地快照由 macOS 自动管理**
   - 本地快照可在备份磁盘不在线时恢复文件。Apple 说明它们会计入可用空间，并在过旧或其他内容需要空间时自动删除。
4. **APFS 宗卷共享容器空间**
   - 同一 APFS 容器中的多个宗卷共享可用空间；只看其中一个宗卷或一个颜色分类可能会误判实际容量。
5. **可管理的大文件可能位于其他类别**
   - 下载项、旧设备备份、邮件附件、废纸篓、其他用户、照片图库和不用的 App 往往比手动碰系统文件更适合优先检查。
6. **极低空间会阻止下载、拷贝、安装或更新**
   - Apple 说明安全模式可能清理可重新创建的系统缓存，为一次安装或更新暂时腾出空间，但这不是长期清理方案。

---

## Apple 官方方案

验证级别：Apple 官方

1. 打开“系统设置 > 通用 > 储存空间”；较早版本的 macOS 打开“关于本机 > 储存空间”。
2. 先记录总容量和 **可用空间**，再点按“全部宗卷”查看 APFS 容器中的宗卷。不要只根据“系统数据”的颜色条判断磁盘是否真的没有空间。
3. 打开带有信息按钮的类别，优先检查大文件、下载项、旧 iPhone 或 iPad 备份、不再使用的 App、邮件附件、其他用户数据和废纸篓。
4. 只删除自己能确认用途、且已有备份或可以重新下载的内容。文件移到废纸篓后，还要清倒废纸篓才会释放空间。
5. 查看“储存在 iCloud 中”“优化储存空间”和“自动清倒废纸篓”等建议；先理解同步、下载和 iCloud 容量影响，再决定是否开启。
6. 如果启用了 Time Machine，不要把本地快照默认当作不可用空间。Apple 说明快照会计入可用空间，并在系统需要空间时自动删除。
7. 只有明确需要手动移除 Time Machine 本地快照时，才暂时关闭自动备份：Ventura 13 或更高版本把备份频率设为“手动”；Monterey 12 或更早版本取消“自动备份”或使用关闭开关。等待几分钟后重新开启自动备份。
8. 如需查看 APFS 快照，打开“磁盘工具”，选取“显示 > 显示 APFS 快照”，再选择相应宗卷。查看属于 Apple 官方工具能力；是否应删除某个快照要按个案判断，不能作为通用首选修复。
9. 如果安装或更新仅因临时空间不足而失败，可以按 Apple 指引进入安全模式；完成必要操作后正常重新启动。
10. 清理后重新检查可用空间，并重试原本失败的下载、拷贝、安装或更新。

主要参考来源：

- [Apple 支持：如何清理 Mac 上的数据并释放储存空间](https://support.apple.com/zh-cn/102624)
- [Mac 使用手册：在 Mac 上查找和删除文件](https://support.apple.com/zh-cn/guide/mac-help/syspf5a64aa6/mac)
- [Mac 使用手册：在 Mac 上优化储存空间](https://support.apple.com/zh-cn/guide/mac-help/sysp4ee93ca4/mac)
- [磁盘工具使用手册：获取有关磁盘和可清除空间的详细信息](https://support.apple.com/zh-cn/guide/disk-utility/dskutl1005/mac)
- [Apple 支持：关于“时间机器”本地快照](https://support.apple.com/zh-cn/102154)
- [磁盘工具使用手册：在 Mac 上的“磁盘工具”中查看 APFS 快照](https://support.apple.com/zh-cn/guide/disk-utility/dskuf82354dc/mac)

---

## 先看“可用空间”，不要只看“系统数据”

验证级别：已验证（基于 Apple 官方定义整理）

1. **系统数据不是单一文件夹**：它是未归入其他类别的集合，不能安全地“一键全删”。
2. **可用空间不只等于空白空间**：Apple 说明它还包含可清除磁盘缓存，因此空间可能同时显示为正在使用和可以使用。
3. **分类数字会变化**：日志、缓存、虚拟内存和运行时资源会随当前任务变化；一次刷新前后的差异不能单独证明故障。
4. **用实际结果判断**：如果有足够可用空间，下载、拷贝和安装可以正常完成，就不必仅为降低“系统数据”数字而删除系统内容。

---

## Time Machine 本地快照要不要删除

验证级别：Apple 官方

通常不用。Apple 说明：

- Time Machine 大约每小时保存一个启动磁盘快照，并保留约 24 小时；还可能保留上次成功备份和 macOS 更新前的快照。
- 本地快照会被计入可用储存空间，不会阻止需要空间的下载、拷贝或软件安装。
- 快照过旧或其他内容需要空间时，macOS 会自动删除它们。

如果确实要手动移除，先确认已有外置备份，再暂时关闭自动备份，等待几分钟后重新开启。Ventura 13 或更高版本把备份频率设为“手动”；Monterey 12 或更早版本取消“自动备份”或使用关闭开关。删除快照会失去对应时间点的本地恢复能力。Apple 资料没有把本地快照定义为“系统数据”的固定组成，因此不能承诺该分类按相同容量下降。

---

## APFS 快照怎么查看

验证级别：较可能（查看和删除能力为 Apple 官方；是否能改善“系统数据”需按个案判断）

1. 打开“磁盘工具”。
2. 选择“显示 > 显示 APFS 快照”。
3. 在边栏选择要检查的宗卷。
4. 查看创建日期、专用大小、累计大小和种类等信息。
5. 只有在明确知道快照用途、确认不需要对应恢复点并已有备份时，才使用“删除快照”。

本文不把终端批量删除命令列为标准方案。Apple 当前公开文档已经提供 Time Machine 设置和磁盘工具界面，先使用可见、可确认的官方路径。

---

## 不建议这样做

- 不要直接删除 `/System`、用途不明的 `/Library`、虚拟内存、系统数据库或随机搜索到的缓存目录。
- 不要为了让分类数字变小而关闭系统保护或批量运行不了解的终端命令。
- 不要假设所有“清理工具”都知道哪些 App 数据、快照或缓存仍被使用。
- 不要在没有备份的情况下删除照片图库、设备备份、邮件资料、其他用户目录或 APFS 快照。
- 不要承诺移除快照会让“系统数据”按相同容量下降。

这些做法不是本文引用的 Apple 标准首选流程；如果某个第三方 App 的数据持续增长，应使用该 App 提供商的说明处理。

---

## 零售排查流程

1. 先问顾客遇到的实际失败：无法更新、无法安装、无法备份、无法拷贝，还是只担心“系统数据”数字。
2. 记录 macOS 版本、总容量、可用空间、“全部宗卷”视图和原始错误提示。
3. 解释“系统数据”是汇总类别，可用空间还可能包含可清除缓存；不要承诺能把某个分类清到固定大小。
4. 优先检查下载、大文件、不用的 App、旧设备备份、邮件附件、废纸篓和其他用户数据。
5. 删除前确认资料所有权、同步状态、备份和恢复方式。
6. 如果顾客使用 Time Machine，确认最近一次外置备份是否成功，再解释本地快照会由 macOS 自动管理。
7. 只有在明确需要时才按官方界面查看或移除快照，不使用来源不明的终端命令。
8. 若只是安装或更新临时缺少空间，可尝试安全模式；完成后正常重新启动。
9. 清理后用可用空间和原任务是否成功来验收，不以“系统数据”必须降到某个数值为验收条件。
10. 空间持续异常、无法备份或磁盘工具报错时，停止继续删除并升级处理。

---

## 升级处理

联系 Apple 支持：

- 按官方清理流程后，可用空间仍持续下降。
- 无法完成 Time Machine 备份、macOS 更新或必要的文件拷贝。
- 磁盘工具显示宗卷、容器、快照或文件系统异常。
- 安全模式和正常模式都无法完成必要操作。

联系公司或学校 IT：

- Mac 由组织管理。
- 备份、快照、软件安装或储存策略由 MDM 控制。
- 大量数据来自企业同步、虚拟机、开发工具或受管理 App。

联系第三方 App 提供商：

- 某个 App 的支持目录、数据库、虚拟机、媒体缓存或离线内容持续增长。
- App 内没有明确的清理、迁移或保留策略。

---

## 相关问题

当前知识库暂无经过独立来源复核、且与本文直接相关的 canonical article。

---

## 标签

- 设备：Mac
- 系统：macOS、APFS
- 功能：储存空间、系统数据、可清除空间、Time Machine、本地快照
- 数据：下载、设备备份、邮件附件、照片图库、其他用户、废纸篓
- 风险：误删系统文件、丢失快照恢复点、iCloud 同步删除
- 维修：持续空间下降、备份失败或磁盘工具异常时升级处理

---

## 元信息

- 最后更新：2026-07-13
- 最后验证：2026-07-13
- 来源数量：10 个 Apple 官方页面
- 验证级别：Apple 官方
- 支持系统：High Sierra 10.13 或更高版本的相关概念；储存空间、Time Machine 和磁盘工具入口随版本变化
- 可信度：高
