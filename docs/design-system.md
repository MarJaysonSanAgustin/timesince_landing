# Design system

**Source:** the app's own ADRs — `docs/architecture/adr/012-the-ticket-is-the-visual-identity.md` and `013-ink-on-paper-and-the-users-paper.md` in the `kailan` repo — plus `lib/theme/` and `lib/components/ticket/`. Decided 2026-10-09 and 2026-10-11; shipped in app v1.11.

---

## The headline problem

**The site's current visual language is the opposite of the app's.**

ADR-012 rule 8 is explicit: *"Flat fills — no gradients, no patterned banners."* The site is built almost entirely from gradients — the hero headline, all eleven feature cards, the OG image, and the accent system I added in Phase 1, which generates a `linear-gradient` for every content page.

This is not a small mismatch. Someone arriving from the App Store sees a different product. The accent system needs reworking before Phase 2 adds per-page OG images that would bake the gradients in further.

## The identity: a ticket

> **The colour-block ticket is the app's visual identity.** Every surface is built from one kit.

A ticket is: **colour block → perforation → stub**. The block carries the mark, name and figure; the stub carries label-left / value-right rows; a hairline runs round the outside; the bottom edge can be torn.

### The eight rules (ADR-012, as amended by ADR-013)

1. **Ground** — dotted paper on every tab root and every pushed page. *Sheets keep the paper colour but lose the dots* — "a sheet is a visit, a page is a place."
2. **Header** — one 30pt title, one round action.
3. **Colour has an owner** — a counter's colour appears only on things about that counter. **App-level blocks print in ink** (near-black), not in the brand purple.
4. **Lead with one ticket** — block, perforation, stub.
5. **Rows** — label left, value right. No rule, no icon tile.
6. **Links elsewhere are stubs** — block │ perforation │ title and line │ caret.
7. **Two voices of type** — system sans to read, **Menlo (mono)** for counts, times, dates, kinds and section labels.
8. **Flat fills** — no gradients, no patterned banners.

Rule 3 is worth dwelling on: the app *removed* its own brand purple from large blocks because a purple app block and a purple counter ticket were indistinguishable. Purple survives only as a small accent — a button fill, the selected tab, a switch.

## Tokens

### Paper — the ground

Six papers, each with a light and dark shade. The user picks one; it is stored by index, **append-only** (a reorder would hand everyone a different paper on restore).

| Paper | Light | Dark |
|---|---|---|
| warm *(default)* | `#F1EFEA` | `#0F0D13` |
| cool | `#F4F4F5` | `#16181C` |
| sage | `#E8EEE4` | `#121C15` |
| sky | `#E6EEF3` | `#0F1923` |
| blush | `#F5E9E8` | `#22141A` |
| butter | `#F6F0DC` | `#1F1A0E` |

Four rules (patterns) print on it: **dots** (default, 16pt grid), **plain**, **grid** (16pt), **ruled** (28pt). The dots' ink on warm paper is `#D2CEC6`; on dark, white at 7%.

### Brand

| Token | Value | Use |
|---|---|---|
| `primary` | `#5C247A` — *Ube Halaya* | **accent only** — button fills, selected tab, switches. Never a block. |
| `secondary` | `#D0B4DE` — *Ube Pastel* | |
| `accent` | `#FFC300` — *Mango* | |

The names are Filipino desserts. The repo is called *kailan* — "when" in Filipino. Worth knowing; probably not worth explaining on the site.

### Ink — three solid colours, never alpha

| Ink | For | APCA floor |
|---|---|---|
| **ink** | titles, values, anything read first | the theme's `onSurface` |
| **muted** | sub-headers, explainers, labels, secondary lines | **Lc 67** |
| **faint** | placeholders, an empty value's dash, a disabled label — *never a sentence* | **Lc 45** |

Two rules that come with this, both the result of a real failure:

- **Alpha is not a text colour.** It stays for fills, borders and hairlines. Secondary text used to be `onSurface` at 0.4–0.6 across 54 sites, which composited to roughly Lc 44–60 — below the 60 APCA asks of body text.
- **Contrast is APCA, not WCAG 2.** On coloured fills, black-or-white is chosen by APCA (`EventAccent.inkOn`). WCAG 2's luminance crossover put blue, teal, green, red and deep orange in black; APCA puts them in white, "as the eye does."

### Ticket stock

A ticket is a different stock from the desk it lies on: stub paper is white (light) or `#2A2631` (dark), regardless of the user's chosen ground.

| Token | Light | Dark |
|---|---|---|
| ink | `#1B1526` | `#F2EEFF` |
| block *(app-level)* | `#1E1B22` | `#3B3644` |
| edge (hairline) | ink @ 12% | white @ 10% |
| hair (between rows) | muted @ 18% | |

### Type

Two voices, and only two — there were four until 2026-10-09, and they "read as a ticket that could not decide what it was."

- **System sans** — everything a person reads: name, figure, stub, footnote, note.
- **Menlo, fallback Courier** — what the machine prints: the meta line, the figure's label, the run's dates, the serial. Labels are 12pt / w500 / 1.2 line-height (raised from 10.5pt, which was found below comfortable reading).

**The site uses Nunito for everything.** There is no mono voice at all, and Nunito is not the app's sans.

## Motifs worth carrying to the web

These are what make it recognisable, and most are cheap in CSS/SVG:

- **Perforation** — a 5pt dash / 5pt gap line with notches cut at both ends
- **Torn bottom edge** — the ticket has come off the printer
- **Barcode** — full-width, under the stub
- **Paper grain** — a faint seeded texture on the stub
- **Serial numbers** — every Timeline entry prints `No. 008`
- **Receipts** — printed on create, log, and quit-counter reset
- **Stamps**, **slide-to-confirm**, **number wheels**
- **Clay icons** — `assets/images/clay-icons/`; they stay, but on a flat block

## Translating to the web

A proposal, not a decision — this needs the owner's eye before it is built.

1. **Replace the gradient accent system with flat colour blocks.** The six accents become six flat fills, with APCA-chosen black-or-white text. This changes `globals.css`, `lib/accent.ts` and `FeatureRow`.
2. **Put the page on paper.** Warm `#F1EFEA` with a 16pt dot grid as the site ground, replacing plain white.
3. **Cards become tickets.** Guide cards, feature rows and related-page cards get block │ perforation │ stub. A CSS-only perforation is a repeating-linear-gradient; notches are a mask.
4. **Add the mono voice.** A monospace stack for dates, intervals, counts, serials and section labels. This alone would make the site read as the same product.
5. **Adopt the three inks.** Replace the ad-hoc `text-gray-500/600/900` with ink / muted / faint at their APCA floors.
6. **Demote purple to an accent.** Buttons and links only — never a large block, per rule 3.
7. **Drop `prose-purple`** and the gradient OG image.

**Open questions for the owner:**
- Should the site offer the paper picker too, or ship warm + dots only?
- Which sans? The app uses the iOS system face, which has no direct web equivalent. Nunito is friendly but not the app's voice.
- How literal should the ticket be — tickets everywhere, or the ground, inks and mono voice with tickets reserved for real content cards?
