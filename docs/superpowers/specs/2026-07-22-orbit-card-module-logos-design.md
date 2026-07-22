# Orbit card module logos

## Scope

Refine the shared orbit-carousel card so it can present either a category's child modules or a supporting description.

## Data

- Add an optional `modules` array to `OrbitCarouselItem`. Each module provides its localized name and supplied local logo path.
- Keep `description` for Integración. It remains the sole lower-card content when `modules` is absent.
- Map every Sidón category module in `sidonCategoryData.ts` to its supplied image in `public/home/worlds/sidon`.

## Card treatment

- Keep the current category logo as the main centered visual anchor.
- Place the category title beneath it.
- Reserve the bottom rail for one of two mutually exclusive treatments:
  - Sidón: a small `Módulos` label and compact child-logo row, with each localized module name.
  - Integración: its localized description.
- Keep the existing call to action and carousel controls.
- The reduced-motion list uses the same modules-or-description content.

## Boundaries

- No new assets, dependencies, routes, or product content.
- Do not fabricate missing module identities. All 12 provided module logo assets are used.

## Validation

- `pnpm lint`
- `pnpm build`
- Verify the Sidón card rail contains the mapped module logos and names, while Integración remains description-only at desktop, mobile, and reduced-motion modes.
