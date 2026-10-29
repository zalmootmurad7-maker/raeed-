"""Sound design for video 2 (antimatter Moon). Handwriting and pop cues are read straight
from scenes.js so they stay in sync with the drawing; the big moments are placed by hand."""
import os, re, sys, wave
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
WORK = os.path.join(HERE, '..', 'work')
exec(open(os.path.join(WORK, 'gen.py')).read())
exec(open(os.path.join(HERE, 'sfxlib.py')).read())

DUR = 155.5
N = int(SR * DUR)
bus = np.zeros((N, 2))
r = np.random.default_rng(11)
P = []
add = lambda t0, x, g=1.0, pan=0.0: P.append((t0, x, g, pan))

# ---- automatic cues from the scene code ----
src = open(os.path.join(HERE, 'scenes3.js')).read()
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
cuts = [7.2, 16.4, 22.0, 30.1, 41.8, 48.5, 51.85, 56.8, 60.8, 66.4, 75.9, 79.5, 82.8, 94.9, 100.4, 116.4, 120.3, 135.9, 147.0, 150.1, 153.6]
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
# hook
add(0.0, impact(1.6, 110, 34), 0.9); add(0.0, drone(7.4, 49), 0.35)
add(0.16, ticks_fast(1.8, 18), 0.18)
add(2.8, riser(0.55, 3000, 200), 0.3); add(3.33, bonk(90, 0.6), 0.6); add(3.35, impact(0.9, 80, 35), 0.45)
add(3.5, soft_pop(400, 0.16), 0.35); add(5.3, swish(0.9, 2500, 400), 0.25)
# collapse
add(9.35, riser(0.7, 200, 3500), 0.35); add(10.03, impact(1.2, 90, 30), 0.7); add(10.05, swish(0.5, 3000, 500), 0.2)
add(11.6, pencil(0.3, 701, 20), 0.25); add(12.6, pencil(0.3, 702, 20), 0.25)
add(13.6, drone(3.0, 41), 0.22); add(15.37, sting_down(), 0.3)
add(18.9, sting_down(), 0.25); add(20.2, pencil(0.4, 703, 8), 0.15)
# size
add(24.95, swish(0.4, 600, 2500), 0.2)
# chaos list
add(33.7, rumble(0.9), 0.35); add(34.39, hiss(1.0, 900), 0.25); add(35.6, swish(1.4, 3000, 300), 0.22)
add(40.3, bonk(140, 0.5), 0.35)
for t0 in (46.4, 47.65): add(t0, ding(1500, 0.4), 0.12)
# tides + invisible pull
add(51.9, hiss(4.9, 700), 0.22); add(54.4, sting_down(), 0.28); add(54.45, swish(0.6, 800, 2600), 0.15)
add(57.3, buzz(0.8), 0.06)
# light
add(62.72, sparkle(0.8, 8, 4), 0.1); add(64.18, bonk(120, 0.35), 0.3); add(65.0, pencil(0.35, 704, 20), 0.22)
add(66.45, crickets(9.4), 0.07)
for t0 in (70.4, 71.6): add(t0, pencil(0.3, 705 + int(t0), 20), 0.22)
# eclipse
add(76.1, sparkle(1.0, 10, 6), 0.1); add(77.68, sting_down(), 0.25); add(77.7, pencil(0.3, 706, 20), 0.2)
# microlensing flash
add(91.35, sparkle(1.2, 14, 7), 0.16); add(91.5, ding(2000, 0.8), 0.16)
add(95.9, sting_down(), 0.22)
# trip
add(99.6, rocket(8.3), 0.25); add(100.5, swish(0.8, 400, 2000), 0.25)
add(104.95, ding(1320), 0.15)
add(105.7, riser(2.2, 150, 2500), 0.3)
add(108.1, bonk(100, 0.5), 0.3)
add(111.25, slide_whistle(4.6), 0.2)
add(118.77, bonk(220, 0.4), 0.3); add(119.0, sparkle(0.9, 10, 8), 0.12)
# Hawking
add(122.4, buzz(7.6), 0.04); add(130.24, swish(0.8, 3000, 400), 0.15); add(132.6, bonk(110, 0.4), 0.28)
# review / switch off
add(145.96, click(), 0.5); add(146.0, impact(0.8, 70, 35), 0.3); add(146.05, drone(3.0, 41), 0.15)
# like
add(151.85, soft_pop(500, 0.2), 0.5); add(151.87, ding(1760, 0.7), 0.22); add(151.9, sparkle(1.0, 12, 9), 0.15)

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
for a, b, lvl in [(0, 7.2, 0.0), (7.2, 16.4, 0.6), (37.8, 41.8, 0.1), (54.3, 60.8, 0.5), (66.4, 75.9, 0.55), (105.6, 116.4, 0.35), (145.9, 150.1, 0.45)]:
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
