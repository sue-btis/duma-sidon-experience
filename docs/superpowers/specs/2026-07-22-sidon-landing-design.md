# Sidón landing design

## Scope

Populate `/{locale}/sidon/` as the digital-world landing route. It remains a static App Router page with locale content supplied through `next-intl`.

## Structure

The landing has four desktop snap sections. Mobile and reduced-motion use the same content in ordinary document order.

1. **Introduction.** Sidón identity, green orbital treatment, the canonical SID-01 headline, and supporting copy.
2. **Categories.** A five-card orbit carousel in the approved order: Maintenance and Safety, Audits, People, Access, Monitoring. The closed card shows its number, supplied category icon, category name, `MÓDULOS / MODULES`, and module names. Only one card can be open. Its open state retains the number and icon, then adds the approved concise category statement, `What does it solve?`, module descriptions, and the specified category action. After visitors encounter the five cards, this same scene resolves its final connected-ecosystem message. This is not a fifth or separate scroll section.
3. **Duma AI.** Duma is visibly contained within Sidón, uses the supplied official Duma AI asset, carries the SID-01 copy, and links to `/sidon/duma/`.
4. **Conversation.** The canonical Sidón commercial copy links to `/sidon/conversemos/`.

## Interaction and motion

Create a feature-local `SidonCategories` client component rather than changing `IntegrationOrbit`, which is already under active modification. It may reuse the existing orbit math, but owns its open-card state and accessibility behavior.

On desktop, the landing uses the same `scroll-snap-type: y mandatory`, `scroll-snap-align: start`, and `scroll-snap-stop: always` pattern as Home and Integración. Category activation works by click, tap, and keyboard. On mobile, categories expand vertically in place. A reduced-motion layout has no orbit movement, scroll pinning, zoom, or animation, and shows all category access in normal document order.

## Content and assets

Add feature-scoped English and Spanish message modules for the supplied SID-01 and SID-02 content. Use the verified assets under `public/home/worlds/sidon/` and `public/home/worlds/dumaAi.png`. No official module-logo files are present, so module names are text-only identities; do not reconstruct logos.

Category and module actions retain the supplied target paths. Their destination pages are outside this landing-page increment.

## Validation

Run `pnpm lint` and `pnpm build` from the repository root. Manually verify the Spanish and English landing routes at desktop width, a mobile width, keyboard card activation, and `prefers-reduced-motion: reduce`.
