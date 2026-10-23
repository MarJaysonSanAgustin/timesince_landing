# Share-card fonts

ImageResponse reads these local TTFs through `lib/og.ts`; no font download is required
when generating share cards. Both fonts use the SIL Open Font License 1.1. The
copyright notices and license texts are included beside the binaries.

Fetched 2026-10-23 from Google Fonts:

- `Nunito-ExtraBold.ttf` (800): https://fonts.gstatic.com/s/nunito/v32/XRXI3I6Li01BKofiOc5wtlZ2di8HDDsmRTM.ttf
- `JetBrainsMono-Medium.ttf` (500): https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPQ.ttf

License sources:

- https://github.com/google/fonts/blob/main/ofl/nunito/OFL.txt
- https://github.com/google/fonts/blob/main/ofl/jetbrainsmono/OFL.txt

These are the full supplied fonts (237,620 bytes combined), not custom subsets.
Retaining their glyph coverage keeps punctuation and accented names available.
Reassess subsetting as more scripts or weights are added during localization.
