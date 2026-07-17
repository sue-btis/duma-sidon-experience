## Project-specific rules

- Follow the repository-level `AGENTS.md` for scope, architecture, security, and validation.
- This app is statically exported; do not use request-time features such as route handlers, cookies, redirects, or `proxy.ts`.
- Keep locale routes in `src/app/[locale]` and call `setRequestLocale` before using `next-intl` translations in static pages or layouts.
- Keep page files thin: compose feature presentation and call application code there; do not place business rules or external-service calls in routes or components.
- Before custom UI markup, check whether shadcn already provides the component. Use the configured `@/components/ui` imports and semantic design tokens.
