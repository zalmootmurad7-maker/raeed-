# What if the Moon were made of antimatter? — video 2

- `moon_made_of_antimatter_16x9.mp4` — 1920×1080, 30 fps, 2:27, hand-drawn style, voiceover + sound design
- `audio_mix.wav` — final stereo mix

## Source
- `source/head.html` + `source/scenes.js` — the animation (`cat head.html scenes.js > video2.html`),
  rendered with `../moon-protons/source/render.js` (`PAGE=... node render.js <start> <end> 30 part.mp4`)
- `source/align.py`, `source/script.txt`, `source/align.json` — pocketsphinx forced alignment (word timings)
- `source/sfx_v2.py` + `source/sfxlib.py` — sound design; handwriting/pop cues are parsed from `scenes.js`

## Reels (9:16, 1080×1920)
- `reels/reel1_one_gram_3_hiroshimas_9x16.mp4` — 30.9 s: source 8.45–11.95, 45.85–64.85, 88.05–95.0 + end card
- `reels/reel2_anti_moon_vs_earth_9x16.mp4` — 29.0 s: source 8.45–11.95, 113.35–132.75, 140.05–144.75 + end card
- `source/reel_scenes.js` — vertical layouts, driven by the source timeline of the long video

## Thumbnails
- `thumbnails/thumbnail_youtube_1280x720.png`, `thumbnails/cover_reel1_1080x1920.png`, `thumbnails/cover_reel2_1080x1920.png` (`source/thumbs2.js`)

## Extra shorts
- `shorts/short_dont_land_here_9x16.mp4` — 16.7 s; `shorts/short_your_evil_twin_9x16.mp4` — 21 s (see `../shorts-source/`)
