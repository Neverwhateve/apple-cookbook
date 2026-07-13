# New Recipes Today - 2026-07-12

## Executive Summary

- Created 1 new recipe in the 22:08 CST harvest run: Apple Wallet / Apple Pay card-add failure.
- Improved 3 existing canonical recipes today: Find My location sharing, iPhone battery drain after update, and iMessage/Messages activation.
- Closed the gap from P0 feedback #8 by adding an iMessage/Messages branch without overstating iMessage as the root of all Find My sharing.
- Added current Apple security-update evidence for iOS/iPadOS 26.5.2 and safer Retail language around update anxiety, heat, battery drain, and paused charging.
- Added Apple’s newer guidance for Messages coming from an email address and iOS 26 new-iPhone/eSIM iMessage activation.
- Added current Apple Pay setup and Wallet card-add evidence so specialists route “contact card issuer” cases to issuer provisioning before high-impact device resets.

## New Apple Support Articles

- [Update iOS to protect your iPhone from web attacks](https://support.apple.com/en-us/126776)
  - Retail value: high for customers delaying updates because of battery or performance rumors.
- [About the security content of iOS 26.5.2 and iPadOS 26.5.2](https://support.apple.com/en-us/127594)
  - Retail value: high for current update-security conversations.
- [About the security content of Safari 26.5.2](https://support.apple.com/en-us/127685)
  - Not used for a recipe update today, but relevant for future Mac/Safari security guidance.
- [Set up Apple Pay](https://support.apple.com/en-us/108398)
  - Recently published/updated Apple Pay setup article; used as evidence for supported device, latest software, Apple Account, biometric/passcode, and issuer verification requirements.
- [If you can't add a card to Apple Wallet to use with Apple Pay](https://support.apple.com/en-us/108792)
  - Recently published/updated troubleshooting article; used as the core source for the new Wallet card-add failure recipe.

## Updated Apple Support Articles

- [关于 iOS 26 更新](https://support.apple.com/zh-cn/123075)
  - Now includes iOS 26.5.2 as a security-fix update and preserves the iOS 26.5.1 wired-charging fix for a small number of iPhone Air/iPhone 17 models.
- [Apple security releases](https://support.apple.com/en-us/100100)
  - Lists current software versions and the 2026-06-29 iOS/iPadOS 26.5.2 security release.
- [如果 iPhone 或 iPad 温度过高或过低](https://support.apple.com/zh-cn/118431)
  - Strengthened the battery/update article's “paused charging” branch.
- [与“家人共享”群组共享你的位置](https://support.apple.com/zh-cn/105107)
  - Used to clarify that family location can appear in Find My and Messages.
- [在 iPhone 上的“信息”中共享你的位置](https://support.apple.com/zh-cn/guide/iphone/iph69b192bc2/ios)
  - Used to add a Messages-specific sharing branch to the Find My article.
- [如果你的 iPhone 使用你的电子邮件地址发送短信](https://support.apple.com/zh-cn/101744)
  - Added to the iMessage/Messages recipe to fix the “messages come from email, not phone number” branch.
- [如果你无法在 iPhone 上打开或登录 iMessage 信息或 FaceTime 通话](https://support.apple.com/zh-cn/119859)
  - Re-reviewed for the iOS 26 new-iPhone/eSIM branch and 24-hour carrier phone-number verification detail.
- [如果你无法向 Apple 钱包中添加卡片以与 Apple Pay 搭配使用](https://support.apple.com/zh-cn/108792)
  - Used as the primary official troubleshooting source for the new Apple Pay card-add recipe.
- [设置 Apple Pay](https://support.apple.com/zh-cn/108398)
  - Used for card-add flow and device/security prerequisites.

## Trending Reddit Issues

- iOS 26.5/26.5.2 battery drain, overheating, and performance complaints.
- Customer wording: “phone freezes, runs hot, battery life is horrendous,” “updated and charging/performance got worse.”
- Used only as recurrence and wording evidence; official recommendations came from Apple battery, temperature, update, and security documentation.
- iMessage activation and identity complaints after new iPhone/eSIM setup.
- Apple Pay / Wallet add-card failures with “contact card issuer,” “card invalid,” and “old phone worked, new phone cannot add.”

## High-engagement Xiaohongshu Issues

- Direct Xiaohongshu troubleshooting access was blocked/unreliable this run.
- Search attempts for `iOS 26.5.2 发热`, `iPhone 更新后发热掉电`, `充电暂停温度恢复`, `iMessage 正在等待激活`, and `Apple Pay 添加银行卡失败` did not produce stable, relevant, accessible posts.
- No Cookbook factual change was based on Xiaohongshu.

## Apple Support Community Findings

- Repeated discussions around iOS 26.5/26.5.2 heat, battery drain, charging pause at 80%, and whether this indicates battery failure.
- Community replies often point back to restart, updates, leaving the device idle on Wi-Fi and power, and Apple battery/temperature articles.
- Repeated Wallet discussions around issuer provisioning, bank verification, device transfer, and “Apple says contact issuer / issuer says card is fine.”
- Repeated iMessage discussions around waiting for activation, only email working, new iPhone/eSIM setup, and green bubbles after updates.
- Used to improve customer wording and priority, not as official guidance.

## Repeated Cross-source Problems

1. iOS update anxiety: customers see battery/heat complaints and hesitate to install security updates.
2. Paused charging confusion: customers interpret temperature-based charging pause as a broken battery.
3. Find My vs Messages confusion: customers assume iMessage is the universal basis for location sharing.
4. Contact identity mismatch: phone number/Apple Account email choices can affect Messages-based sharing and contact matching.
5. Version-specific conflation: iOS 26.5.1 charging fix and iOS 26.5.2 security update are being mixed together in customer conversations.
6. Apple Pay card-add failures are often issuer approval/token problems, but customers describe them as Wallet, iPhone, or Apple ID failures.
7. New iPhone/eSIM setup can leave iMessage using email or green SMS/RCS until iMessage is toggled and phone-number activation completes.

## Recipes Improved

- `cookbook/Find My/location-sharing-not-working.md`
  - Added Messages/iMessage branch, sources, customer wording, and Retail correction.
- `cookbook/iPhone/iphone-battery-drains-after-update.md`
  - Added security-update branch, paused-charging temperature branch, current iOS 26.5.2 evidence, and stronger Retail flow.
- `cookbook/iPhone/iphone-imessage-messages-not-sending-green-waiting-activation.md`
  - Added email-vs-phone sending branch, iOS 26 new-iPhone/eSIM activation branch, and stronger 24-hour carrier verification handling.

## New Recipes Created

- `cookbook/iPhone/apple-wallet-cant-add-card-apple-pay.md`
  - New canonical Official recipe for Apple Wallet card-add failure, Apple Pay issuer verification, supported regions/devices/cards, device-specific card numbers, and Retail escalation.

## Recipes Merged

- None.

## Verification Changes

- New recipe `Apple 钱包无法添加银行卡或 Apple Pay 卡片` is `Official`.
- Improved Find My, battery, and iMessage recipes remain `Official`; verification evidence is stronger.

## Top 10 Missing Recipes

1. iPhone charging pauses at 80% or says charging will continue when temperature normal.
2. Apple Pay payment fails at terminal or side button does not open Wallet.
3. iPhone cannot power on or black screen after battery drain.
4. iPhone Photos/iCloud Photos not syncing or missing after restore.
5. Mac Activation Lock on second-hand or erased Mac.
6. Apple Watch Activation Lock after erase or second-hand purchase.
7. iPhone migration stuck preparing to transfer or temporary iCloud backup restore expires.
8. Universal Clipboard or Handoff not working.
9. Large iPhone-to-Mac photo/video migration without AirDrop.
10. iPhone camera black screen or flash not working outside third-party apps.

## Recommended Priority

1. Monitor iOS 26.5.2/26.6 battery and charging threads before deciding whether `charging paused at 80%` needs its own recipe.
2. Add a separate Apple Pay payment-at-terminal recipe only if evidence is distinct from card-add failure.
3. Continue improving canonical recipes from P0 feedback before adding narrow duplicates.
