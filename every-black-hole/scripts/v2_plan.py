"""v2 rebuild plan: the tightened script as a micro-shot list -> v2_script_and_shots.md
Times are ESTIMATES from word count (2.8 words/s after silence-trim + atempo 1.06). After the new voice is recorded,
Whisper word times replace them: every shot is anchored to its first spoken word ("cue")."""
WPS = 2.8
FPS = 30
# (chapter, mode, cam, character, sfx, visual, text)   mode: L=Light #F6F4EF, S=Space #0E131F, B=MasterBoard
# character: H:<pose> = hero 26–30% height for 1.5–2.5 s then springs to dock; D:<pose> = docked bottom-left 17%; — = off (full stage)
SHOTS = [
 (0, "B", "hold 1.8 s, Card 01 pulses orange → 400 ms whip-zoom into Card 01", "—", "sub-bass impact @0.0 · whoosh @1.8", "MasterBoard 4×2: 'EVERY TYPE OF BLACK HOLE'", "Eight types of black holes."),
 (0, "L", "snap zoom-out 3.0→1.0 (whip landing)", "—", "pop", "teaser: a black dot beside an atom, 'SMALLER THAN AN ATOM'", "One is smaller than an atom."),
 (0, "S", "hard cut + fast zoom-out", "—", "deep whoosh", "teaser: a black hole swallowing a drawn solar system, 'BIGGER THAN OUR SOLAR SYSTEM'", "One is bigger than our entire solar system."),
 (0, "S", "snap zoom → flash", "H:shocked", "sub-bass impact (boom)", "teaser: '1.00 s' stopwatch → gold radial burst", "And one explodes in about one second."),
 # 1 MICRO
 (1, "L", "title slam (1.6→1, 6 f)", "—", "sub-bass impact + pop", "TITLE: '01 · MICRO' oversized, red underline wipes in", "Number one: micro black holes."),
 (1, "L", "drift 1.00→1.04", "H:explaining", "pop", "Everest drawing, label 'MASS: 1 MOUNTAIN'", "Take Mount Everest, all of it,"),
 (1, "L", "push-in", "D:explaining", "squish bass", "Everest squashes (scale X/Y) into a glowing gold dot", "and crush it until it becomes a black hole."),
 (1, "L", "snap zoom on the dot", "D:explaining", "tick counter → pop", "HERO '0.24 pm' (radius) counter, cyan ring", "Its radius: zero point two four picometers."),
 (1, "L", "pan along a ruler", "—", "whoosh", "1 nm ruler, the dot ×4,000 smaller, '≈ 4,000× SMALLER THAN 1 nm'", "About four thousand times smaller than a nanometer."),
 (1, "L", "split-screen slide", "—", "pop ×2", "ANALOGY: atom blown up to a football stadium | black hole = beach ball on the pitch", "Blow an atom up to the size of a football stadium,"),
 (1, "L", "push on the beach ball", "—", "pop", "beach ball highlighted on the pitch", "and this black hole is a beach ball on the pitch."),
 (1, "L", "ruler zooms further down", "D:thinking", "tick", "Planck-scale ruler '10⁻³⁵ m', gravity ⚡ quantum icons clash", "Theory says the smallest possible one is about twenty-two micrograms."),
 (1, "L", "split compare", "—", "pop", "salt grain vs 22 µg speck, 'LIGHTER THAN A GRAIN OF SALT'", "Lighter than a grain of salt."),
 (1, "L", "whip pan Earth → LHC", "D:thinking", "zap", "cosmic-ray bolts hit the atmosphere → LHC ring lights cyan", "Physicists have even asked if cosmic rays, or the Large Hadron Collider,"),
 (1, "L", "push-in on the ring", "—", "blip", "a tiny black spark in the collider ring", "could make one for a split second."),
 (1, "S", "HARD CUT to Space + pill drop", "H:the_catch", "sub-bass impact", "'THE CATCH' pill", "The catch: the small ones explode."),
 (1, "S", "slow push", "D:the_catch", "fizzle", "small hole leaking glowing particles: 'HAWKING RADIATION'", "Black holes slowly leak energy, called Hawking radiation."),
 (1, "S", "hole shrinks faster", "D:the_catch", "rising fizzle", "graph: smaller → leaks faster", "And the smaller they are, the faster they leak."),
 (1, "S", "split-screen (left)", "—", "pop", "Everest-mass dot calm, stamp 'OUTLIVES THE UNIVERSE · 10¹⁹ YR'", "Everest's version would outlive the universe."),
 (1, "S", "whale card slides in", "—", "tick counter", "HERO '230 TONS' counter + blue-whale card", "But shrink it to about two hundred and thirty tons, one blue whale,"),
 (1, "S", "snap zoom → flash", "—", "sub-bass impact (boom)", "'1.00 s' stopwatch runs out → gold/orange detonation", "and it blows itself apart in about one second."),
 (1, "S", "snap zoom on timer", "—", "blip", "mono timer '10⁻²⁷ s' flashes and vanishes, tiny LHC icon", "The tiny ones some feared at the collider? Gone in ten to the minus twenty-seven seconds."),
 (1, "L", "cut to Light → 400 ms board zoom-out, ✓ → pan → zoom into Card 02", "H:explaining", "chime → whoosh", "Swiss map intact, green check", "Switzerland is fine."),
 # 2 PRIMORDIAL
 (2, "S", "title slam", "—", "sub-bass impact + pop", "TITLE: '02 · PRIMORDIAL' violet glow", "Number two: primordial black holes."),
 (2, "S", "drift", "H:thinking", "whoosh", "dying-star icon with a red ✗, 'NO STAR NEEDED'", "Every normal black hole starts as a dying star. These skipped the star."),
 (2, "S", "push-in on the timeline", "D:thinking", "rumble", "Big Bang timeline, cursor at '0.0001 s', orange/violet energy soup", "A split second after the Big Bang, the universe was a dense, boiling soup."),
 (2, "S", "3 pockets pinch", "D:thinking", "pop ×3", "3 dense pockets collapse into black dots", "Slightly denser pockets could have collapsed straight into black holes,"),
 (2, "S", "mass bar fills", "—", "tick counter", "bar 'ASTEROID → 1,000s OF SUNS' cyan→violet", "from the mass of an asteroid to thousands of Suns."),
 (2, "L", "cut to Light, split card", "—", "pop", "ANALOGY: pot of gravy, lumps setting first", "Like lumps in gravy that set before the rest of the pot."),
 (2, "L", "snap zoom on a 1971 card", "D:explaining", "pop", "card 'HAWKING · 1971'", "Stephen Hawking proposed them in 1971."),
 (2, "S", "push on a tiny dot", "—", "tick", "asteroid-mass hole drawn next to an atom: 'ASTEROID MASS · SMALLER THAN AN ATOM'", "An asteroid-mass one would be smaller than an atom."),
 (2, "S", "dots fizzle out", "—", "fizzle ×3", "small primordials evaporating, '< 500 MILLION TONS: ALREADY GONE'", "And any lighter than about five hundred million tons have already evaporated."),
 (2, "S", "orbit wobble", "—", "pop", "a dark dot crossing the inner solar system, Mars orbit nudged '≈ 1 m'", "A 2024 study found one drifting through the inner solar system could nudge Mars's orbit by about a meter. Enough to measure."),
 (2, "S", "pie slice slides out", "—", "slide UI", "dark-matter pie, dotted violet slice with '?'", "Some physicists think the rest could be part of the universe's missing dark matter."),
 (2, "S", "HARD CUT + pill", "H:the_catch", "sub-bass impact", "'THE CATCH' pill", "The catch: we've never found one."),
 (2, "S", "lens ring passes", "D:the_catch", "shimmer", "invisible lens drifts across a star field; ring flash", "Surveys watch millions of stars, waiting for something invisible to drift in front"),
 (2, "S", "push on the bent light", "—", "shimmer", "a star brightens briefly (microlensing light curve draws)", "and bend their light."),
 (2, "S", "stamp → board transition", "—", "ink stamp → whoosh", "magnifier over an empty grid, red stamp '0 FINGERPRINTS'", "Mostly: nothing. The perfect suspect, zero fingerprints."),
 # 3 STELLAR
 (3, "L", "title slam", "—", "sub-bass impact + pop", "TITLE: '03 · STELLAR-MASS'", "Number three: stellar-mass black holes. The classic."),
 (3, "L", "push-in on the star", "H:explaining", "pop", "blue star '≥ 20 SUNS'", "Take a star at least twenty times heavier than the Sun."),
 (3, "L", "arrows switch off", "D:explaining", "power-down", "fusion arrows (outward) switch off one by one", "When its fuel runs out, fusion stops pushing back."),
 (3, "S", "snap zoom in on the core", "—", "deep whoosh", "core implodes, '< 1 s'", "The core collapses in under a second,"),
 (3, "S", "snap zoom out on the shockwave", "—", "sub-bass impact (boom)", "supernova ring blasts outward", "and the rest explodes as a supernova."),
 (3, "L", "pan across a skyline", "D:explaining", "tick counter", "black sphere beside a city skyline, counter '5 → 30+ SUNS'", "What's left: five to a few dozen Suns, crushed into a ball the size of a city."),
 (3, "L", "split comparison", "—", "pop", "ANALOGY: 10 Suns ⇢ a ball ~60 km across over a city map", "Ten Suns, in something about sixty kilometers across."),
 (3, "S", "slow orbit pan", "—", "space wind", "Cygnus X-1: blue giant streaming a cyan ribbon into a black dot, '≈ 7,000 LY'", "Cygnus X-1 was the first one we really confirmed,"),
 (3, "S", "push on the gas ribbon", "—", "space wind", "gas ribbon spirals in, glows orange", "slurping gas off a giant blue star seven thousand light-years away."),
 (3, "S", "zoom-out to the Milky Way", "D:thinking", "tick counter", "Milky Way with dots appearing, counter '≈ 100,000,000'", "There are probably about a hundred million of them in our galaxy alone."),
 (3, "S", "snap zoom to one dot", "—", "pop", "'GAIA BH1 · ≈ 1,560 LY' (closest known)", "The closest one we know is about fifteen hundred light-years away."),
 (3, "S", "snap zoom", "—", "tick counter", "'GAIA BH3 · 33 SUNS · 2024' (heaviest stellar one found in the Milky Way)", "And the heaviest found in our galaxy, Gaia BH3, packs thirty-three Suns."),
 (3, "S", "HARD CUT + pill", "H:the_catch", "sub-bass impact", "'THE CATCH' pill", "The catch: from a distance, they're boring."),
 (3, "S", "Sun → black hole swap", "D:the_catch", "chime", "Sun swaps for an equal-mass black hole, 'SAME MASS'", "Swap the Sun for a black hole of the same mass,"),
 (3, "S", "orbit holds", "D:the_catch", "chime", "Earth's dotted orbit unchanged, 'SAME ORBIT'", "and Earth's orbit doesn't change at all."),
 (3, "S", "frost creeps in → board transition", "H:shocked", "cold wind → whoosh", "frost border, 'FROZEN · NOT SUCKED IN'", "You'd freeze in the dark. But you would not get sucked in."),
 # 4 INTERMEDIATE
 (4, "L", "title slam", "—", "sub-bass impact + pop", "TITLE: '04 · INTERMEDIATE'", "Number four: intermediate black holes."),
 (4, "L", "mass bar fills", "H:thinking", "tick counter", "HERO counter '100 → 100,000 SUNS'", "One hundred to one hundred thousand Suns."),
 (4, "L", "zoom-out along a chain", "D:thinking", "pop ×3", "small holes merge → bigger → supermassive", "They have to exist, because the giant ones didn't appear from nothing."),
 (4, "L", "chain completes", "D:thinking", "pop", "missing middle link flashes red", "Smaller black holes had to merge and grow, step by step."),
 (4, "L", "whip pan car → ship", "—", "whoosh", "ANALOGY: car 'STELLAR' · cargo ship 'SUPERMASSIVE'", "Stellar ones are compact cars. Supermassive ones are cargo ships."),
 (4, "L", "snap zoom on the gap", "—", "pop", "dashed red van outline 'MISSING'", "These are the delivery vans that went missing."),
 (4, "S", "HARD CUT + pill", "H:the_catch", "sub-bass impact", "'THE CATCH' pill", "The catch: we almost never see them."),
 (4, "S", "push into a star cluster", "D:the_catch", "pop", "dense cluster, a faint dot shredding a star", "Too small to run a galaxy, too quiet to spot, unless they're shredding a star."),
 (4, "S", "waveform zoom", "—", "chirp", "LIGO chirp → merged hole '≈ 142 SUNS · 2019'", "In 2019, LIGO caught two black holes merging into one of about a hundred and forty-two Suns."),
 (4, "S", "zoom into Omega Centauri → board transition", "—", "pop ×7 → whoosh", "Omega Centauri, 7 fast stars highlighted, '≥ 8,200 SUNS · 2024'", "And in 2024, seven speeding stars in Omega Centauri gave one away: at least eight thousand Suns."),
 # 5 SUPERMASSIVE
 (5, "S", "title slam", "—", "sub-bass impact + pop", "TITLE: '05 · SUPERMASSIVE' orange glow", "Number five: supermassive black holes."),
 (5, "S", "slow push on a galaxy", "H:explaining", "whoosh", "spiral galaxy, core glows", "Almost every big galaxy has one in its middle."),
 (5, "S", "counter", "D:explaining", "tick counter", "'100,000s → BILLIONS OF SUNS'", "Hundreds of thousands to billions of Suns."),
 (5, "S", "push-in to the core", "D:explaining", "tick counter", "HERO '4.3 MILLION SUNS', ring inside Mercury's orbit", "Ours is Sagittarius A-star: four point three million Suns,"),
 (5, "S", "orbit overlay", "—", "pop", "Mercury's orbit drawn around it: 'SMALLER THAN MERCURY'S ORBIT'", "packed into a space smaller than Mercury's orbit."),
 (5, "S", "lensing ring flash", "—", "shutter + pop", "orange ring (our drawing), '2022 · EVENT HORIZON TELESCOPE'", "In 2022, the Event Horizon Telescope photographed it."),
 (5, "S", "orbit trace", "—", "whoosh", "star S2 whipping around it, '≈ 7,650 KM/S · NOBEL 2020'", "Stars near it whip around at about two and a half percent of light speed. Tracking them won the 2020 Nobel Prize."),
 (5, "L", "cut to Light, Earth → grain", "—", "pop", "ANALOGY: Milky Way shrunk to Earth → black hole = a grain of sand", "Shrink the Milky Way to the size of Earth, and that black hole is a grain of sand."),
 (5, "S", "snap zoom to M87", "—", "pop", "M87 ring '6.5 BILLION SUNS · 2019 (first photo)'", "M87's black hole, the first ever photographed, weighs six and a half billion Suns."),
 (5, "S", "quasar flare", "—", "sub-bass swell", "a feeding quasar outshining its whole galaxy", "And when one feeds hard, it can outshine its entire galaxy."),
 (5, "S", "HARD CUT + pill", "H:the_catch", "sub-bass impact", "'THE CATCH' pill", "The catch: bigger is gentler."),
 (5, "S", "split (left)", "—", "stretch whoosh", "small hole, red tidal arrows, figure stretched 'SPAGHETTIFIED'", "Fall into a small one, and the tides stretch you like spaghetti before you reach the edge."),
 (5, "S", "split (right)", "—", "soft swoosh", "supermassive hole, figure crosses dashed horizon calmly 'FEEL: NOTHING'", "Fall into a supermassive one, and you cross the event horizon without feeling a thing."),
 (5, "S", "slow push → board transition", "H:shocked", "sub-bass → whoosh", "horizon closes behind the figure", "Until it's way too late."),
 # 6 ULTRAMASSIVE
 (6, "S", "title slam", "—", "sub-bass impact + pop", "TITLE: '06 · ULTRAMASSIVE' gold glow", "Number six: ultramassive black holes."),
 (6, "S", "push on a quasar", "H:shocked", "tick counter", "'10 BILLION SUNS +'", "Ten billion Suns and up."),
 (6, "S", "HERO counter", "D:shocked", "tick counter → pop", "TON 618, HERO '66 BILLION SUNS' (range 40–66 B)", "TON 618 weighs up to sixty-six billion Suns."),
 (6, "S", "zoom-out reveal", "D:shocked", "deep whoosh", "horizon circle, radius line 'UP TO 1,300 AU'", "Its event horizon reaches up to thirteen hundred astronomical units in radius."),
 (6, "S", "pan across the line-up", "—", "fast ticks", "solar-system discs (to Neptune) lining up across it, counter 1→43", "Line up our solar system, out to Neptune, more than forty times side by side,"),
 (6, "S", "line-up still short", "—", "pop", "'STILL NOT ACROSS'", "and you still haven't crossed it."),
 (6, "S", "brightness counter", "—", "sub-bass swell", "'≈ 140 TRILLION SUNS OF LIGHT'", "Its quasar shines like about a hundred and forty trillion Suns,"),
 (6, "S", "light beam travels", "—", "whoosh", "light ray crossing a timeline, '≈ 10 BILLION YEARS AGO'", "and the light we see left it about ten billion years ago."),
 (6, "S", "snap zoom", "—", "pop", "Phoenix A '≈ 100 BILLION SUNS' vs a smaller Milky Way stars bar", "Phoenix A might weigh around a hundred billion Suns. More than all the stars in the Milky Way."),
 (6, "S", "HARD CUT + pill", "H:the_catch", "sub-bass impact", "'THE CATCH' pill", "The catch: there's a size limit."),
 (6, "S", "disk breaks apart", "D:the_catch", "crackle", "accretion disk fragments, '≈ 50 B SUNS (depends on spin)'", "Past roughly fifty billion Suns, depending on spin, its own gravity wrecks the disk that feeds it."),
 (6, "S", "two giants collide → board transition", "—", "sub-bass impact → whoosh", "two giant holes merging", "After that, the only way to grow is to crash into another giant."),
 # 7 KERR
 (7, "L", "title slam", "—", "sub-bass impact + pop", "TITLE: '07 · SPINNING (KERR)' cyan", "Number seven: spinning black holes. Kerr black holes."),
 (7, "L", "split: static circle | spinning oval", "H:explaining", "pop ×2", "'SCHWARZSCHILD · NO SPIN' | 'KERR · SPINS'", "A Schwarzschild black hole doesn't spin. That's the simple textbook version."),
 (7, "L", "the oval starts spinning", "D:explaining", "swirl", "Kerr oval rotates, card 'ROY KERR · 1963'", "In 1963, Roy Kerr found the math for one that does."),
 (7, "L", "spinning star collapses", "D:explaining", "pop", "spinning star → spinning hole, '≈ ALL REAL BLACK HOLES'", "Stars spin, so almost every real black hole is a Kerr black hole."),
 (7, "S", "counter", "—", "fast ticks", "GRS 1915+105, '> 1,000 SPINS PER SECOND'", "One called GRS 1915+105 spins more than a thousand times a second."),
 (7, "S", "swirl lines wind up", "—", "swirl", "ANALOGY: spoon stirring honey ⇢ frame-dragging swirl", "The fast ones drag space around them, like a spoon stirring honey."),
 (7, "S", "violet band glows", "—", "hum", "violet ring 'ERGOSPHERE · NOTHING STANDS STILL'", "Inside that zone, the ergosphere, nothing can stand still."),
 (7, "S", "zoom into the centre", "—", "pop", "inside: a ring-shaped singularity drawn in gold, 'RING, NOT A POINT'", "And at its heart, the singularity isn't a point. It's a ring."),
 (7, "S", "HARD CUT + pill", "H:the_catch", "sub-bass impact", "'THE CATCH' pill", "The catch: you can steal its energy."),
 (7, "S", "trajectory draws in", "D:the_catch", "whoosh", "object enters the ergosphere and splits", "Throw something into the ergosphere so it splits in two."),
 (7, "S", "gold arrow out", "D:the_catch", "zap", "one half falls in; the other flies out bigger (gold)", "One half falls in. The other flies out with more energy than you threw in."),
 (7, "S", "battery fills → board transition", "H:shocked", "charge-up → whoosh", "cosmic battery fills gold; tiny figure joins it", "A cosmic battery. Get the angle wrong, and you become part of the battery."),
 # 8 CHARGED & WHITE
 (8, "L", "title slam", "—", "sub-bass impact + pop", "TITLE: '08 · CHARGED & WHITE HOLES'", "Number eight: charged black holes and white holes."),
 (8, "L", "museum sign", "H:thinking", "pop", "sign 'MATH-ONLY WING'", "Welcome to the math-only wing of the museum."),
 (8, "L", "push", "D:thinking", "pop", "+/– icon; nested outer + inner horizons", "A Reissner-Nordström black hole carries electric charge, which gives it a second, inner horizon."),
 (8, "S", "reverse zoom (out-burst)", "D:thinking", "reverse whoosh", "white hole: everything blasts outward, 'NOTHING GETS IN'", "A white hole is a black hole in reverse. Nothing gets in. Everything blasts out."),
 (8, "L", "split card", "—", "pop ×2", "ANALOGY: drain (black hole) | a tap you can't turn off (white hole)", "A drain, versus a tap you can never turn off."),
 (8, "S", "HARD CUT + pill", "H:the_catch", "sub-bass impact", "'THE CATCH' pill", "The catch: nature hates both."),
 (8, "S", "charges rush in", "D:the_catch", "zap", "opposite charges stream in, '+' cancels to '0'", "A charged black hole would pull in opposite charges and neutralize itself almost instantly."),
 (8, "S", "stamp", "—", "ink stamp", "white hole crossed by '2nd LAW OF THERMODYNAMICS ✗'", "And white holes break the second law of thermodynamics so badly, most physicists call them math only."),
 (8, "S", "zoom-out to a Big Bang flash", "H:shocked", "sub-bass impact", "Big Bang flash with '?' — 'A WHITE HOLE?'", "Unless, as a few wild ideas suggest, the Big Bang itself was one."),
 # OUTRO
 (9, "L", "board zoom-out, all 8 ✓ → end-screen slot", "H:explaining (points to slot)", "whoosh → chime", "end-screen video slot + subscribe area", "You don't need a black hole to die in one second. Ten real planets will do it. They're right here."),
]

out = ["# Every Type of Black Hole: v2 rebuild (Bluntly-style pacing) · script + micro-shot table\n",
       "Times are **estimates** at 2.8 words/s (after trim + atempo 1.06). Once the new voice is recorded, each shot's start is locked to the **first spoken word of its cue** from Whisper `timestamps.json`, so frames move but the shot list does not.\n",
       "Modes: **B** = MasterBoard (Light) · **L** = Light `#F6F4EF` · **S** = Space `#0E131F`. Character: **H** = hero 26–30% height, 1.5–2.5 s, then springs to the dock · **D** = docked bottom-left 17% · **—** = off, full-stage diagram.\n"]
t = 0.0
rows = []; script = []; chap_t = {}
names = {0: "Cold open", 1: "01 · Micro", 2: "02 · Primordial", 3: "03 · Stellar-mass", 4: "04 · Intermediate", 5: "05 · Supermassive", 6: "06 · Ultramassive", 7: "07 · Spinning (Kerr)", 8: "08 · Charged & white holes", 9: "Outro / end screen"}
last = None
for i, (ch, mode, cam, char, sfx, vis, text) in enumerate(SHOTS):
    n = len(text.split()); d = max(1.8 if ch == 0 else 2.2, n / WPS + 0.25)
    if ch != last:
        chap_t[ch] = t
        rows.append(f"\n### {names[ch]}  (≈ {int(t//60)}:{t%60:04.1f})\n\n| # | start ≈ | frame ≈ | dur | mode | camera | character | visual | SFX | cue (voice) |\n|---|---|---|---|---|---|---|---|---|---|")
        script.append(f"\n**{names[ch]}**\n")
        last = ch
    rows.append(f"| {i:03d} | {int(t//60)}:{t%60:04.1f} | {round(t*FPS)} | {d:.1f}s | {mode} | {cam} | {char} | {vis} | {sfx} | {text} |")
    script.append(text)
    t += d
total = t
words = sum(len(s[6].split()) for s in SHOTS)
durs = [max(2.2, len(s[6].split()) / WPS + 0.25) for s in SHOTS[1:]]
long = [i + 1 for i, d in enumerate(durs) if d > 4.5]
out.append(f"\n**Totals:** {len(SHOTS)} shots · {words} words · ≈ {int(total//60)}:{total%60:04.1f} runtime · median shot {sorted(durs)[len(durs)//2]:.1f}s. Shots over 4.5 s get an internal mid-shot beat (second element pops on its own cue word): {', '.join(f'{x:03d}' for x in long)}.\n")
out.append("\n## Script to record (voice: Max, Eleven v4)\n" + "\n".join(script) + "\n")
out.append("\n## Micro-shot table\n" + "\n".join(rows) + "\n")
if __name__ == "__main__": open("v2_script_and_shots.md", "w").write("\n".join(out))
if __name__ == "__main__": print(len(SHOTS), "shots", words, "words", f"{total:.1f}s", "long:", long)
