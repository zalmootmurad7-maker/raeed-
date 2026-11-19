# CLAUDE.md — Ink & Atoms Production Rules (`Bold Ink & Motion` — Planets Edition)

## 1. Project Overview
- **Channel:** Ink & Atoms (Science Edutainment)
- **Active Video:** *Every Planet That Shouldn't Exist Explained in 12 Minutes*
- **Resolution & Master FPS:** `3840x2160` (4K 16:9) or `1920x1080` preview, **Steady 30 FPS** master timeline.
- **Target Stack:** Remotion (React + TypeScript + SVG), driven by `planets_micro_shot_list.md`, `every_planet_that_shouldnt_exist_script.md`, `audio/voiceover.mp3`, and `audio/timestamps.json`.

## 2. Strict Visual Design Tokens (`Bold Ink & Motion`)

### Color Palette
- **Light Canvas Mode (Default Explanation):**
  - Background: `#F6F4EF` with subtle dot grid `#E6E2D8` (`opacity: 0.4`)
  - Card Surface: `#FFFFFF`
  - Primary Ink / Borders / Text: `#141824`
  - Flat Cel Shadow: `#CBD5E1`
- **Space Mode (Cosmic Scale, Extreme Heat & "The Catch" Beats):**
  - Background: `#0E131F` with subtle dark dot grid & minimal static `2–4px` stars
  - Card Surface: `#161E2E`
  - Card Border: `#E2E8F0`
  - Primary Text: `#F6F4EF`
- **Semantic Accents (Both Modes):**
  - Brand Red / Alerts / Danger: `#E53935`
  - Science / Data Blue: `#2563EB`
  - Heat / Molten Amber: `#F59E0B`

### Typography
- **Headings & Pill Tags:** `Space Grotesk` (700/800), uppercase for pill tags.
- **Card Body & Labels:** `Inter` (500/600).
- **Numbers, Timers & Telemetry:** `JetBrains Mono` with `font-variant-numeric: tabular-nums` (mandatory so numbers never jitter during count-ups).

### Explainer Card Spec
- Rounded rectangle (`border-radius: 16px`), `3px` solid border (`#141824` on Light, `#E2E8F0` on Dark), solid offset drop shadow (`4px 4px 0px #141824` on Light, `4px 4px 0px #060911` on Dark).
- Top-left pill tag (`border-radius: 999px`): `#2563EB` for numbered chapters (`01 · HD 189733 b` through `10 · 8 UMi b`), `#E53935` for danger/impossible callouts.

## 3. MasterBoard (`5x2` Grid) & Camera Navigation
1. **00:00 MasterBoard Overview (`5x2` Grid):** Start on a `MasterBoard` (`7680x4320` virtual 4x canvas) showing all **10 Planet Cards** arranged in 2 rows × 5 columns (`01 HD 189733 b` through `10 8 UMi b / Halla`). Card `#10` pulses subtly with a `#E53935` border during the `00:00` hook (`~1.8s` hold).
2. **Board Zoom-In (`0.4s` Cubic Ease):** Smoothly zoom into **Card 01 (`HD 189733 b`)** to begin Chapter 1.
3. **Chapter Transitions (`Zoom Out -> Pan -> Zoom In`):** At the end of each chapter, pull back (`0.35s`) to the `MasterBoard` (marking finished cards with a crisp `#2563EB` checkmark badge), pan to the next card, and zoom in (`0.35s`) to full-frame explanation.

## 4. Character & Zero-Shake Rules (CRITICAL)
1. **NEVER procedurally draw the character in code.** Always load the pre-cut transparent PNG sprites from:
   - `assets/character/light/`: `explaining.png`, `shocked.png`, `the_catch.png`, `thinking.png`
   - `assets/character/space/`: `explaining.png`, `shocked.png`, `the_catch.png`, `thinking.png`
2. **STRICT `0px` SHAKE / STEADY 30 FPS RULE:**
   - **DO NOT** add `Line Boil`, `1–2px` position jitter, rotation wobble, or `posterizeTime` frame-stepping on characters, cards, or text.
   - Keep **every character, card, and label rock-steady at 30 FPS** using clean `spring()` / cubic-bezier transitions (`Card Pop`, `Snap Zoom`, `Push-in`, `Whip Pan`).
   - Only swap character poses cleanly on beat boundaries (`cross-dissolve` 2–3 frames or crisp cut on SFX).

## 5. Audio Sync, Pacing & SFX
- **Micro-Shot Pacing:** Trigger a visual state change, prop/diagram update, or camera move every **3–5 seconds** following `planets_micro_shot_list.md`.
- **Voiceover Sync:** Align every shot start/end frame directly to `audio/timestamps.json` (generated from `audio/voiceover.mp3` via Whisper). Do NOT use guessed durations when `timestamps.json` is present.
- **SFX Triggers (`assets/sfx/`):** Place `Pop_Card`, `Thud_Catch`, `Whoosh_Snap`, `Whoosh_Zoom`, and `Tick_Counter` on the exact transition frame.

## 6. Scientific Accuracy Guardrails (Do NOT Alter Numbers)
Use ONLY the verified values from `every_planet_that_shouldnt_exist_script.md`:
- **HD 189733 b:** `63 ly`, `2.2-day` orbit, `1,700°F`, winds up to `5,400 mph` (~7x speed of sound), molten silicate/glass rain.
- **TrES-2b:** `750 ly`, reflects `<1%` of light (darker than coal), faint red thermal glow.
- **WASP-76b:** `640 ly`, `>2,400°C` (`4,300°F`) dayside, `18,000 km/h` winds, `~1,500°C` nightside, liquid iron rain.
- **KELT-9b:** `670 ly`, `<1.5-day` orbit, `~4,600 K` (`~7,800°F`) dayside, star `>10,000 K` (`10,170 K`), comet-like evaporating tail.
- **WASP-12b:** `~1-day` orbit, egg-shaped tidal distortion, pitch-black, `~10 million years` or less before being devoured.
- **TOI-849b:** Neptune-sized radius, `~40x` Earth mass, `18-hour` orbit, "Neptune Desert", exposed rocky core.
- **PSR J1719-1438 b:** `2h 10m` orbit around millisecond pulsar, ~Jupiter mass, denser than platinum, crystalline carbon/diamond core.
- **PSO J318.5-22:** `80 ly`, `6x` Jupiter mass, `~12 million years` old, rogue planet (no star), glowing infrared with molten-metal clouds.
- **PSR B1620-26 b (Methuselah):** `12,400 ly` (Messier 4), `>2x` Jupiter mass, `12.7 billion years` old (universe `13.8B`), orbits pulsar + white dwarf (`~100-year` orbit).
- **8 UMi b (Halla):** `500+ ly`, orbits red giant Baekdu at `0.5 AU`, star should have expanded `1.5x` Halla's orbit.

## 7. Mandatory Pre-Render Verification
Before rendering the full 12-minute video, build `src/tokens.ts`, `MasterBoard.tsx`, and core components, then **render and visually inspect 4 test frames**:
1. `test_frame_01_masterboard.png` — `00:00` `5x2` MasterBoard overview (verify all 10 cards legible, `#10` highlighted).
2. `test_frame_02_light_canvas.png` — Chapter 1 (`HD 189733 b`) Light Canvas + `explaining.png` sprite (verify `0px` overlap, clean borders).
3. `test_frame_03_space_kelt9b.png` — Chapter 4 (`KELT-9b`) Space Mode + thermometer comparison + `shocked.png` sprite.
4. `test_frame_04_space_halla.png` — Chapter 10 (`8 UMi b / Halla`) Space Mode + `1.5x` red giant engulfment ring diagram.
