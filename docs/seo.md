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

The HTTP checks cover all current guide schemas and social metadata, unique PNG content and dimensions, RSS membership, missing-route status/noindex, redirect campaigns and robots rules. Inspect the longest title's share image visually when changing typography. Validate deployed routes again after merge; local checks do not establish indexing or search ranking.

## Follow-ups

- Choose apex versus www canonical host; all URL builders use `SITE.url` consistently, but the existing production redirect mismatch remains.
- Publish `/about` in Phase 5; schema author URLs already reference that planned page.
- OG fonts are full local Nunito and JetBrains Mono TTFs (237,620 bytes total), not subsets. Licenses and sources are in `assets/fonts/`. Revisit subsetting alongside localization.
- Static pages beyond home and guides inherit the home share image. Add section-specific images when those sections are implemented.
