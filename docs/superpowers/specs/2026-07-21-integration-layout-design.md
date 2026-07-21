# Integración layout refinement

## Goal

Remove unintentional empty space before and after the Integración 3D carousel while preserving the carousel exactly as it is.

## Layout

- On desktop, the introduction becomes a two-column composition: the copy stays on the left and the existing carousel occupies the currently unused right-side space.
- The copy remains the entry point. Its label, headline, description, and conversation link stay grouped with tighter vertical spacing.
- The carousel component, its controls, motion, dimensions, behavior, and reduced-motion alternative are unchanged.
- The project-scope band moves closer to the carousel. Its existing two-column content stays intact.
- The final conversation panel remains the closing action but uses a shorter, responsive separation from the project-scope band.
- On narrow viewports, the layout remains vertical: copy, carousel, project scope, then final conversation panel.

## Scope and validation

- Change only the integration feature stylesheet unless the existing markup cannot express the two-column desktop layout.
- Preserve Spanish and English copy, routes, keyboard controls, focus handling, and reduced-motion behavior.
- Validate the route at desktop and mobile widths, then run `pnpm lint` and `pnpm build`.
