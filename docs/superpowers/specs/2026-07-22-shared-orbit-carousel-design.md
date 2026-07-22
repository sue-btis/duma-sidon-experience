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

Integración and Sidón become thin data adapters. The shared component renders the cards, vertical item navigator, bottom previous/current/next navigator, and reduced-motion list.

Its inputs are deliberately limited to:

- `id` and accessible labels for the carousel and controls;
- `items`, each with `id`, `icon`, `title`, `description`, `action`, and `href`;
- `accentColor` and `deepColor` for each brand's card and control states.

The component applies those colors through local CSS custom properties. No slots, render callbacks, separate card variants, or feature-specific carousel CSS are needed: both product pages use the same card hierarchy and behavior.

## Boundaries

The change applies only to landing-page section two. It does not change product routes, copy, assets, or the mobile/reduced-motion content order.

## Validation

Add a focused behavior test for the shared controller's item selection math, then run `pnpm lint` and `pnpm build` from the repository root.
