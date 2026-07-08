# New Recipes Today - 2026-07-09

## Executive Summary

Today's harvest added one high-value canonical recipe: `iPhone 更新后掉电快或发热`. It is strongly justified because Apple has official post-update battery guidance and current community sources show repeated customer reports after iOS 26 updates. The existing Find My recipe was improved with a safer unofficial fallback for "No Location Found / Off Network" after official checks have been completed.

## New Apple Support Articles

- [How to get Apple Intelligence](https://support.apple.com/en-us/121115), published July 7, 2026. Relevant for future Apple Intelligence eligibility and availability troubleshooting.
- [iPhone Parts and Service History](https://support.apple.com/en-us/102658), published July 7, 2026. Relevant for repair history, genuine parts, Self Service Repair, and post-repair customer confusion.
- [If Ask to Buy isn't working](https://support.apple.com/en-us/118233), published July 1, 2026. High-value Family Sharing troubleshooting candidate.

## Updated Apple Support Articles

- [If the battery in your iPhone or iPad drains too quickly](https://support.apple.com/en-us/120745), published March 31, 2026, remains the strongest official basis for update-related battery/thermal triage.
- [iPhone battery and performance](https://support.apple.com/en-us/101575), published June 1, 2026, supports service escalation when battery health is degraded or cannot be verified.
- [About iOS 26 Updates](https://support.apple.com/en-us/123075), published June 29, 2026, points users to battery guidance because updates may affect performance and battery life.
- [Use Screen Time to manage your child's iPhone or iPad](https://support.apple.com/en-us/108806), published July 1, 2026, includes region/age notes relevant to Ask to Buy and child-account confusion.

## Trending Reddit Issues

- iOS 26 battery drain, heat, and performance complaints are recurring in r/iPhone search results and related threads. Customer wording emphasizes "battery drain after update," "overheating," and "performance issues."
- Find My "No Location Found" remains active in r/applehelp. A recurring unofficial method is Reset Location & Privacy followed by reopening Find My and granting location permission again.
- AirPods one-side connection and PC/Bluetooth confusion appeared in search results but had weaker official cross-source evidence in this harvest.

## High-engagement Xiaohongshu Issues

- Blocked. Direct Xiaohongshu troubleshooting posts were not reliably accessible through web search. Search results returned policy pages or indirect snippets rather than viewable high-engagement posts.
- Chinese customer wording to keep searching: "iOS 26 掉电", "更新后发热", "查找位置不更新", "隔空投送一直等待", "AirPods 一只连不上".

## Apple Support Community Findings

- [Worst battery backup after 26.5.2 update](https://discussions.apple.com/thread/256320852): July 3, 2026 iPhone battery complaint with visible "Me too" activity.
- [iPhone 17 Pro's Find My not showing friends](https://discussions.apple.com/thread/256141224): Find My "No Location Found" discussion with a top-ranking Reset Location & Privacy suggestion.
- [Location not found - Off Network after 26.3](https://discussions.apple.com/thread/256255978): current-style customer wording around Find My showing "Off Network" after update.
- [AirDrop not working, stuck at waiting and fails](https://discussions.apple.com/thread/256028072): reinforces existing AirDrop canonical recipe.

## Repeated Cross-source Problems

1. iPhone battery drains fast or gets hot after iOS update: Apple Support, Apple Community, Reddit.
2. Find My says No Location Found or Off Network: Apple Support guidance, Apple Community, Reddit.
3. AirDrop stuck waiting or only works with Everyone for 10 Minutes: Apple Support guidance plus Apple Community.
4. Ask to Buy requests not showing or parent cannot approve: fresh Apple Support article plus repeated Apple Community confusion.

## Recipes Improved

- `cookbook/Find My/location-sharing-not-working.md`
  - Added community-backed but clearly unofficial Reset Location & Privacy fallback.
  - Improved retail flow so reset comes only after sharing, device selection, network, Location Services, and account checks.
  - Added community source links and updated source count/date.

## Recipes Merged

- None. The repository currently has no duplicate recipes for the same symptom.

## Verification Changes

- Added `cookbook/iPhone/iphone-battery-drains-after-update.md` as `Official`.
- Kept `location-sharing-not-working` as `Official`.
- Added one unofficial workaround inside the Find My article as `较可能`; this did not change the article-level verification.

## Top 10 Missing Recipes

1. Ask to Buy Requests Not Showing
2. Screen Time Child Settings Cannot Be Changed
3. iPhone Parts and Service History Warning
4. Apple Intelligence Not Available
5. iPhone Cannot Charge or Stops Charging
6. iPhone Black Screen or Won't Turn On
7. AirPods One Side Not Connecting
8. Mac Ready for Service / Find My Mac Cannot Be Turned Off
9. iCloud Photos Not Syncing
10. App Store Media and Purchases Account Disabled

## Recommended Priority

1. Create `Ask to Buy Requests Not Showing` next. It has fresh official documentation, strong Retail value, and repeated customer confusion.
2. Create `iPhone Parts and Service History Warning` after that. It is likely to matter in repair conversations and needs careful official wording.
3. Continue improving Find My if official guidance changes or if cross-source reports identify a repeatable root cause beyond location/privacy reset.
