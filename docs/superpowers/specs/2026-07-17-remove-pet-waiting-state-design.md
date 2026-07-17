# Remove the pet waiting state

## Scope

Remove the redundant `waiting` state from the portable agent pet pack. The existing `idle` state remains unchanged.

## State flow

`idle`, `working`, `success`, and `error` remain public states. `success` and `error` transition to `idle` after their non-looping animations finish.

## Pack changes

Remove the `waiting` state definition and its `patient` and `attention` variants from the source spec and generated manifests. Delete only the generated animation assets for those variants. Update the public React state type, pack README, and any demo references.

## Validation

Run `pnpm lint` and `pnpm build`. Confirm no source reference to `waiting` remains and that the exported state type accepts the four remaining states.
