#!/usr/bin/env python3
"""Restyle the white-background montage onto a cream grid "paper" set with HUD,
floating particles and soft drop shadows (style of the reference explainer video).
Usage: python3 restyle.py <in.mp4> <out.mp4>"""
import subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy import ndimage

SRC, OUT = sys.argv[1], sys.argv[2]
W, H, FPS = 1080, 1920, 30
CREAM, CREAM_EDGE = np.array([239, 235, 225]), np.array([226, 221, 209])
GRID, PLUS = (216, 211, 200), (170, 166, 158)
INK, RED = (22, 23, 27), (226, 36, 43)
MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"
SANS = "/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"

# chapter labels: (start time of clip on the montage timeline, text)
CHAPTERS = [(0.0, "01 // DO · PARK · DROP"), (5.667, "02 // TOO MANY BUCKETS"), (11.6, "03 // THE 24H RULE"),
            (17.267, "04 // PICK YOUR PATH"), (23.2, "05 // CLEAR THE CLUTTER"), (28.867, "06 // MENTAL OVERLOAD"),
            (34.933, "07 // ONE STEP AT A TIME")]

dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                     "-of", "csv=p=0", SRC]).decode())
nframes = int(round(dur * FPS))

# ---------- static background: cream paper + vignette + grain + grid with "+" marks ----------
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
r = np.sqrt(((xx - W / 2) / (W * 0.75)) ** 2 + ((yy - H / 2) / (H * 0.75)) ** 2)
v = np.clip(r, 0, 1)[..., None] ** 2
bg = CREAM * (1 - v) + CREAM_EDGE * v
bg += np.random.default_rng(1).normal(0, 1.6, (H, W, 1))
bgimg = Image.fromarray(np.clip(bg, 0, 255).astype(np.uint8))
d = ImageDraw.Draw(bgimg)
G = 96
ox, oy = (W % G) // 2, (H % G) // 2
for x in range(ox, W, G): d.line([(x, 0), (x, H)], fill=GRID, width=2)
for y in range(oy, H, G): d.line([(0, y), (W, y)], fill=GRID, width=2)
for i, x in enumerate(range(ox, W, G)):
    for j, y in enumerate(range(oy, H, G)):
        if i % 2 == 0 and j % 2 == 0:
            d.line([(x - 7, y), (x + 7, y)], fill=PLUS, width=2); d.line([(x, y - 7), (x, y + 7)], fill=PLUS, width=2)
BG = np.asarray(bgimg).astype(np.float32)

# ---------- particles: slow floating black/red dots ----------
rng = np.random.default_rng(7)
NP = 34
P = dict(x=rng.uniform(0, W, NP), y=rng.uniform(0, H, NP), vx=rng.uniform(-14, 14, NP), vy=rng.uniform(-22, -6, NP),
         rad=rng.choice([3, 4, 5, 6, 8, 10], NP, p=[.25, .25, .2, .15, .1, .05]), red=rng.random(NP) < 0.3,
         ph=rng.uniform(0, 6.28, NP))
def disc(rad):
    k = np.mgrid[-rad - 1:rad + 2, -rad - 1:rad + 2]
    return np.clip(rad + 0.5 - np.sqrt(k[0] ** 2 + k[1] ** 2), 0, 1).astype(np.float32)[..., None]
SPR = {rd: disc(rd) for rd in set(P["rad"])}
def stamp(img, cx, cy, spr, col):
    h, w = spr.shape[:2]; x0, y0 = int(cx) - w // 2, int(cy) - h // 2
    xa, ya, xb, yb = max(x0, 0), max(y0, 0), min(x0 + w, W), min(y0 + h, H)
    if xa >= xb or ya >= yb: return
    s = spr[ya - y0:yb - y0, xa - x0:xb - x0]
    img[ya:yb, xa:xb] = img[ya:yb, xa:xb] * (1 - s) + np.array(col, np.float32) * s

# ---------- HUD pieces ----------
fmono = ImageFont.truetype(MONO, 30); fsans = ImageFont.truetype(SANS, 30)
def label_img(text):
    tw = int(fmono.getlength(text)); im = Image.new("RGBA", (tw + 110, 64), (0, 0, 0, 0)); dd = ImageDraw.Draw(im)
    dd.rounded_rectangle([0, 0, tw + 108, 62], 31, fill=INK + (255,))
    dd.ellipse([26, 22, 46, 42], fill=RED + (255,)); dd.text((64, 13), text, font=fmono, fill=(245, 245, 245, 255))
    return im
def rec_img(nred, blink):
    im = Image.new("RGBA", (330, 64), (0, 0, 0, 0)); dd = ImageDraw.Draw(im)
    dd.rounded_rectangle([2, 2, 326, 60], 29, fill=(255, 255, 255, 255), outline=INK + (255,), width=3)
    dd.text((30, 14), "REC", font=fsans, fill=RED + (255,) if blink else (230, 140, 140, 255))
    for k in range(12):
        cx = 120 + k * 16; dd.ellipse([cx - 5, 27, cx + 5, 37], fill=(RED if k < nred else INK) + (255,))
    return im
LABELS = [label_img(t) for _, t in CHAPTERS]
RECS = {(n, b): rec_img(n, b) for n in range(13) for b in (0, 1)}

def over(frame, im, x, y, reveal=1.0):
    a = np.asarray(im).astype(np.float32); w = int(a.shape[1] * reveal)
    if w <= 0: return
    a = a[:, :w]; h = a.shape[0]; al = a[..., 3:] / 255
    frame[y:y + h, x:x + w] = frame[y:y + h, x:x + w] * (1 - al) + a[..., :3] * al

# ---------- per-frame composite ----------
dec = subprocess.Popen(["ffmpeg", "-v", "error", "-i", SRC, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
                        "-i", "-", "-i", SRC, "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-preset", "slow", "-crf", "18",
                        "-pix_fmt", "yuv420p", "-c:a", "copy", "-movflags", "+faststart", "-shortest", OUT], stdin=subprocess.PIPE)
border = np.zeros((H // 2, W // 2), bool); border[[0, -1], :] = True; border[:, [0, -1]] = True
fi = 0
while True:
    buf = dec.stdout.read(W * H * 3)
    if len(buf) < W * H * 3: break
    t = fi / FPS
    fg = np.frombuffer(buf, np.uint8).reshape(H, W, 3)
    # background = near-white region connected to the frame edge (enclosed whites like the body stay white)
    small = fg[::2, ::2].min(2) > 222
    lab, _ = ndimage.label(small)
    ids = np.unique(lab[border & small])
    region = np.isin(lab, ids[ids > 0])
    region = ndimage.binary_dilation(region, iterations=1)
    M = np.repeat(np.repeat(region, 2, 0), 2, 1)[..., None]
    # soft drop shadow of the foreground, offset down-right
    q = (~region[::2, ::2]).astype(np.float32)
    sh = ndimage.gaussian_filter(q, 5)
    sh = np.roll(np.roll(sh, 5, 0), 3, 1)
    sh = np.repeat(np.repeat(sh, 4, 0), 4, 1)[:H, :W, None]
    scene = BG * (1 - 0.20 * sh)
    for k in range(NP):
        x = (P["x"][k] + P["vx"][k] * t + 18 * np.sin(t * 0.7 + P["ph"][k])) % (W + 40) - 20
        y = (P["y"][k] + P["vy"][k] * t) % (H + 40) - 20
        stamp(scene, x, y, SPR[P["rad"][k]], RED if P["red"][k] else INK)
    f = fg.astype(np.float32)
    # lift near-white haze (blurred source watermarks) to pure white before multiplying onto the paper
    out = np.where(M, scene * np.minimum(f * (255.0 / 222.0), 255.0) / 255.0, f)
    # HUD
    ci = max(i for i, (s, _) in enumerate(CHAPTERS) if t >= s)
    over(out, LABELS[ci], 48, 72, reveal=min((t - CHAPTERS[ci][0]) / 0.45, 1.0))
    over(out, RECS[(int(t * 4) % 13, int(t * 2) % 2)], W - 48 - 330, 72)
    out[H - 64:H - 52, :] = INK
    out[H - 64:H - 52, :int(W * t / dur)] = RED
    enc.stdin.write(np.clip(out, 0, 255).astype(np.uint8).tobytes())
    fi += 1
    if fi % 150 == 0: print(f"{fi}/{nframes}", flush=True)
enc.stdin.close(); enc.wait(); dec.wait()
print("done", OUT)
