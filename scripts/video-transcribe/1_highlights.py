import json
import subprocess
import sys
from pathlib import Path

import numpy as np

# estrae i blob evidenziati (blu=MS, verde acqua=MD) per ogni fotogramma
vid, y0, y1, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
W, H = 720, 1280
cmd = [
    "ffmpeg",
    "-v",
    "error",
    "-i",
    vid,
    "-vf",
    f"crop={W}:{y1 - y0}:0:{y0}",
    "-f",
    "rawvideo",
    "-pix_fmt",
    "rgb24",
    "-",
]
raw = subprocess.run(cmd, capture_output=True).stdout
h = y1 - y0
n = len(raw) // (W * h * 3)
fr = np.frombuffer(raw, np.uint8).reshape(n, h, W, 3).astype(int)
res = []
for i in range(n):
    im = fr[i]
    r, g, b = im[..., 0], im[..., 1], im[..., 2]
    blue = (b > r + 60) & (b > g + 20) & (b > 140)
    teal = (g > r + 50) & (b > r + 30) & (g > 130)
    frame = {}
    for name, m in (("L", blue), ("R", teal)):
        col = m.sum(0)
        on = col > h * 0.25
        blobs = []
        x = 0
        while x < W:
            if on[x]:
                s = x
                while x < W and on[x]:
                    x += 1
                if x - s >= 6:
                    blobs.append([s, x - 1])
            x += 1
        frame[name] = blobs
    res.append(frame)
Path(out).write_text(json.dumps({"fps": 30, "frames": res}), encoding="utf-8")
print(n, "frames")
