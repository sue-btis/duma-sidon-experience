# Letter world glyph density

## Scope

Increase the existing glyph density for every `LetterWorldsCanvas` sphere.

## Design

Increase the point counts proportionally for the core, physical, and digital spheres. Keep the current glyph alphabets, mobile rendering cap, animation, visibility controls, and canvas API unchanged.

## Validation

Run `pnpm lint` and `pnpm build`. Check the `/es/`, `/en/`, `/es/integracion/`, and `/es/sidon/` canvases visually at desktop and mobile widths.
