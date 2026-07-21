# Codex Implementation Brief: Company Evolution Experience

Implement a polished interactive mock page that presents the company’s technological evolution:

**Radio → Antennas → Networks and Communications → CCTV → Access Control → Fire Detection → Software Solutions → Industrial Systems**

The experience should feel cinematic and technically sophisticated, inspired by premium interactive corporate websites, while remaining performant, maintainable, accessible, and feasible without external 3D assets.

## Primary objective

Create a working mock accessible at:

```text
/mocks/company-evolution
```

The experience must communicate that every capability expanded the previous one. It must not look like the company abandoned one product category and replaced it with another.

The final scene should show all previous capabilities operating as one integrated technological ecosystem.

## Core narrative

The visual story should represent the evolution from a simple transmitted signal into a complete connected industrial system.

Use the following narrative verbs:

```text
Communicate
Extend
Connect
Observe
Control
Protect
Coordinate
Integrate
```

Each verb corresponds to one company capability:

| Stage | Capability | Narrative verb |
|---|---|---|
| 1 | Radio Solutions | Communicate |
| 2 | Antenna Systems | Extend |
| 3 | Networks and Communications | Connect |
| 4 | CCTV and Video Surveillance | Observe |
| 5 | Access Control | Control |
| 6 | Fire Detection and Alarm | Protect |
| 7 | Software Solutions | Coordinate |
| 8 | Industrial Systems | Integrate |

## Operating instructions

Before implementing:

1. Inspect the repository structure.
2. Identify the package manager.
3. Identify whether the project uses `src/`.
4. Identify the current App Router and locale conventions.
5. Reuse the existing typography, layout primitives, theme tokens, utilities, and linting configuration.
6. Do not modify unrelated application behavior.
7. Do not replace the project’s existing design system.
8. Do not introduce a second styling methodology.

If the application uses locale-prefixed routes, implement the experience within the existing locale structure and ensure that navigating to:

```text
/mocks/company-evolution
```

either renders the page directly or redirects to the default locale version.

## Technical scope

Use an SVG-first implementation.

Required technologies:

```text
Next.js App Router
React
TypeScript
GSAP
GSAP ScrollTrigger
SVG
Existing project styling system
```

Optional technologies, only when already installed or clearly justified:

```text
@react-three/fiber
three
@react-three/drei
Lenis
```

Do not require:

```text
Blender
External GLB models
Paid assets
Stock illustrations
Remote image services
Large videos
Custom backend endpoints
```

The mock must be fully functional using procedural SVG, CSS, and basic geometric elements.

## Recommended architecture

Adapt paths to the repository conventions, but prefer a structure similar to:

```text
app/
  mocks/
    company-evolution/
      page.tsx

features/
  company-evolution/
    components/
      CompanyEvolutionExperience.tsx
      EvolutionViewport.tsx
      EvolutionPath.tsx
      EvolutionSignal.tsx
      EvolutionStageContent.tsx
      EvolutionStageVisual.tsx
      EvolutionProgressRail.tsx
      EvolutionBackground.tsx
      ReducedMotionExperience.tsx

      stages/
        RadioVisual.tsx
        AntennaVisual.tsx
        NetworkVisual.tsx
        CctvVisual.tsx
        AccessControlVisual.tsx
        FireDetectionVisual.tsx
        SoftwareVisual.tsx
        IndustrialVisual.tsx

    data/
      evolution-stages.ts

    hooks/
      useEvolutionTimeline.ts
      useReducedMotion.ts
      useElementVisibility.ts

    lib/
      stage-progress.ts

    types/
      evolution.ts
```

If the repository follows feature-based architecture, keep the implementation self-contained inside a `company-evolution` feature.

## Route implementation

The route page should remain a server component when possible.

Example responsibility:

```tsx
import { CompanyEvolutionExperience } from "@/features/company-evolution/components/CompanyEvolutionExperience";

export default function CompanyEvolutionPage() {
  return <CompanyEvolutionExperience />;
}
```

Place client boundaries only around the animated experience.

Do not convert the entire route tree into client components.

## Page structure

Implement the page using four major areas:

```text
1. Introductory hero
2. Sticky evolution experience
3. Integrated capabilities summary
4. Final call to action
```

Suggested semantic structure:

```tsx
<main>
  <CompanyEvolutionHero />
  <CompanyEvolutionExperience />
  <IntegratedCapabilities />
  <CompanyEvolutionCta />
</main>
```

## Introductory hero

The first viewport introduces the concept before the pinned animation begins.

Recommended content:

### Eyebrow

```text
Our evolution
```

### Heading

```text
From signal to intelligent infrastructure
```

### Supporting text

```text
What began with radio communication evolved into integrated systems that connect, monitor, protect, and automate critical operations.
```

### Visual behavior

Show a small luminous point near the lower part of the hero.

It should pulse subtly and become the signal that enters the evolution path when the user scrolls.

Do not immediately expose all eight stages.

## Main evolution experience

The main animation should use a tall scroll container with a sticky viewport.

Recommended desktop structure:

```tsx
<section className="relative h-[750vh]">
  <div className="sticky top-0 h-screen overflow-hidden">
    <EvolutionBackground />
    <EvolutionPath />
    <EvolutionSignal />
    <EvolutionStageVisual />
    <EvolutionStageContent />
    <EvolutionProgressRail />
  </div>
</section>
```

The exact height may be adjusted between:

```text
650vh–850vh
```

Use enough scroll distance for deliberate transitions, but avoid making the experience feel slow.

Recommended mobile height:

```text
450vh–600vh
```

## Scroll progress model

Create one normalized progress value:

```text
0.0 → 1.0
```

Use one `ScrollTrigger` instance for the main section.

Do not create an independent ScrollTrigger for every small decorative element.

Recommended behavior:

```tsx
ScrollTrigger.create({
  trigger: container,
  start: "top top",
  end: "bottom bottom",
  scrub: 0.6,
  onUpdate: ({ progress }) => {
    progressRef.current = progress;
  },
});
```

Avoid React state updates on every scroll frame.

Prefer:

```text
refs
GSAP setters
CSS custom properties
mutable timeline state
requestAnimationFrame only when necessary
```

React state may be used only when changing the active semantic stage.

## Stage progress windows

Use overlapping windows so transitions do not feel like slides.

```ts
export const evolutionStages = [
  {
    id: "radio",
    start: 0.0,
    focus: 0.06,
    end: 0.15,
  },
  {
    id: "antennas",
    start: 0.1,
    focus: 0.18,
    end: 0.28,
  },
  {
    id: "networks",
    start: 0.22,
    focus: 0.31,
    end: 0.41,
  },
  {
    id: "cctv",
    start: 0.35,
    focus: 0.44,
    end: 0.54,
  },
  {
    id: "access-control",
    start: 0.48,
    focus: 0.57,
    end: 0.67,
  },
  {
    id: "fire-detection",
    start: 0.61,
    focus: 0.7,
    end: 0.8,
  },
  {
    id: "software",
    start: 0.74,
    focus: 0.83,
    end: 0.91,
  },
  {
    id: "industrial",
    start: 0.86,
    focus: 0.94,
    end: 1.0,
  },
] as const;
```

Each stage should:

1. Become visible shortly before its focus point.
2. Reach full emphasis around its focus point.
3. Recede visually without disappearing completely.
4. Remain represented as an active node in the final integrated scene.

## Stage data model

Keep stage content separate from presentation.

```ts
export type EvolutionStage = {
  id:
    | "radio"
    | "antennas"
    | "networks"
    | "cctv"
    | "access-control"
    | "fire-detection"
    | "software"
    | "industrial";
  index: number;
  eyebrow: string;
  verb: string;
  title: string;
  description: string;
  start: number;
  focus: number;
  end: number;
};
```

Recommended content:

```ts
export const evolutionStages: EvolutionStage[] = [
  {
    id: "radio",
    index: 1,
    eyebrow: "The beginning",
    verb: "Communicate",
    title: "Radio solutions",
    description:
      "We began by connecting people and operations through dependable radio communication.",
    start: 0,
    focus: 0.06,
    end: 0.15,
  },
  {
    id: "antennas",
    index: 2,
    eyebrow: "Greater reach",
    verb: "Extend",
    title: "Antenna systems",
    description:
      "We expanded communication across greater distances and demanding environments.",
    start: 0.1,
    focus: 0.18,
    end: 0.28,
  },
  {
    id: "networks",
    index: 3,
    eyebrow: "Connected infrastructure",
    verb: "Connect",
    title: "Networks and communications",
    description:
      "Communication evolved into interconnected networks supporting critical operations.",
    start: 0.22,
    focus: 0.31,
    end: 0.41,
  },
  {
    id: "cctv",
    index: 4,
    eyebrow: "Operational visibility",
    verb: "Observe",
    title: "CCTV and video surveillance",
    description:
      "Connectivity became visibility through continuous monitoring and situational awareness.",
    start: 0.35,
    focus: 0.44,
    end: 0.54,
  },
  {
    id: "access-control",
    index: 5,
    eyebrow: "Managed entry",
    verb: "Control",
    title: "Access control",
    description:
      "We integrated identity, authorization, and controlled access into the connected environment.",
    start: 0.48,
    focus: 0.57,
    end: 0.67,
  },
  {
    id: "fire-detection",
    index: 6,
    eyebrow: "Risk protection",
    verb: "Protect",
    title: "Fire detection and alarm",
    description:
      "Our systems grew to detect threats and coordinate faster, more informed responses.",
    start: 0.61,
    focus: 0.7,
    end: 0.8,
  },
  {
    id: "software",
    index: 7,
    eyebrow: "Centralized intelligence",
    verb: "Coordinate",
    title: "Software solutions",
    description:
      "We unified infrastructure, events, and operational data through centralized software.",
    start: 0.74,
    focus: 0.83,
    end: 0.91,
  },
  {
    id: "industrial",
    index: 8,
    eyebrow: "Complete integration",
    verb: "Integrate",
    title: "Industrial systems",
    description:
      "Today, we design integrated technological ecosystems for industrial and mission-critical operations.",
    start: 0.86,
    focus: 0.94,
    end: 1,
  },
];
```

## Central visual metaphor

Use one continuous signal throughout the entire experience.

The signal begins as a radio transmission and evolves into:

```text
Radio pulse
→ transmitted signal
→ network packet
→ video data
→ access request
→ alarm event
→ software data
→ industrial command
```

The signal must remain visually recognizable throughout the sequence.

Recommended representation:

```text
Small luminous circle
Short trailing glow
Subtle pulse
Movement constrained to an SVG path
```

Do not use multiple unrelated particles as the primary narrative device.

## Evolution path

Create a responsive SVG path positioned behind the stage content.

Desktop path concept:

```svg
<path
  d="
    M 80 560
    C 160 520, 180 400, 270 380
    C 360 350, 370 210, 480 230
    C 580 250, 580 470, 690 450
    C 790 430, 770 250, 880 240
    C 990 230, 1030 370, 1130 330
  "
/>
```

Use a stable `viewBox`, such as:

```text
0 0 1200 700
```

Render at least three path layers:

1. Base path with very low opacity.
2. Completed path representing previous progress.
3. Active luminous segment near the moving signal.

Animate the completed path using:

```text
stroke-dasharray
stroke-dashoffset
```

Use `getTotalLength()` and `getPointAtLength()` to position the moving signal.

Do not require GSAP MotionPathPlugin.

Conceptual implementation:

```ts
const totalLength = path.getTotalLength();
const currentLength = totalLength * progress;
const point = path.getPointAtLength(currentLength);

gsap.set(signalElement, {
  x: point.x,
  y: point.y,
});

gsap.set(progressPath, {
  strokeDashoffset: totalLength - currentLength,
});
```

Handle responsive path changes by recalculating path length after resize.

## Stage nodes

Place one node on or near the path for every capability.

Each node should have:

```text
Outer ring
Small center point
Stage number
Optional short label
Active pulse
Completed state
```

Node states:

```text
Upcoming:
low opacity, small scale

Active:
full opacity, larger scale, visible halo

Completed:
medium opacity, persistent illuminated center
```

The final stage should activate all nodes simultaneously.

## Stage content layout

Use large editorial typography.

Desktop layout:

```text
Stage content alternates between left and right.
Visual remains near the central path.
Maximum text width: approximately 480–560px.
```

Recommended hierarchy:

```text
Eyebrow
Large narrative verb
Capability title
Two-line description
Stage counter
```

Example:

```text
04 / 08
Operational visibility

OBSERVE

CCTV and video surveillance

Connectivity became visibility through continuous monitoring and situational awareness.
```

The narrative verb should be the dominant typography.

Avoid placing all text inside cards.

Use whitespace, alignment, and contrast rather than excessive containers.

## Visual style

The experience should feel:

```text
Technical
Precise
Industrial
Premium
Calm
Modern
Integrated
```

Avoid:

```text
Gaming aesthetics
Cyberpunk overload
Excessive neon
Cartoon icons
Glassmorphism on every element
Large blurred gradients everywhere
Random floating particles
Heavy 3D asset dependencies
```

Use the existing brand palette.

If no suitable theme tokens exist, define local CSS variables:

```css
.companyEvolution {
  --evolution-bg: #07090d;
  --evolution-surface: rgba(255, 255, 255, 0.04);
  --evolution-line: rgba(255, 255, 255, 0.14);
  --evolution-text: rgba(255, 255, 255, 0.96);
  --evolution-muted: rgba(255, 255, 255, 0.58);
  --evolution-accent: #5fd7ff;
}
```

Keep these scoped to the mock.

Prefer existing application tokens when available.

## Stage-specific visuals

Implement every stage with inline SVG and simple CSS or GSAP animation.

### Stage 1: Radio solutions

Visual elements:

```text
Minimal radio transceiver outline
Small antenna
Three concentric transmission waves
Signal point emerging from the radio
```

Animation:

1. Radio fades and scales in.
2. Antenna line draws upward.
3. Concentric waves expand.
4. Signal leaves the radio and enters the primary path.

### Stage 2: Antenna systems

Visual elements:

```text
Technical antenna mast
Two or three structural segments
Expanding coverage arcs
Small distant receiver nodes
```

Animation:

1. Mast draws from bottom to top.
2. Coverage arcs expand.
3. Distant nodes illuminate.
4. Main signal becomes stronger and moves forward.

### Stage 3: Networks and communications

Visual elements:

```text
Central network node
Four or five connected nodes
Directional moving packets
Simple topology lines
```

Animation:

1. Main signal reaches the central node.
2. Lines branch outward.
3. Nodes activate sequentially.
4. Small packets travel in both directions.
5. The original signal returns to the primary route.

### Stage 4: CCTV and video surveillance

Visual elements:

```text
Abstract CCTV camera
Mounting arm
Camera lens
Subtle field-of-view cone
Monitoring frame corners
```

Animation:

1. Camera outline is revealed.
2. Camera pivots slightly.
3. Lens activates.
4. Field-of-view cone performs one restrained sweep.
5. Video-data lines flow back toward the network.

Do not use simulated real surveillance footage.

### Stage 5: Access control

Visual elements:

```text
Credential card
Card reader
Door or gate outline
Validation line
Granted status indicator
```

Animation:

1. Credential approaches the reader.
2. Reader emits a scanning pulse.
3. Signal travels to a validation node.
4. Confirmation returns.
5. Door or barrier opens.

### Stage 6: Fire detection and alarm

Visual elements:

```text
Smoke or heat detector
Alarm control panel
Zone nodes
Alert pulse
```

Animation:

1. Detector emits a warning pulse.
2. Alert travels toward the control panel.
3. Relevant zone activates.
4. A secondary signal is transmitted toward the software stage.

Use “Fire detection and alarm” in public-facing text.

### Stage 7: Software solutions

Visual elements:

```text
Central software interface
Several incoming data streams
Status indicators
Abstract chart or event rows
Connected module panels
```

Animation:

1. Lines from CCTV, access control, fire detection, and networks converge.
2. Interface frame assembles.
3. Status modules populate.
4. Multiple events become one coordinated operational view.

Do not build a full dashboard.

Use an abstract interface that communicates centralized intelligence.

### Stage 8: Industrial systems

Visual elements:

```text
Abstract industrial facility
Factory or operational blocks
All previous systems represented
Connected lines between every layer
Central software node
```

Animation:

1. Camera or layout appears to zoom outward.
2. Earlier stage nodes become visible simultaneously.
3. Signal travels through the complete ecosystem.
4. All infrastructure remains active.
5. Final integrated message appears.

The final composition should clearly show:

```text
Communications
Network
CCTV
Access control
Fire detection
Software
Industrial infrastructure
```

## Optional lightweight Three.js background

Only add React Three Fiber when:

1. The dependency already exists, or installing it is acceptable.
2. It does not delay the core SVG experience.
3. It improves depth without becoming the main implementation.

If included, use it only for:

```text
Ambient geometric signal core
Very subtle background particles
Slow camera parallax
Soft lighting
Final industrial depth layer
```

Use procedural geometry only.

Do not create eight detailed 3D models.

Load it dynamically:

```tsx
const EvolutionCanvas = dynamic(
  () => import("./EvolutionCanvas"),
  {
    ssr: false,
    loading: () => null,
  },
);
```

Performance configuration:

```tsx
<Canvas
  dpr={[1, 1.5]}
  gl={{
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  }}
/>
```

Pause or reduce rendering when the section is outside the viewport.

The SVG implementation must remain complete when WebGL is unavailable.

## Progress rail

Include a restrained stage navigation rail.

Desktop:

```text
Vertical rail near the right edge
Eight small indicators
Current stage label
Progress line
```

Mobile:

```text
Horizontal or compact numeric indicator
Example: 04 / 08
```

The rail should reflect progress but should not become the dominant interface.

Optional interaction:

Clicking a stage indicator may scroll to its corresponding position.

If implemented, calculate the target scroll position using the stage focus value.

## Intro and exit transitions

The pinned experience must connect naturally to surrounding content.

Entry:

```text
Hero signal moves into the SVG path.
Background darkens slightly.
First stage content becomes visible.
```

Exit:

```text
Final industrial system reaches stable state.
Sticky section releases.
Integrated capability summary appears below.
```

Avoid an abrupt visual reset after the pinned section.

## Integrated capabilities summary

After the animated experience, add a normal document-flow section.

Recommended heading:

```text
One connected technological ecosystem
```

Recommended supporting copy:

```text
Our capabilities are not isolated services. They work together as a coordinated foundation for safer, more visible, and more efficient operations.
```

Show the eight capabilities in a clean responsive grid.

Each item should include:

```text
Narrative verb
Capability title
One-sentence description
Small reused visual symbol
```

This section ensures the information remains understandable without relying on animation.

## Final call to action

Recommended heading:

```text
Built to connect every layer of your operation
```

Recommended supporting copy:

```text
From communications infrastructure to software and industrial integration, we design systems around the way your operation actually works.
```

Use an existing project button component when available.

For the mock, the CTA may use:

```text
Explore our solutions
Talk to our team
```

Do not introduce dead external links. Use existing routes or `#` placeholders clearly marked for later integration.

## Responsive behavior

### Desktop

Use the full sticky cinematic experience.

Target:

```text
1280px and above
```

Support:

```text
Alternating content placement
Wide SVG path
Large typography
Progress rail
Complete stage visuals
```

### Tablet

Retain the sticky experience but simplify spacing.

Support:

```text
Smaller visual scale
Reduced text size
Fewer decorative elements
No horizontal overflow
```

### Mobile

Do not simply shrink the desktop composition.

Use:

```text
Vertical or mostly vertical SVG path
Centered stage visuals
Text below or above each visual
Shorter sticky duration
Reduced effects
Simplified progress indicator
```

Mobile visual priorities:

```text
Readable content
Stable layout
No clipped text
No excessive parallax
No tiny node labels
No horizontal scrolling
```

On weak devices, remove nonessential particle effects.

## Reduced motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

1. Do not pin the user inside a long scrubbed sequence.
2. Render the stages as a normal vertical timeline.
3. Show all content in reading order.
4. Disable traveling particles.
5. Disable continuous pulsing.
6. Keep only minimal opacity transitions, or no transitions.
7. Preserve the same information and visual hierarchy.

Implement a dedicated reduced-motion rendering path if that produces cleaner behavior.

Do not merely set all animation durations to zero inside the sticky layout.

## Accessibility requirements

The experience must remain understandable without animation.

Required:

```text
Semantic headings
Logical DOM reading order
Visible focus states
Sufficient contrast
Decorative SVGs marked aria-hidden
Meaningful stage text in HTML
No required hover interactions
No information communicated only through color
```

The active stage indicator should use:

```tsx
aria-current="step"
```

The visual stage order and DOM stage order must match.

Avoid placing large amounts of meaningful copy inside SVG `<text>` elements.

## Performance requirements

The experience should not trigger React renders on every scroll frame.

Required:

```text
Use refs for animation targets
Use one main ScrollTrigger
Use GPU-friendly transforms
Avoid layout reads and writes in the same loop
Debounce or observe resize changes
Clean up GSAP contexts on unmount
Pause optional animation when offscreen
```

Do not animate:

```text
width
height
top
left
large filter blur values
expensive box shadows
```

Prefer:

```text
transform
opacity
strokeDashoffset
CSS variables
```

Avoid large numbers of SVG filters.

Use a single restrained glow filter or CSS shadow where needed.

## GSAP lifecycle

Use `gsap.context()` or `useGSAP()`.

Cleanup is mandatory.

Example:

```tsx
useGSAP(
  () => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: updateExperience,
    });

    return () => {
      trigger.kill();
    };
  },
  {
    scope: containerRef,
  },
);
```

Make sure route changes do not leave orphaned ScrollTrigger instances.

Run:

```ts
ScrollTrigger.refresh();
```

only when necessary after layout initialization.

## Animation helpers

Create reusable helpers rather than stage-specific math scattered across components.

Recommended functions:

```ts
export function clamp01(value: number): number;

export function normalizeProgress(
  progress: number,
  start: number,
  end: number,
): number;

export function stageVisibility(
  progress: number,
  start: number,
  focus: number,
  end: number,
): number;

export function getActiveStageIndex(
  progress: number,
  stages: EvolutionStage[],
): number;
```

Suggested visibility behavior:

```text
0 before stage start
0 → 1 between start and focus
1 near focus
1 → 0.25 between focus and end
0.25 after completion
```

Completed stages should remain subtly present.

## Visual state coordination

Use a single stage progress source for:

```text
Path completion
Signal position
Node activation
Content opacity
Stage visual animation
Progress rail
Background atmosphere
```

Do not let individual components calculate conflicting active-stage states.

## Testing

Add tests using the repository’s existing test tools.

At minimum, verify:

### Route test

```text
/mocks/company-evolution renders successfully
```

### Content test

All eight capability titles must be present in the document.

### Stage mapping test

Test the pure function that converts global progress into an active stage.

Example expectations:

```text
0.02 → radio
0.18 → antennas
0.31 → networks
0.44 → cctv
0.57 → access control
0.70 → fire detection
0.83 → software
0.95 → industrial
```

### Reduced-motion test

When reduced motion is enabled:

```text
All stages remain visible
Sticky trapping is disabled
Essential content remains accessible
```

### Responsive test

Verify at least:

```text
1440 × 900
1024 × 768
390 × 844
```

Confirm:

```text
No horizontal overflow
No clipped headings
No overlapping stage content
No invisible CTA
```

### Browser test

Use Playwright or the existing end-to-end framework when available.

Check for:

```text
Console errors
Hydration warnings
Uncaught animation errors
Broken resize behavior
```

## Acceptance criteria

The implementation is complete when all of the following are true:

1. `/mocks/company-evolution` is accessible.
2. The page includes all eight stages.
3. The story uses one continuous signal.
4. Scroll progress controls the visual journey.
5. Earlier capabilities remain represented in the final scene.
6. The final industrial scene shows an integrated ecosystem.
7. The experience is responsive.
8. Reduced-motion behavior is implemented.
9. The content remains understandable without animation.
10. No external 3D or image assets are required.
11. No console errors or hydration warnings occur.
12. Animation cleanup works after route navigation.
13. Existing repository architecture and styling conventions are respected.
14. TypeScript, linting, and tests pass.
15. No unrelated files are refactored.

## Implementation sequence

Follow this order.

### Phase 1: Repository inspection

Identify:

```text
App Router location
Locale handling
Styling approach
Package manager
Testing framework
Existing animation dependencies
Existing button and typography components
```

### Phase 2: Static page composition

Implement:

```text
Hero
Evolution shell
All stage content
Integrated capability summary
Final CTA
```

Do not begin with animation.

Verify the page reads correctly as static HTML.

### Phase 3: Stage model

Implement:

```text
EvolutionStage type
Stage configuration
Progress helpers
Active stage calculation
```

Add unit tests for the progress mapping.

### Phase 4: Sticky viewport

Implement:

```text
Tall section
Sticky viewport
Layer structure
Responsive sizing
Basic active-stage transitions
```

### Phase 5: SVG path and signal

Implement:

```text
Base path
Completed path
Stage nodes
Signal point
Path length calculation
Responsive recalculation
```

### Phase 6: Stage visuals

Implement all eight inline SVG stage visuals.

Prioritize clarity and continuity over visual complexity.

### Phase 7: Animation polish

Add:

```text
Stage transitions
Line drawing
Node activation
Signal trail
Subtle background changes
Final convergence
```

### Phase 8: Responsive and reduced motion

Implement dedicated desktop, tablet, mobile, and reduced-motion behavior.

### Phase 9: Optional depth enhancement

Only after the SVG experience is complete, consider adding the lightweight Three.js background.

Do not block completion on this step.

### Phase 10: Verification

Run the project’s relevant commands, such as:

```text
typecheck
lint
unit tests
end-to-end tests
production build
```

Use the actual repository commands instead of assuming exact script names.

## Non-goals

Do not implement:

```text
A production CMS
Backend integration
Complete product pages
Real analytics data
Detailed 3D equipment models
Video backgrounds
A general animation framework
A redesign of the global navigation
A rewrite of the project’s theme
```

## Expected final response

After implementation, report:

1. Summary of the experience implemented.
2. Exact route created.
3. Files created and modified.
4. Dependencies added, if any.
5. Responsive and reduced-motion behavior.
6. Tests and validation commands executed.
7. Any known limitations.
8. Recommended next production step.

Do not claim a command passed unless it was actually executed successfully.

## Final implementation constraint

Keep the SVG-first version as the required deliverable and treat Three.js as an enhancement rather than a dependency.
