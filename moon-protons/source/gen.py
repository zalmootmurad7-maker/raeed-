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


