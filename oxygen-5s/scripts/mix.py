"""Final mix: voice (audio/voiceover.wav, -16 LUFS) + plucked music bed calibrated to 28 dB under the voice during speech
+ the 5 SFX from assets/sfx placed by audio/sfx_cues.json (bus x0.4, a further -7 dB under speech, >=15 dB under voice).
One static gain to -14 LUFS + limiter -1 dBFS (keeps all ratios). Output: audio/mix.wav"""
import json, subprocess
import numpy as np
SR = 48000; DUR = 203.9; N = int(DUR * SR)
rng = np.random.default_rng(7)
def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)
def save(p, x): subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f64le", "-ar", str(SR), "-ac", "1", "-i", "-", "-c:a", "pcm_s24le", p], input=x.tobytes(), check=True)
def lufs(p):
    o = subprocess.run(["ffmpeg", "-i", p, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float([l for l in o.splitlines() if l.strip().startswith("I:")][-1].split()[1])
voice = load("audio/voiceover.wav"); voice = np.concatenate([voice, np.zeros(max(0, N - len(voice)))])[:N]
ts = json.load(open("audio/timestamps.json"))
speech = np.zeros(N)
for w in ts["words"]: speech[int(max(0, w["start"] - 0.05) * SR): int((w["end"] + 0.08) * SR)] = 1
k = int(0.15 * SR); sp = np.clip(np.convolve(speech, np.ones(k) / k, mode="same"), 0, 1)
# SFX
LEVEL = {"Pop_Card": 0.6, "Whoosh_Snap": 0.75, "Whoosh_Zoom": 0.75, "Thud_Catch": 0.9, "Tick_Counter": 0.18}
lib = {n: load(f"assets/sfx/{n}.wav") for n in LEVEL}
sfx = np.zeros(N)
for name, tm in json.load(open("audio/sfx_cues.json")):
    s = lib[name] * LEVEL[name]; i = int(tm * SR)
    if 0 <= i < N: sfx[i:i + len(s)] += s[: N - i]
sfx = sfx * 0.4 * 10 ** (10 / 20) * (1 + (10 ** (-7 / 20) - 1) * sp)  # bus x0.4, +10 dB after the first listen-check (was 30 dB under: too faint)
# music bed (plucked pentatonic + low pad, 96 bpm), louder in gaps, ducked under words
def pluck(f, d=1.2):
    n = int(d * SR); p = max(2, int(SR / f)); buf = rng.uniform(-1, 1, p); out = np.zeros(n)
    for i in range(n): out[i] = buf[i % p]; buf[i % p] = 0.996 * 0.5 * (buf[i % p] + buf[(i + 1) % p])
    return out
notes = [220.0, 261.63, 293.66, 329.63, 392.0, 440.0]; cache = {}
music = np.zeros(N); beat = 60 / 96; pattern = [0, 2, 4, 2, 5, 3, 1, 3]; i = 0; tm = 0.0
while tm < DUR:
    f = notes[pattern[i % 8]] * (0.5 if (i // 16) % 2 else 1)
    if f not in cache: cache[f] = pluck(f)
    s = cache[f]; j = int(tm * SR); music[j:j + len(s)] += s[: max(0, N - j)] * (0.9 if i % 4 == 0 else 0.6); tm += beat / 2; i += 1
tt = np.arange(N) / SR
music += 0.25 * (np.sin(2 * np.pi * 110 * tt) + 0.5 * np.sin(2 * np.pi * 164.81 * tt)) * (0.6 + 0.4 * np.sin(2 * np.pi * tt / 16))
music = music / np.max(np.abs(music)) * np.minimum(1, tt / 2) * np.minimum(1, (DUR - tt) / 3)
music = music * (0.25 + (0.10 - 0.25) * sp) / 0.25           # 10% under speech vs 25% in gaps (owner's CapCut ratios)
m = speech > 0.5
def rms(x): return np.sqrt(np.mean(x[m] ** 2) + 1e-12)
music *= rms(voice) / rms(music) * 10 ** (-28 / 20)             # exactly 28 dB under the voice during speech
mix = voice + music + sfx
print("music under voice: %.1f dB | SFX under voice: %.1f dB" % (20 * np.log10(rms(voice) / rms(music)), 20 * np.log10(rms(voice) / rms(sfx))))
save("audio/_mix_pre.wav", mix)
g = -14 - lufs("audio/_mix_pre.wav")
for _ in range(4):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "audio/_mix_pre.wav", "-af", f"volume={g}dB,aresample=192000,alimiter=limit=0.891:level=false,aresample=48000", "-c:a", "pcm_s24le", "audio/mix.wav"], check=True)
    got = lufs("audio/mix.wav")
    if abs(got + 14) < 0.15: break
    g += -14 - got
print("final mix:", got, "LUFS")
