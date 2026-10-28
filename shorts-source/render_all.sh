# usage: SCRATCH=<dir with v2/ v3/ v4/ work/> bash render_all.sh [short names...]  (default: all)
# v4 = this folder's build output; work = render.js + node_modules (fonts)
: "${SCRATCH:?set SCRATCH}"
render_one(){ n=$1; V=$SCRATCH/v4; d=$(python3 -c "import json;c=json.load(open('$V/shorts.json'))['$n'];print(int(round(sum(e-s for s,e in c['segs'])*30)))"); cd $SCRATCH/work && PAGE=../v4/$n.html VW=1080 VH=1920 node render.js 0 $d 30 $V/$n.v.mp4 > $V/$n.log 2>&1; ffmpeg -v error -y -i $V/$n.v.mp4 -i $V/$n.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart $V/$n.mp4; echo "$n $(ffprobe -v error -show_entries format=duration -of csv=p=0 $V/$n.mp4)"; }
export -f render_one; export SCRATCH
if [ $# -eq 0 ]; then set -- $(python3 -c "import json;print(' '.join(json.load(open('$SCRATCH/v4/shorts.json'))))"); fi
printf "%s\n" "$@" | xargs -P 4 -I{} bash -c 'render_one {}'
