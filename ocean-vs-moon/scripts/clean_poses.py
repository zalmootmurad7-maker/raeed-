"""Remove stray fragments of neighbouring poses (left over from slicing): keep the main figure's connected alpha
components (largest component + anything overlapping its bounding box), drop pieces outside it. Originals untouched."""
import glob, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage as nd
src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
for p in sorted(glob.glob(f"{src}/*.png")):
    im = np.array(Image.open(p).convert("RGBA")); a = im[..., 3] > 12
    lab, n = nd.label(a, structure=np.ones((3, 3)))
    sizes = nd.sum(a, lab, range(1, n + 1)); main = int(np.argmax(sizes)) + 1
    ys, xs = np.where(lab == main); y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    keep = np.zeros_like(a)
    for i, sl in enumerate(nd.find_objects(lab), start=1):
        cy0, cy1, cx0, cx1 = sl[0].start, sl[0].stop - 1, sl[1].start, sl[1].stop - 1
        inside = cy0 >= y0 - 4 and cy1 <= y1 + 4 and cx0 >= x0 and cx1 <= x1 and sizes[i - 1] > 0.002 * sizes[main - 1]
        if i == main or (inside and sizes[i - 1] > 6): keep |= lab == i
    im[..., 3] = np.where(keep, im[..., 3], 0)
    ys, xs = np.where(im[..., 3] > 12)
    out = Image.fromarray(im).crop((xs.min() - 4, ys.min() - 4, xs.max() + 5, ys.max() + 5))
    out.save(f"{dst}/{os.path.basename(p)}")
    print(os.path.basename(p), "components", n, "->", out.size)
