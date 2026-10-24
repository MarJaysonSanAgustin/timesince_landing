# TimeSince Site Makeover — Progress

Plan: [PLAN.md](PLAN.md) · Content backlog: `content/_backlog.md` · Last updated: 2026-10-23

**Phases 0 and 1 are merged** (PR #3) and live. Phase 2 is implemented and locally verified on `feat/seo-plumbing`; deployment is not yet verified.

**Rules:** a box is checked only when the thing is **verified**, not when it's written.
`GATE` lines are hard stops — the next phase does not start until they pass.

---

## Phase 0 — Upgrade & plumbing

- [x] Next 15.5 → 16.4, React 19.3, TS 6.0, ESLint 10, motion 14, lucide 1.x, Tailwind 4.3
- [x] Align `eslint-config-next` with Next (was a major ahead of the framework)
- [x] Remove dead deps: `@google/genai`, `@hookform/resolvers`, `class-variance-authority`, `tw-animate-css`, `firebase-tools`, `autoprefixer`
- [x] Add `zod` as a **direct** dependency (currently only transitive)
- [x] Strip AI Studio residue: `metadata.json`, `DISABLE_HMR` webpack block, `picsum.photos` pattern, package name
- [x] Drop `eslint.ignoreDuringBuilds`
- [x] Decide the `@/*` alias — **adopted**, all 13 files converted off relative parent paths
- [x] Untrack the committed `.DS_Store` files
- [x] Delete orphaned `assets/logo.svg`
- [x] Fix `app/terms/page.tsx` jurisdiction placeholder — **the Philippines**, via `SITE.jurisdiction`
- [x] Add `CLAUDE.md` (frontmatter contract, voice rules, verified product facts)
- [x] Add `.github/workflows/ci.yml` running `npm run verify`
- [x] **GATE:** build + dev pass under Turbopack; all 8 routes render; icons & motion verified
- [x] **GATE:** `next-mdx-remote/rsc` proven working under Next 16

### Also done in Phase 0 (found during the upgrade)

- [x] Remove `baseUrl` from `tsconfig.json` — deprecated in TS 6, hard error in TS 7
- [x] Remove `autoprefixer` from `postcss.config.mjs` — Tailwind v4 prefixes itself (broke the build)
- [x] Drop `transpilePackages: ['motion']` — unnecessary with motion 14
- [x] Delete unused `hooks/use-mobile.ts` and the dead `LogoFullSvg` alias
- [x] Add `outputFileTracingIncludes` for `assets/fonts/**` + `content/**` (ahead of Phase 1)
- [x] Add `.claude/launch.json` for the dev server

**Verified:** `tsc --noEmit` clean · `eslint .` 0 errors (6 `next/link` warnings — Phase 1 fixes these)
· `next build` passes on Turbopack, 17 static pages · all 10 routes return 200 · 18 Lucide icons
resolve and render · motion 14 `whileInView` resolves to opacity 1 · MDX posts prerender as SSG.

**Note:** `npm audit` reports 12 transitive dev-only advisories (babel, browserslist, postcss-selector-parser,
the eslint-plugin chain). All are build-time CPU/DoS classes with no untrusted input in a static build,
and all sit under packages already at their latest version. Not fixable without `--force` downgrades.

## Phase 1 — Content engine

*Ends with: daily publishing is possible.*

- [x] `lib/content/{schema,load,labels,related,index}.ts` + zod schemas
- [x] Loader: module-scope memoization, `_`-prefix exclusion, aggregated errors
- [x] Locale-scoped paths (`content/en/…`), string dictionary, `localizedPath()`
- [x] Design tokens + the six-accent CSS custom-property system
- [x] Extract header / footer / mobile-menu; fix the menu-stays-open bug; switch to `next/link`
- [x] `lib/features.ts` + `FeatureRow` (`app/page.tsx` 463 → 254 lines; homepage gains 11 internal links)
- [x] Shared content components (Breadcrumbs, AnswerBox, StepList, FaqAccordion, …)
- [x] `/guides` hub + `[slug]` template
- [x] Migrate the 3 blog posts; delete `app/blog`; add `/blog/*` redirects
- [x] Dynamic sitemap with real `lastModified`
- [x] Image manifest generator (`scripts/gen-image-manifest.ts`) + 3-tier visual fallback
- [x] Near-duplicate lint (shingle/Jaccard over bodies)
- [x] `outputFileTracingIncludes` + `dynamicParams = false` — **verified on the real deploy**: the
      guide renders in full (answer box, HowTo + 5 steps, gives grid), so the runtime `fs` read
      resolves inside the standalone bundle, and an unknown slug 404s rather than attempting one
- [x] `content:new` scaffold + `content/_templates/`
- [x] **GATE:** publish one real guide end-to-end with zero manual edits outside its own file

### Also done in Phase 1

- [x] `content:check` for the cross-file checks zod structurally cannot do: duplicate
      slugs/titles/descriptions/primary keywords, unresolved `related` and body links,
      future or inverted dates, rendered word count, stale image manifest, near-duplicates
- [x] `draft` / `publishAt` — drafts render in `dev` (with their validation errors) and are
      skipped entirely at build, so a half-written file never breaks a build
- [x] `lib/cta.ts` — `CtaPlacement` union; a mistyped campaign tag fails `tsc`. Direct App
      Store links with `?ct=`, no redirect hop on the one click that matters
- [x] `llms.txt` rewritten to index guides by cluster; `llms-full.txt` capped at 20 full
      bodies with summaries after; both `force-static`
- [x] Breadcrumbs, FAQ and StepList emit their own JSON-LD, so the schema and the visible
      content cannot drift apart

**Verified:** `npm run verify` passes · 4 guides prerender as SSG · `/blog` and `/blog/:slug`
308-redirect · the new guide emits BreadcrumbList + FAQPage + HowTo · sitemap and llms.txt
picked the new guide up with **zero manual edits** · all page modules render in the browser.

**Fixed during verification:** `seoTitle` was hitting the layout's `%s | TimeSince` template
and rendering the suffix twice.

### Found in production after merge

- [x] **Canonical host mismatch — fixed 2026-10-23.** Was: `SITE.url` was the apex, but the apex
      308-redirects to `https://www.timesinceapp.com`. So every canonical tag, `og:url`,
      JSON-LD URL, sitemap entry and the robots sitemap pointer names a host that redirects.
      Not fatal — Google follows it — but it wastes crawl budget and every canonical points at
      a redirect. Fix is either one line (`SITE.url` → www) or a Vercel domain change
      (www → apex). Needs a decision on which host is canonical.

## Phase 1.5 — Truth & identity pass  ⬅ **inserted 2026-10-23, blocks Phase 2**

Knowledge gathering found the site is describing a product that has moved on, and that its
visuals contradict the app's own design system. See [docs/](docs/README.md).

**Copy & metadata truth pass**
- [x] Stop calling it a habit tracker — `SITE.title`, `fullName`, `description`, keywords, OG
- [x] Rename **events → counters** everywhere (copy, `lib/faq.ts`, llms.txt, content schema)
- [x] `applicationCategory` → `LifestyleApplication` (App Store confirms)
- [x] `AggregateOffer` with the real prices: $0 / $1.99 / $14.99 / $39.99
- [x] Widen the examples: plants watered, parents called, car oil changed, migraine logged
- [x] Raise ADHD out of a footnote — it is the App Store subtitle
- [x] Match the app's voice (gentler, obligation-removing)
- [x] Decide the canonical host — **www**, matching production; guarded by `check:seo`
- [x] Fix the terms jurisdiction — **the Philippines**

**Verified 2026-10-23:** build green, schema renders `LifestyleApplication` + `AggregateOffer`
(4 offers, no `aggregateRating`), zero "events" left in rendered copy, 13 "counter" mentions
on the homepage. Legal boilerplate preserved; the `an counter` article bug the rename
introduced was caught and fixed.

**Design translation** — must land before Phase 2 generates OG images
- [x] Replace gradient accents with **flat blocks** (ADR-012 rule 8 forbids gradients)
- [x] Paper ground: warm `#F1EFEA` + 16pt dots, replacing plain white
- [x] Add the **mono voice** for counts, dates, intervals, serials
- [x] Adopt the three inks (ink / muted Lc67 / faint Lc45), drop ad-hoc greys
- [x] Demote purple to an accent; no large purple fills
- [x] Ticket components: block │ perforation │ stub
- [x] Drop `prose-purple` and the gradient OG image

**Verified 2026-10-23:** `npm run verify` clean. Zero legacy colour utilities and zero
gradients left in `app/` or `components/`. `lib/apca.ts` matches the published APCA reference
values, and the derived light muted (`#6C6870`) lands within two points of the `#6E6880` the
app's own ADR cites. `npm run check:contrast` passes all 15 rendered pairs, surfacing one
inherited limitation: `warm` (#FB8C00) reads at Lc 56.3, so it is for headings and icons only.

Still open from this pass:
- [x] Dark mode — follows the system, inks derived the same way, 24 contrast pairs gated
- [ ] A web face closer to the app's iOS system sans (Nunito is friendly, not the app's voice)
- [ ] Whether to offer the paper picker on the web, or ship warm + dots only

**Now unblocked by research**
- [x] `/whats-new` — 13 dated releases, transcribed directly from the App Store listing
- [x] Pricing in the FAQ and schema — a dedicated pricing page is still open
- [ ] Testimonials from the two App Store reviews


## Phase 2 — SEO plumbing

*Ends with: every page published from here on is fully instrumented.*

- [x] Per-page OG images for home, guides hub and each published guide
- [x] Local Nunito and JetBrains Mono TTFs with OFL licenses (full fonts, 237,620 bytes combined; subsetting deferred)
- [x] JSON-LD: `BreadcrumbList`, `Article`, `HowTo`, `ItemList`; script-safe serialization
- [x] `SoftwareApplication`: `LifestyleApplication`, `AggregateOffer`, `SITE.pricing` (completed in truth pass)
- [x] `feed.xml`, `not-found.tsx`, expanded `robots.ts` with named crawlers
- [x] `llms.txt` index and capped `llms-full.txt`; full entries now include the answer box
- [x] `CtaPlacement` union + direct App Store links with `?ct=` including homepage/header
- [x] `/go/app-store` off-site short link (307, per-request allowlisted campaigns, no-store)
- [x] Built-server SEO smoke checks added to CI

**Verified locally 2026-10-23:** `npm run verify` and `npm run check:seo` pass.
Four guides and six distinct 1200×630 PNGs; Article/ItemList ordering, RSS, real 404s,
robots rules and campaign redirects checked over HTTP. Guide OG and custom 404 visually inspected.
RSS also parsed as XML. Existing warm-accent contrast warning remains.

See [docs/seo.md](docs/seo.md) for route behavior and verification. Remaining follow-ups:
canonical host decision, `/about` author URL destination (Phase 5), font subsetting, and deployment checks.

## Phase 3 — Scenarios & Features

- [x] Scenario schema (incl. required `evidence`) + clustered hub + `[slug]` template
- [x] Remaining components: PracticalAnswer, ProblemFlow, SourceList, PullQuote
- [x] `/features` hub + 11 feature pages

**Shipped 2026-10-23 (PR #7).** 7 guides and 6 scenarios live, every scenario tied to a
specific feedback-board post. `check:seo` covers all three sections; `validate-content.ts`
covers scenarios. Clusters still empty: `health`, `relationships` — no evidence yet.

## Phase 4 — Tools

- [x] `/tools` hub
- [x] Days Since Calculator
- [x] Days Between Dates
- [x] Average Interval Calculator
- [ ] Measure conversion before building more — **do this before tool #4**

## Phase 5 — About & What's New

Blocked on user input — see PLAN.md §10.

- [x] `/about` (founder-led, first person) — published, with Person schema
- [x] `/whats-new` + changelog data + roadmap

## Phase 8 — Images  ⬅ **blocked on capture; see [docs/screenshot-brief.md](docs/screenshot-brief.md)**

The 11 screenshots were committed 2026-08-10. The ticket redesign shipped in v1.11 on
2026-10-13, and the Stats tab in v1.7 on 2026-08-24 — which is missing from them, dating
them precisely. They show the gradient FAB, square cards and cool-grey ground the app no
longer has. **The site's own design now matches the app more closely than its screenshots do.**

- [ ] Recapture the 11 feature screenshots (owner — needs the app with believable data)
- [ ] Add a ticket receipt capture — the most distinctive thing the app does, shown nowhere
- [ ] Add milestone badges from v1.13 — newest visible feature, shown nowhere
- [ ] Decide what fills the pages that still have no image at all

## Phase 6 — Locales  ⬅ **recommendation inverted 2026-10-23**

The plan said "English first, prove it ranks." That assumed an English-only app. **It is not** —
v1.10 shipped German, Spanish and Chinese (Simplified + Traditional), so those users exist now
and land on an English-only site. This is a product/marketing gap, not a speculative SEO bet.
Consider moving this much earlier.

- [x] ~~Pick target locales~~ — already decided by the app: **en, de, es, zh-Hans, zh-Hant**
- [ ] `next-intl` with `localePrefix: 'as-needed'` (English URLs must not change)
- [ ] Localize hubs, features, tools, top ~20 guides

---

## Dropped

- **Compare hub** (`/compare`, "vs" and "switch from" pages). Deferred at planning, and
  removed outright on 2026-10-24. Not a capacity decision — the site now has its own
  argument to make and does not need to borrow competitors' names to make it.
