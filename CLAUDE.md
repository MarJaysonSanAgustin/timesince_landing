# TimeSince homepage — working notes

Marketing site for **TimeSince**, an iOS **interval tracker** — it measures the time since
you last did something. See [PLAN.md](PLAN.md) for the makeover plan, [PROGRESS.md](PROGRESS.md)
for what's done, and **[docs/](docs/README.md) for positioning, design and research** — read
those before writing any copy.

**Positioning:** interval tracker; use “counters,” not “events.” The truth pass corrected
these in site copy. See [docs/positioning.md](docs/positioning.md).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 6 (strict) · Tailwind CSS v4
(CSS-first — **no `tailwind.config`**, tokens live in `app/globals.css` `@theme`) ·
motion · lucide-react · `next-mdx-remote/rsc` + `gray-matter` for content · zod for
frontmatter validation · Vercel.

## Conventions

- **Imports use the `@/` alias**, never relative parent paths (`@/lib/site`, not `../lib/site`).
  There is no `baseUrl` — it's deprecated in TS 6; `paths` resolves relative to `tsconfig.json`.
- **No `public/` for images.** Images live in `assets/` and are imported as ES modules so
  `next/image` gets static dimensions. `public/` is only for files needing a fixed URL and
  no optimization (QR code, `.well-known/`).
- **Server components by default.** `components/site/mobile-menu.tsx` is the only client
  component; keep it that way. Content pages ship zero animation — `motion` is for the
  homepage and feature pages only.
- **No Tailwind color literals in content files.** Content carries a zod-validated accent
  enum (`brand`/`warm`/`cool`/`calm`/`alert`/`neutral`); the CSS custom properties behind
  those six static classes do the rest. Tailwind's scanner cannot see composed class strings.
- Use flat accent blocks, warm paper, mono metadata and three inks. See [docs/design-system.md](docs/design-system.md).
- Run `npm run verify` (content, contrast, types, lint, build) before committing.
  Run `npm run check:seo` against a built server for SEO changes; see [docs/seo.md](docs/seo.md).

## The product — verified facts, use these

Source of truth is `lib/faq.ts` and `app/llms.txt/route.ts`. Do not invent capabilities.

- **The core idea:** *"TimeSince tracks the interval — time since last done."* (App Store's
  own line.) Logging a counter resets it; missing a day breaks nothing. Anti-streak,
  privacy-first, local-first.
- **They are "counters", not "events".** The app says counter 218 times to event's 30, and so
  do users. Keep this vocabulary in new copy.
- **App Store name:** "Time Since Tracker — TimeSince". **Subtitle:** "Days since counter &
  ADHD help" — the ADHD framing is the developer's own, not an inference.
- **Category: Lifestyle**, not Health.
- **It is not a habit tracker.** Habits are one use case. The listing's own examples:
  *plants watered, parents called, car oil changed, migraine logged.*
- **iOS only.** No Android, no web app. Requires **iOS 17.6+**; alarms that ring through
  silent mode and Focus need **iOS 26+**.
- **Free tier:** 3 active counters — with logging, reminders, categories, the widget, and
  iCloud sync.
- **Pricing:** Lifetime $39.99 · Yearly $14.99 · Monthly $1.99.
- **Current version 1.13.** The app ships in **English, German, Spanish and Chinese
  (Simplified + Traditional)** — the site is English-only, which is a gap, not a choice.
- **Pro** (subscription *or* one-time lifetime): unlimited counters, hidden counters, archiving,
  custom fields, NFC pairing, Siri Shortcuts, JSON export. A lapsed subscription *archives*
  counters beyond 3 — it never deletes them.
- **Privacy:** local DB encrypted with **SQLCipher**, key in the iOS Keychain. Optional sync
  goes to the user's **own** private iCloud. There is no developer-operated server.
  **iCloud sync is free for everyone** and off until switched on.
- Purchases via **RevenueCat**. Support/feedback via **UserJot**. NFC tags are **NTAG215**.
- **Rating: 5.0 from 6 ratings.** Far too few to publish as `aggregateRating`.
- 11 features: counter customization · rhythm analytics (average intervals, trend charts) ·
  hidden counters behind FaceID · custom logging fields (number/text/photo + calculator) ·
  timeline · home-screen widget (one-tap log) · Siri/Shortcuts/Action Button · NFC tap-to-log ·
  Quitting mode (counter climbs while abstaining; a reset carries no penalty) · up to 5
  reminders per counter · encrypted iCloud backup.

## Publishing a page

```bash
npm run content:new -- guide "How to track an irregular chore"   # scaffold (draft: true)
npm run dev                                                       # drafts render in dev
npm run content:check                                             # cross-file checks
npm run verify                                                    # check + tsc + lint + build
```

Then flip `draft: false` and commit. The route, the hub card, `sitemap.xml`, `llms.txt`,
`llms-full.txt`, related-page cards, breadcrumbs and the JSON-LD all pick it up with **no
other file edited**. If publishing ever needs an edit somewhere else, that is a bug in the
pipeline, not a step in the workflow.

Two layers of validation, split for a reason:
- **zod runs during `next build`.** The loader is on the build's critical path, so it cannot
  be skipped. It can't run in a plain node script — the schema reaches `lib/features.ts`,
  which imports PNGs and only resolves inside a bundler.
- **`content:check` does what one page render cannot:** duplicate slugs, titles, descriptions
  and primary keywords; `related` and body links that don't resolve; future or inverted
  dates; rendered word count; a stale image manifest; and near-duplicate bodies (Jaccard
  over 5-word shingles, failing above 60%).

Images: drop files under `assets/content/`, run `npm run assets:sync`, and reference the
**key** in frontmatter. A typo fails the build. A page with no image still looks finished —
it falls back to the linked feature's screenshot, then to an accent panel.

## Writing content

Every guide and scenario must:

1. **Answer its question in the first 90 words**, specifically.
2. State **what TimeSince does not solve.** This is the most trust-building module on the site.
3. Carry real `sources` and a disclaimer for anything health-adjacent — medication, recovery,
   and the ADHD clusters are **YMYL**. Never imply a medical outcome.
4. Exist for a reason. Scenarios require an `evidence` line naming why the page exists
   (a UserJot ticket, an App Store review, a real thread). If you can't name it, don't write it.

Never draft the `answer` box or the `sources` list without checking them.

## Voice

The app is gentle and permission-giving; it removes obligation rather than adding motivation.
Match it. From the app's own strings:

> "When it's been a while, TimeSince says so gently: ready when you are. No red, no catching up."
> "Nothing is lost — bring one back whenever you want it again."
> "A reminder here asks nothing of you."

No urgency, no exclamation-mark enthusiasm, no shame. See [docs/positioning.md](docs/positioning.md).

## Known open items

`app/terms/page.tsx` ships a `[jurisdiction to be confirmed]` placeholder — needs the real
jurisdiction from the owner. Full list in [docs/site-audit.md](docs/site-audit.md) and
PLAN.md §10.
