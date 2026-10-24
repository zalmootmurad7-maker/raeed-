# What if the Moon were made of antimatter? — video 2

- `moon_made_of_antimatter_16x9.mp4` — 1920×1080, 30 fps, 2:27, hand-drawn style, voiceover + sound design
- `audio_mix.wav` — final stereo mix

## Source
- `source/head.html` + `source/scenes.js` — the animation (`cat head.html scenes.js > video2.html`),
  rendered with `../moon-protons/source/render.js` (`PAGE=... node render.js <start> <end> 30 part.mp4`)
- `source/align.py`, `source/script.txt`, `source/align.json` — pocketsphinx forced alignment (word timings)
- `source/sfx_v2.py` + `source/sfxlib.py` — sound design; handwriting/pop cues are parsed from `scenes.js`
