# Carousel logo scale

## Scope

Double the central product logo displayed on every OrbitCarousel card. `OrbitCarousel` is currently used only by the Integración and Sidón experiences.

## Design

- Keep carousel geometry, card dimensions, padding, and all CSS gaps unchanged.
- Change only the central card-logo scale from its current base value to `2`.
- Preserve the existing item-level scale multiplier so any existing per-item adjustment continues to apply.
- Do not change the header brand icon or reduced-motion list.

## Validation

Run `pnpm lint` and `pnpm build`. Visually confirm the central logos in `/es/integracion/` and `/es/sidon/` are twice their previous size while card spacing is unchanged.
