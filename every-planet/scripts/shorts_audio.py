"""Audio for the Shorts (v2): segments of the long video's FINAL mix in the order given in src/shorts/shorts.json
(Short 1 is hook-first), 25 ms fades at joins, impact at 0.0 s, a soft pop on every beat cut, whoosh on every Snap Zoom,
stamp/boom cues from the beat sheet. SFX stay well under the voice. Then -14 LUFS + limiter -1 dBFS."""
import json, os, subprocess, sys
import numpy as np
SR = 48000
rng = np.random.default_rng(3)
def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)
def t(d): return np.arange(int(d * SR)) / SR
def lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a) * x[i] + a * s; y[i] = s
    return y
def nrm(x): return x / (np.max(np.abs(x)) + 1e-9)
def pop():
    tt = t(0.08); return nrm(np.sin(2 * np.pi * np.cumsum(480 + 500 * tt / tt[-1]) / SR) * np.exp(-tt * 40))
def whoosh():
    n = int(0.28 * SR); k = np.linspace(0, 1, n); return nrm(lp(rng.standard_normal(n), 1400) * np.sin(np.pi * k) ** 1.5)
def stamp():
    tt = t(0.22); return nrm(0.9 * lp(rng.standard_normal(len(tt)), 1600) * np.exp(-tt * 45) + np.sin(2 * np.pi * 150 * tt) * np.exp(-tt * 26))
def boom():
    tt = t(1.3); return nrm(np.sin(2 * np.pi * (52 - 18 * tt) * tt) * np.exp(-tt * 3) + 0.7 * lp(rng.standard_normal(len(tt)), 450) * np.exp(-tt * 5))
def impact():
    tt = t(0.9); return nrm(np.sin(2 * np.pi * (58 - 22 * tt) * tt) * np.exp(-tt * 5) + 0.35 * rng.standard_normal(len(tt)) * np.exp(-tt * 30))
LIB = {"pop": (pop, 0.07), "whoosh": (whoosh, 0.06), "stamp": (stamp, 0.11), "boom": (boom, 0.22), "impact": (impact, 0.4)}
mix = load("public/audio/mix.wav")
os.makedirs("public/audio/shorts", exist_ok=True)
for c in json.load(open("src/shorts/shorts.json")):
    if len(sys.argv) > 1 and c["id"] not in sys.argv[1:]: continue
    def loc(src):
        acc = 0
        for a, b in c["segs"]:
            if a - 1e-6 <= src <= b + 1e-6: return acc + src - a
            acc += b - a
    parts = []
    for a, b in c["segs"]:
        x = mix[int(a * SR): int(b * SR)].copy(); n = int(0.025 * SR)
        x[:n] *= np.linspace(0, 1, n); x[-n:] *= np.linspace(1, 0, n); parts.append(x)
    y = np.concatenate(parts + [np.zeros(int(c["tail"] * SR))])
    cues = [("impact", 0.0)]
    for i, b in enumerate(c["beats"]):
        if i: cues.append(("pop", loc(b["src"])))
        for k in ("snap", "snap2"):
            if k in b: cues.append(("whoosh", max(0, loc(b[k]) - 0.12)))
        for name, src in b.get("sfx", []): cues.append((name, loc(src)))
    for name, tm in cues:
        fn, lvl = LIB[name]; s = fn() * lvl; i = int(tm * SR)
        y[i:i + len(s)] += s[: max(0, len(y) - i)]
    pre = f"public/audio/shorts/{c['id']}_pre.wav"; out = f"public/audio/shorts/{c['id']}.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f64le", "-ar", str(SR), "-ac", "1", "-i", "-", pre], input=y.tobytes(), check=True)
    o = subprocess.run(["ffmpeg", "-i", pre, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    I = float([l for l in o.splitlines() if l.strip().startswith("I:")][-1].split()[1]); g = -14 - I
    for _ in range(3):
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", pre, "-af", f"volume={g}dB,aresample=192000,alimiter=limit=0.891:level=false,aresample=48000", "-c:a", "pcm_s24le", out], check=True)
        o = subprocess.run(["ffmpeg", "-i", out, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
        got = float([l for l in o.splitlines() if l.strip().startswith("I:")][-1].split()[1])
        if abs(got + 14) < 0.15: break
        g += -14 - got
    os.remove(pre)
    print(c["id"], f"{len(y)/SR:.2f}s", got, "LUFS", len(cues), "cues")
