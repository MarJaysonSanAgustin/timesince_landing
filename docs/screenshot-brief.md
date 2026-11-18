# Screenshots — what to capture

**This is the one thing I cannot do.** Capturing these needs the app running with
believable data, and invented-looking counters would undo the point of having real
screenshots at all.

## Why they need replacing

The 11 screenshots in `assets/features/` were committed on **10 August 2026**. The ticket
redesign shipped in **v1.11 on 13 October**. They are six releases behind, and it shows:

| In the current screenshots | In the app today |
|---|---|
| Purple gradient FAB with a glow | Flat fills — ADR-012 rule 8 forbids gradients |
| Square white cards, no structure | Ticket: block │ perforation │ stub |
| Cool grey ground | Warm paper `#F1EFEA`, six paper colours |
| Dates set in the sans | Menlo for every count, date and interval |
| Tabs: Counters · Timeline · Explore · Settings | A **Stats** tab, added in v1.7 |

The missing Stats tab dates them precisely: before 24 August.

The site's own design now matches your app more closely than your screenshots do, which is
an odd thing for a marketing site to be true of.

## How to capture

- **One device** for all of them — iPhone 17 Pro simulator is fine, and consistent framing
  matters more than which device.
- **PNG, under 400 KB each.** `npm run content:stats` warns above 500 KB.
- **Light mode, warm paper, dots** — that is the default and what the site is built around.
  If you add dark mode captures later they can go in as a second set.
- **Same time on the status bar** across all of them, if you can. Mismatched clocks between
  adjacent screenshots on one page is the kind of thing people notice without knowing why.
- Replace the files **in place**, keeping the names in `assets/features/`. Nothing else needs
  editing — `lib/features.ts` references them by import and the whole site follows.

## The data in them matters more than the framing

The counters on screen are the most-read copy on the homepage. Right now they are things
like "Read 2+ pages" and "Exercise", which read as placeholder.

Use the App Store listing's own examples, because they are concrete and they are already how
you describe the product: **plants watered, parents called, car oil changed, migraine
logged.** Mix in household intervals — water filter, air purifier filter, smoke detector —
since those are the use cases the guides cover.

Give them **plausible elapsed times**, not all "2 days ago". A good set has something at
3 days, something at 3 weeks, and something at 7 months. The range is the product.

## The eleven

| File | Feature | What it should show |
|---|---|---|
| `hand-app.png` | Hero | The counters list, in hand. The single most important image on the site. |
| `custom.png` | Counter customization | Choosing colour, icon, paper for a counter |
| `rhythm.png` | Rhythm analytics | The interval chart with a real trend — the thing an App Store reviewer singled out |
| `private.png` | Hidden counters | The Face ID layer, without revealing anything |
| `custom-inputs.png` | Custom logging fields | A number field with the calculator keyboard |
| `timeline.png` | Timeline | The calendar above, grouped entries below |
| `widget.png` | Home screen widget | The **medium** widget with four counters — v1.9, and a scenario depends on this |
| `siri.png` | Siri | Logging by voice |
| `nfc.png` | NFC tap-to-log | A phone tapping a tag on an actual object |
| `quit.png` | Quitting mode | A counter climbing, ideally with the reset receipt |
| `icloud.png` | Encrypted iCloud backup | The sync setting, showing it is off by default |

## Worth adding, not just replacing

The pages that feel emptiest are the ones with no image at all. Two new captures would carry
a lot:

- **A ticket receipt** — the printed receipt from a log or a quit reset. It is the most
  distinctive thing the app does visually, and nothing on the site shows it.
- **Milestone badges** — the 38 illustrated badges from v1.13. Nothing on the site shows
  these either, and they are the newest visible feature.

Drop any new ones in `assets/content/` and run `npm run assets:sync`; they become available
to guides and scenarios by key.
