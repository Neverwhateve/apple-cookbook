# New Recipes Today - 2026-07-13

## Executive Summary

- Created 6 new recipes across today's harvest runs.
- Improved 7 existing canonical recipes: SOS / No Service, iPhone unavailable / forgotten passcode, Apple Watch cannot connect or pair, Wallet add-card, Screen Time requests, Screen Time limits, and child Screen Time activity visibility.
- Added a canonical Mac Mail send/receive troubleshooting recipe from Apple's July 7, 2026 Mac Mail article and related official Mail/iCloud Mail references.
- Added a canonical iPad keyboard recipe for small, floating, split, or unexpectedly moving keyboards, anchored to Apple keyboard guidance and the iPadOS 26.0.1 floating-keyboard fix.
- Added a canonical Apple Pay terminal/declined-payment recipe for cards already in Wallet, separating issuer declines, merchant/contactless support, Wallet transaction-history questions, and possible device diagnostics.
- Added a canonical iPhone charging-pause recipe for 80% stops, Charging On Hold, temperature holds, Charge Limit, Optimized Battery Charging, Slow Charger, and iOS 26 Incompatible Charger wording.
- Added a canonical iPhone black-screen/no-power recipe for dead-after-battery-drain, low-battery icon, force restart, iPhone Air / iPhone 17 near-depleted wired charging, and Apple-logo recovery triage.
- Added a draft canonical iPad accessibility-state recipe for blue focus boxes, VoiceOver double-tap behavior, Full Keyboard Access highlights, Zoom windows, AssistiveTouch circles, and accidental Accessibility Shortcut activation.
- Improved the existing Wallet add-card recipe with Apple's July 6, 2026 two-factor-authentication and Card Device Limit guidance.
- Main official discovery: Apple Support's SOS article now prominently supports Apple Support app diagnostics on iOS 18 or later.
- Apple Watch discovery: Apple's July 7, 2026 connection article and update-verification guidance support a tighter split between reconnect failure, already-paired/Activation-Lock state, compatibility, and watchOS update blocks.
- New iPad discovery: iPadOS 26.0.1 fixes a floating keyboard position issue and a VoiceOver disablement issue after updating to iPadOS 26.
- iPad Accessibility discovery: Apple iPad User Guide pages support a safer split between VoiceOver, Full Keyboard Access, Zoom, AssistiveTouch, and Accessibility Shortcut before assuming touch hardware failure.
- Family Sharing discovery: Apple's July 2026 Screen Time guidance and region-specific Apple Account rules support a better split between true Screen Time failure and child-account controls that vary by age, state, country, or region.
- Main Retail improvement: specialists now have clearer evidence-capture language before deciding whether SOS is carrier, account, software, SIM/eSIM, or hardware.
- Apple Watch Retail improvement: update-blocked pairing now checks internet path, watch storage, media/App cleanup, cellular-plan preservation, and setup-as-new update flow before hardware escalation.
- Second official discovery: Apple's forgotten-passcode article now gives clearer iOS 15.2+ on-device reset, Windows Apple Devices app, up-to-60-minute restore, and over-15-minute download handling.
- Recovery-mode discovery: Apple's iPhone restore article supports a clearer branch for correct recovery-mode button order, updated Finder / Apple Devices app / iTunes environment, over-15-minute downloads, and stuck/broken buttons as a service boundary.
- Nearby-restore discovery: Apple's March 10, 2026 nearby-restore article applies to wireless software-update recovery on supported iPhone/iPad models; it should not be described as a forgotten-passcode data-preserving workaround.
- Xiaohongshu was blocked/unreliable; no recommendations were based on it.

## New Apple Support Articles

- [About the security content of iOS 26.5.2 and iPadOS 26.5.2](https://support.apple.com/en-us/127594)
  - Retail value: current security-update evidence; supports update conversations but did not require a new recipe.
- [About iPadOS 26 Updates](https://support.apple.com/en-us/123074)
  - Retail value: current iPadOS evidence for floating keyboard position changes and VoiceOver disablement after updating to iPadOS 26.
- [If your Apple Watch isn't connected or paired with your iPhone](https://support.apple.com/en-us/108360)
  - Published July 7, 2026. Retail value: current reconnect order before unpair/re-pair: proximity, iPhone Airplane Mode/Wi-Fi/Bluetooth, Apple Watch Airplane Mode, restart both devices, then unpair and pair again.
- [If you can't add a card to Apple Wallet to use with Apple Pay](https://support.apple.com/en-us/108792)
  - Published July 6, 2026. Retail value: current add-card prerequisite checklist, including issuer support, latest OS, Face ID / Touch ID / Optic ID / passcode, supported country or region, compatible device, Apple Account two-factor authentication, service outages, and issuer-facing error messages such as Could Not Add Card, Invalid Card, and Card Device Limit.
- [iPhone Parts and Service History](https://support.apple.com/en-us/102658)
  - Not used in today's recipe changes; noted as recently updated Apple service/repair context for future repair-history work.
- [If your iPhone won't turn on or the screen is black](https://support.apple.com/en-us/116940)
  - Published May 11, 2026. Used as the backbone for a new black-screen/no-power recipe: force restart by model, charge for 1 hour, low-battery icon handling, and service boundary.
- [Restore your iPhone or iPad with a nearby device](https://support.apple.com/en-us/121133)
  - Published March 10, 2026. Retail value: explains the "Restore Nearby iPhone/iPad" flow for supported devices during wireless software update recovery, including iOS/iPadOS 18+ helper-device and Wi-Fi requirements.
- [Use Hold Assist on iPhone](https://support.apple.com/en-us/127521)
  - Published July 10, 2026. Not used for a recipe today; monitor for customer confusion around automatic hold detection and Phone call controls.
- No brand-new Apple Support troubleshooting article was confirmed in the 18:36 CST pass, but a recently updated Mac Mail article was strong enough to justify a new canonical recipe.
- No brand-new Apple Support article was confirmed in the 16:08 CST pass, but Apple iPad User Guide pages supplied enough official evidence to fill the high-priority iPad Accessibility recipe.

## Updated Apple Support Articles

- [If you can't send or receive email on Mac](https://support.apple.com/en-us/102422)
  - Published July 7, 2026. Used as the backbone for the new Mac Mail recipe: network, status icons, VPN/security software, webmail testing, quotas, provider terms, and remove/re-add as the later step.
- [Update your Apple Watch](https://support.apple.com/en-us/108926)
  - Used to strengthen Apple Watch pairing/update triage: watchOS 26 compatibility, iPhone/iOS requirement, 50% battery, Wi-Fi, charger, update duration, "Update Apple Watch" sync warning, restart, and delete update file.
- [If you see 'Unable to Verify Update' when updating Apple Watch](https://support.apple.com/en-us/111816)
  - Used to add the official internet, restart, remove media/photos/apps, unpair-and-update, set-up-as-new, then restore-from-backup sequence.
- [Apple Watch and iPhone compatibility](https://support.apple.com/en-us/118490)
  - Re-reviewed to support compatibility triage when customers see "iPhone out of date" or older watches cannot pair with newer iPhones.
- [If you can't see email messages in Mail on Mac](https://support.apple.com/en-us/117379)
  - Used to add the missing-message branch: sidebar/account enabled, filters, macOS Sequoia 15.4+ categories, Junk, blocked senders, rules, search, rebuild, and macOS update.
- [If Mail on your Mac keeps asking for your password](https://support.apple.com/en-us/102413)
  - Used to explain provider-side password rejection, app-specific passwords, changed authentication methods, suspended accounts, webmail testing, and account re-add.
- [If iCloud Mail isn't working](https://support.apple.com/en-us/102562)
  - Used to keep iCloud Mail as its own official branch, including iCloud Mail enablement, system status, storage, sending limits, VPN, iCloud.com/mail, and outgoing-server checks.
- [Choose the correct email provider when adding an account to Mail](https://support.apple.com/en-us/102088)
  - Used to support provider-selection guidance for migrated or non-obvious email domains.
- [If a payment card that you use with Apple Pay is declined](https://support.apple.com/en-us/120002)
  - Used as the official issuer-first basis for Apple Pay declined transactions: all Apple Pay transactions route to card issuers for approval.
- [Learn where to use Apple Pay](https://support.apple.com/en-us/120364)
  - Used to separate merchant/contactless/payment-network failures from device failures. Apple notes terminals may show symbols but not be configured for contactless, and merchants must accept the card network.
- [See your Apple Pay transaction history](https://support.apple.com/en-us/104954)
  - Used to route transaction-history and charge questions back to the issuer as the most accurate record.
- [Devices compatible with Apple Pay](https://support.apple.com/en-us/102896), [Apple Pay participating banks and card issuers in Asia-Pacific](https://support.apple.com/en-us/102897), and [Apple Pay participating banks in Canada, Latin America, and the United States](https://support.apple.com/en-us/109524)
  - Used to support card/device/issuer support checks and the warning that participating banks may still have unsupported card types.
- [If your iPad keyboard is small or split in half](https://support.apple.com/en-us/102513)
  - Used as the backbone for restoring small, floating, or split iPad keyboards to the normal full-size bottom keyboard.
- [Use the floating keyboard on your iPad](https://support.apple.com/en-us/111789)
  - Used to explain how customers accidentally enable or intentionally move the floating keyboard.
- [About the Accessibility Shortcut for iPhone, iPad, and iPod touch](https://support.apple.com/en-us/111771)
  - Used to separate keyboard problems from triple-click accessibility shortcut changes.
- [Turn on and practice VoiceOver on iPad](https://support.apple.com/guide/ipad/turn-on-and-practice-voiceover-ipad9a246898/ipados) and [Operate iPad when VoiceOver is on](https://support.apple.com/guide/ipad/operate-ipad-when-voiceover-is-on-ipad9a24752e/ipados)
  - Used to support VoiceOver double-tap and special-gesture triage for customers who think touch is broken.
- [Control iPad with an external keyboard](https://support.apple.com/guide/ipad/control-ipad-with-an-external-keyboard-ipad5f765d6f/ipados), [Zoom in on the iPad screen](https://support.apple.com/guide/ipad/zoom-in-ipad9a245e3e/ipados), and [Use AssistiveTouch on iPad](https://support.apple.com/guide/ipad/use-assistivetouch-ipad9a2466d3/ipados)
  - Used to split keyboard focus highlights, zoomed-screen complaints, and floating-circle complaints into the right Accessibility branches.
- [If you see SOS, No Service, or Searching on your iPhone or iPad](https://support.apple.com/en-us/120000)
  - Published June 23, 2026. Used to strengthen the existing SOS recipe with the iOS 18+ Apple Support app diagnostic branch.
- [If you forgot your iPhone passcode or your iPhone is disabled](https://support.apple.com/en-us/118430)
  - Published June 18, 2026 in English and July 2, 2026 in Chinese. Used to strengthen the existing lockout recipe with iOS 15.2+ device reset, Windows Apple Devices app, 60-minute expectation, and recovery-mode download handling.
- [If you can't update or restore your iPhone or iPod touch](https://support.apple.com/en-us/118106)
  - Published May 8, 2026. Used to strengthen recovery-mode triage for model-specific buttons, updated computer software, USB connection, over-15-minute downloads, and service when buttons are stuck or recovery mode cannot be used.
- [Temporarily use your old passcode when you forget your new passcode on iPhone or iPad](https://support.apple.com/en-us/105039)
  - Re-reviewed for the iOS/iPadOS 17+ 72-hour previous-passcode reset window before moving a recently changed passcode case to full erase/restore.
- [Restore your iPhone, iPad, or iPod to factory settings using a computer](https://support.apple.com/en-us/118107)
  - Re-reviewed for computer-restore wording, latest-software restore behavior, and the note that restoring an iPhone does not delete the eSIM.
- [Apple security releases](https://support.apple.com/en-us/100100)
  - Re-reviewed; lists iOS/iPadOS 26.5.2 as the current iOS/iPadOS security update released June 29, 2026.
- [About iOS 26 Updates](https://support.apple.com/en-us/123075)
  - Re-reviewed; separates iOS 26.5.2 security fixes from the narrow iOS 26.5.1 wired-charging fix for a small number of iPhone Air and iPhone 17 users when the battery is nearly drained.
- [If your iPhone or iPod touch won't charge](https://support.apple.com/en-us/108805)
  - Re-reviewed for the no-power boundary: direct power sources, cable/adapter damage, wall outlet, charging port debris, 30-minute charge, force restart, and service if the device still will not power on or charge.
- [If your iPhone is stuck on the Apple logo](https://support.apple.com/en-us/102474)
  - Re-reviewed for Apple-logo/progress-bar triage: if the bar has not moved for more than 1 hour, connect to a computer, enter recovery mode, and choose Update before Restore when data matters.
- [Use Screen Time to manage your child's iPhone or iPad](https://support.apple.com/en-us/108806)
  - Published July 1, 2026. Used to strengthen Family Sharing recipes with regional/age variation, latest-software sync requirements, and the warning that some places do not allow Screen Time, Ask to Buy, or app content restrictions to be turned off.
- [How to manage app exceptions for your child](https://support.apple.com/en-us/125399)
  - Published July 1, 2026. Used to distinguish failed request delivery from legitimate re-approval after an app makes a significant change such as a higher age rating or new feature.
- [Region-specific rules for managing an Apple Account](https://support.apple.com/en-us/125666)
  - Re-reviewed for Child Account thresholds by country/region and adult age-confirmation requirements in Singapore, South Korea, the UK, and Texas.
- [Create an Apple Account for your child](https://support.apple.com/en-us/102617)
  - Re-reviewed for correct birthday entry, child account creation, and region-specific child-account requirements.

## Trending Reddit Issues

- Mac Mail not showing older emails or not syncing the same content visible in webmail.
- Mac Mail send/receive failures after provider migration, especially when the address domain does not match the actual authentication provider.
- iPad keyboard suddenly becoming small, floating, split, or not docked at the bottom.
- iPad users confusing accessibility focus boxes, AssistiveTouch, Sticky Keys, or VoiceOver gestures with keyboard failure.
- iPad users reporting blue focus boxes, having to double-tap, VoiceOver accidentally enabled, Full Keyboard Access highlights with external keyboards, and AssistiveTouch circles.
- iPhone cycling between No Service, SOS, LTE, and 5G after updates or carrier changes.
- Customers interpreting SOS as either satellite service, a hardware fault, or proof that the phone can see another carrier tower.
- iPhone unavailable / security lockout users asking how many attempts remain, whether a backup can still be made, and whether "Forgot passcode?" should appear.
- Apple Watch users reporting "iPhone out of date," pairing blocked at software update, "Unable to Verify Update," older-watch compatibility uncertainty, and second-hand watches still tied to a prior Apple Account.
- Apple Pay users reporting terminal no response, "payment declined," cards working physically but not through Wallet, Card Device Limit, and confusion about whether Wallet transaction history proves final billing.
- iPhone charging users reporting "Charging On Hold," charging paused at 80%, phone not feeling hot, fast charging to 80% then slowing, Slow Charger, and Incompatible Charger messages.
- iPhone black-screen/no-power users reporting no charging symbol after letting battery die, force-restart confusion, low-battery icon loops, and iPhone 17 / iPhone Air near-depleted wired charging failures.
- iPhone unavailable users reporting that recovery mode will not start, the computer does not recognize the device, the screen returns to passcode entry, the Home/side button is damaged, or the device shows "Restore Nearby iPhone/iPad."
- Screen Time and Family Sharing users reporting child activity not showing, limits not applying to one child, app requests not showing, apps requiring approval again after changes, and child-account controls that cannot be turned off by age or region.
- Community evidence was used only for customer wording and priority.

## High-engagement Xiaohongshu Issues

- No reliable Xiaohongshu posts were accessible for today's SOS, iPhone unavailable, Mac Mail, Apple Watch pairing/update, or iPad keyboard/accessibility searches.
- Screen Time age/region searches also returned generic platform pages or unrelated policy/activity pages rather than stable high-engagement troubleshooting posts.
- Searches returned unrelated Xiaohongshu account/security pages or unstable results.
- No factual changes were based on Xiaohongshu.

## Apple Support Community Findings

- Mac Mail threads repeatedly show provider-migration, Yahoo/Cox, Exchange/IMAP sync, app-specific-password, and remove/re-add-account confusion.
- Apple Watch threads repeatedly show customers mixing ordinary Bluetooth pairing, watchOS update verification, iPhone/watchOS compatibility, Activation Lock, and second-hand device ownership into one "won't pair" complaint.
- Apple Pay threads repeatedly mix card-add failures, issuer declines, merchant terminal issues, unverified Wallet cards, and suspected NFC hardware faults.
- Charging threads repeatedly mix Optimized Battery Charging, charge limits, thermal charging hold, slow charging, incompatible charger alerts, and real no-charge failures.
- iPad keyboard and accessibility threads repeatedly mix floating keyboard, external keyboard, accessibility focus overlays, and changed touch gestures.
- iPad Accessibility threads repeatedly show customers interpreting VoiceOver, Full Keyboard Access, Zoom, or AssistiveTouch as "touch screen broken" or "blue box stuck."
- SOS / cellular data threads often route users toward Apple diagnostics, carrier checks, eSIM/SIM handling, and the official SOS article.
- Passcode lockout threads show repeated fear of data loss and confusion when the screen only shows Emergency or lacks the "Forgot passcode?" button.
- Screen Time and child-account threads repeatedly mix request delivery failures, limits not blocking, child activity not showing, time-zone bypasses, and confusion about age/region rules for controls that cannot be turned off.
- Community content reinforced the need for better customer wording, not alternative official steps.

## Repeated Cross-source Problems

1. Mac Mail failures often need account/provider triage before Mac repair or OS reinstall assumptions.
2. Webmail testing is the fastest split between provider/account failure and Mail local configuration failure.
3. Provider migrations and changed authentication methods make “the password is correct” insufficient; app-specific passwords or correct provider selection may be required.
4. Missing-message complaints in Mail often come from filters, categories, rules, Junk, blocked senders, or local sync/search issues rather than deleted mail.
5. iPad keyboard shape/position issues are often feature-state problems, not hardware failures.
6. Accessibility overlays and VoiceOver gestures can look like touch or keyboard failure to customers who did not intentionally enable them.
7. Apple Watch "won't pair" often needs compatibility, already-paired state, Activation Lock, watchOS update prerequisites, and storage checks before repair assumptions.
8. SOS / No Service is often a carrier-or-device triage problem, not immediately a repair problem.
9. Customers conflate SOS only, No Service, SIM failure, and eSIM provisioning into one symptom.
10. Passcode lockout customers often know their Apple Account password but not the device passcode.
11. Recovery-mode confusion belongs inside the passcode/restore branch unless it appears outside lockout contexts; the current evidence supports improving the canonical article instead of creating a duplicate recipe.
12. Apple Pay terminal failures need a fast split between merchant/contactless support, issuer decline, card verification, and real device/NFC failure.
13. iPhone charging stops near 80% need a fast split between normal battery optimization, user-set charge limit, temperature protection, slow/incompatible charger, and actual no-charge service cases.
14. iPhone black-screen/no-power cases need a fast split between force restart, adequate wall-power charging, power-path failure, iPhone Air/iPhone 17 near-depleted wired-charging bug, Apple-logo recovery, and true service cases.
15. iPad blue-box complaints need a feature-identification split before any reset or repair assumption: VoiceOver double-tap behavior, Full Keyboard Access highlight, Zoom, AssistiveTouch, or managed Accessibility settings.
16. Screen Time complaints need an early split between request delivery, limits enforcement, activity reporting, and child-account controls that vary by age, state, country, or region.

## New Recipes Created

- `cookbook/Mac/mac-mail-cant-send-receive-email.md`
  - Covers Mac Mail cannot send/receive, account offline, repeated password prompts, missing messages, iCloud Mail send failure, provider migration, webmail testing, and cautious remove/re-add guidance.
- `cookbook/iPad/ipad-keyboard-small-floating-split-moving.md`
  - Covers iPad keyboard becoming small, floating, split, not docked, or moving unexpectedly, with iPadOS 26.0.1 update evidence and accessibility shortcut triage.
- `cookbook/iPhone/apple-pay-declined-terminal-not-working.md`
  - Covers Apple Pay declined, terminal no response, merchant/contactless/payment-network mismatch, Wallet transaction-history confusion, Mac confirmation, and escalation to issuer, merchant, or Apple diagnostics.
- `cookbook/iPhone/iphone-charging-paused-80-temperature-charge-limit.md`
  - Covers iPhone charging paused at 80%, Charging On Hold, temperature hold, iPhone 15-or-later Charge Limit, Optimized Battery Charging, Slow Charger, Incompatible Charger, and escalation boundaries.
- `cookbook/iPhone/iphone-black-screen-wont-turn-on-after-battery-drained.md`
  - Covers iPhone black screen, no power, low-battery icon, dead-after-drain, force restart, iPhone Air / iPhone 17 near-depleted wired charging, and Apple-logo/recovery triage.
- `cookbook/iPad/ipad-blue-box-double-tap-voiceover-accessibility.md`
  - Draft recipe covering iPad blue focus boxes, double-tap-to-open behavior, VoiceOver, Full Keyboard Access, Zoom, AssistiveTouch, Accessibility Shortcut, and safe Retail handling for customers who rely on Accessibility.

## Recipes Improved

- `indexes/categories.md`
  - Updated Mac count from 2 to 3.
  - Added iPad as an active category with 1 recipe and removed it from the empty-folder list.
  - Updated iPad count from 1 to 2 after adding the Accessibility-state recipe.
  - Updated iPhone count from 12 to 14 across today's iPhone recipe additions.
- `indexes/tags.md`
  - Added `Mail` and `Email` feature tags.
  - Added `Keyboard` feature tag.
  - Added `VoiceOver` and `AssistiveTouch` feature tags.
  - Added `NFC` feature/troubleshooting tag.
- `indexes/related.md`
  - Connected the Wallet add-card recipe with the new Apple Pay terminal/declined-payment recipe.
  - Added the new charging-pause recipe to the battery/software-update/charging hub.
  - Added the new black-screen/no-power recipe to the battery/software-update/charging hub.
  - Added the iPad input/focus troubleshooting cluster for the keyboard and Accessibility-state recipes.
- `cookbook/iPhone/iphone-battery-drains-after-update.md`
  - Added related link to the new charging-pause recipe.
  - Linked the plain-text black-screen/no-power related item to the new canonical recipe.
- `cookbook/iPhone/iphone-wont-charge-wired-liquid-detected.md`
  - Added related link to keep "80% charging pause" separate from complete no-charge, liquid detection, and port/accessory faults.
  - Added related link to keep black-screen/no-power intake separate from ordinary wired/liquid charging failures.
- `cookbook/iPhone/apple-wallet-cant-add-card-apple-pay.md`
  - Added current English Apple Support source, Apple Account two-factor-authentication prerequisite, Card Device Limit wording, and clearer issuer-device-limit guidance.
- `cookbook/iPhone/iphone-sos-no-service-searching.md`
  - Added clearer Apple Support app cellular diagnostics wording and stronger Retail evidence capture.
- `cookbook/iPhone/iphone-unavailable-security-lockout-forgot-passcode.md`
  - Added iOS 15.2+ reset prioritization, Windows Apple Devices app wording, restore timing, and over-15-minute recovery-mode handling.
  - Added a recovery-mode/computer-recognition branch: model-specific buttons, updated Mac / Apple Devices app / iTunes, USB path, broken-button service boundary, 72-hour old-passcode reset check, and nearby restore wording.
- `cookbook/Apple Watch/apple-watch-wont-connect-pair-iphone.md`
  - Added "Unable to Verify Update" and storage-blocked update wording, official media/App cleanup sequence, cellular-plan preservation, set-up-as-new update flow, and stronger compatibility triage.
- `cookbook/Family Sharing/screen-time-child-usage-not-showing.md`
  - Added official Screen Time, child Apple Account, and region-specific rules sources; added age/region customer wording and safer escalation around birthdays, account region, and non-adjustable controls.
- `cookbook/Family Sharing/screen-time-requests-not-working.md`
  - Added the official re-approval branch for apps with significant changes and a region/age branch for controls that cannot be turned off or adjusted.
- `cookbook/Family Sharing/screen-time-limits-not-blocking.md`
  - Added a split between true limit enforcement failures and age/region rules that make controls appear stuck or automatically enabled.

## Recipes Merged

- None.

## Verification Changes

- No verification-level changes.
- New Mac Mail recipe is `Official` from Apple Support 102422, 117379, 102413, 102562, and 102088.
- New iPad keyboard recipe is `Official` from Apple Support 102513, 111789, 123074, and 111771.
- New Apple Pay terminal/declined-payment recipe is `Official` from Apple Support 120002, 120364, 104954, 108398, 108792, 102896, 102897, 109524, and 101554.
- New iPhone charging-pause recipe is `Official` from Apple Support 108805, 108055, 120619, 105105, and 118431.
- New iPhone black-screen/no-power recipe is `Official` from Apple Support 116940, 108805, 102474, 118431, and 123075.
- New iPad blue-box/double-tap Accessibility recipe is `Official` from Apple Support and Apple iPad User Guide pages for VoiceOver, Accessibility Shortcut, Full Keyboard Access, Zoom, AssistiveTouch, and Siri.
- Improved iPhone and Apple Watch recipes remain `Official`; the Apple Watch update additions are supported by Apple Support 108360, 111821, 108926, 111816, and 118490.
- The expanded iPhone unavailable/passcode recovery branch remains `Official`; new evidence is Apple Support 118106, 121133, 105039, and 118107.
- Improved Family Sharing Screen Time recipes remain `Official`; the new age/region and app re-approval branches are supported by Apple Support 108806, 105121, 125399, 102617, and 125666.

## Top 10 Missing Recipes

1. Mac Mail storage too large or Mail using unexpected disk space.
2. iPhone Photos/iCloud Photos not syncing or missing after restore.
3. Mac Activation Lock on second-hand or erased Mac.
4. Apple Watch cannot update watchOS, separate from pairing.
5. Apple Watch Activation Lock after erase or second-hand purchase.
6. Computer does not recognize iPhone in Finder / Apple Devices app outside passcode recovery contexts.
7. China mainland transit card shows Done but does not appear in Wallet.
8. iOS 26 Incompatible Charger or Slow Charger message appears repeatedly.
9. iPhone Air / iPhone 17 near-depleted wired charging follow-up, if reports continue after iOS 26.5.1.
10. Child Apple Account cannot change age, country/region, or default family controls, if evidence separates it from ordinary Screen Time failures.

## Recommended Priority

1. Review Mac Mail storage complaints separately from send/receive failures; they may need their own canonical page.
2. Review whether Apple Watch update failure deserves its own recipe if reports continue outside pairing contexts.
3. Watch `computer does not recognize iPhone` outside passcode/recovery contexts; that may become its own cross-device recipe.
4. Keep watching iPhone Air / iPhone 17 dead-after-drain reports to confirm whether iOS 26.5.1 fully resolves the wired-charging branch.
5. Monitor iPad Switch Control wording to decide whether it should split from the new Accessibility-state recipe.
6. Monitor child Apple Account age/region complaints to decide whether they should split from the Screen Time cluster.
