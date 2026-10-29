# Channel production notes — Ink & Atoms

"What if?" science channel: English voiceover, hand-drawn stick-figure style, YouTube (16:9) + Reels/Shorts/TikTok (9:16).
The user writes in Arabic — reply in Arabic; on-screen text and scripts are in English.

**Every rule below comes from our own analytics. The numbers live in `analytics/LOG.md`.**
After each upload, add its 48 h and 7-day numbers there. Change a rule only when 3+ uploads agree.

## Why views are not growing yet (diagnosis, 2026-10-30)
- **Shorts** each get one ~1–2k test batch and stop: only 46–59% of viewers stay past the first second
  (need ~65–70%+), few likes/comments, no rewatch loop. → Fix the first second (motion), keep them short, invite comments.
- **Long videos** get impressions but almost nobody clicks (CTR 1–3%) → thumbnails were not built for phones.
  Content is fine: the hook-first episode 3 keeps ~99% of the people who click.
- **No funnel:** shorts don't send viewers to long videos yet → "Related video" on every short, end screens, playlist.

## Scripts (long videos)
- **Hook in the first 5 s:** the most shocking number or image + a direct "you" line. Never open on "Last time…".
  Episode 3 structure (hook → promise "before this video is over I'll show you…" → re-hook every 20–30 s →
  pay off the promise → callback ending) = ~99% retention. Reuse it.
- **Put the viewer in the story** ("you fly up…", "your feet…"): those parts get the most comments.
- **Big stakes:** Earth / your body. Planet-scale disasters get the most views.
- Verify every number before recording; keep a numbers table with the script.
- **End-of-video like CTA:** a short hand-drawn shot — the stick figure points at a drawn like button, with the line
  "If this blew your mind, hit like".
- **Pinned comment:** a question that invites replies, e.g. "What should we turn the Moon into next? 🌕".
  Turn good viewer ideas into episodes and credit the commenter.
- Voice: no long whispers at the start (inaudible on phones); boost any quiet phrase in the mix (`voice_fix.py`).

## Shorts / Reels rules (from 6 shorts — see LOG)
- **Motion in the first second — NOT a static poster.** Something is being written fast, pops in, zooms or shakes
  from frame 0 (shorts that did this kept 55–59%; static full-frame openings kept only 46–53%).
  The headline/question must be readable by ~0.5–0.8 s (fast handwriting), plus a sound hit at 0.0 s.
- **Open on the strongest voice line of the clip** (a question or the title's promise), even if it comes from later
  in the long video — reorder segments. The first words must match the title.
- **Length 15–22 s** (17–22 s shorts are watched 82–94% through; 30–37 s only 49–71%). One idea per short.
- **Loop:** the last line flows back into the first; no silence or outro card.
- **Like CTA is visual only:** a like-button banner over the last ~2 s (no voice line), so the loop stays intact.
- 3–4 shorts per long episode; every short gets "Related video" → its long video.
- Audio = cut from the long video's final mix (short fades at joins) + an impact at 0.
- Builder: `shorts-source/` (`shorts.json` segments, `build.py`, `audio.py`, `render_all.sh`).

## Titles, descriptions, SEO
- Shorts: **the searchable science word first** ("Spaghettification: …", "Antimatter: …", "Hawking radiation: …").
  Search brings 6–57% of short views and keeps them alive for weeks.
- Long videos: story/experience framing ("I Replaced the Moon With Its Evil Twin") + the key science word in the
  title or first description line. Chapters in every long description.

## Thumbnails & covers — phone first (~90% of viewers watch on phones)
1. **Thick strokes:** draw on a small virtual canvas and scale up (covers: 360×640 ×3; 16:9: 640×360 ×3) so every
   ink line is ≥ ~10 px at full size. Thin detail disappears on a phone.
2. **Main subject fills 60–70% of the frame:** zoom in on the key moment; cut empty white space.
3. **One saturated focal point:** only the core of the event gets strong colour (red, fiery orange/gold glow,
   coal-black with a yellow or icy-blue glow).
4. **Text = 2–3 huge words in the top third only.** Nothing in the bottom quarter or the bottom-right corner
   (duration badge / app buttons / title).
5. **Big stick figure with a clear reaction** (shock, or an evil grin) close to the event.
6. **Show the twist, not just the claim:** the image must raise a "why?" (e.g. a giant Sun with a tiny circled
   black dot = the Moon can't cover it). A crossed-out object alone reads as a "no entry" sign.
7. **Faces big, legs cropped:** feet may leave the frame; the faces are what the eye locks onto.
- Always check a 180×320 (Shorts) / 320×180 (long) downscale before publishing.
- Make 3 different concepts per long video for Test & Compare.
- Note: in the Shorts feed viewers see the **first frame**, not the cover — the cover matters for the channel page
  and search; the first second matters for the feed.
- Builders: `shorts-source/mobile_covers.js` (9:16), `shorts-source/long_thumbnails.js` (16:9).

### Identity guardrails (Ink & Atoms) — never break these
- **Fixed template:** yellow bar with 2–3 big words at the top → ONE huge event in a saturated colour → a big
  shocked stick figure.
- **No photos, no 3D renders, no full-colour backgrounds:** light paper background (#f6f4f8 / near-white);
  a black panel only when the scene is space/night.
- **Exactly one glowing element per image** (the event itself). Everything else is plain hand-drawn ink.
- **Palette:** black ink + red #d2382c + yellow highlight + at most ONE extra colour tied to the event.
- **Always the same font (Patrick Hand SC) and the same stick-figure character**, hand-drawn wobbly lines.

## Style (see `moon-protons/source/sketch*.html`, `moon-antimatter/source/`, `moon-blackhole/source/`)
- Black ink on #f6f4f8, red #d2382c for emphasis only.
- Font: Patrick Hand SC (labels), Patrick Hand for the lowercase "e" in e⁻/e⁺.
- Protons ⊕ black, antimatter drawn in red with pink fill; dashed red ring = anti-object.
- Pop-in drawings, letter-by-letter handwriting, motion lines, shake marks, grey radial flash for explosions.
- Reels: re-lay out scenes for 1080×1920 with large text; keep content within y≈230–1560.

## Workflow
- Script → ElevenLabs v3 (voice "Mark", audio tags like [excited], [serious], [short pause]).
- Word timings: pocketsphinx forced alignment (`moon-blackhole/source/align.py`, with custom pronunciations).
- Render: Playwright frame-by-frame → ffmpeg (`moon-protons/source/render.js`, 4 workers in parallel).
- Sound: synthesized SFX + light plucked music bed (`moon-blackhole/source/sfx_v3.py`); pencil/pop cues parsed from the scene code.

## Publishing
- Category: Education; "Not made for kids".
- Long video first (US time 2–4 PM ET = 9–11 PM Mecca until Oct 31, 10 PM–12 AM from Nov 1); first short 2–3 h
  later; then one short per day (12–2 PM ET).
- Every short: "Related video" → its long video. Every long video: end screen + series playlist.
- Reply to every comment in the first hours (heart + reply ending in a question).
- Don't rewatch your own videos to check them — use Studio.
