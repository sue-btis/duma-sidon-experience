# Route Letter Worlds

## Goal

Carry the animated letter-world visual from the Home opening into the opening scene of the Integración and Sidón routes.

## Design

- Reuse the existing `LetterWorldsCanvas` renderer instead of adding another visual component or asset.
- Allow the renderer to display one world using a selected existing palette.
- Integración displays one purple letter world using the established Integración colors.
- Sidón displays one green letter world using the established Sidón colors.
- The world sits behind the existing route logo, heading, lead, and metadata, replacing the current two-orbit intro artwork.
- Both intro scenes use the Home opening base background, `#fbfdff`.
- All content, navigation, copy, and later page sections remain unchanged.

## Responsive and Motion Behavior

- The world scales within the intro viewport without causing horizontal overflow.
- Existing reduced-motion behavior remains intact: the renderer draws a static frame when reduced motion is requested.
- The canvas remains decorative and hidden from assistive technology.

## Validation

- Run `pnpm lint` and `pnpm build` from the repository root.
- Visually check `/es/integracion/`, `/en/integracion/`, `/es/sidon/`, and `/en/sidon/` at desktop and mobile widths.
- Confirm each intro uses the correct brand palette, matches Home's opening background, keeps text readable, and has no overflow.
