# Home Worlds Convergence

## Goal

Replace the current Home worlds circuit with a clearer final scene where the Integración and Sidón particle worlds visibly converge to form Ecosat.

## Composition

- Keep the existing section heading, lead, world labels, descriptions, actions, links, and closing trust statement in both locales.
- Place the purple Integración particle world on the left and the green Sidón particle world on the right at desktop widths.
- Center the official Integración and Sidón marks inside their respective worlds.
- Place the official horizontal Ecosat logo between the worlds as the visual result of their connection.
- Use the established light background, thin orbital lines, and existing brand tokens. Do not add new assets, dependencies, routes, or copy.

## Motion

- Reuse `LetterWorldsCanvas` with its existing `physical` and `digital` variants for the two side worlds.
- Reuse the Home scene observer and its `is-active` state to trigger the reveal once when the section enters the viewport.
- Send restrained glyph and dot streams from both worlds toward the center.
- Reveal a dotted, particle-like Ecosat silhouette first, then resolve it into the complete official logo.
- Keep the completed Ecosat logo visible. The side worlds may continue their existing slow rotation.
- Do not make content, navigation, or meaning depend on the animation.
- Under `prefers-reduced-motion`, render the completed composition immediately and suppress the particle travel and assembly.

## Responsive Behavior

- Keep the three-part narrative in the semantic order Integración, Ecosat, Sidón.
- At narrow widths, stack those three elements vertically and remove connecting effects that would obscure text or require horizontal space.
- Keep both world links keyboard accessible with visible focus and approximately 44 by 44 CSS pixel targets.
- Prevent the canvases and particle decoration from receiving pointer or assistive-technology focus.

## Implementation Boundary

- Limit production changes to the Home feature unless a verified renderer defect blocks reuse.
- Do not rewrite or extend the shared particle renderer for this composition.
- Prefer the existing official images in `apps/web/public/home/worlds/` and `apps/web/public/brand/`.
- Use CSS masking and the existing scene state for the one-time logo assembly; no additional client controller is required.

## Validation

- Run `pnpm lint` and `pnpm build` from the repository root.
- Visually check `/es/` and `/en/` at desktop and mobile widths.
- Confirm the Integración and Sidón logos appear inside the correct colored worlds, all existing labels and links remain, and the Ecosat logo assembles only once per page visit.
- Confirm the completed static composition is present with reduced motion enabled.
- Confirm keyboard focus remains visible and no section content overlaps or causes horizontal overflow.
