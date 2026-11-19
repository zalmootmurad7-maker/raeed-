#!/bin/bash
# Render each Short at 1080x1920 and 3840-wide 4K (scale 2), mux with its audio.
set -e
BE=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell
mkdir -p out/shorts shorts
for id in "$@"; do
  npx remotion render src/index.ts $id out/shorts/${id}_silent.mp4 --muted --concurrency=4 --crf=18 --browser-executable=$BE --log=error
  ffmpeg -loglevel error -y -i out/shorts/${id}_silent.mp4 -i public/audio/shorts/${id}.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 320k -shortest -movflags +faststart shorts/${id}.mp4
  npx remotion render src/index.ts $id out/shorts/${id}_silent4k.mp4 --muted --concurrency=4 --crf=18 --scale=2 --browser-executable=$BE --log=error
  ffmpeg -loglevel error -y -i out/shorts/${id}_silent4k.mp4 -i public/audio/shorts/${id}.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 320k -shortest -movflags +faststart shorts/${id}_4K.mp4
  echo "done $id"
done
