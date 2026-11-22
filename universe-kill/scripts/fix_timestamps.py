"""Patch Whisper's full-pass gaps with words from focused re-transcriptions (verified by ear/energy)."""
import json
d = json.load(open("audio/timestamps.json")); W = d["words"]
# 1) chapter 5 title line was skipped by the full pass (found by a focused pass on 276-286 s)
if not any(w["word"].lower().startswith("supernova") and 280 < w["start"] < 283 for w in W):
    i = next(k for k, w in enumerate(W) if w["word"] == "When" and 281.5 < w["start"] < 283)
    W[i]["start"] = 282.46
    W[i:i] = [{"word": "Number", "start": 279.7, "end": 280.04}, {"word": "5.", "start": 280.04, "end": 280.62},
              {"word": "A", "start": 281.08, "end": 281.2}, {"word": "nearby", "start": 281.2, "end": 281.64},
              {"word": "supernova.", "start": 281.64, "end": 282.46}]
json.dump(d, open("audio/timestamps.json", "w"), indent=1)
print(len(W), "words")
