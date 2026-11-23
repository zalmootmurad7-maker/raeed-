"""Black-hole Short mix: voice (-16 LUFS) + dark cosmic drone (28 dB under the voice during speech) + procedural SFX
(20 dB under the voice), music cuts to silence on the final "one" beat (loop). One static gain to -14 LUFS + limiter."""
import json, subprocess
import numpy as np

SR = 48000
ts = json.load(open("audio/timestamps.json"))
DUR = round(ts["duration"] + 0.3, 3)
N = int(DUR * SR)
t = np.arange(N) / SR
rng = np.random.default_rng(3)
W = {w["word"].strip(",.?!").lower() + f"@{i}": w for i, w in enumerate(ts["words"])}
def at(word, nth=0):
    hits = [w for k, w in W.items() if k.split("@")[0] == word]
    return hits[nth]["start"]

def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)
def save(p, x): subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f64le", "-ar", str(SR), "-ac", "1", "-i", "-", "-c:a", "pcm_s24le", p], input=x.tobytes(), check=True)
def lufs(p):
    o = subprocess.run(["ffmpeg", "-i", p, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float([l for l in o.splitlines() if l.strip().startswith("I:")][-1].split()[1])
def lp(x, a):  # one-pole low-pass (a may vary per sample)
    a = np.broadcast_to(np.asarray(a, dtype=float), x.shape)
    y = np.empty_like(x); s = 0.0
    for i in range(len(x)): s += a[i] * (x[i] - s); y[i] = s
    return y
def place(buf, snd, sec, g=1.0):
    i = int(sec * SR); buf[i:i + len(snd)] += g * snd[: max(0, N - i)]

voice = load("audio/voiceover.wav"); voice = np.concatenate([voice, np.zeros(max(0, N - len(voice)))])[:N]
speech = np.zeros(N)
for w in ts["words"]: speech[int(max(0, w["start"] - 0.05) * SR): int((w["end"] + 0.08) * SR)] = 1
k = int(0.12 * SR); spm = np.clip(np.convolve(speech, np.ones(k) / k, mode="same"), 0, 1)

# ---------- SFX ----------
sfx = np.zeros(N)
# 0.0 s: deep sub-bass whoosh impact
n = int(1.4 * SR); tt = np.arange(n) / SR
f = 85 * np.exp(-tt * 2.2) + 32
boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 2.6)
whoosh = lp(rng.uniform(-1, 1, n), 0.08) * np.exp(-tt * 7) * 2.2
place(sfx, boom * 1.0 + whoosh, 0.0)
# shots 3–4: clock ticks accelerating, then a time-warp riser into the shot-5 cut
t_tick0, t_cut5 = at("your"), at("you", 3)  # "Your watch…" → "You have fuel…"
def tick(hi=1.0):
    n = int(0.03 * SR); tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * 3200 * tt) * 0.6 + rng.uniform(-1, 1, n) * 0.4) * np.exp(-tt * 260) * hi
tm, gap = t_tick0, 0.5
while tm < t_cut5 - 0.25:
    place(sfx, tick(0.55 if int((tm - t_tick0) / max(gap, 1e-3)) % 2 else 0.75), tm)
    tm += gap; gap = max(0.055, gap * 0.9)
r0 = at("centuries"); n = int((t_cut5 - r0) * SR); tt = np.arange(n) / SR; u = tt / tt[-1]
fr = 180 + 1400 * u ** 2
riser = (np.sin(2 * np.pi * np.cumsum(fr) / SR) * 0.35 + lp(rng.uniform(-1, 1, n), 0.05 + 0.3 * u) * 0.9) * u ** 1.6
place(sfx, riser * 0.9, r0)
# shots 5–6: low-fuel warning beep on each cut
def beep():
    n = int(0.42 * SR); tt = np.arange(n) / SR; out = np.zeros(n)
    for d in (0.0, 0.2):
        m = (tt >= d) & (tt < d + 0.12); out[m] += np.sin(2 * np.pi * 980 * (tt[m] - d)) * np.exp(-(tt[m] - d) * 14)
    return out
place(sfx, beep(), t_cut5); place(sfx, beep() * 0.85, at("escape"))
# shots 7–8: heavy heartbeat on "three", "two", "one"
def heart():
    n = int(0.5 * SR); tt = np.arange(n) / SR; out = np.zeros(n)
    for d, a in ((0.0, 1.0), (0.17, 0.6)):
        m = tt >= d; x = tt[m] - d; out[m] += a * np.sin(2 * np.pi * (58 - 18 * x) * x) * np.exp(-x * 16)
    return out
beats = [at("three"), at("two"), at("one", 1)]
for b in beats: place(sfx, heart() * 1.4, b)

# ---------- music: dark cosmic tension drone ----------
mus = 0.6 * np.sin(2 * np.pi * 55 * t) + 0.35 * np.sin(2 * np.pi * 82.41 * t + 0.4) + 0.18 * np.sin(2 * np.pi * 110.3 * t)
mus *= 0.75 + 0.25 * np.sin(2 * np.pi * t / 5.5)
mus += 0.5 * lp(rng.uniform(-1, 1, N), 0.015) * (0.6 + 0.4 * np.sin(2 * np.pi * t / 3.7))
mus += 0.08 * np.sin(2 * np.pi * 880 * t) * (0.5 + 0.5 * np.sin(2 * np.pi * t / 2.3)) * np.minimum(1, t / 8)  # thin shimmer
mus *= np.minimum(1, t / 0.6) * (1 + 0.5 * np.clip((t - beats[0]) / 1.5, 0, 1))  # swell into the countdown
mus[t >= beats[-1]] = 0.0  # abrupt cut to silence on the final beat (loop)
mus *= (0.25 + (0.10 - 0.25) * spm) / 0.25

m = speech > 0.5
def rms(x, mask): return np.sqrt(np.mean(x[mask] ** 2) + 1e-12)
mus *= rms(voice, m) / rms(mus, m) * 10 ** (-28 / 20)
act = np.abs(sfx) > 1e-4
sfx *= rms(voice, m) / rms(sfx, act) * 10 ** (-20 / 20)
mix = voice + mus + sfx
print("music under voice (speech): %.1f dB | SFX (active) under voice: %.1f dB" % (20 * np.log10(rms(voice, m) / rms(mus, m)), 20 * np.log10(rms(voice, m) / rms(sfx, act))))
save("audio/_mix_pre.wav", mix)
g = -14 - lufs("audio/_mix_pre.wav")
for _ in range(4):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "audio/_mix_pre.wav", "-af", f"volume={g}dB,aresample=192000,alimiter=limit=0.79:level=false,aresample=48000", "-c:a", "pcm_s24le", "audio/mix.wav"], check=True)
    got = lufs("audio/mix.wav")
    if abs(got + 14) < 0.15: break
    g += -14 - got
json.dump({"duration": DUR, "beats": beats, "cut5": t_cut5}, open("audio/cues.json", "w"))
print("final mix:", got, "LUFS · duration", DUR)
