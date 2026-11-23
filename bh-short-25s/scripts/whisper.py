"""Word timestamps from audio/voiceover.mp3 (faster-whisper small.en) -> audio/timestamps.json"""
import json, subprocess
import numpy as np
from faster_whisper import WhisperModel
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", "audio/voiceover.mp3", "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.float32)
m = WhisperModel("small.en", device="cpu", compute_type="int8")
segs, _ = m.transcribe(x, beam_size=5, word_timestamps=True, initial_prompt="black hole, event horizon, thruster, one burn left, escape, no return, three, two, one.")
words = [{"word": w.word.strip(), "start": round(w.start, 3), "end": round(w.end, 3)} for s in segs for w in s.words]
json.dump({"duration": round(len(x) / 16000, 3), "words": words}, open("audio/timestamps.json", "w"), indent=1)
print(len(words), "words", round(len(x) / 16000, 2), "s")
