"""Sound design for video 2 (antimatter Moon). Handwriting and pop cues are read straight
from scenes.js so they stay in sync with the drawing; the big moments are placed by hand."""
import os, re, sys, wave
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
WORK = os.path.join(HERE, '..', 'work')
exec(open(os.path.join(WORK, 'gen.py')).read())
exec(open(os.path.join(HERE, 'sfxlib.py')).read())

DUR = 121.0
N = int(SR * DUR)
bus = np.zeros((N, 2))
r = np.random.default_rng(11)
P = []
add = lambda t0, x, g=1.0, pan=0.0: P.append((t0, x, g, pan))

# ---- automatic cues from the scene code ----
src = open(os.path.join(HERE, 'scenes4.js')).read()
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
cuts = [4.1, 9.1, 12.5, 22.75, 26.85, 33.0, 41.25, 57.9, 65.55, 70.65, 86.9, 91.4, 104.0, 107.3, 111.9, 118.2]
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



def drone(d, f=55):
    t = T(d)
    x = np.sin(2*np.pi*f*t) + 0.6*np.sin(2*np.pi*f*1.5*t + 0.3*np.sin(2*np.pi*0.3*t)) + 0.3*lowpass(noise(len(t)), 300)
    return nrm(x) * np.minimum(1, t/0.4) * np.minimum(1, (d-t)/0.8)
def crickets(d, seed=5):
    rr = np.random.default_rng(seed); out = np.zeros(int(SR*d)); t0 = 0.0
    while t0 < d - 0.3:
        f = rr.uniform(4200, 4800); n = rr.integers(3, 6)
        for k in range(n):
            tt = T(0.035); s = np.sin(2*np.pi*f*tt) * np.sin(np.pi*tt/0.035)
            i = int((t0 + k*0.06)*SR); out[i:i+len(s)] += s[:len(out)-i] * rr.uniform(0.4, 1)
        t0 += rr.uniform(0.35, 0.9)
    return nrm(out) * np.minimum(1, T(d)[:len(out)]/0.6) * np.minimum(1, (d - T(d)[:len(out)])/0.6)
def slide_whistle(d=4.6, f0=500, f1=1800):
    t = T(d); f = f0*(f1/f0)**(t/d) * (1 + 0.02*np.sin(2*np.pi*6*t))
    x = np.sin(2*np.pi*np.cumsum(f)/SR) + 0.15*np.sin(4*np.pi*np.cumsum(f)/SR)
    return nrm(x) * np.minimum(1, t/0.1) * np.minimum(1, (d-t)/0.15)
def click():
    t = T(0.08); return nrm(noise(len(t))*np.exp(-t*120) + np.sin(2*np.pi*1800*t)*np.exp(-t*90))
def ticks_fast(d, rate=16):
    out = np.zeros(int(SR*d))
    for k in range(int(d*rate)):
        s = tick(2600 + (k % 3)*200, 0.02); i = int(k/rate*SR); out[i:i+len(s)] += s[:len(out)-i]
    return out
# hook: hit + drone, people vanish (pops), windows switch off (ticks)
add(0.0, impact(1.4, 110, 34), 0.8); add(0.0, drone(4.0, 49), 0.3)
for i in range(16): add(1.33 + (i % 8) * 0.04, soft_pop(r.uniform(700, 1200), 0.08), 0.18, r.uniform(-0.7, 0.7))
for i in range(12): add(2.1 + i * 0.14, tick(1800 - i * 40, 0.03), 0.16, -0.8 + i * 0.14)
add(4.14, sparkle(0.8, 8, 2), 0.12, -0.4); add(7.24, sting_down(), 0.3, 0.4)
add(11.4, ding(1320, 0.5), 0.2)
for i in range(8): add(11.6 + i * 0.5, tick(2400, 0.02), 0.07)
add(12.6, hiss(4.9, 900), 0.12, -0.4); add(16.36, sting_down(), 0.22, 0.5)
for t0 in (18.82, 19.47, 20.11):
    add(t0, click(), 0.7); add(t0 + 0.02, impact(0.5, 70, 40), 0.25)
add(20.79, swish(0.8, 3000, 400), 0.2)
add(23.67, click(), 0.4); add(23.7, sting_down(), 0.18)
add(28.4, rumble(3.9), 0.25); add(32.3, whistle_down(0.6, 600, 120), 0.18); add(32.45, click(), 0.4)
add(33.8, hiss(4.6, 2600), 0.1, 0.3); add(37.56, sparkle(0.7, 8, 3), 0.12)
add(38.6, hiss(0.9, 2600), 0.08); add(40.6, whistle_down(0.5, 700, 200), 0.18, 0.6)
add(41.3, swish(0.6, 600, 2500), 0.15); add(45.7, sparkle(1.2, 10, 4), 0.1)
add(50.7, riser(2.9, 2000, 200), 0.18); add(53.65, swish(1.0, 3000, 600), 0.25); add(54.4, crackles(1.6, 30, 6), 0.25)
add(56.0, sparkle(1.4, 14, 5), 0.14)
add(58.0, crickets(7.5), 0.06)
for i in range(4): add(66.6 + i * 0.15, click(), 0.25, -0.6 + i * 0.2)
add(70.04, impact(1.2, 80, 30), 0.45)
add(71.2, hiss(15.6, 300), 0.06); add(74.87, sparkle(0.8, 8, 7), 0.1)
for i in range(5): add(78.6 + i * 0.25, tick(1600 - i * 200, 0.04), 0.14)
add(85.97, sting_down(), 0.2)
add(88.36, bonk(120, 0.45), 0.4); add(89.58, sparkle(1.0, 10, 8), 0.12)
add(91.5, riser(4.0, 300, 3000), 0.15)
for t0 in (96.95, 99.04, 101.36):
    add(t0, ding(1320 + (t0 - 96) * 80, 0.6), 0.2); add(t0, swish(0.5, 800, 3000), 0.12)
add(106.36, impact(1.4, 90, 34), 0.35); add(106.4, sparkle(1.4, 14, 9), 0.14)
add(110.23, sparkle(1.0, 10, 10), 0.12)
add(113.3, soft_pop(500, 0.2), 0.5); add(113.32, ding(1760, 0.7), 0.22); add(114.1, soft_pop(800, 0.12), 0.3)

for t0, x, g, pan in P:
    i = int(t0 * SR)
    if i >= N:
        continue
    x = x[:N - i] * g
    l, rr = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    bus[i:i + len(x), 0] += x * l * 1.414
    bus[i:i + len(x), 1] += x * rr * 1.414

bus = room(bus)
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
menv = np.ones(N)
for a, b, lvl in [(0, 9.1, 0.0), (9.1, 12.5, 0.5), (17.5, 22.75, 0.6), (40.0, 41.25, 0.2), (65.5, 72.0, 0.3), (86.9, 91.4, 0.5), (104.0, 107.3, 0.4)]:
    m = (t >= a) & (t < b)
    menv[m] *= lvl
menv = np.convolve(menv, np.ones(8820) / 8820, mode='same')
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
