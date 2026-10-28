# Shorts builder (follows the Shorts rules in CLAUDE.md)

- `shorts.json`: each short: source episode (`v2` antimatter, `v3` black hole), time segments, cold-open card
- `build.py`: assembles one page per short (episode glyphs + vertical scenes in `shorts_new.js` and the episode reel scenes); black-hole hooks are drawn fully from frame 0
- `audio.py`: cuts audio from the episode final mix, adds an impact at 0 s and a ding at the like press
- `render_all.sh`: renders shorts (4 in parallel) and muxes audio: `SCRATCH=<dir> bash render_all.sh [names…]`, where `<dir>` holds
  `v2/` (`reel_head.html` = vertical `head.html` + glyph part of `scenes.js`, `reel_scenes.js`, `mix.wav`), `v3/` (`reel3_scenes.js`, `scenes3.js`, `mix3.wav`),
  `v4/` (this folder, after `build.py` + `audio.py`) and `work/` (`render.js` with a `VW`/`VH` viewport + `@fontsource/patrick-hand*`)
