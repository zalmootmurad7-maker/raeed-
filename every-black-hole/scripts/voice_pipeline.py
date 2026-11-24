"""Voice pipeline for Every Type of Black Hole.
Usage: python3 voice_pipeline.py OUT_DIR part1.mp3 [part2.mp3 ...]
1. concatenate the parts in order (0.3 s gap), level-match each part to -16 LUFS-ish by RMS
2. speed up 1.06x, pitch preserved (ffmpeg atempo=1.06)
3. trim every silence longer than 0.25 s down to 0.25 s (10 ms crossfade)
4. Whisper (faster-whisper small.en) word timestamps -> timestamps.json
Writes OUT_DIR/voiceover_src.wav, OUT_DIR/voiceover.mp3, OUT_DIR/voiceover.wav, OUT_DIR/timestamps.json
"""
import json, os, subprocess, sys
import numpy as np

SR = 44100
def load(path, sr=SR):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()
def save_wav(path, x, sr=SR):
    p = subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(sr), "-ac", "1", "-i", "-", path], input=x.astype(np.float32).tobytes(), check=True)

def rms_db(x):
    v = x[np.abs(x) > 1e-3]
    return 20 * np.log10(np.sqrt(np.mean(v ** 2)) + 1e-9) if len(v) else -99

def trim_gaps(x, sr=SR, max_gap=0.25, thr_db=-40, win=0.01):
    n = int(sr * win); frames = len(x) // n
    e = 20 * np.log10(np.sqrt(np.mean(x[: frames * n].reshape(frames, n) ** 2, axis=1)) + 1e-9)
    silent = e < thr_db
    keep = np.ones(frames, bool); i = 0; removed = 0.0
    while i < frames:
        if silent[i]:
            j = i
            while j < frames and silent[j]: j += 1
            run = (j - i) * win
            if run > max_gap:
                keep_n = int(max_gap / win); half = keep_n // 2
                keep[i + half : j - (keep_n - half)] = False; removed += run - max_gap
            i = j
        else: i += 1
    out = []; fade = int(0.01 * sr); start = None
    for k in range(frames + 1):
        if k < frames and keep[k]:
            if start is None: start = k
        elif start is not None:
            seg = x[start * n : k * n].copy()
            if len(seg) > 2 * fade:
                seg[:fade] *= np.linspace(0, 1, fade); seg[-fade:] *= np.linspace(1, 0, fade)
            out.append(seg); start = None
    return np.concatenate(out), removed

def main():
    out_dir, parts = sys.argv[1], sys.argv[2:]
    os.makedirs(out_dir, exist_ok=True)
    xs = [load(p) for p in parts]
    ref = rms_db(xs[0]); xs = [x * 10 ** ((ref - rms_db(x)) / 20) for x in xs]
    gap = np.zeros(int(0.3 * SR), np.float32)
    src = np.concatenate([np.concatenate([x, gap]) for x in xs])
    save_wav(f"{out_dir}/voiceover_src.wav", src)
    sped = f"{out_dir}/_sped.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{out_dir}/voiceover_src.wav", "-af", "atempo=1.06", sped], check=True)
    y = load(sped); os.remove(sped)
    y, removed = trim_gaps(y)
    y = y / (np.max(np.abs(y)) + 1e-9) * 0.5  # peak ~ -6 dBFS (owner mix rule)
    save_wav(f"{out_dir}/voiceover.wav", y)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{out_dir}/voiceover.wav", "-b:a", "192k", f"{out_dir}/voiceover.mp3"], check=True)
    from faster_whisper import WhisperModel
    m = WhisperModel("small.en", device="cpu", compute_type="int8")
    segs, _ = m.transcribe(load(f"{out_dir}/voiceover.wav", 16000), beam_size=5, word_timestamps=True, initial_prompt="Micro black holes, picometers, Hawking radiation, Large Hadron Collider, primordial, Cygnus X-1, Gaia BH3, LIGO, Omega Centauri, Sagittarius A-star, M87, TON 618, Phoenix A, Schwarzschild, Kerr, ergosphere, GRS 1915+105, Reissner-Nordström.")
    words = [{"word": w.word.strip(), "start": round(w.start, 3), "end": round(w.end, 3)} for s in segs for w in s.words]
    json.dump({"duration": round(len(y) / SR, 3), "words": words}, open(f"{out_dir}/timestamps.json", "w"), indent=1)
    print(f"src {len(src)/SR:.2f}s -> 1.06x + gap trim ({removed:.2f}s removed) -> {len(y)/SR:.2f}s, {len(words)} words")

if __name__ == "__main__":
    main()
