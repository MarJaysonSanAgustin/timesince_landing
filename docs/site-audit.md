# Site audit

Everything on the live site that is wrong, stale, or contradicts the app — found 2026-10-23 while gathering [research.md](research.md). Ordered by how much damage it does.

---

## 1. Factually wrong

| What | Where | Should be |
|---|---|---|
| Calls the product a **habit tracker** | `SITE.title`, `SITE.fullName`, `SITE.description`, keywords, `<title>`, OG, JSON-LD | An interval tracker. App Store name has no "habit" in it. |
| Says **"events"** | copy, `lib/faq.ts`, `llms.txt`, content schema, guide copy | **"counters"** — the app says counter 218 times to event's 30 |
| `applicationCategory: 'HealthApplication'` | `app/layout.tsx` | **`LifestyleApplication`** — confirmed by the App Store category |
| `offers: { price: '0' }` | `app/layout.tsx` | An `AggregateOffer`: $0 / $1.99 mo / $14.99 yr / $39.99 lifetime |
| ~~`[jurisdiction to be confirmed]`~~ | `app/terms/page.tsx` | **Fixed 2026-10-23** — the Philippines, via `SITE.jurisdiction`. |

## 2. Contradicts the app

- **Gradients everywhere.** ADR-012 rule 8 is "no gradients, no patterned banners." The hero, all 11 feature cards, the OG image and the Phase 1 accent system are built from them. See [design-system.md](design-system.md).
- **White background.** The app is printed on warm dotted paper `#F1EFEA`.
- **No mono voice.** The app uses Menlo for every count, date and interval — the numbers *are* the product, and the site sets them in Nunito like body text.
- **Purple used as a large fill.** The app deliberately demoted purple to a small accent because app-purple and counter-purple were indistinguishable.

## 3. Stale or missing

- **The App Privacy label on the App Store links `timesince-landing.vercel.app/privacy`** — a preview URL, not the real site. Fix in App Store Connect; it is outside this repo but it is the listing pointing at the wrong host.
- **Canonical host mismatch.** `SITE.url` is the apex; the apex 308-redirects to `www`. Every canonical, `og:url`, JSON-LD URL and sitemap entry names a host that redirects. *(Already logged in PROGRESS.md.)*
- **No pricing anywhere on the site.** Three products exist and the site mentions none of them.
- **No changelog**, despite 13 dated releases being public.
- **No about page**, despite a named solo developer — the E-E-A-T anchor the whole content plan leans on.
- **11 dead links.** The homepage links `/features/<slug>` for all 11 features; none of those pages exists yet.
- **The app ships 5 locales; the site ships 1.** English, German, Spanish, Chinese ×2. This inverts the i18n argument in PLAN.md §7 — see below.

## 4. Underused

- **The privacy claim.** The App Store nutrition label collects only purchase history, not linked to the user. That is unusually clean and the site buries it.
- **"Erase Everywhere"**, JSON export/import, the no-server architecture — all concrete, all absent.
- **The two App Store reviews** are usable testimonials; the site has no social proof at all.
- **The declined household-sharing request** is the best privacy story the product has, and it is a *strength*: the developer turned down the most-requested feature because it would require a server.

---

## Consequences for PLAN.md

Three of the plan's decisions need revisiting:

### i18n (§7) — the recommendation inverts

The plan said "English only, prove it ranks first." That was written believing the app was English-only. **It is not** — v1.10 shipped German, Spanish and both Chinese variants, and the app has 1,446 translated strings per locale.

This changes the calculus entirely. Those users exist *now*, they can already use the app in their language, and they land on an English-only site. This is no longer a speculative SEO bet; it is a gap between the product and its marketing. The locale set is also already decided for us, and the translations already exist for app-level vocabulary.

**Revised recommendation:** match the app's five locales, starting with the hubs and top guides. Phase 6 should move much earlier.

### Scenarios (§5) — the evidence requirement will block them

The scenario schema requires an `evidence` field naming why each page exists. That was a deliberate anti-thin-content guard and it was the right call. But [research.md](research.md) shows the feedback board has **nine posts and zero bugs** — nowhere near enough to source 30–40 scenario pages honestly.

**Options:** source scenarios from App Store reviews as they accumulate; widen `evidence` to accept the App Store description's own documented use cases; or cut the scenario target substantially and lead with guides. **Do not** invent user stories to fill the quota — that is exactly what the field exists to prevent.

### Design (§3) — the accent system needs rework before Phase 2

The six-accent system generates a gradient per page. Phase 2 bakes gradients into per-page OG images. **Rework the accents to flat blocks first**, or every generated card will have to be regenerated.

## Suggested order from here

1. **Copy and metadata truth pass** — positioning, counters-not-events, the schema fixes, the jurisdiction. Cheap, and everything else inherits it.
2. **Design translation** — flat blocks, paper ground, mono voice, three inks. Must land before per-page OG images.
3. **Then** Phase 2 SEO plumbing as planned.
4. **`/whats-new` and `/about`** — both are now unblocked; the changelog is in [research.md](research.md) and the About page only needs an interview.
5. **Re-decide i18n timing.**
