# CLAUDE.md — Frankly Explained Production Rules (`Bold Ink & Motion` — Universe Kill Edition)

## 1. Project Overview
- **Channel:** Frankly Explained (Science Edutainment)
- **Active Video:** *Every Way the Universe Is Trying to Kill You Explained in 10 Minutes*
- **Resolution & Master FPS:** `3840x2160` (4K 16:9) or `1920x1080` preview, **Steady 30 FPS** master timeline.
- **Target Stack:** Remotion (React + TypeScript + SVG), driven by `universe_kill_micro_shot_list.md`, `every_way_universe_tries_to_kill_you_script.md`, `audio/voiceover.mp3`, and `audio/timestamps.json`.

## 2. Critical Layout & Pacing Upgrades (Lessons from Video #1)
1. **Strict 3–5s Visual Beat Cap (NO Static 20s Boards):**
   - **NEVER** hold the `4x2` MasterBoard—or any single static card—for more than **3–5 seconds**, especially inside the critical `0:00–0:30` retention window.
   - During the intro explanation, cut every `3–4s` between: `couch_chill` + cosmic ray hook -> `4x2` MasterBoard (`3.5s` max) -> animated **Warning-Time Countdown Bar** (`YEARS -> HOURS -> 0.00 SECONDS`) -> `#8 ???` locked card flash -> zoom into Card `#1`.
2. **Presenter Scaling & Stage Dominance (`75%–95%` Explanation Canvas):**
   - **NEVER** lock the whole video into a rigid `30% giant character / 65% small card` split with empty margins.
   - **Hero Intro / Emotion Beat (`1.5–2.5s`):** Character appears larger (`~26–30%` width) ONLY when introducing a new reaction or emotion.
   - **Docked Corner / Full-Stage Mode (`75%–95%` Canvas):** Immediately after the `1.5–2.5s` beat, either shrink/dock the character cleanly to the bottom-left corner (`~16–18%` width) OR exit the character entirely on **Full-Stage Diagrams** so diagrams, orbits, shockwaves, and numbers fill the frame boldly.
3. **Strict No-Overlap & Safe Margins:**
   - Maintain **at least `36px` (at 1080p) / `72px` (at 4K)** of clear space between any heading/pill/label and any planet, sun, wind line, or diagram icon. Never draw wind lines or suns across text or planet edges.
   - Place ALL `WARNING TIME` badges strictly in the **TOP-RIGHT corner** (`top: 48px, right: 64px` at 1080p) so YouTube's bottom progress bar and end-screen overlays never cover them.
4. **Consistent Character & Intentional Background:**
   - Use the **Red T-shirt character** (`assets/character/light/` + `assets/character/couch/`) as the single consistent hero throughout the video (do NOT randomly swap to the astronaut suit).
   - **Light Canvas (`#F6F4EF`)** is the primary identity for Earth, everyday analogies, comparisons, MasterBoard, and Chapters 1 & 3.
   - **Space Mode (`#0E131F`)** is reserved *intentionally* for deep-space phenomena (Chapter 2 Rogue Black Hole void, Chapter 4 Solar CME, Chapter 5 Supernova, Chapter 6 Magnetar, Chapter 7 GRB, and the expanding `#E53935` bubble in Chapter 8).

## 3. Strict Visual Design Tokens (`Bold Ink & Motion`)
- **Light Canvas Mode:** Background `#F6F4EF` + subtle dot grid `#E6E2D8` (`opacity: 0.4`), Card `#FFFFFF`, Ink/Border `#141824`, Shadow `#CBD5E1`.
- **Space Mode:** Background `#0E131F` + minimal static `2–4px` stars, Card `#161E2E`, Border `#E2E8F0`, Text `#F6F4EF`.
- **Semantic Accents:** Brand Red / Danger `#E53935`, Science Blue `#2563EB`, Molten Amber `#F59E0B`, Safe Green `#10B981`.
- **Typography:** `Space Grotesk` (700/800) headings & uppercase pill tags; `Inter` (500/600) body; `JetBrains Mono` with `font-variant-numeric: tabular-nums` for all numbers & countdowns.
- **Explainer Card Spec:** `border-radius: 18px`, `3px` solid border (`#141824` on Light, `#E2E8F0` on Dark), solid offset shadow (`4px 4px 0px`).

## 4. Character & Zero-Shake Rules (CRITICAL)
1. **NEVER procedurally draw the character in code.** Load the pre-cut transparent PNG sprites:
   - `assets/character/light/`: `explaining.png`, `shocked.png`, `the_catch.png`, `thinking.png`
   - `assets/character/couch/`: `couch_chill.png`, `couch_hide.png`, `couch_shocked.png`
   - (`assets/character/space/` is included only if needed for a brief space helmet gag; default hero is Red T-shirt.)
2. **STRICT `0px` SHAKE / STEADY 30 FPS RULE:**
   - **DO NOT** add `Line Boil`, `1–2px` jitter, rotation wobble, or `posterizeTime` frame-stepping.
   - Keep every character, card, and label rock-steady at 30 FPS using clean `spring()` / cubic-bezier transitions.

## 5. Audio Pipeline, Whisper Sync & SFX
1. **Audio Merge & Processing (FFmpeg):**
   - Concatenate `mp3-1.mp3`, `mp3-2.mp3`, `mp3-3.mp3` in order.
   - Trim silences `>0.25s` (`silenceremove=stop_periods=-1:stop_duration=0.25:stop_threshold=-40dB`), then speed up `atempo=1.06` (`~9:40–9:50` final runtime), normalize loudness (`-16 LUFS`).
2. **Whisper Sync:** Generate `audio/timestamps.json` from the final processed `audio/voiceover.mp3` and align every chapter/shot boundary to exact spoken timestamps.
3. **Synthesized SFX (`assets/sfx/`):** Synthesize 5 clean, subtle SFX (`Pop_Card`, `Thud_Catch`, `Whoosh_Snap`, `Whoosh_Zoom`, `Tick_Counter`) and place on exact transition frames.

## 6. Verified Scientific Labels (Do NOT Alter Values)
- **#1 Cosmic Rays (`WARNING TIME: 0s (HAPPENING NOW)`):** `3.2×10²⁰ eV` ("Oh-My-God Particle", `1991`), `1 PROTON = 1 PITCHED BASEBALL`, `>200,000 YEARS` for light to pull `1 CM` ahead, `2003 BELGIUM: +4,096 VOTES (0 -> 1 BIT FLIP)`.
- **#2 Rogue Black Hole (`WARNING TIME: YEARS TO DECADES`):** `~100 MILLION` in Milky Way, `~40 KM` city-sized, `2022 HUBBLE · ~5,000 LY AWAY` microlensing.
- **#3 Asteroid Impact (`WARNING TIME: YEARS — OR 0s`):** `10 KM` Chicxulub (`66M YRS AGO · ~75% SPECIES`), `2013 CHELYABINSK · 20M · 0s WARNING (SUN'S GLARE) · ~1,500 INJURED`.
- **#4 Solar Superstorm (`WARNING TIME: ~18 HOURS TO 3 DAYS`):** `1859 CARRINGTON EVENT · 17.6 HOURS (150M KM)`, `JULY 2012 NEAR MISS · ~9 DAYS`.
- **#5 Nearby Supernova (`WARNING TIME: HOURS (NEUTRINO FLASH)`):** `30–50 LY` danger zone (`NONE WITHIN 50 LY`), `NEUTRINO ALARM` hours before radiation.
- **#6 Magnetar Starquake (`WARNING TIME: 0.00 SECONDS`):** `1,000 TRILLION× EARTH'S FIELD`, `HALFWAY TO MOON = WIPES CREDIT CARDS`, `1,000 KM = DISTORTS ATOMS`, `2004 SGR 1806-20 · TENS OF THOUSANDS OF LY · 0.2s BLAST (>100,000 YRS SUNLIGHT)`, `10 LY = OZONE STRIPPED`.
- **#7 Gamma-Ray Burst (`WARNING TIME: 0.00 SECONDS`):** `SEVERAL THOUSAND LY` danger zone, `OCT 2022 GRB 221009A · ~2.4 BILLION LY · DISTURBED IONOSPHERE`.
- **#8 False Vacuum Decay (`WARNING TIME: 0.00s (IMPOSSIBLE TO SEE)`):** Higgs field false vacuum -> quantum tunnel -> true vacuum bubble at `NEARLY SPEED OF LIGHT`.

## 7. Mandatory Pre-Render Verification (4 Test Frames)
Before rendering the full 4K video, render and visually inspect these 4 frames (`1920x1080` or `3840x2160`):
1. `test_frame_01_cold_hook.png` — `00:01` `couch_chill` + `#2563EB` cosmic ray piercing ceiling (verify clean cut-out & framing).
2. `test_frame_02_masterboard.png` — `00:05` `4x2` MasterBoard (verify all 8 cards legible, `#8 ???` highlighted, zero overlap).
3. `test_frame_03_full_stage_diagram.png` — Chapter 4 (`Solar Superstorm`) or Chapter 5 (`Supernova`) Full-Stage Diagram (verify `75%–95%` canvas dominance, `TOP-RIGHT` `WARNING TIME` badge, zero text/planet overlap).
4. `test_frame_04_couch_vacuum.png` — Chapter 8 (`False Vacuum Decay`) `couch_shocked` + `#E53935` reality-reset bubble sweep.
