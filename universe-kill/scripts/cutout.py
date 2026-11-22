"""Cut the approved 2000px couch poses (white background) to transparent PNGs.
Background = near-white pixels CONNECTED to the image border (so the white head / mug / hands stay opaque),
with a 1.5 px soft edge. couch_hide is mirrored so the character looks left (toward the incoming beam)."""
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
def cut(src, dst, mirror=False):
    im = Image.open(src).convert("RGB"); a = np.asarray(im).astype(np.int16)
    mx, mn = a.max(2), a.min(2)
    whiteish = (mn > 228) & (mx - mn < 22)
    lab, _ = ndimage.label(whiteish)
    border = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])); border = border[border > 0]
    bg = np.isin(lab, border)
    bg = ndimage.binary_opening(bg, iterations=1)
    fg, nf = ndimage.label(~bg); sizes = ndimage.sum(np.ones_like(fg), fg, range(1, nf + 1))
    keep = np.isin(fg, [i + 1 for i, v in enumerate(sizes) if v > 2000]); bg = ~keep  # drop tiny specks (JPEG noise)
    alpha = Image.fromarray(((~bg) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.9))
    out = im.copy(); out.putalpha(alpha)
    bbox = alpha.point(lambda v: 255 if v > 8 else 0).getbbox(); bbox = (max(0, bbox[0] - 8), max(0, bbox[1] - 8), min(im.width, bbox[2] + 8), min(im.height, bbox[3] + 8)); out = out.crop(bbox)
    if mirror: out = out.transpose(Image.FLIP_LEFT_RIGHT)
    out.save(dst); print(dst, out.size)
import os
os.makedirs("public/assets/character/couch", exist_ok=True)
R = "assets/character_raw" if os.path.isdir("assets/character_raw") else "../universe-kill/assets/character_raw"
cut(f"{R}/couch_chill.jpg", "public/assets/character/couch/couch_chill.png")
cut(f"{R}/couch_shocked.jpg", "public/assets/character/couch/couch_shocked.png")
cut(f"{R}/couch_hide.jpg", "public/assets/character/couch/couch_hide.png", mirror=True)
