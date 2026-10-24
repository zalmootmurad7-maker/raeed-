# What if the Moon were made of protons? — motion graphic

- `moon_made_of_protons_16x9_60fps.mp4` — final video, 1920×1080, 60 fps, 36.5 s, voiceover + sound design
- `captions.srt` — sentence-level captions timed to the voiceover
- `audio_mix.wav` — final stereo mix (voice + SFX + ambient bed)

## Source
- `source/anim.html` — the whole animation (canvas 2D, deterministic `render(t)`)
- `source/render.js` — renders a frame range with Playwright and pipes to ffmpeg:
  `node render.js <startFrame> <endFrame> 60 part.mp4`
- `source/snap.js` — stills for review: `node snap.js <outDir> 1.5 10 20`
- `source/sfx.py` — synthesizes all sound effects and mixes them with the voiceover:
  `python3 sfx.py voice_44k_mono.wav mix.wav`

Setup: `npm install` in `source/` (fonts: Anton, Inter, Space Grotesk via @fontsource).
