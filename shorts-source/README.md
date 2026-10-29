# Shorts builder (follows the Shorts rules in CLAUDE.md)

- `shorts.json`: each short: source episode (`v2` antimatter, `v3` black hole), time segments, cold-open card
- `build.py`: assembles one page per short (episode glyphs + vertical scenes in `shorts_new.js` and the episode reel scenes); black-hole hooks are drawn fully from frame 0
- `audio.py`: cuts audio from the episode final mix, adds an impact at 0 s and a ding at the like press
- `render_all.sh`: renders all shorts (4 in parallel) and muxes audio
