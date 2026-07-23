# WebGL letter worlds

## Goal

Replace the opening's Canvas 2D letter-world renderer with a native WebGL renderer. Preserve the blue central world and the purple and green companion worlds on desktop. Keep only the blue central world below 700px. Remove pointer-driven motion.

## Renderer

`LetterWorldsCanvas` remains the smallest client component and keeps ownership of resize, visibility, reduced-motion, and animation cleanup. It creates a WebGL context without adding a package.

At initialization, the component creates the existing deterministic world-point data and a small canvas-generated atlas for its letter set. It uploads positions, sizes, glyph IDs, colors, and animation phases once. The vertex shader rotates and projects points each frame; the fragment shader samples the glyph atlas. Depth testing and alpha blending replace Canvas 2D point sorting.

The canvas retains a device-pixel-ratio cap of 2. It renders an initial static frame, animates only while visible and intersecting, and renders a static frame when reduced motion is requested. It does not register pointer event listeners.

## Visual layers and fallback

The existing CSS/SVG orbit, glow, connector, logo, and content layers remain outside the renderer. The WebGL canvas is decorative and remains hidden from assistive technology.

If WebGL context creation fails, the component renders no glyph canvas. The semantic opening content, CSS/SVG decoration, navigation, and reduced-motion equivalent remain available.

## Validation

Run `pnpm lint` and `pnpm build` from the repository root. Manually verify `/es/` and `/en/` on desktop and mobile: the desktop opening shows three smooth worlds; mobile shows only the central world; no mouse movement changes world rotation; reduced motion is static; navigation remains operable. In browser performance tooling, compare the first opening animation against the current Canvas 2D implementation and confirm sustained 60 FPS on the target device before increasing glyph density.
