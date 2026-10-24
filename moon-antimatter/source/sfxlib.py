"""Sound design for the hand-drawn version: pencil scribbles, soft pops, light whooshes,
a cartoon explosion and a quiet plucked music bed under the voiceover."""
import os, sys, wave
import numpy as np



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

notes = {'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'G4': 392.0, 'A4': 440.0, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25,
         'C3': 130.81, 'A2': 110.0, 'F2': 87.31, 'G2': 98.0}

def pluck(f, d=0.5):
    t = T(d)
    return (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t * 30)) * np.exp(-t * 7) * (1 - np.exp(-t * 600))



