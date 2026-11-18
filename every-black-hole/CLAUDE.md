# CLAUDE.md — Ink & Atoms Production Rules (`Bold Ink & Motion`)

## 1. Project Overview
- **Channel:** Ink & Atoms (Science Edutainment)
- **Active Video:** *Every Type of Black Hole Explained in 12 Minutes*
- **Resolution & Master FPS:** `1920x1080` (16:9), **30 FPS** master timeline.
- **Target Stack:** Remotion (React + TypeScript + SVG) or After Effects ExtendScript (`.jsx`), driven by `black_hole_micro_shot_list.md` and `audio/voiceover.mp3`.

---

## 2. Strict Visual Design Tokens

### Color Palette
- **Light Canvas Mode (Default Explanation):**
  - Background: `#F6F4EF` with subtle dot grid `#E6E2D8` (`opacity: 0.4`)
  - Card Surface: `#FFFFFF`
  - Primary Ink / Borders / Text: `#141824`
  - Flat Cel Shadow: `#CBD5E1`
- **Space Mode (Cosmic Scale & "The Catch" Beats):**
  - Background: `#0E131F` with subtle dark dot grid & minimal 2–4px stars
  - Card Surface: `#161E2E`
  - Card Border: `#E2E8F0`
  - Primary Text: `#F6F4EF`
- **Semantic Accents (Both Modes):**
  - Brand Red / "The Catch" Pill / Alerts: `#E53935`
  - Science / Data Blue: `#2563EB`
  - Highlight / Accretion Amber: `#F59E0B`

### Typography
- **Headings & Pill Tags:** `Space Grotesk` (700/800), uppercase for pill tags.
- **Card Body & Labels:** `Inter` (500/600).
- **Numbers, Timers & Mass Counters:** `JetBrains Mono` with `font-variant-numeric: tabular-nums` (mandatory so numbers never jitter during count-ups).

### Explainer Card Spec
- Rounded rectangle (`border-radius: 16px`), `3px` solid border (`#141824` on Light, `#E2E8F0` on Dark), solid offset drop shadow (`4px 4px 0px #141824` on Light, `4px 4px 0px #060911` on Dark).
- Top-left pill tag (`border-radius: 999px`): `#2563EB` for numbered sections (`01 · MICRO BLACK HOLE`), `#E53935` for `THE CATCH`.

---

## 3. Master Board & Zoom-In/Zoom-Out Mechanic (Signature Structure)
Follow the reference channel's signature spatial navigation:
1. **00:00 Master Board Overview (`4x2` Grid):** Start the video on a single giant `MasterBoard` canvas showing all **8 Black Hole Cards** arranged in a clean `4x2` grid (`01 Micro` through `08 White Holes`) on `#F6F4EF`.
2. **Board Zoom-In (`0.4s` Ease):** Immediately zoom the 2D camera smoothly into **Card 01 (`MICRO BLACK HOLE`)** until it fills the frame alongside the character.
3. **Chapter Transition (`Zoom Out → Pan → Zoom In`):** At the end of each chapter, pull the camera back (`0.35s`) to the `MasterBoard` (marking finished cards with a subtle `#2563EB` checkmark badge), pan to the next card, and zoom back in (`0.35s`) to full-frame explanation.
4. **MasterBoard Component:** Implement `src/components/MasterBoard.tsx` as a single virtual `7680x4320` (4x) canvas navigated by a 30 FPS camera controller (`x`, `y`, `scale`).

---

## 4. Character & Hybrid FPS Rules (CRITICAL)
1. **NEVER procedurally draw the character in code.** Always load the pre-cut transparent PNG/SVG assets from:
   - `assets/character/light/`: `explaining.png`, `shocked.png`, `the_catch.png`, `thinking.png`
   - `assets/character/space/`: `explaining.png`, `shocked.png`, `the_catch.png`, `thinking.png`
2. **Motion (owner rule, 2026-11-18, replaces the old hybrid-FPS rule):** everything runs smooth at **30 FPS**.
   - **No line boil, no stepped/posterized frames, no position or rotation jitter, no screen shake** on the character,
     icons or text (0 px).
   - Character: crisp and steady; smooth ease-out entry (scale `0.96 → 1` over 10 frames). Space Mode only: a very slow,
     subtle float (±5 px over ~6 s).
   - `src/components/boil.ts` is kept as no-op helpers (identity / zero) so scenes compile.
3. **Audio (owner rule, 2026-11-18):** music bed ~28 dB under Mark's voice during speech; soft low ticks (no sharp clicks);
   SFX ≥ 15 dB under the voice; master −14 LUFS, limiter −1 dBFS (`scripts/mix.py`).

---

## 5. Pacing, Audio Sync & Camera Grammar
- **Micro-Shot Pacing:** Trigger a visual state change, prop swap, or camera move every **3–5 seconds** following `black_hole_micro_shot_list.md`.
- **Approved Camera Moves:**
  - `Board Zoom In/Out`: Smooth 10–12 frame cubic ease between `MasterBoard` and active card.
  - `Card Pop`: Crisp spring scale from `0.92 → 1.0` over 8 frames.
  - `Snap Zoom`: Fast 6-frame ease-out zoom (`1.0 → 1.18`) on key reveals.
  - `Push-in`: Slow continuous `1.0 → 1.06` drift during 8–12s explanations.
  - `Whip Pan`: 8-frame horizontal slide with directional motion blur between comparisons.
- **Audio & SFX Sync:**
  - Align all shot boundaries to `audio/timestamps.json` (generated from `audio/voiceover.mp3`).
  - Place matching SFX (`Pop_Card`, `Thud_Catch`, `Whoosh_Snap`, `Whoosh_Zoom`, `Tick_Counter`) from `assets/sfx/` on the exact frame of each visual transition.

---

## 6. Directory Structure & Execution Workflow
```text
project/
├── CLAUDE.md
├── black_hole_micro_shot_list.md
├── audio/
│   ├── voiceover.mp3
│   └── timestamps.json
├── assets/
│   ├── character/
│   │   ├── light/ (explaining, shocked, the_catch, thinking)
│   │   └── space/ (explaining, shocked, the_catch, thinking)
│   ├── icons/
│   └── sfx/
└── src/
    ├── tokens.ts          # All hex colors, fonts, shadows
    ├── components/        # MasterBoard, ExplainerCard, CharacterRig, ScaleBar, BlackHoleViz
    └── scenes/            # 00_MasterBoard.tsx, 01_Micro.tsx ... 08_WhiteHoles.tsx
```

### Mandatory Verification Before Full Render
1. Build `src/tokens.ts`, `MasterBoard.tsx`, and reusable components first.
2. Render **4 test frames** (Shot 00 `MasterBoard` 4x2 grid (held 1.8 s, then a 0.4 s zoom), Shot 01 Light Canvas zoomed-in, Shot 06 Space Mode `THE CATCH`, Shot 39 `TON 618` Scale Bar) and visually inspect them to verify text legibility, card borders, and character placement before rendering the full 12-minute video.