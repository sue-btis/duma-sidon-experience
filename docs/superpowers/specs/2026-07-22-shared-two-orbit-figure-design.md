# Shared two-orbit figure

## Goal

Use the same decorative two-orbit figure on the home, Integración, and Sidón openings, correcting Sidón's missing nodes.

## Decision

Add one shared `TwoOrbitFigure` UI component. It owns the fixed markup: two elliptical orbits, one node on each orbit, the existing 52s/78s counter-rotating motion, and its reduced-motion fallback.

Each consumer supplies only the orbit and node colors through CSS custom properties. Home retains its current mixed colors; Integración uses its purple color for both orbits and nodes; Sidón uses its green color for both.

## Boundaries

Preserve the current home and Integración geometry and positioning. Replace the duplicated markup and orbit animation rules in all three features. Do not make geometry, duration, node positions, or animation direction configurable.

## Validation

Run `pnpm lint` and `pnpm build` from the repository root. Visually verify that the three opening scenes each show two orbit lines and two nodes, with their intended brand colors, and that the orbits do not animate when reduced motion is enabled.
