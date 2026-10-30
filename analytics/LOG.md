# Analytics log — Ink & Atoms

Raw numbers from YouTube Studio. Add a row at **48 h** and at **7 days** for every upload.
Change a rule in `CLAUDE.md` only when **3 or more uploads point the same way** (one video is noise).

## Shorts (snapshot 2026-10-30)

| Short | Posted | Length | First second | Stayed (vs swiped) | Avg view | % watched | Views | Subs | Comments | Search share |
|---|---|---|---|---|---|---|---|---|---|---|
| What If the Moon Were Made of Protons? | 10-24 | 0:37 | "THE MOON" being written + Moon zooming in (motion) | **58.4%** | 0:18 | 49% | 1.4k | +3 | 2 | 57% (now) |
| 1 gram of antimatter = 3 Hiroshima bombs | 10-25 | 0:31 | question being written + drawing pops (motion) | **59.3%** | 0:22 | 71% | 1.5k | +3 | 0 | 17% |
| What if an antimatter Moon hit Earth? | 10-26 | 0:30 | question being written + drawing pops (motion) | **55.1%** | 0:19 | 63% | 1.9k ↑ | 0 | 0 | 8% |
| The Moon became a black hole… (Nothing changes) | 10-28 | 0:25 | full static wall of digits | **46.0%** | 0:18 | 72% | 1.2k | +2 | 0 | 6.5% |
| Never try to land on an antimatter Moon | 10-28 | 0:17 | full static card | **53.5%** | 0:16 | **94%** | 1.3k | +1 | 2 | 4% |
| What a black hole does to you from 6 km away | 10-29 | 0:22 | full static card ("TONIGHT…") | **49.8%** | 0:18 | **82%** | 1.5k | +1 | **5** | **22.6%** |
| **Antimatter: what if you met your evil twin?** (corrected rule) | 10-30 | 0:18 | fast-written question + figures pop in, voice opens on the promise | **61.9%** (5 h) | 0:15 | 83% | 1.4k in ~2 h | – | – | – |

## Long videos (snapshot 2026-10-30)

| Video | Posted | Length | Thumbnail at the time | Impressions | CTR | Views / unique | Avg view | % watched | Main source |
|---|---|---|---|---|---|---|---|---|---|
| I Replaced the Moon With Its Evil Twin | 10-24 | 2:28 | old (thin lines) | 710 (flat after day 2) | **3.0%** | 49 / 26 | 1:02 | **42%** | suggested 47%, browse 33% |
| I Turned the Moon Into a Black Hole. Nothing Happened… Almost. | 10-27 | 2:36 | old (thin lines) | 201 | **1.0%** | 14 / **3** | 2:35 | **~99%** | browse 71% |

Likes on long videos: ~0. "Hype": 0 everywhere.

## What the data says (and what was wrong)

1. **WRONG RULE, now removed:** "frame 0 must show the full headline, static" → the 3 shorts made that way kept
   **46–53.5%**, the 3 with motion in the first second kept **55–59%**. The eye in the Shorts feed reacts to
   *movement*, not to a finished poster.
2. **RIGHT RULE, kept:** short length. 17–22 s shorts are watched **82–94%** through; 30–37 s only 49–71%.
3. **Every short stops at ~1–2k views.** That is the first test batch. To unlock the next wave a short needs
   **≥ 65–70% stayed**, rewatches (loop) and likes/comments. We are at 46–59%: the first second is the bottleneck.
4. **"You" topics get comments** (spaghettification: 5 comments in a day; viewers asked about their own body).
   **Planet-scale stakes get views** (Anti-Moon vs Earth: most views, still growing).
5. **Search is the long tail.** Shorts keep getting found by searchable words (spaghettification 22.6%,
   protons short now 57% search). Put the searchable science word at the **start** of the title.
6. **Long videos: the bottleneck is the thumbnail (CTR 1–3%), not the content.** Episode 3 (hook-first script
   with re-hooks every 20–30 s) is watched ~99% by those who click. Episode 2 (opened on "Last time…") 42%.
   Impressions stall after day 1–2 because too few people click.
7. **The shorts → long funnel is not working yet:** almost no long-video traffic comes from Shorts. Every short
   must have "Related video" set; long videos need end screens + a playlist.
8. **Owner rewatches distort small numbers** (black-hole video: 14 views from 3 people). Check numbers in Studio only.

## Open experiments
- **Episode 4 (last light):** hook re-recorded with [excited] + dead air removed (2:37 → 1:59 voice). Compare its
  retention curve's first 10 s and avg % watched with episode 3 (~99%) and episode 2 (42%).
- **First result (short 4, 5 h):** 61.9% stayed — best of all 7 shorts (previous 46–59%), 1.4k views in ~2 h. Confirm with shorts 5–6 before treating as proven.
- **Thumbnail style test:** each long video gets a 4th "minimal" concept (one absurd situation, 1–2 words,
  thick ink, a single red accent, no yellow bar): `phone_4_minimal_*`. Run it in Test & Compare against 2 of our
  standard concepts. If minimal wins on 2+ videos, add it as an allowed template in CLAUDE.md.
- **Short covers (style test):** shorts 4–6 have `cover.png` (standard) and `cover_minimal.png` (minimal). YouTube has no
  A/B test for Shorts covers → alternate: 4 = minimal, 5 = standard, 6 = minimal; compare channel-page/search views.
- Shorts 4–6 (evil twin, eclipses, colder than space) re-cut with the corrected rule: motion in the first second,
  strongest voice line first, 15–19 s, searchable word first in the title. Compare "stayed" with the table above.
- Phone-first thumbnails (A/B/C via Test & Compare) on both long videos. Compare CTR with 3.0% / 1.0%.
