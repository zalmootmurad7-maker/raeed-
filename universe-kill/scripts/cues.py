"""Build the SFX cue sheet from the timeline: Pop_Card on every cut, Whoosh_Zoom on board zoom-out/zoom-in,
Whoosh_Snap on chapter titles + big pop-ins, Thud_Catch on every stamp, soft Tick_Counter during count-ups."""
import json, re, glob
beats = json.load(open("/tmp/claude-0/-home-user/5301fd0d-7a97-5c5e-b8ad-3df047c339b5/scratchpad/uk/beats.json"))
END = 588.9
cues = []
for i, (t, name) in enumerate(beats):
    e = beats[i + 1][0] if i + 1 < len(beats) else END
    if "To" in name and name.startswith("C"):          # board transitions
        cues += [("Whoosh_Zoom", t), ("Whoosh_Zoom", e - 16 / 30)]
    elif name.endswith("Title"):
        cues += [("Whoosh_Snap", t)]
    elif i > 0:
        cues += [("Pop_Card", t)]
src = "".join(open(p).read() for p in glob.glob("src/scenes/*.tsx"))
for m in re.finditer(r"<Stamp at=\{F\(([0-9.]+)\)\}", src): cues.append(("Thud_Catch", float(m.group(1))))
for m in re.finditer(r"<Count a=\{F\(([0-9.]+)\)\} b=\{F\(([0-9.]+)\)\}", src):
    a, b = float(m.group(1)), float(m.group(2)); n = max(3, int((b - a) / 0.09))
    cues += [("Tick_Counter", a + k * (b - a) / n) for k in range(n)]
cues.append(("Whoosh_Snap", 1.2))   # the cosmic ray through the ceiling
cues.sort(key=lambda c: c[1])
json.dump(cues, open("audio/sfx_cues.json", "w"), indent=0)
from collections import Counter; print(len(cues), Counter(c[0] for c in cues))
