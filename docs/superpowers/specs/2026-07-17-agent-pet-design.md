# Agent pet design

## Goal

Provide a portable, self-contained animated pet pack based on the supplied
green-and-black character artwork. It must render the five requested agent
states and provide a local Next.js demo at `/es/pet/` and `/en/pet/`.

## Scope and boundaries

- The pack lives in `apps/web/src/features/agent-pet/` so it can be copied to
  another React or Next.js project as one unit.
- It contains generated animation assets, `pet.manifest.json`, the normalized
  generation specification, `AgentPet.tsx`, `agent-pet.css`, `preview.html`,
  and `validation-report.json`.
- The public API is `<AgentPet state={state} variant="auto" size={192} />`.
- No API, database, analytics, or new frontend dependency is added.
- The supplied artwork is the canonical visual reference. Generated strips
  must preserve its palette, proportions, face, three-segment body, and three
  green orbiting spheres.

## States and variants

| Semantic state | Animation | Variants | Timing |
| --- | --- | --- | --- |
| `idle` | breathing and blink/look | `breathe`, `blink-look` | 12 FPS |
| `working` | reading a book | `read`, `turn-page` | 16 FPS |
| `waiting` | patient and attentive | `patient`, `attention` | 12 FPS |
| `success` | celebration | `celebrate` | 16 FPS |
| `error` | concerned reaction | `concern` | 16 FPS |

`variant="auto"` rotates non-repetitively between the two variants for the
long-running `idle`, `working`, and `waiting` states. The generated body
frames contain only the pet pose; orbital spheres, breathing, shadow, and
state glow are procedural CSS effects. This keeps orbit paths fluid and avoids
per-frame identity drift.

## Runtime integration

`AgentPet` takes a semantic `AgentPetState`, not animation frame names. A
feature-local mapping translates confirmed agent events to those states:

- idle-like event -> `idle`
- tool work -> `working`
- user input or approval required -> `waiting`
- completed -> `success`
- failed -> `error`

The current static site has no agent event source. The demo is therefore the
only initial event emitter; it sends the same semantic events the future agent
integration will consume. No backend protocol is presumed.

## Demo route

The locale route `/[locale]/pet/` renders a client-side demo shell containing
the pet and controls to emit each state. It includes an automatic sequence so
the transitions, automatic long-state variants, and procedural orbits are
visible without manual interaction. Existing locale landing routes remain
unchanged.

## Generation and validation

Use the hatch-fluid-web-pet workflow: eight-keyframe horizontal strips, one
local in-between frame, 256px transparent canvas, bottom-center anchor, and
flow interpolation when locally available (otherwise blend). Build animated
WebP files and PNG spritesheets from every strip.

Run strict pack validation and inspect its preview. A failed state is repaired
only by regenerating that state strip, then rebuilding and revalidating. Final
application checks are `pnpm lint` and `pnpm build` from the repository root.

## Acceptance criteria

- The pack contains every requested artifact and all five states.
- `idle`, `working`, and `waiting` each have two selectable variants.
- The working animation visibly reads or turns a book page.
- Orbits remain smooth independently of the body animation.
- `/es/pet/` and `/en/pet/` render the demo and its state controls.
- The component is usable from another React/Next project by copying the
  feature folder and its referenced assets.
