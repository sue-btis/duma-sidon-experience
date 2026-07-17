from pathlib import Path
import json


PACK_DIR = Path(__file__).parent
DIST_DIR = PACK_DIR / "dist"


def main() -> None:
    manifest = json.loads((DIST_DIR / "pet.manifest.json").read_text(encoding="utf-8"))
    orbits = manifest["effects"]["orbits"]
    assert len(orbits) == 2, f"Expected 2 orbiting spheres, found {len(orbits)}"

    first, second = orbits
    assert first["radius_x_px"] == second["radius_x_px"]
    assert first["radius_y_px"] == second["radius_y_px"]
    assert first["duration_ms"] == second["duration_ms"]
    assert abs(first["delay_ms"] - second["delay_ms"]) == first["duration_ms"] // 2

    css = (DIST_DIR / "agent-pet.css").read_text(encoding="utf-8")
    for contract in (
        ".agent-pet__orbit-path",
        "@keyframes agent-pet-orbit-depth",
        "scaleY(var(--orbit-scale-y))",
    ):
        assert contract in css, f"Missing orbit runtime contract: {contract}"

    print("Two synchronized spheres follow one layered elliptical path.")


if __name__ == "__main__":
    main()
