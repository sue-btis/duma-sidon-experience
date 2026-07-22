# Home proof status separation

## Scope

Clarify the distinction between the two existing horizontal logo bands in the home page's industries scene. Preserve the current two-column composition and its responsive single-column layout.

## Design

- Replace the Spanish client heading with `Clientes que confían en Ecosat para operaciones que no pueden detenerse.` The partners heading remains `Socios tecnológicos`.
- Insert a single 1px vertical divider between the columns on desktop.
- At the existing mobile breakpoint, switch the divider to a horizontal rule between the stacked groups.

## Constraints

- Reuse existing home feature markup and design tokens.
- Do not add cards, dependencies, content, or motion.
- Keep the existing logo marquees, headings, and translations unchanged.

## Validation

Run `pnpm lint` and `pnpm build`. Check desktop and mobile layouts, keyboard focus on both logo bands, and `prefers-reduced-motion` behavior.
