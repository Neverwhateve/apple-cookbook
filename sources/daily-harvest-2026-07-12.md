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

## Harvest Run - 2026-07-12 19:15 CST

### P0 Feedback Intake

- GitHub issue #7: `P0 feedback: 待分析问题: 微信拍照会黑屏卡顿`
  - Customer wording: “微信拍照会黑屏卡顿”.
  - Decision: Created a new canonical iPhone recipe because no existing article covered WeChat-only or third-party-App camera black screen, the split between App-level failure and system Camera failure, and the safe order before deleting WeChat.

### Search Queries

- `site:support.apple.com/zh-cn iPhone App 相机 黑屏 权限 麦克风 相机 Apple 支持`
- `site:support.apple.com/zh-cn iPhone 相机 无法正常工作 黑屏 Apple 支持`
- `site:support.apple.com/zh-cn iPhone App 卡死 无响应 更新 App Apple 支持`
- `site:support.apple.com/zh-cn iPhone 储存空间 已满 App 卡顿 Apple 支持`
- `site:support.apple.com/zh-cn iPhone 控制 App 访问 相机 麦克风 照片 权限 Apple 支持`
- `site:discussions.apple.com iPhone app camera black screen WeChat camera freezes`
- `site:discussions.apple.com iPhone camera black screen only in app permission restart update app`
- `site:reddit.com/r/iphone WeChat camera black screen iPhone`
- `site:reddit.com/r/applehelp iPhone camera black screen only third party apps`
- `site:xiaohongshu.com 微信 拍照 黑屏 卡顿 iPhone`
- `site:xiaohongshu.com iPhone 微信 拍照 黑屏`
- `微信 iPhone 拍照 黑屏 卡顿 官方 帮助`

### Sources Visited

- Apple Support: [在 iPhone 上控制硬件功能使用权限](https://support.apple.com/zh-cn/guide/iphone/iph168c4bbd5/ios)
- Apple Support: [如果 iPhone、iPad 或 iPod touch 上的相机或闪光灯无法正常工作](https://support.apple.com/zh-cn/102514)
- Apple Support: [如果 iPhone 或 iPad 上的某个 App 停止响应、意外关闭或无法打开](https://support.apple.com/zh-cn/119876)
- Apple Support: [如果你的 iPhone 或 iPad 运行缓慢](https://support.apple.com/zh-cn/102598)
- Apple Support: [如何检查 iPhone 和 iPad 上的储存空间](https://support.apple.com/zh-cn/108429)
- Apple Support: [如何联系 App 开发者](https://support.apple.com/zh-cn/102435)
- Apple Support Community Chinese: [微信拍照卡顿，黑屏闪退，画面模糊](https://discussionschinese.apple.com/thread/256216511)
- Apple Support Community: [Camera displays a black screen on iOS 26.2](https://discussions.apple.com/thread/256222848)
- Apple Support Community: [Camera won't work in Apps](https://discussions.apple.com/thread/252226379)
- Reddit r/applehelp: [Camera is not working on any apps](https://www.reddit.com/r/applehelp/comments/1ffd8sn/camera_is_not_working_on_any_apps/)
- Reddit r/applehelp: [Camera doesn't work in multiple apps](https://www.reddit.com/r/applehelp/comments/1l83hp8/camera_doesnt_work_in_multiple_apps/)

### Evidence Collected

- Apple says iPhone users can check or change Camera, Microphone, Bluetooth, Local Network, and other hardware permissions in `设置 > 隐私与安全性`, and each App can be allowed or denied. Source: [iPhone User Guide](https://support.apple.com/zh-cn/guide/iphone/iph168c4bbd5/ios).
- Apple lists black camera screen as one symptom of iPhone/iPad/iPod touch camera or flash not working and recommends removing cases, films, magnetic accessories, lens accessories, and other items that may block or affect the camera before testing. Source: [Apple Support 102514](https://support.apple.com/zh-cn/102514).
- Apple's App troubleshooting order is close/reopen the App, restart the device, check for App updates and system updates, then delete and redownload the App if needed. Source: [Apple Support 119876](https://support.apple.com/zh-cn/119876).
- Apple says slow iPhone/iPad troubleshooting includes checking network conditions, closing unresponsive Apps, checking available storage, turning off Low Power Mode when normal performance is needed, and avoiding extreme temperature. Source: [Apple Support 102598](https://support.apple.com/zh-cn/102598).
- Apple says `设置 > 通用 > iPhone 储存空间` shows available storage and App storage usage; users can offload or delete Apps and remove content when storage is nearly full. Source: [Apple Support 108429](https://support.apple.com/zh-cn/108429).
- Apple provides an App Store path to contact an iOS/iPadOS/watchOS App developer through the App product page's `App 支持` link. Source: [Apple Support 102435](https://support.apple.com/zh-cn/102435).
- Apple Support Community Chinese has a closely matching customer report: WeChat photo capture is blurry, black-screening, freezing, and hard to exit, requiring closing WeChat from the app switcher. This was used as customer-language and prioritization evidence only.
- Apple Support Community and Reddit threads show repeated patterns around third-party camera calls going black, temporary recovery after restart, permissions being enabled, and the need to distinguish a single-App problem from all-camera failure.

### Customer Wording

- “微信拍照会黑屏卡顿。”
- “微信拍照卡顿，黑屏闪退，画面模糊。”
- “微信相机一打开就是黑的。”
- “扫码的时候卡住，只能杀后台。”
- “系统相机正常，只有微信拍照黑屏。”
- “多个 App 调用相机都黑屏，重启后暂时恢复。”

### Cross-source Patterns

- The fastest Retail branch is not “delete WeChat first”; it is to open Apple Camera immediately and classify the issue as WeChat-only, multiple third-party Apps, or system Camera failure.
- Customer reports often blame the iPhone system when the observed failure is inside WeChat. The recipe now separates App permission/update/developer-support paths from Apple Camera hardware/service paths.
- Community posts repeatedly mention restarting as a temporary recovery. The new article labels this as a nonofficial temporary workaround and keeps Apple-supported update, permission, storage, accessory, and service checks ahead of speculative fixes.
- Short-video and forum posts mention toggling Camera Control or lock-screen camera settings. The article records this only as an Experimental nonofficial idea, not Apple guidance.

### Articles Created, Improved, Merged, or Flagged

- Created `cookbook/iPhone/iphone-wechat-camera-black-screen-lag.md` as the canonical Official recipe for WeChat photo black screen, third-party App camera freezes, App permissions, App update/reinstall boundaries, storage/performance checks, Apple Camera hardware separation, developer escalation, and Retail triage.
- No duplicate recipe was found or merged.

### Verification Changes

- New recipe `iPhone 微信拍照黑屏或卡顿` is `Official` because the troubleshooting order is supported by Apple documentation for hardware permissions, iPhone camera/flash failures, App responsiveness, iPhone performance, storage checks, and contacting App developers.
- Community and Reddit sources were used for customer wording, recurrence, and unofficial temporary workarounds only.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- The new article follows the Apple Support-inspired reading order: direct symptom title, short intro, symptoms, likely causes, Apple official ordered solution, key branch decisions, clearly labeled unofficial methods, Retail flow, escalation, related problems, tags, and compact metadata.
- Official recommendations are separated from unofficial community suggestions so toggling camera shortcut settings does not appear as Apple guidance.

### Typography/Layout Improvements

- No typography tokens changed in this run.
- The new article uses short paragraphs, numbered official steps, H3 decision branches, and compact source lists to match the existing Apple Support-like article rhythm.

### Blocked Sources

- Direct Xiaohongshu pages were not reliably accessible from search results for this topic. Search snippets and short-video/forum signals showed repeated Chinese wording around “微信拍照黑屏/卡顿,” but no factual recommendation was based on inaccessible Xiaohongshu content.
- No official Tencent/WeChat help article for the exact iPhone camera black-screen symptom was found during this run.

### Follow-up Opportunities

- Add a broader canonical article for `iPhone 相机黑屏或闪光灯无法使用` so hardware-facing camera issues have a dedicated page separate from third-party App failures.
- If future feedback mentions WeChat data loss or migration, add a dedicated WeChat chat-history backup article and cross-link it before any delete/reinstall step.
- Monitor Apple Support Community for iOS 26 camera black-screen recurrence and whether Apple updates the camera or App troubleshooting articles with version-specific guidance.

## Harvest Run - 2026-07-12 16:30 CST

### P0 Feedback Intake

- Checked GitHub issues in `Neverwhateve/apple-cookbook` with labels `P0` and `feedback-intake`.
- No open P0 feedback-intake issues were found, so this run proceeded to normal source harvest.

### Search Queries

- `site:support.apple.com/en-us Apple Support iPhone support article updated July 2026 troubleshooting`
- `site:support.apple.com/zh-cn Apple 支持 iPhone 无法 蓝牙 AirDrop 更新 2026`
- `site:support.apple.com/en-us AirPods won't connect reset firmware support Apple updated 2026`
- `site:support.apple.com/zh-cn Apple 支持 AirPods 无法连接 重置 固件`
- `site:discussions.apple.com AirDrop waiting not showing iPhone Mac 2026`
- `site:reddit.com/r/iphone AirDrop waiting not showing everyone 10 minutes code iOS 26`
- `site:reddit.com/r/applehelp AirDrop keeps waiting not showing iPhone Mac`
- `site:xiaohongshu.com 隔空投送 一直等待 找不到 对方 iPhone`
- `site:support.apple.com/zh-cn Mac 防火墙 阻止所有传入连接 AirDrop Apple 支持`
- `site:support.apple.com/en-us Mac firewall block all incoming connections AirDrop Apple Support`

### Sources Visited

- Apple Support: [在 iPhone 和 iPad 上隔空投送的使用方法](https://support.apple.com/zh-cn/119857)
- iPhone User Guide: [使用隔空投送向附近 Apple 设备发送项目](https://support.apple.com/zh-cn/guide/iphone/iphcd8b9f0af/ios)
- Mac User Guide: [使用隔空投送向附近 Apple 设备发送项目](https://support.apple.com/zh-cn/guide/mac-help/mh35868/mac)
- Apple Personal Safety User Guide: [安全使用隔空投送](https://support.apple.com/zh-cn/guide/personal-safety/secure-airdrop-ips7d84d2cdc/web)
- Apple Support: [iPhone 镜像：通过 Mac 使用 iPhone](https://support.apple.com/zh-cn/120421)
- Apple Support: [关于 AirPods 固件更新](https://support.apple.com/zh-cn/106340)
- Apple Support: [如何重置 AirPods 和 AirPods Pro](https://support.apple.com/zh-cn/118531)
- Apple Support: [如何重新启动或重置 AirPods Max](https://support.apple.com/zh-cn/119838)
- Apple Support Community: [AirDrop not working from iPhone to Mac](https://discussions.apple.com/thread/256209185)
- Apple Support Community: [AirDrop says "waiting" but never connects](https://discussions.apple.com/thread/252044315)
- Apple Support Community: [AirDrop continually failing between iPhone and MacBook](https://discussions.apple.com/thread/255160349)
- Reddit r/iPhone: [AirDrop no longer works after the iOS 26.2 update](https://www.reddit.com/r/iphone/comments/1ppd6u7/air_drop_no_longer_works_after_the_ios_262_update/)
- Reddit r/applehelp: [iPhone to Mac AirDrop "No People Found"](https://www.reddit.com/r/applehelp/comments/1erllle/iphone_to_mac_airdrop_no_people_found/)
- Reddit r/applehelp: [AirDrop not working? Make sure to have their email set in contact card](https://www.reddit.com/r/applehelp/comments/v0h2w4/airdrop_not_working_make_sure_to_have_their_email/)

### Evidence Collected

- Apple's current iPhone/iPad AirDrop support article says both devices must be nearby with Wi-Fi and Bluetooth on, and either device's Personal Hotspot should be disconnected. Source: [Apple Support 119857](https://support.apple.com/zh-cn/119857).
- Apple says if both devices use iOS 17 or later, users can try holding them together to share via AirDrop. Source: [Apple Support 119857](https://support.apple.com/zh-cn/119857).
- Apple says non-contact AirDrop sharing on iOS 26.2, iPadOS 26.2, macOS 26.2 or later may require an AirDrop code; after the code is accepted, the sender can remain available for AirDrop sharing for 30 days and can be removed from “其他已知联系人.” Sources: [Apple Support 119857](https://support.apple.com/zh-cn/119857), [iPhone User Guide](https://support.apple.com/zh-cn/guide/iphone/iphcd8b9f0af/ios), [Mac User Guide](https://support.apple.com/zh-cn/guide/mac-help/mh35868/mac).
- Apple says “所有人（10 分钟）” changes back after 10 minutes: to “仅限联系人” when signed in to an Apple Account, or “接收关闭” when not signed in. Source: [Apple Support 119857](https://support.apple.com/zh-cn/119857).
- Apple says Mac AirDrop requires both devices to have Wi-Fi and Bluetooth on and be within 10 meters (30 feet). Source: [Mac User Guide](https://support.apple.com/zh-cn/guide/mac-help/mh35868/mac).
- Apple says same-Apple-Account AirDrop transfers are automatically accepted, and AirDrop transfers are encrypted. Source: [Mac User Guide](https://support.apple.com/zh-cn/guide/mac-help/mh35868/mac).
- Apple says if a transfer has started and the devices leave Bluetooth or Wi-Fi range, the transfer continues over the internet; iPhone users can turn off AirDrop cellular data in `设置 > 通用 > 隔空投送`. Sources: [Mac User Guide](https://support.apple.com/zh-cn/guide/mac-help/mh35868/mac), [iPhone User Guide](https://support.apple.com/zh-cn/guide/iphone/iphcd8b9f0af/ios).
- Apple says VPN and other third-party security software can interfere with Continuity-style nearby device workflows, and Mac firewall settings should not block all incoming connections. Source: [Apple Support 120421](https://support.apple.com/zh-cn/120421). This was applied cautiously as a Mac-direction AirDrop branch, not as a first-line AirDrop requirement.
- Apple Support Community and Reddit repeatedly show customer wording around “waiting,” “No People Found,” one-way iPhone-to-Mac failure, `Everyone for 10 minutes`, contact-card Apple Account email mismatch, restart/toggle recovery, and Mac firewall/security software checks. These were used for customer wording and branch prioritization only.

### Customer Wording

- “隔空投送一直等待。”
- “对方手机不显示。”
- “显示 No People Found。”
- “iPhone 到 Mac 一直卡在 Waiting。”
- “Mac 能发给 iPhone，但 iPhone 找不到 Mac。”
- “换成所有人 10 分钟才偶尔能传。”
- “对方让我输入隔空投送代码。”
- “离开 Wi-Fi 后担心会不会走蜂窝数据。”

### Cross-source Patterns

- Official Apple guidance and community reports both point to the same first branch: discovery settings, Wi-Fi/Bluetooth, nearby distance, personal hotspot, and contact identity matching.
- iOS 26.2 / macOS 26.2 AirDrop code behavior can look like a new error to customers. The article now explains the code, 30-day continuation, and removal path so Retail does not treat it as a fault.
- Mac-direction failures show more VPN, security software, firewall, and one-way-transfer language than phone-to-phone cases. The article now keeps that as a later branch after official AirDrop checks.
- Reddit and Apple Community suggestions around toggling settings, restarting, or turning off “Bring Devices Together” were not elevated to official Apple recommendations. The article keeps restart as a safe later step and treats other toggles as context only.
- Xiaohongshu search was attempted for Chinese wording around “隔空投送一直等待/找不到,” but direct result access was not reliable enough to support factual recommendations.

### Articles Created, Improved, Merged, or Flagged

- Improved `cookbook/Continuity/airdrop-keeps-waiting.md` as the canonical Official AirDrop recipe.
- Promoted the article status from `seed` to `canonical` because the updated flow now covers current Apple guidance, iOS/macOS 26.2 AirDrop code behavior, Mac/iPhone directionality, community wording, Retail triage, and escalation.
- No new recipe was created. No duplicate recipe was found or merged.

### Verification Changes

- `隔空投送一直等待或找不到设备` remains `Official`; the verification is stronger because the factual flow is now backed by Apple Support 119857, iPhone User Guide AirDrop guidance, Mac User Guide AirDrop guidance, Personal Safety AirDrop guidance, and Apple continuity troubleshooting guidance around VPN/firewall boundaries.
- Community and Reddit sources were used only for customer wording, recurrence, and prioritizing Mac-specific branches. They were not presented as Apple recommendations.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- The AirDrop article was reorganized into a clearer Apple Support-like flow: direct symptom intro, symptoms, root causes, ordered official steps, clearly labeled unofficial branches, Retail flow, escalation, related problems, and compact metadata.
- Official recommendations are visually and textually separated from community-derived ideas such as restart, firewall review, or security software checks.

### Typography/Layout Improvements

- No typography tokens changed in this run.
- The improved article keeps short paragraphs, numbered official steps, compact source lists, and scannable H3 sub-sections to preserve the current Apple Support-like reading rhythm.

### Blocked Sources

- Direct Xiaohongshu pages were not reliably accessible from this environment. No factual update was based on inaccessible Xiaohongshu content.
- No Apple Support article dedicated specifically to “AirDrop stuck waiting” was found; the canonical recipe synthesizes current Apple AirDrop setup, iPhone/Mac user-guide behavior, and safe continuity-network boundaries.

### Follow-up Opportunities

- Add a separate recipe for large iPhone-to-Mac photo/video migration so customers do not overuse AirDrop for multi-gigabyte transfers.
- Monitor Apple Support 119857 and the iPhone/Mac User Guides for changes to AirDrop code behavior, 30-day known-contact handling, and cellular-data continuation.
- Consider adding a related article for Universal Clipboard / Handoff not working, since the same Wi-Fi, Bluetooth, Apple Account, VPN, and firewall branches recur across Continuity issues.

## Harvest Run - 2026-07-12 17:03 CST

### P0 Feedback Intake

- Checked GitHub issues in `Neverwhateve/apple-cookbook` with labels `P0` and `feedback-intake`.
- No open P0 feedback-intake issues were found, so this run proceeded to normal source harvest.

### Search Queries

- `site:support.apple.com/zh-cn Apple Watch 无法 与 iPhone 连接 或 配对 Apple 支持 108360`
- `site:support.apple.com/zh-cn Apple Watch 与 iPhone 兼容性 118490`
- `site:support.apple.com/zh-cn Apple Watch 更新 软件 配对 需要更新 iPhone`
- `site:discussions.apple.com Apple Watch won't pair with new iPhone update stuck 2026`
- `site:reddit.com/r/AppleWatch Apple Watch won't pair new iPhone update stuck iOS 26 watchOS 26`
- `site:discussions.apple.com Apple Watch unable to pair requires update old watch new iPhone`
- `site:reddit.com/r/applehelp Apple Watch won't connect red iPhone icon`
- `site:xiaohongshu.com Apple Watch 无法 配对 iPhone 卡在 更新`
- `site:xiaohongshu.com Apple Watch 配对失败 新 iPhone 激活锁`
- `site:xiaohongshu.com Apple Watch 红色 iPhone 图标 连接不上`

### Sources Visited

- Apple Support: [如果 Apple Watch 无法与 iPhone 连接或配对](https://support.apple.com/zh-cn/108360)
- Apple Support: [如果你无法将 Apple Watch 与 iPhone 配对](https://support.apple.com/zh-cn/111821)
- Apple Support: [将 Apple Watch 与新 iPhone 配对](https://support.apple.com/zh-cn/104956)
- Apple Support: [取消配对并抹掉 Apple Watch](https://support.apple.com/zh-cn/108372)
- Apple Support: [设置你的 Apple Watch](https://support.apple.com/zh-cn/109015)
- Apple Support: [Apple Watch 和 iPhone 兼容性](https://support.apple.com/zh-cn/118490)
- Apple Support: [更新 Apple Watch](https://support.apple.com/zh-cn/108926)
- Apple Support: [如果在更新 Apple Watch 时显示“无法验证更新”](https://support.apple.com/zh-cn/111816)
- Apple Watch User Guide: [设置 Apple Watch 并与 iPhone 配对](https://support.apple.com/zh-cn/guide/watch/apdde4d6f98e/watchos)
- Apple Watch User Guide: [更新 Apple Watch 软件](https://support.apple.com/zh-cn/guide/watch/apd105341ac3/watchos)
- Apple Support Community: [Apple Watch won't update/pair](https://discussions.apple.com/thread/254433831)
- Apple Support Community: [Why is my Apple Watch app update stuck on verifying?](https://discussions.apple.com/thread/255889406)
- Apple Support Community: [Existing watch won't pair to new phone](https://discussions.apple.com/thread/254645261)
- Apple Support Community: [Can I pair my Apple Watch to a new iPhone without backup?](https://discussions.apple.com/thread/256124607)
- Reddit r/AppleWatch: [WatchOS 26 doesn't pair with iOS 18](https://www.reddit.com/r/AppleWatch/comments/1ll2ylp/watchos_26_doesnt_pair_with_ios_18/)
- Reddit r/AppleWatch: [“iPhone Out of Date” can't pair brand new Apple Watch S9](https://www.reddit.com/r/AppleWatch/comments/1ne2v40/iphone_out_of_date_cant_pair_brand_new_apple/)
- Reddit r/AppleWatch: [Older watch won't sync with iOS 26](https://www.reddit.com/r/AppleWatch/comments/1tr0nix/older_watch_wont_sync_with_ios_26/)

### Evidence Collected

- Apple says disconnected Apple Watch and iPhone can show a red iPhone icon or red X; Apple recommends placing the devices close together, checking Airplane Mode, Wi-Fi, Bluetooth, and restarting both devices before deeper repair paths. Source: [Apple Support 108360](https://support.apple.com/zh-cn/108360).
- Apple says if iPhone says it cannot connect to Apple Watch, or the watch already shows a clock face, users should confirm the watch is not still paired with another iPhone; erasing on the watch without the paired iPhone does not remove Activation Lock. Source: [Apple Support 111821](https://support.apple.com/zh-cn/111821).
- Apple says moving Apple Watch to a new iPhone requires Apple Account password, Apple Watch passcode, Wi-Fi, and at least 50% battery on Apple Watch and new iPhone; iPhone backup includes Apple Watch backup. Source: [Apple Support 104956](https://support.apple.com/zh-cn/104956).
- Apple says unpairing from the Apple Watch App erases Apple Watch, creates a backup, and removes Activation Lock after Apple Account authentication. Source: [Apple Support 108372](https://support.apple.com/zh-cn/108372).
- Apple says setting up Apple Watch can require an iPhone iOS update before continuing. Source: [Apple Support 109015](https://support.apple.com/zh-cn/109015).
- Apple's compatibility table confirms that current Apple Watch models and watchOS versions have specific iPhone and iOS minimums; Series 11, SE 3, and Ultra 3 require iPhone 11 or later with iOS 26 or later. Source: [Apple Support 118490](https://support.apple.com/zh-cn/118490).
- Apple says Apple Watch updates require the iPhone to be updated, Apple Watch battery at least 50%, and Apple Watch connected to its charger; if updating will not start, Apple recommends restarting both devices and deleting the downloaded update file from Apple Watch App storage before trying again. Source: [Apple Support 108926](https://support.apple.com/zh-cn/108926).
- Apple says “Unable to Verify Update” on Apple Watch can require unpairing and updating again; for Beta or developer seed software, Apple instructs users to remove Beta profiles, restart both devices, and check for updates again. Source: [Apple Support 111816](https://support.apple.com/zh-cn/111816).
- Apple Support Community and Reddit repeatedly show pairing complaints that are actually watchOS update loops, “iPhone out of date” version mismatches, old Watch/new iPhone transitions, and Beta/cross-version compatibility confusion. These were used as customer wording and prioritization signals only.

### Customer Wording

- “Apple Watch 配对时一直要求更新。”
- “Apple Watch 更新卡在正在验证。”
- “显示无法验证更新。”
- “新 iPhone 提示 iPhone out of date。”
- “手表已经是新版 watchOS，旧 iOS 手机配不上。”
- “换新手机后旧 Apple Watch 不能同步。”
- “没有旧 iPhone，手表还能不能重新配对？”
- “抹掉 Apple Watch 后会不会还有激活锁？”

### Cross-source Patterns

- Pairing issues often need an early split between ordinary disconnection, new-iPhone transfer, Activation Lock, and watchOS update failure. The article now moves update-loop triage earlier.
- Community threads frequently recommend resets, network resets, or beta downgrade ideas. The recipe keeps Apple-supported update checks, charger/battery requirements, update-file deletion, and official unpair/update paths ahead of those suggestions.
- Version mismatch is a Retail-critical branch: if the watchOS version is newer than the iPhone supports, repeated Bluetooth troubleshooting wastes time. The article now explicitly records iPhone model, iOS version, Apple Watch model, and watchOS version before escalation.
- Xiaohongshu direct pages were not accessible enough to support factual recommendations; Chinese search wording still aligned with “配对失败,” “卡在更新,” and “连接不上.”

### Articles Created, Improved, Merged, or Flagged

- Improved `cookbook/Apple Watch/apple-watch-wont-connect-pair-iphone.md` as the canonical Official Apple Watch pairing and connection recipe.
- Added official watchOS update-failure handling for battery, charger, iPhone update, restart, deleting update files, “无法验证更新,” and Beta/developer seed profile handling.
- Expanded customer wording and Retail flow around old Watch/new iPhone, iPhone out-of-date prompts, cross-version watchOS/iOS mismatch, Activation Lock, and update loops.
- No new recipe was created. No duplicate recipe was found or merged.

### Verification Changes

- `Apple Watch 无法连接或无法与 iPhone 配对` remains `Official`; verification is stronger because update-loop branches are now backed by Apple Support 108926 and 111816 in addition to the existing pairing, unpairing, setup, new-iPhone transfer, and compatibility sources.
- Reddit and Apple Support Community links were used only for customer language and recurrence patterns. No community workaround was presented as Apple official guidance.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- The Apple Watch recipe keeps the Apple Support-inspired structure and now has a clearer fast path: identify the visible state, handle basic reconnect checks, then branch into update, compatibility, new-iPhone transfer, Activation Lock, or cellular-plan decisions.
- Official recommendations remain visually and textually separate from nonofficial community patterns, especially beta downgrade and cross-version troubleshooting claims.

### Typography/Layout Improvements

- No typography tokens changed in this run.
- The article remains narrow, sectioned, and step-led. The new material was added as short symptom bullets, concise cause sections, numbered official steps, and one compact nonofficial note to avoid dense walls of text.

### Blocked Sources

- Direct Xiaohongshu content was not reliably accessible from this environment. No factual update was based on inaccessible Xiaohongshu pages.

### Follow-up Opportunities

- Add a dedicated Apple Watch update article if future feedback focuses on “无法验证更新,” “正在准备,” storage space, or Beta removal without pairing failure.
- Add a separate Apple Watch Activation Lock article if second-hand watch questions increase.
- Monitor Apple Support 118490, 108926, and 111816 for model/version changes and update-flow changes after future iOS/watchOS releases.

## Harvest Run - 2026-07-12 18:03 CST

### P0 Feedback Intake

- Checked GitHub issues in `Neverwhateve/apple-cookbook` with labels `P0` and `feedback-intake`.
- No open P0 feedback-intake issues were found, so this run proceeded to normal source harvest.

### Search Queries

- `site:support.apple.com/zh-cn iPhone 无法充电 Apple 支持`
- `site:support.apple.com/zh-cn iPhone Air iPhone 17 有线充电 电量 几乎耗尽 26.5.1`
- `site:support.apple.com/en-us If your iPhone or iPod touch won't charge Apple Support`
- `site:discussions.apple.com iPhone Air iPhone 17 wired charging nearly drained 26.5.1`
- `site:reddit.com/r/iphone iPhone won't charge iPhone 17 iPhone Air 26.5.1 wired charging`
- `site:reddit.com/r/applehelp iPhone won't charge liquid detected USB-C port debris`
- `site:discussions.apple.com iPhone won't charge liquid detected accessory not supported USB-C port debris`
- `site:xiaohongshu.com iPhone 充不进电 液体检测 接口 充电慢`

### Sources Visited

- Apple Support: [如果 iPhone 或 iPod touch 无法充电](https://support.apple.com/zh-cn/108805)
- Apple Support: [如果 iPhone 上出现液体检测提醒](https://support.apple.com/zh-cn/102643)
- iPhone User Guide: [给 iPhone 电池充电](https://support.apple.com/zh-cn/guide/iphone/iph63eecc618/ios)
- Apple Support: [如果 iPhone 无法开机或黑屏](https://support.apple.com/zh-cn/116940)
- Apple Support: [关于 iOS 26 更新](https://support.apple.com/zh-cn/123075)
- Apple Support: [Apple 安全性发布](https://support.apple.com/zh-cn/100100)
- Apple Support Community: [iPhone 17 Pro won't turn on after battery drained](https://discussions.apple.com/thread/256308911)
- Apple Support Community: [How to resolve 'Liquid Detected in USB-C'](https://discussions.apple.com/thread/256191213)
- Apple Support Community: [How to fix 'Liquid Has Been Detected' and charging issue on iPhone](https://discussions.apple.com/thread/256296619)
- Reddit r/iPhone: [iOS 26.5.1 out](https://www.reddit.com/r/iphone/comments/1ttyzdk/ios_2651_out/)
- Reddit r/iPhone: [iOS 26.5.1 stopped my charging](https://www.reddit.com/r/iphone/comments/1tvcnrt/ios_2651_stopped_my_charging/)
- Reddit r/applehelp: [There is no liquid in my phone and it's saying this](https://www.reddit.com/r/applehelp/comments/1h2bnpr/there_is_no_liquid_in_my_phone_and_its_saying_this/)

### Evidence Collected

- Apple says iPhone charging troubleshooting should start with power source checks, restart, inspection of charging cable and USB adapter for damage, removing debris from the charging port, trying another cable or charger, and making sure iOS is current. Source: [Apple Support 108805](https://support.apple.com/zh-cn/108805).
- Apple says an accessory warning can appear when the iOS device charging port is dirty or damaged, the charging accessory is defective or damaged, or the USB charger is not designed to charge the device. Source: [Apple Support 108805](https://support.apple.com/zh-cn/108805).
- Apple says if a liquid detection alert appears, disconnect the cable, let iPhone and cable dry, tap the iPhone connector-down to remove excess liquid, try again after at least 30 minutes, and allow up to 24 hours for complete drying if the alert returns. Source: [Apple Support 102643](https://support.apple.com/zh-cn/102643).
- Apple specifically says not to use an external heat source, compressed air, cotton swab, paper towel, foreign object, or rice bag to dry iPhone. Source: [Apple Support 102643](https://support.apple.com/zh-cn/102643).
- Apple says low-power wired or wireless chargers may cause slower-than-expected charging and can show “Slow Charger” information in Settings > Battery. Source: [iPhone User Guide](https://support.apple.com/zh-cn/guide/iphone/iph63eecc618/ios).
- Apple says iOS 26.5.1 addressed an issue for a small number of iPhone Air and iPhone 17 models that could prevent wired charging when the battery was nearly drained. Source: [Apple Support 123075](https://support.apple.com/zh-cn/123075).
- Apple Security Releases lists iOS 26.5.1 for iPhone 17 models and iPhone Air, released 2026-06-01, with no published CVE entries. Source: [Apple Support 100100](https://support.apple.com/zh-cn/100100).
- Apple Community and Reddit repeatedly show customer wording around “wired charging not working,” “only wireless charging works,” “liquid detected but phone is dry,” “iPhone 17 battery drained and will not turn on,” and “iOS 26.5.1 charging fix.” These were used as customer language and prioritization signals only.

### Customer Wording

- “iPhone 插线不充电。”
- “无线充可以，有线充没反应。”
- “提示 USB-C 接口检测到液体，但手机没进水。”
- “这个配件可能不受支持。”
- “iPhone 17 没电后插线充不起来。”
- “iPhone Air 电量耗尽后有线充电没反应。”
- “电池里显示慢充。”
- “换了线和充电头还是不行。”

### Cross-source Patterns

- Charging complaints split into several different Retail branches: power source, cable/adapter, dirty or damaged port, liquid detection, slow charging, system-version fix, and black-screen/no-power service escalation.
- iOS 26.5.1 is important but narrow: Apple limits the fix to a small number of iPhone Air and iPhone 17 models when the battery is nearly drained. The new recipe warns not to treat every iPhone charging case as that bug.
- Community advice often recommends toothpicks, compressed air, rice bags, forced cleaning, or repeated emergency override. The recipe rejects those as official guidance because Apple explicitly warns against several of those actions in liquid-detection scenarios.
- Xiaohongshu direct pages were not reliably accessible; Chinese query language still showed the expected wording around “充不进电,” “液体检测,” “接口,” and “充电慢.”

### Articles Created, Improved, Merged, or Flagged

- Created `cookbook/iPhone/iphone-wont-charge-wired-liquid-detected.md` as the canonical Official iPhone charging recipe.
- Improved `cookbook/iPhone/iphone-battery-drains-after-update.md` by replacing the placeholder charging related link with the new canonical charging recipe.
- No duplicate recipe was found or merged.

### Verification Changes

- New recipe `iPhone 无法充电、有线充电没反应或提示液体检测` is `Official` because its primary flow is supported by Apple charging, liquid-detection, iPhone battery charging, black-screen/no-power, iOS 26 update, and Apple security-release documentation.
- Community and Reddit sources were used only for customer wording, recurrence patterns, and risk awareness around unsafe cleaning suggestions.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- The new recipe follows the Apple Support-inspired structure: direct symptom title, short intro, symptoms, root causes, ordered official steps, one focused model/version branch, clearly separated nonofficial notes, Retail flow, escalation, related links, and compact metadata.
- Official Apple recommendations are textually separated from community cleaning and emergency-override suggestions, especially where Apple warns against heat, compressed air, foreign objects, and rice bags.

### Typography/Layout Improvements

- No typography tokens changed in this run.
- The article uses short paragraphs, scannable H2/H3 sections, numbered action steps, compact bullets, and a narrow support-article rhythm consistent with the existing Cookbook style.

### Blocked Sources

- Direct Xiaohongshu content was not reliably accessible from this environment. No factual recommendation was based on inaccessible Xiaohongshu pages.

### Follow-up Opportunities

- Add a separate canonical article for iPhone black screen / cannot power on if future feedback mentions dead devices more than charging accessories.
- Monitor Apple Support 123075 and 100100 for follow-up iOS releases that expand or supersede the iPhone Air / iPhone 17 wired-charging fix.
- Consider adding a repair-intake checklist for liquid exposure, port damage, and backup status before service.
