# Orbit card brand corners

## Scope

Refine the shared orbit-card visual treatment without changing carousel interaction, routes, or content.

## Card treatment

- Show the current world's mark in the top-left corner: Integración on its route and Sidón on its route.
- Move the card index into a circular marker in the top-right corner.
- Keep the category icon centered, smaller than its surrounding orbital ring.
- Use the tall, rounded capsule geometry from the approved reference.
- Add a lower-right abstract shape driven by an editable per-card color.

## Data

- The carousel receives the world mark once per route.
- A card may define `decorativeColor`. Sidón category data supplies temporary values that can be changed in one place later.
- Integración uses its existing world accent when no per-card value is supplied.

## Boundaries and validation

- No new assets, dependencies, routes, copy, or interaction behavior.
- Preserve the existing module rail for Sidón and description rail for Integración, including reduced-motion content.
- Validate with `pnpm lint` and `pnpm build`.
