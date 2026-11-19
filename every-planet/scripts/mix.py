"""Synth SFX + plucked music bed + mix for Every Type of Black Hole (owner mix rules, CLAUDE.md).
voice 100% (peak ~ -6 dBFS) · music 10% under speech / 25% in gaps · SFX bus x0.4, ducked a further 7 dB under speech,
target SFX >= 15 dB under voice · one static gain to the target LUFS · limiter at -1 dBFS.
Usage: python3 scripts/mix.py [target_lufs]   -> public/audio/mix.wav
"""
import json, subprocess, sys
import numpy as np

SR = 48000
TARGET = float(sys.argv[1]) if len(sys.argv) > 1 else -14.0
rng = np.random.default_rng(7)

def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)
def save(p, x):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f64le", "-ar", str(SR), "-ac", "1", "-i", "-", "-c:a", "pcm_s24le", p], input=x.astype(np.float64).tobytes(), check=True)
def t(d): return np.arange(int(d * SR)) / SR
def env(n, a=0.005, r=None):
    e = np.ones(n); na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na)
    return e
def lp(x, fc):  # one-pole low-pass
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a) * x[i] + a * s; y[i] = s
    return y
def norm(x, p=1.0): return x / (np.max(np.abs(x)) + 1e-9) * p

# ---------- SFX library ----------
def whoosh(d=0.45):
    n = int(d * SR); x = rng.standard_normal(n); k = np.linspace(0, 1, n)
    y = lp(x, 900) + 0.5 * lp(x, 2500) * k
    return norm(y * np.sin(np.pi * k) ** 1.5, 0.8)
def snap():
    w = whoosh(0.22); return np.concatenate([w, np.zeros(10)])
def pop():
    tt = t(0.09); f = 520 + 600 * tt / tt[-1]
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 38)
    y[:60] += rng.standard_normal(60) * 0.4
    return norm(y, 0.7)
def thud():
    tt = t(0.5); y = np.sin(2 * np.pi * (70 - 25 * tt) * tt) * np.exp(-tt * 9) + 0.25 * lp(rng.standard_normal(len(tt)), 300) * np.exp(-tt * 20)
    return norm(y, 1.0)
def boom(d=1.6):
    tt = t(d); y = np.sin(2 * np.pi * (52 - 20 * tt / d) * tt) * np.exp(-tt * 2.6) + 0.8 * lp(rng.standard_normal(len(tt)), 500) * np.exp(-tt * 4)
    return norm(y, 1.0)
def stamp():
    tt = t(0.25); y = 0.9 * lp(rng.standard_normal(len(tt)), 1800) * np.exp(-tt * 45) + np.sin(2 * np.pi * 160 * tt) * np.exp(-tt * 28)
    return norm(y, 0.9)
def tick():  # soft wooden tick: low pitch, gentle attack, no click (owner: "soften the sharp ticks")
    tt = t(0.06); a = np.minimum(1, tt / 0.004)
    return norm(lp(np.sin(2 * np.pi * 1100 * tt) * a * np.exp(-tt * 70), 2500), 0.5)
def shutter():
    a = tick(); return np.concatenate([a, np.zeros(int(0.07 * SR)), a])
def chime():
    tt = t(1.6); y = sum(np.sin(2 * np.pi * f * tt) * np.exp(-tt * d) for f, d in [(880, 2.5), (1320, 3.2), (1760, 4)])
    return norm(y, 0.6)
def zap():
    tt = t(0.4); f = 1400 - 1100 * tt / tt[-1]
    y = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * np.exp(-tt * 7) * 0.5 + 0.4 * rng.standard_normal(len(tt)) * np.exp(-tt * 12)
    return norm(lp(y, 3500), 0.6)
def rumble(d=3.0):
    tt = t(d); k = np.sin(np.pi * tt / d); return norm(lp(rng.standard_normal(len(tt)), 120) * k, 0.8)
def chirp(d=1.4):
    tt = t(d); f = 60 + 500 * (tt / d) ** 4
    return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * (tt / d) ** 1.5 * np.exp(-np.maximum(0, tt - d + 0.1) * 40), 0.7)
LIB = dict(whoosh=whoosh, snap=snap, pop=pop, thud=thud, boom=boom, stamp=stamp, tick=tick, shutter=shutter, chime=chime, zap=zap, rumble=rumble, chirp=chirp)
LEVEL = dict(whoosh=0.75, snap=0.75, pop=0.6, thud=0.9, boom=0.8, stamp=0.75, tick=0.18, shutter=0.75, chime=0.8, zap=0.7, rumble=0.6, chirp=0.6)

# ---------- cue sheet (mirrors the visual beats: fraction of each shot) ----------
TIM = json.load(open("src/timing.json"))["shots"]
def at(sid, frac=0.0):
    a, b = TIM[sid]; return a + frac * (b - a)
cues = []
add = lambda name, time: cues.append((name, time))
for sid in TIM:
    if sid.endswith("b"): add("whoosh", at(sid))
add("whoosh", TIM["00"][1] - 0.45); add("whoosh", at("52"))
CATCH = ["06", "15", "23", "29", "35", "41", "46", "50"]
for sid in CATCH: add("thud", at(sid))
for sid in TIM:
    if sid not in CATCH and not sid.endswith("b") and sid not in ("00", "52"): add("pop", at(sid) + 0.03)
for sid, fr in [("08", .62), ("20", .5), ("42", .75), ("51", .55)]: add("boom", at(sid, fr))
add("zap", at("04", .68)); add("zap", at("05", .1))
for sid, fr in [("08", .25), ("15", .5), ("17", .62), ("19", .62), ("23", .55), ("31", .4), ("36", .55), ("44", .5), ("47", .75), ("51", .25)]: add("stamp", at(sid, fr))
for sid, fr in [("09", .15), ("14", .55), ("20", .28), ("02", .35), ("05", .55), ("26", .62)]: add("snap", at(sid, fr))
add("shutter", at("34", .22))
for sid, a, b, n in [("21", .2, .6, 12), ("30", .35, .7, 14), ("33", .1, .5, 16), ("38", .2, .5, 10)]:
    for i in range(n): add("tick", at(sid, a + (b - a) * i / n))
a39 = at("39")
for i in range(40): add("tick", a39 + (15 + 12 * i) / 30)
add("rumble", at("12", .05)); add("chirp", at("30", .45)); add("chime", at("53", .3)); add("chime", at("10", .4))

# ---------- tracks ----------
voice = load("public/audio/voiceover.wav")
N = int(TIM["53"][1] * SR) + SR
voice = np.pad(voice, (0, max(0, N - len(voice))))[:N]
words = json.load(open("public/audio/timestamps.json"))["words"]
speech = np.zeros(N)
for w in words:
    speech[int(max(0, w["start"] - 0.05) * SR): int((w["end"] + 0.08) * SR)] = 1
def smooth(x, ms):
    k = int(ms / 1000 * SR); c = np.cumsum(np.insert(x, 0, 0)); y = (c[k:] - c[:-k]) / k
    return np.pad(y, (k // 2, len(x) - len(y) - k // 2), mode="edge")
sp = np.clip(smooth(speech, 150), 0, 1)

sfx = np.zeros(N)
for name, tm in cues:
    s = LIB[name]() * LEVEL[name]; i = int(tm * SR)
    if i < N: sfx[i:i + len(s)] += s[: N - i]
# music: soft plucked pentatonic (Karplus-Strong) + low pad, 96 bpm
def pluck(f, d=1.2):
    n = int(d * SR); p = max(2, int(SR / f)); buf = rng.uniform(-1, 1, p); out = np.zeros(n)
    for i in range(n):
        out[i] = buf[i % p]; buf[i % p] = 0.996 * 0.5 * (buf[i % p] + buf[(i + 1) % p])
    return out
notes = [220.0, 261.63, 293.66, 329.63, 392.0, 440.0]
cache = {f: pluck(f) for f in notes}
music = np.zeros(N); beat = 60 / 96
pattern = [0, 2, 4, 2, 5, 3, 1, 3]
i = 0; tm = 0.0
while tm < N / SR:
    f = notes[pattern[i % 8]] * (0.5 if (i // 16) % 2 else 1); s = cache.get(f) if f in cache else pluck(f)
    j = int(tm * SR); music[j:j + len(s)] += s[: max(0, N - j)] * (0.9 if i % 4 == 0 else 0.6); tm += beat / 2; i += 1
tt = np.arange(N) / SR
music += 0.25 * (np.sin(2 * np.pi * 110 * tt) + 0.5 * np.sin(2 * np.pi * 164.81 * tt)) * (0.6 + 0.4 * np.sin(2 * np.pi * tt / 16))
music = norm(music, 1.0) * np.minimum(1, tt / 2) * np.minimum(1, (N / SR - tt) / 3)

vpk = np.max(np.abs(voice)); voice = voice / vpk * 0.5          # voice 100% = peak -6 dBFS
music = music * 0.5 * (0.25 + (0.10 - 0.25) * sp) * 10 ** (-10.8 / 20)  # owner 2026-11-18: music bed down ~10 dB -> 28 dB under the voice
sfx = sfx * 0.5 * 0.4 * (1 + (10 ** (-7 / 20) - 1) * sp)        # SFX bus x0.4, -7 dB under speech
mix = voice + music + sfx

# check SFX vs voice during speech
def rms(x, m): return np.sqrt(np.mean(x[m] ** 2) + 1e-12)
m = speech > 0.5
print("SFX under voice during speech: %.1f dB" % (20 * np.log10(rms(voice, m) / rms(sfx, m))))
print("music under voice during speech: %.1f dB" % (20 * np.log10(rms(voice, m) / rms(music, m))))
save("public/audio/mix_pre.wav", mix)
o = subprocess.run(["ffmpeg", "-i", "public/audio/mix_pre.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
I = float([l for l in o.splitlines() if l.strip().startswith("I:")][-1].split()[1])
g = TARGET - I
for _ in range(3):  # the limiter shaves a little loudness: nudge the static gain until the result hits the target
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "public/audio/mix_pre.wav", "-af", f"volume={g}dB,aresample=192000,alimiter=limit=0.891:level=false,aresample=48000", "-c:a", "pcm_s24le", "public/audio/mix.wav"], check=True)
    o = subprocess.run(["ffmpeg", "-i", "public/audio/mix.wav", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    got = float([l for l in o.splitlines() if l.strip().startswith("I:")][-1].split()[1])
    if abs(got - TARGET) <= 0.15: break
    g += TARGET - got
print("cues:", len(cues), "| pre", I, "LUFS, gain", round(g, 2), "dB |", [l.strip() for l in o.splitlines() if l.strip().startswith(("I:", "Peak:"))][-2:])
