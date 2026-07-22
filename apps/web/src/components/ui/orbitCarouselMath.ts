const FULL_TURN = Math.PI * 2;

export type OrbitDimensions = Readonly<{ radiusX: number; radiusZ: number }>;

export function getOrbitCardLayout(index: number, count: number, rotation: number, { radiusX, radiusZ }: OrbitDimensions) {
  const angle = index * (FULL_TURN / count) + rotation;
  const z = Math.cos(angle) * radiusZ;
  const depth = (z + radiusZ) / (radiusZ * 2);

  return {
    angle,
    blur: (1 - depth) * 0.9,
    depth,
    opacity: 0.36 + depth * 0.64,
    rotateY: -Math.sin(angle) * 56,
    scale: 0.58 + depth * 0.5,
    x: Math.sin(angle) * radiusX,
    y: 0,
    z,
    zIndex: 100 + Math.round(depth * 900),
  };
}

export function getNearestFrontIndex(rotation: number, count: number) {
  let nearestIndex = 0;
  let nearestDepth = -Infinity;

  for (let index = 0; index < count; index += 1) {
    const depth = Math.cos(index * (FULL_TURN / count) + rotation);
    if (depth > nearestDepth) {
      nearestDepth = depth;
      nearestIndex = index;
    }
  }

  return nearestIndex;
}

export function getSnapRotation(index: number, count: number, currentRotation: number) {
  const baseRotation = -index * (FULL_TURN / count);
  return baseRotation + Math.round((currentRotation - baseRotation) / FULL_TURN) * FULL_TURN;
}
