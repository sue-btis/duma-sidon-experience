# Integración routes

## Scope

Create the localized Integración hub and these static, build-time routes:

- `/integracion`
- `/cctv`
- `/climatizacion-refrigeracion`
- `/incendios`
- `/accesos`
- `/bms`
- `/voz-y-datos`
- `/audio-y-video`
- `/integracion/conversemos`

The hub uses the supplied solution icons and canonical Spanish content from INT-01. English is localized alongside it. Selecting a solution navigates intentionally to its route.

## Route structure

Route files remain thin: locale setup, metadata, and feature composition only. A feature-local Integración module owns the hub, reusable solution-shell presentation, solution definitions, and translations.

The hub presents the physical-world introduction, seven selectable solution families, the explicit one-solution-or-complete-project explanation, and the commercial CTA. It preserves Ecosat parent continuity in the existing top bar while using Integración purple for the active route.

Each solution route presents only its supplied canonical content: definition, outcome or value pillars, applications, capabilities or scope, and route-specific qualification note. It retains the Integración identity, a return action to the hub, the commercial action, and a compact sibling navigator. No form, backend, analytics, or unprovided claims will be invented.

`/integracion/conversemos` provides the static commercial destination and preserves the known source, world, and interest values in its route-level context. It does not collect data because no approved request-flow fields or submission mechanism exist.

## Interaction and accessibility

Cards and sibling navigation are semantic links with visible focus and 44px minimum targets. Hover, focus, and touch add restrained emphasis without hiding sibling choices or auto-navigating. A smallest-possible client orbit navigator adds selected-node state and uses the native View Transitions API where available; every unsupported or reduced-motion path navigates immediately without motion.

## Solution content and visual treatment

One typed solution configuration supplies all seven routes. The shared layout renders only the supplied definition, outcome or value pillars, applications, capabilities or scope, and qualification note. Existing solution icons remain the visual anchor. Light purple orbit and node diagrams use CSS only; no generated imagery, external asset, motion library, manufacturer catalogue, dashboard, or route-specific contact flow is added in this pass.

## Validation

Run `pnpm lint` and `pnpm build` from the repository root. Verify both locales render all nine paths and that every solution card, sibling link, CTA, and return link resolves to an existing static route.
