"""Synthesize the 5 clean, subtle SFX (CLAUDE.md §5.3) -> assets/sfx/*.wav (48 kHz, 24-bit, peak -3 dBFS)."""
import subprocess
import numpy as np
SR = 48000
rng = np.random.default_rng(42)
def t(d): return np.arange(int(d * SR)) / SR
def lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a) * x[i] + a * s; y[i] = s
    return y
def hp(x, fc): return x - lp(x, fc)
def fade(x, a=0.003, r=0.02):
    n = len(x); e = np.ones(n); na, nr = int(a * SR), int(r * SR)
    e[:na] = np.linspace(0, 1, na); e[n - nr:] = np.linspace(1, 0, nr); return x * e
def norm(x, db=-3): return x / (np.max(np.abs(x)) + 1e-9) * 10 ** (db / 20)
def save(name, x):
    x = norm(fade(x))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f64le", "-ar", str(SR), "-ac", "1", "-i", "-", "-c:a", "pcm_s24le", f"assets/sfx/{name}.wav"], input=x.tobytes(), check=True)
# Pop_Card: soft rounded "bloop" (pitch rises 420->900 Hz) + a breath of felt noise; no hard click
tt = t(0.12); f = 420 + 480 * (tt / tt[-1]) ** 0.6
pop = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 32) * np.minimum(1, tt / 0.004)
pop += 0.12 * lp(rng.standard_normal(len(tt)), 2500) * np.exp(-tt * 60)
save("Pop_Card", pop)
# Thud_Catch: low body thump (75->45 Hz) + short muffled paper slap
tt = t(0.45); thud = np.sin(2 * np.pi * (75 - 30 * tt / tt[-1]) * tt) * np.exp(-tt * 10) * np.minimum(1, tt / 0.003)
thud += 0.35 * lp(rng.standard_normal(len(tt)), 900) * np.exp(-tt * 40)
save("Thud_Catch", thud)
# Whoosh_Snap: fast 0.22 s air swipe, brighter at the end, quick tail
n = int(0.22 * SR); k = np.linspace(0, 1, n); x = rng.standard_normal(n)
ws = (lp(x, 1200) + 0.6 * hp(lp(x, 5000), 1500) * k) * np.sin(np.pi * k ** 0.8) ** 1.4
save("Whoosh_Snap", ws)
# Whoosh_Zoom: longer 0.55 s rising whoosh (filter sweeps up), for camera zooms
n = int(0.55 * SR); k = np.linspace(0, 1, n); x = rng.standard_normal(n); y = np.zeros(n); s = 0.0
for i in range(n):
    fc = 300 + 3200 * k[i] ** 1.5; a = np.exp(-2 * np.pi * fc / SR); s = (1 - a) * x[i] + a * s; y[i] = s
wz = y * np.sin(np.pi * k) ** 1.2 + 0.15 * np.sin(2 * np.pi * np.cumsum(120 + 180 * k) / SR) * np.sin(np.pi * k)
save("Whoosh_Zoom", wz)
# Tick_Counter: soft wooden tick (owner: no sharp ticks) — low pitch, gentle 4 ms attack, low-passed
tt = t(0.06); tick = lp(np.sin(2 * np.pi * 1000 * tt) * np.minimum(1, tt / 0.004) * np.exp(-tt * 75), 2400)
save("Tick_Counter", tick)
print("ok")
