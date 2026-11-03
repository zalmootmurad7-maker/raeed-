# Episode 5 — What If the Sun Disappeared for 8 Minutes?

**Identity check:** one impossible scenario (the Sun vanishes for 8 minutes, then returns) + the real physics of what follows.
**Formula:** Hook 0–5 s → Setup 5–20 s → Science 20–90 s → Consequences 90–180 s → Twist + question to the next video.
**Target length:** ~2:40 after `tighten.py`. ElevenLabs v3, voice "Mark", Speed 1.1.

## Voice script (paste into ElevenLabs as one file)

```
[excited] Right now, the Sun could already be gone… and you wouldn't know for eight minutes.

[mischievously] So let's do it. The Sun vanishes. Poof. All of it. Then, eight minutes later, it pops right back. Impossible? Totally. But physics can still tell us exactly what happens to you. And before this video is over, I'll show you the planet that sees the blackout three hours late.

[curious] Minute zero. The Sun is gone. You're outside. The sky is blue. Nothing happens.
Why? Because the light hitting your face right now left the Sun eight minutes and twenty seconds ago. It's already on its way. You're looking at the past.
[excited] But surely gravity would tell us! No Sun, no gravity, Earth flies off, right?
Nope. Gravity is stuck at the speed of light too. In 2017, two dead stars collided a hundred and thirty million light-years away. Their gravity waves and their light raced each other the whole way… and arrived less than two seconds apart.
So for eight minutes and twenty seconds, no telescope, no satellite, nothing on Earth can know. The Sun is gone… and it's still a beautiful day.

[serious] Minute eight, second twenty. The last light arrives. And then… lights out.
Noon turns into midnight. Not a sunset. Just off. Stars appear over your lunch.
Every solar panel on the day side drops to zero. At the same moment.
The air starts to cool, a few degrees, like during a total eclipse. Birds go quiet. Crickets start singing. They think it's night.
On the night side, people look up… and the Moon is gone. It only shines with sunlight.
[excited] And Earth? With nothing pulling it, it flies in a straight line, thirty kilometers every second. But after eight minutes, it has drifted off its orbit by… about seven hundred meters. Less than a ten-minute walk.
Up on the Space Station, the astronauts barely notice. They fly into Earth's shadow sixteen times a day.
Minute sixteen. The Sun's new light finally reaches us. Daylight snaps back. Just like that.

[mischievously] But the blackout isn't over. The planets only shine with sunlight too.
So about an hour and a half after the Sun vanished, Jupiter switches off. And almost three hours later, Saturn goes dark… for eight minutes… long after we're back in the sunshine.
[curious] And here's the creepy part. The Sun in your sky is always eight minutes old. So is it there right now? You'll find out in eight minutes.
[excited] And if it never came back? That's a much darker video. Comment "FOREVER" if you want it.
If this blew your mind, hit like!
```

## Numbers table (verified)

| Claim in script | Value | How we know |
|---|---|---|
| Sunlight takes 8 min 20 s | 1 AU / c = 1.496×10¹¹ m / 2.998×10⁸ m/s = **499 s** | standard constants |
| Gravity changes travel at light speed | GW170817 (2017): neutron-star merger ~130 million ly away; gamma rays arrived **1.7 s** after the gravitational waves | LIGO/Virgo + Fermi, 2017 |
| Earth's orbital speed | **29.8 km/s** ("thirty kilometers every second") | standard |
| Drift off orbit in 8 min without gravity | a = v²/r = 0.00593 m/s²; ½·a·t² with t = 480 s → **683 m** ("about seven hundred meters") | computed |
| Temperature drop | "a few degrees", like a total eclipse (measured drops are typically ~2–5 °C) | eclipse observations |
| ISS goes into Earth's shadow | ~**16** orbits per day (92-min orbit) | NASA |
| Moon goes dark | Moon shines only by reflected sunlight; Moon–Earth light time 1.3 s, so it goes dark with the daylight | standard |
| Jupiter goes dark | Sun→Jupiter 43 min + Jupiter→Earth 35–52 min = **78–95 min** ("about an hour and a half") | computed (5.2 AU; 4.2–6.2 AU) |
| Saturn goes dark | Sun→Saturn 79 min + Saturn→Earth 71–87 min = **150–167 min** ("almost three hours") | computed (9.54 AU; 8.5–10.5 AU) |
| Bonus (not voiced) | the 683 m drift makes the year ~**0.4 s** longer | computed (ΔT/T = 1.5·Δa/a) |

Accuracy note: the Sun can't vanish (energy and mass are conserved) — the script says so ("Impossible? Totally.").

## Re-hooks (every 20–30 s)
promise "the planet that sees the blackout three hours late" (≈0:15) → "But surely gravity would tell us!" (≈0:35)
→ "lights out" (≈1:05) → "the Moon is gone" (≈1:30) → "seven hundred meters" (≈1:45) → "the blackout isn't over" (≈2:10).

## Title, thumbnails, pinned comment
- **Title:** `What If the Sun Disappeared for 8 Minutes?`
- **Thumbnail text (never the title):** A `8 MINUTES?!` · B `STILL DAY?!` · C `SUN: GONE`
  - A: empty dashed circle where the Sun was + a big clock; Earth still lit; shocked figure.
  - B: the Sun gone but a last beam of light still racing toward a sunny Earth (the twist: it's still day).
  - C: noon sky turned black with stars; figure in sunglasses, shocked.
  One visual idea each, readable in 1 second, same Ink & Atoms system (yellow bar, one glowing element, big face).
- **Pinned comment:** `Is the Sun there right now? ☀️ You'll know in 8 minutes 👀 — Comment FOREVER for the version where it never comes back!`

## Shorts (cut from the final mix)
1. **Speed of gravity:** "Right now, the Sun could already be gone…" → gravity waves 2017 → "still a beautiful day".
2. **The Moon vanishes:** lights out → "the Moon is gone".
3. **Seven hundred meters:** Earth flies straight → "less than a ten-minute walk".
4. **Saturn goes dark 3 hours later:** the blackout echoes across the solar system.
