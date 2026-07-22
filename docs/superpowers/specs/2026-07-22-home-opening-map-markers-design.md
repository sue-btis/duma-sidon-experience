# Show the home cards automatically and refine map markers

This specification defines two focused changes to the Ecosat home page. The opening shows its five attribute cards without scroll, and the company evolution maps use the approved technical coordinate marker.

## Goal and audience

Prospective customers should understand Ecosat's five attributes when the first viewport loads. The evolution maps should use a recognizable location marker that belongs to the Ecosat visual system.

## Opening behavior

The five attribute cards appear automatically in their existing order: Infraestructura, Tecnología, Conectividad, Inteligencia, and Confianza. Each card enters after the preceding card with a short stagger. The sequence starts after the logo and lead appear, and it does not read scroll position.

The opening occupies one viewport instead of `420svh`. After the sequence finishes, every card remains fully visible. The change removes the scroll-driven React state and listeners from `CoreOpening` because Cascading Style Sheets (CSS) animations can produce the approved behavior.

When `prefers-reduced-motion: reduce` is active, all five cards appear immediately without translation or stagger. Content remains visible if animations do not run.

## Map marker design

The maps use option C, the technical coordinate. The Chihuahua marker is a compact square rotated 45 degrees, with an Ecosat deep-blue body, white outline, and cyan center. Its existing label remains visible.

Unlabeled coverage locations use the same geometry at a smaller size. This creates one marker family for the opening and closing map views. The markers use Ecosat blue instead of red or Integración purple because the home page is an Ecosat company-level surface.

The marker change uses the existing MapLibre elements and CSS classes. It does not add icons, images, dependencies, map data, locations, or interaction.

## Files and boundaries

The implementation changes only `CoreOpening.tsx`, `home-experience.module.css`, and `company-evolution.module.css`. It keeps the existing home feature boundary and does not introduce a component or abstraction for one marker style.

## Validation

Run `pnpm lint` and `pnpm build` from the repository root. Check `/es/` and `/en/` at desktop and mobile widths, then repeat with reduced motion enabled. Confirm that all five cards become visible without scroll, the opening no longer creates extra scroll distance, Chihuahua retains its label, and all coverage locations use the technical coordinate geometry.
