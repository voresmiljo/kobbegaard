#!/usr/bin/env python3
from pathlib import Path
import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
HEAD_SRC = ROOT / "billeder" / "overlay-head.png"
IMAGE_DIRS = [ROOT / "billeder", ROOT / "billeder" / "badesteder"]
SKIP_NAMES = {"baggrund.png", "overlay-head.png"}


def load_head_overlay():
    img = cv2.imread(str(HEAD_SRC), cv2.IMREAD_UNCHANGED)
    h, w = img.shape[:2]
    head = img[: int(h * 0.58), :, :]
    if head.shape[2] == 3:
        head = cv2.cvtColor(head, cv2.COLOR_BGR2BGRA)
    b, g, r, a = cv2.split(head)
    white = (b > 235) & (g > 235) & (r > 235)
    a = np.where(white, 0, 255).astype(np.uint8)
    return cv2.merge([b, g, r, a])


def overlay_rgba(base, overlay, x, y):
    bh, bw = base.shape[:2]
    oh, ow = overlay.shape[:2]
    x1, y1 = max(0, x), max(0, y)
    x2, y2 = min(bw, x + ow), min(bh, y + oh)
    if x1 >= x2 or y1 >= y2:
        return
    ox1, oy1 = x1 - x, y1 - y
    ox2, oy2 = ox1 + (x2 - x1), oy1 + (y2 - y1)
    overlay_part = overlay[oy1:oy2, ox1:ox2]
    base_part = base[y1:y2, x1:x2]
    alpha = overlay_part[:, :, 3:4].astype(np.float32) / 255.0
    inv = 1.0 - alpha
    for c in range(3):
        base_part[:, :, c] = (
            overlay_part[:, :, c].astype(np.float32) * alpha[:, :, 0]
            + base_part[:, :, c].astype(np.float32) * inv[:, :, 0]
        ).astype(np.uint8)


def process_image(path, cascade, head):
    img = cv2.imread(str(path))
    if img is None:
        return 0
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = cascade.detectMultiScale(gray, scaleFactor=1.08, minNeighbors=4, minSize=(28, 28))
    if len(faces) == 0:
        return 0
    if img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    count = 0
    for (x, y, w, h) in faces:
        size = int(max(w, h) * 1.55)
        resized = cv2.resize(head, (size, size), interpolation=cv2.INTER_AREA)
        cx = x + w // 2
        cy = y + h // 2
        px = cx - size // 2
        py = cy - int(size * 0.42)
        overlay_rgba(img, resized, px, py)
        count += 1
    out = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
    cv2.imwrite(str(path), out)
    return count


def main():
    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    head = load_head_overlay()
    touched = []
    for directory in IMAGE_DIRS:
        if not directory.exists():
            continue
        for path in sorted(directory.glob("*.png")):
            if path.name in SKIP_NAMES or path.name.startswith("ruter"):
                continue
            faces = process_image(path, cascade, head)
            if faces:
                touched.append(f"{path.relative_to(ROOT)} ({faces})")
    print(f"Updated {len(touched)} files")
    for line in touched:
        print(" ", line)

if __name__ == "__main__":
    main()
