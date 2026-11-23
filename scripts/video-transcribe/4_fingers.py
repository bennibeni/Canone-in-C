import json
import subprocess
import sys
from collections import Counter
from pathlib import Path

import mediapipe as mp
import numpy as np
from mediapipe.tasks import python as mpt
from mediapipe.tasks.python import vision

vid = sys.argv[1]
Y0, Y1 = 700, 1180  # zona tastiera + mani
TIPS = [4, 8, 12, 16, 20]  # pollice … mignolo
q = json.loads(Path(vid + ".q.json").read_text(encoding="utf-8"))
notes = q["notes"]
want = {}
for i, n in enumerate(notes):
    if n["x"] is None:
        continue
    f0 = round(n["t0"] * 30)
    for k in (2, 3, 4, 5):
        want.setdefault(f0 + k, []).append(i)
det = vision.HandLandmarker.create_from_options(
    vision.HandLandmarkerOptions(
        base_options=mpt.BaseOptions(model_asset_path="/tmp/hl.task"),
        num_hands=2,
        min_hand_detection_confidence=0.3,
        min_hand_presence_confidence=0.3,
        min_tracking_confidence=0.3,
        running_mode=vision.RunningMode.VIDEO,
    )
)
H = Y1 - Y0
proc = subprocess.Popen(
    [
        "ffmpeg",
        "-v",
        "error",
        "-i",
        vid,
        "-vf",
        f"crop=720:{H}:0:{Y0}",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "rgb24",
        "-",
    ],
    stdout=subprocess.PIPE,
)
stdout = proc.stdout
assert stdout is not None  # stdout=PIPE: mai None
votes = {i: [] for i in range(len(notes))}
fi = 0
while True:
    buf = stdout.read(720 * H * 3)
    if len(buf) < 720 * H * 3:
        break
    img = np.frombuffer(buf, np.uint8).reshape(H, 720, 3)
    res = det.detect_for_video(
        mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(img)),
        int(fi * 1000 / 30),
    )
    if fi in want and res.hand_landmarks:
        hands = []
        for lm in res.hand_landmarks:
            tips = [(lm[t].x * 720, lm[t].y * H + Y0) for t in TIPS]
            hands.append({"wx": lm[0].x * 720, "tips": tips})
        hands.sort(key=lambda h: h["wx"])
        for i in want[fi]:
            n = notes[i]
            # mano: con due mani, sinistra = polso più a sinistra; con una sola, quella c'è
            if len(hands) == 2:
                hd = hands[0] if n["hand"] == "L" else hands[1]
            else:
                hd = hands[0]
                # se l'unica mano è chiaramente dell'altro lato, salta
                if n["hand"] == "L" and hd["wx"] > 500:
                    continue
                if n["hand"] == "R" and hd["wx"] < 220:
                    continue
            d = [abs(tx - n["x"]) for tx, ty in hd["tips"]]
            f = int(np.argmin(d))
            votes[i].append((f + 1, d[f]))
    fi += 1
for i, n in enumerate(notes):
    v = votes[i]
    if not v:
        n["finger"] = None
        n["fconf"] = 0
        continue
    c = Counter(f for f, _ in v)
    f, cnt = c.most_common(1)[0]
    n["finger"] = f
    n["fconf"] = round(cnt / len(v), 2)
    n["fdx"] = round(float(np.median([dx for ff, dx in v if ff == f])), 1)
Path(vid + ".q.json").write_text(json.dumps(q), encoding="utf-8")
ok = [n for n in notes if n.get("finger")]
print(
    vid,
    "note con dito",
    len(ok),
    "/",
    len(notes),
    "consenso medio {:.2f}".format(np.mean([n["fconf"] for n in ok])),
    "dx mediana {:.1f} px".format(np.median([n["fdx"] for n in ok])),
)
