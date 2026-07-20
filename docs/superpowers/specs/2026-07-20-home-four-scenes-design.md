# Home four-scene adaptation

## Scope

Build the public home experience from only four sections of the supplied prototype:

1. `portada`
2. `mapa`
3. `industrias`
4. `mundos`

Everything after `mundos` remains out of scope. No API, form, analytics, third-party resource, or new dependency is introduced.

## Source and content

The supplied prototype is the approved source for these sections' copy, customer logos, partner logos, layout, and narrative sequencing. Its embedded images will be extracted into self-hosted static assets rather than retained as data URLs. Spanish is the source locale; English receives equivalent translated content through the existing `next-intl` message modules.

## Experience

The existing `EcosatNavbar` remains at the top of the home route. The four scenes follow it in this order:

- **Portada:** Ecosat mark, connecting-worlds statement, five capability pillars, CTA, and exactly two orbital rings with two nodes each.
- **Mapa:** a progressive dot map and accompanying statements that trace Chihuahua, Mexico, the border, Canada, and Central America. The conclusion states the operational connection message from the prototype.
- **Industrias:** the six industry groups with their customer logos, followed by the partner-logo group and closing statement.
- **Mundos:** an Ecosat connector scene showing the physical Integración side and the digital Sidón side, including the prototype's staged narrative and system capabilities.

At narrow widths, panels and logo groups stack. No essential content is hidden behind hover, precise scrolling, or animation.

## Implementation boundaries

- Keep the route server-rendered. Put scroll observation and scene-state updates in the smallest feature-local client component.
- Keep static content and translations in feature-local data/message files; do not add domain, application, or infrastructure layers for this static content.
- Use existing tokens, the supplied Ecosat asset, and self-hosted extracted source assets. Do not load external fonts or origins.
- Use semantic sectioning, headings, text alternatives for every logo, keyboard-visible focus, and the existing locale-aware route structure.
- Respect `prefers-reduced-motion`: all scene content is immediately readable in document order, with no pinned or automatic orbital movement required to understand it.

## Validation

- Verify `/es/` and `/en/` render the same four-section order with localized text.
- Verify customer and partner logo alternatives match their visible brands.
- Check desktop and narrow mobile layouts, keyboard focus, and reduced-motion rendering.
- Run `pnpm lint` and `pnpm build` from the repository root before handoff.
