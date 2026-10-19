#!/usr/bin/env python3
"""Stickman montage: camera moves per clip + transitions + SFX.
Usage: python3 edit.py <clips_dir> <work_dir> <output.mp4>"""
import subprocess, sys, os

SRC, WORK, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(WORK, exist_ok=True)
W, H, FPS = 1080, 1920, 30

def run(args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)

def dur(f):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=duration", "-of", "csv=p=0", f]).decode().strip())

# ease helpers (ffmpeg expressions on t)
def p(t0, t1):        return f"min(max((t-{t0})/({t1}-{t0}),0),1)"
def out3(t0, t1):     return f"(1-pow(1-{p(t0,t1)},3))"
def inout(t0, t1):    q = p(t0, t1); return f"(3*pow({q},2)-2*pow({q},3))"
def shake(a, decay, f=41):   # decaying camera shake, pixels
    return f"{a}*sin(t*{f})*exp(-t*{decay})"

# Per-clip camera: zoom Z(t), pan dx/dy (fraction of free margin, -1..1), rotation (rad)
# Punch-in on start = zoom from big to normal with ease-out (impact hit).
CLIPS = [
  # 1 hook -> chest -> DO / PARK / DROP: impact punch + slow push-in
  dict(z=f"1.32-0.24*{out3(0,0.45)}+0.10*{inout(0.45,6)}", dx="0", dy=f"-0.25*{inout(0,6)}",
       rot=f"0.02*exp(-t*5)*sin(t*30)", sx=shake(14,6), sy=shake(10,6,37)),
  # 2 juggling buckets -> thought clouds: gentle drift and push, pull back for final pose
  dict(z=f"1.02+0.07*{inout(0,4.4)}-0.07*{inout(4.6,5.4)}", dx=f"0.15*sin(t*0.8)", dy=f"0.2*{inout(0,4.4)}",
       rot="0", sx="0", sy="0"),
  # 3 big "?" -> 24h clock -> DO bucket: hard cut punch, zoom out reveal, push in at the end
  dict(z=f"1.30-0.30*{out3(0,0.5)}+0.22*{inout(4.4,5.3)}", dx="0", dy=f"-0.4*{inout(4.4,5.3)}",
       rot=f"0.015*sin(t*1.3)", sx=shake(12,7), sy=shake(8,7,33)),
  # 4 buckets / road fork: slow push in with slight tilt sway
  dict(z=f"1.06+0.16*{inout(0,2.2)}-0.10*{inout(3.8,4.5)}+0.06*{inout(4.5,6)}", dx=f"0.35*sin(t*0.9)", dy="0",
       rot=f"0.012*sin(t*1.7)", sx="0", sy="0"),
  # 5 waving -> DO check -> messy basket: punch in, then lateral pan
  dict(z=f"1.28-0.18*{out3(0,0.45)}+0.05*{inout(0.45,6)}", dx=f"-0.8+1.6*{inout(0.4,5.6)}", dy="0",
       rot="0", sx=shake(12,7), sy=shake(9,7,29)),
  # 6 stressed character: tension push-in + nervous micro-shake
  dict(z=f"1.04+0.22*{inout(0,2.6)}-0.18*{inout(2.6,3.2)}+0.08*{inout(3.2,6.1)}", dx="0", dy=f"-0.35*{inout(0,2.6)}+0.35*{inout(2.6,3.2)}",
       rot=f"0.01*sin(t*13)*{p(0.5,2.6)}*(1-{p(2.6,2.8)})",
       sx=f"5*sin(t*47)*{p(0.5,2.6)}*(1-{p(2.6,2.8)})", sy=f"4*sin(t*53)*{p(0.5,2.6)}*(1-{p(2.6,2.8)})"),
  # 7 notebook -> stairs -> climbing: punch, follow the climb upward, final pull-back
  dict(z=f"1.30-0.20*{out3(0,0.45)}+0.08*{inout(0.45,4)}-0.12*{inout(4.6,6.2)}", dx=f"0.3*{inout(3,5)}", dy=f"0.4-0.8*{inout(2.5,5.5)}",
       rot="0", sx=shake(12,7), sy=shake(9,7,31)),
]
# transitions between clip i and i+1: (type, duration). "cut" = hard cut (next clip punches in)
TRANS = [("zoomin", 0.30), ("cut", 0), ("smoothup", 0.30), ("cut", 0), ("smoothleft", 0.30), ("cut", 0)]

# 1) render each clip with its camera move (supersampled at 2x for smooth subpixel motion)
SW, SH = 2 * W, 2 * H
for i, c in enumerate(CLIPS, 1):
    src = os.path.join(SRC, f"{i}.mp4")
    if os.path.exists(os.path.join(WORK, f"m{i}.mov")) and os.environ.get("REUSE"): continue
    z = c["z"]
    vf = (f"fps={FPS},crop=iw*0.96:ih*0.96,scale={SW}:{SH},"  # trim source frame border
          f"scale=w='2*trunc({SW}*({z})/2)':h='2*trunc({SH}*({z})/2)':eval=frame:flags=bicubic,"
          f"crop={SW}:{SH}:x='(iw-{SW})/2*(1+({c['dx']}))+2*({c['sx']})':y='(ih-{SH})/2*(1+({c['dy']}))+2*({c['sy']})',"
          f"scale={W}:{H}:flags=lanczos,"
          f"rotate=a='{c['rot']}':c=white:ow={W}:oh={H},"
          f"eq=contrast=1.04:saturation=1.12,unsharp=5:5:0.4,format=yuv420p")
    run(["-i", src, "-vf", vf, "-af", "aresample=48000",
         "-c:v", "libx264", "-preset", "medium", "-crf", "14", "-c:a", "pcm_s16le",
         os.path.join(WORK, f"m{i}.mov")])
    print("clip", i, "done", flush=True)

# 2) SFX
whoosh = os.path.join(WORK, "whoosh.wav"); hit = os.path.join(WORK, "hit.wav")
run(["-f", "lavfi", "-i", "anoisesrc=d=0.6:c=pink:r=48000:a=0.9",
     "-af", "highpass=f=300,lowpass=f=4500,bandpass=f=1400:w=1800,afade=t=in:d=0.35:curve=exp,afade=t=out:st=0.35:d=0.25,volume=2.2",
     whoosh])
run(["-f", "lavfi", "-i", "sine=f=55:d=0.5:r=48000", "-f", "lavfi", "-i", "anoisesrc=d=0.08:c=white:r=48000:a=0.6",
     "-filter_complex", "[0]volume='exp(-t*9)':eval=frame,volume=1.6[b];[1]lowpass=f=2500,afade=t=out:d=0.08[c];[b][c]amix=2:normalize=0",
     hit])

# 3) assemble timeline
# timeline from the rendered video durations (hard cut = 1-frame xfade)
vdurs = [dur(os.path.join(WORK, f"m{i+1}.mov")) for i in range(7)]
inputs, fc, starts = [], [], [0.0]
for i in range(7):
    inputs += ["-i", os.path.join(WORK, f"m{i+1}.mov")]
v = "[0:v]"; acc = vdurs[0]
for i in range(6):
    typ, d = TRANS[i]
    if typ == "cut":
        typ, d = "fade", 1 / FPS
    off = acc - d - 1 / FPS  # keep one spare frame of A so xfade never hits EOF mid-transition
    fc.append(f"{v}[{i+1}:v]xfade=transition={typ}:duration={d:.4f}:offset={off:.4f}[v{i+1}]")
    v = f"[v{i+1}]"
    starts.append(off)
    acc = off + vdurs[i + 1]
total = acc

# voice tracks positioned on timeline
amix = []
for i in range(7):
    ms = int(starts[i] * 1000)
    fc.append(f"[{i}:a]atrim=0:{vdurs[i]+0.01:.3f},afade=t=out:st={vdurs[i]-0.07:.3f}:d=0.08,adelay={ms}|{ms}[a{i}]")
    amix.append(f"[a{i}]")
# sfx
inputs += ["-i", whoosh, "-i", hit]
wi, hi = 7, 8
sfx = []
for i in range(6):
    typ, d = TRANS[i]
    if typ == "cut":
        ms = int(starts[i + 1] * 1000)
        fc.append(f"[{hi}:a]adelay={ms}|{ms},volume=0.55[s{i}]")
    else:
        ms = int(max(starts[i + 1] + d / 2 - 0.35, 0) * 1000)
        fc.append(f"[{wi}:a]adelay={ms}|{ms},volume=0.40[s{i}]")
    sfx.append(f"[s{i}]")
fc.append(f"[{hi}:a]volume=0.5[s6]"); sfx.append("[s6]")  # opening hit
# split sfx sources (each input used multiple times)
fc_pre = [f"[{wi}:a]asplit=7" + "".join(f"[w{k}]" for k in range(7)),
          f"[{hi}:a]asplit=7" + "".join(f"[h{k}]" for k in range(7))]
fc2 = []
wk = hk = 0
for line in fc:
    if line.startswith(f"[{wi}:a]"):
        line = f"[w{wk}]" + line[len(f"[{wi}:a]"):]; wk += 1
    elif line.startswith(f"[{hi}:a]"):
        line = f"[h{hk}]" + line[len(f"[{hi}:a]"):]; hk += 1
    fc2.append(line)
fc2 += [f"[w{k}]anullsink" for k in range(wk, 7)] + [f"[h{k}]anullsink" for k in range(hk, 7)]
fc2.append("".join(amix) + f"amix=inputs=7:normalize=0,highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=120[voice]")
fc2.append("".join(sfx) + f"amix=inputs={len(sfx)}:normalize=0[fx]")
fc2.append(f"[voice][fx]amix=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9,atrim=0:{total:.3f}[aout]")
graph = ";".join(fc_pre + fc2)

run([*inputs, "-filter_complex", graph, "-map", v, "-map", "[aout]",
     "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-profile:v", "high", "-pix_fmt", "yuv420p",
     "-r", str(FPS), "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", "-t", f"{total:.3f}", OUT])
print("done", OUT, f"{total:.2f}s")
