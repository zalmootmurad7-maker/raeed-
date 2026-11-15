# Ink & Atoms — Claude Code 

## Project: What If You Jumped on Every World in the Solar System? (`16:9` Long-Form)

* **Target Resolution & Aspect Ratio:** `1920x1080` (`16:9`), master timeline at `24 FPS` with global `Posterize Time` locked to **`10 FPS`** (stepped 2D motion-comic feel).

* **Color & Stroke Specification:**

  * Background Canvas: Pure Solid White (`#FFFFFF`)

  * Primary Ink Stroke: Uniform `6px` Solid Black (`#000000`), Round Caps & Round Joins

  * Shading Layer: Soft Grey Crosshatching (`#888888` at `35%` opacity, `2px` hatching lines)

  * Accent Color (Strictly Isolated): Vivid Red (`#E53935`) for the stick figure's t-shirt, astronaut scarf, trajectory dashed lines, live height counter (`0.00m`), and warning stamps.

* **Physics Reference Data:** Equatorial surface gravities and escape velocities sourced from the [NASA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/), [Planetary Ratio Table](https://nssdc.gsfc.nasa.gov/planetary/factsheet/planet_table_ratio.html), [Phobos Orbital Data](https://en.wikipedia.org/wiki/Phobos_\(moon\)), [Deimos Orbital Data](https://en.wikipedia.org/wiki/Deimos_\(moon\)), and [Comet 67P Data](https://en.wikipedia.org/wiki/67P/Churyumov%E2%80%93Gerasimenko).

## 1. Master Prompt for Claude Code (Copy-Paste Specification)

Copy and paste the following block directly into **Claude Code** to generate either an After Effects ExtendScript (`.jsx`) automation script or a programmatic Remotion / HTML5 Canvas animation engine for all 14 scenes:

```
You are the lead 2D motion-comic animator and technical director for the science YouTube channel "Ink & Atoms" (inspired by xkcd: What If? and MinutePhysics).

Build a complete, modular 1920x1080 (16:9) animation pipeline (After Effects ExtendScript .jsx AND/OR HTML5 Canvas/Remotion component suite) for our 06:35 episode: "What If You Jumped on Every World in the Solar System?".

ENFORCE THE 5 MANDATORY INK & ATOMS ANIMATION RULES GLOBALLY:
1. 8–12 FPS Stepped Motion ("Posterize Time"):
   - Apply `posterizeTime(10)` to all character transforms, camera pans, and limb rotations so movement feels like a snappy hand-drawn webcomic, while keeping the numerical height counter (`0.00m`) and stopwatch (`0.00s`) updating at a crisp 24 FPS for readability.
2. Subtle Hand-Drawn "Line Boil" Jitter:
   - Apply a global `Turbulent Displace` effect on an adjustment layer above all line-art layers: `Amount = 3.5`, `Size = 18`, `Complexity = 2`, driven by the expression `posterizeTime(8); time * 450;` on Evolution so static drawings feel alive even during narration holds.
3. Snappy Stepped Cutout Keyframing:
   - Character poses transition using 2-frame overshoot pops (`100% -> 112% -> 100%` scale) or instant `Hold` keyframes between 4 core stick-figure states: `IDLE_STAND`, `CROUCH_COIL`, `AIRBORNE_APEX`, and `LANDING_SQUASH`.
4. Extreme Scale Shifts & Snap Zooms (`Camera Scale Controller`):
   - Use a single Master Null (`CAM_CTRL`) with exponential scale interpolation (`Animation > Keyframe Assistant > Exponential Scale`) to handle scale transitions across 4 orders of magnitude:
     • Scale Tier 1 (Human Scale: 100px = 0.5m) -> Earth (0.50m), Jupiter (0.20m), Neptune (0.44m), Saturn (0.55m), Venus (0.55m), Uranus (0.56m).
     • Scale Tier 2 (Court/Vehicle Scale: 100px = 1.5m) -> Mars (1.32m), Mercury (1.32m), Moon (3.02m), Titan (3.63m).
     • Scale Tier 3 (Building Scale: 100px = 5.0m) -> Eris (5.50m giraffe), Pluto (7.90m 2-story house).
     • Scale Tier 4 (Megastructure / Orbital Scale: 100px = 250m) -> Phobos (860m vs. 828m Burj Khalifa), Deimos (1,630m), Comet 67P (Infinite Escape).
   - Every camera zoom-out must complete in exactly 8 frames (at 24 FPS) with a steep ease-out curve (`influence: 85%`) synced to a `Whoosh` SFX marker.
5. Live Physics-Driven Height & Hang-Time HUD:
   - Bind the stick figure's vertical Y position, the vivid red dashed height ruler (`#E53935`), the live height counter (`0.00 m`), and the hang-time timer (`0.00 s`) to a single ballistic equation controller parameterized by initial takeoff velocity `v0 = 3.1305 m/s` and planet gravity `g`:
     `y(t) = max(0, v0 * t - 0.5 * g * t * t)`
     `h_max = (v0 * v0) / (2 * g)`
     `t_total = (2 * v0) / g`
   - When `t >= t_total / 2`, lock a vivid red peak marker line (`#E53935`) at `h_max` with an asterisk label (`*MAX: X.XX m`) while the character falls back to `y = 0`.

```

## 2. Copy-Paste After Effects Expressions (Rigging Toolkit)

### A. Global `Line Boil` Expression (Apply to Adjustment Layer -> Turbulent Displace -> Evolution)

* **Amount:** `3.5` | **Size:** `18.0` | **Complexity:** `2.0`

```
// Ink & Atoms Signature 8 FPS Line Boil
posterizeTime(8);
seedRandom(index, true);
random(0, 360) + time * 520;

```

### B. Physics-Driven Vertical Jump Position Expression (Apply to `Stickman_Null` -> Position)

Add two Slider Controls to `Stickman_Null`: **`Gravity_g`** (e.g., `9.8` for Earth, `3.71` for Mars, `1.62` for Moon, `24.79` for Jupiter, `0.62` for Pluto) and **`Pixels_Per_Meter`** (e.g., `200`), plus a Marker named **`JUMP`** on the frame where the character leaves the ground ([Planetary Fact Sheet - Metric](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)):

```
posterizeTime(10);
var v0 = 3.1305; // Standard 0.5m Earth jump takeoff velocity (m/s)
var g = effect("Gravity_g")("Slider");
var ppm = effect("Pixels_Per_Meter")("Slider");
var groundY = value[1];

if (marker.numKeys > 0 && time >= marker.key("JUMP").time) {
    var t = time - marker.key("JUMP").time;
    var y_meters = (v0 * t) - (0.5 * g * t * t);
    if (y_meters < 0) y_meters = 0;
    [value[0], groundY - (y_meters * ppm)];
} else {
    value;
}

```

### C. Dynamic Height Counter & `*MAX` Lock Expression (Apply to Red Text Layer -> Source Text)

```
// Updates smoothly at 24 FPS and locks at peak height (*MAX)
var ctrl = thisComp.layer("Stickman_Null");
var v0 = 3.1305;
var g = ctrl.effect("Gravity_g")("Slider");
var h_max = (v0 * v0) / (2 * g);
var t_peak = v0 / g;

if (ctrl.marker.numKeys > 0 && time >= ctrl.marker.key("JUMP").time) {
    var t = time - ctrl.marker.key("JUMP").time;
    if (t < t_peak) {
        var h_curr = (v0 * t) - (0.5 * g * t * t);
        "HEIGHT: " + h_curr.toFixed(2) + " m";
    } else {
        "*MAX HEIGHT: " + h_max.toFixed(2) + " m";
    }
} else {
    "HEIGHT: 0.00 m";
}

```

### D. Live Hang-Time Stopwatch Expression (Apply to Stopwatch Text Layer -> Source Text)

```
var ctrl = thisComp.layer("Stickman_Null");
var v0 = 3.1305;
var g = ctrl.effect("Gravity_g")("Slider");
var t_total = (2 * v0) / g;

if (ctrl.marker.numKeys > 0 && time >= ctrl.marker.key("JUMP").time) {
    var t = Math.min(time - ctrl.marker.key("JUMP").time, t_total);
    "AIR TIME: " + t.toFixed(2) + " s";
} else {
    "AIR TIME: 0.00 s";
}

```

## 3. Scene-by-Scene Animation & Camera Prompts (`SCENE-001` to `SCENE-014`)

| Scene ID & Timecode | Camera & Scale Shift Directive | Character, Prop & Counter Animation Prompt | Grounded Physics Target | 
| ----- | ----- | ----- | ----- | 
| **SCENE-001**  `00:00 – 00:12`  *The 4-Column Visual Hook* | **Fixed 4-Panel Split (`480px` width per column).** Each column reveals left-to-right with a 2-frame vertical black ink wipe (`Trim Paths: 0% -> 100%`). | • **Col 1 (Earth):** Stick figure (`#E53935` shirt) jumps at `00:01` onto a `0.5m` crate; red dashed height line pops to `0.50m`.  • **Col 2 (Mars):** Jumps at `00:04` over a black-ink car silhouette to `1.32m`.  • **Col 3 (Moon):** Launches at `00:07` into an NBA hoop at `3.02m`.  • **Col 4 (Jupiter):** Strains with red knee jitter lines at `00:10`, lifts `0.20m`, and squashes flat (`Scale: [135%, 65%]`) on impact. | Earth: $0.50\text{ m}$ ([Earth Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html))  Mars: $1.32\text{ m}$  Moon: $3.02\text{ m}$  Jupiter: $0.20\text{ m}$ ([Jupiter Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/jupiterfact.html)) | 
| **SCENE-002**  `00:12 – 00:28`  *The Orbit Hook* | **Snap Zoom (`100% -> 280%` in 6 frames)** onto a small potato-shaped asteroid, followed by a violent **Camera Shake (`wiggle(18, 25)`)** when the warning stamp lands. | Stick figure crouches for 4 frames (`CROUCH_COIL`) and launches straight up at `1,800 px/s`, exiting the top of the 1080p frame in 8 frames. A vivid red dashed trajectory line (`#E53935`) trails behind him. At `00:22`, a giant red ink box (`WARNING: HUMAN NOW ORBITING THE SUN`) slams down (`Scale: 250% -> 100%` over 3 frames). | Escape velocity exceeded ($v_0 = 3.13\text{ m/s} > 1.0\text{ m/s}$) ([Comet 67P](https://en.wikipedia.org/wiki/67P/Churyumov%E2%80%93Gerasimenko)) | 
| **SCENE-003**  `00:28 – 00:50`  *Biological Spring Blueprint* | **2D Blueprint Orthographic View (`Scale: 100%`).** Subtle slow push-in (`100% -> 108%`) over 22 seconds. | Cutaway X-ray box overlays the stick figure's legs, replacing his calves with a coiled vivid red mechanical spring (`#E53935`). As the spring uncoils, 4 callout arrows draw in via `Trim Paths` (6 frames each): `v₀ = 3.13 m/s`, `g = 9.80 m/s²`, `h = 0.50 m`, `t = 0.64 s`. | $h = \frac{v_0^2}{2g} = 0.50\text{ m}$ ([Earth Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html)) | 
| **SCENE-004**  `00:50 – 01:15`  *Jupiter's 1-Bar Platform* | **Medium Shot (`Scale: 100%`, `Pixels_Per_Meter = 300`).** Camera drops downward `15px` on landing impact to sell heavy gravity. | Stick figure stands on a bolted steel platform floating in grey crosshatched Jovian clouds. Bathroom scale dial needle spins `360°` and locks on `177 KG` in red (`#E53935`). At `01:05`, he jumps: `Gravity_g = 24.79` caps his height at `0.20 m` next to a soda can (`20 cm`) and slams him down in `0.26 s`. | $g = 24.79\text{ m/s}^2$, $h = 0.20\text{ m}$, $t = 0.26\text{ s}$ ([Jupiter Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/jupiterfact.html)) | 
| **SCENE-005**  `01:15 – 01:40`  *Neptune Winds & Venus Pool* | **Whip Pan Right (`X: 0 -> -1920` in 7 frames)** transitioning into a 2-panel split screen (`Neptune` Left / `Venus` Right). | • **Left (Neptune):** Fast horizontal black ink streaks (`2,000 km/h`) whip across the frame; stick figure jumps to `0.44 m` and gets blown `180px` sideways mid-air.  • **Right (Venus):** Stick figure jumps in slow-motion swimming pose through thick grey crosshatched `92 BAR CO₂` haze (`0.55 m`), while a red mercury thermometer on the right boils over and shatters at `464°C`. | Neptune: $0.44\text{ m}$ ([What Happens If You Jump On Every Planet?](https://www.youtube.com/watch?v=czDVJbKwtjY))  Venus: $0.55\text{ m}$, $464^\circ\text{C}$ ([Venus Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/venusfact.html)) | 
| **SCENE-006**  `01:40 – 02:15`  *The Uranus Density Paradox* | **Scale Shift Zoom-Out (`100% -> 45%` in 10 frames)** to reveal the full cross-section circle of Uranus beside tiny Earth. | Cross-section of Uranus draws in with a tiny black core and a huge grey-hatched ice-gas mantle. A double-headed red dimension arrow stretches from the core to the cloud top (`25,362 km`). On top of the cloud curve, the stick figure jumps to a red dashed line marked `URANUS: 0.56 m`, passing the grey dashed `EARTH: 0.50 m` line. | Uranus: $0.889g$, $h = 0.56\text{ m}$; Saturn: $0.916g$, $h = 0.55\text{ m}$ ([Planetary Ratio Table](https://nssdc.gsfc.nasa.gov/planetary/factsheet/planet_table_ratio.html)) | 
| **SCENE-007**  `02:15 – 02:50`  *Mars NBA Slam Dunk* | **Scale Shift to Tier 2 (`Pixels_Per_Meter = 160`).** Low-angle camera tilts up (`Y: 0 -> -220px`) following the jump arc. | Martian basketball court under a dome. At `02:25`, stick figure jumps (`Gravity_g = 3.71`): live red counter ticks up to `*MAX HEIGHT: 1.32 m` while stopwatch runs for `1.69 s`. At apex, he dunks a vivid red basketball (`#E53935`) through a `3.05m` hoop, shattering the backboard into black-ink triangles. | Mars: $g = 3.71\text{ m/s}^2$, $h = 1.32\text{ m}$, $t = 1.69\text{ s}$ ([Planetary Fact Sheet - Metric](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)) | 
| **SCENE-008**  `02:50 – 03:20`  *Mars vs. Mercury Iron Core* | **Symmetrical Dual Frame.** Balance beam tips in the center, then locks completely flat (`Rotation: 0°`). | Left shows Mars (`R = 3,390 km`, silicate grey wash); Right shows smaller Mercury (`R = 2,440 km`) slicing open to reveal a massive solid black iron core (`85% radius`). Two red-shirt stick figures jump in frame-accurate sync on both worlds, both locking at `*MAX: 1.32 m` and `1.69 s`. | Mercury: $g = 3.70\text{ m/s}^2$, density $5,429\text{ kg/m}^3$ ([Planetary Fact Sheet - Metric](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)) | 
| **SCENE-009**  `03:20 – 03:55`  *The Moon: Suit vs. Gym* | **Scale Shift Zoom-Out (`Pixels_Per_Meter = 110`).** Vertical pan tracks the stick figure up to a 2nd-floor balcony. | • **Left (`Apollo Suit`):** Stick figure encased in an oversized rigid `81 kg` suit hops `0.50 m` with stiff knees.  • **Right (`Indoor Lunar Gym`):** Stick figure in normal red t-shirt jumps with `Gravity_g = 1.62`: rises smoothly for `1.93 s` to `*MAX HEIGHT: 3.02 m` (total hang time `3.86 s`), high-fiving a stick figure standing on a second-story balcony. | Moon: $0.166g$, $h = 3.02\text{ m}$, $t = 3.86\text{ s}$ ([Apollo 11](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C); [OSR](https://osr.org/blog/kids/how-high-can-you-jump-on-planets/)) | 
| **SCENE-010**  `03:55 – 04:25`  *Titan: Wadlow & Cardboard Wings* | **Tracking Shot (`Pixels_Per_Meter = 95`).** Camera pans diagonally up-right as the stick figure begins flying. | Next to the stick figure stands a black-ink silhouette of **Robert Wadlow (`2.72 m`)**. Stick figure jumps (`Gravity_g = 1.35`), easily clearing Wadlow's head to reach `*MAX: 3.63 m` (`4.64 s`). At apex (`04:12`), two cardboard wings with duct-tape lines snap onto his arms (`Hold` keyframe); he flaps at `6 Hz` and flies off-screen through `1.5x DENSE N₂ AIR`. | Titan: $g = 1.35\text{ m/s}^2$, $h = 3.63\text{ m}$ ([OSR](https://osr.org/blog/kids/how-high-can-you-jump-on-planets/)) | 
| **SCENE-011**  `04:25 – 04:55`  *Eris Giraffe & Pluto House* | **Scale Shift to Tier 3 (`Pixels_Per_Meter = 55`).** 8-frame exponential zoom-out revealing a `5.5m` giraffe and a `7.5m` two-story house. | • **At `04:28` (Eris):** Stick figure jumps `5.50 m` (`Gravity_g = 0.82`), pausing mid-air to blink eye-to-eye with a `5.5m` giraffe.  • **At `04:38` (Pluto):** Stick figure jumps (`Gravity_g = 0.62`), soaring over the rooftop chimney of the two-story house to `*MAX HEIGHT: 7.90 m`. Stopwatch ticks in real time for **`10.10 SECONDS`** while he pulls out a book mid-air. | Eris: $5.50\text{ m}$; Pluto: $0.063g$, $h = 7.90\text{ m}$, $t = 10.1\text{ s}$ ([How High You Could Jump on Every Planet](https://www.youtube.com/watch?v=D0HqchriOkA)) | 
| **SCENE-012**  `04:55 – 05:30`  *Phobos vs. Burj Khalifa* | **Extreme Scale Shift to Tier 4 (`100% -> 0.8%` Exponential Zoom-Out over 14 frames, `Pixels_Per_Meter = 0.75`).** | Camera pulls back from the 2-story house until it is a tiny `6px` speck at the base of the **Burj Khalifa (`828 m`)** drawn in crisp black ink on Phobos. Stick figure jumps (`Gravity_g = 0.0057`): a glowing vivid red trajectory line (`#E53935`) climbs past the top spire of the Burj Khalifa and locks at **`*MAX HEIGHT: 860 m`**, while a fast-forwarding clock displays **`HANG TIME: 18 MIN 18 SEC`**. | Phobos: $g = 0.0057\text{ m/s}^2$, $h = 860\text{ m}$, $t = 1,098\text{ s}$ ([Phobos - Wikipedia](https://en.wikipedia.org/wiki/Phobos_\(moon\))) | 
| **SCENE-013**  `05:30 – 06:00`  *Deimos Staircase Escape* | **Wide Orbital Cutaway.** Camera tracks the stick figure running up a 4-step ramp and breaking through a dashed red orbital ring. | On Deimos, a standing jump line marks `1,630 m (35 MIN)`. Beside it, the stick figure sprints up a 4-step wooden staircase (`Speed Counter: 3.1 -> 4.5 -> 6.0 m/s`). At the top step, he crosses the red dotted barrier labeled `ESCAPE VELOCITY: 5.6 m/s (20 km/h)` and shoots into a curved solar orbit without decelerating. | Deimos: $v_{\text{escape}} = 5.6\text{ m/s}$ ($20\text{ km/h}$) ([Deimos - Wikipedia](https://en.wikipedia.org/wiki/Deimos_\(moon\))) | 
| **SCENE-014**  `06:00 – 06:35`  *Comet 67P & Master Chart* | **Split Finale:** Left shows Comet 67P shrinking in the distance; Right reveals the complete 12-World Logarithmic Bar Chart. | Stick figure stands on rubber-duck-shaped **Comet 67P** (`ESCAPE VELOCITY = 1.0 m/s`). He does a normal `3.13 m/s` standing hop (`313% ESCAPE SPEED`), drifting smoothly upward while waving goodbye with his red scarf floating. Red height counter flips to **`HEIGHT: ∞ (ORBITING SUN)`**. | Comet 67P: $v_{\text{escape}} \approx 1.0\text{ m/s}$ ([Comet 67P - Wikipedia](https://en.wikipedia.org/wiki/67P/Churyumov%E2%80%93Gerasimenko)) | 

## 4. Audio Mixing & Silence-Trimming Checklist (Final Export)

* **Mark (`Eleven v4`) Voiceover Track:** Normalize peaks to **`-6 dB`** (integrated loudness `-14 LUFS`), strip any inter-sentence pauses longer than `0.25 seconds` to maintain high retention micro-pacing.

* **Background Lo-Fi / Synth Bed:** Duck to **`-24 dB` to `-22 dB`** under narration; swell to **`-14 dB`** only during the 8-frame `Scale Shift` camera zoom-outs (`01:40`, `02:15`, `04:25`, `04:55`).

* **SFX Accents (`Pop`, `Whoosh`, `Anvil Thud`, `Stopwatch Tick`):** Peak at **`-10 dB` to `-8 dB`**, aligned to the exact frame where each `*MAX HEIGHT` red marker locks on screen.