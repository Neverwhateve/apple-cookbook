---
schemaVersion: 2
id: mac-mail-storage-too-large
title: Mac 邮件占用大量储存空间或附件太多
slug: mac-mail-storage-too-large
summary: Mac 的“储存空间”显示“邮件”占用数 GB、邮箱附件太多或清理后容量没有下降时，先区分本机磁盘空间与邮箱服务器配额，再按邮件、附件、垃圾邮件和已删除项目的风险顺序处理；不要直接删除 Mail 数据库文件。
symptoms:
  - Mac 储存空间显示邮件占用很大
  - Mac Mail 占用几十 GB 或数百 GB
  - 邮件附件占满 Mac 磁盘
  - 删除邮件后 Mac 可用空间没有增加
  - 清空废纸篓后 Mail 储存数字仍不变
  - 已移除邮箱账户但 Mail 数据仍占空间
  - 不知道如何只删除附件而保留邮件
devices:
  - Mac
platforms:
  - macOS
systemVersions:
  - macOS Ventura 13 或更高版本（系统设置中的储存空间）
  - 当前支持的 macOS
categories:
  - Mac
tags:
  - Mac
  - macOS
  - Mail
  - Email
  - Storage
  - Attachments
  - Backup
keywords:
  - Mac Mail storage huge
  - Mail taking up space Mac
  - Mac 邮件占用空间
  - 邮件附件清理
  - Mac 磁盘空间不足
  - 邮箱占用太大
aliases:
  - Mac Mail storage too large
  - Apple Mail taking too much space
  - Mac Mail attachments using storage
  - Mac Mail folder huge
  - Mac 邮件占用大量储存空间
errorMessages:
  - 启动磁盘几乎已满
  - 没有足够的储存空间
  - Mail 使用了大量储存空间
officialTerms:
  - 储存空间
  - 账户简介
  - 显示 > 排序方式 > 大小
  - 移除附件
  - 清除垃圾邮件
  - 清除已删除项目
  - 我的 Mac
  - 优化储存空间
communityTerms:
  - Mail 文件夹 241GB
  - 删除邮件后空间不变
  - Mail 占用 70GB
  - 移除账户后 Mail 还占空间
difficulty: Moderate
estimatedTime: 15 至 30 分钟；重新计算可能更久
verificationLevel: Official
status: canonical
canonicalArticleId: mac-mail-storage-too-large
solutions:
  - id: separate-disk-space-from-mailbox-quota
    title: 先区分 Mac 磁盘空间与邮箱服务器空间
    summary: “邮件”在 Mac 储存空间中占用很大，和邮箱服务商提示配额已满是两个可能重叠但不同的问题；先记录两个位置的数字和症状。
    kind: recommended
    steps:
      - 在 macOS Ventura 13 或更高版本打开“苹果菜单 > 系统设置 > 通用 > 储存空间”，记录可用空间和“邮件”类别占用。
      - 在 Mail 中选取账户并打开“账户简介”，查看服务商邮箱的服务器使用量、邮箱数量和配额；不要把这项数字当作 Mac 磁盘占用。
      - 如果只有邮箱服务商配额不足，优先删除服务器端不需要的大邮件、附件、垃圾邮件和已删除项目，或把确需保留的邮件移动到“我的 Mac”本地邮箱。
      - 如果只有 Mac 磁盘快满，优先处理本机下载的邮件和附件，并同时查看“下载”、旧 iPhone/iPad 备份、照片和其他大类，避免把所有问题归因于 Mail。
      - 记录账户类型（iCloud、IMAP、Exchange 或 POP）和是否有只保存在本机的邮箱，再决定后续删除范围。
    verificationLevel: Official
    sourceIds:
      - apple-mail-manage-storage
      - apple-mac-storage-cleanup
      - apple-mail-send-receive-mac
    warnings:
      - “我的 Mac”邮箱释放的是服务器配额，不会自动释放本机磁盘空间；移动前要确认用户理解本地邮箱的备份责任。
      - 不要在没有备份和账户类型确认时批量删除邮件。
    limitations:
      - macOS 的储存分类可能需要时间重新计算，显示数字不一定即时反映每一步删除。
      - 第三方邮箱的配额、保留策略和服务器行为由服务商决定。
  - id: save-then-remove-large-attachments
    title: 先保存附件，再按邮件类型移除附件
    summary: Apple 支持按大小找出大邮件、保存附件后移除附件；IMAP 账户的移除附件也会从邮件服务器删除，因此必须先确认副本。
    kind: alternative
    steps:
      - 在 Mail 中按“显示 > 排序方式 > 大小”查看较大的邮件和对话，优先识别附件占用而不是先删除整封邮件。
      - 对仍需保留的附件使用“保存附件”或“文件 > 保存为”，把副本放在已纳入 Time Machine 或其他备份的位置，并打开副本确认可读。
      - 选中确认已安全保存的邮件，使用“邮件 > 移除附件”；邮件正文仍保留，但附件会从邮件中移除。
      - 对 IMAP 账户，先告知顾客移除附件也会从服务器删除附件且可能无法取回；对 POP、Exchange 或公司账户，先向服务商或管理员确认同步规则。
      - 清理后退出 Mail 并重新打开，等待系统重新计算储存空间；不要为了让数字立刻下降而删除 Mail 的隐藏数据库。
    verificationLevel: Official
    sourceIds:
      - apple-mail-manage-storage
      - apple-mail-attachments
    warnings:
      - 先保存并验证副本；“移除附件”不是只删除 Mac 缓存的无风险操作，尤其是 IMAP 账户。
      - 删除整封邮件会同时删除邮件正文和附件，不能用“移除附件”替代数据备份。
    limitations:
      - Apple 官方指南没有提供按日期自动删除本机 Mail 缓存但保留服务器邮件的通用开关。
      - 附件被其他邮件引用、嵌入正文或受服务商策略影响时，清理结果可能不同。
  - id: clear-junk-and-deleted-items-safely
    title: 清除垃圾邮件和已删除项目
    summary: 删除的邮件可能仍留在废纸篓，垃圾邮件也会占用空间；先检查是否误删，再使用 Mail 提供的清除命令。
    kind: alternative
    steps:
      - 在删除前检查废纸篓和垃圾邮件，确认没有需要恢复的邮件；误删邮件可以从废纸篓拖回其他邮箱。
      - 需要释放服务器配额或本机占用时，选择“邮箱 > 清除垃圾邮件”，再选择“邮箱 > 清除已删除项目”，并确认账户范围。
      - 在“邮件 > 设置 > 账户 > 邮箱行为”检查废纸篓邮箱和“抹掉删除的邮件”策略，避免把未来需要的保留期设得过短。
      - 若邮件已被 Time Machine 或其他可靠备份保存，可按账户和日期分批清除；每批后观察 Mail 是否仍能搜索和收发。
      - 重新启动 Mail 或 Mac 后再查看“系统设置 > 通用 > 储存空间”，把“显示仍未下降”作为需要进一步核对的信号，不要立即执行手动库文件删除。
    verificationLevel: Official
    sourceIds:
      - apple-mail-manage-storage
      - apple-mac-storage-cleanup
    warnings:
      - 清除已删除项目会让废纸篓中的邮件不可按普通 Mail 流程取回；操作前先确认删除范围和备份。
      - “清除垃圾邮件”可能影响多个账户，选择账户时要核对。
    limitations:
      - macOS 储存统计和 Mail 本地索引重新计算可能有延迟。
  - id: use-macos-storage-optimization
    title: 使用 macOS 的储存空间优化建议
    summary: 磁盘整体接近满时，先使用系统储存空间页面的优化建议；它是系统级空间管理，不等于手动删除 Mail 数据目录。
    kind: alternative
    steps:
      - 在“苹果菜单 > 系统设置 > 通用 > 储存空间”查看推荐项和各类别详情。
      - 如果系统提供“优化储存空间”，先阅读说明再决定是否启用；Apple 说明空间不足时可在 Mac 上仅保留最近的电子邮件附件，并在需要时从 iCloud 获取内容。
      - 同时处理“下载”、旧设备备份、废纸篓和其他明确可删除或可重新下载的内容；不要只盯着 Mail 类别。
      - 如果只是为了完成 macOS 更新临时腾出空间，按 Apple 说明考虑安全模式等临时路径，完成任务后再进行长期数据整理。
      - 优化后重新检查 Mail 收发、附件打开和磁盘可用空间，确认没有把工作所需的本地邮件误移除。
    verificationLevel: Official
    sourceIds:
      - apple-mac-storage-optimization
      - apple-mac-storage-cleanup
    warnings:
      - 依赖 iCloud 获取附件需要网络和足够的 iCloud 空间；不要把云端优化当成本地或离线备份。
      - 系统推荐项的名称、可用性和行为会随 macOS 版本及账户状态变化。
    limitations:
      - macOS 不会保证某个 Mail 类别立刻降到指定大小，也没有公开统一的 Mail 缓存安全阈值。
  - id: treat-community-size-anomalies-as-evidence-only
    title: 对清理后数字仍异常的案例保留证据
    summary: Apple Support Community 中有顾客报告 Mail 统计在删除邮件、清空废纸篓或移除账户后仍很大；这证明症状存在，但不证明手动删除 Library 文件是安全方案。
    kind: alternative
    steps:
      - 记录“系统设置 > 储存空间”的 Mail 数字、实际可用空间、Mail 账户列表、账户类型、废纸篓状态和最后一次清理时间。
      - 对清理前后的数字截图或抄录，等待 Mail 和 macOS 重新计算后再比较，不要只根据 Finder 中某个隐藏目录的大小下结论。
      - 不要照搬社区中的 `~/Library/Mail`、Containers 或缓存目录删除建议；这些路径和数据库结构可能随系统变化，手动删除可能损坏本地索引或丢失本机邮件。
      - 如果官方清理已完成但空间异常持续，带着账户类型、备份状态、错误范围和统计时间联系 Apple 支持。
    verificationLevel: Likely
    sourceIds:
      - community-mail-241gb
      - community-mail-7gb-after-cleanup
      - community-mail-70gb-report
    warnings:
      - 社区回复可能把过时的系统路径、第三方清理工具或重建经验当成通用方案；本文不将其升级为官方建议。
    limitations:
      - 社区帖子无法证明 Mail 统计的真实文件构成，也不能证明同样症状具有相同根因。
  - id: escalate-after-backup-and-safe-cleanup
    title: 备份后升级异常储存占用
    summary: 官方清理路径完成、Mail 数字长时间不变，或清理影响收发和本机邮件时，先保护数据再交给 Apple 支持或 IT 判断。
    kind: escalation
    steps:
      - 确认 Time Machine 或其他备份可用，并保留重要本地邮箱、附件副本和账户配置记录。
      - 记录 macOS 版本、可用空间、Mail 类别数字、账户类型、是否使用 IMAP/Exchange/POP、清理步骤和错误文字。
      - 官方清理后仍持续占用异常、Mail 无法打开、搜索索引反复损坏或多个账户受影响时，联系 Apple 支持。
      - 公司或学校账户还要联系 IT，确认保留策略、归档、移动设备管理和服务器端配额。
    verificationLevel: Official
    sourceIds:
      - apple-mac-storage-cleanup
      - apple-mail-manage-storage
    warnings: []
    limitations:
      - Apple 支持需要结合设备、账户和本地数据状态判断，文章不能承诺某个清理动作一定回收全部统计空间。
warnings:
  - 不要直接删除 ~/Library/Mail、Containers、Mail Downloads 或未知缓存目录来“清空 Mail”。
  - 删除邮件或附件前先保存并验证需要保留的副本，尤其要确认 IMAP/Exchange/POP 的服务器同步范围。
  - 不要把“邮件”类别的数字与邮箱服务器配额、内存（RAM）或 Mail App 本身大小混为一谈。
  - 社区证据只用于客户语言、频率和异常模式识别，不是 Apple 官方修复建议。
limitations:
  - 本文覆盖 Mac Mail 邮件与附件占用本机储存空间、邮箱配额和清理后的统计差异，不覆盖 Mail 无法收发的主要排查流程。
  - 本文不提供手动修改 Mail 本地数据库或缓存目录的步骤，因为 Apple 没有把这类操作作为通用安全方案。
sources:
  - id: apple-mail-manage-storage
    title: 在 Mac 上的“邮件”中删除电子邮件和管理储存空间
    url: https://support.apple.com/zh-cn/guide/mail/mlhlp1001/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-28
    publishedAt: null
    official: true
  - id: apple-mail-attachments
    title: 在 Mac 上的“邮件”中查看、保存或删除电子邮件附件
    url: https://support.apple.com/zh-cn/guide/mail/mlhlp1123/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-28
    publishedAt: null
    official: true
  - id: apple-mac-storage-cleanup
    title: 如何清理 Mac 上的数据并释放储存空间
    url: https://support.apple.com/zh-cn/102624
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-28
    publishedAt: 2026-05-08
    official: true
  - id: apple-mac-storage-optimization
    title: 在 Mac 上优化储存空间
    url: https://support.apple.com/zh-cn/guide/mac-help-cn/sysp4ee93ca4/26/mac/26
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-28
    publishedAt: null
    official: true
  - id: apple-mail-send-receive-mac
    title: 如果你在 Mac 上无法发送或接收电子邮件
    url: https://support.apple.com/zh-cn/102422
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-28
    publishedAt: 2026-07-21
    official: true
  - id: community-mail-241gb
    title: How to reduce Mail folder size on MacBook Pro?
    url: https://discussions.apple.com/thread/256123732
    publisher: Apple Support Community
    sourceType: community
    accessedAt: 2026-07-28
    publishedAt: 2025-08-26
    official: false
  - id: community-mail-7gb-after-cleanup
    title: Mail on Mac taking up storage -- 2024 and STILL no solution?
    url: https://discussions.apple.com/thread/255825326
    publisher: Apple Support Community
    sourceType: community
    accessedAt: 2026-07-28
    publishedAt: 2024-10-31
    official: false
  - id: community-mail-70gb-report
    title: MacOS Mail Using 70 GB of disk space
    url: https://discussions.apple.com/thread/252172208
    publisher: Apple Support Community
    sourceType: community
    accessedAt: 2026-07-28
    publishedAt: 2020-12-14
    official: false
lastVerifiedAt: 2026-07-28
lastUpdatedAt: 2026-07-28
createdAt: 2026-07-28
relatedArticles:
  - mac-mail-cant-send-receive-email
  - mac-system-data-storage-apfs-snapshots-purgeable-space
  - icloud-storage-full-iphone-backup-fails
popular: true
---

# Mac 邮件占用大量储存空间或附件太多

Mac 的“系统设置 > 通用 > 储存空间”显示“邮件”占用很大，或 Mail 中的大量附件让磁盘快满时，先区分本机磁盘空间、邮箱服务器配额和 Mail App 本身。安全顺序是先保护重要邮件和附件，再使用 Apple 提供的大小排序、保存/移除附件、清除垃圾邮件和已删除项目；不要直接删除 Mail 的隐藏数据库。

---

## 症状

- “Mac 的储存空间显示邮件用了几十 GB，甚至几百 GB。”
- “我删了很多邮件、清空了废纸篓，但可用空间没变。”
- “Mail 已经没有账户了，为什么还占着空间？”
- “我只想删附件，不想删邮件正文。”
- “邮箱服务器提示空间不足，但 Mac 磁盘看起来还有空间。”
- “邮件占用的是磁盘空间，还是内存？”

---

## 可能原因

1. Mail 在本机保存了邮件正文、下载的附件、垃圾邮件和已删除项目。
2. 邮箱服务商的服务器配额已满；这和 Mac 启动磁盘快满是不同的限制。
3. 顾客只删除了邮件列表中的项目，但它们仍在废纸篓中，或 Mail 和 macOS 的储存统计尚未重新计算。
4. IMAP、Exchange、POP 和“我的 Mac”本地邮箱的删除、同步和备份边界不同。
5. 社区案例显示，极大的 Mail 统计数字可能在清理后仍然暂时不变；这不证明可以安全删除 Library 数据目录。

---

## Apple 官方方案

验证级别：Apple 官方

1. 打开“苹果菜单 > 系统设置 > 通用 > 储存空间”，记录总可用空间和“邮件”类别；同时在 Mail 的“账户简介”中记录服务器端邮箱用量，先判断是哪一侧超限。
2. 对本机磁盘空间问题，在 Mail 中按“显示 > 排序方式 > 大小”找出大邮件和带附件的邮件；不要从 Finder 里盲猜 Mail 数据目录。
3. 对仍需保留的附件，先使用“保存附件”或“文件 > 保存为”导出到已备份的位置，并打开副本确认可以使用。
4. 选中已确认有安全副本的邮件，选择“邮件 > 移除附件”。邮件正文可以保留，但 IMAP 账户的附件也会从服务器删除，且可能无法取回。
5. 需要释放邮箱服务器配额时，检查大邮件、垃圾邮件和已删除项目；确认没有误删后选择“邮箱 > 清除垃圾邮件”和“邮箱 > 清除已删除项目”。
6. 若要保留邮件但从服务器配额中移出，可把邮件移动到“我的 Mac”本地邮箱；这不会释放 Mac 磁盘空间，并且本地邮箱需要单独备份。
7. 如果 Mac 整体磁盘接近满，打开储存空间页面查看系统推荐，包括优化储存空间、下载、旧设备备份和废纸篓；不要只处理 Mail 类别。
8. 清理后退出并重新打开 Mail，必要时重新启动 Mac，再重新查看储存空间。统计数字暂时不变时，先保留清理前后证据，不要手动删除隐藏文件。

参考来源：

- [Apple 支持：在 Mac 上的“邮件”中删除电子邮件和管理储存空间](https://support.apple.com/zh-cn/guide/mail/mlhlp1001/mac)
- [Apple 支持：在 Mac 上的“邮件”中查看、保存或删除电子邮件附件](https://support.apple.com/zh-cn/guide/mail/mlhlp1123/mac)
- [Apple 支持：如何清理 Mac 上的数据并释放储存空间](https://support.apple.com/zh-cn/102624)
- [Apple 支持：在 Mac 上优化储存空间](https://support.apple.com/zh-cn/guide/mac-help-cn/sysp4ee93ca4/26/mac/26)

---

## 删除前的账户和数据边界

1. iCloud、IMAP 和 Exchange 邮箱通常与服务器同步；删除邮件或附件可能让其他设备和服务器也同步删除。
2. POP 邮箱可能有只在 Mac 或服务器保留的副本；先确认 Mail 设置和服务商保留策略。
3. “我的 Mac”邮箱是本地邮箱，移动邮件到这里主要是释放服务器配额，不是清理本机磁盘；必须纳入 Time Machine 或其他备份。
4. 如果邮件正文或附件是唯一副本，先导出为邮件文件、PDF 或附件文件，再做删除或移除附件。
5. 不要把“移除附件”描述成只清理下载缓存；Apple 明确提示 IMAP 附件会从服务器删除。

---

## 社区案例边界

Apple Support Community 中有顾客报告 Mail 在 Mac 储存空间里显示 241 GB、70 GB 或 7.8 GB，即使删除邮件、清空废纸篓、重启或移除账户后统计仍没有立刻下降。这些帖子证明“清理后数字仍异常”是需要解释和记录的客户问题，但不能证明 Mail 目录中某个隐藏路径就是安全删除目标。社区中出现的手动删除 `~/Library/Mail`、Containers 或缓存目录建议不属于本文官方方案，可能导致本机邮件、索引或附件丢失。

---

## 零售排查流程

1. 先问清楚是 Mac 启动磁盘不足、邮箱服务器配额不足，还是顾客只看到 Mail 类别数字偏大。
2. 记录 macOS 版本、总容量、可用容量、Mail 类别数字、Mail 账户类型和“账户简介”中的服务器用量。
3. 如果有重要本地邮箱或附件，先验证 Time Machine 或其他备份；没有副本时不要批量删除。
4. 按邮件大小找出大项目，先保存需要的附件，再分批移除附件或删除不需要的邮件。
5. 检查垃圾邮件、废纸篓和已删除项目；确认范围后再清除，并记录清理时间。
6. 如果目标是服务器配额，把邮件移到“我的 Mac”前说明它仍占本机空间且需要单独备份。
7. 如果目标是 Mac 磁盘，查看储存空间中的其他大类和系统优化建议；不要只重复清空 Mail。
8. 退出 Mail、重新打开或重启后再观察统计；若空间数字仍不合理，保留前后截图和错误信息。
9. 不要使用第三方清理工具、删除未知 Library 文件或反复重建邮箱来追求一个看起来更小的数字。

---

## 升级处理

联系 Apple 支持：

- 完成官方邮件、附件、垃圾邮件和已删除项目清理后，Mail 统计长时间严重异常。
- Mail 无法打开、反复损坏索引，或清理影响多个账户的收发和搜索。
- 顾客无法判断本地唯一副本、IMAP/Exchange/POP 同步范围或备份是否完整。

联系邮箱服务商或公司 IT：

- 服务器配额、保留策略、归档、Exchange 管理或公司账户限制不清楚。
- 删除服务器端邮件或附件需要管理员确认。

不要直接维修或抹掉 Mac：

- 仅凭 Mail 类别数字偏大不能判定硬盘故障；先完成数据保护和软件层诊断。

---

## 相关问题

- [Mac 邮件无法发送或接收邮件](/recipes/Mac/mac-mail-cant-send-receive-email)
- [Mac 系统数据占用大、APFS 快照或可清除空间异常](/recipes/Mac/mac-system-data-storage-apfs-snapshots-purgeable-space)
- [iCloud 储存空间已满，iPhone 或 iPad 无法备份](/recipes/iCloud/icloud-storage-full-iphone-backup-fails)

---

## 标签

- 设备：Mac
- 系统：macOS
- 功能：Mail、邮件、附件、邮箱、储存空间
- 网络：iCloud、IMAP、Exchange、POP、邮箱服务器
- Apple 账户：iCloud Mail、iCloud 储存空间
- 隐私：邮件内容、附件、账户密码、本地归档
- 维修：先排查数据和系统统计；只有伴随磁盘读写异常时才进入硬件诊断

---

## 元信息

- 最后更新：2026-07-28
- 来源数量：8
- 验证级别：Apple 官方
- 支持系统：当前支持的 macOS；储存空间路径以 macOS 版本为准
- 可信度：高；社区案例仅用于异常模式识别
