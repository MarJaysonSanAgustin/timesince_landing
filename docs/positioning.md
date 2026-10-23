# Positioning

**Status:** current as of 2026-10-23, from the App Store listing, the app's own strings, and the public feedback board. Sources in [research.md](research.md).

---

## The site is describing an app that no longer exists

`lib/site.ts` calls TimeSince a *"wellness-oriented habit, routine, and chore tracker"* and the homepage H1 is *"Consistency without the anxiety."* The App Store listing says something different:

| | App Store (live) | This site (live) |
|---|---|---|
| Name | **Time Since Tracker — TimeSince** | "TimeSince: Habit & Chore Tracker" |
| Subtitle | **Days since counter & ADHD help** | — |
| Opening line | **"Track the space between moments."** | "Consistency without the anxiety." |
| Category | **Lifestyle** | declared `HealthApplication` in JSON-LD |

The App Store name does not contain the word "habit". The site's `<title>`, keywords, JSON-LD and App Store URL slug all still lead with it.

## What the product actually is

> **TimeSince tracks the interval — time since last done.**

That is the App Store's own one-liner, and it is the whole product. Everything else is a consequence of it: no streaks, no due dates, no failure state. The app answers one question — *when did I last do this?* — for anything that recurs without a fixed schedule.

The listing's own examples are the clearest statement of range:

> Plants watered, parents called, car oil changed, migraine logged.

Four examples, four different categories, and **not one of them is a habit**. "Habit tracker" is one use case out of many, and framing the whole product around it throws away the rest.

### The four problems it names

Taken from the listing's own "The Problem TimeSince Solves" section — these already match the site's four problem cards, which is the one part of the current copy that holds up:

1. **"When Did I Last…?" guesswork** — the core problem
2. **Rigid tracker anxiety** — broken daily streaks
3. **Scattered information** — notebooks and spreadsheets
4. **Privacy concerns** — logging sensitive things in cloud trackers

## Terminology: it is a *counter*, not an *event*

The site says "events" throughout — copy, FAQ, `llms.txt`, and the content schema. The app says **counter**:

| Term | Occurrences in the app's English strings |
|---|---|
| counter / counters | **218** |
| event / events | 30 |

Users follow the app, not the site. Every quote on the feedback board says "counter":

> "Would love the option to duplicate an existing counter, but clear all events"

This is not cosmetic. It is the noun the product is built around, the word users search for, and the word they will type into a support request. **The site should say "counter" everywhere.**

One caveat: the app has its own leftover drift — `freeSelectLimit` still reads *"You can only select up to 3 events on the free tier."* That is a bug in the app's copy, not a reason to keep "events" on the site.

## Who it is for

Evidence is thinner than the enthusiasm suggests — be careful not to over-claim here.

**Supported by evidence:**
- **ADHD** — the App Store *subtitle* is "Days since counter & ADHD help". That is the developer's own deliberate positioning, in the single most valuable piece of listing metadata.
- **Shared households** — the highest-voted feature request is household/chore sharing.
- **People with many counters** — the duplicate-counter request comes from someone with several in one category.

**Not yet evidenced** — the feedback board mentions none of these, so treat them as hypotheses for content, not claims for the homepage: caregivers, people in recovery, homeowners, pet owners, parents.

## Voice

The app has a distinctive voice and the site does not currently match it. From the app's own strings:

> "When it's been a while, TimeSince says so gently: ready when you are. No red, no catching up."

> "Counters you have put away. Nothing is lost — bring one back whenever you want it again."

> "A reminder here asks nothing of you. It arrives with the time you have counted so far, whenever suits you."

> "No counter here goes by that. Try a shorter word, or part of one."

The pattern: **gentle, permission-giving, never demanding.** It removes obligation rather than adding motivation. No exclamation-mark enthusiasm, no urgency, no shame. "Whenever you have a free moment" appears repeatedly.

The site's current copy is louder and more conventional than this — "Say goodbye to broken streaks and stressful notifications" sells *against* something, where the app simply declines to do it.

The developer's own words on the feedback board are the best statement of the philosophy, and are quotable:

> "TimeSince intentionally avoids daily streaks for habits you're building. I want you to be able to come back after a day or a week without feeling like you've lost what you already did."

> "TimeSince has no server of its own on purpose. Your counters stay encrypted on your phone and, if you turn it on, in your own private iCloud."

## What this means for the site

1. **Lead with the interval, not the habit.** "When did I last…" is the hook; habits are one answer.
2. **Rename throughout:** counters, not events.
3. **Widen the examples.** Plants, parents, car, migraine — the listing's own four do more work than any abstraction.
4. **Keep ADHD prominent.** It is in the App Store subtitle; it should not be a footnote on the site.
5. **Match the voice.** Quieter, gentler, obligation-removing.
6. **Fix the metadata:** `SITE.title`, `SITE.description`, `SITE.fullName`, the keyword list, and `applicationCategory` (→ `LifestyleApplication`, which the App Store confirms).
