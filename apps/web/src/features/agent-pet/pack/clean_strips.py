from pathlib import Path
import json
import shutil

import cv2
import numpy as np
from PIL import Image


PACK_DIR = Path(__file__).parent
RAW_DIR = PACK_DIR / "raw-strips"


def isolate_foreground(image: Image.Image) -> tuple[np.ndarray, np.ndarray]:
    rgba = np.asarray(image.convert("RGBA"), dtype=np.uint8).copy()
    hsv = cv2.cvtColor(rgba[..., :3], cv2.COLOR_RGB2HSV)
    border = np.concatenate((hsv[0], hsv[-1], hsv[:, 0], hsv[:, -1]))
    colorful = border[(border[:, 1] > 80) & (border[:, 2] > 100)]
    key_hue = float(np.median(colorful[:, 0]))
    hue_delta = np.abs(hsv[..., 0].astype(np.float32) - key_hue)
    hue_delta = np.minimum(hue_delta, 180 - hue_delta)
    background = (hue_delta < 24) & (hsv[..., 1] > 80) & (hsv[..., 2] > 90)
    foreground = ((rgba[..., 3] > 16) & ~background).astype(np.uint8)
    return rgba, foreground


def find_sprite_runs(foreground: np.ndarray) -> list[tuple[int, int]]:
    occupied = foreground.sum(axis=0) >= 4
    runs: list[tuple[int, int]] = []
    start: int | None = None
    for index, value in enumerate(occupied):
        if value and start is None:
            start = index
        if start is not None and (not value or index == len(occupied) - 1):
            end = index if not value else index + 1
            if end - start >= 10:
                runs.append((start, end))
            start = None
    return runs


def clean_strip(image: Image.Image) -> Image.Image:
    rgba, foreground = isolate_foreground(image)
    runs = find_sprite_runs(foreground)
    if len(runs) != 8:
        raise ValueError(f"Expected 8 isolated sprites, found {len(runs)}")

    cell_width = max(right - left for left, right in runs) + 48
    cleaned = Image.new("RGBA", (cell_width * 8, image.height), (0, 0, 0, 0))
    for index, (left, right) in enumerate(runs):
        sprite = rgba[:, left:right].copy()
        alpha = foreground[:, left:right] * 255
        sprite[..., 3] = alpha
        sprite[alpha == 0, :3] = 0
        offset = index * cell_width + (cell_width - sprite.shape[1]) // 2
        cleaned.alpha_composite(Image.fromarray(sprite, mode="RGBA"), (offset, 0))
    return cleaned


def main() -> None:
    RAW_DIR.mkdir(exist_ok=True)
    jobs = json.loads((PACK_DIR / "jobs.json").read_text(encoding="utf-8"))["jobs"]

    for job in jobs:
        if job.get("kind") != "animation-strip":
            continue

        output = Path(job["selected_output"])
        raw = RAW_DIR / output.name
        if not raw.exists():
            shutil.copy2(output, raw)

        clean_strip(Image.open(raw)).save(output)
        print(output.name)


if __name__ == "__main__":
    main()
