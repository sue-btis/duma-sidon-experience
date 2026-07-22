# Sidón conversation band design

## Goal

Align Sidón landing section four with Integración landing section three because both lead visitors to a commercial conversation.

## Approved design

Replace Sidón's centered conversation block with the same two-column conversion-band composition used by Integración's `projectBand`.

- The left column contains the existing Sidón conversation eyebrow and title.
- The right column contains the existing conversation lead and action.
- The action preserves its current URL, query parameters, and accessible label behavior.
- Styling uses the existing Sidón brand tokens and retains the current responsive single-column layout on narrow screens.

## Scope limits

Do not add project-scope examples, new Sidón claims, new routes, or shared abstractions. Integración's scope examples are specific to its content and have no approved Sidón equivalent.

## Validation

Run `pnpm lint` and `pnpm build` from the repository root. Manually verify `/es/sidon/` and `/en/sidon/` at desktop and mobile widths, including keyboard focus and reduced-motion behavior.
