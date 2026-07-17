# Remove pet eye pupils

## Scope

Remove the small black marks within the white eyes from every retained agent-pet animation strip. Preserve the mascot's identity, eye shape, face, pose progression, background key color, frame count, and animation timing.

## Asset flow

Edit each source strip under `pack/raw-strips/`, then regenerate the corresponding cleaned strips, extracted frames, spritesheets, animated WebP files, and contact sheet. The source strips remain the canonical visual input, so generated files do not drift on future rebuilds.

## Validation

Visually inspect every regenerated variant, run the existing frame and orbit checks, then run `pnpm lint` and `pnpm build`.
