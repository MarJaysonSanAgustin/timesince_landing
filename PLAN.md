# TimeSince Website Makeover — Content Engine + SEO Growth Plan

## Context

`timesinceapp.com` is currently a single-page marketing site: one 463-line homepage, a FAQ page, a 3-post blog, and two legal pages. Eight routes total. The SEO fundamentals are quietly good for a solo project — per-page canonicals, a JSON-LD graph, `llms.txt` and `llms-full.txt` — but there is almost no content for any of it to point at, so the site can only ever rank for the brand name itself.

The inspiration, [vaultaire.app](https://vaultaire.app/), is the same shape of business (one developer, one privacy-focused iOS app) running the opposite strategy: ~235 English pages across five content hubs, with every page targeting a specific long-tail question a real person typed into a search box. Its header nav is product-only; the content hubs live in the footer and exist purely to be found. That is the model to adopt.

The goal is a **content engine**: author a new page by dropping one MDX file into a folder, and have the sitemap, `llms.txt`, RSS, breadcrumbs, OG image, and internal links all update themselves. No per-post manual edits. Then publish daily against a keyword backlog.

**Decisions already made** (confirmed with the user):
- `/blog` folds into `/guides`; the 3 existing posts convert and `/blog/*` redirects.
- **Claude drafts, user edits and approves.** Tooling must optimize for review speed, not just authoring.
- **Tools hub: yes. Compare hub: no** (deferred — see Phase 7).
- **English content ships first, but i18n is designed and built now** — see §7. The structural decisions (locale-scoped content paths, a string dictionary, a path helper) cost nothing today and are expensive to retrofit across 100+ pages later.
- **Dependencies get upgraded first** — see §0. The repo has a real version mismatch in its tree today.

---

## Why the Tools hub is a stronger play here than it is for Vaultaire

Worth stating up front, because it changes the phasing. Vaultaire's free tools (QR readers, image converters) are only loosely related to a photo vault — generic link bait.

TimeSince's tools *are the product's core math*. "How many days since [date]" is a high-volume evergreen query family that maps exactly onto the app's one idea. A `/tools/days-since` calculator is simultaneously the best possible top-of-funnel asset and an honest demo of what the app does. These are cheap to build (pure client-side date math, no API), and every one of them ends with "the app does this continuously, for everything you track."

This is the single highest-ROI item in the plan and should not be deferred to the end.

**The honest counterargument**, since it's a real one: date-calculator traffic is low-intent. Someone computing days between two dates is not shopping for a habit tracker, so expect good traffic and poor conversion. The case for building them anyway is topical authority and links, not installs — and they localize almost for free (§7), being nearly all UI and almost no prose. Build 3–4, measure, and stop there if they don't earn their keep.

---

## 0. Dependency upgrade and technology plumbing

This lands **before** any content work. Upgrading under 8 routes is cheap; upgrading under 110 is not.

### There is already a mismatch in the tree

`npm ls` reports `eslint-config-next@16.0.8` installed alongside `next@15.5.18` — the lint config is a full major ahead of the framework. That inconsistency exists today, so the Next 16 upgrade isn't just chasing a version number; it realigns something already broken.

### Verified current versions (checked against the registry, not assumed)

| Package | Declared | Actually installed | Latest | Jump |
|---|---|---|---|---|
| `next` | `^15.4.9` | 15.5.18 | **16.4.2** | 1 major |
| `react` / `react-dom` | `^19.2.1` | 19.2.6 | 19.3.1 | minor |
| `typescript` | `5.9.3` | 5.9.3 | **7.0.2** | 2 majors |
| `eslint` | `9.39.1` | 9.39.1 | **10.13.0** | 1 major |
| `eslint-config-next` | `16.0.8` | 16.0.8 | 16.4.2 | minor |
| `motion` | `^12.23.24` | 12.40.0 | **14.6.0** | 2 majors |
| `lucide-react` | `^0.553.0` | 0.553.0 | **1.61.0** | 0.x → 1.x |
| `tailwindcss` / `@tailwindcss/postcss` | `4.1.11` | — | 4.3.3 | minor |
| `@tailwindcss/typography` | `^0.5.19` | — | 0.5.20 | patch |
| `@types/node` | `^20` | — | `^24` | align to runtime |
| `next-mdx-remote` | `^6.0.0` | — | 6.0.0 | already current |
| `gray-matter`, `@vercel/analytics` | — | — | current | none |

Local runtime is Node **v24.14.1** / npm 11.11.0. Next 16 needs `>=20.9.0` and ESLint 10 needs `^20.19 || ^22.13 || >=24` — both satisfied, no Node change required.

### Compatibility, verified via peer dependencies

- **Next 16.4.2** peers accept `react ^19.0.0` — React 19.3.1 is fine.
- **motion 14.6.0** peers: `react ^18 || ^19` ✓. Likely makes `transpilePackages: ['motion']` unnecessary — drop it and confirm.
- **lucide-react 1.61.0** peers: `react ^16.5.1 … || ^19` ✓. A 0.x → 1.x bump on an icon library is mostly a stability signal, but **icon names can change** — grep every import and verify each renders.
- **next-mdx-remote 6.0.0** peers are only `react >=16`, so it installs cleanly. It is already the latest version.

### Decisions to make during the upgrade

**TypeScript: go to 6.0.3, not 7.0.2.** TS 7 is the native compiler rewrite and is tagged `latest`, but it's a two-major jump landing on a brand-new compiler implementation. TS 6.0.3 is the bridge release and gets the project current with far less risk. Revisit 7 as a fast-follow once the content engine is stable — the build-speed win is real but it is not worth debugging a compiler port in the same change as a framework major.

**Turbopack is the default in Next 16, for `dev` and `build`.** This directly affects two things in [next.config.ts](next.config.ts): the `webpack: (config, {dev}) => ...` block (AI Studio's `DISABLE_HMR` hack) will be ignored or warn, and the `picsum.photos` remote image pattern is dead. Both are already slated for deletion in §3 — Next 16 just makes it mandatory rather than tidy.

**Verify `next-mdx-remote/rsc` against Next 16 + Turbopack as the very first step of Phase 1.** It's the single highest-risk dependency in the whole plan, because the entire content engine sits on it and it wraps MDX internals. It stays the right choice — it's what lets MDX live in `content/` outside the `app/` tree, which `@next/mdx` (file-per-route) cannot do. But if it breaks, the documented fallback is compiling with `@mdx-js/mdx`'s `evaluate()` directly, which is what `next-mdx-remote` wraps anyway. **Prove this works before writing 100 MDX files on top of it.**

**Add `zod` (4.6.7)** as the frontmatter validation dependency — see §2.

### Plumbing cleanup bundled into this phase

- **Remove dead deps:** `@google/genai`, `@hookform/resolvers`, `class-variance-authority`, `tw-animate-css`, `firebase-tools`, and `autoprefixer` (Tailwind v4's PostCSS plugin handles this itself). Also `clsx` + `tailwind-merge` if `cn()` stays unused.
- **Rename the package** from `"ai-studio-applet"` to `"timesince-homepage"`.
- **Drop `eslint: { ignoreDuringBuilds: true }`** from `next.config.ts`. With daily publishing the build is the only safety net.
- **Delete `metadata.json`** (an AI Studio manifest, unused by Next).
- **Fix the `@/*` tsconfig alias** — it's declared and never used. Either adopt it in new code or remove it; mixed relative and aliased imports across 100+ files is worse than either.
- **Add `.DS_Store` cleanup** — committed in 4 directories despite being gitignored.
- **Add scripts:** `content:check`, `new:guide`, `new:scenario` (see §6).
- **Add a `CLAUDE.md`** — none exists. With Claude drafting content daily, the frontmatter contract, cluster list, voice rules, and verified product facts belong in a file the model reads every session.

### Upgrade verification gate

`npm run build` must pass with `ignoreDuringBuilds` removed, `npm run dev` must render all 8 existing routes under Turbopack, and the homepage's Motion animations and all Lucide icons must be visually confirmed. **This phase ships and is verified on its own, before any content work starts.**

---

## 1. Information architecture

### New route map

| Route | Type | Target count |
|---|---|---|
| `/` | Existing homepage, refactored | 1 |
| `/features` | Hub — all 11 features as cards | 1 |
| `/features/[slug]` | One page per feature | 11 |
| `/guides` | Hub — all guides, clustered | 1 |
| `/guides/[slug]` | Long-form evergreen how-to (~2,000–3,000 words) | 60+ |
| `/scenarios` | Hub — clustered into 4 themed groups | 1 |
| `/scenarios/[slug]` | Situational, first-person (~1,500–2,000 words) | 30+ |
| `/tools` | Hub — free on-device calculators | 1 |
| `/tools/[slug]` | One interactive tool per page | 6–8 |
| `/about` | Founder-led, first person, E-E-A-T | 1 |
| `/whats-new` | Changelog + roadmap | 1 |
| `/faq` | Existing, kept and expanded | 1 |
| `/privacy`, `/terms` | Existing | 2 |
| `/go/app-store` | Tracked redirect (`?ct=` placement param) | — |
| `/blog`, `/blog/[slug]` | **Removed** → 308 redirects to `/guides` | — |

### Navigation

Following Vaultaire's split deliberately — **header is product-only, content hubs live in the footer**. The header sells; the footer gets crawled.

- **Header:** Features · Tools · FAQ · *Get the App*
- **Footer col 1 (Product):** Features · Tools · What's New · FAQ
- **Footer col 2 (Learn):** Guides · Scenarios
- **Footer col 3 (Company):** About · Feedback & Support · Privacy · Terms

The current footer is a single flex row and the mobile menu is a flat `<details>` list — both need to become column-based to absorb this. See §3.

---

## 2. Content model

### Content types and their shapes

All long-form types are **MDX files with a validated frontmatter contract**. Structured, repeated modules come from frontmatter and are rendered by the page template; only genuine prose lives in the MDX body. This is the critical design choice: it means a page's SEO-bearing structure (answer box, FAQ, keyword mapping, citations, related links) is *data*, so it can be validated at build time, reused in JSON-LD, and surfaced in `llms.txt` — none of which is possible if those modules are hand-written markdown.

```
content/
  guides/<slug>.mdx
  scenarios/<slug>.mdx
  features/<slug>.mdx
  changelog/<version>.mdx
  _templates/{guide,scenario,feature,changelog}.mdx
  _backlog.md          # keyword queue — what gets written next
```

Tools are **not** MDX — each is a React component with its own interactive logic, registered in `lib/tools.ts`, with its surrounding explanatory copy in the page file.

### Guide frontmatter

```yaml
title: "How to Track Habits Without Streaks (2026)"    # H1
seoTitle: "Habit Tracking Without Streaks | TimeSince" # <title>, may differ from H1
description: "..."                                      # meta description, 140-160 chars
cluster: "anti-streak"                                  # drives hub grouping + related links
date: "2026-10-23"
updated: "2026-10-23"                                   # optional; drives dateModified
answer: "..."                                           # 60-90 words, answer-first box
questions:                                              # primary + secondary intent
  primary: "habit tracker without streaks"
  secondary: ["streak free habit app", "..."]
faq:
  - q: "..."
    a: "..."
sources:                                                # optional, required for health/science claims
  - title: "..."
    url: "..."
related: ["guides/other-slug", "scenarios/other-slug"]  # optional; auto-filled from cluster if omitted
hero: "guides/slug.png"                                 # optional; falls back to generated visual
disclaimer: "health"                                    # optional: health | legal | none
```

### Scenario frontmatter

Adds the modules that make Vaultaire's scenario pages work:

```yaml
audience: "Anyone whose habit app made them feel worse"  # the index card kicker
scene: "..."                                             # one-line scene on the card
cluster: "streak-anxiety"
problem: "..."                                           # the 3-box Problem → Consequence → Help graphic
consequence: "..."
help: "..."
solves: ["...", "..."]                                   # "What TimeSince does help with"
doesNotSolve: ["...", "..."]                             # "What TimeSince will not fix"
checklist: ["...", "..."]                                # numbered setup steps
pullQuote: "..."                                         # short-form-video hook
```

### Two deliberate departures from the inspiration

**Drop the "search proof" box.** Vaultaire's scenario pages each carry a vague, unverifiable sentence about recent social discussion. It reads as filler and it cannot be substantiated. Nothing of value is lost by omitting it.

**Soften the keyword table.** Vaultaire renders a visible table of its target keywords ("Primary: partner knows my iPhone passcode"). That is keyword stuffing made user-facing. Keep the same data in frontmatter — it's genuinely useful for tracking coverage and for generating FAQ schema — but render it as a *"Related questions"* block whose entries link to the guides and FAQ answers that address them. Same internal-linking benefit, no keyword dump shown to readers.

### Validation (non-negotiable for daily publishing)

A zod schema per content type in `lib/content/schema.ts`, parsed at load. A bad or missing field **throws during `next build`** rather than rendering an empty section. Contentlayer is unmaintained; `@content-collections/*` mainly buys a build-plugin-managed cache that matters at thousands of files, not 110. Stay on the `fs` + `gray-matter` + `next-mdx-remote/rsc` pipeline already working in [lib/blog.ts](lib/blog.ts) and add zod on top.

```
lib/content/
  schema.ts   zod schemas + enums (ACCENTS, CLUSTERS)
  load.ts     loadCollection<T>(dir, schema)
  labels.ts   every UI string the templates render — also the i18n seam (§6)
  related.ts  explicit `related` first, then tag-overlap fill to 3
  index.ts    getGuides(), getGuide(slug), allContent(), …
```

Because `loadCollection` is called by `generateStaticParams`, every page, `sitemap.ts`, `llms.txt`, and `feed.xml`, validation sits on the build's critical path automatically — there's no separate step anyone can forget. Three implementation details that are not optional:

1. **Memoize at module scope.** Without a cache, every file is read and MDX-parsed 5+ times per build (params + page + sitemap + llms + feed).
2. **Exclude `_`-prefixed files and directories** from the glob, or `content/_templates/guide.mdx` ships as a live page. This is the classic bug in this architecture.
3. **Aggregate errors with `safeParse`; don't throw on the first.** Collect everything, then throw once listing `content/guides/foo.mdx › keywords.secondary: must contain at least 3 elements`. One build, all the typos.

### Cross-file checks a single page render can't do

`npm run content:check` catches what per-page validation structurally cannot:

- duplicate slugs, titles, or descriptions anywhere
- every `related` slug and every internal `/guides/…` body link resolves
- every `hero` / step image key exists in the asset manifest (§6)
- `updated >= date`, neither in the future; body word count within type bounds; ≥8 internal links per guide
- **near-duplicate detection** — shingle/Jaccard over bodies, failing above ~60% similarity to any existing page

That last one is the highest-value check on the list and should ship in Phase 1. It is the mechanical guard against the single biggest risk in this plan (§5).

Two schema fields earn their keep as quality gates rather than data:

- **`evidence` (required on scenarios)** — one line naming *why this page exists*: a UserJot ticket, an App Store review, a real thread. If the author can't name it, the build refuses the page. Best anti-thin-content guard available.
- **`kind: 'guide' | 'note'`** — the escape valve that recovers what folding the blog loses. A `note` is shorter, needs no steps or comparison table, and groups separately on the index, so a timely 800-word opinion piece still has a home without a second route tree.

Add `zod` (4.6.7) as a **direct** dependency — it currently resolves transitively via `firebase-tools` and will vanish when that's removed.

**Add CI.** The repo has none. `.github/workflows/ci.yml` running `npm run verify` (`tsc --noEmit && eslint . && content:check && next build`) on push and PR. Untenable to publish daily without it.

---

## 3. Refactors that must land first

The current code cannot absorb 100 pages. These are prerequisites, not cleanup.

**Extract the chrome.** [app/layout.tsx](app/layout.tsx) holds the header, the mobile menu, the footer, and the JSON-LD graph inline — 141 lines before any content exists. Split into `components/site-header.tsx` and `components/site-footer.tsx`, with nav links as a data array in `lib/nav.ts` so the header, mobile menu, and footer all read from one source.

**Build the features data layer.** The 11 homepage feature sections in [app/page.tsx:184](app/page.tsx#L184) onward are byte-identical ~18-line blocks differing in exactly six values. Verified shape — one `<FeatureRow>` with these props collapses all 11:

```ts
{ slug, nav, h1,                   // nav label reused in menus + SoftwareApplication.featureList
  homeHeadline: { lead, emphasis },// headline splits into plain lead + accented tail
  deck, icon, image,               // lucide component + StaticImageData
  accent: Accent,                  // the enum from the accent system above
  tier: 'free' | 'pro',
  requires?: string }               // 'iOS 26+', 'NTAG215 tag'
```

`reverse` is derived from index parity, not stored. Lift all copy **verbatim** from `app/page.tsx` — no rewriting during a refactor.

Extract the data to `lib/features.ts`. This one refactor serves the homepage, the `/features` hub, and all 11 `/features/[slug]` pages, cuts ~260 lines, and — the actual SEO payoff — adds **11 internal links from the highest-authority page on the site**.

**Switch internal `<a>` to `next/link`** in the header and footer while they're being extracted. Every internal nav link is currently a full document load.

**Fix the mobile-menu bug while you're in there.** The header lives in `layout.tsx`, so it persists across App Router navigations — which means an open `<details>` menu **stays open after you tap a link**. This happens today at 5 links and gets worse at 20. The fix needs `usePathname()` to close on route change, making `components/site/mobile-menu.tsx` the *one* justified client component on the site. Everything else, including every content page, stays a pure server component. Also swap the fixed-width popover (`absolute right-0 w-56`) for a scrolling sheet (`fixed inset-x-0 top-16 bottom-0 overflow-y-auto`) — at 20+ links the current panel overflows the viewport with no way to reach the bottom.

**Establish design tokens — and solve the dynamic-class problem properly.** [app/globals.css](app/globals.css) is six lines with a single font token; the entire palette is ad-hoc per section. Add brand, surface, line, and radius tokens to the `@theme` block.

The accent system needs more than tokens, though. Today `` className={`bg-gradient-to-br ${visual.gradient}`} `` works *only* because the literal string `from-purple-600 via-violet-500 to-blue-500` physically appears in [lib/blog-visuals.tsx](lib/blog-visuals.tsx) for Tailwind's scanner to find. That's an accident, and it cannot survive content files choosing their own accent. The fix:

1. Close the set to **six named accents**: `brand`, `warm`, `cool`, `calm`, `alert`, `neutral`.
2. Define each as CSS custom properties behind a **static** class in `globals.css`:
   ```css
   .accent-brand { --accent-from: …; --accent-to: …; --accent-soft: …; --accent-ink: …; }
   .accent-gradient { background-image: linear-gradient(135deg, var(--accent-from), var(--accent-to)); }
   .accent-chip     { background: var(--accent-soft); color: var(--accent-ink); }
   ```
3. Components apply `ACCENT_CLASS[accent]` from a literal `Record<Accent, string>`.

Six class names, all present literally in CSS and in that map, so nothing is ever purged — and **content files only ever carry a zod-validated enum value, never a Tailwind color**. Worth spending real time on these six palettes; revisiting them after 100 pages is expensive.

**Shared page-template components** (`components/content/`), with props driven by the frontmatter above:

| Component | Purpose |
|---|---|
| `Breadcrumbs` | Visual trail + feeds `BreadcrumbList` JSON-LD |
| `AnswerBox` | The answer-first block |
| `RelatedQuestions` | Softened keyword table (links out) |
| `SourceList` | Citations + the educational-not-advice disclaimer |
| `RelatedPages` | 3-card grid, auto-filled by cluster |
| `StepList` | Numbered steps + feeds `HowTo` JSON-LD |
| `ComparisonTable` | Method/option matrix |
| `ProblemFlow` | Problem → Consequence → How it helps |
| `PullQuote` | Short-form-video hook |
| `FaqAccordion` | Reuse the `<details>` pattern from [app/faq/page.tsx](app/faq/page.tsx) |
| `CtaBlock` | App Store CTA; takes a `ct` placement for tracking |
| `ContentVisual` | Hero image, or deterministic gradient+icon fallback |

**Fold in the blog.** Convert the 3 posts in `content/blog/` to guides, add `/blog/*` → `/guides/*` redirects in `next.config.ts`, delete the blog routes and [lib/blog.ts](lib/blog.ts) (superseded by the content loader). Note `tags` is currently parsed and typed but never rendered anywhere — `cluster` replaces it with something that actually routes.

**Clean the AI Studio residue.** The repo was scaffolded in Google AI Studio and still carries it: unused `@google/genai`, `@hookform/resolvers`, `class-variance-authority`, `tw-animate-css`, and `firebase-tools` deps; the `picsum.photos` remote image pattern and `DISABLE_HMR` webpack block in `next.config.ts`; `metadata.json`; `"name": "ai-studio-applet"` in `package.json`; unused `hooks/use-mobile.ts`, `lib/utils.ts`, and the `LogoFullSvg` alias. Also remove `eslint: { ignoreDuringBuilds: true }` — with daily publishing, the build is the only safety net there is.

**Fix the live bug.** [app/terms/page.tsx:118](app/terms/page.tsx#L118) ships `[jurisdiction to be confirmed]` to production. Needs the real jurisdiction.

---

## 4. SEO plumbing

### Everything derives from one content index

The point of the loader is that these all become automatic:

- **`app/sitemap.ts`** — currently 5 hardcoded routes with no `lastModified`. Rewrite to enumerate every content type with real `updated` dates.
- **`app/llms.txt/route.ts`** — rewrite as a full page index grouped by hub. Vaultaire's is a 1.23 MB index of everything; ours should list every page with its description.
- **`app/llms-full.txt/route.ts`** — **must be capped.** 110 pages × ~2,500 words is roughly 2.3 MB, which is unusable. Include the FAQ, all feature pages, and the ~20 highest-priority guides in full, then point at `llms.txt` for the rest. Every guide and scenario's `answer` field is the highest-value thing to include — the answer-first boxes are exactly what an LLM quotes.
- **`app/feed.xml/route.ts`** — new RSS feed (none exists today). ~40 lines hand-written with a tested `escapeXml` helper; a dependency wouldn't save the escaping review.

All three route handlers get `export const dynamic = 'force-static'` so they aren't re-rendered per request.

Sitemap detail that bites: take `lastModified` from the `updated` frontmatter field, **never from `fs.statSync` mtime** — in CI that's checkout time, so every page looks modified on every deploy. Also drop `priority` and `changeFrequency`; Google ignores both and they're one more decision per page.

### Structured data

| Schema | Where |
|---|---|
| `BreadcrumbList` | Every content page (missing entirely today) |
| `Article` | Guides, scenarios (today only `BlogPosting`, with no `dateModified` or `image`) — and `author` must be a **`Person`** pointing at `/about`, not the current `Organization`. Otherwise the founder-led about page does nothing for E-E-A-T. |
| `HowTo` | Guides with a `StepList` |
| `ItemList` | All hub index pages |
| `FAQPage` | `/faq`, plus per-page from the `faq` frontmatter |
| `SoftwareApplication` | Fix the existing one — see below |

**Fix the app schema** in [app/layout.tsx:51](app/layout.tsx#L51):

- `applicationCategory: 'HealthApplication'` → **`'LifestyleApplication'`** with `applicationSubCategory: 'Habit Tracker'`. `HealthApplication` invites health-claim scrutiny and fits a chore tracker poorly.
- `offers: { price: '0' }` actively misrepresents a freemium app with a paid tier. Replace with an `AggregateOffer` (`lowPrice: '0'`, `highPrice` = the lifetime price, with Free / Pro / Lifetime sub-offers). Add a `SITE.pricing` block so prices live in one place.
- Add `operatingSystem: 'iOS 17.6'`, `downloadUrl`, `softwareVersion` (free from the changelog data), `screenshot`, and `featureList: FEATURES.map(f => f.nav)`.
- **`aggregateRating`: flagged, not recommended.** Self-reported ratings on your own product page are a structured-data policy risk and are largely discounted anyway. Add it only with real App Store numbers hardcoded in `SITE` and a manual refresh habit — or skip it. My earlier read was too confident here; it's a judgment call, not a clear win.

### Per-page OG images

One generic card is currently shared site-wide by [app/opengraph-image.tsx](app/opengraph-image.tsx), and it renders in `sans-serif` rather than Nunito — off-brand on every share. Add a route-segment `opengraph-image.tsx` under each dynamic route, plus a shared `lib/og.ts` exporting an `OgFrame` component and a memoized font loader.

The font is the tricky part. `next/font/google` returns CSS class names, not a binary, and the actual file lands at a hashed `.next/` path you must not depend on. So: **commit two static TTFs** to `assets/fonts/` (subset to latin with `pyftsubset` — `ImageResponse` re-parses the font on every render, so size multiplies across 100+ images), read them with `fs.readFileSync` **memoized at module scope**, and keep `runtime = 'nodejs'`. Do not `fetch()` Google Fonts at build time; that makes builds network-dependent and silently falls back to the wrong font on failure.

> ### ⚠️ The highest-probability production bug in this plan
>
> `next.config.ts` sets **`output: 'standalone'`**, and runtime `fs` reads at non-import paths are **not traced** into the standalone bundle. Two things are therefore mandatory:
>
> ```ts
> outputFileTracingIncludes: { '/**': ['./assets/fonts/**', './content/**'] }
> ```
>
> …and **`export const dynamicParams = false`** on every `[slug]` route, so an unknown slug 404s statically instead of attempting a runtime read of a directory that isn't in the bundle.
>
> Miss either one and you get a production-only 500 that never reproduces locally. Worth wiring up in Phase 1 and verifying against a real deploy before content volume hides it.

Build cost, stated honestly: ~110 `ImageResponse` renders at 150–400 ms each adds roughly 30–60 s. Fine at this scale, not at 1,000. If it becomes a problem, collapse to a single dynamic `app/og/route.tsx` taking `?t=&k=&a=` params with immutable caching. Make downloadable share cards **on-demand** (`revalidate`) rather than statically generated, so they don't double the build-time image count.

### Crawling and CTA attribution

- **`app/robots.ts`** — currently a bare allow-all. Name the crawlers explicitly (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Google-Extended, Googlebot, bingbot, PerplexityBot, CCBot, Amazonbot, **Applebot**, Applebot-Extended, meta-externalagent, DuckDuckBot) and `Disallow: /go/`. Honestly: most are no-ops against an existing blanket allow. The ones that genuinely do something are `Google-Extended` and `Applebot-Extended` (AI-training controls), and **`Applebot` matters more than usual for an iOS app** wanting Apple-ecosystem surfaces. The rest is a cheap, zero-risk signal.
- **CTA tracking — don't route on-page CTAs through a redirect.** Correcting my earlier approach: an internal hop costs 100–300 ms on mobile on the one click that matters. Instead, `CtaBlock` builds the **direct** App Store URL with Apple's campaign params appended at render time (`?ct=<placement>&mt=8`) — `ct` lands in App Store Connect's App Analytics, which was the real reason to name placements. Make `CtaPlacement` a TypeScript union so a typo'd `ct` fails `tsc` instead of quietly polluting analytics.
- **`app/go/app-store/route.ts`** still earns its place, but only as a stable **off-site short link** for the QR code, Discord, and directory listings. Use `307`, not `301` — browsers cache 301s effectively forever.
- **`app/not-found.tsx`** — no 404 page exists. Make it useful: links to Guides, Scenarios, Features, FAQ, plus a CTA.

---

## 5. Content strategy

### Guide clusters

Each cluster is a hub grouping, an internal-linking neighbourhood, and a keyword theme.

1. **Anti-streak & habit science** — why streaks backfire, all-or-nothing thinking, the 21-day myth, habits that aren't daily
2. **ADHD & executive function** — time blindness, object permanence, task initiation, RSD and broken streaks
3. **Interval tracking how-tos** — the "how long since I last…" long tail
4. **Quitting & recovery** — sober counters, vaping, relapse without shame, Quitting mode
5. **iOS power-user** — widgets, Siri and the Action Button, NFC tags, Focus modes, alarms through silent mode. Deep, genuinely useful, low competition.
6. **Home & vehicle maintenance** — filters, smoke detectors, pet treatments, oil changes
7. **Health & medication intervals** — adherence, supplements, PT, injection rotation
8. **Relationships & staying in touch** — the social-maintenance angle
9. **Privacy & local-first** — SQLCipher, iCloud vs a server, what the developer cannot see
10. **Choosing an app** — "best habit tracker without streaks (2026)", one-time purchase vs subscription, free tiers that aren't crippled

Title patterns: `How to [verb] [object]`, `Does/Can [X] [verb] [Y]?`, `Best [thing] for [audience] (2026)`, `Why [common belief] is wrong`, `How to switch from [competitor]`.

### Scenario clusters

Four themed groups on the index, matching Vaultaire's structure. First-person, situational headlines:

1. **When habit tracking broke you** — "My streak broke and I never opened the app again"
2. **ADHD & forgetting** — "I can't remember if I took my meds this morning"
3. **Quitting & recovery** — "I'm 40 days sober and terrified of the counter resetting"
4. **Home, health & caregiving** — "My partner and I keep arguing about whose turn it was"

### Tools

In rough priority order:

1. **Days Since Calculator** — pick a date, get elapsed time. The highest-volume query of the set and the most on-brand.
2. **Days Between Dates**
3. **Average Interval Calculator** — paste dates, get the average gap. Literally the app's core math, shown for free.
4. **Next Due Estimator** — last done + average interval
5. **Sobriety Counter** — milestone-aware
6. **Chore Interval Reference** — a data-backed table of recommended intervals for common household items

All client-side, no network calls — which lets each one honestly carry the same "runs entirely in your browser" privacy line the app earns.

### About and What's New

Both need user input and cannot be drafted cold:

- **`/about`** — founder-led and first person, following Vaultaire's structure (Who makes it · Why one person matters · Background · Why I built it · How I build · Contact). This is the E-E-A-T anchor for the whole site, and it only works if it's true. Needs an interview: why the app exists, what the user's background is, and whether to name a legal entity.
- **`/whats-new`** — needs the real App Store release history (versions, dates, notes) plus whatever is genuinely on the roadmap.

### Quality guardrails

Mass-producing pages is how sites get hit, not how they grow. Non-negotiables:

- Every page answers its question **in the first 90 words**, specifically, or it doesn't ship.
- Every page states **what TimeSince does not solve**. Vaultaire does this and it is the most trust-building module on the site.
- Health and recovery content is **YMYL**. Those clusters carry a disclaimer and real citations, make no clinical claims, and point to professionals where appropriate. The `sources` field is enforced for them.
- No page exists only to hold a keyword. If there's no genuine answer, it stays in the backlog.
- Only verifiable product claims. The hard facts (iOS 17.6+, 3 free events, SQLCipher, NTAG215, RevenueCat, free iCloud sync) are already correct in [lib/faq.ts](lib/faq.ts) and `app/llms.txt/route.ts` — that's the source of truth.

---

## 6. Assets and images

**Keep `assets/` + ES-module imports as the default, and introduce a narrowly-scoped `public/`.**

`assets/` gives automatic width/height, blur placeholders, and build-time optimization — genuinely better for the 11 screenshots and any curated hero. The only real problem is that MDX content files can't `import`. The bridge:

### Generated image manifest

`lib/images/manifest.generated.ts`:

```ts
export const CONTENT_IMAGES = {
  'guides/nfc-pillbox/01-pair': nfcPair,
  'shared/widget-tap': widgetImg,
} satisfies Record<string, StaticImageData>;
```

Frontmatter carries **keys** (`hero: shared/widget-tap`), and zod validates each against `Object.keys(CONTENT_IMAGES)` — so **a typo'd image key fails the build** with a message telling you to re-run the generator. `scripts/gen-image-manifest.ts` walks `assets/content/**`, writes the file, and is wired into `prebuild`; `content:check` runs it and fails on a diff so it can never be stale in CI. The author's loop is one command, never an edit.

This replaces [lib/blog-visuals.tsx](lib/blog-visuals.tsx), whose per-slug registry requires exactly the kind of hand-written per-page entry this design exists to eliminate — and which ships Tailwind color literals from a data file.

### Missing images must never block a publish

A 3-tier resolver inside `ContentVisual`:

1. `hero` key present → `next/image` from the manifest.
2. Else `feature:` frontmatter present → **reuse that feature's existing screenshot** from `assets/features/`. Free, and genuinely relevant: a guide about NFC gets `nfc.png`.
3. Else → accent gradient + the content type's Lucide icon + the kicker as large type. Pure CSS/SVG, no image at all.

Tier 3 has to look *deliberate*, not like a broken image. Get that right once and the author can ship a page with zero images and it still looks finished.

### Generate shareable cards, don't draw them

Vaultaire hand-makes a downloadable card per guide. At 110 pages that's untenable solo. Instead, `app/guides/[slug]/share-card/route.tsx` returns a 1080×1350 portrait PNG from the same `ImageResponse` machinery, built from frontmatter. Zero asset work, consistent branding, no alt-text debt.

### Layout

```
assets/
  features/        11 existing screenshots, unchanged
  content/
    guides/<slug>/01-step.png …
    scenarios/<slug>/hero.png
    shared/        screenshots reused across many pages
  fonts/           subset Nunito TTFs — ImageResponse only
  brand/           badge-ios-en.svg, logo-light.svg
public/
  qr/timesince.png              hero QR code
  .well-known/                  apple-app-site-association, if universal links ship
```

`public/` is only for files needing a fixed URL and *no* optimization. That `.well-known/` case genuinely requires it and is a plausible near-term need for an iOS app.

**Screenshot discipline:** the existing 11 are 1176×2407 at 120–220 KB; reusing them across many pages is expected and fine. Standardize new captures to one simulator device, PNG, under 400 KB. Delete the orphaned `assets/logo.svg`. `sharp` already resolves in the tree, so optimization works locally and on Vercel.

---

## 7. Internationalization

English content ships first, but the architecture is built for locales now. Three structural choices cost nothing today and are expensive to retrofit once 110 pages exist.

### Build these into Phase 1

1. **Locale-scoped content paths from day one.** `content/en/guides/<slug>.mdx`, not `content/guides/<slug>.mdx`. The loader takes a `locale` argument defaulting to `'en'`. This is a free decision now and a 110-file move later.
2. **No user-facing string inline in JSX.** Chrome labels, CTA text, section headings, and the nav array in `lib/nav.ts` all read from `lib/strings/en.ts`. The current [app/layout.tsx](app/layout.tsx) hardcodes every label inline — extracting during the header/footer refactor is nearly free, and doing it later means touching every component again.
3. **Every internal link goes through a `localizedPath()` helper**, never a bare string. Vaultaire translates its *slugs* too (`/es/guias/`, `/de/anleitungen/`), which needs a slug-mapping layer. If links are raw strings, that layer can never be inserted.

Also: build metadata through one shared `buildMetadata()` helper so `alternates.languages` (hreflang) can be emitted everywhere from one place.

### Turning locales on (a later phase)

- **Routing:** `next-intl@4.14.9` with `localePrefix: 'as-needed'`, so English stays at `/guides/x` and other locales get `/es/guias/x`. **This matters: `as-needed` means no existing URL changes.** Any approach that moves English to `/en/guides/x` throws away accumulated ranking and requires site-wide redirects.
- **Structure:** routes move under `app/[locale]/`. Cheap even later, because every content route is already a dynamic `[slug]` — there are a handful of route files, not a hundred.
- **Missing translations:** serve a 404 and omit the locale from that page's hreflang set. Do **not** serve English content at a localized URL.

That last rule is the lesson from the inspiration site. Vaultaire's English `/guides/` index currently shows four cards with Japanese, Chinese, and Russian deck text, and its newest guides use English slugs across all 32 locales because translation lags publishing. That's what partial translation at scale actually looks like in production.

### Recommendation on scope

**Do not copy the 32-locale play.** Vaultaire's ~7,550 pages are ~235 English pages multiplied by machine translation, and the visible QA failures above are the cost. Recommended instead:

- Prove the English content ranks first. Locales multiply whatever you already have — including nothing.
- Then expand to **4–6 locales**, chosen from actual App Store install data rather than guessed (likely Spanish, German, French, Japanese, Portuguese).
- Translate with an LLM, but have a native speaker spot-check each locale's hub pages and top 10 guides before shipping it. Thin machine-translated content at scale is a genuine ranking liability, not just an aesthetic one.
- Localize the **highest-value pages only** — hubs, features, tools, and the top ~20 guides — rather than everything. A locale with 30 strong pages beats one with 110 weak ones.

Tools localize especially well: a date calculator is almost all UI string and almost no prose.

---

## 8. Phasing and progress tracking

### The tracker lives in the repo

`PROGRESS.md` at the project root — a real checklist, committed, updated as part of each phase rather than after it. Checked boxes are the record of what's actually done; the plan file in `~/.claude/plans/` is reference, not state.

```markdown
# TimeSince Site Makeover — Progress

Plan: see PLAN.md · Last updated: 2026-10-23

## Phase 0 — Upgrade & plumbing
- [ ] Next 15.5 → 16.4, React 19.3, TS 6.0, ESLint 10, motion 14, lucide 1.x, Tailwind 4.3
- [ ] Remove dead deps (@google/genai, @hookform/resolvers, cva, tw-animate-css, firebase-tools)
- [ ] Add zod as a direct dependency
- [ ] Strip AI Studio residue (metadata.json, DISABLE_HMR, picsum, package name)
- [ ] Drop eslint.ignoreDuringBuilds
- [ ] Fix app/terms/page.tsx jurisdiction placeholder  ⚠️ live on prod
- [ ] Add CLAUDE.md (frontmatter contract, voice rules, verified product facts)
- [ ] Copy this plan to PLAN.md in the repo so plan + progress sit together
- [ ] Add .github/workflows/ci.yml running `npm run verify`
- [ ] GATE: build + dev pass under Turbopack; all 8 routes render; icons & motion verified
- [ ] GATE: next-mdx-remote/rsc proven working under Next 16

## Phase 1 — Content engine
- [ ] lib/content/{schema,load,labels,related,index}.ts + zod schemas
- [ ] Locale-scoped paths (content/en/...), string dictionary, localizedPath()
- [ ] Design tokens + six-accent CSS system
- [ ] Extract header/footer/mobile-menu; fix menu-stays-open bug; next/link
- [ ] lib/features.ts + FeatureRow (app/page.tsx 463 → ~150 lines)
- [ ] Shared content components (Breadcrumbs, AnswerBox, StepList, …)
- [ ] /guides hub + [slug] template
- [ ] Migrate 3 blog posts; delete app/blog; add redirects
- [ ] Dynamic sitemap; image manifest generator
- [ ] Near-duplicate lint
- [ ] outputFileTracingIncludes + dynamicParams = false  ⚠️ verify on a real deploy
- [ ] content:new scaffold + templates
- [ ] GATE: publish one real guide end-to-end with zero manual edits outside its own file

## Phase 2 — SEO plumbing
- [ ] Per-page OG images + subset Nunito TTFs
- [ ] JSON-LD: BreadcrumbList, Article (author=Person→/about), HowTo, ItemList
- [ ] Fix SoftwareApplication (LifestyleApplication, AggregateOffer, SITE.pricing)
- [ ] feed.xml, not-found.tsx, expanded robots
- [ ] Rewrite llms.txt; cap llms-full.txt
- [ ] CTA placement unions + direct App Store links with ?ct=
- [ ] /go/app-store short link (307)

## Phase 3 — Scenarios & Features
## Phase 4 — Tools
## Phase 5 — About & What's New        (blocked: §10)
## Phase 6 — Locales
## Phase 7 — Deferred: Compare hub

## Content backlog
Tracked in content/_backlog.md — not here.
```

Two rules that keep it honest: a box is checked only when the thing is **verified**, not written; and the two `GATE` lines are hard stops, not aspirations. Phase 1 doesn't start until Phase 0's gates pass.

Keep the published-page count in `content/_backlog.md` instead — conflating "infrastructure done" with "content shipped" in one file makes both harder to read.

### The phases

Each ships something working and verifiable on its own.

**Phase 0 — Upgrade and plumbing.** Next 16, React 19.3, TS 6, ESLint 10, motion 14, lucide 1.x, Tailwind 4.3; strip the AI Studio residue and dead deps; add `zod`; drop `ignoreDuringBuilds`; add `CLAUDE.md`. Verified against the existing 8 routes. *Ends with: a current, clean foundation.* (§0)

**Phase 1 — Content engine.** First task is proving `next-mdx-remote/rsc` works under Next 16 + Turbopack. Then: content loader + zod schemas, locale-scoped paths, string dictionary, `localizedPath()`, `/guides` hub and `[slug]` template, shared content components, blog fold-in and redirects, header/footer extraction, design tokens, dynamic sitemap. *Ends with: daily publishing is possible.*

**Phase 2 — SEO plumbing.** Per-page OG images, all JSON-LD, RSS, 404, expanded robots, rewritten `llms.txt`/`llms-full.txt`, `/go/app-store` tracked redirect, app-schema fix. *Ends with: every page published from here on is fully instrumented.*

**Phase 3 — Scenarios + Features.** `/scenarios` hub and template with its extra modules; `lib/features.ts`, the `/features` hub, and 11 feature pages — these are near-free, since the copy and screenshots already exist on the homepage.

**Phase 4 — Tools.** `/tools` hub plus the first 3–4 calculators. Highest top-of-funnel ROI in the plan; pull earlier if traffic matters more than content depth.

**Phase 5 — About + What's New.** Blocked on user input (founder story, release history, App Store rating).

**Phase 6 — Locales.** Only after English content has had time to prove itself. (§7)

**Phase 7 — Deferred: Compare hub.** Out of scope per the user's decision. Flagging it anyway: "TimeSince vs Streaks", "vs Habitica", "vs Apple Reminders", and "switch from X" pages are high commercial intent and cheap once the guide template exists, and the anti-streak position gives a genuinely differentiated verdict on every one. Worth revisiting after Phase 4.

**Then: the publishing loop.** Work the `content/_backlog.md` queue — scaffold, draft, review, ship. Sitemap, RSS, `llms.txt`, breadcrumbs, OG images, and related-page links all update with zero manual edits.

### On "every day"

Worth being straight about the arithmetic. A genuine 2,500-word guide with real screenshots is 4–6 hours of work; a scenario on a good template is 2–3. **Literal daily long-form publishing is not sustainable solo alongside shipping an iOS app** — and 110 pages at one a day is four months of unbroken output.

What the architecture should support, and this one does:

- **Target 4–5 pages a week**, weighted toward scenarios with one flagship guide.
- **Batch-write**, then release on a schedule. Add a `publishAt` frontmatter field plus a `draft` flag: the loader hides future-dated and draft files in production but shows them in dev. That decouples *writing* days from *publishing* days, which matters more than any other operational choice here. (With static generation a future-dated page only appears when a build runs, so pair it with a daily Vercel cron hitting a deploy hook. Start with publish-by-push and add this once the cadence is real.)
- **Keep the templates restrictive.** Every optional frontmatter field is a decision re-made daily. Small required set, smaller optional set.
- Use AI for first drafts, but never for the `answer` box or the `sources`.

A steady cadence beats a streak — which is, fittingly, the exact thing this app exists to argue.

---

## 9. Verification

**Phase 0 gate (run before any content work):**
- `npm run build` and `npm run dev` pass under Next 16 + Turbopack with `ignoreDuringBuilds` removed.
- All 8 existing routes render; Motion animations on the homepage still run; every Lucide icon still resolves after the 0.x → 1.x bump.
- `npm ls` shows no peer-dependency warnings and no remaining major mismatch.
- A throwaway `next-mdx-remote/rsc` render of one existing post succeeds — **the gate for Phase 1.**

**Content engine:**
- `npm run build` must pass — the primary gate, since zod validation runs at build time.
- `npm run content:check` — validate all frontmatter without a full build.
- `npm run dev` and walk every new route: hub pages, a guide, a scenario, a feature, a tool, 404.
- Check `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/feed.xml` render and include all content with correct `lastModified`.
- Validate JSON-LD on one page per type with Google's Rich Results Test.
- Verify `/opengraph-image` per route renders in Nunito with the page's own title.
- Confirm `/blog` and `/blog/why-streaks-backfire` 308-redirect correctly.
- Test `/go/app-store?ct=test` redirects to the App Store and is `Disallow`ed in robots.
- Mobile check at 375px — the footer columns and the expanded `<details>` menu are the risk.
- Lighthouse SEO + a11y pass on a guide page.

Also confirm `/es/guias/...`-style localized slugs resolve and that English URLs are **unchanged** when locales are switched on.

## 10. Open items needing user input

1. **Jurisdiction** for `app/terms/page.tsx` — currently ships `[jurisdiction to be confirmed]` to production.
2. **App Store rating + review count** for `aggregateRating`, and the **real Pro prices** (subscription and lifetime) for the offer schema.
3. **Founder story** for `/about` — an interview, not something draftable cold. Also: name a legal entity, or stay personal?
4. **Release history** for `/whats-new` — versions, dates, and notes, plus what's genuinely on the roadmap.
5. **Keyword backlog sign-off** — the first ~30 titles, so drafting starts against an approved queue.
6. **Target locales** for Phase 6, ideally from App Store install-by-country data rather than guesswork.
7. **Deployment target** — Vercel is implied (`@vercel/analytics` is wired in, `.vercel` is gitignored) but no config is committed and `firebase-tools` sits in devDependencies. Worth settling before Next 16 changes build output.
