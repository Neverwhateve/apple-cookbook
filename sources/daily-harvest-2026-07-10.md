# Daily Harvest - 2026-07-10

## Harvest Run - 2026-07-10 00:00:31 CST

### Search Queries

- `site:support.apple.com/zh-cn Apple 支持 iPhone 2026 7 月 更新 故障 排查`
- `site:support.apple.com/zh-cn iOS 26 Apple 支持 故障 排查 iPhone`
- `site:support.apple.com/zh-cn iPhone Wi-Fi 无互联网连接 路由器 网络设置 Apple 支持`
- `site:support.apple.com/zh-cn Apple 推荐的 Wi-Fi 路由器 设置 iPhone`
- `site:support.apple.com/zh-cn 专用 Wi-Fi 地址 iPhone Apple 支持`
- `site:support.apple.com/zh-cn iPhone 无法加入网络 Wi-Fi Apple 支持`
- `site:reddit.com/r/iphone "Wi-Fi" "No Internet Connection" iPhone 2026`
- `site:reddit.com/r/applehelp iPhone "Unable to Join Network" "Wi-Fi" 2026`
- `site:discussions.apple.com/thread iPhone "No Internet Connection" Wi-Fi 2026`
- `site:discussions.apple.com/thread iPhone "Unable to Join Network" "Wi-Fi" 2026`
- `site:xiaohongshu.com iPhone WiFi 无互联网连接 无法加入网络 苹果`
- `"小红书" "iPhone" "WiFi" "无互联网连接"`
- `"小红书" "iPhone" "无法加入网络" "无线局域网"`

### Sources Visited

- Apple Support: [如果你无法在 iPhone 或 iPad 上接入无线局域网](https://support.apple.com/zh-cn/111786)
- Apple Support: [无线局域网路由器和接入点的推荐设置](https://support.apple.com/zh-cn/102766)
- Apple Support: [在 Apple 设备上使用私有无线局域网地址](https://support.apple.com/zh-cn/102509)
- Apple Support: [在 Apple 设备上使用 Wi-Fi 6E](https://support.apple.com/zh-cn/102285)
- Apple Support: [在 iPhone 或 iPad 上使用受限无线局域网](https://support.apple.com/zh-cn/102554)
- Apple Support: [忽略无线局域网或防止设备自动加入无线局域网](https://support.apple.com/zh-cn/102480)
- Apple Support: [在 iPhone 或 iPad 上连接到无线局域网](https://support.apple.com/zh-cn/111107)
- Apple Support Community: [iPhone 12 Pro can't connect to Internet on iOS 26.5](https://discussions.apple.com/thread/256303742)
- Apple 支持社区中文: [ios18.2.1 下 Wi-Fi 网络无法连接 apple 服务](https://discussionschinese.apple.com/thread/255937775)
- Reddit r/iPhone: [WiFi connectivity issues since the latest IOS version 26.5?](https://www.reddit.com/r/iphone/comments/1to6ucp/wifi_connectivity_issues_since_the_latest_ios/)
- Search result snippets from Xiaohongshu/Douyin-style Chinese symptom searches; direct Xiaohongshu posts were not reliably accessible.

### Evidence Collected

- Apple says iPhone/iPad Wi-Fi troubleshooting should start with Settings > Wi-Fi, joining the network, confirming the blue checkmark, turning off Airplane Mode, turning off Wi-Fi Assist, restarting if Wi-Fi settings are greyed out, and checking router/network settings when "No Internet Connection" remains. Source: [Apple Support 111786](https://support.apple.com/zh-cn/111786).
- Apple says VPN or security software should be uninstalled, the device restarted, and the Wi-Fi connection retested; if that solves the issue, contact the VPN manager or security software vendor. Source: [Apple Support 111786](https://support.apple.com/zh-cn/111786).
- Apple says router validation should include checking whether other devices can use the same Wi-Fi, updating router firmware, confirming signal range, trying another frequency, and restarting the router and modem. Source: [Apple Support 111786](https://support.apple.com/zh-cn/111786).
- Apple says Reset Network Settings removes Wi-Fi networks and passwords, cellular settings, VPN settings, and APN settings, and should be used only after other solutions fail; managed school or business networks should involve IT first. Source: [Apple Support 111786](https://support.apple.com/zh-cn/111786).
- Apple's router recommendations include WPA3 Personal or WPA2/WPA3 Transitional, a single unique SSID across all bands, hidden networks disabled, MAC filtering disabled, firmware updates, automatic channels, 20 MHz on 2.4 GHz, DHCP enabled when the router is the only DHCP server, one main NAT device, WMM enabled, and Location Services enabled for networking. Source: [Apple Support 102766](https://support.apple.com/zh-cn/102766).
- Apple says iOS 18/iPadOS 18 can set Private Wi-Fi Address to Off, Fixed, or Rotating, and that forgetting a network or resetting network settings can change the private address used on next join. Source: [Apple Support 102509](https://support.apple.com/zh-cn/102509).
- Apple says if a compatible Wi-Fi 6E network causes issues, users can turn off Wi-Fi 6E mode for that network only. Source: [Apple Support 102285](https://support.apple.com/zh-cn/102285).
- Apple says captive networks can fail to auto-join if Auto-Join is off, and turning off Auto-Login can force the welcome/login screen next time. Source: [Apple Support 102554](https://support.apple.com/zh-cn/102554).
- Apple Community and Reddit show recurring customer language around "No Internet Connection" after updates, Wi-Fi connected but no internet while other devices work, and confusion between router/ISP issues, DHCP/IP assignment, VPN/security software, and Apple-service-only failures. These are community signals, not official Apple conclusions.
- Xiaohongshu direct searches were not reliably accessible. Chinese snippets and adjacent Douyin-style results showed repeated wording around "iPhone 连上 Wi-Fi 显示无互联网连接" and "无法加入网络"; no Xiaohongshu workaround was added as authoritative guidance.

### Customer Wording

- “Wi-Fi 旁边有蓝色勾，但下面显示无互联网连接。”
- “家里其他设备都能上网，只有 iPhone 不行。”
- “输入密码后提示无法加入网络。”
- “更新后连上 Wi-Fi 也打不开 App Store / Apple Music。”
- “无线局域网按钮变灰。”
- “同一个路由器下，iPad 能用，iPhone 不能用。”
- “Wi-Fi 6E 网络连接不稳定。”

### Cross-source Patterns

- Customers often treat "Wi-Fi connected but no internet" as an iPhone hardware problem, but Apple’s fastest order first separates device-wide Wi-Fi failure from one-network, router, ISP, VPN/security software, captive network, and Wi-Fi 6E compatibility cases.
- Community threads frequently suggest changing DNS, resetting network settings, or changing system time. Apple’s official guidance puts VPN/security software and router/network checks earlier, and treats Reset Network Settings as a late step.
- Chinese customer wording often names specific apps such as App Store, Apple Music, 小红书, 微信, or 抖音. The recipe now asks whether all internet fails or only Apple/app-specific services fail before escalating.
- Router-side recommendations are high Retail value because they explain why the same device can work on cellular or another Wi-Fi but fail on a specific home/office network.

### Articles Created, Improved, Merged, or Flagged

- Created `cookbook/Networking/iphone-ipad-wifi-no-internet-unable-to-join.md` as a canonical Official recipe for iPhone/iPad Wi-Fi no internet, unable to join network, VPN/security software interference, router settings, private Wi-Fi address, captive networks, and Wi-Fi 6E.
- Updated `cookbook/iPhone/iphone-sos-no-service-searching.md` with a related link to the Wi-Fi no internet recipe because customers often mix "no internet" with cellular SOS/no service symptoms.
- No duplicate Wi-Fi recipe existed, so no merge was required.
- Existing dirty July 9 eSIM harvest edits were preserved.

### Verification Changes

- New recipe `iPhone 或 iPad 无法连接 Wi-Fi 或显示无互联网连接` is `Official` because the primary troubleshooting order is supported by Apple Support 111786, 102766, 102509, 102285, 102554, 102480, and 111107.
- Manual DNS changes are labeled `未知` and unofficial because they appeared in community/social search patterns but were not part of Apple’s iPhone/iPad Wi-Fi official first-line troubleshooting article.
- Recording IP/DHCP information before escalation is labeled `较可能` because it aligns with Apple’s network-scope checks and Apple Community explanations, but the exact DHCP diagnostic framing is community guidance rather than an Apple step-by-step recommendation.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- The new Wi-Fi recipe follows the Apple Support-inspired reading flow: symptom-first title, short intro, clean official ordered steps, separate router branch, clearly labeled unofficial section, Retail flow, escalation criteria, related links, tags, and compact metadata.

### Typography/Layout Improvements

- No typography tokens were changed. The existing global article CSS already uses an Apple-like system font stack, 17px desktop article body, narrow article body styling, Apple-blue links, restrained headings, quiet dividers, and mobile-responsive type.

### Blocked Sources

- Xiaohongshu searches did not return reliably viewable primary posts. Search snippets were used only to collect customer wording patterns; no factual recommendation was based on inaccessible Xiaohongshu content.

### Follow-up Opportunities

- Build a separate "Apple 服务在 Wi-Fi 下打不开" recipe if future Apple Community/Xiaohongshu evidence keeps separating Apple-service-only failures from full internet failure.
- Add a HomeKit / Apple TV network recipe using Apple’s current "网络问题 / 无互联网连接" home hub guidance.
- Review the existing AirDrop article against Apple’s router Location Services and network settings guidance because Wi-Fi/Bluetooth routing overlaps with AirDrop discovery failures.

## Harvest Run - 2026-07-10 03:00:34 CST

### Search Queries

- `site:support.apple.com/zh-cn HomeKit 家庭 App 无响应 配件 无响应 Apple 支持`
- `site:support.apple.com/zh-cn HomePod 无响应 家庭 中枢 Apple 支持`
- `site:support.apple.com/zh-cn "家庭" "无响应" "Apple 支持" "配件"`
- `site:support.apple.com/zh-cn AirDrop 隔空投送 找不到 等待 Apple 支持 2026`
- `site:reddit.com/r/HomeKit Home app accessories not responding HomeKit Matter Thread 2026`
- `site:reddit.com/r/HomeKit "No Response" "Home app" HomeKit "Thread"`
- `site:discussions.apple.com/thread HomeKit accessories not responding Home app Matter Thread`
- `site:discussionschinese.apple.com 家庭 App 配件 无响应 HomeKit Matter`
- `小红书 HomeKit 无响应 家庭 App 配件 无响应`
- `小红书 Apple 家庭 配件 无响应 HomePod Apple TV 中枢`
- `小红书 Matter 配件 无法添加 家庭 App iPhone 2.4G`
- `小红书 HomeKit Thread 无响应 HomePod mini`

### Sources Visited

- Apple Support: [如果 HomeKit 或 Matter 配件在“家庭”App 中没有响应](https://support.apple.com/zh-cn/102056)
- Apple Support: [将 HomePod、HomePod mini 或 Apple TV 设置为家居中枢](https://support.apple.com/zh-cn/102557)
- Apple Support: [如果无法将智能家居配件添加到“家庭”App 中](https://support.apple.com/zh-cn/126198)
- Apple Support: [如果 HomePod 或 HomePod mini 没有响应](https://support.apple.com/zh-cn/105031)
- Apple Support: [在 iPhone 和 iPad 上隔空投送的使用方法](https://support.apple.com/zh-cn/119857)
- Apple Support Guide: [使用隔空投送向附近 Apple 设备发送项目](https://support.apple.com/zh-cn/guide/iphone/iphcd8b9f0af/ios)
- Reddit r/HomeKit: [All my hue devices suddenly stopped responding overnight](https://www.reddit.com/r/HomeKit/comments/1rb4r2i/all_my_hue_devices_suddenly_stopped_responding/)
- Reddit r/HomeKit: [All Devices Show "No Response"](https://www.reddit.com/r/HomeKit/comments/191sioc/all_devices_show_no_response/)
- Apple Support Community: [Thread devices show no response](https://discussions.apple.com/thread/254933864)
- Apple 支持社区中文: [Homekit 提示我升级新的底层架构后，设备全部变得不可用](https://discussionschinese.apple.com/thread/255057541)
- Apple 支持社区中文: [homekit 家居中枢未响应 HOMEPOD MINI 无线 / APPLE TV 有线](https://discussionschinese.apple.com/thread/255013516)
- Search result snippets from Xiaohongshu-style Chinese symptom searches; direct Xiaohongshu posts were not reliably accessible.

### Evidence Collected

- Apple separates HomeKit/Matter "无响应" troubleshooting by scope: one manufacturer's accessories versus multiple manufacturers' accessories. Source: [Apple Support 102056](https://support.apple.com/zh-cn/102056).
- For same-manufacturer failures, Apple says to turn on Bluetooth, restart the unresponsive accessories, check the manufacturer app and firmware, restart third-party bridges and all home hubs, power-cycle third-party Thread accessories for 5 minutes, wait 10 minutes for Thread to stabilize, and remove/re-add accessories only after earlier steps. Source: [Apple Support 102056](https://support.apple.com/zh-cn/102056).
- For multi-manufacturer failures, Apple says to update iPhone/iPad/Mac software, close and reopen Home, confirm the control device is on the same Wi-Fi as the accessories, turn on Bluetooth, restart accessories, check manufacturer firmware, power-cycle Thread accessories, then restart modem/router, bridges, home hubs, accessories, and the control device. Source: [Apple Support 102056](https://support.apple.com/zh-cn/102056).
- Apple says VPN and third-party security software should be checked as potential network connection causes before escalating persistent Home app no-response issues. Source: [Apple Support 102056](https://support.apple.com/zh-cn/102056).
- Apple says HomePod/HomePod mini automatically become home hubs after setup, Apple TV can become a home hub when added to a room in Home, and the Home app can show active home hubs and allow manual preferred home hub selection. Source: [Apple Support 102557](https://support.apple.com/zh-cn/102557).
- Apple says a nonworking home hub should be checked for owner permissions, Apple TV default user, current software, restart state, staying at home, home Wi-Fi, iCloud Keychain, and two-factor authentication. Source: [Apple Support 102557](https://support.apple.com/zh-cn/102557).
- Apple says adding accessories requires iPhone or iPad, current software, Bluetooth, manufacturer requirements/firmware, compatible Apple Home/HomeKit/Matter accessory support, and iPhone/iPad, existing accessories, and home hubs on the same Wi-Fi. Source: [Apple Support 126198](https://support.apple.com/zh-cn/126198).
- Apple says a "网络不兼容" accessory alert can mean the iPhone/iPad must be connected to a Wi-Fi network supporting 2.4 GHz because some accessories do not support 5 GHz. Source: [Apple Support 126198](https://support.apple.com/zh-cn/126198).
- Apple says iOS 26.2/iPadOS 26.2/macOS 26.2 or later can require an AirDrop code when someone not in Contacts tries to send an item, and that the code path can allow sharing for 30 days unless the person is removed from "其他已知联系人". Sources: [Apple Support 119857](https://support.apple.com/zh-cn/119857), [iPhone User Guide AirDrop](https://support.apple.com/zh-cn/guide/iphone/iphcd8b9f0af/ios).
- Reddit and Apple Community repeatedly show customer language around "No Response", all accessories failing after updates, Thread devices dropping, Home app failing while manufacturer apps still work, and restarting HomePods/Apple TVs/bridges/routers. These are community signals, not official Apple recommendations.

### Customer Wording

- “家庭 App 里灯全都显示无响应。”
- “厂商 App 能控制，HomeKit 里不行。”
- “更新后所有 Matter 配件无响应。”
- “HomePod 可以播音乐，但不能控制灯。”
- “家居中枢未响应，出门以后控制不了。”
- “Thread 设备正在更新/无响应来回跳。”
- “添加 Matter 配件提示网络不兼容。”
- “隔空投送突然让我输入代码。”

### Cross-source Patterns

- Home app "No Response" is frequently misread as an Apple device hardware issue. Apple’s official structure is scope-based: one manufacturer points toward that accessory family, firmware, bridge, or Thread path; multiple manufacturers points toward the control device, Wi-Fi, home hubs, router, VPN/security software, and broader Home sync path.
- Community advice often jumps to resetting the whole home, resetting all accessories, DHCP reservations, or router segmentation. The new recipe keeps those network-heavy steps unofficial and pushes lower-risk official checks first.
- Thread/Matter confusion is high Retail value because customers often see intermittent "正在更新" or "无响应" and repeatedly delete/re-add accessories before letting the Thread network stabilize.
- AirDrop search showed Apple’s May 2026 guidance now includes AirDrop codes for non-contacts on iOS/iPadOS/macOS 26.2 or later, so the existing AirDrop recipe needed an official update to avoid treating the code prompt as a failure.

### Articles Created, Improved, Merged, or Flagged

- Created `cookbook/HomePod/homekit-matter-accessories-no-response.md` as a canonical Official recipe for HomeKit/Matter accessories showing "无响应", including scope triage, Thread wait timing, home hub checks, router/VPN/security software checks, manufacturer escalation, and clearly labeled unofficial network/router workarounds.
- Improved `cookbook/Continuity/airdrop-keeps-waiting.md` with Apple’s current AirDrop-code behavior for non-contacts on iOS 26.2, iPadOS 26.2, and macOS 26.2 or later, plus a new customer wording example and Retail flow note.
- No duplicate HomeKit/Matter recipe existed, so no merge was required.

### Verification Changes

- New recipe `家庭 App 中 HomeKit 或 Matter 配件显示无响应` is `Official` because the primary troubleshooting order is supported by Apple Support 102056, 102557, 126198, and 105031.
- AirDrop article remains `Official`; its new code guidance is supported by Apple Support 119857 and the iPhone User Guide AirDrop page.
- DHCP reservation and router advanced setting changes were recorded as `未知` and unofficial because they appear in community patterns but are not Apple’s official HomeKit/Matter first-line recommendation.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- The new HomeKit/Matter recipe follows the Apple Support-inspired flow: symptom-first title, short intro, scan-friendly symptoms, official ordered steps, separate unofficial section, Retail decision flow, escalation split between Apple and manufacturer, related links, tags, and compact metadata.
- The AirDrop article was updated in place rather than duplicated, preserving its clean Support-style structure.

### Typography/Layout Improvements

- No typography tokens were changed. Article readability was improved through short paragraphs, concise numbered steps, restrained headings, and avoiding dense community workaround text.

### Blocked Sources

- Xiaohongshu direct posts were not reliably accessible from search results. Chinese search snippets and adjacent repost/translation results were used only for customer wording; no factual recommendation was based on inaccessible Xiaohongshu content.

### Follow-up Opportunities

- Build a dedicated `HomePod 没有响应` recipe using Apple Support 105031 and 108389, separate from third-party HomeKit/Matter accessory failures.
- Build a `Matter 配件无法添加到家庭 App` recipe using Apple Support 126198 if future searches show recurring "无法添加到家庭" and "网络不兼容" customer wording.
- Review existing Wi-Fi and AirDrop recipes for shared router/VPN/security software language so the Cookbook uses one consistent escalation vocabulary across network-related issues.

## Harvest Run - 2026-07-10 09:03:20 CST

### Search Queries

- `site:support.apple.com/zh-cn Apple 支持 2026 iOS 26.3 故障 排查 iPhone`
- `site:support.apple.com/zh-cn Apple 支持 2026 "如果" "iPhone" "无法"`
- `site:support.apple.com/zh-cn iMessage 无法发送 接收 信息 Apple 支持`
- `site:support.apple.com/zh-cn iMessage FaceTime 等待激活 Apple 支持`
- `site:support.apple.com/zh-cn 取消注册 iMessage Apple 支持`
- `site:support.apple.com/zh-cn RCS 信息 iPhone Apple 支持`
- `site:support.apple.com/zh-cn 信息 蓝色 绿色 气泡 RCS 短信 Apple 支持`
- `site:discussions.apple.com/thread iMessage not sending receiving messages iPhone 2026`
- `site:discussions.apple.com/thread iMessage waiting for activation iPhone 2026`
- `site:discussionschinese.apple.com iMessage 无法发送 接收 信息 激活`
- `site:reddit.com/r/iphone iMessage not sending receiving messages waiting for activation 2026`
- `site:reddit.com/r/iphone RCS won't activate iPhone`
- `小红书 iMessage 等待激活 信息发不出去 绿色气泡`
- `小红书 iPhone RCS 激活不了 短信 收不到`

### Sources Visited

- Apple Support: [如果你无法在 iPhone 或 iPad 上发送或接收信息](https://support.apple.com/zh-cn/118433)
- Apple Support: [如果你无法在 iPhone 上打开或登录 iMessage 信息或 FaceTime 通话](https://support.apple.com/zh-cn/119859)
- Apple Support: [如果 iPhone 上的信息显示为绿色](https://support.apple.com/zh-cn/105087)
- Apple Support: [iMessage 信息、RCS 和短信/彩信有什么区别？](https://support.apple.com/zh-cn/104972)
- Apple Support: [在“信息”或 FaceTime 通话中添加或移除你的电话号码](https://support.apple.com/zh-cn/108758)
- Apple Support: [在 iPhone 上或在线注销 iMessage 信息](https://support.apple.com/zh-cn/102455)
- Apple Support Guide: [在 iPhone 上设置信息](https://support.apple.com/zh-cn/guide/iphone/iph3d039b67/ios)
- Apple Support Community: [iMessage not receiving messages on iPhone](https://discussions.apple.com/thread/255954997)
- Apple Support Community: [iMessage / Messages setup and activation search result patterns](https://discussions.apple.com/)
- Apple 支持社区中文: [iMessage 激活与收发异常搜索结果](https://discussionschinese.apple.com/)
- Reddit r/iPhone: [Got new phones for me and my wife. iMessage isn't working only between us?](https://www.reddit.com/r/iphone/comments/1swc6ny/got_new_phones_for_me_and_my_wife_imessage_isnt/)
- Reddit r/iPhone: [RCS Messaging won't activate on my iPhone what is going on?](https://www.reddit.com/r/iphone/comments/1tes8ma/rcs_messaging_wont_activate_on_my_iphone_what_is/)
- Reddit r/iPhone: [RCS Messaging stuck on Waiting for Activation after upgrade](https://www.reddit.com/r/iphone/comments/1pbvvbf/rcs_messaging_stuck_on_waiting_for_activation/)
- Search result snippets from Xiaohongshu-style Chinese symptom searches; direct Xiaohongshu posts were not reliably accessible.

### Evidence Collected

- Apple’s Messages article, published 2026-06-23, says new-device Messages problems can appear as separate threads or green bubbles, and the official fix path is update iOS/iPadOS if needed, confirm the cellular number is enabled, toggle iMessage, then select the desired phone number in Send & Receive. Source: [Apple Support 118433](https://support.apple.com/zh-cn/118433).
- Apple says a red exclamation mark / "尚未送达" should start with network checking, retry, then "用短信发送"; iMessage uses Wi-Fi or cellular data and blue bubbles, while other text messages use RCS/SMS/MMS and require a carrier texting plan. Source: [Apple Support 118433](https://support.apple.com/zh-cn/118433).
- Apple says if Messages arrive on one device but not another, check whether iMessage is using the Apple Account email instead of the phone number under Settings > Apps > Messages > Send & Receive. Source: [Apple Support 118433](https://support.apple.com/zh-cn/118433).
- Apple says SMS/MMS/RCS failures should be escalated to the wireless carrier, while persistent iMessage failures after Apple steps should go to Apple Support. Source: [Apple Support 118433](https://support.apple.com/zh-cn/118433).
- Apple’s iMessage/FaceTime activation article says activation requires cellular data or Wi-Fi, correct date/time zone, and current iOS; iPhone phone-number activation may use carrier SMS and can take up to 24 hours for carrier verification. Source: [Apple Support 119859](https://support.apple.com/zh-cn/119859).
- Apple says if a new iPhone running iOS 26 is set up before iMessage or eSIM activation, iMessage may not auto-activate after eSIM setup; messages may show "尚未送达", fall back to green SMS/RCS, or send from email instead of the phone number. Source: [Apple Support 119859](https://support.apple.com/zh-cn/119859).
- Apple says green bubbles mean RCS or SMS/MMS rather than iMessage, and common causes include non-Apple recipient device, iMessage disabled on either side, temporary iMessage unavailability, or new-device Messages settings needing an update. Source: [Apple Support 105087](https://support.apple.com/zh-cn/105087).
- Apple says RCS requires iOS 18 and a carrier texting plan that supports iPhone RCS; RCS activation can be delayed by several hours. Apple also says end-to-end encrypted RCS requires iOS 26.5 and carrier support. Source: [Apple Support 104972](https://support.apple.com/zh-cn/104972).
- Apple says using an iPhone phone number with Messages/FaceTime on Mac or iPad requires an active SIM or eSIM associated with that number, and the number plus Apple Account should be selected under Send & Receive. Source: [Apple Support 108758](https://support.apple.com/zh-cn/108758).
- Apple says customers who switched to a non-Apple phone and cannot receive RCS/SMS/MMS may need to deregister iMessage, either on the iPhone with cellular data or through Apple’s online deregistration tool. Source: [Apple Support 102455](https://support.apple.com/zh-cn/102455).
- Reddit and Apple Community signals repeatedly mention "new phones", "switched carriers", "iMessage isn't working", "RCS won't activate", "waiting for activation", and "shortcode / 2FA messages not coming through". These are customer wording and prioritization signals, not official recommendations.

### Customer Wording

- “iMessage 一直正在等待激活。”
- “蓝色气泡突然变绿色。”
- “换新机以后信息只从邮箱发出，不显示手机号。”
- “发出去显示尚未送达。”
- “别人能收到我的短信，但我收不到验证码。”
- “RCS 一直激活不了。”
- “换运营商以后 iMessage 不能用手机号。”
- “换到安卓后收不到 iPhone 朋友发来的短信。”

### Cross-source Patterns

- Many customers describe "green bubbles" as a bug, but Apple’s current guidance treats green bubbles as a symptom that must be split into RCS/SMS/MMS fallback, recipient device type, iMessage disabled, temporary iMessage unavailability, or new-device Send & Receive setup.
- New-device and carrier-switch cases overlap heavily with eSIM/SIM activation. Apple’s December 2025 iMessage/FaceTime article explicitly calls out iOS 26 setup where eSIM is completed later and iMessage does not auto-activate.
- Community threads often jump to resetting network settings, deleting eSIM, or asking the carrier to re-provision. The new recipe keeps carrier refresh as an unofficial but plausible later step and makes Apple’s official checks first.
- RCS confusion is now high Retail value because Apple’s RCS support depends on iOS version, carrier support, activation delay, and encryption support; it should not be mixed with iMessage-only failures.

### Articles Created, Improved, Merged, or Flagged

- Improved existing canonical recipe `cookbook/iPhone/iphone-imessage-messages-not-sending-green-waiting-activation.md` with stronger Apple-official handling for red exclamation / "尚未送达", clearer Retail triage before resetting network settings, and added shortcode/verification-code customer wording.
- Confirmed existing related links from eSIM, invalid SIM, and SOS/no-service recipes already point to the Messages recipe, so no duplicate link work was needed.
- No duplicate Messages/iMessage recipe existed, so no merge was required.

### Verification Changes

- Existing recipe `iPhone 无法发送或接收信息，iMessage 变绿色或等待激活` remains `Official` because its primary troubleshooting order is supported by Apple Support 118433, 119859, 105087, 104972, 108758, 102455, and the iPhone User Guide.
- Carrier refresh/re-provisioning is labeled `较可能` and unofficial because Apple tells users to contact the carrier for SMS/MMS/RCS and phone-number verification issues, while the exact "refresh" operation appears mainly in community patterns.
- Reset Network Settings remains `较可能` / late-stage unofficial because it appears in community discussions but is not Apple’s current first-line Messages/iMessage guidance.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- The Messages article continues to follow the Apple Support-inspired reading flow: symptom-first title, short intro, symptom bullets, official ordered steps, separate RCS/SMS/MMS branch, clearly labeled unofficial section, Retail flow, escalation split by Apple vs carrier, related links, tags, and compact metadata.

### Typography/Layout Improvements

- No typography tokens were changed. The article uses short sections, concise numbered steps, Apple-like link text, and whitespace-based separation rather than cards or dense community-workaround blocks.

### Blocked Sources

- Xiaohongshu direct posts were not reliably accessible. Search snippets were used only to collect Chinese customer wording; no factual recommendation was based on inaccessible Xiaohongshu content.

### Verification Run

- `PATH="/Users/calvinchen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm lint` passed.
- `PATH="/Users/calvinchen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm build` passed and generated 86 static pages.
- Initial `pnpm lint` and `pnpm build` attempts failed before project execution because the default shell PATH could not find `node`; rerunning with the bundled Node path resolved it.

### Follow-up Opportunities

- Build a small carrier/RCS support reference note if future runs find repeated "RCS waiting for activation" cases by carrier.
- Review Family Sharing and Apple Account recipes for the new Settings > Apps wording so navigation stays current with iOS 26 support articles.
- Consider a separate `换到安卓后收不到短信` recipe only if deregister-iMessage searches keep showing strong standalone demand.

## Harvest Run - 2026-07-10 06:03:00 CST

### Search Queries

- `site:support.apple.com/zh-cn HomePod 没有响应 108389 105031 Apple 支持`
- `site:support.apple.com/zh-cn HomePod 无法连接 Wi-Fi 感叹号 Apple 支持`
- `site:support.apple.com/zh-cn Matter 配件 无法添加 家庭 App 网络不兼容 Apple 支持`
- `site:discussions.apple.com/thread HomePod not responding Home app Wi-Fi network 2026`
- `site:reddit.com/r/HomePod HomePod not responding Home app Wi-Fi exclamation 2026`
- `site:reddit.com/r/HomeKit HomePod not responding Home app plays music 2026`
- `site:discussionschinese.apple.com HomePod 没有响应 无线局域网 感叹号 家庭 App`
- `小红书 HomePod 未响应 家庭 App WiFi 感叹号`
- `site:support.apple.com/zh-cn HomePod Siri 无法连接 互联网 Apple 支持`
- `site:support.apple.com/zh-cn HomePod 感叹号 无线局域网 Apple 支持`

### Sources Visited

- Apple Support: [如果 HomePod 或 HomePod mini 没有响应](https://support.apple.com/zh-cn/105031)
- Apple Support: [如果 HomePod 上的 Siri 提示 HomePod 无法连接到互联网](https://support.apple.com/zh-cn/105043)
- Apple Support: [如果 HomePod 存在“网络问题”或“无互联网”](https://support.apple.com/zh-cn/122539)
- Apple Support: [还原 HomePod 或 HomePod mini](https://support.apple.com/zh-cn/108389)
- Apple Support: [如果你无法设置 HomePod 或 HomePod mini](https://support.apple.com/zh-cn/111109)
- Apple Support: [设置 HomePod 或 HomePod mini](https://support.apple.com/zh-cn/111110)
- Apple Support: [将 HomePod、HomePod mini 或 Apple TV 设置为家居中枢](https://support.apple.com/zh-cn/102557)
- Apple Support: [配对和管理 Matter 配件](https://support.apple.com/zh-cn/102135)
- Apple Support: [如果无法将智能家居配件添加到“家庭”App 中](https://support.apple.com/zh-cn/126198)
- Apple Support Community: [homepod no response in home ap](https://discussions.apple.com/thread/254669625)
- Apple Support Community: [HomeKit stopped working - but works for 1 minute after restarting iPhone?](https://discussions.apple.com/thread/255509299)
- Apple 支持社区中文: [家庭应用出bug，无法移除homepod](https://discussionschinese.apple.com/thread/255530131)
- Reddit r/HomeKit: [HomePod Mini cannot handle any siri requests but has no issues playing music](https://www.reddit.com/r/HomeKit/comments/1uhqo6e/homepod_mini_cannot_handle_any_siri_requests_but/)
- Search result snippets from Xiaohongshu-style Chinese symptom searches; direct Xiaohongshu posts were not reliably accessible.

### Evidence Collected

- Apple says that when HomePod or HomePod mini shows "未响应" in Home, customers should first check Home app alerts, then Wi-Fi connection, then restart HomePod, and seek service if problems continue. Source: [Apple Support 105031](https://support.apple.com/zh-cn/105031).
- Apple says Home app alerts can identify HomePod Wi-Fi, Apple Account, or other issues, and that HomePod Wi-Fi signal strength is visible in HomePod settings. Source: [Apple Support 105031](https://support.apple.com/zh-cn/105031).
- Apple says two Wi-Fi signal bars or fewer indicate weak signal; users should move HomePod closer to the router and remove wireless interference sources. Source: [Apple Support 105031](https://support.apple.com/zh-cn/105031).
- Apple says a Wi-Fi exclamation mark means HomePod cannot join Wi-Fi; Siri saying it cannot connect to the network should be handled by checking network mismatch and signal strength in Home. Sources: [Apple Support 105031](https://support.apple.com/zh-cn/105031), [Apple Support 105043](https://support.apple.com/zh-cn/105043).
- Apple says "HomePod 网络不匹配" should be resolved by choosing "将 HomePod 移到 [无线局域网]" from the Home app alert details. Source: [Apple Support 105043](https://support.apple.com/zh-cn/105043).
- Apple says HomePod "网络问题" or "无互联网" can prevent audio handoff, AirPlay, Siri requests, and Home app accessory control; first steps are restarting HomePod, restarting modem/router, and confirming HomePod and iPhone use the same preferred Wi-Fi. Source: [Apple Support 122539](https://support.apple.com/zh-cn/122539).
- Apple lists router-level causes for HomePod network issues, including home hub reachability, DHCP, DNS, blocked peer-to-peer traffic, and double NAT. Source: [Apple Support 122539](https://support.apple.com/zh-cn/122539).
- Apple says HomePod reset should come after restarting from Home, unplugging/replugging if restart is unavailable, and then factory reset if still unresponsive; stereo pairs must be ungrouped before reset. Source: [Apple Support 108389](https://support.apple.com/zh-cn/108389).
- Apple says HomePod mini can be restored from Mac or PC over USB-C if it cannot be reset, and that restore also updates to the latest software. Source: [Apple Support 108389](https://support.apple.com/zh-cn/108389).
- Apple says HomePod setup requires iPhone or iPad, not Mac; HomePod uses the Wi-Fi network from the iPhone or iPad, and Personal Hotspot is not recommended. Sources: [Apple Support 111109](https://support.apple.com/zh-cn/111109), [Apple Support 111110](https://support.apple.com/zh-cn/111110).
- Apple says a 6 GHz setup warning should be handled by making every router band use the same network name, and Home app "正在载入配件和场景" for more than 30 minutes may show an option to restore the home. Source: [Apple Support 111109](https://support.apple.com/zh-cn/111109).
- Apple says HomePod and HomePod mini automatically become home hubs after setup. Source: [Apple Support 102557](https://support.apple.com/zh-cn/102557).
- Community signals repeatedly include HomePod playing audio while Home shows no response, HomePod / iPhone not on the same network, HomePod stuck configuring, and users jumping directly to resets or router changes. These are symptom and prioritization signals, not official recommendations.

### Customer Wording

- “家庭 App 里 HomePod 显示未响应。”
- “HomePod 可以播放音乐，但家庭 App 里显示离线。”
- “Siri 说无法连接到互联网。”
- “HomePod 设置里 Wi-Fi 旁边有感叹号。”
- “提示 HomePod 和 iPhone 不在同一个无线局域网。”
- “HomePod mini 一直正在配置。”
- “更新后 HomePod 不能控制灯，也不能作为家居中枢。”
- “HomePod 和 iPhone/iPad 不在同一网络。”

### Cross-source Patterns

- HomePod "not responding" overlaps with HomeKit accessory failures but deserves a separate canonical recipe because Apple’s official path focuses on HomePod alerts, Wi-Fi signal, network mismatch, router communication, restart, reset, and HomePod mini restore.
- Customers often misread "HomePod can play music but Home says no response" as proof the device is healthy. Apple’s network article clarifies HomePod may still fail to communicate with Wi-Fi or the active home hub, which can affect Siri, AirPlay, handoff, and accessory control.
- Community advice often jumps to factory reset, home reset, private Wi-Fi address changes, or router surgery. The new article keeps those clearly separated from Apple’s official sequence and frames private Wi-Fi address changes as non-official and situational.
- Setup problems need a different branch from runtime "未响应": iPhone/iPad requirement, same Wi-Fi, no Personal Hotspot, 6 GHz same-SSID warning, "正在载入配件和场景", and orange flashing HomePod mini power-adapter state.

### Articles Created, Improved, Merged, or Flagged

- Created `cookbook/HomePod/homepod-not-responding-network-problem.md` as a canonical Official recipe for HomePod / HomePod mini "未响应", network mismatch, Wi-Fi exclamation mark, "网络问题", "无互联网", Siri cannot connect, setup stuck, restart, reset, and HomePod mini restore.
- Improved `cookbook/HomePod/homekit-matter-accessories-no-response.md` by replacing the plain related item "HomePod 没有响应" with a link to the new canonical HomePod recipe.
- No duplicate HomePod-specific recipe existed, so no merge was required.

### Verification Changes

- New recipe `HomePod 或 HomePod mini 在家庭 App 中显示未响应` is `Official` because its core troubleshooting order is supported by Apple Support 105031, 105043, 122539, 108389, 111109, 111110, and 102557.
- The related HomeKit/Matter recipe remains `Official`; only its related-link organization changed.
- Private Wi-Fi address changes are recorded as `未知` and unofficial for this HomePod path because they appeared in community results but are not Apple’s official HomePod first-line recommendation.

### Reading/UI and Typography Improvements

- No shared CSS or component styling changed in this run.
- The new HomePod article follows the Apple Support-inspired reading flow: direct symptom title, short intro, customer wording, possible causes, official ordered path, setup branch, separate unofficial section, Retail flow, escalation split, related links, tags, and compact metadata.
- The HomeKit/Matter article now points readers to the HomePod-specific article instead of leaving "HomePod 没有响应" as an unlinked future topic.

### Typography/Layout Improvements

- No typography tokens were changed. Article readability was improved through short paragraphs, concise numbered steps, restrained H2/H3 headings, and a separate setup branch to avoid dense mixed troubleshooting text.

### Blocked Sources

- Xiaohongshu direct posts were not reliably accessible from search results. Chinese symptom snippets were used only for customer wording and priority signals; no factual recommendation was based on inaccessible Xiaohongshu content.

### Follow-up Opportunities

- Build a dedicated `Matter 配件无法添加到家庭 App` recipe using Apple Support 126198 and 102135 if future runs continue seeing "无法添加到家庭", "网络不兼容", "已添加到其他家庭", and "配件不受支持".
- Build an `Apple TV 网络问题或无互联网连接 / 无法作为家居中枢` recipe using Apple Support 126311 and 102557, then link it from the HomePod and HomeKit/Matter articles.
- Review global article rendering for jump-link/table-of-contents support; longer support-style articles now have enough major sections that a compact TOC could improve scanability without adding visual noise.
