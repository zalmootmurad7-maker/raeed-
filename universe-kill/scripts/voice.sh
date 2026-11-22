#!/bin/bash
# Voice pipeline (CLAUDE.md §5): concat mp3-1..3 -> silenceremove (>0.25 s) -> atempo 1.06 -> loudnorm -16 LUFS (2-pass)
set -e
cd "$(dirname "$0")/.."
F="[0][1][2]concat=n=3:v=0:a=1,silenceremove=stop_periods=-1:stop_duration=0.25:stop_threshold=-40dB:stop_silence=0.25,atempo=1.06"
ffmpeg -v error -y -i audio/mp3-1.mp3 -i audio/mp3-2.mp3 -i audio/mp3-3.mp3 -filter_complex "$F" -ar 48000 -ac 1 -c:a pcm_s24le audio/_pre.wav
M=$(ffmpeg -i audio/_pre.wav -af loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g() { echo "$M" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -v error -y -i audio/_pre.wav -af "loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=48000" -c:a pcm_s24le audio/voiceover.wav
ffmpeg -v error -y -i audio/voiceover.wav -b:a 192k audio/voiceover.mp3
rm audio/_pre.wav
