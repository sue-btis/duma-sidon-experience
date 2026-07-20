# Home worlds circuit

## Goal

Replace the final home section with an explorable circuit that presents Ecosat as the always-visible connector between Integracion, the physical world, and Sidon, the digital world.

## Layout and interaction

- Desktop uses one connected blue route: Ecosat in the center, Integracion on the left, Sidon on the right, then the closing statement below.
- Ecosat is fully visible from the initial render. Integracion and Sidon begin as restrained circular buttons.
- Selecting either world expands only its own details. Both worlds may remain expanded at once.
- An expanded world shows its title treatment and supporting dots behind the title. The control remains keyboard operable, has a visible focus state, and exposes its expanded state.
- A small number of blue dots loop along the route through Ecosat, both worlds, and the closing statement. The route and dots remain present after either world is selected.
- With reduced motion, the route and its dots are static while all details and controls remain available.
- On small screens the same sequence becomes vertical: Ecosat, Integracion, Sidon, closing statement.

## Content and assets

- Use the official supplied Ecosat, Integracion, and Sidon logo PNGs.
- Keep the existing localized detail labels and descriptions.
- Each detail row accepts an official PNG when supplied. Do not invent icons, imagery, claims, or placeholder logo treatments for the pending PNGs.

## Implementation boundary

- Keep the feature in `apps/web/src/features/home/`.
- Use a minimal client-side interactive leaf for the two disclosure buttons; the page and translated content stay server-rendered.
- Use CSS and SVG for the route and animated dots. No new dependency or route is required.

## Validation

- Verify mouse, keyboard, and touch activation for each world.
- Verify the route persists while either or both detail lists are open.
- Verify English and Spanish layouts at desktop and mobile widths.
- Run `pnpm lint` and `pnpm build` after implementation.
