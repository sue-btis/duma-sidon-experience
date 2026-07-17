from pathlib import Path
import json

import cv2
import numpy as np
from PIL import Image


PACK_DIR = Path(__file__).parent
FRAME_DIR = PACK_DIR / "dist" / "frames"
EXPECTED_BOTTOM = 238


def main() -> None:
    failures: list[str] = []
    jobs = json.loads((PACK_DIR / "jobs.json").read_text(encoding="utf-8"))["jobs"]
    expected = [job["id"] for job in jobs if job.get("kind") == "animation-strip"]

    for job_id in expected:
        frame_count = len(list((FRAME_DIR / job_id).glob("*.png")))
        if frame_count < 15:
            failures.append(f"dist/frames/{job_id}: only {frame_count} frames")

    for path in sorted(FRAME_DIR.glob("*/*.png")):
        alpha = np.asarray(Image.open(path).convert("RGBA"))[..., 3]
        mask = (alpha > 16).astype(np.uint8)
        count, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
        significant = np.zeros_like(mask)
        for index in range(1, count):
            if stats[index, cv2.CC_STAT_AREA] >= 64:
                significant[labels == index] = 1

        ys, xs = np.where(significant)
        if not len(xs):
            failures.append(f"{path.relative_to(PACK_DIR)}: no visible pet")
            continue

        left, right = int(xs.min()), int(xs.max())
        top, bottom = int(ys.min()), int(ys.max())
        center_x = (left + right) / 2
        if left < 8 or right > 247:
            failures.append(
                f"{path.relative_to(PACK_DIR)}: content touches horizontal edge ({left}, {right})"
            )
        elif abs(center_x - 127.5) > 3 or abs(bottom - EXPECTED_BOTTOM) > 3:
            failures.append(
                f"{path.relative_to(PACK_DIR)}: bbox=({left}, {top}, {right}, {bottom})"
            )

    if failures:
        raise AssertionError("\n".join(failures[:20]))

    print("All animation frames contain an isolated, centered, bottom-anchored pet.")


if __name__ == "__main__":
    main()
