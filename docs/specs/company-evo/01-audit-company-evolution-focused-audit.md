# Focused Audit Report

## 1. Repository Baseline
| Field | Value |
|---|---|
| Repository root | `sue-btis/duma-sidon-experience` (active application root: `apps/web`) |
| Branch | `master` — repository default branch; no alternate audit branch was supplied |
| Commit SHA | `ce34b9d6e2a52ebfe7cdb38083e8b3236bc8d9c7` |
| Working-tree state | **Unknown.** The audit used an immutable GitHub remote snapshot. GitHub does not expose the user's local uncommitted changes; this must not be interpreted as a clean working tree. |
| Relevant pre-existing changes | No open pull requests or commit status checks were visible. The audited HEAD adds `docs/superpowers/specs/2026-07-20-core-02-03-design.md`; that commit changes documentation only and does not add the company-evolution route or runtime implementation. |
| Audit date | `2026-07-21` (`America/Monterrey`) |

## 2. Problem Restatement
At the audited commit, the repository does not implement the `company-evolution-codex-implementation-brief(3).md` experience. Neither `/mocks/company-evolution` nor the repository-native locale routes `/es/mocks/company-evolution/` and `/en/mocks/company-evolution/` have a page, feature module, translations, animation dependency, or behavioral tests.

The repository-grounded implementation is a new, self-contained, locale-aware feature under `apps/web/src/features/company-evolution/`, composed by a thin App Router page under `apps/web/src/app/[locale]/mocks/company-evolution/page.tsx`. It must use the existing Tailwind 4, CSS-variable, shadcn, typography, localization, static-export, accessibility, and security conventions.

The work is not a correction to an existing company-evolution component. It is a missing vertical slice with four integration decisions:

1. how bare `/mocks/company-evolution/` reaches the default locale in a static export;
2. whether adding `gsap` and `ScrollTrigger` is an approved dependency change;
3. which test framework, if any, may be introduced;
4. what approved Spanish copy and final CTA destination should be used.

## 3. Relevant Files
| File | Why It Matters | Evidence | Confidence |
|---|---|---|---|
| `AGENTS.md` | Repository-wide scope, architecture, dependency, security, and validation rules | Declares `apps/web` as the only active app; requires feature ownership, thin routes, server rendering by default, self-hosted assets, pnpm, Node 24, `pnpm lint`, and `pnpm build` | High |
| `apps/web/AGENTS.md` | Application-specific routing and static-export constraints | Requires locale routes under `src/app/[locale]`, `setRequestLocale`, thin pages, and forbids request-time redirects, route handlers, cookies, and `proxy.ts` | High |
| `package.json` | Workspace runtime and root commands | Pins `pnpm@11.5.0`, Node `24.x`, and exposes root `dev`, `lint`, and `build` scripts | High |
| `pnpm-workspace.yaml` | Workspace boundary | Includes `apps/*`; confirms `apps/web` is a workspace package | High |
| `apps/web/package.json` | Current framework, dependencies, and available scripts | Next.js 16.2.10, React 19.2.4, TypeScript, Tailwind 4, next-intl, shadcn; no GSAP or test framework; scripts are only `dev`, `build`, `start`, and `lint` | High |
| `pnpm-lock.yaml` | Generated dependency contract and shared merge hotspot | Direct importer list matches `apps/web/package.json`; no direct GSAP or test dependency is registered | High |
| `apps/web/next.config.ts` | Build and route delivery model | Uses `output: "export"` and `trailingSlash: true`; the page must be statically generatable | High |
| `apps/web/src/app/[locale]/layout.tsx` | Locale route entry and static parameters | Validates `es`/`en`, calls `setRequestLocale`, and generates static locale params | High |
| `apps/web/src/app/[locale]/page.tsx` | Canonical thin-page composition pattern | Resolves locale and translations on the server, then composes feature-owned UI | High |
| `apps/web/src/app/[locale]/pet/page.tsx` | Existing isolated mock/demo route pattern | Shows a locale-aware thin route passing translated labels into an interactive feature | High |
| `apps/web/src/i18n/routing.ts` | Locale contract | Supported locales are `es` and `en`; default locale is `es` | High |
| `apps/web/src/i18n/request.ts` | Server-side message loading | Loads registered locale message modules through `getMessages` | High |
| `apps/web/src/i18n/messages.ts` | Shared translation registry | Every new namespace must be registered for both `es` and `en` | High |
| `apps/web/src/app/globals.css` | Existing visual and accessibility tokens | Defines brand colors, semantic tokens, typography, focus-visible behavior, and a global reduced-motion fallback | High |
| `apps/web/components.json` | UI-system contract | Configures RSC-compatible shadcn, CSS variables, Lucide, and `@/components/ui` aliases | High |
| `apps/web/src/components/ui/button.tsx` | Existing CTA primitive | Provides the repository-standard semantic button variants | High |
| `apps/web/src/features/home/CoreOpening.tsx` | Current sticky-scroll lifecycle precedent | Uses a small client component, refs, passive scroll/resize listeners, RAF smoothing, reduced-motion detection, and cleanup | High |
| `apps/web/src/features/home/MapExperience.tsx` | Current SVG and scroll-controlled scene precedent | Uses inline SVG markup, clamped progress, stage thresholds, RAF, reduced-motion behavior, and event cleanup | High |
| `apps/web/src/features/home/home-experience.module.css` | Current responsive sticky-section and CSS Module precedent | Uses `svh`, sticky viewports, `overflow: clip`, responsive breakpoints, and feature-local reduced-motion rules | High |
| `apps/web/Dockerfile` | Production build path | Installs with frozen lockfile, builds static output, and copies `apps/web/out` into Nginx | High |
| `apps/web/nginx.conf` | Production route resolution and security headers | Redirects only `/` to `/es/`; all other paths use exact static-file lookup and return 404 when absent | High |
| `CONTEXT.md` | Public brand terminology and color ownership | Requires Ecosat blue as the dominant identity on company-level surfaces and reserves Integración/Sidón colors for contextual identity | High |

## 4. Current Behavior Trace
1. A request to `/mocks/company-evolution/` reaches the static Nginx server.
2. Nginx redirects only the exact root path `/`; it does not rewrite `/mocks/company-evolution/` to `/es/mocks/company-evolution/`.
3. The static server looks for a matching generated file or directory and returns 404 because no unprefixed route is generated.
4. A request to `/es/mocks/company-evolution/` or `/en/mocks/company-evolution/` enters the locale route tree, but no `mocks/company-evolution/page.tsx` exists, so no static page is generated.
5. No `company-evolution` feature, stage model, SVG path, continuous signal, reduced-motion experience, translations, GSAP dependency, or tests exist.
6. Observed output: the framed experience is unavailable; the relevant paths resolve to not found rather than rendering the requested mock.

## 5. Actual Problem Location
The problem originates from an absent feature slice, not from a defect in the existing home experience.

The primary missing entry point is:

```text
apps/web/src/app/[locale]/mocks/company-evolution/page.tsx
```

The primary missing implementation boundary is:

```text
apps/web/src/features/company-evolution/
```

Cross-cutting integration is additionally required in:

```text
apps/web/src/i18n/messages.ts
apps/web/src/i18n/messages/en/company-evolution.json
apps/web/src/i18n/messages/es/company-evolution.json
apps/web/package.json
pnpm-lock.yaml
```

The bare-path requirement is outside the feature itself. Under the current static architecture it can only be satisfied by either:

- generating a separate unprefixed static route, which conflicts with the repository's locale-route convention; or
- adding a deployment-layer Nginx redirect, which makes `apps/web/nginx.conf` an explicitly approved integration change.

No evidence supports modifying `HomeExperience`, `CoreOpening`, `MapExperience`, the existing map asset, or the home translation modules.

## 6. Minimal Change Surface
| Area/File | Change Needed | Risk | Evidence |
|---|---|---|---|
| `apps/web/src/app/[locale]/mocks/company-evolution/page.tsx` | Create a thin async server page; resolve locale, call `setRequestLocale`, load the feature namespace, and compose the feature | Low | Existing home and pet routes use this pattern |
| `apps/web/src/features/company-evolution/**` | Add the stage model, pure progress helpers, semantic page sections, client animation boundary, inline SVG visuals, responsive layout, progress rail, and dedicated reduced-motion rendering | Medium | Repository requires feature ownership; brief requires a complete SVG-first vertical slice |
| `apps/web/src/features/company-evolution/company-evolution.module.css` | Keep all experience-specific layout, effects, responsive rules, and reduced-motion overrides locally scoped | Medium | Existing home experience uses CSS Modules and semantic global variables |
| `apps/web/src/i18n/messages/en/company-evolution.json` | Add approved English content for the hero, eight stages, summary, progress labels, and CTA | Low | Message modules are feature-scoped |
| `apps/web/src/i18n/messages/es/company-evolution.json` | Add approved Spanish equivalent content | Medium | Spanish is the default locale, but the brief supplies only English copy |
| `apps/web/src/i18n/messages.ts` | Register the new namespace for both locales | Medium | Shared registry is required by `getMessages` |
| `apps/web/package.json` | Add `gsap` if the brief's required technology is approved | Medium | GSAP is absent from the current direct dependencies |
| `pnpm-lock.yaml` | Regenerate through pnpm after dependency changes | High | Shared generated lockfile; frequent merge-conflict surface |
| New test files and optional test config | Add progress-mapping, route/content, reduced-motion, responsive, and browser coverage only after selecting a test stack | High | No existing unit or E2E test framework is configured |
| `apps/web/nginx.conf` | Optional: add a narrowly scoped redirect from `/mocks/company-evolution/` to `/es/mocks/company-evolution/` | Medium | Current Nginx redirects only `/`; app-level redirects are unavailable in static export |
| Existing global/home files | **No change required** | Low | Existing tokens and motion patterns are sufficient as read-only references |

## 7. Existing Tests and Gaps
| Test File / Command | What It Covers | Gap |
|---|---|---|
| `pnpm lint` | ESLint core-web-vitals and TypeScript lint rules for `apps/web` | Does not execute route, animation, accessibility, responsive, or reduced-motion behavior |
| `pnpm build` | Next.js production build and static export; catches many type, import, and static-generation failures | Does not prove scroll behavior, stage mapping, browser cleanup, visual overflow, or content visibility |
| `pnpm --filter web exec tsc --noEmit` | Direct strict TypeScript validation using the existing `tsconfig.json` and TypeScript dependency | No repository script currently aliases this command |
| `docker build --file apps/web/Dockerfile --tag ecosat-web:local .` | Frozen dependency installation, production build, static-output packaging, and Nginx image assembly | Does not verify runtime route redirects or browser interaction unless the image is also run and exercised |
| Existing unit tests | None found | No coverage for `clamp01`, normalized progress, stage visibility, active-stage mapping, or resize/path calculations |
| Existing route/content tests | None found | No assertion that both locale routes render all eight capability titles |
| Existing E2E/browser tests | None found | No Playwright/Cypress coverage for console errors, hydration warnings, reverse scrolling, resize, reduced motion, or viewport matrix |
| Existing CI checks | None reported for the audited commit | No automated gate currently enforces lint, build, tests, or browser verification |

## 8. Shared Contracts and Boundaries
| Contract / Boundary | Current Shape and Evidence | Consumers | Stability Risk |
|---|---|---|---|
| Locale route contract | Routes live under `src/app/[locale]`; only `es` and `en` are valid; `es` is default | All public pages and static output | High |
| Static-export contract | `output: "export"`, trailing slashes, and Nginx `try_files` require every application route to exist as generated static output | Next build, Docker image, Nginx deployment | High |
| Translation-module contract | `messages.ts` maps every namespace for both locales; server pages load translations and pass data into client leaves | Every localized feature | Medium |
| Feature ownership contract | Route files own routing; feature code owns UI, data, and behavior; client boundaries must be minimal | All application features | Medium |
| Design-system contract | Tailwind 4 semantic variables, shadcn RSC components, Lucide, global typography, and focus-visible behavior | All UI | Medium |
| Brand contract | Ecosat blue dominates company-level surfaces; Integración and Sidón colors are secondary contextual accents | Home and future company-level pages | Medium |
| Motion lifecycle contract | Existing features use clamped progress, reduced-motion detection, passive listeners, RAF, and cleanup; the brief additionally requires one ScrollTrigger and GSAP cleanup | Interactive features and route navigation | High |
| Dependency contract | `apps/web/package.json` and root `pnpm-lock.yaml` must remain synchronized under pnpm 11.5.0 | Local development, CI, Docker build | High |
| Asset/security contract | Assets and scripts are self-hosted; production CSP blocks third-party origins; no remote images or external 3D assets should be required | Browser runtime and Nginx | High |
| Backend/data/schema contracts | None found. The site is static and the brief explicitly excludes backend endpoints | None | Low |
| Migrations | None found | None | Low |

## 9. Candidate Ownership Areas
| Candidate Workstream | May Read | Candidate Write Set | Why It Can Be Separated | Conflict Risk |
|---|---|---|---|---|
| Stage contract and progress math | Brief; `globals.css`; existing scroll components | `features/company-evolution/types/**`, `data/**`, `lib/**`, focused unit tests | Pure data and functions can be completed before presentation and frozen as a shared contract | Low |
| Stage-specific SVG visuals | Frozen stage visual props; brand tokens | `features/company-evolution/components/stages/*.tsx` | Each stage can be implemented in a separate file after the common props and SVG conventions are fixed | Low |
| Experience orchestration and animation | Stage contract; all stage visuals; current motion precedents | `CompanyEvolutionExperience.tsx`, viewport/path/signal/content/progress components, animation hook, feature CSS Module | Owns the single progress source and must coordinate all layers; should have one primary owner | High |
| Route and localization integration | Route patterns; i18n registry; approved copy | Locale page, two new message JSON files, `src/i18n/messages.ts` | Mostly independent of SVG implementation when the content shape is frozen | Medium |
| Dependency and test integration | Package manifests; lockfile; selected test framework | `apps/web/package.json`, `pnpm-lock.yaml`, test config, shared setup | Shared generated/config files should be edited sequentially by an integration owner | High |
| Production bare-route behavior | `next.config.ts`, `nginx.conf`, Dockerfile | Prefer only `apps/web/nginx.conf` if explicitly approved | Deployment routing is independent of feature rendering but affects production acceptance | Medium |

Parallel implementation is reasonable only after the stage data shape, component props, CSS ownership, translation keys, and GSAP decision are frozen. The orchestration/CSS work and all package/lockfile edits should remain single-owner.

## 10. Merge and Generated-File Hotspots
| File / Area | Why It Is a Hotspot | Recommended Control |
|---|---|---|
| `pnpm-lock.yaml` | Generated and repository-wide; changes whenever dependencies or a test stack are added | Single integration owner; regenerate once after manifest changes |
| `apps/web/package.json` | Shared dependency and script surface | Sequential edits; combine GSAP and test-tool decisions before regeneration |
| `apps/web/src/i18n/messages.ts` | Central registry for all feature namespaces | Integration owner; small isolated edit after both locale files exist |
| `apps/web/src/features/company-evolution/company-evolution.module.css` | Most responsive, sticky, reduced-motion, and visual-state rules converge here | One CSS/layout owner; avoid parallel edits |
| `CompanyEvolutionExperience.tsx` / central viewport controller | Coordinates the single normalized progress source and all animated layers | One orchestration owner |
| `apps/web/nginx.conf` | Production route behavior and security headers share one file | Deployment/integration owner; do not alter headers |
| `apps/web/next.config.ts` | Shared static-export contract | Avoid changing unless Nginx cannot satisfy an approved requirement |
| `apps/web/src/app/[locale]/layout.tsx` | Global locale and document boundary | Do not change for this feature |
| `apps/web/.next/`, `apps/web/out/`, `apps/web/coverage/`, `*.tsbuildinfo` | Generated build/test output and explicitly ignored | Never edit or commit |

No migrations or generated API clients were found.

## 11. Build, Test, and Validation Commands
No commands were executed during this connector-based audit. The following commands are repository-grounded and should be executed from the repository root during implementation.

| Command | Purpose | Repository Evidence | Prerequisite |
|---|---|---|---|
| `corepack enable && pnpm install --frozen-lockfile` | Install the exact workspace dependency graph | Dockerfile and root package manager declaration | Node 24.x, Corepack, package-registry access |
| `pnpm lint` | Run the repository lint gate | Root `package.json` and `AGENTS.md` | Dependencies installed |
| `pnpm --filter web exec tsc --noEmit` | Run explicit strict TypeScript checking | `apps/web/tsconfig.json` and TypeScript dev dependency | Dependencies installed |
| `pnpm build` | Produce the Next.js static export and verify static generation | Root scripts, `next.config.ts`, and `AGENTS.md` | Dependencies installed; all locales statically resolvable |
| `pnpm dev` | Manually exercise `/es/mocks/company-evolution/` and `/en/mocks/company-evolution/` | Root scripts | Node 24.x; browser |
| `docker build --file apps/web/Dockerfile --tag ecosat-web:local .` | Validate frozen install, static build, output copy, and Nginx packaging | `AGENTS.md` and Dockerfile | Docker |
| `docker run --rm -p 8080:8080 ecosat-web:local` | Exercise production static routing and any Nginx redirect | Dockerfile and Nginx configuration | Built image; free local port 8080 |
| `curl -I http://localhost:8080/mocks/company-evolution/` | Verify the approved bare-route behavior | Nginx route requirement | Running container |
| `curl -I http://localhost:8080/es/mocks/company-evolution/` | Verify the generated Spanish static route | Locale/static-export contract | Running container |
| `curl -I http://localhost:8080/en/mocks/company-evolution/` | Verify the generated English static route | Locale/static-export contract | Running container |
| `<selected unit-test command>` | Verify progress helpers and stage mapping | Required by brief but absent from repository | Test framework decision and installation |
| `<selected browser-test command>` | Verify viewport matrix, reduced motion, console errors, reverse scroll, and resize | Required by brief but absent from repository | E2E framework and browser binaries |

## 12. Missing Information
- The user's local working-tree state and any uncommitted changes are not observable through the GitHub connector.
- It is not specified whether production must support the exact bare path `/mocks/company-evolution/` or whether `/es/mocks/company-evolution/` is the accepted canonical route.
- If the bare path is mandatory, ownership approval is needed for an Nginx redirect because the statically exported Next application cannot perform a request-time redirect.
- The brief supplies English copy but no approved Spanish copy, despite Spanish being the default locale.
- No test framework is selected or installed. The required unit, route, reduced-motion, responsive, and browser tests cannot be assigned exact commands until this decision is made.
- The brief requires GSAP and ScrollTrigger, but the repository currently has no GSAP dependency and its existing motion code is native. Dependency approval is implicit in the brief but not recorded in repository configuration.
- No production contact route exists. A final CTA must use a real existing internal route/anchor, or its destination must be approved.
- No target browser support policy or device-performance baseline is documented beyond the viewport sizes in the brief.

## 13. Contradictions
- The brief requires `/mocks/company-evolution/` to render or redirect to the default locale. The application is a static export, application-level redirects are forbidden, and Nginx currently redirects only `/`. The requirement is feasible only as an explicitly owned deployment-layer change or a separate nonstandard static route.
- The brief says to add tests using the repository's existing test tools, but the repository has no configured unit or E2E test framework and no test script.
- The brief names GSAP and ScrollTrigger as required technologies, while the repository has no GSAP dependency and the current home-motion specification explicitly favors native scroll progress for that separate feature. This is a dependency and architectural-precedent mismatch, not evidence that the home feature should be refactored.
- The brief permits `#` CTA placeholders, while repository rules prohibit inventing contact actions or placeholders that imply functionality exists. A dead “Talk to our team” action should not be introduced without an approved destination.
- The brief's example fallback palette is dark and cyan, while the repository's company-level brand contract requires Ecosat blue dominance and existing semantic tokens. The brief itself says existing tokens take precedence, so the fallback palette should not be used unchanged.

## 14. Risks
- The localized pages may build successfully while the exact bare acceptance route still returns 404 in the production Nginx image.
- A broad `"use client"` boundary could unnecessarily hydrate the hero, summary, and CTA instead of isolating only the animated viewport.
- Copying the existing RAF components literally would introduce React state updates during animation frames, contrary to the brief's performance requirement.
- Multiple independent progress calculations could desynchronize the signal, path completion, nodes, stage content, progress rail, and background.
- Failing to kill ScrollTrigger instances and resize observers could leave orphaned animation work after route navigation.
- A zero-duration version of the sticky scene could still trap reduced-motion users; the brief requires a separate normal-flow rendering path.
- Desktop SVG geometry simply scaled down could cause clipped text, overlapping stages, or horizontal overflow on mobile.
- Missing or improvised Spanish content could produce locale drift and an incomplete default-language route.
- Concurrent edits to `package.json`, `pnpm-lock.yaml`, `messages.ts`, the central CSS Module, or the viewport controller could produce avoidable merge conflicts.
- Adding remote assets, fonts, video, or external 3D content would violate the CSP and self-hosting contract.
- Overusing SVG filters, blur, or per-frame layout reads could create poor scroll performance on mid-range devices.
- The final scene could accidentally imply that later capabilities replaced earlier ones unless completed stages remain persistent and the industrial scene visibly integrates all prior nodes.
- Without a selected browser-test stack, reverse scrolling, resizing, hydration warnings, cleanup, and reduced-motion behavior may remain manually verified only.

## 15. Do Not Touch
- `apps/web/src/features/home/**` — use only as read-only implementation precedent; the company-evolution mock is a separate feature.
- `apps/web/src/features/home/legacy-dot-map.ts` and existing home/public map assets.
- Existing `home.json`, `common.json`, `navigation.json`, `platform.json`, and module translation files; add a new namespace instead.
- `apps/web/src/app/globals.css` unless a genuinely reusable global token is approved; prefer a feature-local CSS Module and existing variables.
- `apps/web/src/app/[locale]/layout.tsx` and `apps/web/src/i18n/routing.ts`; the current locale contract already supports the canonical localized routes.
- `apps/web/next.config.ts` unless a documented static-export requirement cannot be solved at the deployment layer.
- Security headers in `apps/web/nginx.conf`; any route redirect must leave them unchanged.
- `apps/web/Dockerfile` unless build behavior itself becomes a separately approved requirement.
- `apps/api/**`; the repository declares it reserved and the brief requires no backend.
- `CONTEXT.md` unless approved domain terminology actually changes.
- `AGENTS.md` files and unrelated documentation.
- `apps/web/.next/`, `apps/web/out/`, coverage output, `*.tsbuildinfo`, or other generated files.
- React Three Fiber, Three.js, external GLB models, remote images, videos, a second styling methodology, or a general animation framework; none is required for the minimal SVG-first deliverable.
