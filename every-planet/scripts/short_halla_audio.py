"""Audio for 'ShortHalla-Vaporized': voice (atempo 1.08, gaps <= 0.18 s) + a low tension bed 26 dB under the voice
(drone + heartbeat pulse + dissonant shimmer that rises through the engulfment and drops out on the twist) + punchy SFX:
Thud_Catch (hook word "vaporized", BROKE PHYSICS stamp), Whoosh_Snap (camera moves), Pop_Card (astronaut / headline pops),
a rising rumble under the swell. SFX bus x0.4 and a further -7 dB under speech. Static gain to -14 LUFS + limiter -1 dBFS."""
import json, subprocess
import numpy as np
SR = 48000; DUR = 19.0; N = int(DUR * SR)
rng = np.random.default_rng(5)
def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)
def save(p, x): subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f64le", "-ar", str(SR), "-ac", "1", "-i", "-", "-c:a", "pcm_s24le", p], input=x.tobytes(), check=True)
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
    tt = t(0.09); f = 520 + 600 * tt / tt[-1]; y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 38); y[:60] += rng.standard_normal(60) * 0.4
    return norm(y, 0.7)
def thud_catch():
    tt = t(0.55); y = np.sin(2 * np.pi * (68 - 25 * tt) * tt) * np.exp(-tt * 8) + 0.3 * lp(rng.standard_normal(len(tt)), 300) * np.exp(-tt * 18)
    s = t(0.25); y[: len(s)] += 0.6 * (0.9 * lp(rng.standard_normal(len(s)), 1800) * np.exp(-s * 45) + np.sin(2 * np.pi * 160 * s) * np.exp(-s * 28))
    return norm(y, 1.0)
def impact():
    tt = t(1.0); return norm(np.sin(2 * np.pi * (56 - 22 * tt) * tt) * np.exp(-tt * 4.5) + 0.4 * lp(rng.standard_normal(len(tt)), 600) * np.exp(-tt * 18), 1.0)
def rumble(d):
    tt = t(d); k = (tt / d) ** 1.6 * np.minimum(1, (d - tt) / 0.3); return norm(lp(rng.standard_normal(len(tt)), 140) * k, 0.9)
LIB = {"pop": (pop_card, 0.6), "whoosh": (whoosh_snap, 0.75), "thud": (thud_catch, 1.0), "impact": (impact, 1.0)}
CUES = [("impact", 0.0), ("thud", 1.30), ("whoosh", 2.40), ("pop", 3.40), ("whoosh", 4.05), ("pop", 4.30), ("whoosh", 5.85),
        ("pop", 9.20), ("whoosh", 10.50), ("thud", 11.44), ("pop", 12.10), ("pop", 13.30), ("whoosh", 15.25), ("pop", 15.32), ("pop", 16.28)]

ts = json.load(open("src/shorts/short_halla_ts.json"))
voice = load("public/audio/sh/short_halla.wav"); voice = np.concatenate([voice, np.zeros(max(0, N - len(voice)))])[:N]
voice = voice / np.max(np.abs(voice)) * 0.5
sfx = np.zeros(N)
for name, tm in CUES:
    fn, lvl = LIB[name]; s = fn() * lvl; i = int(tm * SR); sfx[i:i + len(s)] += s[: max(0, N - i)]
rb = rumble(10.5 - 5.9) * 0.7; i = int(5.9 * SR); sfx[i:i + len(rb)] += rb
speech = np.zeros(N)
for w in ts["words"]: speech[int(max(0, w["start"] - 0.05) * SR): int((w["end"] + 0.08) * SR)] = 1
k = int(0.15 * SR); spc = np.clip(np.convolve(speech, np.ones(k) / k, mode="same"), 0, 1)
# tension bed
tt = np.arange(N) / SR
rise = np.interp(tt, [0, 5.9, 10.5, 10.55, 11.2, 19], [0.45, 0.6, 1.0, 0.15, 0.55, 0.6])          # builds to the swell, drops on the twist
drone = (np.sin(2 * np.pi * 55 * tt) + 0.6 * np.sin(2 * np.pi * 82.41 * tt) + 0.3 * np.sin(2 * np.pi * 110 * tt + 0.3 * np.sin(2 * np.pi * 0.2 * tt))) * (0.75 + 0.25 * np.sin(2 * np.pi * 0.5 * tt))
beat = 60 / 100; hb = np.zeros(N)
for b in np.arange(0, DUR, beat):
    for off, a in ((0, 1.0), (0.18, 0.6)):
        s = t(0.25); y = np.sin(2 * np.pi * 50 * s) * np.exp(-s * 18) * a; j = int((b + off) * SR); hb[j:j + len(y)] += y[: max(0, N - j)]
shimmer = (np.sin(2 * np.pi * 440 * tt) + np.sin(2 * np.pi * 466.16 * tt)) * 0.12 * np.clip((tt - 4) / 6, 0, 1) * (tt < 10.55)
music = norm(drone) * 0.7 + norm(hb) * 0.6 + shimmer
music = norm(music) * rise * np.minimum(1, tt / 0.6) * np.minimum(1, (DUR - tt) / 1.2)
def rms(x, m): return np.sqrt(np.mean(x[m] ** 2) + 1e-12)
m = speech > 0.5
# scale the bed so it sits 26 dB under the voice during speech (ducked a little more under words)
music = music * (1 - 0.35 * spc)
music *= rms(voice, m) / rms(music, m) * 10 ** (-26 / 20)
sfx = sfx * 0.5 * 0.4 * (1 + (10 ** (-7 / 20) - 1) * spc)
mix = voice + music + sfx
print("music under voice: %.1f dB | SFX under voice: %.1f dB" % (20 * np.log10(rms(voice, m) / rms(music, m)), 20 * np.log10(rms(voice, m) / rms(sfx, m))))
pre = "public/audio/sh/mix_pre.wav"; out = "public/audio/sh/short_halla_mix.wav"; save(pre, mix)
def lufs(p):
    o = subprocess.run(["ffmpeg", "-i", p, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float([l for l in o.splitlines() if l.strip().startswith("I:")][-1].split()[1])
g = -14 - lufs(pre)
for _ in range(3):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", pre, "-af", f"volume={g}dB,aresample=192000,alimiter=limit=0.891:level=false,aresample=48000", "-c:a", "pcm_s24le", out], check=True)
    got = lufs(out)
    if abs(got + 14) < 0.15: break
    g += -14 - got
print("mix", round(got, 1), "LUFS,", len(CUES) + 1, "SFX cues")
