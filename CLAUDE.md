# TimeSince homepage — working notes

Marketing site for **TimeSince**, an iOS habit/chore/routine tracker. See [PLAN.md](PLAN.md)
for the content/SEO makeover plan and [PROGRESS.md](PROGRESS.md) for what's actually done.

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
- Run `npm run verify` (`tsc --noEmit && eslint . && next build`) before committing.

## The product — verified facts, use these

Source of truth is `lib/faq.ts` and `app/llms.txt/route.ts`. Do not invent capabilities.

- **The core idea:** it measures *elapsed time since* you last did something, not daily
  streaks. Logging an event resets its counter; missing a day breaks nothing. Anti-streak,
  anti-guilt, privacy-first, local-first. Strong ADHD-friendly angle.
- **iOS only.** No Android, no web app. Requires **iOS 17.6+**; alarms that ring through
  silent mode and Focus need **iOS 26+**.
- **Free tier:** 3 active events — with logging, reminders, categories, the widget, and
  iCloud sync.
- **Pro** (subscription *or* one-time lifetime): unlimited events, hidden events, archiving,
  custom fields, NFC pairing, Siri Shortcuts, JSON export. A lapsed subscription *archives*
  events beyond 3 — it never deletes them.
- **Privacy:** local DB encrypted with **SQLCipher**, key in the iOS Keychain. Optional sync
  goes to the user's **own** private iCloud. There is no developer-operated server.
  **iCloud sync is free for everyone** and off until switched on.
- Purchases via **RevenueCat**. Support/feedback via **UserJot**. NFC tags are **NTAG215**.
- 11 features: event customization · rhythm analytics (average intervals, trend charts) ·
  hidden events behind FaceID · custom logging fields (number/text/photo + calculator) ·
  timeline · home-screen widget (one-tap log) · Siri/Shortcuts/Action Button · NFC tap-to-log ·
  Quitting mode (counter climbs while abstaining; a reset carries no penalty) · up to 5
  reminders per event · encrypted iCloud backup.

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

## Known open items

`app/terms/page.tsx` ships a `[jurisdiction to be confirmed]` placeholder — needs the real
jurisdiction from the owner. See PLAN.md §10 for the rest.
