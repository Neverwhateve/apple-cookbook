# Daily Harvest - 2026-07-11

## Harvest Run - 2026-07-11 03:08:00 CST

### Search Queries

- `site:support.apple.com/zh-cn Apple 支持 iPhone 无法 更新 iOS 26 2026 故障 排除`
- `site:support.apple.com/en-us Apple Support iOS 26.1 troubleshooting July 2026 iPhone stuck update`
- `site:discussions.apple.com iPhone stuck preparing update iOS 26 2026`
- `site:reddit.com/r/iphone iOS 26 stuck preparing update unable to install update 2026`
- `site:support.apple.com/zh-cn/105090 iPhone 不可用 安全锁定 Apple Vision Pro 2026`
- `site:discussions.apple.com iPhone unavailable Security Lockout forgot passcode 2026 Apple Community`
- `site:reddit.com/r/applehelp "iPhone unavailable" "Security Lockout" forgot passcode 2026`
- `小红书 iPhone 不可用 安全锁定 忘记密码 保留 eSIM`
- `site:support.apple.com/zh-cn 如果忘记 iPhone 密码 电脑 还原 105090 Apple 支持`
- `site:support.apple.com/zh-cn Apple 支持 激活锁 iPhone 抹掉 后 Apple 账户 密码`
- `site:support.apple.com/zh-cn Apple 支持 iPhone eSIM 抹掉 保留 eSIM iOS 17 不可用`
- `site:support.apple.com/zh-cn Apple 支持 备份 iPhone iCloud 电脑 忘记密码`

### Sources Visited

- Apple Support: [如果你看到 iPhone、iPad 或 Apple Vision Pro 不可用信息或安全锁定屏幕](https://support.apple.com/zh-cn/105090)
- Apple Support: [如果你忘记了 iPhone 密码或 iPhone 被停用了](https://support.apple.com/zh-cn/118430)
- Apple Support: [如何解除激活锁](https://support.apple.com/zh-cn/108934)
- Apple Support: [iPhone 和 iPad 的激活锁](https://support.apple.com/zh-cn/108794)
- Apple Support: [如何抹掉 iPhone 或 iPad 上的 eSIM](https://support.apple.com/zh-cn/102421)
- iPhone User Guide: [备份 iPhone](https://support.apple.com/zh-cn/guide/iphone/iph3ecf67d29/ios)
- Apple Support: [从备份恢复 iPhone、iPad 或 iPod touch](https://support.apple.com/zh-cn/118105)
- Apple Support: [如果你无法在 iPhone 或 iPad 上接入无线局域网](https://support.apple.com/zh-cn/111786)
- Apple Support Community: [How to fix 'iPhone Unavailable' error on an iPhone](https://discussions.apple.com/thread/256313485)
- Apple Support Community: [Security Lockout on iPhone](https://discussions.apple.com/thread/253635299)
- Reddit r/applehelp: [iPhone unavailable: How many password attempts do I have left?](https://www.reddit.com/r/applehelp/comments/1qt6bqg/iphone_unavailable_how_many_password_attempts_do/)
- Reddit r/iPhone: [Stuck on Verifying update screen (Upgrading to iOS 26)](https://www.reddit.com/r/iphone/comments/1nj8v4t/stuck_on_verifying_update_screen_upgrading_to/)
- Reddit r/iPhone: [iPhone 17 Pro stuck in software update before setting up](https://www.reddit.com/r/iphone/comments/1nlz3oz/iphone_17_pro_stuck_in_software_update_before/)

### Evidence Collected

- Apple's current unavailable / security lockout article covers iPhone, iPad, and Apple Vision Pro, and says the reset path permanently deletes data and settings before setup and restore. Source: [Apple Support 105090](https://support.apple.com/zh-cn/105090).
- Apple says the iOS 17 or later device-side reset path can appear from the lock screen through **Forgot Passcode?**, then **Start [Device] Reset**, but only when the device has a valid cellular or Wi-Fi connection and Find My was previously enabled. Source: [Apple Support 105090](https://support.apple.com/zh-cn/105090).
- Apple says iOS 17 or later can offer a choice to keep eSIM and erase data, or delete eSIM and erase data; for iOS 16 or earlier eSIM devices, Apple says to contact the carrier before starting and request a QR code to set up eSIM again. Source: [Apple Support 105090](https://support.apple.com/zh-cn/105090).
- Apple's forgotten-passcode article, updated 2026-07-02, now includes a fallback to erase through iCloud.com/find when computer restore and iOS 15.2-or-later device reset are not available. Source: [Apple Support 118430](https://support.apple.com/zh-cn/118430).
- Apple says Activation Lock requires the Apple Account and password used to set up the device, or the device passcode, and that organizations should route managed devices through IT. Source: [Apple Support 108934](https://support.apple.com/zh-cn/108934).
- Apple explains Activation Lock remains tied to the device when Find My is enabled and requires the associated Apple Account password to turn off Find My, erase the device, or reactivate it. Source: [Apple Support 108794](https://support.apple.com/zh-cn/108794).
- Apple says not to erase eSIM during troubleshooting unless the carrier instructs it; deleting eSIM requires contacting the carrier to get a new eSIM. Source: [Apple Support 102421](https://support.apple.com/zh-cn/102421).
- Apple says iCloud backups run automatically when iPhone is connected to power, locked, and on Wi-Fi, and users can manually back up from iCloud settings before problems occur. Source: [iPhone User Guide](https://support.apple.com/zh-cn/guide/iphone/iph3ecf67d29/ios).
- Apple Support Community and Reddit show repeated customer confusion around "Can I keep data?", "How many tries are left?", "Forgot Passcode button missing", "Security Lockout", and "Apple ID password should unlock it." These are customer-language and prioritization signals only.
- Search also surfaced iOS update-stuck threads and Reddit posts. Existing Cookbook coverage does not yet have a dedicated "new iPhone stuck on software update during setup" recipe; official evidence is less consolidated than the passcode/security-lockout evidence, so it was flagged for follow-up rather than created in this run.

### Customer Wording

- “iPhone 显示不可用。”
- “安全锁定，忘记密码按钮不见了。”
- “还剩几次输入机会？”
- “Apple ID 密码知道，为什么不能解锁？”
- “能不能不抹掉资料？”
- “刷机能不能保资料？”
- “抹掉后 eSIM 会不会没？”
- “手机已停用，里面照片还能不能救？”
- “新 iPhone 设置时卡在正在准备更新。”
- “iOS 26 验证更新卡住。”

### Cross-source Patterns

- The strongest repeated pattern is not the technical reset process itself; it is expectation setting. Customers often believe Apple Account password, proof of ownership, Apple Store service, or third-party tools can unlock local encrypted data without the device passcode.
- eSIM is a high-value branch because an erase can turn one problem into a carrier reactivation problem. The recipe now asks about eSIM before erase and separates iOS 17-or-later keep-eSIM behavior from iOS 16-or-earlier carrier QR-code preparation.
- "Forgot Passcode?" missing is a common community complaint. Apple's condition explains the likely split: the device-side reset path depends on network connectivity and previously enabled Find My.
- Activation Lock is a separate post-erase gate, not the same as the forgotten device passcode. The Retail script should make customers prepare Apple Account credentials before erasing.
- iOS setup update-stuck symptoms appear across Apple Community and Reddit, especially during new-phone transfer, but the guidance is still mostly community workaround language. It should not be promoted to Official without a tighter Apple Support source set.

### Articles Created, Improved, Merged, or Flagged

- Created `cookbook/iPhone/iphone-unavailable-security-lockout-forgot-passcode.md` as the canonical Official recipe for iPhone unavailable, security lockout, disabled iPhone, forgotten passcode, eSIM erase decisions, backup boundaries, and Activation Lock after erase.
- Flagged a future missing recipe: "new iPhone stuck preparing/verifying software update during setup." Current evidence is high-frequency community reporting, but the official source chain needs more review before creating a canonical article.
- Reviewed the existing Wi-Fi recipe against Apple Support 111786. It already includes the current VPN/security software and network-specific guidance, so no duplicate or new Wi-Fi article was created.
- No duplicate recipes were found or merged.

### Verification Changes

- New recipe `iPhone 不可用、安全锁定或忘记锁屏密码` is `Official` because its core actions and warnings are supported by Apple Support 105090, 118430, 108934, 108794, 102421, the iPhone User Guide, and Apple restore-from-backup documentation.
- Third-party unlock tools, "unlock without erasing," and hardware-repair-as-password-fix claims remain nonofficial and are explicitly labeled as high-risk or unsupported.
- No existing article verification level changed.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- The new lockout article follows the Apple Support-inspired structure: direct symptom title, short customer-focused intro, symptom language, likely causes, official ordered steps, decision sections, nonofficial cautions, Retail flow, escalation, related links, and compact metadata.
- Official steps and nonofficial workarounds are visually and textually separated so third-party unlock claims do not appear as Apple guidance.

### Typography/Layout Improvements

- No typography tokens changed.
- Article readability was improved through short sections, numbered steps for actions, compact source lists, and clear H2/H3 hierarchy. The existing site typography already uses the Apple-like system font stack, narrow article rhythm, Apple-like link color, and restrained list spacing.

### Blocked Sources

- Direct Xiaohongshu posts were not reliably accessible from this environment. Search snippets and third-party Chinese unlock-tool pages were treated only as signals of customer wording and risky nonofficial advice, not as factual support.
- Reddit and Apple Support Community content was used for symptom frequency and wording only; official recommendations came from Apple Support sources.

### Follow-up Opportunities

- Research "new iPhone stuck on software update / preparing update / verifying update during setup" with official Apple restore/update documentation and community frequency. This may deserve a dedicated setup-transfer article.
- Search for current Apple Support guidance around "iPhone unavailable but Forgot Passcode does not appear" in more languages; the condition may deserve a shorter FAQ section if Apple adds a dedicated support note.
- Review whether the eSIM recipe should cross-link back to the new unavailable/security-lockout article for customers who erase a locked phone and lose cellular service.
- Monitor Apple Support 105090 and 118430 for further wording changes around Apple Vision Pro and iCloud.com/find fallback.

## Harvest Run - 2026-07-11 06:33:00 CST

### Search Queries

- `site:support.apple.com/en-us Apple Support iOS 26.1 troubleshooting July 2026 iPhone Messages AirPods HomeKit`
- `site:support.apple.com/en-us/12 Apple Support iOS 26 iPhone troubleshooting iMessage SIM`
- `site:support.apple.com/zh-cn iOS 26 Apple 支持 无法 激活 iMessage 电话号码 SIM`
- `site:support.apple.com/zh-cn Apple 支持 AirPods Pro 3 无法连接 重置`
- `site:reddit.com/r/AirPods AirPods firmware update not updating 2026`
- `site:reddit.com/r/AirPods AirPods Pro 3 won't connect reset tap case 2026`
- `site:reddit.com/r/iPhone iOS 26 travel eSIM primary SIM disabled after returning home`
- `site:discussions.apple.com AirPods firmware update not updating AirPods 2026`
- `小红书 AirPods 固件 不更新 AirPods Pro 3 8B41`
- `小红书 AirPods Pro 3 固件 0A0 不更新`
- `小红书 AirPods 固件版本 不更新 充电盒 30 分钟`
- `site:xiaohongshu.com AirPods 固件 不更新`

### Sources Visited

- Apple Support: [关于 AirPods 固件更新](https://support.apple.com/zh-cn/106340)
- Apple Support: [About firmware updates for AirPods](https://support.apple.com/en-us/106340)
- Apple Support: [如何重置 AirPods 和 AirPods Pro](https://support.apple.com/zh-cn/118531)
- Apple Support: [如何重新启动或重置 AirPods Max](https://support.apple.com/zh-cn/119838)
- AirPods User Guide: [重新启动、取消配对或还原 AirPods](https://support.apple.com/zh-cn/guide/airpods/iph561965261/web)
- Apple Support Community: [Unable to update firmware on AirPods Pro 3](https://discussions.apple.com/thread/256243599)
- Apple Support Community: [why am I unable to update firmware on my AirPods Max?](https://discussions.apple.com/thread/255016226)
- Apple Support Community: [I can't update my AirPods Pro's firmware](https://discussions.apple.com/thread/253707372)
- Reddit r/AirPods: [Firmware will not update](https://www.reddit.com/r/airpods/comments/1rswmsy/firmware_will_not_update/)
- Reddit r/AirPods Chinese translation result: [AirPods Pro 3无法更新固件](https://www.reddit.com/r/airpods/comments/1ouciuv/air_pods_pro_3_not_updating_firmware/?tl=zh-hans)
- Reddit r/iPhone: [No cellular data on Primary after reverting from travel eSIM?](https://www.reddit.com/r/iphone/comments/1t42f42/no_cellular_data_on_primary_after_reverting_from/)
- Reddit r/iPhone: [Failed eSIM conversion and revert back to physical SIM use](https://www.reddit.com/r/iphone/comments/1tm4isl/failed_esim_conversion_and_revert_back_to/)

### Evidence Collected

- Apple lists current AirPods firmware versions by model. The same version number does not apply to every AirPods model. Source: [Apple Support 106340](https://support.apple.com/zh-cn/106340).
- Apple says users can check AirPods firmware on iPhone or iPad from **Settings > Bluetooth > AirPods info > About**, or on Mac from **System Settings > Bluetooth > AirPods info**. Source: [Apple Support 106340](https://support.apple.com/zh-cn/106340).
- Apple says AirPods firmware updates are delivered automatically while AirPods are charging and in Bluetooth range of an iPhone, iPad, or Mac connected to Wi-Fi. Source: [Apple Support 106340](https://support.apple.com/zh-cn/106340).
- Apple's current AirPods / AirPods Pro update procedure is: update the paired Apple device, turn on Bluetooth, connect AirPods, connect the Apple device to Wi-Fi, connect the charging case to power, put AirPods in the case, close the lid, keep the case closed and nearby, wait at least 30 minutes, reopen the lid, reconnect, and check the firmware version again. Source: [Apple Support 106340](https://support.apple.com/zh-cn/106340).
- Apple's current AirPods Max update procedure uses the right earcup charging cable and the same 30-minute Bluetooth-range waiting model, not a charging case flow. Source: [Apple Support 106340](https://support.apple.com/zh-cn/106340).
- Apple says that if firmware still cannot be updated, users should reset AirPods or AirPods Max and try the firmware update again. Sources: [Apple Support 106340](https://support.apple.com/zh-cn/106340), [Apple Support 118531](https://support.apple.com/zh-cn/118531), [Apple Support 119838](https://support.apple.com/zh-cn/119838).
- Apple says that if the customer has no Apple device nearby, they can make an appointment at an Apple Store or Apple Authorized Service Provider to update firmware. Source: [Apple Support 106340](https://support.apple.com/zh-cn/106340).
- Apple Support Community and Reddit show repeated customer language around "firmware will not update," "force update," "AirPods Pro 3 0A0 / 8A357," "case version," "fake AirPods," and "I tried every method." These are prioritization signals only.
- Reddit iPhone searches surfaced eSIM travel and failed conversion issues, but the current official eSIM articles already cover the strongest supported paths in the existing eSIM recipe. No new eSIM article was created in this run.

### Customer Wording

- “AirPods 固件一直不更新。”
- “AirPods Pro 3 固件显示 0A0 / 8A357。”
- “有没有办法强制更新 AirPods？”
- “放回盒子就断开，怎么更新？”
- “等了 30 分钟还是没变。”
- “AirPods 是不是假的，因为固件不更新？”
- “没有 iPhone，能不能更新 AirPods 固件？”
- “旅行 eSIM 回国后主卡没有 5G。”
- “转换 eSIM 失败后实体 SIM 被标成已转换。”

### Cross-source Patterns

- AirPods firmware complaints are distinct from ordinary Bluetooth pairing failure. Customers are usually trying to obtain a feature, fix a perceived bug, or compare their version with a screenshot from another model.
- The fastest Retail branch is to verify model and current version first. If the version is already current for that model, the real issue is not "firmware won't update."
- Community advice often describes playing audio, leaving the lid open, repeated resets, or diagnosing counterfeit AirPods. Apple now provides a cleaner official flow with the lid closed for at least 30 minutes, then reset-and-retry if needed.
- Counterfeit concerns appear repeatedly in community discussions, but they are not an Apple official conclusion. The Cookbook now treats them as an evidence-gathering and escalation cue, not a recommendation to declare a device fake.
- Current eSIM travel / failed conversion Reddit threads should be monitored, but available official Apple support in this pass did not justify a separate recipe beyond the existing eSIM transfer article.

### Articles Created, Improved, Merged, or Flagged

- Created `cookbook/AirPods/airpods-firmware-wont-update.md` as the canonical Official recipe for AirPods firmware not updating, current version confusion, AirPods Max differences, reset-and-retry, no-Apple-device path, and unsafe third-party firmware tooling.
- Improved `cookbook/AirPods/airpods-wont-connect-pair-reset.md` by adding a related link to the new firmware recipe, keeping pairing/reset and firmware update issues separate.
- No duplicate recipe was found or merged.
- Flagged future monitoring for eSIM travel-return / failed-conversion complaints, but did not create an article because official support evidence was not strong enough for a canonical flow in this run.

### Verification Changes

- New recipe `AirPods 固件无法更新` is `Official` because its core steps are directly supported by Apple Support 106340, 118531, 119838, and the AirPods User Guide.
- No existing article verification level changed.
- Playing audio before waiting, counterfeit inference, repeated community update rituals, and third-party firmware tools remain nonofficial; the article labels them separately and does not present them as Apple guidance.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- The new AirPods firmware article follows the Apple Support-inspired structure: direct symptom title, short intro, symptom wording, likely causes, official ordered steps, clearly separated unofficial methods, Retail troubleshooting flow, escalation, related links, and compact metadata.
- The article separates the customer's actual decision points: "is this version already current," "am I using the right update process," "is this AirPods Max," and "when should I reset or seek service."

### Typography/Layout Improvements

- No typography tokens changed.
- Article readability was improved through short paragraphs, H2 sections with one purpose each, numbered official steps, and a compact source list. No cards, visual noise, or non-Apple-like layout patterns were introduced.

### Blocked Sources

- Direct Xiaohongshu posts were not reliably accessible. Search results surfaced Apple Support, Reddit translations, Sina/IT Home/YouTube-style reposts, and secondary explainers. No factual recommendation was based on inaccessible Xiaohongshu content.
- Third-party Chinese media posts about AirPods firmware versions were not used as factual support because Apple Support 106340 provided the primary version and procedure evidence.

### Follow-up Opportunities

- Continue monitoring AirPods Pro 3 firmware and connectivity threads to see whether "0A0" or case-version mismatch deserves a hardware/service-focused article.
- Search for official Apple updates around AirPods automatic switching after firmware changes; community complaints may justify a separate automatic-switching recipe.
- Review `cookbook/AirPods/airpods-wont-connect-pair-reset.md` in a later run for whether charging/contact symptoms should split into a dedicated "AirPods won't charge" recipe now that firmware and pairing are separate.
- Monitor eSIM travel-return and failed-conversion symptoms for official Apple guidance; current evidence is mostly community experience and carrier-dependent.

## Harvest Run - 2026-07-11 06:10:47 CST

### Search Queries

- `site:support.apple.com/zh-cn iPhone 设置 软件更新 卡住 准备更新 验证更新`
- `site:support.apple.com/zh-cn 如果 iPhone 更新或恢复时出现错误 Apple 支持`
- `site:support.apple.com/zh-cn iPhone 无法更新 iOS 无法安装更新`
- `site:discussions.apple.com iPhone stuck preparing update setup iOS 26`
- `site:reddit.com/r/iphone "stuck" "Preparing Update" "iOS 26" "setup"`
- `site:reddit.com/r/applehelp "new iPhone" "software update" "stuck" "setup"`
- `site:reddit.com/r/iphone "Verifying Update" "iOS 26" "stuck"`
- `小红书 iPhone 新机 设置 软件更新 卡住 准备更新`
- `小红书 iPhone 传输数据 卡在 软件更新 正在准备更新`
- `小红书 iPhone 验证更新 卡住 iOS 26`
- `site:support.apple.com/zh-cn 使用快速开始 将数据传输到新 iPhone Apple 支持`
- `site:support.apple.com/zh-cn 从 iPhone 或 iPad 传输数据到新 iPhone 快速开始`

### Sources Visited

- Apple Support: [如果 iPhone 或 iPad 无法更新](https://support.apple.com/zh-cn/108905)
- Apple Support: [更新你的 iPhone 或 iPad](https://support.apple.com/zh-cn/118575)
- Apple Support: [如果你无法更新或恢复 iPhone 或 iPod touch](https://support.apple.com/zh-cn/118106)
- Apple Support: [如果 iPhone、iPad 或 iPod touch 上出现恢复屏幕](https://support.apple.com/zh-cn/108969)
- Apple Support: [如果你在更新或恢复 iPhone、iPad 或 iPod 时看到一条错误信息](https://support.apple.com/zh-cn/109057)
- Apple Support: [更新或恢复 iPhone、iPad 或 iPod touch 后出现 Apple 标志和一个进度条](https://support.apple.com/zh-cn/102317)
- Apple Support: [使用“访达”更新 iPhone、iPad 或 iPod touch](https://support.apple.com/zh-cn/109046)
- Apple Support: [使用“快速开始”将数据传输到新的 iPhone 或 iPad](https://support.apple.com/zh-cn/102659)
- Apple Support: [将数据从原来的 iOS 或 iPadOS 设备传输到新 iPhone 或 iPad](https://support.apple.com/zh-cn/119967)
- Apple Support: [使用“访达”、Apple 设备 App 或 iTunes 将数据从旧 iOS 设备传输到新 iPhone 或 iPad](https://support.apple.com/zh-cn/120001)
- Apple Support: [如何抹掉 iPhone 或 iPad 上的 eSIM](https://support.apple.com/zh-cn/102421)
- Apple Support Community: [Stuck on preparing iOS 26 update during iPhone setup](https://discussions.apple.com/thread/256189818)
- Apple Support Community: [iPhone stuck on preparing update screen](https://discussions.apple.com/thread/255571796)
- Apple Support Community: [iPhone stuck on "Preparing Update" for hours](https://discussions.apple.com/thread/255531482)
- Reddit r/iPhone: [Stuck on Verifying update screen (Upgrading to IOS26)](https://www.reddit.com/r/iphone/comments/1nj8v4t/stuck_on_verifying_update_screen_upgrading_to/)
- Reddit r/applehelp: [New iPhone 16 Plus stuck in the software update with 0%](https://www.reddit.com/r/applehelp/comments/1kzc9rm/new_iphone_16_plus_stuck_in_the_software_update/)
- Reddit r/iPhone Chinese translation: [新 iPhone 设置过程中卡在 iOS 更新的解决方法](https://www.reddit.com/r/iphone/comments/1c2f2an/solution_for_new_iphone_stuck_updating_ios_during/?tl=zh-hans)

### Evidence Collected

- Apple says unsupported devices cannot install newer software, and compatible devices that cannot update should first address storage, then delete the downloaded update and download it again. Source: [Apple Support 108905](https://support.apple.com/zh-cn/108905).
- Apple says if the update is not visible in storage or the issue returns, users should update with a Mac or iTunes. Source: [Apple Support 108905](https://support.apple.com/zh-cn/108905).
- Apple says users may need recovery mode when the device stays on the Apple logo for minutes with no progress bar, shows the connect-to-computer screen, is not recognized by the computer, or Recovery Assistant keeps failing. Source: [Apple Support 118106](https://support.apple.com/zh-cn/118106).
- Apple says an Apple-logo progress bar after update, restore, or erase can move slowly or appear still; users should wait, keep wireless updates connected to power, and note that an "Updating" message means the update is still happening. Source: [Apple Support 102317](https://support.apple.com/zh-cn/102317).
- Apple says update/restore error triage should include updating the Mac or Apple Devices app/iTunes, connecting directly to the computer USB port, checking the cable, changing USB ports, restarting the computer and device, and checking security software or connection to Apple's update servers. Sources: [Apple Support 109057](https://support.apple.com/zh-cn/109057), [Apple Support 108308](https://support.apple.com/zh-cn/108308).
- Apple says Quick Start requires Wi-Fi and Bluetooth on the old device, Wi-Fi or cellular on the new device, and keeping devices near each other and connected to power until migration completes; duration depends on network conditions and transfer size. Source: [Apple Support 102659](https://support.apple.com/zh-cn/102659).
- Apple says if a new device has already been set up, it must be erased before restoring a backup; erasing removes all data and returns the device to the Hello screen. Source: [Apple Support 120001](https://support.apple.com/zh-cn/120001).
- Apple says not to erase eSIM during troubleshooting unless the carrier instructs it, because deleting an eSIM requires contacting the carrier for a new eSIM. Source: [Apple Support 102421](https://support.apple.com/zh-cn/102421).
- Apple Support Community and Reddit show repeated customer wording around new iPhone setup stuck on software update, preparing update with no skip option, verifying update for an hour, and eSIM already transferred while setup is stuck. These are frequency and language signals only.

### Customer Wording

- “新 iPhone 设置到软件更新就不动了。”
- “设置助理没有跳过更新的按钮。”
- “快速开始传输数据卡在正在准备更新。”
- “iOS 26 正在验证更新一个小时。”
- “进度条一直 0%。”
- “旧手机 eSIM 转过去了，新手机还卡住。”
- “能不能强制重启？”
- “是不是要刷机？会不会丢资料？”

### Cross-source Patterns

- The official Apple support path is fragmented across update, recovery mode, progress bar, computer-update, Quick Start, backup restore, and eSIM articles. A canonical Cookbook recipe is useful because Retail triage must choose the correct branch by screen state.
- Community threads repeatedly describe a setup-assistant loop where the customer cannot reach Settings to delete the update. The common workaround is to set the new device up as new, update iOS, erase the new device, then restart migration. This uses Apple-supported primitives but is not a dedicated Apple recommendation for the symptom, so it was labeled unofficial.
- eSIM is a high-risk branch. Several customer reports mention service moving to the new iPhone before setup completes, so the article now warns not to delete eSIM without a carrier reactivation path.
- “Stuck” can mean normal slow progress, a bad downloaded update, a network/storage problem, a setup migration issue, or a recovery-mode failure. The Retail flow now starts by reading the exact screen instead of jumping straight to force restart.

### Articles Created, Improved, Merged, or Flagged

- Created `cookbook/iPhone/iphone-stuck-preparing-verifying-software-update.md` as the canonical Official recipe for iPhone/iPad stuck on preparing update, verifying update, setup-assistant software update, Apple-logo progress bar, computer update, recovery-mode update, and eSIM precautions.
- Improved `cookbook/iPhone/iphone-battery-drains-after-update.md` by adding a related link to the new update-stuck article.
- Improved `cookbook/iPhone/iphone-unavailable-security-lockout-forgot-passcode.md` by adding a related link to the new update-stuck article for customers moving between restore/update/erase flows.
- No duplicate recipe was found or merged.

### Verification Changes

- New recipe `iPhone 设置或更新时卡在正在准备更新、正在验证更新` is `Official` because the main steps are supported by Apple Support 108905, 118575, 118106, 102317, 108969, 109057, 109046, 102659, 120001, and 102421.
- The "set up as new, update, erase, then migrate again" path is labeled unofficial / likely because it is a recurring Apple Community and Reddit workaround, not a single Apple-published troubleshooting order for this symptom.
- No existing article verification level changed.

### Reading/UI and Typography Improvements

- No shared CSS, layout component, or typography token changed in this run.
- The new update-stuck article follows the Apple Support-inspired reading flow: symptom-focused H1, short intro, customer wording, cause explanation, ordered official troubleshooting, a separate new-iPhone setup branch, clearly labeled unofficial methods, Retail flow, escalation, related links, and compact metadata.
- Official recommendations and community workarounds are textually separated so community setup-loop tactics do not look like Apple guidance.

### Typography/Layout Improvements

- No typography/layout files changed.
- Article readability was improved through short paragraphs, section-specific H2/H3 headings, numbered actions, descriptive Apple Support links, and no card-like or marketing-style formatting.

### Blocked Sources

- Direct Xiaohongshu posts were not reliably accessible. Search results mainly surfaced Reddit translations, older Apple Community Chinese posts, carrier blogs, Zhihu posts, YouTube videos, and third-party repair-tool pages.
- Third-party repair-tool pages and YouTube tutorials were not used as factual support because they often promote nonofficial firmware/repair utilities.

### Follow-up Opportunities

- Monitor whether Apple publishes a dedicated setup-assistant software update support article; if so, replace the community-labeled setup workaround with official wording.
- Research update/restore error codes 9, 75, 4013, and network-server errors as a possible separate advanced recipe.
- Review whether `iphone-unavailable-security-lockout-forgot-passcode.md` should add a deeper recovery-mode cross-link section after more update/restore evidence is collected.

## Harvest Run - 2026-07-11 09:09:41 CST

### Search Queries

- `site:support.apple.com/zh-cn AirPods 无法充电 充电盒 Apple 支持`
- `site:support.apple.com/zh-cn 清洁 AirPods 充电盒 触点 Apple 支持`
- `site:support.apple.com/zh-cn 如何清洁 AirPods 充电盒 Apple 支持 AirPods`
- `site:support.apple.com/zh-cn 清洁 AirPods 充电盒 柔软干燥无绒布`
- `site:discussions.apple.com AirPods one AirPod not charging case light no charge 2026`
- `site:reddit.com/r/airpods AirPods one side not charging case not charging 2026`
- `小红书 AirPods 一只 不充电 充电盒 没反应`
- `小红书 AirPods 充不进电 充电盒 指示灯 不亮`
- `site:xiaohongshu.com AirPods 一只 不充电`
- `site:discussionschinese.apple.com AirPods 一只 不充电`

### Sources Visited

- Apple Support: [如果你的 AirPods 无法充电](https://support.apple.com/zh-cn/102593)
- Apple Support: [为 AirPods 充电](https://support.apple.com/zh-cn/119912)
- Apple Support: [如何清洁 AirPods](https://support.apple.com/zh-cn/102672)
- Apple Support: [如何清洁 AirPods Pro](https://support.apple.com/zh-cn/120409)
- Apple Support: [关于 AirPods Pro、AirPods 3 和 AirPods 4 的抗汗抗水性能](https://support.apple.com/zh-cn/105046)
- Apple Support: [如果左侧或右侧 AirPod 无法正常使用](https://support.apple.com/zh-cn/100494)
- Apple Support: [如何重置 AirPods 和 AirPods Pro](https://support.apple.com/zh-cn/118531)
- Apple Support: [如何重新启动或重置 AirPods Max](https://support.apple.com/zh-cn/119838)
- Apple Support Community: [One AirPod not charging](https://discussions.apple.com/thread/7794211)
- Apple Support Community: [AirPods Case not charging](https://discussions.apple.com/thread/7948985)
- Apple Support Community: [No light from AirPod Pro case neither during charging or when opening it](https://discussions.apple.com/thread/254905911)
- Apple 社区: [AirPods 右耳电用完以后充不进电，连接不上](https://discussionschinese.apple.com/thread/250491235)
- Apple 社区: [AirPods2单侧耳机不能充电](https://discussionschinese.apple.com/thread/250757465)
- Apple 社区: [AirPods Pro 充电仓满电打开仓盖无反应耳机不充电](https://discussionschinese.apple.com/thread/254537361)
- Reddit r/AirPods: [If your AirPods won't charge on one side, it's probably not software](https://www.reddit.com/r/airpods/comments/1mmo0hk/if_your_airpods_wont_charge_on_one_side_its/)
- Reddit r/AirPods: [Charging issues](https://www.reddit.com/r/airpods/comments/1qf52x9/charging_issues/)
- Reddit r/AirPods: [AirPod Pros 3 Case No Longer Charging At All](https://www.reddit.com/r/airpods/comments/1py6vpf/airpod_pros_3_case_no_longer_charging_at_all/)

### Evidence Collected

- Apple says AirPods or AirPods Pro should be placed in the charging case, the lid closed, and the case connected by Lightning or USB-C for at least 15 minutes; AirPods Max should use the included charging cable for at least 5 minutes. Source: [Apple Support 102593](https://support.apple.com/zh-cn/102593).
- Apple says wireless charging cases should be placed with the status light facing up, and if the light does not come on, users should reposition the case or use a compatible cable and USB power adapter. Source: [Apple Support 102593](https://support.apple.com/zh-cn/102593).
- Apple says to check charging cable connections, USB power adapter seating, and a working outlet before escalating charging failures. Source: [Apple Support 102593](https://support.apple.com/zh-cn/102593).
- Apple says AirPods charging status can be checked from iPhone, iPad, Mac, or the charging case, and AirPods Pro 3 users can turn off Optimized Charge Limit to fully charge. Sources: [Apple Support 102593](https://support.apple.com/zh-cn/102593), [Apple Support 119912](https://support.apple.com/zh-cn/119912).
- Apple says AirPods charging case ports can be cleaned by removing debris with a clean, dry, soft-bristled brush; users should not insert objects into the charging port or let liquid enter it. Source: [Apple Support 102672](https://support.apple.com/zh-cn/102672).
- Apple says AirPods Pro charging cases should be cleaned with a soft, dry, lint-free cloth, may be lightly dampened with isopropyl alcohol if needed, and must air dry. Source: [Apple Support 120409](https://support.apple.com/zh-cn/120409).
- Apple says AirPods Pro, AirPods 3, and AirPods 4 sweat/water resistance is not permanent, wet AirPods should be dried with a soft lint-free cloth, and users should wait at least two hours before using them or putting them into the charging case. Source: [Apple Support 105046](https://support.apple.com/zh-cn/105046).
- Apple says if one AirPod is not working, users should put both AirPods into the charging case for 30 seconds, open the case near iPhone or iPad, and test again; debris should lead to cleaning. Source: [Apple Support 100494](https://support.apple.com/zh-cn/100494).
- Apple says AirPods may need to be reset to resolve charging problems and other issues; reset instructions now differ for AirPods 4 / AirPods Pro 3 versus earlier AirPods models. Source: [Apple Support 118531](https://support.apple.com/zh-cn/118531).
- Apple Support Community, Chinese Apple Community, Reddit, and Xiaohongshu-language search results repeatedly show customer wording around one AirPod not charging, case no light, charging pins/contacts, sweat/oxidation, and “works if I reseat it.” These were used as frequency and language signals only.

### Customer Wording

- “AirPods 一只不充电。”
- “右耳放进盒子没反应。”
- “充电盒插线不亮灯。”
- “无线充电放上去没有反应。”
- “要重新放好几次才开始充。”
- “运动出汗以后充不上。”
- “电量一直 0%。”
- “是不是电池坏了？”
- “能不能清理触点？”

### Cross-source Patterns

- The customer symptom is often described as a pairing or firmware problem, but the fastest Retail branch is physical charging: power path, charge status, port debris, moisture, and contact seating.
- Official Apple guidance is split across charging, cleaning, water-resistance, one-side AirPod, and reset articles. A canonical Cookbook article improves the triage order by putting those official steps into one flow.
- Community posts often jump straight to oxidation, charging pins, deep discharge, or replacement. The article keeps contact/cleaning observations as frequency signals while preserving Apple-safe cleaning language and service escalation.
- AirPods Pro 3 adds a specific “Optimized Charge Limit” branch, which can look like a charging failure if the customer expects 100%.
- The previous pairing article already mentioned contact cleaning as unofficial. This run split charging/contact failures into their own canonical article so pairing, firmware, and charging symptoms are easier to route.

### Articles Created, Improved, Merged, or Flagged

- Created `cookbook/AirPods/airpods-wont-charge-case-not-working.md` as the canonical Official recipe for AirPods not charging, one AirPod not charging, charging case no light, wireless charging position, AirPods Max charging, cleaning/drying, reset, and service escalation.
- Improved `cookbook/AirPods/airpods-wont-connect-pair-reset.md` by converting the plain related-problem entry for AirPods charging into a link to the new canonical article.
- Improved `cookbook/AirPods/airpods-firmware-wont-update.md` by converting the plain related-problem entry for AirPods charging into a link to the new canonical article.
- No duplicate recipe was merged; the new article separates charging/contact failures from pairing/reset and firmware update failures.

### Verification Changes

- New recipe `AirPods 无法充电或充电盒没有反应` is `Official` because its core steps are supported by Apple Support 102593, 119912, 102672, 120409, 105046, 100494, 118531, and 119838.
- Community observations about contact seating, oxidation, charging pins, and reseating were labeled as unofficial frequency signals, not Apple official recommendations.
- No existing article verification level changed.

### Reading/UI and Typography Improvements

- No shared CSS, layout component, or typography token changed in this run.
- The new AirPods charging article follows the Apple Support-inspired reading flow: symptom-focused title, concise intro, symptom wording, likely causes, official ordered steps, a single-AirPod branch, clearly labeled nonofficial methods, Retail flow, escalation, related links, and compact metadata.
- The article avoids dense prose and keeps official charging/cleaning instructions visually separate from community contact/oxidation discussion.

### Typography/Layout Improvements

- No typography/layout files changed.
- Article readability was improved through short paragraphs, H2 sections with one purpose each, ordered official steps, and descriptive Apple Support links.

### Blocked Sources

- Direct Xiaohongshu posts were not reliably accessible. Search results surfaced Apple Support, Chinese Apple Community, Reddit translations, YouTube, Zhihu, and repair-shop pages.
- Third-party repair pages about AirPods charging case no-light behavior were not used as factual support because Apple Support provided safer charging, cleaning, and service guidance.

### Follow-up Opportunities

- Search for a dedicated AirPods “only one side has sound” recipe; Apple Support 100494 covers charging/audio/balance and may deserve its own customer-facing article.
- Monitor whether AirPods Pro 3 optimized charging limit causes more “cannot fully charge” complaints, especially in Chinese customer wording.
- Review AirPods pairing article later to remove or shorten remaining contact-cleaning discussion now that a canonical charging article exists.

## Harvest Run - 2026-07-11 15:11:46 CST

### Search Queries

- `site:support.apple.com/en-us Apple Support July 2026 iPhone Apple Watch AirPods troubleshooting`
- `site:support.apple.com/zh-cn Apple 支持 2026 Apple Watch 无法 配对 iPhone iOS 26`
- `site:support.apple.com/zh-cn/108360 Apple Watch 无法 与 iPhone 连接 配对 iOS 26`
- `site:discussions.apple.com Apple Watch won't pair new iPhone iOS 26 watchOS 26 2026`
- `site:reddit.com/r/AppleWatch "won't pair" "iOS 26" "Apple Watch"`
- `site:reddit.com/r/AppleWatch "older watch" "iOS 26" "pair"`
- `site:reddit.com/r/applehelp "Apple Watch" "won't pair" "new iPhone" "iOS 26"`
- `site:xiaohongshu.com Apple Watch 无法 配对 iPhone iOS 26 手表`
- `https://support.apple.com/zh-cn/120000`
- `https://support.apple.com/en-us/120000`

### Sources Visited

- Apple Support: [如果 Apple Watch 无法与 iPhone 连接或配对](https://support.apple.com/zh-cn/108360)
- Apple Support: [如果你无法将 Apple Watch 与 iPhone 配对](https://support.apple.com/zh-cn/111821)
- Apple Support: [将 Apple Watch 与新 iPhone 配对](https://support.apple.com/zh-cn/104956)
- Apple Support: [设置你的 Apple Watch](https://support.apple.com/zh-cn/109015)
- Apple Support: [Apple Watch 和 iPhone 兼容性](https://support.apple.com/zh-cn/118490)
- Apple Support: [更新 Apple Watch](https://support.apple.com/zh-cn/108926)
- Apple Support: [如果你在 iPhone 或 iPad 上看到“SOS”、“无服务”或“正在搜索”](https://support.apple.com/zh-cn/120000)
- Apple Support: [If you see SOS, No Service, or Searching on your iPhone or iPad](https://support.apple.com/en-us/120000)
- Apple Support Community: [Cannot pair Apple Watch Series 3/5](https://discussions.apple.com/thread/256187585)
- Apple Support Community: [unable to update Apple Watch series 8 to WatchOS 26 after updating iPhone 16 to iOS26](https://discussions.apple.com/thread/256138586)
- Reddit r/AppleWatch: [Older watch won't sync with iOS 26](https://www.reddit.com/r/AppleWatch/comments/1tr0nix/older_watch_wont_sync_with_ios_26/)
- Reddit r/AppleWatch: [Apple Watch SE won't pair with new iPhone](https://www.reddit.com/r/AppleWatch/comments/1qz1pqh/apple_watch_se_wont_pair_with_new_iphone_stuck_in/)
- Reddit r/AppleWatch: [Pairing Watch S7 with iPhone 15 Pro Max 18.6](https://www.reddit.com/r/AppleWatch/comments/1qd6b7x/pairing_watch_s7_with_iphone_15_pro_max_186/)

### Evidence Collected

- Apple Support 108360 says Apple Watch disconnection can show a red iPhone icon or red X, and the official first path is to keep Apple Watch and iPhone near each other, check Airplane Mode, Wi-Fi, and Bluetooth, restart both devices, then unpair and pair again if needed.
- Apple Support 111821 says that if iPhone reports it cannot connect to Apple Watch or the watch already shows a clock face, the customer should make sure the watch is not already paired, then use the appropriate unpair, erase, password-reset, or pairing-mode restore path.
- Apple Support 104956 says when moving Apple Watch to a new iPhone, the customer should prepare Apple Account password, Apple Watch passcode, Wi-Fi, sufficient charge, and use the Apple Watch app on the new iPhone; if the new iPhone says "Start Pairing," Apple says to unpair and set up again.
- Apple Support 109015 says Apple Watch Ultra 3, Apple Watch Series 11, and Apple Watch SE 3 require iPhone 11 or later with iOS 26 or later, and that older Apple Watch models can use other iPhone models with earlier operating systems.
- Apple Support 118490 provides the clearer compatibility table by Apple Watch model, iPhone model, iOS range, and watchOS range. This supports making compatibility a first-class branch before repeated resets or hardware assumptions.
- Apple Support 108926 says Apple Watch update troubleshooting includes ensuring the watch is correctly on the charger, restarting Apple Watch and iPhone, retrying, and deleting the update file from Watch app storage if the update still cannot start.
- Apple Support 120000 China was published 2026-07-07 and now includes iOS 18-or-later Apple Support app diagnostics, carrier IMEI registration questions for iPhones purchased in other countries or regions, and carrier settings guidance for new SIM cards.
- Apple Support 120000 US adds an explicit SOS / SOS only explanation: the device is not connected to its own cellular network, but in Australia, Canada, and the United States it can still place emergency calls through other carrier networks.
- Reddit and Apple Support Community repeatedly show customers mixing three separate Apple Watch problems: new-phone transfer, version compatibility, and update-stuck pairing. Community comments were treated as wording and frequency signals, not as official guidance.

### Customer Wording

- “Apple Watch 换新 iPhone 后配不上。”
- “手表要求更新，但一直卡在连接 Apple Watch。”
- “iPhone 说需要更新到 iOS 26 才能配对。”
- “旧款 Apple Watch 升级 iOS 26 后还能不能用？”
- “手表显示红色 iPhone 图标 / 红色 X。”
- “旧手机丢了，Apple Watch 还能转到新手机吗？”
- “iPhone 右上角显示 SOS only。”
- “SOS 是不是还能打紧急电话？”
- “无服务旁边没有提醒，但手机就是没信号。”

### Cross-source Patterns

- Apple Watch pairing failures need a faster fork: connection state, already-paired state, new-iPhone transfer, update failure, activation lock, and compatibility. Treating all of them as "reset and pair again" can waste time or preserve activation-lock problems.
- Compatibility language is especially important with iOS 26 and current Apple Watch models. Customer threads often infer Bluetooth failure when the real blocker is iPhone/iOS/watchOS compatibility.
- "Older watch with newer iPhone" and "newer watchOS with older iPhone" are different situations. The Cookbook now asks Retail specialists to record the exact iPhone model, iOS version, Apple Watch model, and watchOS version before recommending a reset or service.
- SOS / SOS only needs clearer expectation-setting. For customers in Australia, Canada, and the United States, SOS does not mean normal cellular service works; it means emergency calling may still work through another carrier network.
- Xiaohongshu direct access remained unreliable. Search was still useful for Chinese symptom wording, but no factual recommendations were based on inaccessible posts.

### Articles Created, Improved, Merged, or Flagged

- Improved `cookbook/Apple Watch/apple-watch-wont-connect-pair-iphone.md` by adding Apple Support 118490 as an official source, adding compatibility as a likely cause, adding a compatibility-check step before repeated reset attempts, and improving the Retail flow for "requires newer iOS" / incompatible watchOS messages.
- Improved `cookbook/iPhone/iphone-sos-no-service-searching.md` by adding the current US Apple Support SOS-only emergency-calling explanation, updating the article date, adding the English Apple Support 120000 source, and making Retail intake distinguish SOS only from No Service / Searching / No SIM.
- No duplicate recipes were merged in this pass.
- Flagged a future missing or expansion article: Apple Watch cannot update during pairing / "Unable to Verify Update" / "Update iPhone First." Current evidence suggests it may deserve its own canonical update-focused article rather than being buried inside general pairing.

### Verification Changes

- `Apple Watch 无法连接或无法与 iPhone 配对` remains `Official`; compatibility guidance is now backed by Apple Support 118490 in addition to setup and pairing articles.
- `iPhone 显示 SOS、无服务或正在搜索` remains `Official`; the SOS-only emergency-calling caveat is backed by Apple Support 120000 US, while the core Chinese troubleshooting flow remains backed by Apple Support 120000 China.
- No article verification level changed.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- The Apple Watch article was improved for Apple Support-style reading flow by moving compatibility into the cause list and official sequence, reducing the chance that a customer-facing flow jumps straight to destructive reset steps.
- The SOS article now has a more precise first decision point for support staff: SOS / SOS only, No Service, Searching, No SIM, or a disabled cellular line.

### Typography/Layout Improvements

- No typography tokens changed.
- Article readability was improved through shorter, clearer decision branches and numbered steps. No cards, gradients, dense sidebars, or non-Apple-like visual elements were introduced.

### Blocked Sources

- Direct Xiaohongshu posts were not reliably accessible from this environment. No factual claims were based on blocked or snippet-only Xiaohongshu content.
- Some Reddit pages were accessible mainly as search snippets or comment excerpts; they were used only as customer wording and frequency signals.

### Follow-up Opportunities

- Build or split a dedicated Apple Watch update recipe for "无法验证更新," "无法安装更新," "Update iPhone First," and pairing-time update loops using Apple Support 108926 and 111816.
- Revisit Apple Watch compatibility after the next iOS / watchOS release cycle to ensure Series 11, Ultra 3, SE 3, and older-model ranges are still current.
- Monitor Apple Support 120000 China and US for differences around SOS-only wording; the English page currently has clearer emergency-calling language than the Chinese page.
- Search Apple Support Community and Reddit for "No Service alert" and the linked Apple alert page from Support 120000 to see whether a separate cellular alert recipe is warranted.
