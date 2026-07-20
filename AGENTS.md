# Ecosat Brand Presence

## Scope

- This is a public, static, TypeScript branding site. Do not add an API, database, authentication, CMS, analytics, contact form, or chart library without an approved requirement.
- `apps/web` is the only active application. `apps/api` is reserved for a confirmed future backend.
- Product-family routes, product content, contact actions, visual assets, charts, and motion preferences are pending. Never invent them or add placeholders that imply they exist.

## Architecture

- Use Next.js App Router with static export. Keep routes build-time known; the supported launch routes are `/es/` and `/en/`.
- Organize application code by feature under `apps/web/src/features/{feature}/`. Files under `apps/web/src/app/` define routes: they handle route parameters, locale setup, metadata, and feature composition, but do not own feature implementation.
- Keep components server-rendered by default. Add `"use client"` only to the smallest interactive leaf.
- `next-intl` uses locale-prefixed routes with `es` as default. Add messages by feature under `apps/web/src/i18n/messages/{locale}/` and register each module in `apps/web/src/i18n/messages.ts`.
- Use modular hexagonal boundaries when a feature has real logic: `domain` contains pure types and rules, `application` contains use cases, `infrastructure` contains external adapters, and `presentation` contains React components. Dependencies point inward; routes compose modules but do not contain business logic.
- Do not scaffold empty layers. A static content section may stay a small feature-local component and data file until it needs a domain rule, use case, or external adapter.
- A feature may initially serve one route; reuse is not required for feature ownership. Do not move feature UI into a route-private `_components` folder solely because it currently has one route consumer.
- Treat shadcn as the default UI building block: inspect existing components first, then use `pnpm dlx shadcn@latest docs <component>` before adding one through its CLI. Prefer its component variants and Tailwind semantic tokens over custom primitives or raw color utilities.
- Keep feature-specific UI in its feature module. Extract shared UI only after two real consumers need it.

## Security

- Keep assets and scripts self-hosted. Do not add third-party origins, embeds, fonts, analytics, or trackers without approval and a corresponding CSP update.
- Nginx owns production response headers in `apps/web/nginx.conf`. Do not weaken or remove them without explaining and validating the change.
- Never commit secrets. Use `.env.example` only for documented, non-secret variable names when configuration is actually required.

## Validation

- Use pnpm with Node 24 LTS from the repository root.
- Before handoff, run `pnpm lint` and `pnpm build`. For Docker changes, run `docker build --file apps/web/Dockerfile --tag ecosat-web:local .`.
- Update `CONTEXT.md` when domain terminology changes. Add an ADR only for consequential, hard-to-reverse architectural decisions.
