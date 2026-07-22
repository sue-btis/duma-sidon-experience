# Integración scope comparison design

## Goal

Make the existing scope examples clarify the difference between a specific need and a broader coordinated project without changing approved copy.

## Approved design

- Keep the existing Spanish and English project copy unchanged.
- Retain the two existing examples and their seven-node model.
- Make the specific-need example visibly restrained, with one active node receiving a subtle pulse.
- Make the broader-project example show its four existing active nodes lighting in a short, staggered sequence.
- Use existing Integración colors and CSS only. The reduced-motion mode shows the final static state.

## Scope limits

Do not add new claims, labels, icons, libraries, client-side JavaScript, or shared components.

## Validation

Run `pnpm lint` and `pnpm build`. Check the desktop and narrow layouts, including the reduced-motion state.
