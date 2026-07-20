## Project-specific rules

- Follow the repository-level `AGENTS.md` for scope, architecture, security, and validation.
- This app is statically exported; do not use request-time features such as route handlers, cookies, redirects, or `proxy.ts`.
- Keep locale routes in `src/app/[locale]` and call `setRequestLocale` before using `next-intl` translations in static pages or layouts.
- Keep page files thin: route files own routing concerns and compose modules from `src/features/{feature}`. Feature UI, data, and behavior stay with their feature even when only one route consumes them.
- Add `domain`, `application`, `infrastructure`, or `presentation` subfolders only when the feature has code that needs those seams; do not scaffold them in advance.
- Before custom UI markup, check whether shadcn already provides the component. Use the configured `@/components/ui` imports and semantic design tokens.
