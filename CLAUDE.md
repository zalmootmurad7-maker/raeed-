# Channel production notes

"What if?" science channel: English voiceover, hand-drawn stick-figure style, YouTube (16:9) + Reels/Shorts/TikTok (9:16).
The user writes in Arabic — reply in Arabic; on-screen text and scripts are in English.

## Must-do for every new video
- **End-of-video like CTA:** add a short hand-drawn shot at the end of the long video — the stick figure points at a drawn
  like button, with the line "If this blew your mind, hit like". In shorts it is a visual banner only (see Shorts rules).
- **Hook:** open with the strongest moment/claim in the first 5 seconds; don't open on a reference to a previous episode.
- **Pinned comment idea:** a question that invites replies, e.g. "What should we build the Moon out of next? 🌕".

## Shorts / Reels rules (from analytics: 59% stayed, 41% swiped in the first second)
- **Full, striking first frame:** frame 0 must already show the headline text in full (no letter-by-letter
  writing in the first second) plus the strongest visual. Start with a sound hit at 0.0 s.
- **Length 20–25 s** (hard max 30 s). Cut setup lines; keep one complete idea per short.
- **Loop:** end on a line that flows back into the first line; no silence or outro card at the end.
- **Like CTA in shorts is visual only:** a like-button banner over the last ~2 s (no extra voice line), so the loop stays intact.
- Make 3–4 shorts per long episode; each short gets "Related video" → its long video.
- Short audio = cut from the long video's final mix (short fades at the joins) + an impact at 0.

## Style (see `moon-protons/source/sketch*.html`, `moon-antimatter/source/`)
- Black ink on #f6f4f8, red #d2382c for emphasis only, light yellow highlight on thumbnails.
- Font: Patrick Hand SC (labels), Patrick Hand for the lowercase "e" in e⁻/e⁺.
- Protons ⊕ black, antimatter drawn in red with pink fill; dashed red ring = anti-object.
- Pop-in drawings, letter-by-letter handwriting, motion lines, shake marks, grey radial flash for explosions.
- Reels: re-lay out scenes for 1080×1920 with large text; keep content within y≈230–1560.

## Workflow
- Script → ElevenLabs v3 (voice "Mark", audio tags like [excited], [whispers], [short pause]).
- Word timings: pocketsphinx forced alignment (`moon-antimatter/source/align.py`).
- Render: Playwright frame-by-frame → ffmpeg (`moon-protons/source/render.js`).
- Sound: synthesized SFX + light plucked music bed (`moon-antimatter/source/sfx_v2.py`); pencil/pop cues parsed from the scene code.

## Publishing
- Category: Education; "Not made for kids".
- Titles: reframe as an experience/story ("I Replaced the Moon With Its Evil Twin"), not a plain question.
- Make 3 different thumbnail concepts for Test & Compare.
- Post long video first (US time: 2–4 PM ET), reels on the following days with "Related video" linking the long one.
