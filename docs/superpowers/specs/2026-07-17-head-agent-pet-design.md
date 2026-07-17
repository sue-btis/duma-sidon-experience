# Head agent pet design

## Goal

Add a second, self-contained animated pet package derived from the head in
`ECOSAT_Dumabb_F.svg`. It remains distinct from the existing body-based pet
and is shown beside it on the localized `/pet/` demo route.

## Scope

- The new package lives at `apps/web/src/features/head-agent-pet/pack/`.
- It exposes the same four semantic states as the current pet: `idle`,
  `working`, `success`, and `error`.
- `idle` has `breathe` and `blink-look` variants; `working` has `read` and
  `turn-page` variants. `success` uses `celebrate`; `error` uses `concern`.
- Two procedural spheres orbit each head pet on a visible elliptical path.
- `/es/pet/` and `/en/pet/` render both pets and use one set of demo controls
  to drive the same selected state for each.

## Runtime behavior

The site remains a static export and has no production agent-event source.
The existing demo controls are therefore the sole emitter. Both pets consume
the same semantic `AgentPetState` value; no backend protocol or event source
is added or presumed.

## Pack production

Use the supplied SVG solely as the canonical visual reference for a clean,
head-derived raster mascot. Generate a canonical image and one eight-keyframe
strip per variant, then build the pack with flow interpolation, one local
in-between frame, 12 FPS for `idle`, and 16 FPS for active states. Validate
the completed package strictly before integration.

## Validation

Inspect the generated preview and validation report, then run the existing
frame and orbit checks followed by `pnpm lint` and `pnpm build` from the
repository root.
