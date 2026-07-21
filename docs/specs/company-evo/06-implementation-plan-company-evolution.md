# Multi-Agent Implementation Plan

## 1. Planning Baseline
| Field | Value |
|---|---|
| Repository root(s) | `sue-btis/duma-sidon-experience` (active application root: `apps/web`) |
| Planned base commit(s) | `ce34b9d6e2a52ebfe7cdb38083e8b3236bc8d9c7` on `master`; local working-tree state is unknown and must be verified before any write-capable work |
| Frozen spec | `05-spec-company-evolution-codex-implementation-brief.md` — **status not verified as Approved** because the document contains no approval/frozen-status marker. Plan-local `REQ-*`, `AC-*`, and `TST-*` labels below map existing clauses only; they do not add requirements. |
| Focused audit | `01-audit-company-evolution-focused-audit.md` |

## 2. Rules for Codex
- Implement only frozen requirements assigned by this plan.
- Gate 0 may materialize frozen contracts but may not redefine, extend, reinterpret, or replace them.
- Agents may read only relevant context and may write only their explicit write sets.
- Generated files, migrations, project files, and lockfiles require explicit ownership.
- Unrelated working-tree changes must not be reset, cleaned, restored, overwritten, or reformatted.
- The integration owner must inspect the actual diff and rerun combined checks.

## 3. Recommended Execution Strategy
Choose one:

- Do not implement yet

Reason:
The supplied specification cannot be verified as `Approved for implementation`, the audited local working-tree state is unknown, and five implementation-affecting decisions remain unresolved: canonical bare-route behavior, approval to add GSAP/ScrollTrigger, test framework selection, approved Spanish copy, and the final CTA destination. Gate 0 is not allowed to make these decisions. Parallelization is therefore unsafe, and even sequential implementation would risk encoding unapproved behavior. After the spec is explicitly marked Approved, the decisions are recorded, and the base commit/local changes are revalidated, regenerate this plan. The expected post-approval topology is isolated worktrees for provably disjoint stage-visual files, with all orchestration, CSS, package, lockfile, i18n-registry, test-configuration, and Nginx changes remaining single-owner integration work.

## 4. Dependency Graph

### True Dependencies
| ID | Dependency | Why It Must Precede Other Work | Unlocks |
|---|---|---|---|
| D-001 | Explicit `Approved for implementation` status on the frozen specification | The first planning instruction requires verified approval; no write-capable work may rely on an unapproved brief | All implementation and Gate 0 work |
| D-002 | Record decisions for bare `/mocks/company-evolution/`, GSAP dependency, unit/E2E test stack, Spanish copy, and CTA destination | Each decision changes owned files, acceptance behavior, dependencies, or user-facing content; Gate 0 may not decide them | Exact workstream write sets, commands, and acceptance mapping |
| D-003 | Revalidate repository root, `master` base SHA, and local working-tree overlap | The audit used an immutable remote snapshot and cannot prove a clean local tree; worktrees and ownership must branch from a known baseline | Worktree creation and safe diff attribution |
| D-004 | Frozen stage contract: eight IDs, indices, progress windows, shared visual props, and progress helper signatures | Stage visuals, progress rail, localized content, tests, and central orchestration must consume one consistent contract | Independent stage-visual work and deterministic stage tests |
| D-005 | Approved dependency/test manifest changes and regenerated lockfile | GSAP imports and any selected unit/E2E tests cannot install or run before manifest and lockfile synchronization | Animation work, automated tests, Docker frozen install |
| D-006 | Static localized page composition and all semantic stage content | The frozen sequence requires static readability before animation and accessibility cannot be verified against absent content | Sticky orchestration, reduced-motion equivalence, content/browser tests |
| D-007 | All stage visuals plus central progress/path/signal orchestration | Responsive, reverse-scroll, cleanup, resize, final convergence, and browser acceptance depend on the complete integrated experience | Full viewport and production validation |
| D-008 | Integration-owner diff inspection and combined merge | Disjoint branch checks do not prove the combined static export, lockfile, i18n registry, Nginx behavior, or animation lifecycle | Final verification and independent audit |

### Artificial Dependencies Removable by Gate 0
| ID | Current Coupling | Frozen Contract Artifact That Removes It | Unlocked Workstreams |
|---|---|---|---|
| A-001 | Eight stage-visual implementers would otherwise wait for the orchestration component to define IDs and props | Frozen `EvolutionStageId`, stage index/progress table, and a common stage-visual props interface copied directly from the approved spec | Separate stage-visual files in isolated worktrees |
| A-002 | Route/localization work would otherwise wait for animated components to settle their content shape | Frozen localized content interface and exact translation-key manifest derived from the approved hero, eight stages, summary, rail labels, and CTA clauses | Locale JSON creation and thin server-route composition |
| A-003 | Pure helper tests would otherwise wait for the sticky UI | Frozen progress test-input table containing the eight specified global-progress-to-active-stage examples | Progress-helper implementation and unit-test authoring |

## 5. Gate 0 — Frozen Contract Materialization

### Required?
No

Gate 0 is disabled in the current state because approval and implementation-affecting decisions are missing. A Gate 0 owner cannot lawfully materialize contracts from an unapproved source or choose the missing route, dependency, testing, copy, or CTA behavior. After decision closure, the regenerated plan may make Gate 0 optional if isolated stage-visual work remains beneficial; otherwise a single sequential contract owner should create the frozen types and helpers in Wave 1.

### Goal
No files may be materialized in the current state. Verify approval, decisions, and baseline without modifying the repository.

### Contract Artifacts
None.

### May Read
- `05-spec-company-evolution-codex-implementation-brief.md`
- `01-audit-company-evolution-focused-audit.md`
- `AGENTS.md`
- `apps/web/AGENTS.md`
- `package.json`
- `apps/web/package.json`
- `pnpm-lock.yaml`
- `apps/web/src/i18n/**`
- `apps/web/nginx.conf`
- repository-root `git status`, `git diff`, and `git rev-parse` output

### May Edit
- None.

### Must Not Edit
- All repository paths.
- The supplied specification and audit.
- Any package manifest, lockfile, translation file, route, feature file, test file, generated output, Docker file, or Nginx configuration.

### Steps
1. Confirm the specification contains an explicit `Approved for implementation` status and immutable source identifier or commit reference.
2. Record the approved decisions for bare-route delivery, GSAP, test tools, Spanish content, and CTA destination.
3. From the repository root, record `git rev-parse --show-toplevel`, `git branch --show-current`, `git rev-parse HEAD`, `git status --short`, and scoped diffs for every proposed write path.
4. Compare the live repository conventions and dependency state with the audit; report drift rather than adapting the plan silently.
5. Regenerate this plan with exact approved test-config paths, commands, worktree branches, and write sets.

### Checks
- `git rev-parse --show-toplevel`
- `git branch --show-current`
- `git rev-parse HEAD`
- `git status --short`
- `git diff -- apps/web/src/app/[locale]/mocks/company-evolution apps/web/src/features/company-evolution apps/web/src/i18n/messages.ts apps/web/src/i18n/messages/en/company-evolution.json apps/web/src/i18n/messages/es/company-evolution.json apps/web/package.json pnpm-lock.yaml apps/web/nginx.conf`
- Manual inspection that the approved spec records all five decisions.

### Acceptance Criteria
- Exact pass condition: the specification is explicitly Approved, all five decisions are recorded, the repository root and base SHA are confirmed, and no unowned user change overlaps a proposed write set.

### Stop Conditions
- The specification remains unapproved or lacks an immutable approved revision.
- Any required decision remains missing or contradictory.
- `HEAD` differs from the planned base commit without a new audit or plan refresh.
- Local changes overlap any planned file or directory.
- Repository conventions differ materially from the focused audit.

## 6. Ownership Map
| Agent / Workstream | Mode | Repository | Assigned REQ IDs | May Read | May Edit | Integration-Reserved | Must Not Edit | Depends On | Output Evidence |
|---|---|---|---|---|---|---|---|---|---|
| Preflight Verifier | read-only verification | `sue-btis/duma-sidon-experience` | REQ-001–REQ-017 (read-only traceability) | Spec, audit, Git metadata, all proposed write paths, `AGENTS.md` files, manifests, i18n, Nginx | None | All proposed write paths | Entire repository | D-001, D-002, D-003 | Approval record, decision record, base SHA, branch, `git status --short`, overlap report |
| Contract and Progress Owner | planned write-capable; **blocked** | `sue-btis/duma-sidon-experience` | REQ-003, REQ-004, REQ-015 | Approved spec; audit; existing home motion precedents; global tokens; TypeScript config | `apps/web/src/features/company-evolution/types/evolution.ts`; `apps/web/src/features/company-evolution/data/evolution-stages.ts`; `apps/web/src/features/company-evolution/lib/stage-progress.ts`; `apps/web/src/features/company-evolution/lib/stage-progress.test.ts` | `apps/web/package.json`; `pnpm-lock.yaml`; test configuration; central experience; CSS; i18n registry | All other paths, especially `apps/web/src/features/home/**`, globals, layout, routing, Nginx | D-001–D-005 | Contract diff, progress-window table, helper test results |
| Static Page and Localization Owner | planned write-capable; **blocked** | `sue-btis/duma-sidon-experience` | REQ-001, REQ-002, REQ-012, REQ-013, REQ-014, REQ-017 | Approved copy/CTA decision; locale route precedents; button component; design tokens; contract files | `apps/web/src/app/[locale]/mocks/company-evolution/page.tsx`; `apps/web/src/features/company-evolution/components/CompanyEvolutionHero.tsx`; `apps/web/src/features/company-evolution/components/IntegratedCapabilities.tsx`; `apps/web/src/features/company-evolution/components/CompanyEvolutionCta.tsx`; `apps/web/src/i18n/messages/en/company-evolution.json`; `apps/web/src/i18n/messages/es/company-evolution.json` | `apps/web/src/i18n/messages.ts`; `apps/web/src/features/company-evolution/components/CompanyEvolutionExperience.tsx`; package/lockfile; Nginx; test configuration | Existing locale/layout/routing files; global CSS; home feature; unrelated translations | D-001–D-006 | Both locale JSONs, thin page diff, static DOM/content evidence |
| Stage Visuals A Owner | planned write-capable; **blocked** | `sue-btis/duma-sidon-experience` | REQ-005, REQ-006 | Frozen stage contract; CSS tokens; SVG precedents; stage clauses 1–4 | `apps/web/src/features/company-evolution/components/stages/RadioVisual.tsx`; `apps/web/src/features/company-evolution/components/stages/AntennaVisual.tsx`; `apps/web/src/features/company-evolution/components/stages/NetworkVisual.tsx`; `apps/web/src/features/company-evolution/components/stages/CctvVisual.tsx` | Common props, central orchestration, CSS Module, manifests, tests | All other stage files and all shared/integration files | D-001–D-005, A-001 | Four isolated SVG component diffs and component-level inspection evidence |
| Stage Visuals B Owner | planned write-capable; **blocked** | `sue-btis/duma-sidon-experience` | REQ-005, REQ-006, REQ-007 | Frozen stage contract; CSS tokens; SVG precedents; stage clauses 5–8 | `apps/web/src/features/company-evolution/components/stages/AccessControlVisual.tsx`; `apps/web/src/features/company-evolution/components/stages/FireDetectionVisual.tsx`; `apps/web/src/features/company-evolution/components/stages/SoftwareVisual.tsx`; `apps/web/src/features/company-evolution/components/stages/IndustrialVisual.tsx` | Common props, central orchestration, CSS Module, manifests, tests | All other stage files and all shared/integration files | D-001–D-005, A-001 | Four isolated SVG component diffs and final-scene visual inventory |
| Experience Orchestration Owner | planned write-capable; **blocked** | `sue-btis/duma-sidon-experience` | REQ-002, REQ-004, REQ-005, REQ-007, REQ-008, REQ-009, REQ-010, REQ-011, REQ-014, REQ-017 | All approved feature contracts and stage visuals; motion/CSS precedents; globals; accessibility clauses | `apps/web/src/features/company-evolution/components/CompanyEvolutionExperience.tsx`; `apps/web/src/features/company-evolution/components/EvolutionViewport.tsx`; `apps/web/src/features/company-evolution/components/EvolutionPath.tsx`; `apps/web/src/features/company-evolution/components/EvolutionSignal.tsx`; `apps/web/src/features/company-evolution/components/EvolutionStageContent.tsx`; `apps/web/src/features/company-evolution/components/EvolutionStageVisual.tsx`; `apps/web/src/features/company-evolution/components/EvolutionProgressRail.tsx`; `apps/web/src/features/company-evolution/components/EvolutionBackground.tsx`; `apps/web/src/features/company-evolution/components/ReducedMotionExperience.tsx`; `apps/web/src/features/company-evolution/hooks/useEvolutionTimeline.ts`; `apps/web/src/features/company-evolution/hooks/useReducedMotion.ts`; `apps/web/src/features/company-evolution/hooks/useElementVisibility.ts`; `apps/web/src/features/company-evolution/company-evolution.module.css` | Package/lockfile; i18n registry; route; locale JSONs; test configuration; Nginx | Home feature, global CSS, layout, routing, next config, unrelated files | D-001–D-007 | Central diff, one-progress-source trace, cleanup evidence, responsive/reduced-motion inspection |
| Test Author / Independent Verifier | planned read-only until test decision; **blocked** | `sue-btis/duma-sidon-experience` | REQ-015 | Approved test decision; complete combined feature; acceptance clauses; manifests | None in current plan. Exact test/config write paths require regenerated plan after test-stack approval. | All test configuration, package/lockfile, application files | Entire repository in current plan | D-001–D-008 | Requirement-to-test report, command outputs, browser matrix, console/hydration report |
| Integration Owner — Main Codex Thread | planned integration; **blocked** | `sue-btis/duma-sidon-experience` | REQ-001–REQ-017 | All workstream diffs and repository contracts | Only after regenerated approval plan: `apps/web/src/i18n/messages.ts`; `apps/web/package.json`; `pnpm-lock.yaml`; approved test config/project files; `apps/web/nginx.conf` if bare-route redirect is approved; conflict-resolution edits inside already-owned feature files after consulting owner | Same files | Unrelated files; security headers; global layout/routing; home feature; generated build output | D-001–D-008 | Actual diff inspection, ownership audit, combined command outputs, final requirement matrix |

## 7. Generated, Migration, Project, and Lockfile Ownership
| File / Pattern | Owner | When It May Change | Validation |
|---|---|---|---|
| `pnpm-lock.yaml` | Integration Owner — Main Codex Thread | Once, after all approved `apps/web/package.json` dependency/script changes are final; never edited manually | `pnpm install`; `pnpm install --frozen-lockfile`; inspect importer diff; Docker frozen install |
| `apps/web/package.json` | Integration Owner — Main Codex Thread | Only after GSAP and test-tool decisions are approved; combine all dependency/script edits before lockfile regeneration | JSON inspection; `pnpm install`; lint/typecheck/build |
| Approved unit/E2E project configuration | Integration Owner — Main Codex Thread | Only after the test framework and exact config paths are recorded in a regenerated plan | Framework config validation and selected test commands |
| `apps/web/.next/**`, `apps/web/out/**`, `apps/web/coverage/**`, `*.tsbuildinfo`, browser artifacts | Tool-generated; no source owner | May be produced locally by checks but must not be edited or committed unless an approved repository policy explicitly requires an artifact | `git status --short`; ensure generated outputs are ignored/uncommitted |
| Migrations | None | No migrations are required or permitted for this static frontend feature | Verify no migration/database files changed |

## 8. Execution Waves

## Wave 1 — Approved Static, Localized, Testable Vertical Slice

### Goal and Assigned Acceptance
- Requirements: REQ-001, REQ-002, REQ-003, REQ-012, REQ-013, REQ-014, REQ-015, REQ-016, REQ-017
- Acceptance criteria: AC-001, AC-002, AC-009, AC-010, AC-013, AC-014, AC-015

### Runtime Prerequisites
| Prerequisite | Required Before | Validation Command | If Missing |
|---|---|---|---|
| Approved spec and five decision records | Wave 1 | Manual immutable-source inspection | Stop; do not create files |
| Confirmed repository root, branch, base SHA, and non-overlapping local tree | Wave 1 | `git rev-parse --show-toplevel && git branch --show-current && git rev-parse HEAD && git status --short` | Stop and report stale/overlapping baseline |
| Node.js `24.x`, Corepack, pnpm `11.5.0` | First install or build check, not preflight | `node --version && corepack --version && pnpm --version` | Mark verification blocked; do not substitute package managers |
| Registry access and synchronized approved manifest/lockfile | Dependency install | `pnpm install --frozen-lockfile` | Stop package-dependent work; report exact failure |
| Approved unit-test framework | Test-authoring workstream | Approved framework version/command from regenerated plan | Stop test edits; do not invent a framework |

### Workstreams

#### Agent A — Contract, Stage Model, and Progress Math
- **Mode:** planned write-capable; blocked until D-001–D-005 pass
- **Repository:** `sue-btis/duma-sidon-experience`
- **Assigned requirements:** REQ-003, REQ-004, REQ-015
- **May read:** approved spec; focused audit; `apps/web/src/features/home/CoreOpening.tsx`; `apps/web/src/features/home/MapExperience.tsx`; `apps/web/src/app/globals.css`; TypeScript/test configuration
- **May edit:** `apps/web/src/features/company-evolution/types/evolution.ts`; `apps/web/src/features/company-evolution/data/evolution-stages.ts`; `apps/web/src/features/company-evolution/lib/stage-progress.ts`; `apps/web/src/features/company-evolution/lib/stage-progress.test.ts`
- **Integration-reserved files:** `apps/web/package.json`; `pnpm-lock.yaml`; all test config; `apps/web/src/i18n/messages.ts`
- **Must not edit:** orchestration components; CSS; route; translations; home feature; global CSS; Nginx; generated output
- **Steps:**
  1. Copy the eight stage IDs, indices, narrative verbs, and exact start/focus/end values from the approved spec without changing semantics.
  2. Implement `clamp01`, `normalizeProgress`, `stageVisibility`, and `getActiveStageIndex` as pure helpers.
  3. Add the approved focused tests for boundary behavior and the eight specified progress examples.
  4. Export only the minimal frozen contract required by consumers.
- **Checks:**
  - `pnpm --filter web exec tsc --noEmit`
  - `NOT DEFINED — stop and regenerate the plan after unit-test-stack approval; target file: apps/web/src/features/company-evolution/lib/stage-progress.test.ts`
- **Required evidence:**
  - Diff showing exact stage windows and no localized copy embedded in animation code unless the approved contract explicitly requires it.
  - Test output for `0.02`, `0.18`, `0.31`, `0.44`, `0.57`, `0.70`, `0.83`, and `0.95` mappings.
- **Stop conditions:**
  - Stage contract or active-stage tie-breaking remains ambiguous.
  - Test framework/path is not approved.
  - A required implementation would modify a reserved file.

#### Agent B — Localized Static Page and Semantic Content
- **Mode:** planned write-capable; blocked until approved Spanish copy and CTA destination exist
- **Repository:** `sue-btis/duma-sidon-experience`
- **Assigned requirements:** REQ-001, REQ-002, REQ-012, REQ-013, REQ-014, REQ-017
- **May read:** locale page precedents; `apps/web/src/i18n/**`; button component; approved content; contract files; design tokens
- **May edit:** `apps/web/src/app/[locale]/mocks/company-evolution/page.tsx`; `apps/web/src/features/company-evolution/components/CompanyEvolutionHero.tsx`; `apps/web/src/features/company-evolution/components/IntegratedCapabilities.tsx`; `apps/web/src/features/company-evolution/components/CompanyEvolutionCta.tsx`; `apps/web/src/i18n/messages/en/company-evolution.json`; `apps/web/src/i18n/messages/es/company-evolution.json`
- **Integration-reserved files:** `apps/web/src/i18n/messages.ts`; `apps/web/src/features/company-evolution/components/CompanyEvolutionExperience.tsx`; manifests; lockfile; test config; Nginx
- **Must not edit:** `[locale]/layout.tsx`; `i18n/routing.ts`; global CSS; existing translation namespaces; home feature; `next.config.ts`
- **Steps:**
  1. Create the thin locale-aware server route using existing `setRequestLocale` and translation-loading conventions.
  2. Implement hero, semantic summary, and CTA as server-renderable components.
  3. Add approved English and Spanish content for hero, eight stages, integrated summary, progress labels, and CTA.
  4. Keep all meaningful content in HTML and preserve logical stage order.
- **Checks:**
  - `pnpm --filter web exec tsc --noEmit`
  - `pnpm lint`
  - `pnpm build`
  - Manual static DOM inspection for all eight titles in `/es/...` and `/en/...`
- **Required evidence:**
  - Thin-page diff.
  - Translation parity inspection.
  - Static HTML/content capture for both locale routes.
- **Stop conditions:**
  - Spanish copy or CTA destination is not approved.
  - The route requires modifying global locale contracts.
  - Bare-route behavior is being implemented without the approved deployment decision.

#### Agent C — Static Experience Shell and Reduced-Motion Reading Path
- **Mode:** planned write-capable; blocked until Agent A contract and Agent B content shape are available
- **Repository:** `sue-btis/duma-sidon-experience`
- **Assigned requirements:** REQ-002, REQ-009, REQ-010, REQ-014
- **May read:** approved contracts and locale props; existing CSS/motion precedents; accessibility clauses
- **May edit:** `apps/web/src/features/company-evolution/components/CompanyEvolutionExperience.tsx`; `apps/web/src/features/company-evolution/components/ReducedMotionExperience.tsx`; `apps/web/src/features/company-evolution/company-evolution.module.css`
- **Integration-reserved files:** package/lockfile; route; translations; i18n registry; Nginx; test config
- **Must not edit:** stage visual files; home feature; global CSS; layout/routing; manifests
- **Steps:**
  1. Compose the four page areas without requiring animation for comprehension.
  2. Implement a normal-flow reduced-motion timeline showing all stages in order.
  3. Establish CSS ownership, responsive no-overflow baseline, semantic headings, focus visibility, and decorative SVG accessibility rules.
  4. Do not add sticky trapping or GSAP behavior in this wave.
- **Checks:**
  - `pnpm --filter web exec tsc --noEmit`
  - `pnpm lint`
  - `pnpm build`
  - Manual `prefers-reduced-motion: reduce` inspection
- **Required evidence:**
  - Static/reduced-motion screenshots or DOM snapshots at `1440×900`, `1024×768`, and `390×844`.
  - Evidence that all stages and CTA are visible without animation.
- **Stop conditions:**
  - Required CSS changes conflict with another owner.
  - Reduced-motion content diverges from normal content.
  - A global token change appears necessary without approval.

### Wave 1 Integration Gate
- **Integration owner:** Main Codex thread — Integration Owner
- **May edit:** only `apps/web/src/i18n/messages.ts`, approved manifest/lockfile/test-config files, and conflict-resolution lines inside Wave 1 owned files after inspecting owner diffs
- **Must inspect:** actual combined diff, ownership compliance, contract consistency
- **Checks:**
  - `pnpm install --frozen-lockfile`
  - `pnpm lint`
  - `pnpm --filter web exec tsc --noEmit`
  - `NOT DEFINED — stop and regenerate after unit-test-stack approval`
  - `pnpm build`
  - Manual both-locale static and reduced-motion inspection
- **Completion criteria:** REQ-001/002/003/009/010/012/013/014/015/016/017 mapped to AC-001/002/009/010/013/014/015 and TST-001/002/003/004/007/008/009; no Wave 2 work begins until all pass
- **Stop conditions:** spec/decision drift; unowned diff; failed translation parity; build/static-generation failure; manifest-lockfile mismatch; test stack not approved

## Wave 2 — Continuous Signal, Eight Visuals, Responsive Animation, and Production Acceptance

### Goal and Assigned Acceptance
- Requirements: REQ-004, REQ-005, REQ-006, REQ-007, REQ-008, REQ-009, REQ-010, REQ-011, REQ-015, REQ-016, REQ-017
- Acceptance criteria: AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010, AC-011, AC-012, AC-013, AC-014, AC-015

### Runtime Prerequisites
| Prerequisite | Required Before | Validation Command | If Missing |
|---|---|---|---|
| Wave 1 integrated and green | All Wave 2 work | Wave 1 Integration Gate evidence | Stop; do not build on partial contracts |
| Approved GSAP/ScrollTrigger dependency in synchronized manifest/lockfile | Orchestration owner | `pnpm why gsap` and frozen install | Stop animation work; do not substitute native motion without spec amendment |
| Browser with DevTools and reduced-motion emulation | Manual/browser verification | Environment inspection | Mark browser verification blocked |
| Approved E2E framework and browser binaries | Automated browser tests | Approved framework install/version command | Stop E2E authoring; do not invent tooling |
| Docker | Production bare-route validation only | `docker version` | Mark production-route verification blocked; do not claim AC-001 complete |

### Workstreams

#### Agent D — Stage Visuals 1–4
- **Mode:** planned write-capable in isolated worktree after contract freeze
- **Repository:** `sue-btis/duma-sidon-experience`
- **Assigned requirements:** REQ-005, REQ-006
- **May read:** approved stage contract; CSS token interface; spec stage clauses 1–4; SVG precedents
- **May edit:** `apps/web/src/features/company-evolution/components/stages/RadioVisual.tsx`; `apps/web/src/features/company-evolution/components/stages/AntennaVisual.tsx`; `apps/web/src/features/company-evolution/components/stages/NetworkVisual.tsx`; `apps/web/src/features/company-evolution/components/stages/CctvVisual.tsx`
- **Integration-reserved files:** all common props/barrels; CSS Module; orchestration; manifests; lockfile; tests
- **Must not edit:** any other file
- **Steps:**
  1. Implement procedural inline SVG for Radio, Antenna, Network, and CCTV using the frozen common props.
  2. Keep decorative SVG `aria-hidden`; expose no meaningful copy in SVG text.
  3. Use only transforms, opacity, stroke-dash properties, and approved local visual effects.
  4. Export each component directly without editing shared barrel files.
- **Checks:**
  - `pnpm --filter web exec tsc --noEmit`
  - `pnpm lint`
  - Component diff inspection for no remote assets or independent progress sources
- **Required evidence:**
  - Four-file diff.
  - Visual inventory matching each frozen stage clause.
- **Stop conditions:**
  - Frozen props are insufficient.
  - A shared file edit is required.
  - Visual behavior would add a separate progress controller or external asset.

#### Agent E — Stage Visuals 5–8 and Integrated Final Scene
- **Mode:** planned write-capable in isolated worktree after contract freeze
- **Repository:** `sue-btis/duma-sidon-experience`
- **Assigned requirements:** REQ-005, REQ-006, REQ-007
- **May read:** approved stage contract; CSS token interface; spec stage clauses 5–8; SVG precedents
- **May edit:** `apps/web/src/features/company-evolution/components/stages/AccessControlVisual.tsx`; `apps/web/src/features/company-evolution/components/stages/FireDetectionVisual.tsx`; `apps/web/src/features/company-evolution/components/stages/SoftwareVisual.tsx`; `apps/web/src/features/company-evolution/components/stages/IndustrialVisual.tsx`
- **Integration-reserved files:** all common props/barrels; CSS Module; orchestration; manifests; lockfile; tests
- **Must not edit:** any other file
- **Steps:**
  1. Implement procedural inline SVG for Access Control, Fire Detection, Software, and Industrial Systems.
  2. Ensure the Industrial visual has frozen inputs for all prior nodes/capabilities and does not imply replacement.
  3. Keep decorative SVG `aria-hidden` and avoid dashboard/3D scope creep.
  4. Export each component directly without editing shared barrel files.
- **Checks:**
  - `pnpm --filter web exec tsc --noEmit`
  - `pnpm lint`
  - Component diff inspection for all seven prior capabilities in final composition
- **Required evidence:**
  - Four-file diff.
  - Final-scene inventory showing communications, network, CCTV, access, fire, software, and industrial infrastructure.
- **Stop conditions:**
  - Final-scene inputs are not frozen.
  - A shared file edit is required.
  - The design requires Three.js, remote assets, or new copy.

#### Agent F — Central Timeline, Path, Signal, Responsive, and Lifecycle
- **Mode:** planned write-capable; single owner; starts after both stage-visual branches are available for read/integration
- **Repository:** `sue-btis/duma-sidon-experience`
- **Assigned requirements:** REQ-004, REQ-005, REQ-007, REQ-008, REQ-009, REQ-010, REQ-011, REQ-014, REQ-017
- **May read:** all Wave 1 feature files; all eight stage visuals; GSAP package API; existing motion/CSS precedents
- **May edit:** `apps/web/src/features/company-evolution/components/CompanyEvolutionExperience.tsx`; `apps/web/src/features/company-evolution/components/EvolutionViewport.tsx`; `apps/web/src/features/company-evolution/components/EvolutionPath.tsx`; `apps/web/src/features/company-evolution/components/EvolutionSignal.tsx`; `apps/web/src/features/company-evolution/components/EvolutionStageContent.tsx`; `apps/web/src/features/company-evolution/components/EvolutionStageVisual.tsx`; `apps/web/src/features/company-evolution/components/EvolutionProgressRail.tsx`; `apps/web/src/features/company-evolution/components/EvolutionBackground.tsx`; `apps/web/src/features/company-evolution/components/ReducedMotionExperience.tsx`; `apps/web/src/features/company-evolution/hooks/useEvolutionTimeline.ts`; `apps/web/src/features/company-evolution/hooks/useReducedMotion.ts`; `apps/web/src/features/company-evolution/hooks/useElementVisibility.ts`; `apps/web/src/features/company-evolution/company-evolution.module.css`
- **Integration-reserved files:** manifests; lockfile; route; translation registry/files; Nginx; test config
- **Must not edit:** individual stage visual files; home feature; global CSS; layout/routing; next config; unrelated files
- **Steps:**
  1. Create one main ScrollTrigger and one normalized progress source.
  2. Drive path completion, signal position, node states, stage content, stage visuals, rail, and background from that source without React renders per frame.
  3. Use one responsive SVG path strategy, recalculate length after debounced/observed resize, and clean all GSAP contexts/triggers/observers on unmount.
  4. Implement desktop/tablet/mobile layouts with no horizontal overflow and a separate normal-flow reduced-motion branch.
  5. Preserve completed nodes and activate all prior capabilities in the Industrial final state.
  6. Add no optional Three.js work in this plan.
- **Checks:**
  - `pnpm --filter web exec tsc --noEmit`
  - `pnpm lint`
  - Manual forward/reverse scroll, resize, route navigation, and reduced-motion checks
  - Browser performance inspection for per-frame React commits and layout thrashing
- **Required evidence:**
  - Trace from the one normalized progress source to every consumer.
  - Cleanup evidence showing no orphaned ScrollTrigger after navigation.
  - Viewport captures at `1440×900`, `1024×768`, and `390×844`.
  - Final integrated-scene capture.
- **Stop conditions:**
  - More than one independent progress controller becomes necessary.
  - Responsive behavior requires changing global layout/routing.
  - Stage branches conflict with frozen props.
  - Cleanup, reverse scrolling, or reduced-motion behavior cannot be made deterministic.

#### Agent G — Read-Only Acceptance Verification
- **Mode:** read-only verification
- **Repository:** `sue-btis/duma-sidon-experience`
- **Assigned requirements:** REQ-001–REQ-017
- **May read:** complete combined worktree, approved spec/audit, command output, browser console, generated static output
- **May edit:** None
- **Integration-reserved files:** All files
- **Must not edit:** Entire repository
- **Steps:**
  1. Inspect the actual combined diff against ownership and forbidden paths.
  2. Execute approved unit, route/content, reduced-motion, responsive, browser, lint, typecheck, build, Docker, and curl checks.
  3. Map every result to REQ/AC/TST IDs and report failures without fixing them.
- **Checks:**
  - All commands in Section 11
- **Required evidence:**
  - Independent requirement matrix, command logs, browser console report, viewport evidence, route headers, and changed-file ownership report.
- **Stop conditions:**
  - Any write is requested.
  - Combined diff contains unowned or unrelated changes.
  - Required tooling is unavailable; mark the exact verification blocked rather than simulating it.

### Wave 2 Integration Gate
- **Integration owner:** Main Codex thread — Integration Owner
- **May edit:** `apps/web/src/i18n/messages.ts`; `apps/web/package.json`; `pnpm-lock.yaml`; exact approved test config/project files; `apps/web/nginx.conf` only when the bare-route redirect decision explicitly authorizes it; conflict-resolution edits within already-owned company-evolution files after owner diff inspection
- **Must inspect:** actual combined diff, ownership compliance, contract consistency
- **Checks:**
  - `pnpm install --frozen-lockfile`
  - `pnpm lint`
  - `pnpm --filter web exec tsc --noEmit`
  - `NOT DEFINED — stop and regenerate after unit-test-stack approval`
  - `NOT DEFINED — stop and regenerate after E2E-stack approval`
  - `pnpm build`
  - `docker build --file apps/web/Dockerfile --tag ecosat-web:local .`
  - `docker run --rm -d --name ecosat-web-local -p 8080:8080 ecosat-web:local`
  - `curl -I http://localhost:8080/mocks/company-evolution/`
  - `curl -I http://localhost:8080/es/mocks/company-evolution/`
  - `curl -I http://localhost:8080/en/mocks/company-evolution/`
  - `docker rm -f ecosat-web-local`
- **Completion criteria:** REQ-001–REQ-017 and AC-001–AC-015 have passing TST-001–TST-010 evidence; actual diff contains only owned/approved paths; no console errors, hydration warnings, horizontal overflow, clipped content, orphaned animation, remote assets, external 3D dependency, or unrelated refactor
- **Stop conditions:** any unapproved decision or dependency; manifest/lockfile drift; Nginx security-header changes; failed combined command; missing browser evidence; unowned conflict resolution; local/base drift

## 9. Single-Agent Fallback Order
1. Verify explicit approval, decision closure, base SHA, branch, and local overlap; stop immediately if any precondition fails.
2. Sequentially implement the frozen stage contract, progress helpers, and approved unit tests.
3. Add approved dependencies/scripts through the manifest and regenerate the lockfile once.
4. Implement English/Spanish messages, static hero/summary/CTA, and the thin localized route; register the namespace.
5. Implement the static experience shell and dedicated reduced-motion normal-flow path; run Wave 1 checks.
6. Implement stage visuals in order: Radio, Antenna, Network, CCTV, Access Control, Fire Detection, Software, Industrial.
7. Implement the single ScrollTrigger, responsive path/signal/nodes/content/rail/background orchestration, resize handling, and cleanup.
8. Add only the approved test files/configuration and execute unit, route/content, reduced-motion, responsive, and browser checks.
9. Apply the approved bare-route Nginx redirect, if required, without changing security headers.
10. Inspect the full diff, run all combined checks, and produce the expected execution report.

Reason:
This order preserves every true dependency, avoids pretending unavailable subagents exist, keeps shared hotspots under one owner, and ensures static content/accessibility are proven before animation. It is the required fallback when isolated worktrees, exact contract boundaries, or approved test tooling are unavailable.

## 10. Requirement Execution Matrix
| Requirement ID | Gate / Wave | Implementation Owner | Integration Owner | Acceptance IDs | Test IDs |
|---|---|---|---|---|---|
| REQ-001 — Locale routes plus approved bare-route behavior | Blocked preflight; Wave 1/2 after approval | Static Page Owner; Integration Owner for Nginx | Main Codex Thread | AC-001, AC-013, AC-015 | TST-001, TST-009, TST-010 |
| REQ-002 — Four-area semantic page structure and thin server route | Wave 1 | Static Page Owner; Experience Owner | Main Codex Thread | AC-002, AC-009, AC-013, AC-015 | TST-002, TST-004, TST-008, TST-009 |
| REQ-003 — Eight-stage frozen model and ordered content | Wave 1 | Contract Owner; Static Page Owner | Main Codex Thread | AC-002, AC-005, AC-006 | TST-002, TST-003 |
| REQ-004 — One normalized progress source and one main ScrollTrigger | Wave 2 | Experience Orchestration Owner | Main Codex Thread | AC-004, AC-011, AC-012, AC-014 | TST-003, TST-006, TST-008 |
| REQ-005 — Continuous SVG path, signal, completion path, and eight nodes | Wave 2 | Stage Visual Owners; Experience Owner | Main Codex Thread | AC-003, AC-004, AC-005 | TST-006 |
| REQ-006 — Eight procedural inline SVG stage visuals | Wave 2 | Stage Visuals A/B Owners | Main Codex Thread | AC-002, AC-010 | TST-002, TST-006 |
| REQ-007 — Final industrial ecosystem preserves all prior capabilities | Wave 2 | Stage Visuals B Owner; Experience Owner | Main Codex Thread | AC-005, AC-006 | TST-002, TST-006 |
| REQ-008 — Desktop/tablet/mobile behavior with no overflow/clipping | Wave 2 | Experience Orchestration Owner | Main Codex Thread | AC-007 | TST-005, TST-006 |
| REQ-009 — Dedicated reduced-motion normal-flow path | Wave 1/2 | Experience Orchestration Owner | Main Codex Thread | AC-008, AC-009 | TST-004, TST-006 |
| REQ-010 — Semantic/accessibility requirements | Wave 1/2 | Static Page Owner; Experience Owner | Main Codex Thread | AC-009, AC-013 | TST-002, TST-004, TST-005, TST-006 |
| REQ-011 — Performance, resize, GSAP lifecycle, and route cleanup | Wave 2 | Experience Orchestration Owner | Main Codex Thread | AC-011, AC-012, AC-014 | TST-006, TST-008 |
| REQ-012 — Approved English/Spanish feature namespace and registry | Wave 1 Integration | Static Page Owner; Integration Owner | Main Codex Thread | AC-001, AC-002, AC-013 | TST-001, TST-002, TST-009 |
| REQ-013 — Integrated summary and valid approved CTA destination | Wave 1 | Static Page Owner | Main Codex Thread | AC-009, AC-013 | TST-002, TST-005 |
| REQ-014 — Existing design system, SVG-first scope, self-hosting, no external 3D/assets/backend | Wave 1/2 | All implementation owners | Main Codex Thread | AC-010, AC-013, AC-015 | TST-006, TST-007, TST-009 |
| REQ-015 — Automated and manual test coverage mapped to acceptance | Wave 1/2 | Approved Test Author; Read-Only Verifier | Main Codex Thread | AC-011, AC-012, AC-014 | TST-001–TST-010 |
| REQ-016 — Approved dependencies, scripts, project files, and synchronized lockfile | Wave 1/2 Integration | Integration Owner | Main Codex Thread | AC-014 | TST-007, TST-008, TST-009, TST-010 |
| REQ-017 — No unrelated refactors or forbidden-path changes | All gates/waves | Every owner | Main Codex Thread | AC-013, AC-015 | TST-007, TST-008, TST-009, TST-010 |

## 11. Final Verification
| Command / Check | Covers | Required Environment | Evidence |
|---|---|---|---|
| Approval/decision/base/local-overlap inspection | D-001–D-003; REQ-001–REQ-017 preconditions | Approved source, Git repository | Approval marker, decision log, SHA/branch/status output |
| `pnpm install --frozen-lockfile` | REQ-016; AC-014 | Node 24.x, Corepack, pnpm 11.5.0, registry | Successful frozen-install log |
| `pnpm lint` | REQ-010, REQ-014, REQ-017; AC-013–AC-015 | Installed dependencies | Exit code and full lint summary |
| `pnpm --filter web exec tsc --noEmit` | REQ-003–REQ-016; AC-014 | Installed dependencies | Exit code and TypeScript output |
| `NOT DEFINED — stop and regenerate after unit-test-stack approval` | REQ-003, REQ-004, REQ-015; TST-003 | Approved unit-test stack | Test report with eight mapping examples and helper boundaries |
| `NOT DEFINED — stop and regenerate after test-stack approval` | REQ-001, REQ-002, REQ-003, REQ-012, REQ-013; TST-001, TST-002 | Approved test stack | Both locale routes and all eight titles passing |
| `NOT DEFINED — stop and regenerate after test-stack approval` | REQ-009, REQ-010; TST-004 | Approved browser/component stack | All stages visible; no sticky trap; equivalent content |
| `NOT DEFINED — stop and regenerate after E2E-stack approval` at `1440×900`, `1024×768`, `390×844` | REQ-005–REQ-011, REQ-015; TST-005, TST-006 | Approved E2E stack and browser binaries | Screenshots/traces; zero overflow/clipping/overlap/hidden CTA; zero console/hydration/animation errors |
| Manual forward/reverse scroll, resize, route navigation, reduced-motion, and React performance inspection | REQ-004, REQ-008, REQ-009, REQ-011; AC-004, AC-007, AC-008, AC-011, AC-012 | Browser DevTools | Inspection notes, performance trace, cleanup evidence |
| `pnpm build` | REQ-001, REQ-012, REQ-014, REQ-016; AC-001, AC-013, AC-014 | Installed dependencies | Successful Next static-export log; generated locale paths |
| `docker build --file apps/web/Dockerfile --tag ecosat-web:local .` | REQ-001, REQ-014, REQ-016; TST-010 | Docker | Successful frozen-build/image log |
| Run container and curl bare, Spanish, and English routes | REQ-001; AC-001; TST-001, TST-010 | Docker, port 8080 | HTTP status/location headers for all three routes |
| `git diff --check` and actual combined `git diff --stat`/file inspection | REQ-017; AC-015 | Git | Clean whitespace check and owner-attributed changed-file list |
| Independent read-only requirement matrix | REQ-001–REQ-017; AC-001–AC-015; TST-001–TST-010 | Completed combined worktree | Pass/fail/blocked report with evidence references |

## 12. Global Stop Conditions
- Frozen spec and repository contradict each other.
- A required decision is missing.
- An agent must write outside its ownership set.
- Two write-capable workstreams collide on a non-integration-owned file.
- A generated file, migration, project file, or lockfile lacks an owner.
- The planned base commit or relevant files changed enough to make the plan stale.
- Existing user changes overlap the selected write set.
- A required security, tenant, permission, compatibility, or contract behavior is ambiguous.

## 13. Expected Execution Report
The implementation report must include baseline, topology, actual agents used, changed files by owner, requirement status, validation evidence, integration work, deviations, blockers, and whether independent audit can start.
