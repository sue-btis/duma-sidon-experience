# Global CSS alignment

## Scope

Replace the inherited shadcn grayscale theme in `apps/web/src/app/globals.css` with the approved light Ecosat design system. This is a stylesheet-only change.

## Tokens

- Map shadcn's active semantic tokens to the shared neutral surface and Ecosat connector colors defined in `DESIGN.md`.
- Add semantic tokens for Integracion, Sidon, and Duma. Components use these roles rather than raw brand colors.
- Keep the existing radius scale compatible with the button component, capped at the documented 16px UI maximum.
- Remove unused dark-mode, chart, and sidebar theme tokens. The current source uses none of them.

## Base behavior

- Define the approved self-hosted-safe font stacks without external font requests.
- Set a light color scheme, accessible Ecosat focus outline, selection treatment, and default surface/ink colors.
- Apply balanced heading wrapping, pretty prose wrapping, and the required reduced-motion fallback.

## Validation

Run `pnpm lint` and `pnpm build` from the repository root. Confirm that the existing button variants retain valid Tailwind tokens and that no removed chart/sidebar/dark token is referenced in `apps/web/src`.
