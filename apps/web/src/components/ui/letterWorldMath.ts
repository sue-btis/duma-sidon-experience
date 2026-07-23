export function getFrontAlpha(depth: number) {
  return depth <= 0 ? 0 : Math.min(1, depth / 0.18);
}
