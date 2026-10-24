"""Sound design for video 2 (antimatter Moon). Handwriting and pop cues are read straight
from scenes.js so they stay in sync with the drawing; the big moments are placed by hand."""
import os, re, sys, wave
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
WORK = os.path.join(HERE, '..', 'work')
exec(open(os.path.join(WORK, 'gen.py')).read())
exec(open(os.path.join(HERE, 'sfxlib.py')).read())

DUR = 147.5
N = int(SR * DUR)
bus = np.zeros((N, 2))
r = np.random.default_rng(11)
P = []
add = lambda t0, x, g=1.0, pan=0.0: P.append((t0, x, g, pan))

# ---- automatic cues from the scene code ----
src = open(os.path.join(HERE, 'scenes.js')).read()
writes = re.findall(r"writeK\(t,([\d.]+),(['\"])(.*?)\2(?:,(\d+))?\)", src)
seen = set()
for i, (t0, _, s, cps) in enumerate(writes):
    t0 = float(t0); cps = int(cps) if cps else 26
    key = (round(t0, 2), s)
    if key in seen:
        continue
    seen.add(key)
    d = max(0.12, len(s) / cps)
    add(t0, pencil(d, 1000 + i), 0.15, r.uniform(-0.3, 0.3))
pops = sorted(set(round(float(x), 2) for x in re.findall(r"pop\(t,([\d.]+)", src)))
for t0 in pops:
    add(t0, soft_pop(r.uniform(380, 720), 0.14), 0.42, r.uniform(-0.4, 0.4))
# scene cuts get a light swish
cuts = [5.45, 12.4, 19.0, 23.9, 30.15, 35.7, 41.95, 45.85, 55.3, 65.05, 81.0, 83.6, 98.15, 133.0, 140.1, 144.7]
for c in cuts:
    add(c - 0.05, swish(0.25, 1200, 4200), 0.13, r.uniform(-0.5, 0.5))


def whistle_down(d=0.65, f0=1800, f1=500):
    t = T(d)
    f = f0 * (f1 / f0) ** (t / d)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.minimum(1, t / 0.05) * np.minimum(1, (d - t) / 0.05)


def ding(f=1320, d=0.6):
    t = T(d)
    return (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 8)) * np.exp(-t * 6) * (1 - np.exp(-t * 800))


def hiss(d, f=4500):
    x = stft_filter(noise(int(SR * d)), lambda tt, fr: np.exp(-0.5 * (np.log(np.maximum(fr, 1) / f) / 0.6) ** 2))
    t = T(d)[:len(x)]
    return nrm(x) * np.minimum(1, t / 0.6) * np.minimum(1, (d - t) / 0.6)


def rocket(d):
    t = T(d)
    x = lowpass(noise(len(t)), 600) * (0.6 + 0.4 * np.sin(2 * np.pi * 13 * t))
    return nrm(x) * np.minimum(1, t / 0.8) * np.minimum(1, (d - t) / 0.1)


def sting_down():
    t = T(0.9)
    f = 220 * (0.5 ** (t / 0.9))
    return nrm(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3) + 0.4 * np.sin(2 * np.pi * np.cumsum(f * 1.5) / SR) * np.exp(-t * 4))


# ---- A: proton Moon recap
add(2.9, rumble(0.85), 0.3)
add(3.72, cartoon_boom(2.4), 0.9)
# ---- B
add(7.9, bonk(260, 0.3), 0.25, 0.4)
add(10.85, riser(0.3, 400, 3000), 0.25, 0.2)
for i in range(16):
    add(10.99 + i * 0.02, soft_pop(r.uniform(700, 1300), 0.06), 0.12, 0.3)
add(11.05, sparkle(0.9, 10, 3), 0.08, 0.3)
# ---- C mirror + evil twin
add(12.45, pencil(0.85, 40, 6), 0.14)
add(16.59, sting_down(), 0.35, 0.4)
# ---- E particles converging
add(24.2, swish(1.2, 300, 2500), 0.2)
# ---- F checks
for t0 in (33.06, 34.0, 34.95):
    add(t0, ding(1500, 0.4), 0.12)
add(33.0, swish(0.3, 800, 2500), 0.1)
# ---- G falling
add(36.4, whistle_down(), 0.12, 0.15)
add(37.05, bonk(160, 0.25), 0.25, 0.15)
add(37.9, whistle_down(), 0.12, -0.3)
add(38.55, bonk(160, 0.25), 0.25, -0.3)
add(40.03, ding(1320), 0.2, 0.6)
# ---- H tides
add(42.0, hiss(1.8, 1200), 0.12, -0.2)
# ---- I annihilation
add(45.9, sting_down(), 0.3)
add(48.2, riser(2.7, 200, 3000), 0.22)
add(50.3, pencil(0.3, 41, 20), 0.25)
add(50.97, impact(1.0, 140, 45), 0.6)
add(50.99, cartoon_boom(1.4), 0.45)
add(52.6, swish(0.4, 3000, 800), 0.15)
add(53.25, cartoon_boom(2.5), 0.85)
add(54.4, sparkle(1.0, 10, 5), 0.1)
# ---- J
add(56.42, bonk(120, 0.4), 0.35)
for i in range(3):
    add(62.93 + i * 0.3, impact(1.0, 110, 40), 0.42, -0.2 + 0.25 * i)
    add(62.93 + i * 0.3, cartoon_boom(1.2), 0.25, -0.2 + 0.25 * i)
# ---- K solar wind, sparks, gamma
add(66.9, hiss(14.1, 5000), 0.12, 0.0)
add(73.17, crackles(7.8, 90, 12), 0.18, 0.6)
add(75.85, buzz(5.1), 0.06, 0.6)
add(76.99, sparkle(1.2, 12, 9), 0.1, 0.6)
# ---- L atmosphere
for i in range(9):
    add(81.6 + i * 0.05, tick(2200 - i * 60, 0.03), 0.12, -0.8 + i * 0.2)
# ---- M rocks
for i in range(7):
    t0 = 84.2 + i * 0.55
    add(t0, swish(0.45, 600, 2200), 0.09, -0.6)
    add(t0 + 0.5, bonk(r.uniform(180, 260), 0.22), 0.2, 0.3)
add(91.0, swish(0.2, 1500, 6000), 0.3, -0.2)
add(91.14, impact(1.4, 120, 38), 0.8, 0.3)
add(91.16, cartoon_boom(2.6), 0.8, 0.3)
for i in range(30):
    add(95.11 + i * 0.1 + r.uniform(0, 0.08), soft_pop(r.uniform(900, 1600), 0.06), 0.12, r.uniform(-0.5, 0.5))
add(95.2, crackles(2.8, 60, 22), 0.15)
# ---- N lander
add(99.0, rocket(6.9), 0.28)
add(104.1, crackles(1.8, 50, 23), 0.25)
add(105.9, impact(2.0, 120, 32), 1.0)
add(105.93, cartoon_boom(3.2), 1.0)
for i in range(6):
    add(106.3 + i * 0.2, bonk(r.uniform(250, 450), 0.2), 0.12, r.uniform(-0.8, 0.8))
add(110.75, pencil(0.45, 42, 20), 0.28)
# ---- O tension
add(111.4, sting_down(), 0.3)
# ---- P the big one
add(113.46, riser(2.85, 120, 5000), 0.5, -0.4)
add(116.28, impact(3.0, 120, 26), 1.0)
add(116.3, explosion(4.4), 1.0)
add(118.76, bonk(110, 0.5), 0.35)
add(126.57, crackles(0.5, 12, 24), 0.3, 0.4)
# ---- Q sixty million times over
add(128.5, cartoon_boom(1.4), 0.6)
for i in range(26):
    t0 = 129.74 + 2.4 * (i / 26) ** 0.8
    add(t0, cartoon_boom(0.6) if i % 2 == 0 else bonk(r.uniform(100, 180), 0.3), 0.25, r.uniform(-0.8, 0.8))
for i in range(40):
    add(129.8 + i * 0.057, tick(1500 + i * 30, 0.025), 0.08)
# ---- R / S
add(135.43, cartoon_boom(0.8), 0.25, -0.2)
add(142.1, sparkle(1.0, 10, 30), 0.12, 0.3)
add(143.9, ding(1320), 0.2, 0.4)
for i in range(5):
    add(146.2 + i * 0.07, soft_pop(700 + i * 90, 0.09), 0.2, -0.5 + i * 0.25)

for t0, x, g, pan in P:
    i = int(t0 * SR)
    if i >= N:
        continue
    x = x[:N - i] * g
    l, rr = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    bus[i:i + len(x), 0] += x * l * 1.414
    bus[i:i + len(x), 1] += x * rr * 1.414
bus = room(bus)

# ---------------- music bed (two alternating phrases) ----------------
bpm = 104
beat = 60 / bpm
mel_a = ['E4', 'G4', 'A4', 'G4', 'C5', 'A4', 'G4', 'E4', 'D4', 'E4', 'G4', 'E4', 'D4', 'C4', 'D4', 'G4']
mel_b = ['A4', 'C5', 'D5', 'C5', 'A4', 'G4', 'E4', 'G4', 'A4', 'G4', 'E4', 'D4', 'E4', 'G4', 'A4', 'G4']
bass = ['C3', 'A2', 'F2', 'G2']
music = np.zeros(N)
nb = int(DUR / (beat / 2))
for k in range(nb):
    t0 = k * beat / 2
    i = int(t0 * SR)
    mel = mel_a if (k // 64) % 2 == 0 else mel_b
    if k % 2 == 0 or k % 8 == 3:
        x = pluck(notes[mel[k % 16]], 0.45) * (0.55 if k % 2 else 0.8)
        music[i:i + len(x)] += x[:N - i]
    if k % 8 == 0:
        x = pluck(notes[bass[(k // 8) % 4]], 1.6) * 0.9
        music[i:i + len(x)] += x[:N - i]
t = np.arange(N) / SR
menv = np.clip(t / 0.6, 0, 1)
for a, b, lvl in [(3.7, 5.4, 0.25), (53.2, 55.2, 0.4), (105.9, 108.0, 0.3), (111.3, 113.4, 0.15), (113.4, 116.3, 0.6), (116.3, 119.5, 0.0), (128.4, 132.3, 0.5)]:
    m = (t >= a) & (t < b)
    menv[m] *= lvl
menv = np.convolve(menv, np.ones(4410) / 4410, mode='same')
menv *= np.clip((DUR - t) / 1.0, 0, 1)
music *= menv
bed = np.zeros((N, 2))
bed[:, 0] = music
bed[:, 1] = np.roll(music, 220)

w = wave.open(sys.argv[1])
v = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
voice = np.zeros(N)
voice[:min(N, len(v))] = v[:N]
vn = voice / np.max(np.abs(voice))
ve = np.convolve(np.abs(vn), np.ones(2205) / 2205, mode='same')
duck = 1 - 0.3 * np.clip(ve / 0.08, 0, 1)
mix = bus / np.max(np.abs(bus)) * 0.55 * duck[:, None] + bed / np.max(np.abs(bed)) * 0.075 * duck[:, None] + vn[:, None] * 0.82
mix = np.tanh(mix * 1.1) / np.tanh(1.1)
mix *= 0.97 / np.max(np.abs(mix))
wo = wave.open(sys.argv[2], 'w')
wo.setnchannels(2); wo.setsampwidth(2); wo.setframerate(SR)
wo.writeframes((mix * 32767).astype(np.int16).tobytes()); wo.close()
print('done', len(P), 'cues;', len(writes), 'writes,', len(pops), 'pops')
