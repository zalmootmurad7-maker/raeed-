"""Lock each v2 shot (scripts/v2_plan.py SHOTS) to the recorded voice: shot k starts at the Whisper time of its first
script word (difflib alignment of normalized tokens; unmatched tokens are interpolated). -> src/v2/timeline.json"""
import difflib, json, re, sys
sys.path.insert(0, "scripts")
from v2_plan import SHOTS
ts = json.load(open("audio_v2/timestamps.json")); W = ts["words"]
norm = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())
wt = [norm(w["word"]) for w in W]
st, owner = [], []
for k, sh in enumerate(SHOTS):
    for tok in sh[6].split():
        st.append(norm(tok)); owner.append(k)
sm = difflib.SequenceMatcher(None, st, wt, autojunk=False)
m = {}
for a, b, n in sm.get_matching_blocks():
    for i in range(n): m[a + i] = b + i
print(f"matched {len(m)}/{len(st)} script tokens")
def widx(i):
    if i in m: return m[i]
    nxt = next((j for j in range(i, len(st)) if j in m), None)
    prv = next((j for j in range(i, -1, -1) if j in m), None)
    if nxt is not None and prv is not None and nxt != prv:
        return round(m[prv] + (m[nxt] - m[prv]) * (i - prv) / (nxt - prv))
    return m[nxt] - (nxt - i) if nxt is not None else m[prv] + (i - prv)
starts = []
for k in range(len(SHOTS)):
    i = owner.index(k)
    j = max(0, min(len(W) - 1, widx(i)))
    starts.append(0.0 if k == 0 else max(0.0, W[j]["start"] - 0.06))
for k in range(1, len(starts)):
    if starts[k] <= starts[k - 1] + 0.5: print("WARN tight", k, starts[k - 1], starts[k])
out = []
for k, sh in enumerate(SHOTS):
    end = starts[k + 1] if k + 1 < len(SHOTS) else ts["duration"] + 5.0  # end screen hold after the last word
    out.append({"id": k, "ch": sh[0], "mode": sh[1], "char": sh[3], "start": round(starts[k], 3), "end": round(end, 3), "text": sh[6]})
json.dump({"duration": round(ts["duration"] + 5.0, 3), "shots": out, "words": W}, open("src/v2/timeline.json", "w"), indent=0)
d = [s["end"] - s["start"] for s in out]
print(f"{len(out)} shots, total {out[-1]['end']:.1f}s, median {sorted(d)[len(d)//2]:.2f}s, max {max(d):.2f}s (#{d.index(max(d))}), min {min(d):.2f}s (#{d.index(min(d))})")
print("over 4.5 s:", [(i, round(x, 1)) for i, x in enumerate(d) if x > 4.5])
