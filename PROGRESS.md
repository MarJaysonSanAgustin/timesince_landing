# TimeSince Site Makeover — Progress

Plan: [PLAN.md](PLAN.md) · Content backlog: `content/_backlog.md` · Last updated: 2026-10-23

**Phases 0 and 1 are merged** (PR #3) and live. Phase 2 is next.

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
- [ ] Fix `app/terms/page.tsx` jurisdiction placeholder — ⚠️ **live on prod**, BLOCKED on §10.1
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

- [ ] **Canonical host mismatch.** `SITE.url` is `https://timesinceapp.com`, but the apex
      308-redirects to `https://www.timesinceapp.com`. So every canonical tag, `og:url`,
      JSON-LD URL, sitemap entry and the robots sitemap pointer names a host that redirects.
      Not fatal — Google follows it — but it wastes crawl budget and every canonical points at
      a redirect. Fix is either one line (`SITE.url` → www) or a Vercel domain change
      (www → apex). Needs a decision on which host is canonical.

## Phase 2 — SEO plumbing

*Ends with: every page published from here on is fully instrumented.*

- [ ] Per-page OG images + subset Nunito TTFs in `assets/fonts/`
- [ ] JSON-LD: `BreadcrumbList`, `Article` (author = **Person** → `/about`), `HowTo`, `ItemList`
- [ ] Fix `SoftwareApplication`: `LifestyleApplication`, `AggregateOffer`, `SITE.pricing`
- [ ] `feed.xml`, `not-found.tsx`, expanded `robots.ts` with named crawlers
- [ ] Rewrite `llms.txt`; **cap** `llms-full.txt`
- [ ] `CtaPlacement` union + direct App Store links with `?ct=`
- [ ] `/go/app-store` off-site short link (307, not 301)

## Phase 3 — Scenarios & Features

- [ ] Scenario schema (incl. required `evidence`) + clustered hub + `[slug]` template
- [ ] Remaining components: PracticalAnswer, ProblemFlow, SourceList, PullQuote
- [ ] `/features` hub + 11 feature pages

## Phase 4 — Tools

- [ ] `/tools` hub
- [ ] Days Since Calculator
- [ ] Days Between Dates
- [ ] Average Interval Calculator
- [ ] Measure conversion before building more

## Phase 5 — About & What's New

Blocked on user input — see PLAN.md §10.

- [ ] `/about` (founder-led, first person)
- [ ] `/whats-new` + changelog data + roadmap

## Phase 6 — Locales

Only after English content has had time to prove itself.

- [ ] Pick target locales from App Store install data
- [ ] `next-intl` with `localePrefix: 'as-needed'` (English URLs must not change)
- [ ] Localize hubs, features, tools, top ~20 guides

## Phase 7 — Deferred: Compare hub

Out of scope by decision. Revisit after Phase 4.

- [ ] `/compare` hub + 6–8 "vs" / "switch from" pages with visible `verifiedOn` dates
