"""v2 mix: voice (audio_v2/voiceover.wav, -16 LUFS) + dark ambient bed 28 dB under the voice during speech
+ SFX 20 dB under the voice (whoosh on board moves, sub-bass impact on title slams / catch pills / explosions,
pop on every cut, tick rolls on spoken numbers). Static gain to -14 LUFS + limiter. -> audio_v2/mix.wav"""
import json, re, subprocess
import numpy as np
SR = 48000
TL = json.load(open("src/v2/timeline.json")); SH = TL["shots"]; W = TL["words"]
DUR = TL["duration"]; N = int(DUR * SR); t = np.arange(N) / SR
rng = np.random.default_rng(11)
def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)
def save(p, x): subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f64le", "-ar", str(SR), "-ac", "1", "-i", "-", "-c:a", "pcm_s24le", p], input=x.tobytes(), check=True)
def lufs(p):
    o = subprocess.run(["ffmpeg", "-i", p, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float([l for l in o.splitlines() if l.strip().startswith("I:")][-1].split()[1])
voice = load("audio_v2/voiceover.wav"); voice = np.concatenate([voice, np.zeros(max(0, N - len(voice)))])[:N]
speech = np.zeros(N)
for w in W: speech[int(max(0, w["start"] - 0.05) * SR): int((w["end"] + 0.08) * SR)] = 1
k = int(0.12 * SR); spm = np.clip(np.convolve(speech, np.ones(k) / k, mode="same"), 0, 1)
lib = {n: load(f"assets/sfx_v2/{n}.wav") for n in ["Pop_Card", "Whoosh_Snap", "Whoosh_Zoom", "Tick_Counter"]}
n = int(1.2 * SR); tt = np.arange(n) / SR
lib["Impact"] = np.sin(2 * np.pi * np.cumsum(80 * np.exp(-tt * 2.5) + 34) / SR) * np.exp(-tt * 3.2)
LEVEL = {"Pop_Card": 0.55, "Whoosh_Snap": 0.75, "Whoosh_Zoom": 0.8, "Tick_Counter": 0.22, "Impact": 1.0}
norm = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())
def word_after(t0, t1, w):
    for x in W:
        if t0 - 0.05 <= x["start"] < t1 and norm(x["word"]) == w: return x["start"]
    return None
cues = [("Impact", 0.0), ("Whoosh_Zoom", 1.8)]
for s in SH[1:]:
    txt = s["text"].lower()
    if txt.startswith("number "):
        cues.append(("Whoosh_Zoom", s["start"]))
        name = norm(txt.split(":")[1].split()[0]) if ":" in txt else None
        tn = word_after(s["start"], s["end"], name) if name else None
        cues.append(("Impact", tn if tn is not None else s["start"] + 0.6))
    elif txt.startswith("the catch"): cues.append(("Impact", s["start"]))
    else: cues.append(("Pop_Card", s["start"]))
for sid, w in [(3, "second"), (20, "apart"), (42, "and"), (89, "crash")]:
    s = SH[sid]; tb = word_after(s["start"], s["end"], w); cues.append(("Impact", tb if tb is not None else s["start"]))
cues.append(("Whoosh_Snap", SH[-1]["start"]))
for x in W:  # tick roll on spoken numbers (hero counters count up on these)
    if re.search(r"\d", x["word"]):
        cues += [("Tick_Counter", x["start"] + i * 0.07) for i in range(8)]
sfx = np.zeros(N)
for nm, tm in cues:
    snd = lib[nm] * LEVEL[nm]; i = int(tm * SR)
    if 0 <= i < N: sfx[i:i + len(snd)] += snd[: N - i]
sfx *= (1 + (10 ** (-7 / 20) - 1) * spm)  # duck a further ~7 dB under words
# dark ambient bed: low drone + slow filtered noise, louder in gaps
def lp(x, a):
    y = np.empty_like(x); s0 = 0.0
    for i in range(len(x)): s0 += a * (x[i] - s0); y[i] = s0
    return y
mus = 0.5 * np.sin(2 * np.pi * 55 * t) + 0.3 * np.sin(2 * np.pi * 82.41 * t + 0.4) + 0.15 * np.sin(2 * np.pi * 123.47 * t)
mus *= 0.75 + 0.25 * np.sin(2 * np.pi * t / 7.0)
noise = lp(rng.uniform(-1, 1, N), 0.012); mus += 0.6 * noise / (np.max(np.abs(noise)) + 1e-9) * (0.6 + 0.4 * np.sin(2 * np.pi * t / 4.3))
mus += 0.06 * np.sin(2 * np.pi * 659.25 * t) * (0.5 + 0.5 * np.sin(2 * np.pi * t / 3.1))
mus *= np.minimum(1, t / 1.5) * np.minimum(1, (DUR - t) / 2.5)
mus *= (0.25 + (0.10 - 0.25) * spm) / 0.25
m = speech > 0.5
def rms(x, mask): return np.sqrt(np.mean(x[mask] ** 2) + 1e-12)
mus *= rms(voice, m) / rms(mus, m) * 10 ** (-28 / 20)
act = np.abs(sfx) > 1e-4
sfx *= rms(voice, m) / rms(sfx, act) * 10 ** (-20 / 20)
mix = voice + mus + sfx
print(f"{len(cues)} SFX cues · music {20*np.log10(rms(voice,m)/rms(mus,m)):.1f} dB · SFX {20*np.log10(rms(voice,m)/rms(sfx,act)):.1f} dB under the voice")
save("audio_v2/_mix_pre.wav", mix)
g = -14 - lufs("audio_v2/_mix_pre.wav")
for _ in range(4):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "audio_v2/_mix_pre.wav", "-af", f"volume={g}dB,aresample=192000,alimiter=limit=0.79:level=false,aresample=48000", "-c:a", "pcm_s24le", "audio_v2/mix.wav"], check=True)
    got = lufs("audio_v2/mix.wav")
    if abs(got + 14) < 0.15: break
    g += -14 - got
print("final mix:", got, "LUFS")
