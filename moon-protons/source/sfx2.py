"""Sound design for the hand-drawn version: pencil scribbles, soft pops, light whooshes,
a cartoon explosion and a quiet plucked music bed under the voiceover."""
import os, sys, wave
import numpy as np
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gen.py')).read())


def pencil(d, seed=0, rate=11):
    """Marker-on-whiteboard scribble: band-passed noise chopped into strokes."""
    r = np.random.default_rng(seed)
    n = int(SR * max(d, 0.08))
    x = stft_filter(noise(n), lambda t, f: np.exp(-0.5 * (np.log(np.maximum(f, 1) / 3800) / 0.55) ** 2))
    t = np.arange(n) / SR
    strokes = np.zeros(n)
    p = 0.0
    while p < d:
        L = r.uniform(0.05, 0.13)
        i0, i1 = int(p * SR), min(n, int((p + L) * SR))
        if i1 > i0:
            strokes[i0:i1] = np.sin(np.linspace(0, np.pi, i1 - i0)) * r.uniform(0.5, 1)
        p += L + r.uniform(0.0, 1 / rate)
    grain = 0.7 + 0.3 * np.abs(noise(n))
    return nrm(x * strokes * grain) * np.minimum(1, (d + 0.05 - t) / 0.05).clip(0, 1)


def soft_pop(f=520, d=0.12):
    t = T(d)
    ph = 2 * np.pi * np.cumsum(f * (0.6 + 0.8 * np.exp(-t * 50))) / SR
    return np.sin(ph) * np.exp(-t * 32) * (1 - np.exp(-t * 900))


def bonk(f=180, d=0.35):
    t = T(d)
    ph = 2 * np.pi * np.cumsum(f * (1 + 0.6 * np.exp(-t * 30))) / SR
    body = np.sin(ph) * np.exp(-t * 14) + 0.4 * np.sin(2.7 * ph) * np.exp(-t * 25)
    return nrm(body + 0.3 * lowpass(noise(len(t)), 2500) * np.exp(-t * 60))


def swish(d=0.3, f0=900, f1=4500):
    return whoosh(d, f0, f1)


def cartoon_boom(d=3.0):
    t = T(d)
    ph = 2 * np.pi * np.cumsum(30 + 90 * np.exp(-t * 4)) / SR
    sub = np.sin(ph) * np.exp(-t * 1.8)
    body = stft_filter(noise(len(t)), lambda tt, f: 1 / (1 + (f / (250 + 4000 * np.exp(-max(tt, 0) * 3))) ** 3)) * np.exp(-t * 2.0)
    deb = crackles(d, 70, 21) * np.exp(-t * 1.4) * 0.35
    return nrm(sub + body * 1.2 + deb + noise(len(t)) * np.exp(-t * 80) * 0.6)


def wl(s, cps=26):
    return max(0.12, len(s) / cps)


P = []  # (time, sound, gain, pan)
add = lambda t0, x, g=1.0, pan=0.0: P.append((t0, x, g, pan))
pc = 0


def write(t0, s, cps=26, g=0.16, pan=0.0):
    global pc
    pc += 1
    add(t0, pencil(wl(s, cps), pc), g, pan)


def draw(t0, d, g=0.14, pan=0.0):
    global pc
    pc += 1
    add(t0, pencil(d, pc, 6), g, pan)


r = np.random.default_rng(3)
# 1
add(0.1, soft_pop(380, 0.18), 0.55); add(0.1, bonk(110, 0.4), 0.25)
add(0.25, swish(0.25, 700, 2500), 0.12, -0.7)
write(0.3, 'THE MOON', pan=-0.3)
draw(1.56, 0.32, pan=0.0); write(1.6, 'REBUILD', pan=0.0)
draw(1.75, 0.65, pan=0.4)
for i in range(0, 118, 3):
    add(2.3 + 1.85 * i / 118, soft_pop(r.uniform(600, 1100), 0.08), 0.18, 0.4)
write(3.34, 'PURE PROTONS', 30, pan=0.4)
add(3.4, soft_pop(800), 0.3, 0.7); write(3.5, '= PROTON', pan=0.7)
draw(3.85, 0.3, pan=0.4)
# 2
add(4.4, swish(0.22, 1200, 4000), 0.15)
add(4.42, soft_pop(360, 0.18), 0.5, -0.1)
write(4.49, 'RIGHT NOW:', 30); write(4.5, 'ROCK', 20, pan=0.2); draw(4.5, 0.25, pan=0.2)
draw(5.66, 0.25, pan=0.0); draw(5.75, 0.2, pan=0.2)
add(5.85, soft_pop(450, 0.16), 0.45, 0.5); add(5.88, sparkle(0.6, 6, 2), 0.06, 0.5)
write(5.95, 'ATOMS', 20, pan=0.5)
# 3
write(6.84, 'EACH ATOM:')
add(6.88, soft_pop(420, 0.16), 0.5)
write(7.81, 'PROTONS', 24, pan=-0.6); draw(7.85, 0.25, pan=-0.4); write(8.3, '(IN THE MIDDLE)', 30, pan=-0.6)
draw(9.04, 0.5, 0.12)
for k in range(3):
    add(9.2 + k * 0.05, soft_pop(900 + 120 * k, 0.08), 0.25, -0.4 + 0.4 * k)
    add(9.25 + k * 0.07, zip_up(0.18, 700 + k * 200, 2400 + k * 300), 0.05, -0.4 + 0.4 * k)
write(9.04, 'ELECTRONS', 24, pan=0.6); draw(9.3, 0.25, pan=0.5); write(9.5, '(AROUND THEM)', 30, pan=0.6)
# 4
add(10.52, soft_pop(300, 0.22), 0.6, -0.5); add(10.52, bonk(140, 0.3), 0.2, -0.5)
write(10.52, 'PROTONS ARE', pan=-0.5); write(10.9, 'POSITIVE (+)', 22, pan=-0.5)
add(11.82, soft_pop(260, 0.22), 0.6, 0.5); add(11.82, bonk(120, 0.3), 0.2, 0.5)
write(11.82, 'ELECTRONS ARE', pan=0.5); write(12.2, 'NEGATIVE (-)', 22, pan=0.5)
add(13.0, swish(0.32, 500, 3000), 0.25)
add(13.32, bonk(150, 0.45), 0.6); add(13.32, impact(0.6, 90, 45), 0.25)
write(13.38, '+1  -1  =  0', 22); write(13.6, 'THEY CANCEL OUT', 30); draw(13.9, 0.3, 0.16, 0.2)
# 5
add(14.32, soft_pop(420, 0.16), 0.5, -0.2); write(14.34, 'NOW...', 14, pan=-0.7)
for k in range(3):
    add(15.17 + k * 0.04, swish(0.35, 1500, 5000), 0.18, [-0.8, 0.2, 0.8][k])
write(15.17, 'TAKE AWAY:', 30, pan=0.6); write(15.1, 'ELECTRONS', 34, pan=0.6)
add(15.35, pencil(0.3, 501, 20), 0.28, 0.6)
add(15.97, swish(0.4, 800, 3500), 0.22, -0.3); write(15.87, 'NEUTRONS', 34, pan=0.6)
add(16.12, pencil(0.3, 502, 20), 0.28, 0.6)
write(16.2, 'EVERYTHING ELSE', 34, pan=0.6); add(16.45, pencil(0.3, 503, 20), 0.28, 0.6)
add(17.05, swish(0.4, 400, 2000), 0.15)
write(17.13, 'JUST THE PROTONS', 30); draw(17.75, 0.3, 0.16)
# 6
for i in range(10):
    add(18.6 + i * 0.04, soft_pop(r.uniform(650, 1000), 0.09), 0.25, r.uniform(-0.5, 0.5))
write(18.65, 'NOTHING CANCELS', 28); write(18.9, 'NET CHARGE:')
for i in range(10):
    add(19.3 + i * 0.06, tick(1800 + i * 80, 0.025), 0.12, 0.3)
draw(20.37, 1.6, 0.1); write(20.37, 'EVERY PROTON PUSHES', 28)
add(20.6, buzz(2.4), 0.07)
write(21.97, 'ON EVERY OTHER ONE', 28)
# 7
add(23.32, soft_pop(500, 0.14), 0.45, -0.2); add(23.45, soft_pop(540, 0.14), 0.45, 0.2)
write(23.32, 'TWO PROTONS')
add(24.78, swish(0.45, 300, 2200), 0.3, -0.6); add(24.78, swish(0.45, 300, 2200), 0.3, 0.6)
write(24.85, 'ELECTRIC PUSH')
draw(25.5, 0.2, 0.1, 0.3); add(25.52, soft_pop(1500, 0.05), 0.15, 0.3)
write(25.55, 'GRAVITY', pan=0.3); write(25.85, '(TINY!)', pan=0.3)
add(26.3, swish(0.3, 600, 3500), 0.15)
write(26.45, 'STRONGER BY:')
for i in range(36):
    add(27.0 + i * (1.7 / 35), tick(1400 + i * 40, 0.03), 0.16, np.sin(i * 0.7) * 0.4)
add(28.9, soft_pop(300, 0.25), 0.6); add(28.9, bonk(100, 0.5), 0.3); add(28.93, sparkle(0.9, 10, 7), 0.08)
write(29.0, 'TIMES STRONGER THAN GRAVITY', 45); draw(29.05, 0.35, 0.16)
# 8
add(29.55, soft_pop(340, 0.18), 0.5, 0.3); write(29.73, 'PROTON MOON', pan=0.3)
add(30.4, rumble(1.75), 0.35, 0.3)
write(30.55, "COULDN'T HOLD TOGETHER", 30, pan=0.3)
add(30.6, crackles(1.4, 26, 31), 0.2, 0.3)
write(30.95, 'HMM...', 14, pan=-0.6)
add(31.25, swish(0.25, 1000, 3000), 0.12, -0.6)
add(31.0, riser(1.1, 200, 4000), 0.18, 0.3)
# 9
add(32.08, cartoon_boom(3.2), 1.0, 0.2)
add(32.15, swish(0.5, 300, 2500), 0.25, -0.8)
for i in range(6):
    add(32.6 + i * 0.22, bonk(r.uniform(200, 420), 0.25), 0.12, r.uniform(-0.8, 0.8))
add(34.5, swish(0.35, 800, 3000), 0.15)
write(34.7, 'WHAT IF THE MOON', 30); write(35.2, 'WERE MADE OF PROTONS?', 34)
for i in range(5):
    add(35.7 + i * 0.07, soft_pop(700 + i * 90, 0.09), 0.25, -0.5 + i * 0.25)

for t0, x, g, pan in P:
    i = int(t0 * SR)
    x = x[:N - i] * g
    l, rr = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    bus[i:i + len(x), 0] += x * l * 1.414
    bus[i:i + len(x), 1] += x * rr * 1.414

# small room so the effects sit together
def room(x, d=0.6, wet=0.12):
    n = int(SR * d)
    out = x.copy()
    for ch in range(2):
        ir = noise(n) * np.exp(-np.linspace(0, 8, n))
        ir /= np.sqrt(np.sum(ir ** 2))
        L = len(x) + n
        nf = 1 << (L - 1).bit_length()
        out[:, ch] += wet * np.fft.irfft(np.fft.rfft(x[:, ch], nf) * np.fft.rfft(ir, nf), nf)[:len(x)]
    return out
bus = room(bus)

# ---------------- light plucked music bed ----------------
bpm = 104
beat = 60 / bpm
notes = {'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'G4': 392.0, 'A4': 440.0, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25,
         'C3': 130.81, 'A2': 110.0, 'F2': 87.31, 'G2': 98.0}
melody = ['E4', 'G4', 'A4', 'G4', 'C5', 'A4', 'G4', 'E4', 'D4', 'E4', 'G4', 'E4', 'D4', 'C4', 'D4', 'G4']
bass = ['C3', 'A2', 'F2', 'G2']


def pluck(f, d=0.5):
    t = T(d)
    return (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t * 30)) * np.exp(-t * 7) * (1 - np.exp(-t * 600))


music = np.zeros(N)
nb = int(DUR / (beat / 2))
for k in range(nb):
    t0 = k * beat / 2
    i = int(t0 * SR)
    if k % 2 == 0 or k % 8 == 3:
        x = pluck(notes[melody[(k // 1) % 16]], 0.45) * (0.55 if k % 2 else 0.8)
        music[i:i + len(x)] += x[:N - i]
    if k % 8 == 0:
        x = pluck(notes[bass[(k // 8) % 4]], 1.6) * 0.9
        music[i:i + len(x)] += x[:N - i]
t = np.arange(N) / SR
menv = np.clip(t / 0.6, 0, 1) * np.where(t < 32.0, 1, np.where(t < 34.4, 0, np.clip((t - 34.4) / 0.6, 0, 1)))
menv *= np.clip((DUR - t) / 0.8, 0, 1)
music *= menv
bed[:, 0] = music
bed[:, 1] = np.roll(music, 220)

w = wave.open(sys.argv[1])
v = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
voice = np.zeros(N)
voice[:min(N, len(v))] = v[:N]
vn = voice / np.max(np.abs(voice))
ve = np.convolve(np.abs(vn), np.ones(2205) / 2205, mode='same')
duck = 1 - 0.3 * np.clip(ve / 0.08, 0, 1)

mix = bus / np.max(np.abs(bus)) * 0.55 * duck[:, None] + bed / np.max(np.abs(bed)) * 0.08 * duck[:, None] + vn[:, None] * 0.82
mix = np.tanh(mix * 1.1) / np.tanh(1.1)
mix *= 0.97 / np.max(np.abs(mix))
wo = wave.open(sys.argv[2], 'w')
wo.setnchannels(2); wo.setsampwidth(2); wo.setframerate(SR)
wo.writeframes((mix * 32767).astype(np.int16).tobytes()); wo.close()
print('done', len(P), 'cues')
