# Responsive pet orbit sizing

## Goal

Allow each pet to fill a caller-provided square container while keeping its
body, shadow, orbit path, and two spheres visually proportional.

## Runtime contract

- `AgentPet` fills the width and height of its parent; callers choose the
  rendered size with the parent container's CSS.
- The component remains square. A caller must provide a square, non-zero-sized
  container.
- Orbit geometry is stored as values relative to the component's size, rather
  than fixed pixels. This includes radii, sphere diameters, and orbit center.
- Both packs retain exactly two spheres, with the existing opposite phase.
- The full-body pet retains its current visual proportions. The head pet uses
  independent, larger radii and a head-specific center so the orbit remains
  visible around its circular silhouette.

## Scope

- Update only the two portable pack components, their orbit metadata, and the
  local demo's containers.
- Do not add a responsive wrapper component, dependency, API, or asset change.

## Validation

- Check both pets in a small square button-sized container and the existing
  256px demo container; their two spheres and ellipse must stay visible and
  scale with the body.
- Run `pnpm lint` and `pnpm build` from the repository root.
