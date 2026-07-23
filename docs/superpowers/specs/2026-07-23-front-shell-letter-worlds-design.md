# Front-shell letter worlds

## Goal

Make the existing letter worlds clearer and cheaper to animate by showing only their front-facing surface, while increasing the apparent surface density with a deterministic mix of glyphs and sparse dots.

## Rendering

- Reuse `LetterWorldsCanvas`; do not add a renderer, dependency, worker, or asset.
- Keep the existing Home three-world composition and the staged single-world Integración and Sidón variants.
- Project every generated point as today, but draw only points on the front hemisphere.
- Fade points near the silhouette so the edge remains spherical instead of looking clipped.
- Remove per-frame depth sorting because rear points no longer overlap the visible shell.
- Mix letters, numbers, and sparse dots. Draw dots as simple canvas marks rather than text glyphs.
- Increase generated point counts only enough to keep the visible front shell dense; the number of expensive `fillText` calls must remain below the current renderer.
- Limit the slow rotation to 30 frames per second. Keep the existing device-pixel-ratio cap, intersection pause, page-visibility pause, and reduced-motion behavior.

## Visual behavior

- Preserve each existing palette, scale, position, tilt, orbit, glow, logo, and content layer.
- Glyphs nearer the viewer are more legible; glyphs approaching the rim become smaller and softer.
- Dots add texture but do not dominate the letter-and-number identity.
- Mobile continues to show only the central Home world. Route openings continue to show their single branded world.

## Validation

- Run `pnpm lint` and `pnpm build` from the repository root.
- Compare the production export before and after under 4x CPU throttling using the same five-second frame-time harness.
- Confirm fewer `fillText` calls, fewer long tasks, and materially lower p95 frame spacing.
- Visually check Home, Integración, and Sidón in Spanish and English at desktop and mobile widths, including reduced motion.
