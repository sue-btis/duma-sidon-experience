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

Each solution route presents only verified information: its supplied family name, the Integración identity, a return action to the hub, the commercial action, and a compact sibling navigator. No value pillars, applications, capabilities, service claims, form, backend, analytics, or unprovided product copy will be invented.

`/integracion/conversemos` provides the static commercial destination and preserves the known source, world, and interest values in its route-level context. It does not collect data because no approved request-flow fields or submission mechanism exist.

## Interaction and accessibility

Cards and sibling navigation are semantic links with visible focus and 44px minimum targets. Hover and focus add restrained emphasis without hiding sibling choices or auto-navigating. Motion is optional, non-blocking, and disabled under reduced-motion preferences.

## Validation

Run `pnpm lint` and `pnpm build` from the repository root. Verify both locales render all nine paths and that every solution card, sibling link, CTA, and return link resolves to an existing static route.
