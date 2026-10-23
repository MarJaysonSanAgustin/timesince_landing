# Research

Evidence base for positioning and content. Gathered 2026-10-23 from the App Store listing, the public feedback board, and the app's own strings. **Anything not in here is a hypothesis, not a fact.**

---

## App Store

[apps.apple.com/us/app/habit-tracker-timesince/id6769251517](https://apps.apple.com/us/app/habit-tracker-timesince/id6769251517)

| | |
|---|---|
| Name | **Time Since Tracker — TimeSince** |
| Subtitle | **Days since counter & ADHD help** |
| Category | **Lifestyle** (single) |
| Version | **1.13**, updated 2026-10-22 |
| Rating | **5.0 from 6 ratings** |
| Compatibility | **iPhone only**, iOS 17.6+ |
| Size | 97.3 MB |
| Languages | **English, German, Spanish, Chinese (Simplified & Traditional)** |
| Age rating | 4+ |
| Accessibility | Dark Interface, Sufficient Contrast |
| Seller | Mar San Agustin · © 2026 TimeSince App |

### Pricing — the site has never stated this

| Product | Price |
|---|---|
| TimeSince Pro Lifetime | **$39.99** |
| TimeSince Pro Yearly | **$14.99** |
| TimeSince Pro Monthly | **$1.99** |

Needed for the `AggregateOffer` schema fix in Phase 2, and arguably for a pricing page.

### On `aggregateRating`

**Six ratings is far too few to publish.** The plan already flagged self-reported ratings as a policy risk; at n=6 it is also just weak. Revisit at a few hundred.

### Privacy nutrition label

Only **Purchases → Purchase History**, "Data Not Linked to You", for "Other Purposes". No tracking, no identifiers, no usage data. This is a genuinely strong claim and the site underuses it.

### The two public reviews

> **"Easy to use and helpful"** — Aduh Q, Aug 19
> "The graph that shows how often a habit has done is very helpful."
> "The $40 lifetime purchase was a no-brainer for me."

> **"great app!"** — getawayshootoutpro, Aug 4
> "this app has a great visual design language, as well as a very generous free tier."

Both are usable as testimonials with attribution. Note what they praise: **the rhythm graph**, **the lifetime price**, **the visual design**, and **the free tier**.

---

## Release history

From the App Store "What's New". **This is the source for a `/whats-new` page** — thirteen dated releases is a real changelog.

| Version | Date | Theme |
|---|---|---|
| **1.13** | Oct 22 | 38 illustrated milestone badges in four families; countdown + upcoming-list reminder widgets; duplicate a counter; new first run |
| 1.12 | Oct 15 | iCloud sync crash fix; onboarding copy and translations |
| **1.11** | Oct 12 | **The "ticket-inspired" design.** Six paper colours, four background patterns; receipts on create, log and quit reset; slide-to-confirm reset; full-page Explore |
| 1.10 | Oct 6 | German, Spanish, Chinese (Simplified + Traditional) |
| 1.9 | Sep 20 | Calmer Timeline with calendar; multi-counter widgets (medium 4, large 8); Lock Screen widgets; week start choice |
| 1.8 | Sep 3 | 162 counter ideas in the + flow; Stats tab; quit counters get their own section; real units instead of scores |
| 1.7 | Aug 24 | Me tab; "Consistency" dial replaces a score; Add to Siri per counter |
| 1.6 | Aug 22 | Multi-year calendar; share card; confetti on log; printed receipt on quit reset; NFC logs without opening a page |
| 1.5.1 | Aug 13 | **NFC tag logging; Siri Shortcuts; optional private iCloud sync; "Erase Everywhere"** |
| 1.4 | Jul 20 | "More Premium Experience" |
| 1.3 | Jul 1 | Onboarding with curated templates; notes free for everyone |
| 1.2 | Jun 29 | *(near-identical text to 1.3 — verify in App Store Connect)* |
| 1.1 | Jun 19 | **Quit Habit Mode**; Splash of Colour; share milestones |
| 1.0 | May 29 | *(listing shows 1.13's text here — an extraction artifact; get the real notes from App Store Connect)* |

Two entries need checking against App Store Connect before publishing: **1.0** and **1.2 vs 1.3**.

---

## Feedback board

[timesince.userjot.com](https://timesince.userjot.com)

**Set expectations honestly: the board is small.** Nine feature posts total, **zero bug reports**, single-digit vote counts, all posts between Sep 8 and Oct 16.

> ⚠️ **Correction, 2026-10-23.** The vote counts first recorded here (33, 22, 11) were wrong. The
> listing renders the count twice — "3 3" — and that was read as "33". Verified on the post
> pages: the household request has **3 votes**, not 33. Divide every figure below by ten, and
> prefer citing the request and the reply over a number that changes anyway. The developer replies to every one and moves statuses promptly — that responsiveness is the real story, not the volume.

This matters for the content plan: **there is not enough user-generated material here to source 40 scenario pages from.** Scenarios will need another evidence source, or the `evidence` field requirement will block them. See [site-audit.md](site-audit.md).

### Roadmap

- **Planned:** nothing
- **In progress:** lock-screen widget customisation · duplicate an existing counter
- **Done:** simplify and categorise icons · multiple trackers in one widget · "Start On" date and time

### Requests

| Title (verbatim) | Votes | Status |
|---|---|---|
| "Collaborate/Share Categories or Entire Households" | — | Pending — **declined for now** |
| "Ability to duplicate an existing counter" | — | In progress |
| "Customisability to the lock-screen widget" | — | In progress |
| "Streaks on habits dashboard" | — | Reviewing |
| "Simplify and categorize icons" | — | Completed |
| "Multiple tracker in one widget" | — | Done |
| "'Start On' date and time" | — | Done |
| "ability to change home screen icon color" | ~11 | Pending |
| "improvements" | ~11 | Pending |

Vote counts removed: the run-together markup made them unreliable, and they were wrong by a factor of ten. Cite the post, not the count.

### Two replies worth quoting on the site

On declining household sharing — this is a *feature* of the positioning, not an apology:

> "Sharing a household between people needs an internet service in the middle, and that's a big change to how the app keeps your data private, so we're not adding it right now."

On streaks, in response to a user asking for them:

> "TimeSince intentionally avoids daily streaks for habits you're building. I want you to be able to come back after a day or a week without feeling like you've lost what you already did."

That second one is the clearest articulation of the product's philosophy anywhere, and it comes from a real exchange.

### Verbatim user language

Users say **counter**, consistently:

> "Would love the option to duplicate an existing counter, but clear all events"

> "pick what event shows up on the lock-screen widget?"

> "so many icons that look very similar to each other, which makes the selection screen feel a bit cluttered"

> "easier to pick at a glance, rather than having to search using keywords"

> "a 'household' of stuff that has to get done" … "delegate or receive notifications when done by other parties"

> "Seeing my current streak and how consistently I've been doing a habit would be much more motivating."

Praise is short and unspecific — "Love the app", "Love your app! ❤", "Great app!", "So far, I really love the app!"

### What the board does *not* show

No mentions of medications, car maintenance, pets, plants, relationships, or health tracking — despite those being in the App Store description. No evidence about caregivers, recovery, parents or professions. **Do not write scenario pages claiming these are common use cases.** The App Store description's own examples are fair game; invented user stories are not.

---

## From the app's code

- **Free tier: 3 counters.** Confirmed in the localisation strings across all locales.
- **"Counter" beats "event" 218 to 30** in the English strings. The site has this backwards.
- **1,446 English strings**, with German, Spanish and two Chinese variants alongside — the app is already a five-locale product while the site is one.
- The app has its own copy drift: `freeSelectLimit` still says *"up to 3 events"*.
