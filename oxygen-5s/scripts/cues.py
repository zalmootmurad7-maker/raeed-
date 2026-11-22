"""SFX cue sheet from the timeline: Pop_Card on every cut, Whoosh_Snap on the big moments (atoms vanish, oxygen
snaps back, ignition, sky fire), Whoosh_Zoom on camera zooms, Thud_Catch on every stamp, Tick_Counter during count-ups."""
import json, re, glob
src_v = open("src/Video.tsx").read()
beats = [float(t) for t, n in re.findall(r'\{ t: ([0-9.]+), C: [A-Za-z.0-9]+, name: "(\w+)" \}', src_v)]
cues = [("Pop_Card", t) for t in beats[1:]]
src = "".join(open(p).read() for p in glob.glob("src/scenes/*.tsx"))
for m in re.finditer(r"<Stamp at=\{F\(([0-9.]+)\)\}", src): cues.append(("Thud_Catch", float(m.group(1))))
for m in re.finditer(r"<Count a=\{F\(([0-9.]+)\)\} b=\{F\(([0-9.]+)\)\}", src):
    a, b = float(m.group(1)), float(m.group(2)); n = max(3, int((b - a) / 0.09))
    cues += [("Tick_Counter", a + k * (b - a) / n) for k in range(n)]
cues += [("Whoosh_Snap", t) for t in (6.38, 24.08, 70.42, 97.98, 139.54, 151.28, 163.38, 173.68, 175.2, 195.1)]
cues += [("Whoosh_Zoom", t) for t in (29.24, 133.44, 145.2)]
cues = [c for c in cues if not any(c[0] == "Pop_Card" and abs(c[1] - d[1]) < 0.05 and d[0].startswith("Whoosh") for d in cues)]
cues.sort(key=lambda c: c[1])
json.dump(cues, open("audio/sfx_cues.json", "w"), indent=0)
from collections import Counter; print(len(cues), Counter(c[0] for c in cues))
