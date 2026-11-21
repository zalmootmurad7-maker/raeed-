"""Audio for the 'ShortPlanets-1SecondToLive' Short: voice (processed: atempo 1.06 + gaps <= 0.25 s) + plucked music bed
~28 dB under the voice + SFX from src/shorts/short_planets.json: impact at 0, Pop_Card on every cut, Whoosh_Snap on every
Snap Zoom, Thud_Catch + stamp on every stamp. SFX bus x0.4, a further -7 dB under speech. Static gain to -14 LUFS + limiter -1 dBFS."""
import json, subprocess
import numpy as np
SR = 48000
rng = np.random.default_rng(11)
def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)
def save(p, x):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f64le", "-ar", str(SR), "-ac", "1", "-i", "-", "-c:a", "pcm_s24le", p], input=x.tobytes(), check=True)
def t(d): return np.arange(int(d * SR)) / SR
def lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a) * x[i] + a * s; y[i] = s
    return y
def norm(x, p=1.0): return x / (np.max(np.abs(x)) + 1e-9) * p
def whoosh_snap():
    n = int(0.26 * SR); x = rng.standard_normal(n); k = np.linspace(0, 1, n)
    return norm((lp(x, 900) + 0.5 * lp(x, 2500) * k) * np.sin(np.pi * k) ** 1.5, 0.8)
def pop_card():
    tt = t(0.09); f = 520 + 600 * tt / tt[-1]
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 38); y[:60] += rng.standard_normal(60) * 0.4
    return norm(y, 0.7)
def thud_catch():
    tt = t(0.5); y = np.sin(2 * np.pi * (70 - 25 * tt) * tt) * np.exp(-tt * 9) + 0.25 * lp(rng.standard_normal(len(tt)), 300) * np.exp(-tt * 20)
    s = t(0.25); st = 0.9 * lp(rng.standard_normal(len(s)), 1800) * np.exp(-s * 45) + np.sin(2 * np.pi * 160 * s) * np.exp(-s * 28)
    y[: len(st)] += 0.6 * st
    return norm(y, 1.0)
def impact():
    tt = t(1.0); return norm(np.sin(2 * np.pi * (56 - 22 * tt) * tt) * np.exp(-tt * 4.5) + 0.4 * lp(rng.standard_normal(len(tt)), 600) * np.exp(-tt * 18), 1.0)
LIB = {"pop": (pop_card, 0.6), "whoosh": (whoosh_snap, 0.75), "thud": (thud_catch, 0.9), "impact": (impact, 1.0)}

cfg = json.load(open("src/shorts/short_planets.json"))
ts = json.load(open("src/shorts/short_planets_ts.json"))
voice = load("public/audio/sp/short_planets.wav")
N = int(cfg["duration"] * SR); voice = np.concatenate([voice, np.zeros(max(0, N - len(voice)))])[:N]
voice = voice / np.max(np.abs(voice)) * 0.5
cues = [("impact", 0.0)]
for i, b in enumerate(cfg["beats"]):
    if i: cues.append(("pop", b["t"]))
    if "snap" in b: cues.append(("whoosh", max(0, b["snap"] - 0.12)))
    if "stamp" in b: cues.append(("thud", b["stamp"]))
sfx = np.zeros(N)
for name, tm in cues:
    fn, lvl = LIB[name]; s = fn() * lvl; i = int(tm * SR); sfx[i:i + len(s)] += s[: max(0, N - i)]
speech = np.zeros(N)
for w in ts["words"]: speech[int(max(0, w["start"] - 0.05) * SR): int((w["end"] + 0.08) * SR)] = 1
k = int(0.15 * SR); sp = np.clip(np.convolve(speech, np.ones(k) / k, mode="same"), 0, 1)
# music bed: plucked pentatonic (Karplus-Strong) + low pad, 96 bpm
def pluck(f, d=1.2):
    n = int(d * SR); p = max(2, int(SR / f)); buf = rng.uniform(-1, 1, p); out = np.zeros(n)
    for i in range(n): out[i] = buf[i % p]; buf[i % p] = 0.996 * 0.5 * (buf[i % p] + buf[(i + 1) % p])
    return out
notes = [220.0, 261.63, 293.66, 329.63, 392.0, 440.0]; cache = {}
music = np.zeros(N); beat = 60 / 96; pattern = [0, 2, 4, 2, 5, 3, 1, 3]; i = 0; tm = 0.0
while tm < N / SR:
    f = notes[pattern[i % 8]] * (0.5 if (i // 16) % 2 else 1)
    if f not in cache: cache[f] = pluck(f)
    s = cache[f]; j = int(tm * SR); music[j:j + len(s)] += s[: max(0, N - j)] * (0.9 if i % 4 == 0 else 0.6); tm += beat / 2; i += 1
tt = np.arange(N) / SR
music += 0.25 * (np.sin(2 * np.pi * 110 * tt) + 0.5 * np.sin(2 * np.pi * 164.81 * tt)) * (0.6 + 0.4 * np.sin(2 * np.pi * tt / 16))
music = norm(music) * np.minimum(1, tt / 1.0) * np.minimum(1, (N / SR - tt) / 1.5)
music = music * 0.5 * (0.25 + (0.10 - 0.25) * sp) * 10 ** (-13.6 / 20)  # -> ~28 dB under the voice
sfx = sfx * 0.5 * 0.4 * (1 + (10 ** (-7 / 20) - 1) * sp)
mix = voice + music + sfx
m = speech > 0.5
def rms(x): return np.sqrt(np.mean(x[m] ** 2) + 1e-12)
print("music under voice: %.1f dB | SFX under voice: %.1f dB" % (20 * np.log10(rms(voice) / rms(music)), 20 * np.log10(rms(voice) / rms(sfx))))
pre = "public/audio/sp/mix_pre.wav"; out = "public/audio/sp/short_planets_mix.wav"; save(pre, mix)
def lufs(p):
    o = subprocess.run(["ffmpeg", "-i", p, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float([l for l in o.splitlines() if l.strip().startswith("I:")][-1].split()[1])
g = -14 - lufs(pre)
for _ in range(3):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", pre, "-af", f"volume={g}dB,aresample=192000,alimiter=limit=0.891:level=false,aresample=48000", "-c:a", "pcm_s24le", out], check=True)
    got = lufs(out)
    if abs(got + 14) < 0.15: break
    g += -14 - got
print("mix", round(got, 1), "LUFS,", len(cues), "SFX cues")
