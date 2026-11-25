# TimeSince Product Marketing Context

**Document version:** v1
**Last updated:** 2026-11-22
**Scope:** shared context for website marketing. Evidence review of the website at `66a4d2c`, the app at `21053ae` (`1.16.0+3`), and the US App Store listing. This is not a release announcement or a certification from testing an installed app.

**Later release check (22 November 2026).** The US App Store now lists 1.16. The earlier 1.15 baseline and “repository-only” labels below reflect the first review. For the features Apple confirmed in 1.16 and the details still awaiting confirmation, see the [website accuracy review](../docs/content-accuracy.md).

## Evidence and release status

Use three distinct evidence levels:

1. **Publicly released:** the App Store listing or version history confirms availability. The latest version observed is **1.15, November 5, 2026**. The listing also confirms six languages, iPhone only, iOS 17.6+, and the prices below. [App Store](https://apps.apple.com/us/app/time-since-tracker-timesince/id6769251517)
2. **Repository implementation:** current app documentation and code describe behavior, but do not establish distribution. App `pubspec.yaml` says **1.16.0+3**. The app changelog explicitly dates entries by the commit closing work, not App Store approval. Treat its 1.16 additions as **repository-only / release unconfirmed**.
3. **Hypothesis or unknown:** audience assumptions, unmeasured outcomes, incomplete features, and unresolved contradictions. Do not turn these into claims.

The website's October 23 research remains useful historical evidence, but its “current version 1.13,” five-language list, and rating count are stale. A plan, a bundled What's New sheet, a screenshot, or an internal “shipped” label is insufficient evidence of public release.

### Sources to consult

Website paths below are relative to the website root; app paths are relative to `/Users/marjaysonsanagustin/Projects/kailan`.

| Source | What it establishes |
|---|---|
| Website `docs/positioning.md`, `docs/research.md` | Established positioning; dated listing and feedback-board research; attributable user language |
| Website `lib/about.ts` | Founder-authored story and reasons for product choices; more current than the unanswered interview template |
| Website `lib/site.ts`, `lib/faq.ts`, `lib/features.ts`, `lib/cta.ts` | Existing marketing claims, prices, and conversion paths; claims can be stale and must be reconciled |
| App `docs/principles.md`, `docs/features/voice-and-copy.md` | Product constraints, terminology, and voice |
| App `docs/features/pro-and-free.md` | Detailed action-level gates and lapse behavior; contains some historical copy and stale paths |
| App `docs/features/backups.md`, `icloud-backup.md`, `timers.md`, `goals.md`, `whats-new.md` | Current feature behavior and implementation limitations |
| App `docs/changelog.md`, `pubspec.yaml` | Implementation chronology and build identity, not store publication dates |
| App `lib/services/revenuecat_service.dart`, `lib/pages/export_data_page.dart`, `lib/pages/event_goal_page.dart`, `lib/components/event_modal/event_form_widgets/event_custom_fields_section.dart` | Spot-checked counter limit, file export/import, goal and timer/field gates |

Prefer public release evidence for availability, current feature references and code for mechanics, and direct founder/customer language for motivations. Resolve contradictions explicitly rather than calling every existing website sentence “verified.”

## Product Overview

**One-liner:** TimeSince is an iPhone interval tracker that shows how long it has been since you last did something.

**What it does:** People create counters for recurring things, log when they happen, and see elapsed time and their own history. Interval counters measure time since the last occurrence; quit counters measure time since stopping or the last reset. A reset starts a new count while preserving history.

**Category:** interval tracker / time-since or days-since counter; App Store category Lifestyle. Habits and chores are use cases, not the whole product category. Do not position it as a clinical health app or a productivity scorekeeper.

**Product type:** personal, local-first iPhone app. No account or developer-operated tracking-data server. Core tracking works offline; optional iCloud and purchasing require their respective services. Android, a web tracking app, and dedicated iPad support are not established released products.

**Business model:** freemium with three active counters and no free-tier time limit. TimeSince Pro offers monthly, yearly, or lifetime access. Observed US prices: **$1.99/month, $14.99/year, $39.99 lifetime**. Regional prices and checkout offers may differ; do not infer trial duration from “Try Free” copy. [App Store](https://apps.apple.com/us/app/time-since-tracker-timesince/id6769251517)

**Positioning hierarchy:** lead with “when did I last…?” and concrete recurring moments; explain the interval; show history and easier logging; explain the absence of streak penalties and the privacy model. The existing founder story supports this: irregular household records, calls home, and a broken reading streak motivated the app (`lib/about.ts`).

## Target Audience

Consumer product: the individual is both user and buyer. Company profiles and B2B purchasing personas do not apply.

| Audience | Evidence and confidence | Relevant job |
|---|---|---|
| People remembering irregular personal tasks | Core product positioning and founder story | Know when something last happened without reconstructing it from memory |
| People who identify with ADHD-related remembering difficulties | Explicit developer positioning in the listing; not clinical efficacy evidence or proof of audience size | Make elapsed time visible and reduce the effort of recording a moment |
| People put off by daily streak pressure | Founder story and explicit product principles | Return after a gap with their previous history intact |
| People tracking many recurring things | Duplicate-counter and widget requests in dated board research | Organize counters and log with fewer steps |
| People cutting back or quitting | Quit-counter capability is established; prevalence and outcomes are unknown | See the current run and keep earlier runs after a reset |
| Shared households | Requests establish demand, not product fit for collaboration | Individual tracking is possible; shared ownership/delegation is unavailable |

**Jobs to be done:** remember the last occurrence; record context alongside it; understand personal intervals; keep a record while cutting back without a punitive streak mechanic.

**Example scenarios:** watering plants, calling family, changing car oil, recording a migraine. These are listing examples, not evidence of common customer behavior. Caregivers, parents, pet owners, homeowners, and recovery communities remain unvalidated audience segments. A founder's own household use does not validate a market segment.

## Problems & Pain Points

- Forgetting when an irregular task last happened creates guesswork.
- Daily schedules and streaks can fit poorly around activities that recur at variable intervals.
- Notebooks and scattered records make elapsed time and patterns harder to inspect.
- Sensitive personal records raise questions about accounts and where data goes.

These are established positioning themes, supported by the founder's story and historical listing research. Their prevalence, time cost, and monetary cost have not been measured. Emotional tension is uncertainty and pressure to maintain a daily record; do not imply all users experience anxiety or that the app treats it.

## Competitive Landscape and Differentiation

**Direct category:** time-since counters and interval trackers. Days Since appears as a design reference in the goals documentation, not as a validated competitive analysis. No named competitor feature or pricing comparison has been verified for this context.

**Secondary alternatives:** daily habit/streak trackers, calendars, reminders and to-do lists. They may serve fixed schedules well; the proposed distinction is remembering actual intervals. Do not claim every alternative penalizes gaps.

**Indirect alternatives:** memory, notebooks and spreadsheets. The founder used a notebook; wider switching behavior is unmeasured.

**Differentiation themes:** elapsed time as the organizing idea; retained history without daily streak loss; local encrypted counter storage and optional private iCloud; a paper/ticket visual identity; several ways to log; contextual notes and optional paid photo/number fields. These capabilities are supported, but uniqueness against the market is not established.

**Why customers choose it:** historical reviews praise the graph, visual design, free tier and lifetime option. That is qualitative evidence, not a ranked set of purchase drivers.

## Verified Features and Availability

“Released baseline” below combines the historical website research with public version history. Details of current implementation are sourced to app feature docs; this review did not run every feature on a device.

| Feature | Evidence/status | Marketing boundary |
|---|---|---|
| Interval and quit counters, logging, resets, history | Released baseline; website research and app principles | Reset changes elapsed time; it does not erase past runs |
| Counter appearance, categories, sorting, duplication | Released baseline; duplication documented in 1.13 | Duplication creates another counter and remains subject to the active-counter limit |
| Timeline, calendar, sharing, interval charts, Stats and weekly report | Released baseline; app timeline/calendar/weekly-report references | Describe patterns, not discipline, scores or diagnostic insights |
| Notes, photos, numbers with calculator and charts | Released baseline; `pro-and-free.md`, `extra-details.md` | Notes are free; adding/changing photo and number fields is Pro |
| Hidden counters with biometric access | Released baseline; website feature/FAQ references | Hiding is Pro; avoid implying every exported file is encrypted |
| Home Screen and Lock Screen widgets; multi-counter and reminder widgets | Released baseline through 1.13; widget references | Widget logging is free; do not bundle it under paid automation |
| Siri/Shortcuts and NFC logging | Released baseline; `siri.md`, `nfc.md` | Siri/Shortcuts require Pro; NFC pairing requires Pro and a compatible tag/device |
| Reminders, up to five per counter; AlarmKit delivery | Released baseline; `reminders.md`, `integrations/alarmkit.md` | Standard reminders are free. AlarmKit requires iOS 26+ and supported rules/permissions; not every repeat rule supports alarms |
| Illustrated milestones and ticket receipts | Released baseline through 1.13; milestone/celebration references | Earned milestones are not sold back or framed as a competition |
| Private iCloud sync and dated encrypted backups | Public 1.14 release notes confirm dated backups; `backups.md` explains mechanics | Free. Distinguish syncing/merging from restoring a dated state, and both from paid JSON export |
| Timeline illustrations, refreshed My Stuff, French, archive-details gate | Public 1.15 notes; current feature references | Six released languages: English, French, German, Spanish, Simplified and Traditional Chinese |
| Timed sessions and Live Activity, independent simultaneous counter timers | **Repository-only, 1.16**; `timers.md`, changelog | Do not sell as currently released. Interval counters only; first adding a timer is Pro |
| Goals, completed-goal history, Attempts page and goal widget | **Repository-only, 1.16**; `goals.md`, changelog | Setting a goal is Pro. One active goal per counter; completion is retained. Do not promise goals recur forever |
| Future interval starts up to a month ahead and start announcement | **Repository-only, 1.16**; changelog/reminders reference | Separate from older released reminder start dates; quit starts remain past/present |
| Widget preview gallery, in-app release sheet, stronger backup verification and Siri duplicate-log fix | **Repository-only, 1.16**; changelog and feature docs | Do not silently promote implementation changes into release claims |
| Timer-end local notifications while away; Siri/NFC timer controls | **Not built**, explicitly stated by timer reference and changelog | Existing Siri/NFC logging does not mean timer control is available |
| Household collaboration/delegation | **Unavailable**; historical founder reply and About copy | A sharing request is not a roadmap commitment. Sharing a static card/calendar is not shared counters |

The public release boundary above was checked against the [App Store version history](https://apps.apple.com/us/app/time-since-tracker-timesince/id6769251517). Use the app references for richer mechanics; do not assume every detail in the 1.16 tree was present in 1.15.

## Free / Pro Boundaries

This is an action-level summary of the current app reference, with new 1.16 gates called out. The public 1.15 notes independently confirm the archive boundary. Remote RevenueCat paywall copy and offers were not inspected.

| Capability/action | Free | Pro / qualification |
|---|---|---|
| Active counters, including hidden and quit counters | 3 | Unlimited; archived counters do not count |
| Logging, resets, undo, edits, categories, Explore | Included | No additional gate |
| Notes on logs | Included | Do not describe all custom logging as paid |
| Add/change photo or number fields; number calculator | — | Pro to acquire/change; existing fields keep logging after a lapse; removing fields is free |
| Timeline, calendar, sharing, rhythms, weekly report, milestones | Included | Number charts are free to read, although their field is acquired through Pro |
| Reminders and supported AlarmKit alarms | Included | Platform/permission restrictions still apply |
| Widgets and widget log buttons | Included | Includes Lock Screen and multi-counter families |
| Hide a counter | — | Pro; unhiding from an action sheet is free |
| Archive and browse archive list | Included | Opening archived details and unarchiving require Pro |
| iCloud sync, restore and dated iCloud backups | Included | Never market iCloud as a Pro benefit |
| Export/import a portable JSON file | — | Pro; separate from iCloud. Current export is plain JSON, not an encrypted `.tsbak` archive |
| Siri/Shortcuts, including Action Button routes using those intents | — | Pro; ordinary widget logging remains free |
| Pair NFC tag | — | Pro to pair; already-paired tags continue logging after a lapse |
| Add timer to counter | — | **Repository-only 1.16:** Pro to add; existing timers keep working and can be edited or disabled after a lapse |
| Set goal | — | **Repository-only 1.16:** Pro to set; reading, sharing and removing an existing goal remain free |

**When Pro lapses:** if there are more than three non-archived counters, the user chooses up to three to keep active; the rest are archived, not deleted. Selected counters are unhidden. With three or fewer, the expiry screen does not appear and existing hidden counters can remain hidden. Siri entitlement checks stop paid intents; iCloud remains available. Do not promise automatic restoration of every archive on resubscription: the website says this, but the reviewed feature reference does not establish that behavior.

**Known gate nuance:** the form's Hidden toggle is documented as gating both directions, even though the action-sheet unhide is free. Do not promise identical behavior from every entry point.

## Terminology

| Use | Meaning / boundary |
|---|---|
| TimeSince | Public brand; “Kailan” is the internal project name |
| Counter | The thing being tracked; internal `Event`/`Events` names do not belong in customer copy |
| Interval counter | Time since the last occurrence |
| Quit counter / Quitting mode | Time since stopping or the last reset |
| Log | A recorded occurrence; a counter's synthetic start row is not an ordinary log |
| Reset / run / longest run | Quit-counter history; avoid “back to zero” or “lost progress” |
| Rhythm / interval | Descriptive timing in real units, not a grade for consistency |
| Notes / Photo / Number | Distinct field types with different gates |
| Hidden / archived | Hidden is private active tracking; archived is put away and stops reminders |
| iCloud sync / dated backup / export as a file | Three different functions; only portable file export/import is Pro |
| Stats | Current customer-facing name; older docs and code also say Me |
| Timer / goal | Specific 1.16 features, not synonyms for ordinary elapsed-time counters; release unconfirmed |

Avoid making “habit tracker” the umbrella identity, calling counters events, or using “backup” alone as a paid benefit. “No due dates” describes the absence of a failure state, not an inability to set reminders. “Nothing is lost” refers to preserved history after gaps/resets, not a guarantee against deletion or technical data loss.

## Brand Voice

**Governing rule:** “The app describes; it does not grade.” Source: app `docs/features/voice-and-copy.md`.

| Attribute | Means | Avoid | Existing line / source |
|---|---|---|---|
| Gentle | Leave room for the user's timing | Urgency, guilt, pressure | “Ready when you are” — app voice reference |
| Concrete | Say what the user can see or do | Abstract transformation promises | “How long since you last did it?” — website `lib/site.ts` |
| Permission-giving | Keep returning possible | A gap framed as failure | “Nothing is lost — bring one back whenever you want it again.” — website positioning, quoting app copy |
| Candid | Name the fact and scope the claim | Stronger privacy or efficacy claims than evidence supports | “Your Device, Your iCloud” — app voice reference |
| Personal | A maker who explains decisions | Corporate plural or invented team | “There is no team. When you write on the feedback board, I am the one who answers.” — `lib/about.ts` |

Use second person, present tense and plain descriptions. Be warm without grading the person. Do not label the user overdue, late, failed or behind; avoid XP, ranks, points, streak-loss threats and “you should” nudges. Free/Pro plan terminology is fine; gamified “tiers” are not. No exclamation marks in page/sheet subtitles. Emoji should not be praise or a score; avoid fire/trophy imagery. The app allows carefully scoped playful copy, not general celebratory pressure.

**Tone by context:** support explains what happened and the next action; launches name concrete availability and limits; errors state the issue without blame; sales explain the benefit and gate plainly; social can be lightly playful without comparison or guilt. These are applications of the documented voice, not tested channel performance findings.

**Privacy language:** say counter data is stored in a SQLCipher-encrypted local database, with its key in Keychain, and optionally synced to the user's private iCloud. Do not say “no external services,” “all data stays only on your phone,” “we collect nothing,” or “every file is encrypted.” Purchases use RevenueCat; feedback uses UserJot; portable JSON exports are distinct from encrypted iCloud archives.

**Health language:** ADHD is an audience cue, not a medical result. Medication, migraine, quitting and recovery examples must not imply treatment, clinical effectiveness, guaranteed adherence or guaranteed notification delivery. Do not invent behavioral-study statistics or use an app string as proof of a health claim.

## Customer Language and Proof Points

The following excerpts come from the website's dated `docs/research.md`; they have attribution there and should remain scoped to that evidence rather than presented as fresh interviews:

- “Would love the option to duplicate an existing counter, but clear all events” — feedback-board request. Use “counter” for the object; “events” here describes its entries.
- “easier to pick at a glance, rather than having to search using keywords” — icon-picker feedback.
- “The graph that shows how often a habit has done is very helpful.” — Aduh Q, historical App Store review.
- “very generous free tier” — getawayshootoutpro, historical App Store review.

**Proof themes:** the founder's irregular records and reading-streak story explain the stance; reviews support perceived usefulness of graphs and design; feature docs and code support concrete capabilities. No quantified retention lift, saved time, health improvement, conversion result, audience size or customer-logo list is established. Do not turn the founder's experience into a typical customer outcome.

Feedback-board vote counts were previously misread from duplicated markup. Do not reuse 33/22/11 counts or derive market demand from them. The research explicitly corrects the household request to three votes at that time. Do not publish an aggregate rating from the old six-rating snapshot.

## Objections and Switching Dynamics

These are messaging hypotheses, not objections measured in sales interviews.

| Likely objection | Supported response |
|---|---|
| “Will a missed day wipe out my progress?” | History remains; ordinary gaps do not break a daily streak. A deliberate quit reset starts a new run and retains prior runs |
| “Do I need to subscribe just to try it?” | Three active counters are free without a time limit; Pro offers subscription and lifetime options |
| “Who can see my records?” | Explain local storage and optional private iCloud precisely; distinguish purchase/support services and exported files |
| “Can my household use a shared counter?” | Shared counters/delegation are unavailable; static sharing and personal iCloud sync do not provide collaboration |

**Anti-personas / poor fits:** people requiring collaborative task assignment, competitive streak mechanics, Android/web access, or clinical monitoring guarantees.

**Push:** forgetting irregular tasks, scattered notes, dissatisfaction with daily tracking. **Pull:** visible elapsed time, retained history, easier logging, privacy and a paid lifetime option. **Habit:** existing notebook/calendar routines and setup effort. **Anxiety:** data portability, privacy, price and what happens after a lapse. Push/pull have founder and feature support; the strength of each switching force is unmeasured.

## Goals

**Business goal:** help suitable iPhone users understand and try TimeSince, with Pro available for expanded tracking. This is inferred from the website CTA structure, not a quantified owner-approved growth target.

**Primary conversion:** App Store visit/download via the site's download links. `lib/cta.ts` supplies placement-specific campaign parameters. Instrumentation intent does not establish attribution completeness or measured performance.

**Current metrics:** acquisition, activation, retention, paid conversion and revenue are unknown. Paid-ad budgets, targets and campaign activity are not established; no paid-ad operating assumptions are included.

## Uncertainties and Conflicts to Carry Forward

1. **1.16 public availability:** not established. Keep timers, goals, future interval starts and related changes out of released-feature marketing until a public listing or release confirmation establishes availability. Do not call them promised roadmap dates either.
2. **Website copy conflicts:** `lib/faq.ts` puts notes in Pro and broadly calls archiving paid. Current app references make notes, archiving and archive browsing free; public 1.15 notes confirm the archive-details gate. Use the action-level table above for new copy.
3. **Resubscription behavior:** automatic unarchiving is claimed by the FAQ but not verified in the reviewed implementation/reference. History retention is supported; automatic restoration needs a specific check.
4. **Source freshness:** `CLAUDE.md` still cites 1.13, five languages and an unresolved jurisdiction. Current `lib/site.ts` names the Philippines, and `lib/about.ts` is no longer draft-gated. The interview file is an old question list, not evidence that the founder story remains unknown.
5. **App docs also drift:** `pro-and-free.md` retains old onboarding ordering and a `data_backup_page.dart` path. Current principles restore first-counter creation before the paywall; export now lives in `export_data_page.dart`. Do not copy old paths or first-run claims blindly.
6. **Paywall and offers:** RevenueCat dashboard copy, close-button configuration, trial eligibility and regional offers were not verified. Development builds can expose Pro features, so a debug screenshot does not establish a Free entitlement.
7. **Device verification:** no installed release was exercised. The app changelog identifies native Live Activity verification limits and unbuilt timer integrations. Repository tests and implementation notes are not device-level release proof.
8. **Markets and outcomes:** segment prevalence, competitor superiority, clinical benefits and growth claims remain unverified. Historical reviews are qualitative evidence only.
9. **Release dates:** local changelog closure dates differ from App Store publication dates. Use public dates for customer release notes; do not “correct” them from Git history.

## Learnings

No campaign or experiment learnings recorded yet. Product principles and founder decisions above are context, not newly validated marketing results. Add dated findings with evidence as work ships.

## Changelog

- v1 (2026-11-22) — Initial context from website positioning, founder copy, app feature references and selected code; verified public 1.15 availability, separated repository-only 1.16 work, and recorded Free/Pro conflicts and unknowns.
