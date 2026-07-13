# Executive Summary

Today's Daily Digest reviewed all 2026-07-12 Harvest material and the recipes updated today. The Cookbook is healthier than yesterday: 6 canonical recipes were created across Mac password reset, Stolen Device Protection, iCloud backup storage, WeChat camera failure, iPhone charging/liquid detection, and Apple Wallet card-add failure; 5 existing canonical recipes were materially improved across AirDrop, Apple Watch pairing, Find My location sharing, battery/update, and iMessage/Messages.

No duplicate recipes were merged. No article-level verification changes were made beyond new recipes being created as `Official` where the core flow is backed by Apple documentation. Community sources were used for customer wording and recurrence signals only. Xiaohongshu remained inaccessible or unreliable today, so no factual recommendation depends on Xiaohongshu evidence.

# Today's Highlights

- Strongest Retail value: security delay/trade-in timing, iCloud backup sizing, Apple Pay issuer provisioning, WeChat-only camera triage, and iOS update battery anxiety.
- Highest-confidence Apple-backed additions: Mac login password reset, iCloud backup failure, iPhone charging/liquid detection, and Apple Wallet card-add failure.
- Most repeated customer wording: “忘记电脑开机密码”, “安全延迟”, “iCloud 空间满了”, “微信拍照黑屏卡顿”, “隔空投送一直等待”, “iMessage 正在等待激活”, “请联系发卡机构”.
- Repository maintenance completed: added category and related-recipe indexes, expanded the tag index to cover tags already used by recipes, and checked recipe metadata and links.

# Apple Support Updates

## New Apple Support Articles

- `Update iOS to protect your iPhone from web attacks`: used to reinforce security-update guidance when customers hesitate because of battery or performance rumors.
- `About the security content of iOS 26.5.2 and iPadOS 26.5.2`: used to strengthen iOS/iPadOS 26.5.2 security-update evidence.
- `About the security content of Safari 26.5.2`: noted for future Mac/Safari security guidance.
- `Set up Apple Pay`: used for Apple Pay prerequisites and setup flow.
- `If you can't add a card to Apple Wallet to use with Apple Pay`: used as the primary Wallet card-add troubleshooting source.

## Updated Apple Support Articles Used

- iOS 26 update notes, including iOS 26.5.2 security evidence and iOS 26.5.1 wired-charging fix boundaries.
- iPhone/iPad temperature guidance for paused charging and heat handling.
- Find My, Family Sharing location sharing, and Messages location sharing guidance.
- iMessage/FaceTime activation guidance, including iOS 26 new-iPhone/eSIM behavior and 24-hour carrier phone-number verification.
- AirDrop iPhone/Mac guidance, including iOS/macOS 26.2 AirDrop code behavior.
- Apple Watch pairing, compatibility, update, and “Unable to Verify Update” guidance.

# Reddit Trends

- iOS 26.5/26.5.2 battery drain, heat, performance complaints, and paused charging anxiety.
- iMessage activation after new iPhone/eSIM setup, green bubbles, email-vs-phone identity confusion, and RCS activation failures.
- Apple Pay card-add failures described as “contact issuer,” “invalid card,” and “old phone worked, new phone cannot add.”
- AirDrop “waiting,” “No People Found,” contact mismatch, and one-way iPhone-to-Mac failure.
- Charging complaints around liquid detection, USB-C debris, wireless charging working while wired charging fails, and narrow iPhone Air/iPhone 17 wired-charging update claims.

# Xiaohongshu Trends

Direct Xiaohongshu pages were not reliably accessible in today's Harvests. Search attempts covered iCloud backup full, WeChat camera black screen, AirDrop waiting, Apple Watch pairing/update failure, charging/liquid detection, iOS update heat, iMessage activation, and Apple Pay card-add failure. No factual Cookbook update was based on inaccessible Xiaohongshu content.

# Apple Support Community

- Mac password threads show confusion between login password, Apple Account password, and FileVault recovery key.
- Stolen Device Protection threads show “security delay at home,” “disable security delay,” and trade-in timing frustration.
- iCloud threads repeatedly confuse device storage with iCloud storage and overlook “Next Backup Size.”
- Camera threads show the need to split single-App camera failure from all-camera or system Camera failure.
- AirDrop and Apple Watch threads show version-specific confusion: AirDrop code behavior, Mac directionality, watchOS/iOS compatibility, and Apple Watch update loops.
- Wallet threads show issuer provisioning disputes where Apple and the issuer appear to point customers at each other.

# Cross-source Trends

1. Customers often describe security or account-protection features as failures: Stolen Device Protection, Apple Pay issuer verification, FileVault recovery, and iMessage phone-number activation.
2. Version-specific fixes are easily overgeneralized. iOS 26.5.1 wired charging applies narrowly to a small number of iPhone Air/iPhone 17 cases; iOS 26.5.2 is a security update, not a general battery fix.
3. Many Retail interactions get faster when the first branch is classification: WeChat-only vs system Camera, Wallet card-add vs terminal payment, iMessage vs SMS/RCS, AirDrop discovery vs transfer, local Mac password vs Apple Account.
4. Community workarounds are useful as wording and prioritization signals, but the Cookbook should keep Apple UI paths first and label resets, toggles, and account-region changes as unofficial unless Apple documents them.

# New Recipes

- `cookbook/Mac/mac-forgot-login-password-reset.md`: Official Mac login password reset, FileVault recovery key, Apple Account distinction, and erase-as-last-resort boundaries.
- `cookbook/iPhone/iphone-stolen-device-protection-security-delay.md`: Official Stolen Device Protection security delay, one-hour wait, biometric requirement, familiar-location confusion, and trade-in timing.
- `cookbook/iCloud/icloud-storage-full-iphone-backup-fails.md`: Official iCloud backup failure, iCloud vs device storage, Next Backup Size, temporary iCloud storage, and computer-backup alternatives.
- `cookbook/iPhone/iphone-wechat-camera-black-screen-lag.md`: Official WeChat/third-party camera black screen triage with App permissions, App troubleshooting, storage/performance, and system Camera separation.
- `cookbook/iPhone/iphone-wont-charge-wired-liquid-detected.md`: Official wired charging, liquid detection, slow charging, iOS 26.5.1 narrow fix, and no-power/service boundaries.
- `cookbook/iPhone/apple-wallet-cant-add-card-apple-pay.md`: Official Apple Wallet card-add failure and issuer provisioning escalation.

# Improved Recipes

- `cookbook/Continuity/airdrop-keeps-waiting.md`: strengthened current AirDrop code behavior, Mac/iPhone directionality, VPN/firewall boundaries, and Retail triage.
- `cookbook/Apple Watch/apple-watch-wont-connect-pair-iphone.md`: added update-loop handling, compatibility capture, battery/charger prerequisites, update-file deletion, and beta-profile branch.
- `cookbook/Find My/location-sharing-not-working.md`: added Messages/iMessage location-sharing branch without overstating iMessage as the root cause of all Find My issues.
- `cookbook/iPhone/iphone-battery-drains-after-update.md`: added current security-update evidence, paused-charging temperature branch, and safer language around update anxiety.
- `cookbook/iPhone/iphone-imessage-messages-not-sending-green-waiting-activation.md`: added email-vs-phone sending branch, iOS 26 eSIM/new-iPhone activation guidance, and stronger carrier verification handling.

# Merged Recipes

None. No true duplicate recipe pair was identified today. Several future topics should be split only if customer evidence keeps increasing, especially Apple Pay terminal-payment failure, iPhone camera black screen outside third-party Apps, and temperature-based paused charging.

# Verification Changes

- New recipes created today are `Official` because their primary flows are supported by Apple documentation.
- Improved recipes remain `Official`; the evidence base was strengthened but article-level verification did not change.
- No recipe was promoted or demoted among `Official`, `Verified`, `Likely`, `Experimental`, or `Unknown`.
- Verification audit found no invalid article-level verification values.

# Knowledge Gaps

Top 20 recipes to create next, ranked by Retail value, likely customer frequency, and source availability:

1. iPhone charging pauses at 80% or says charging will continue when temperature normal.
2. iPhone camera black screen or flash not working in the system Camera app.
3. Apple Pay payment fails at terminal or side button does not open Wallet.
4. iPhone cannot power on or black screen after battery drains.
5. iCloud Photos not syncing, photos missing, or Optimize iPhone Storage confusion.
6. iPhone migration stuck on Preparing to Transfer or temporary iCloud backup restore expires.
7. Mac Activation Lock on second-hand or erased Mac.
8. Apple Watch Activation Lock after erase or second-hand purchase.
9. Apple Watch update stuck preparing/verifying without a broader pairing failure.
10. Universal Clipboard or Handoff not working.
11. Large iPhone-to-Mac photo/video transfer without AirDrop.
12. Face ID or Touch ID not working when security features require biometric authentication.
13. Apple Account country/region change blocks payments, subscriptions, or Wallet setup.
14. Home app accessory no response after router or Wi-Fi change.
15. iPhone storage full vs iCloud storage full.
16. Mac cannot start up or shows prohibited/question-mark folder.
17. AirPods show connected but no sound or only one side works.
18. App Store cannot download or update apps because of payment/account prompts.
19. iPad unavailable or forgot passcode, including Apple Pencil/keyboard service intake boundaries.
20. Apple TV remote pairing, no signal, or AirPlay destination not appearing.

# Tomorrow's Research Priorities

- High-priority Apple Support topics: iPhone Camera black screen, iPhone no power/black screen, Apple Pay terminal payment failure, iCloud Photos sync/missing photos, Mac Activation Lock.
- Emerging community issues: iOS 26.5.2 heat/battery wording, AirDrop code confusion, Apple Watch update loops, Apple Pay issuer-token failures, WeChat camera black-screen reports.
- Weakly documented areas: third-party App camera failures, bank provisioning vocabulary, familiar-location behavior under Stolen Device Protection, and RCS carrier activation delays.
- Recipes requiring stronger verification or links: Wallet card-add, WeChat camera, Stolen Device Protection, Mac forgot login password, Apple Watch pairing, and AirDrop.

# Repository Statistics

- Total Recipes: 30
- New Recipes Today: 6
- Updated Recipes Today: 11
- Improved Existing Recipes Today: 5
- Merged Recipes: 0
- Verification Changes: 0 article-level changes beyond new Official recipes
- Broken Recipe Links: 0
- Missing Required Metadata: 0
- Invalid Verification Values: 0
- Empty Category Folders: 5 (`Accessibility`, `Apple TV`, `iPad`, `Retail Cases`, `Vision Pro`)
- Weakly Connected Articles: 6 with no inbound recipe links

# Repository Health

Overall health: Good and improving.

Strengths:

- Official Apple documentation is consistently prioritized.
- Community evidence is clearly labeled and not presented as Apple guidance.
- New recipes are symptom-first and Retail-oriented.
- No broken internal recipe links were found.
- Required metadata is present across all recipes.

Risks:

- Several newly created recipes have no inbound links yet because the surrounding topic clusters do not exist.
- Tag vocabulary has mixed English and Chinese terms; today's tag index update documents current usage but future normalization will still be useful.
- Empty category folders may make the repository look broader than the current recipe base.
- Xiaohongshu remains a weak evidence source until reliable page access improves.

Maintenance completed:

- Updated `indexes/tags.md` to include tags already used in current recipes.
- Created `indexes/categories.md`.
- Created `indexes/related.md`.
