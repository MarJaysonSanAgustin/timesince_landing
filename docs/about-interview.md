# /about — questions to answer

The page is built and draft-gated: it renders in `next dev` and 404s in production until
`ABOUT.draft` is `false`. Answer these, paste the answers anywhere, and I'll write the prose
into `lib/about.ts`.

**Why this page is worth the effort.** Every guide and scenario sets its `Article.author` to a
`Person` whose URL is `/about`. That was a deliberate choice over a generic `Organization`
author, because a named, credible human is what Google's quality guidance actually rewards for
advice content — and several of these pages are health-adjacent. Right now that URL 404s, so
the wiring is in place and pointing at nothing.

Answer in rough notes. Fragments are fine; I'd rather have your actual phrasing than polished
sentences, because the page should sound like you and not like marketing.

---

## 1. Who you are

- How do you want to be named on the page? (`SITE.developerName` currently says *Mar San Agustin*.)
- What do you do — day job, freelance, full-time on apps?
- Anything you're happy to say about where you're based? Fine to skip; it's one row in the facts block.

## 2. Credibility

This is the section search engines weigh most, and the one people skim to decide whether to
trust a page about medication reminders.

- How long have you been building software, and what kind?
- **Cammy — Intermittent Fasting** is listed on your App Store developer page. Want it mentioned?
  Two shipped apps is a materially stronger signal than one.
- Anything else relevant — a background in design, health, a technical specialism?

## 3. Why you built it

The strongest possible answer is **one specific thing you forgot**, not a thesis about habit
formation. "I didn't know when I'd last changed the water filter" beats any paragraph about
behavioural science.

- What were you failing to keep track of before you built this?
- What did the apps you tried get wrong for you, specifically?
- Is the anti-streak position personal — did a broken streak make you quit something — or is it
  a design conclusion you reached some other way? Either is fine. Knowing which changes how it
  should be written.

## 4. How you make decisions

You already have the ideal example and may not have noticed: you turned down **the
most-requested feature on your board** — household sharing, 33 votes — because it would need a
server in the middle. That one story does more work than any statement of values.

- Is that a fair characterisation of how you decide things?
- Any other decision you've made against the obvious commercial choice?
- The free tier is unusually generous (3 counters, with sync and widgets, no clock). Was that
  deliberate positioning, or just what felt right?

## 5. Legal and contact

- **Should the page name a legal entity?** Vaultaire names Wraxle LLC, which helps credibility.
  Your App Store copyright reads "© 2026 TimeSince App". Is there a company, or is it you
  personally?
- ⚠️ **This also unblocks the terms page**, which still ships `[jurisdiction to be confirmed]`
  to production. I need the governing jurisdiction — the country or state whose law applies.
- Contact: the UserJot board is public and already linked. Also list the email, or keep it to
  the board?

## 6. Optional, but each one adds something

- A photo. Vaultaire uses a sketch rather than a headshot; either works, and a real face helps.
- Links that establish you exist elsewhere — a personal site, GitHub, Mastodon, LinkedIn. Google
  uses these to connect an author to a real identity, which is most of what `Person` schema is for.
- The first release was June 2026 and you've shipped 13 versions since. Worth saying plainly?

---

## What happens next

1. You answer — notes are fine.
2. I write the prose into `lib/about.ts` in your voice, set `draft: false`, add the footer link,
   and publish the `Person` schema.
3. Every existing guide and scenario's author reference starts resolving, with no change to
   those files.

**One thing I won't do:** invent any of this. A fabricated founder story is worse than no about
page, and it's the one piece of content on this site that cannot be sourced from the App Store
listing or the feedback board.
