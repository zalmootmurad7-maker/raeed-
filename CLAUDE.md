# Channel production notes — Ink & Atoms

"What if?" science channel: English voiceover, hand-drawn stick-figure style, YouTube (16:9) + Reels/Shorts/TikTok (9:16).
The user writes in Arabic — reply in Arabic; on-screen text and scripts are in English.

## Channel identity (decided by the owner, 2026-11-03) — every video must fit this
- **Promise:** "We explore impossible scientific scenarios and explain what would actually happen."
  Not "any science topic": every episode is ONE impossible scenario + the real physics of what follows.
- **Identity:** hand-drawn science animation. **Goal:** growth + monetization.
- **The Ink & Atoms Formula (long videos):**
  1. 0–5 s **Hook** — a shocking image or unexpected question ("What if the Sun suddenly disappeared?").
  2. 5–20 s **Setup** — the scenario, fast; no intro, no greeting.
  3. 20–90 s **Science** — what physically happens, shown with hand-drawn diagrams.
  4. 90–180 s **Consequences** — escalate; each result bigger than the last.
  5. End **Twist** — the most surprising real result, then a question that leads to another video.
  Rule: don't explain everything in the first 20 s — make them want the next step, but never mislead.
- **Titles & thumbnails:** title = the "What If …?" question (e.g. "What If Earth Suddenly Lost Gravity?");
  thumbnail text = 2–3 words that are NOT the title ("NO GRAVITY?!"); ONE visual idea, readable in 1 second;
  one unified visual system, but a unique image for every video.
- **Topic backlog (owner's list, in order):** 1 Sun disappeared for 8 minutes · 2 Earth lost gravity for 5 s ·
  3 Earth stopped spinning · 4 black hole near Earth · 5 Moon exploded · 6 atmosphere disappeared ·
  7 matter touches antimatter · 8 time ran backwards.

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
- **Hook delivery = [excited] / [mischievously], never [serious]** (episode 4: the [serious] hook sounded slow and
  heavy; re-recorded with [excited], Speed 1.1, then spliced onto the body). Serious tone comes later for contrast.
- **Kill dead air (ElevenLabs adds ~1 s pauses):** before alignment, run `episode4-last-light/tighten.py`:
  no lead-in silence, gaps in the hook ≤ 0.2 s (one dramatic pause ≤ 0.45 s), elsewhere ≤ 0.3 s, intentional
  [long pause] → 0.5 s. Episode 4 voice went 2:37 → 1:59 with every word kept. Fewer [pause] tags in scripts.

## Shorts / Reels rules (from 9 shorts — see LOG)
- **Motion in the first second — NOT a static poster.** Something is being written fast, pops in, zooms or shakes
  from frame 0 (shorts that did this kept 55–59%; static full-frame openings kept only 46–53%).
  The headline/question must be readable by ~0.5–0.8 s (fast handwriting), plus a sound hit at 0.0 s.
- **First-second checklist (shorts 4/5/6: 63.7% → 56.7% → 35.5% as elements went missing) — NOT SUPPORTED: the two
  shorts that passed all of it kept 48.3% (vacuum) and 48.0% (station), below the earlier average. Keep it as basic
  hygiene only; it does not move "stayed". The bigger lever is the topic ("you / your body", planet-scale):**
  1. Frame 0 is FULL: the event already drawn + a BIG shocked stick figure (face big, legs cropped); no zoom-out
     from 0.8 that leaves empty borders, no tiny object in an empty frame. Motion = punch-in 1.06→1 + shake.
  2. HUGE text (≥140 px on 1080 wide), 2–3 lines, top third, fully written by ~0.6 s.
  3. Text is a question/twist aimed at the viewer ("YOUR VACUUM DIDN'T.", "WHO LEFT THIS ON?!"), not a label.
  4. First voice words are a complete, self-explanatory sentence: never start with "And / But / So", never an
     undefined "it". Prepend the episode's premise line if needed ("Every human on Earth just vanished.").
  Reference implementation: `episode4-last-light/source/shorts7_hookcards.js`.
- **WINNING SHORTS FORMULA (confirmed by 3 uploads, 2026-11-10: SATURN OFF 69.7%/11.3k · Earth Orbits NOTHING 4.3k/day 1 ·
  Event Horizon 78.4%/5.5k):** space / planet-scale topic · ONE surprising, true fact + one precise number · 19–20 s ·
  frame 0 = the object already drawn + 150 px text + motion · first line = the claim ("Even at the speed of light, you could
  never reach most of the universe.") · ends on a short puzzle line that loops into the start · title = searchable word
  first + the claim. Household/everyday topics (vacuum, station) kept only ~48%. Make every new short with this formula.
- **Short = the doorway into the long video's story (owner rule, 2026-11-08).** The short must be enjoyable and complete
  on its own (it pays off the WHAT: one surprising, true fact + one number, as in SATURN OFF?! = 11.3k views, 69.7% stayed),
  but it does NOT give the whole explanation: it ends on a puzzle/question whose WHY and details are only in the long
  video. Never an ad ("watch the full video" as the payoff is not allowed); the funnel is the Related video link,
  the pinned comment and the open question on screen.
- **Open on the strongest voice line of the clip** (a question or the title's promise), even if it comes from later
  in the long video — reorder segments. The first words must match the title.
- **Length 15–22 s** (17–22 s shorts are watched 82–94% through; 30–37 s only 49–71%). One idea per short.
- **Loop:** the last line flows back into the first; no silence or outro card.
- **Like CTA is visual only:** a like-button banner over the last ~2 s (no voice line), so the loop stays intact.
- 3–4 shorts per long episode; every short gets "Related video" → its long video.
- Audio = cut from the long video's final mix (short fades at joins) + an impact at 0.
- Builder: `shorts-source/` (`shorts.json` segments, `build.py`, `audio.py`, `render_all.sh`).

## Delivery standard: 10/10 or don't deliver
Before handing over ANY video, cover or thumbnail, score it against every rule in this file (first-second checklist,
QA list, thumbnail rules 1–7, identity guardrails, 180×320 + 2:3 checks). If any rule fails, fix it and re-check —
deliver only when all pass, and show the user the scorecard (rule → pass + the evidence image).
"10/10" means 10/10 against our checklist; never promise view or retention numbers — two 10/10 shorts kept only 48%.

## Before delivering ANY short (QA — mistakes we already made)
Do every step and show the user the evidence; never hand over a short on "it looks fine".
1. Send the user frame 0.0 s and frame 0.6 s + the first voice sentence in writing (first-second checklist above).
2. Contact sheet of the whole short (a frame every ~1.5 s), checked at phone size: no scene copied from the 16:9
   video without a vertical re-layout (episode 4: tiny city cut off at the edge), no small text, no big empty areas.
3. Nothing important below y≈1560 (YouTube title/buttons cover it) and nothing hidden under the like banner.
4. Measure hook text size (≥140 px) — don't eyeball it.
5. Cover: 180×320 downscale AND the centre 2:3 crop (channel page / Studio).
6. Post text: "Related video" = the exact published title; a short-specific pinned question.

## Titles, descriptions, SEO
- Shorts: **the searchable science word first** ("Spaghettification: …", "Antimatter: …", "Hawking radiation: …").
  Search brings 6–57% of short views and keeps them alive for weeks.
- Long videos: story/experience framing ("I Replaced the Moon With Its Evil Twin") + the key science word in the
  title or first description line. Chapters in every long description.

## LONG-VIDEO THUMBNAILS — new style (owner decision, 2026-11-10)
Owner: "our content is good, our thumbnails are weak — I wouldn't click them". Long videos (CTR 1–3% on every upload) switch
to a clean ink-SCENE style inspired by the most successful "what if" illustration channels (our own drawings — never copy
another channel's logo, badge, characters or images):
- ONE absurd moment drawn as a scene (Jupiter where the Moon should be, you seeing the back of your own head), not a poster.
- Greyscale ink (white paper, or dark grey for space/night) + exactly ONE red element (the key object or path).
- Little text, hand-lettered INSIDE the drawing (a speech bubble "WAIT... IS THAT ME?!", a small label "OLD MOON"); no yellow bar.
- Our stick figure with the red scarf reacts in the scene; real scale and empty space are allowed if the idea reads at 320×180.
- Builder: `thumbnails-source/xk.html` (+ `xk.js`). Still check the 320×180 downscale. Shorts covers keep the rules below.

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
- **Shorts covers are shown cropped to ~2:3** on the channel page and in Studio (≈8% cut off top and bottom):
  keep ALL text, faces and the event inside y ≈ 200–1720 of 1920 (covers 4–6 lost the top of their text).
  Check the centre 2:3 crop of every cover before publishing.
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
- **Audio mix levels (owner rule, CapCut-style %, voice = 100% reference):** voice 100%, peak ≈ −6 dBFS, no echo/reverb;
  music 20% base → 10% under speech → 25% in silences; extra ducks: 5% for 1 s on key lines, 0% for 0.5 s on big hits;
  SFX bus 75% (bass drop 80%, power click 90%, crickets 40%, ding 80%, counter ticks 50%). **Owner, ep. 6: SFX still covered the voice** → after the per-cue %, scale the whole SFX bus ×0.4 and duck it
  a further ~7 dB under every spoken word; target SFX ≥ 15 dB under the voice during speech (ep. 6: 16 dB). Then one static gain to
  −14.5 LUFS + limiter at −1 dBFS (keeps the ratios). Reference: `episode5-sun-8-minutes/source/sfx5.py`.
- Sound: synthesized SFX + light plucked music bed (`moon-blackhole/source/sfx_v3.py`); pencil/pop cues parsed from the scene code.

## Publishing
- Category: Education; "Not made for kids".
- Long video first (US time 2–4 PM ET = 9–11 PM Mecca until Oct 31, 10 PM–12 AM from Nov 1); first short 2–3 h
  later; then one short per day (12–2 PM ET).
- Every short: "Related video" → its long video. Every long video: end screen + series playlist.
- Reply to every comment in the first hours (heart + a reply).
- **Comment replies must sound like the owner, a real person (owner rule, 2026-11-10, after a viewer wrote "why you respond like AI"):**
  1–2 short lines, casual (lowercase ok, "lol", "tbh", "yeah"), max one emoji or none, no "Spot on! 🎯"-style openers,
  no long explanations, no em dashes, no perfect formatting, NOT a question every time (only now and then).
  Keep the science correct but say it the way a friend would.
- Don't rewatch your own videos to check them — use Studio.
