"""Audio for the 3 Shorts: cut from the long video's FINAL mix (public/audio/mix.wav) at the segment times in
src/shorts/shorts.json, 25 ms fades at every join, an impact at 0.0 s, short tail, then -14 LUFS + limiter -1 dBFS.
Writes public/audio/shorts/<id>.wav"""
import json, os, subprocess
import numpy as np
SR = 48000
def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)
mix = load("public/audio/mix.wav")
rng = np.random.default_rng(3)
def impact():
    t = np.arange(int(0.9 * SR)) / SR
    y = np.sin(2 * np.pi * (58 - 22 * t) * t) * np.exp(-t * 5) + 0.35 * rng.standard_normal(len(t)) * np.exp(-t * 30)
    return y / np.max(np.abs(y)) * 0.45
os.makedirs("public/audio/shorts", exist_ok=True)
for c in json.load(open("src/shorts/shorts.json")):
    parts = []
    for a, b in c["segs"]:
        x = mix[int(a * SR): int(b * SR)].copy(); n = int(0.025 * SR)
        x[:n] *= np.linspace(0, 1, n); x[-n:] *= np.linspace(1, 0, n); parts.append(x)
    y = np.concatenate(parts + [np.zeros(int(c["tail"] * SR))])
    imp = impact(); y[: len(imp)] += imp[: len(y)]
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
    print(c["id"], f"{len(y)/SR:.2f}s", got, "LUFS")
