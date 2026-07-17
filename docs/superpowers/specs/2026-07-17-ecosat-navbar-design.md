# Ecosat landing navbar

## Scope

Add a static, floating navbar to the Spanish and English landing routes. It establishes the first shared landing-page frame without inventing product routes, section content, or contact actions.

## Structure

- Position the header 20px below the viewport edge inside the page layout.
- Use a white surface, a 1px `--line` border, and a 12px radius.
- Link the supplied official horizontal Ecosat logo to the active locale homepage.
- Keep a 1px divider after the logo and an open middle area for future, approved navigation destinations.
- Place the existing ES and EN locale links at the right. The active locale has a visible Ecosat-blue underline.

## Responsive behavior

- Desktop logo cap: 150px wide.
- Narrow-screen logo cap: 118px wide.
- Header minimum height: 72px.
- Locale links retain 44px minimum hit areas.
- The complete horizontal lockup remains at every width. Do not crop it, recreate its text in HTML, or add an unapproved symbol-only substitute.

## Implementation boundaries

- Copy the approved PNG into a self-hosted public asset path.
- Render the header on the existing locale landing page as a server component.
- Reuse the existing locale messages and `next/link` routing.
- Do not add a hamburger menu, dropdown, CTA, phone number, product links, or client-side state. Those require approved destinations or actions.

## Accessibility and validation

- Give the logo link an accessible Ecosat label and retain the existing locale-navigation label.
- Preserve the global 2px visible focus treatment and reduced-motion behavior.
- Verify at 360px and desktop widths that neither lockup nor locale controls overflow.
- Run `pnpm lint` and `pnpm build` from the repository root.
