import numpy as np, wave, sys
SR = 44100
DUR = 36.5
rs = np.random.default_rng(7)
N = int(SR * DUR)
bus = np.zeros((N, 2))
bed = np.zeros((N, 2))


def T(d):
    return np.arange(int(SR * d)) / SR


def noise(n):
    return rs.standard_normal(n)


def stft_filter(x, gain_fn, nfft=1024, hop=256):
    """Time-varying spectral filter. gain_fn(t_center, freqs) -> gains."""
    win = np.hanning(nfft)
    pad = np.concatenate([np.zeros(nfft), x, np.zeros(nfft)])
    out = np.zeros_like(pad)
    norm = np.zeros_like(pad)
    freqs = np.fft.rfftfreq(nfft, 1 / SR)
    for s in range(0, len(pad) - nfft, hop):
        seg = pad[s:s + nfft] * win
        tc = (s + nfft / 2 - nfft) / SR
        sp = np.fft.rfft(seg) * gain_fn(tc, freqs)
        out[s:s + nfft] += np.fft.irfft(sp) * win
        norm[s:s + nfft] += win ** 2
    out /= np.maximum(norm, 1e-3)
    return out[nfft:nfft + len(x)]


def lowpass(x, fc):
    return stft_filter(x, lambda t, f: 1 / (1 + (f / fc) ** 4))


def bandsweep(d, f0, f1, q=0.6, shape=None):
    def g(t, f):
        k = np.clip(t / d, 0, 1)
        fc = f0 * (f1 / f0) ** (shape(k) if shape else k)
        return np.exp(-0.5 * (np.log(np.maximum(f, 1) / fc) / q) ** 2)
    return stft_filter(noise(int(SR * d)), g)


def env_ad(n, a, d_curve=4.0):
    t = np.linspace(0, 1, n)
    na = max(1, int(n * a))
    e = np.ones(n)
    e[:na] = np.linspace(0, 1, na)
    e[na:] = np.exp(-d_curve * np.linspace(0, 1, n - na))
    return e


def nrm(x):
    return x / (np.max(np.abs(x)) + 1e-9)


# ---------------- sound generators ----------------
def whoosh(d=0.7, f0=300, f1=3500, rev=False):
    x = bandsweep(d, f0, f1, 0.55, lambda k: np.sin(k * np.pi / 2))
    t = np.linspace(0, 1, len(x))
    e = np.sin(np.pi * t) ** 1.5 if not rev else t ** 2.5 * (1 - np.clip((t - 0.92) / 0.08, 0, 1))
    return nrm(x * e)


def impact(d=1.2, f0=110, f1=38, punch=1.0):
    t = T(d)
    ph = 2 * np.pi * np.cumsum(f1 + (f0 - f1) * np.exp(-t * 9)) / SR
    sub = np.sin(ph) * np.exp(-t * 3.2)
    nb = lowpass(noise(len(t)), 900) * np.exp(-t * 14) * 0.9
    click = noise(len(t)) * np.exp(-t * 300) * 0.5
    return nrm(sub + nb * punch + click)


def stamp(d=0.45, f=140):
    t = T(d)
    body = np.sin(2 * np.pi * np.cumsum(f * (1 + 1.5 * np.exp(-t * 40))) / SR) * np.exp(-t * 11)
    snap = stft_filter(noise(len(t)), lambda tt, fr: np.exp(-0.5 * (np.log(np.maximum(fr, 1) / 2500) / 0.8) ** 2)) * np.exp(-t * 35)
    return nrm(body + 0.8 * snap)


def pop(f=700, d=0.09):
    t = T(d)
    ph = 2 * np.pi * np.cumsum(f * (0.45 + 0.55 * np.exp(-t * 60))) / SR
    return np.sin(ph) * np.exp(-t * 45) * (1 - np.exp(-t * 2000))


def tick(f=2600, d=0.035):
    t = T(d)
    return (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * f * 2.01 * t)) * np.exp(-t * 140)


def blip(f=1200, d=0.12):
    t = T(d)
    sq = np.sign(np.sin(2 * np.pi * f * t)) * 0.35 + np.sin(2 * np.pi * f * t)
    return lowpass(sq, 5000) * np.exp(-t * 30) * (1 - np.exp(-t * 3000))


def zap(d=0.35, f0=2400, f1=120):
    t = T(d)
    f = f1 + (f0 - f1) * np.exp(-t * 14)
    ph = 2 * np.pi * np.cumsum(f * (1 + 0.3 * np.sin(2 * np.pi * 55 * t))) / SR
    saw = 2 * ((ph / (2 * np.pi)) % 1) - 1
    x = saw * np.exp(-t * 9) + 0.4 * noise(len(t)) * np.exp(-t * 25)
    x = np.round(x * 10) / 10  # bitcrush grit
    return nrm(lowpass(x, 7000))


def zip_up(d=0.22, f0=500, f1=3200):
    t = T(d)
    f = f0 * (f1 / f0) ** (t / d)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2


def riser(d=1.2, f0=250, f1=5000):
    x = bandsweep(d, f0, f1, 0.5)
    t = T(d)[:len(x)]
    tone = np.sin(2 * np.pi * np.cumsum(120 * (8 ** (t / d))) / SR) * 0.35
    return nrm((x + tone) * (t / d) ** 2.2)


def sparkle(d=1.0, n=14, seed=0):
    r = np.random.default_rng(seed)
    out = np.zeros(int(SR * d))
    for i in range(n):
        st = int(r.uniform(0, 0.5) * SR)
        f = r.uniform(2500, 7000)
        tt = T(r.uniform(0.15, 0.4))
        s = np.sin(2 * np.pi * f * tt) * np.exp(-tt * 18) * r.uniform(0.3, 1)
        e = min(len(out), st + len(s))
        out[st:e] += s[:e - st]
    return nrm(out)


def glitch(d=0.5, seed=1):
    r = np.random.default_rng(seed)
    out = np.zeros(int(SR * d))
    p = 0
    while p < len(out):
        L = int(r.uniform(0.01, 0.05) * SR)
        kind = r.integers(3)
        tt = np.arange(L) / SR
        if kind == 0:
            s = np.sign(np.sin(2 * np.pi * r.uniform(200, 2000) * tt))
        elif kind == 1:
            s = np.repeat(r.uniform(-1, 1, L // 40 + 1), 40)[:L]
        else:
            s = np.zeros(L)
        out[p:p + L] = s[:len(out) - p] * r.uniform(0.3, 1)
        p += L
    return lowpass(out, 6000) * np.linspace(1, 0.3, len(out))


def buzz(d=1.8):
    t = T(d)
    ph = 2 * np.pi * 70 * t + 0.5 * np.sin(2 * np.pi * 3 * t)
    saw = sum(np.sin(k * ph) / k for k in range(1, 18))
    crack = np.zeros(len(t))
    idx = rs.integers(0, len(t), 160)
    for i in idx:
        L = min(400, len(t) - i)
        crack[i:i + L] += noise(L) * np.exp(-np.arange(L) / 60)
    e = np.minimum(1, t / 0.2) * np.minimum(1, (d - t) / 0.3)
    return nrm(lowpass(saw * 0.5 + crack * 0.6, 6000) * e * (0.7 + 0.3 * np.sin(2 * np.pi * 9 * t)))


def rumble(d=2.6):
    t = T(d)
    x = lowpass(noise(len(t)), 140) * 3
    shake = 0.6 + 0.4 * np.sin(2 * np.pi * (6 + 10 * t / d) * t)
    sub = np.sin(2 * np.pi * 42 * t) * 0.5
    return nrm((x * shake + sub) * (t / d) ** 1.4)


def crackles(d=1.4, n=40, seed=3):
    r = np.random.default_rng(seed)
    out = np.zeros(int(SR * d))
    for _ in range(n):
        i = int(r.uniform(0, d - 0.1) * SR)
        L = int(r.uniform(0.01, 0.06) * SR)
        out[i:i + L] += noise(L) * np.exp(-np.arange(L) / (L / 4)) * r.uniform(0.3, 1)
    return nrm(stft_filter(out, lambda t, f: np.exp(-0.5 * (np.log(np.maximum(f, 1) / 3000) / 0.9) ** 2)))


def explosion(d=4.2):
    t = T(d)
    ph = 2 * np.pi * np.cumsum(24 + 70 * np.exp(-t * 3)) / SR
    sub = np.sin(ph) * np.exp(-t * 1.1)
    body = stft_filter(noise(len(t)), lambda tt, f: 1 / (1 + (f / (180 + 5000 * np.exp(-max(tt, 0) * 2.5))) ** 3)) * np.exp(-t * 1.3)
    deb = crackles(d, 120, 9) * np.exp(-t * 1.0) * 0.4
    crack = noise(len(t)) * np.exp(-t * 60)
    return nrm(sub * 1.2 + body * 1.4 + deb + crack * 0.8)


# ---------------- placement ----------------
def place(x, t0, g=1.0, pan=0.0, target=None):
    target = bus if target is None else target
    i = int(t0 * SR)
    if i >= N:
        return
    x = x[:N - i] * g
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    target[i:i + len(x), 0] += x * l * 1.414
    target[i:i + len(x), 1] += x * r * 1.414


def place_whoosh(t0, d=0.6, g=0.5, p0=-0.7, p1=0.7, f0=300, f1=3500, rev=False):
    x = whoosh(d, f0, f1, rev)
    i = int(t0 * SR)
    n = min(len(x), N - i)
    pan = np.linspace(p0, p1, n)
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    bus[i:i + n, 0] += x[:n] * l * 1.414 * g
    bus[i:i + n, 1] += x[:n] * r * 1.414 * g


# ---- scene A
place_whoosh(0.0, 0.25, 0.5, 0, 0, 600, 5000, rev=True)
place(impact(1.6, 120, 36), 0.08, 0.9)
place(sparkle(1.2, 16, 1), 0.15, 0.18)
place_whoosh(1.38, 0.5, 0.35, 0.2, -0.6)
place(glitch(0.25, 2), 1.56, 0.18)
place(blip(1500), 1.6, 0.18)
place(blip(1900), 1.72, 0.15)
place(riser(1.9, 300, 4000), 2.35, 0.22)
A_rng = np.random.default_rng(5)
for i in range(0, 230, 5):
    ta = 2.35 + 1.75 * (i / 230)
    place(pop(A_rng.uniform(500, 1200)), ta, 0.22, A_rng.uniform(-0.7, 0.7))
place(stamp(0.5, 150), 3.34, 0.7, -0.2)
place(stamp(0.5, 120), 3.5, 0.75, 0.2)
place(sparkle(1.0, 12, 4), 3.55, 0.18)
# ---- scene B
place_whoosh(4.3, 0.35, 0.45, -0.5, 0.5, 400, 4000)
place(impact(1.2, 100, 40), 4.55, 0.85)
place(stamp(0.5, 110), 4.55, 0.55)
place(riser(0.85, 200, 6000), 5.45, 0.4)
place_whoosh(5.9, 0.5, 0.4, 0.4, -0.4, 2000, 300)
place(stamp(0.4, 180), 5.85, 0.45)
place(sparkle(0.8, 10, 6), 5.9, 0.2)
# ---- scene C
place_whoosh(6.7, 0.45, 0.45, -0.3, 0.3, 500, 4500)
place(blip(1100), 6.84, 0.2)
for k in range(6):
    place(pop(650 + k * 90), 7.81 + k * 0.06, 0.32, -0.3 + k * 0.1)
place_whoosh(7.9, 0.35, 0.22, -0.8, -0.3, 800, 3000)
for k in range(3):
    place(zip_up(0.22, 600 + k * 250, 3000 + k * 400), 9.04 + k * 0.09, 0.22, -0.5 + k * 0.5)
place_whoosh(9.3, 0.35, 0.22, 0.3, 0.8, 800, 3000)
# ---- scene D
place(stamp(0.6, 120), 10.52, 0.85, -0.5)
place(impact(0.9, 140, 50), 10.52, 0.55, -0.5)
place(zap(0.4, 2000, 300), 10.56, 0.25, -0.5)
place(stamp(0.6, 100), 11.82, 0.85, 0.5)
place(impact(0.9, 120, 45), 11.82, 0.55, 0.5)
place(zap(0.4, 900, 2600), 11.86, 0.25, 0.5)
place(riser(0.33, 400, 5000), 13.02, 0.5)
place(impact(1.8, 130, 32), 13.35, 1.0)
place(sparkle(1.2, 18, 8), 13.38, 0.25)
place(stamp(0.4, 200), 13.45, 0.35)
# ---- scene E
place_whoosh(14.22, 0.3, 0.4, 0.5, -0.5, 500, 4000)
place(blip(900), 14.34, 0.22)
place(zap(0.5, 3000, 150), 15.17, 0.45)
place_whoosh(15.25, 0.3, 0.25, 0.4, 0.9, 1500, 5000)
place(zap(0.5, 2200, 100), 15.97, 0.42)
place_whoosh(16.05, 0.3, 0.25, 0.4, 0.9, 1500, 5000)
place_whoosh(16.33, 0.3, 0.25, 0.4, 0.9, 1500, 5000)
place(riser(0.45, 300, 3000), 16.85, 0.3)
place(stamp(0.5, 130), 17.3, 0.8)
place(sparkle(1.0, 12, 11), 17.35, 0.22)
# ---- scene F
place(impact(0.9, 120, 50), 18.55, 0.6)
place(glitch(0.6, 3), 18.65, 0.35)
for k in range(24):
    place(tick(1400 + k * 60), 18.8 + 1.0 * (1 - (1 - k / 24) ** 3), 0.18)
place(zap(0.4, 2600, 200), 20.37, 0.3)
place(buzz(2.8), 20.37, 0.22)
place(zap(0.4, 3000, 300), 21.97, 0.3)
place(crackles(1.0, 30, 12), 21.95, 0.2)
# ---- scene G
place_whoosh(23.18, 0.45, 0.4, -0.8, 0, 300, 3000)
place_whoosh(23.18, 0.45, 0.4, 0.8, 0, 300, 3000)
place(impact(0.8, 110, 50), 23.4, 0.45)
place(stamp(0.6, 90), 24.78, 0.6)
place_whoosh(24.8, 0.5, 0.35, 0, -0.8, 400, 2500)
place_whoosh(24.8, 0.5, 0.35, 0, 0.8, 400, 2500)
place(blip(2600, 0.06), 25.5, 0.15)
place(blip(3100, 0.06), 25.58, 0.12)
place_whoosh(26.3, 0.4, 0.35, 0, 0, 500, 4000)
place(stamp(0.5, 160), 26.5, 0.7)
for i in range(36):
    place(tick(1500 + i * 55, 0.03), 27.0 + i * (1.75 / 35), 0.2, np.sin(i) * 0.4)
place(riser(0.6, 400, 6000), 28.3, 0.35)
place(impact(1.6, 120, 34), 28.9, 0.95)
place(sparkle(1.2, 18, 13), 28.95, 0.25)
# ---- scene H
place(impact(1.0, 100, 40), 29.5, 0.6)
place(rumble(2.65), 29.5, 0.7)
place(riser(2.2, 150, 7000), 29.9, 0.45)
place(stamp(0.5, 120), 29.73, 0.35)
place(stamp(0.5, 110), 30.55, 0.45)
place(crackles(1.5, 50, 14), 30.6, 0.3)
# ---- scene I
place(explosion(4.4), 32.08, 1.25)
place(sparkle(1.6, 24, 15), 32.3, 0.25)
place(stamp(0.6, 90), 32.2, 0.5)
place(stamp(0.6, 80), 32.45, 0.55)
place_whoosh(34.35, 0.6, 0.3, -0.5, 0.5, 300, 3000)
place(impact(1.4, 90, 38), 34.75, 0.45)
place(sparkle(1.4, 16, 17), 34.8, 0.18)

# ---------------- reverb on sfx ----------------
def reverb(x, d=1.6, wet=0.22):
    n = int(SR * d)
    out = x.copy()
    for ch in range(2):
        ir = noise(n) * np.exp(-np.linspace(0, 7, n))
        ir = lowpass(ir, 6000)
        ir /= np.sqrt(np.sum(ir ** 2))
        L = len(x) + n
        nf = 1 << (L - 1).bit_length()
        y = np.fft.irfft(np.fft.rfft(x[:, ch], nf) * np.fft.rfft(ir, nf), nf)[:len(x)]
        out[:, ch] += wet * y
    return out


bus = reverb(bus)

# ---------------- ambient bed ----------------
t = np.arange(N) / SR
pad = np.zeros(N)
for f, a in [(55, 0.5), (82.41, 0.35), (110, 0.3), (164.8, 0.12), (220, 0.08)]:
    pad += a * np.sin(2 * np.pi * f * t + 0.3 * np.sin(2 * np.pi * 0.13 * t))
pad *= 0.6 + 0.4 * np.sin(2 * np.pi * 0.25 * t)
pulse = np.sin(2 * np.pi * 55 * t) * (np.exp(-((t * 2) % 1) * 7))  # 120bpm soft pulse
air = lowpass(noise(N), 1200) * 0.15
bedm = pad * 0.5 + pulse * 0.25 + air
envb = np.clip(t / 0.5, 0, 1)
envb *= np.where(t < 32.1, 1, np.where(t < 33.8, 0.0, np.clip((t - 33.8) / 1.0, 0, 1) * 0.8))
envb *= np.clip((DUR - t) / 0.8, 0, 1)
bedm *= envb
bed[:, 0] = bedm
bed[:, 1] = np.roll(bedm, 300)

# ---------------- voice ----------------
w = wave.open(sys.argv[1])
v = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
voice = np.zeros(N)
voice[:min(N, len(v))] = v[:N]
vn = voice / np.max(np.abs(voice))

# duck sfx/bed lightly under voice
ve = np.convolve(np.abs(vn), np.ones(2205) / 2205, mode='same')
duck = 1 - 0.35 * np.clip(ve / 0.08, 0, 1)

sfx_peak = np.max(np.abs(bus))
mix = np.zeros((N, 2))
mix += bus / sfx_peak * 0.62 * duck[:, None]
mix += bed / np.max(np.abs(bed)) * 0.07 * duck[:, None]
mix += vn[:, None] * 0.8
# soft limiter
mix = np.tanh(mix * 1.1) / np.tanh(1.1)
mix *= 0.97 / np.max(np.abs(mix))
out = (mix * 32767).astype(np.int16)
wo = wave.open(sys.argv[2], 'w')
wo.setnchannels(2); wo.setsampwidth(2); wo.setframerate(SR)
wo.writeframes(out.tobytes()); wo.close()
# also stems
for name, arr in [('sfx_only.wav', bus / sfx_peak * 0.8 + bed / np.max(np.abs(bed)) * 0.1)]:
    a = (np.clip(arr, -1, 1) * 32767).astype(np.int16)
    wo = wave.open(name, 'w'); wo.setnchannels(2); wo.setsampwidth(2); wo.setframerate(SR); wo.writeframes(a.tobytes()); wo.close()
print('done')
