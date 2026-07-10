# Daily Harvest - 2026-07-11

## Harvest Run - 2026-07-11 09:42:00 CST

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
