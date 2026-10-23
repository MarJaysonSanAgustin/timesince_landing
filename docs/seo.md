# SEO plumbing

Phase 2, implemented and locally verified on 2026-10-23. Production deployment remains to be checked.

## Generated routes

- `/opengraph-image`, `/guides/opengraph-image`, and `/guides/[slug]/opengraph-image`: distinct 1200×630 PNGs, built from the shared ticket frame. Guide metadata supplies its own Open Graph and Twitter titles, descriptions and image URLs.
- Guide pages: Article, BreadcrumbList, and content-dependent FAQPage/HowTo JSON-LD. The hub's ItemList follows visible card order. All JSON-LD passes through `serializeJsonLd` to escape `<` in script content.
- `/feed.xml`: RSS 2.0, newest 50 published documents, deterministic date/slug order, escaped descriptions, stable publication dates and latest included modification date. Feed discovery appears in layout and guide metadata.
- Unknown pages and guide slugs: custom ticket-stub 404 with navigation, a 404 status and noindex.
- `/robots.txt`: explicit crawler groups allow content and disallow `/go/`; includes sitemap and host from `SITE.url`. These directives request behavior; they do not enforce access control.
- `/llms.txt` and `/llms-full.txt`: content index and capped full text. Full guide entries include their answer boxes.
- `/go/app-store`: per-request 307 redirect, `Cache-Control: no-store`, `X-Robots-Tag: noindex`. Recognized `ct` values are `qr`, `discord`, and `directory`; unknown/missing values use `offsite_shortlink`. The destination is always the configured App Store listing. Website CTAs use direct campaign-tagged links.

Publishing a guide automatically updates its route, image, schema, hub, feed, sitemap and text indexes. Drafts are excluded from production builds.

## Verification

```sh
npm run verify
# In a separate terminal, run the built standalone server:
PORT=3102 HOSTNAME=127.0.0.1 node .next/standalone/server.js
npm run check:seo -- http://127.0.0.1:3102
```

For a styled standalone browser preview, first copy `.next/static` to `.next/standalone/.next/static`. CI runs both verification commands, starting and stopping its own server.

**Free the port before re-running.** A previous server keeps 3102 and the new one exits with `EADDRINUSE`, leaving you checking stale output that looks like a real failure:

```sh
lsof -ti:3102 | xargs -r kill -9
```

The HTTP checks cover every section — guides, features and scenarios — via a shared `checkHub` that asserts each hub's `ItemList` matches the order its cards actually render in. A list that disagrees with the page is worse than no list. Also: social metadata, unique PNG content and dimensions, RSS membership, missing-route status/noindex on all four section 404s, redirect campaigns and robots rules.

Feature pages are asserted to carry `BreadcrumbList` and *not* `Article` — they are product pages, not editorial. Scenarios use the guide contract and are allowed an empty `ItemList` until their content lands; an empty list is honest, a missing one is a bug. Inspect the longest title's share image visually when changing typography. Validate deployed routes again after merge; local checks do not establish indexing or search ranking.

## Follow-ups

- ~~Choose apex versus www canonical host.~~ Resolved 2026-10-23: `SITE.url` is `https://www.timesinceapp.com`, matching what production serves. `check:seo` now asserts the site names exactly one host across canonicals, sitemap, feed, robots and llms.txt — host-agnostic, so it checks self-consistency rather than hard-coding a domain.
- Publish `/about` in Phase 5; schema author URLs already reference that planned page.
- OG fonts are full local Nunito and JetBrains Mono TTFs (237,620 bytes total), not subsets. Licenses and sources are in `assets/fonts/`. Revisit subsetting alongside localization.
- Scenarios have routes, schema and a share image but no content yet, so `/scenarios` renders an empty hub.
- Static pages beyond home, guides, features and scenarios inherit the home share image.
