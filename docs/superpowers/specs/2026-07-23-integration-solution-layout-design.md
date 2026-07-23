# Integration solution layout

## Summary

Create one reusable `IntegrationSolutionExperience` layout for the seven Integration solutions. It will keep the structural positions, purple Integration identity, and progression consistent while allowing each solution's content and carousel panels to differ.

## User understanding

A visitor should first understand the operational context of a solution, then its value, project-dependent capabilities, and the next commercial action. The page must present a solution, not a product catalog, technical dashboard, or guarantee of universal capabilities.

## Visual direction

- Light, spacious Integration surface using the existing purple and deep-purple tokens.
- The first scene is a contextual application carousel, not an orbit or generic local world.
- CCTV is the reference: Perimeters, Accesses, and Operations form the first carousel panels.
- Each sibling solution supplies its own application panels and panel visuals; the layout, color roles, and content positions do not change.
- No camera catalog, control-room aesthetic, dashboard, dark treatment, or capability claims beyond the approved project-dependent content.

## Layout

1. Arrival: Integración return link, solution name, headline, definition, and contextual application carousel.
2. Value: 4–5 approved outcomes or value pillars as concise, non-card emphasis items.
3. Scope: project capabilities or service scope, followed by the approved qualification note.
4. Commercial transition: contextual conversation CTA.
5. Sibling navigator: existing Integration solution navigation, retaining the selected solution context.

The carousel is the visual arrival and application explorer. It must not become the primary representation of technical specifications, manufacturers, metrics, or dashboard data.

## Data and boundaries

- Keep localized approved copy in `i18n/messages/{locale}/integration.json`.
- Extend the existing solution metadata only with the smallest configuration needed to identify carousel panels and their visual treatment.
- The route layer continues to validate locale and solution, set locale metadata, and compose the feature. Feature UI and data stay under `src/features/integration/`.
- No API, CMS, analytics, contact form, new dependency, or invented route is part of this work.

## Interaction and accessibility

- Carousel controls are keyboard accessible, have clear labels, and do not require hover, drag, or timed movement.
- The selected panel has a non-color indicator and all content remains available without animation.
- Under reduced motion, panels change without automatic movement and the page preserves the same reading order.
- The static export must retain build-time-known locale and solution routes.

## Validation

- Verify every solution has a headline, definition, emphasis, scope note, and application carousel panels in Spanish and English.
- Verify desktop and mobile layouts, keyboard navigation, visible focus, and reduced-motion behavior.
- Run `pnpm lint` and `pnpm build` from the repository root after implementation.
