# Daily Harvest - 2026-07-12

## Harvest Run - 2026-07-12 00:00 CST

### P0 Feedback Intake

- GitHub issue #4: `P0 feedback: 部署验证测试`
  - Customer wording: “测试反馈表单是否能写入 ECS 持久目录”.
  - Decision: This is an operational deployment-test feedback item, not a customer troubleshooting question. No recipe was created. The item was recorded here and closed after confirming it required no Apple-source research.
- GitHub issue #5: `P0 feedback: Mac 用户密码遗忘`
  - Customer wording: “我忘记电脑开机密码”.
  - Decision: Created a new canonical Mac recipe because no existing article covered forgotten Mac login password, FileVault recovery key, Apple Account reset, and erase-as-last-resort boundaries.
- GitHub issue #6: `P0 feedback: 待分析问题: 安全延迟注意事项`
  - Customer wording: “安全延迟注意事项”.
  - Decision: Created a new canonical iPhone recipe for Stolen Device Protection security delay because no existing article covered the one-hour delay, Face ID / Touch ID requirement, familiar-location confusion, or trade-in timing.

### Search Queries

- `site:support.apple.com/zh-cn Mac 忘记 登录密码 重设 macOS Apple 支持`
- `site:support.apple.com/zh-cn Mac 重设 登录密码 恢复助理 文件保险箱 Apple 支持`
- `site:support.apple.com/zh-cn 安全延迟 被盗设备保护 Apple 支持 iPhone`
- `site:support.apple.com/zh-cn 被盗设备保护 安全延迟 Apple ID 密码 iPhone`
- `site:discussions.apple.com Mac forgot login password cannot get into macOS reset password FileVault Apple Community 2026`
- `site:reddit.com/r/mac forgot Mac login password can't log in FileVault recovery key reset password`
- `site:discussions.apple.com "security delay" "Stolen Device Protection" Apple ID password`
- `site:reddit.com/r/iphone "security delay" "Stolen Device Protection" Apple ID password`

### Sources Visited

- Apple Support: [如果你忘记了 Mac 登录密码](https://support.apple.com/zh-cn/102633)
- Mac User Guide: [在 Mac 上更改登录密码](https://support.apple.com/zh-cn/guide/mac-help/mchlp1550/mac)
- Apple Support: [如果你的 Mac 无法顺利完成启动](https://support.apple.com/zh-cn/102675)
- Apple Platform Security: [macOS 中的文件保险箱恢复](https://support.apple.com/zh-cn/guide/security/sec4c6dc1b6e/web)
- Apple Support: [抹掉 Mac 并还原为出厂设置](https://support.apple.com/zh-cn/102664)
- Apple Support: [无法重设 Apple 账户密码时如何使用账户恢复](https://support.apple.com/zh-cn/118574)
- Apple Support: [关于 iPhone 的“失窃设备保护”](https://support.apple.com/zh-cn/120340)
- iPhone User Guide: [在 iPhone 上使用“失窃设备保护”](https://support.apple.com/zh-cn/guide/iphone/iph17105538b/ios)
- Apple Support: [更改 Apple 账户密码](https://support.apple.com/zh-cn/101567)
- Apple Support: [如果你忘记了自己的 Apple 账户密码](https://support.apple.com/zh-cn/102656)
- Apple Support: [出售、赠送或折抵 iPhone 或 iPad 前该怎么做](https://support.apple.com/zh-cn/109511)
- Apple Support: [将锁定的 App 与“失窃设备保护”搭配使用](https://support.apple.com/zh-cn/125690)
- Apple Support Community: [FileVault-enabled MacBook asking for old password](https://discussions.apple.com/thread/256117235)
- Apple Support Community: [Forgot login and now recovery key required](https://discussions.apple.com/thread/254527949)
- Reddit r/mac: [Forgot Mac password and don't have the recovery key](https://www.reddit.com/r/mac/comments/17u1tn4/forgot_mac_password_and_dont_have_the_recovery/)
- Reddit r/mac: [I have an M1 MacBook Air but I forgot my new password](https://www.reddit.com/r/mac/comments/1bm8jm7/i_have_an_m1_macbook_air_but_i_forgot_my_new/)
- Apple Support Community: [How can I turn off Stolen Device Protection?](https://discussions.apple.com/thread/255525962)
- Apple Support Community: [Why do I have a security delay from trying to change my Apple ID?](https://discussions.apple.com/thread/255534136)
- Apple Support Community: [Stolen device protection shows an hour security delay even at my home](https://discussions.apple.com/thread/255479405)
- Reddit r/iPhone: [PSA: Turn off stolen device protection if you're trading in your iPhone](https://www.reddit.com/r/iphone/comments/1fktnhn/psa_turn_off_stolen_device_protection_if_youre/)
- Reddit r/iPhone: [Stupid One Hour Delay](https://www.reddit.com/r/iphone/comments/1l1xdo7/stupid_one_hour_delay/)

### Evidence Collected

- Apple says Mac login password is used to unlock the Mac at startup or wake and is not the Apple Account password used for iCloud, App Store, and other Apple services. Source: [Mac User Guide](https://support.apple.com/zh-cn/guide/mac-help/mchlp1550/mac).
- Apple's forgotten Mac login password article prioritizes login-window reset options, then macOS Recovery options including “忘记所有密码？”, Apple Account authentication, FileVault recovery key, selecting the startup volume, and temporary deactivation prompts. Source: [Apple Support 102633](https://support.apple.com/zh-cn/102633).
- Apple says the login window appears after restart, startup, or logout, while the lock screen can look similar but does not provide password reset options. Source: [Apple Support 102675](https://support.apple.com/zh-cn/102675).
- Apple Platform Security explains FileVault recovery key behavior and that recovery keys can be used in recoveryOS or at the login window in supported flows. Source: [Apple Platform Security](https://support.apple.com/zh-cn/guide/security/sec4c6dc1b6e/web).
- Apple's erase Mac guidance confirms erasing returns the Mac to factory settings and removes local content; it is a last-resort branch after password reset and backup review. Source: [Apple Support 102664](https://support.apple.com/zh-cn/102664).
- Apple says account recovery can take days or longer and Apple Support cannot shorten the wait. Source: [Apple Support 118574](https://support.apple.com/zh-cn/118574).
- Apple says Stolen Device Protection adds Face ID or Touch ID requirements and a one-hour security delay for certain sensitive actions when away from familiar locations. Sources: [Apple Support 120340](https://support.apple.com/zh-cn/120340), [iPhone User Guide](https://support.apple.com/zh-cn/guide/iphone/iph17105538b/ios).
- Apple says biometric authentication required by Stolen Device Protection cannot fall back to passcode for protected actions. Source: [Apple Support 120340](https://support.apple.com/zh-cn/120340).
- Apple's Apple Account password articles note that a one-hour wait may be required before changing Apple Account password or other critical security settings. Sources: [Apple Support 101567](https://support.apple.com/zh-cn/101567), [Apple Support 102656](https://support.apple.com/zh-cn/102656).
- Apple's sell/give away/trade-in article warns that changing password in a store may have a one-hour security delay if Stolen Device Protection is enabled. Source: [Apple Support 109511](https://support.apple.com/zh-cn/109511).
- Apple Support Community and Reddit show repeated customer confusion around “no reset option,” “recovery key required,” “security delay at home,” “disable security delay,” and “trade-in stuck for an hour.” These were used as customer-language and prioritization signals only.

### Customer Wording

- “我忘记电脑开机密码。”
- “Mac 开机密码忘了，进不了系统。”
- “Apple ID 密码知道，为什么 Mac 还是打不开？”
- “要我输入文件保险箱恢复密钥。”
- “没有恢复密钥还能保留资料吗？”
- “iPhone 提示安全延迟。”
- “关闭失窃设备保护要等一小时。”
- “在家里也要求安全延迟。”
- “到店折抵才发现不能马上关闭查找。”
- “Face ID 坏了，能不能用密码跳过？”

### Cross-source Patterns

- Forgotten Mac password issues are really three separate branches: local login password, Apple Account password, and FileVault recovery key. The recipe now separates them before any erase recommendation.
- Community Mac discussions often jump straight to Terminal `resetpassword` or erase-and-reinstall. The Cookbook article keeps Apple UI reset paths first and labels direct erase as a high-risk last resort.
- Security delay complaints are usually expectation problems, not software failures. Customers want to finish trade-in, Apple Account password change, or Stolen Device Protection changes immediately, but Apple's security model intentionally adds waiting and biometric re-authentication.
- Familiar-location confusion appears repeatedly in community threads. The article avoids promising that changing home/work location can bypass delay.
- Face ID / Touch ID availability is a critical Retail branch because Stolen Device Protection prevents passcode fallback for protected actions.

### Articles Created, Improved, Merged, or Flagged

- Created `cookbook/Mac/mac-forgot-login-password-reset.md` as the canonical Official recipe for forgotten Mac login password, FileVault recovery key, Apple Account reset, lock screen vs login window, backup boundaries, and erase-as-last-resort.
- Created `cookbook/iPhone/iphone-stolen-device-protection-security-delay.md` as the canonical Official recipe for iPhone security delay, Stolen Device Protection, one-hour wait, Face ID / Touch ID requirement, familiar-location confusion, trade-in timing, and escalation.
- No duplicate recipe was found or merged.
- Issue #4 was flagged as a non-troubleshooting deployment-test intake item and did not require a recipe.

### Verification Changes

- New recipe `Mac 忘记登录密码，无法进入 macOS` is `Official` because the core flow is directly supported by Apple Support 102633, Mac User Guide login-password documentation, Apple startup-screen guidance, FileVault platform security documentation, erase-Mac guidance, and account recovery documentation.
- New recipe `iPhone 显示安全延迟，无法立即更改 Apple 账户或关闭失窃设备保护` is `Official` because its core explanation and actions are supported by Apple Support 120340, iPhone User Guide Stolen Device Protection guidance, Apple Account password articles, trade-in guidance, and locked-app guidance.
- Community suggestions around Terminal `resetpassword`, direct erase, changing VPN/location settings, or manipulating familiar locations were labeled nonofficial and not presented as Apple recommendations.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- Both new articles follow the Apple Support-inspired structure: direct symptom-focused title, short intro, symptoms, causes, official ordered solution, focused decision sections, clearly separated nonofficial methods, Retail flow, escalation, related links, and compact metadata.
- Official recommendations are textually separated from unofficial community workarounds so risky erase or location-tweaking advice does not appear as Apple guidance.

### Typography/Layout Improvements

- No typography tokens changed. Current article styling already uses the Apple-like system font stack, narrow article width, 17px body sizing, calm spacing, Apple-like blue links, and compact metadata.
- New article copy is split into short paragraphs and numbered steps to preserve the Apple Support-like reading rhythm on desktop and mobile.

### Blocked Sources

- Direct Xiaohongshu signals were not reliably accessible from this environment during this P0-focused run. No factual recommendation was based on inaccessible Xiaohongshu content.
- Reddit and Apple Support Community content was used for customer wording and repeated confusion only; official recommendations came from Apple sources.

### Follow-up Opportunities

- Add a dedicated article for Mac Activation Lock if future feedback mentions second-hand Mac owner lock or “enter someone else's Apple ID.”
- Review whether a Face ID / Touch ID repair article should cross-link to the Stolen Device Protection security delay recipe.
- Monitor Apple Support 120340 and 109511 for changes around trade-in workflows and default Stolen Device Protection behavior.
- Consider adding a short FAQ component for “Apple 账户密码能不能代替设备密码？” across Mac and iPhone password articles.

## Harvest Run - 2026-07-12 16:00 CST

### P0 Feedback Intake

- Checked GitHub issues in `Neverwhateve/apple-cookbook` with labels `P0` and `feedback-intake`.
- No open P0 feedback-intake issues were found, so this run proceeded to normal source harvest.

### Search Queries

- `site:support.apple.com/zh-cn iCloud 储存空间 已满 无法备份 iPhone Apple 支持`
- `site:support.apple.com/en-us iCloud storage full iPhone backup not enough storage Apple Support`
- `site:discussions.apple.com iCloud storage full iPhone not backing up not enough storage Apple Community`
- `site:reddit.com/r/iphone iCloud storage full iPhone backup not enough storage`
- `site:support.apple.com/zh-cn 备份 iPhone iPad 使用 iCloud 电脑 Apple 支持`
- `site:support.apple.com/zh-cn iCloud 云备份 包含 哪些内容 Apple 支持`
- `site:support.apple.com/zh-cn 使用 Mac 备份 iPhone Apple 支持`
- `site:support.apple.com/zh-cn Windows 备份 iPhone Apple 设备 Apple 支持`
- `site:xiaohongshu.com iCloud 空间满了 备份失败 iPhone`
- `site:xiaohongshu.com iPhone iCloud 储存空间已满 备份不了`
- `site:xiaohongshu.com iCloud 云备份失败 空间不足 iPhone`

### Sources Visited

- Apple Support: [如果你无法备份到 iCloud](https://support.apple.com/zh-cn/102563)
- Apple Support: [在 Apple 设备上管理 iCloud 储存空间](https://support.apple.com/zh-cn/108922)
- Apple Support: [iCloud 储存空间与 iPhone 或 iPad 上的设备储存空间有什么区别？](https://support.apple.com/zh-cn/102670)
- Apple Support: [如何通过 iCloud 备份 iPhone 或 iPad](https://support.apple.com/zh-cn/108366)
- Apple Support: [iCloud 会备份哪些内容？](https://support.apple.com/zh-cn/108770)
- Apple Support: [如何备份你的 iPhone、iPad 和 iPod touch](https://support.apple.com/zh-cn/118426)
- Apple Support: [如何通过 Mac 备份 iPhone 或 iPad](https://support.apple.com/zh-cn/108796)
- Apple Support: [如何在 Windows 中备份 iPhone、iPad 或 iPod touch](https://support.apple.com/zh-cn/108967)
- Apple Support: [在购买新 iPhone 或 iPad 时获取临时 iCloud 储存空间](https://support.apple.com/zh-cn/104980)
- Apple Support: [将照片和视频从 iPhone 或 iPad 传输到 Mac 或 PC](https://support.apple.com/zh-cn/120267)
- Apple Support Community: [iphone icloud backup not enough storage](https://discussions.apple.com/thread/256178444)
- Apple Support Community: [This iPhone cannot be backed up because there is not enough iCloud storage](https://discussions.apple.com/thread/253971444)
- Apple Support Community: [Why can't I backup my iPhone data to iCloud?](https://discussions.apple.com/thread/256071902)
- Apple Support Community: [Why is my iPhone storage full when I have iCloud](https://discussions.apple.com/thread/253852269)
- Reddit r/iPhone: [How do you backup iPhone if you have no storage on iCloud?](https://www.reddit.com/r/iphone/comments/za6nta/how_do_you_backup_iphone_if_you_have_no_storage/)
- Reddit r/iPhone: [iCloud backup failing even though I have 50GB plan and my data is not much](https://www.reddit.com/r/iphone/comments/1pwqfjf/icloud_backup_failing_even_though_i_have_50gb/)
- Reddit r/iPhone: [why can't I backup my phone i have enough storage?](https://www.reddit.com/r/iphone/comments/1dfishv/why_cant_i_backup_my_phone_i_have_enough_storage/)

### Evidence Collected

- Apple says iCloud storage is used for iCloud Backup, iCloud Photos, iCloud Drive, and other iCloud data, while device storage is the physical capacity on the iPhone or iPad. Source: [Apple Support 102670](https://support.apple.com/zh-cn/102670).
- Apple's iCloud backup failure guidance tells customers to inspect iCloud usage, open Backups, select the current device, and compare available iCloud storage with “Next Backup Size.” Source: [Apple Support 102563](https://support.apple.com/zh-cn/102563).
- Apple says iCloud storage can be freed by reviewing Recommended for You, deleting old backups, managing iCloud Photos, deleting iCloud Drive files, and reducing Messages attachments. Source: [Apple Support 108922](https://support.apple.com/zh-cn/108922).
- Apple says if iCloud Photos is off, photos and videos can be included in iCloud Backup; if iCloud Photos is on, photos and videos sync to iCloud and are not included in the daily backup. Source: [Apple Support 108770](https://support.apple.com/zh-cn/108770).
- Apple says automatic iCloud Backup requires iCloud Backup to be on, the device connected to power, connected to Wi-Fi, and locked. Source: [Apple Support 108366](https://support.apple.com/zh-cn/108366).
- Apple says iCloud Backup can appear gray when restore is still in progress or a configuration profile restricts iCloud Backup. Source: [Apple Support 102563](https://support.apple.com/zh-cn/102563).
- Apple says customers buying a new iPhone or iPad may qualify for temporary iCloud storage when current iCloud storage is insufficient to back up the current device. Source: [Apple Support 104980](https://support.apple.com/zh-cn/104980).
- Apple's Mac and Windows backup articles support computer backup as an official alternative, and Apple specifically notes encrypted local backup for Health and Fitness data. Sources: [Apple Support 108796](https://support.apple.com/zh-cn/108796), [Apple Support 108967](https://support.apple.com/zh-cn/108967).
- Apple has a separate photo/video import flow, which supports explaining why copying DCIM or importing photos is not equivalent to a complete device backup. Source: [Apple Support 120267](https://support.apple.com/zh-cn/120267).

### Customer Wording

- “iCloud 空间满了，手机一直提示备份失败。”
- “明明买了 50GB，还是说无法备份。”
- “iPhone 储存空间还有很多，为什么 iCloud 备份空间不足？”
- “iCloud 满了是不是手机内存也满了？”
- “换新 iPhone 前没有足够 iCloud 空间备份。”
- “备份大小一直在计算，或者下一次备份比剩余空间大。”
- “照片删了，iCloud 空间还是没立刻回来。”
- “插电脑只看到 DCIM，算不算已经备份了？”

### Cross-source Patterns

- Customers frequently confuse device storage with iCloud storage. The new recipe makes that distinction before any delete or upgrade recommendation.
- Apple Support Community and Reddit threads repeatedly show customers checking only remaining iCloud storage instead of the current device's “Next Backup Size.” The article elevates this as the first sizing decision.
- Photo handling is a major source of confusion: if iCloud Photos is off, photos may be in iCloud Backup; if iCloud Photos is on, they sync separately and consume iCloud storage outside the backup.
- Community advice often suggests copying DCIM to a computer. The article treats photo import as a partial risk-reduction step, not a complete device backup.
- For Retail, the fastest path depends on intent: upgrade/manage iCloud for long-term backups, temporary iCloud storage for new-device transfer, or encrypted computer backup before repair/erase.

### Articles Created, Improved, Merged, or Flagged

- Created `cookbook/iCloud/icloud-storage-full-iphone-backup-fails.md` as the canonical Official recipe for iCloud storage full, iCloud Backup failure, Next Backup Size, iCloud vs device storage confusion, temporary iCloud storage for new-device migration, and computer-backup alternatives.
- No duplicate recipe was found or merged.
- No existing recipe was modified; related links point back to existing iPhone passcode, update, and eSIM recipes where the backup decision often matters.

### Verification Changes

- New recipe `iCloud 储存空间已满，iPhone 或 iPad 无法备份` is `Official` because the troubleshooting flow is supported by Apple Support articles for iCloud backup failure, iCloud storage management, iCloud vs device storage, iCloud Backup contents, iCloud backup setup, Mac backup, Windows backup, temporary iCloud storage, and photo import boundaries.
- Community and Reddit sources were used only for customer wording and repeated confusion patterns. No community workaround was presented as Apple guidance.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- The new article follows the Apple Support-inspired reading order: symptom title, short intro, symptoms, root causes, official solution, focused decision sections, clearly labeled unofficial notes, Retail flow, escalation, related links, and compact metadata.
- Official recommendations are separated from unofficial community patterns so photo-import and DCIM-copy advice is not mistaken for a complete Apple backup recommendation.

### Typography/Layout Improvements

- No typography tokens changed in this run.
- The new article uses short paragraphs, scannable H2/H3 sections, numbered steps for actions, compact source lists, and a narrow support-article rhythm consistent with the existing Cookbook style.

### Blocked Sources

- Xiaohongshu search results were not reliably accessible from this environment for this topic. No factual recommendation was based on inaccessible Xiaohongshu content.

### Follow-up Opportunities

- Add a related article for iCloud Photos not syncing, photos missing after enabling iCloud Photos, or “Optimize iPhone Storage” confusion.
- Add a related article for iPhone migration stuck on “Preparing to Transfer” or temporary iCloud backup restore expiration.
- Consider cross-linking future repair-intake articles to this backup article before erase, restore, or device replacement steps.
