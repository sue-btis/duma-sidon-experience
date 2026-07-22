# Shared Integración and Sidón orbit carousel

## Goal

Give the Integración and Sidón landing-page carousels identical interaction behavior while preserving their approved content and brand treatment.

## Decision

Extract the existing Integración orbit controller into one shared client component. It owns the common carousel chrome and behavior:

- continuous autoplay, drag, wheel, keyboard, and card selection;
- depth, blur, scale, and active-card updates;
- pause on hover, focus, hidden document, and offscreen state;
- the vertical item navigator and bottom previous/current/next navigator;
- an equivalent non-animated list when reduced motion is requested.

Integración and Sidón remain feature owners of their item data, card markup, text, and CSS. They pass labels, card content, and their existing styles into the shared controller. Theme colors remain feature-local CSS tokens; no new theme configuration is introduced.

## Boundaries

The change applies only to landing-page section two. It does not change product routes, copy, assets, or the mobile/reduced-motion content order.

## Validation

Add a focused behavior test for the shared controller's item selection math, then run `pnpm lint` and `pnpm build` from the repository root.
