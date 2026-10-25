# What if the Moon were made of protons? — motion graphic

- `moon_made_of_protons_16x9_60fps.mp4` — final video, 1920×1080, 60 fps, 36.5 s, voiceover + sound design
- `captions.srt` — sentence-level captions timed to the voiceover
- `audio_mix.wav` — final stereo mix (voice + SFX + ambient bed)
- `moon_made_of_protons_handdrawn_16x9.mp4` — hand-drawn stick-figure version (whiteboard explainer style), 1920×1080, 30 fps
- `moon_made_of_protons_reel_9x16.mp4` — vertical reel of the hand-drawn version, 1080×1920, 30 fps
- `audio_mix_handdrawn.wav` — its mix (voice + pencil/pop SFX + light plucked music bed)

## Source
- `source/anim.html` — the whole animation (canvas 2D, deterministic `render(t)`)
- `source/render.js` — renders a frame range with Playwright and pipes to ffmpeg:
  `node render.js <startFrame> <endFrame> 60 part.mp4`
- `source/snap.js` — stills for review: `node snap.js <outDir> 1.5 10 20`
- `source/sfx.py` — synthesizes all sound effects and mixes them with the voiceover:
  `python3 sfx.py voice_44k_mono.wav mix.wav`

Setup: `npm install` in `source/` (fonts: Anton, Inter, Space Grotesk via @fontsource).

### Hand-drawn version
- `source/sketch.html` — the animation; render with `PAGE=sketch.html node render.js <start> <end> 30 part.mp4`
- `source/sfx2.py` — its sound design (uses `gen.py`): `python3 sfx2.py voice_44k_mono.wav mix.wav`
- `source/sketchv.html` — vertical (9:16) layout; render with `PAGE=sketchv.html VW=1080 VH=1920 node render.js <start> <end> 30 part.mp4`
