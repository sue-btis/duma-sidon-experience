# Letter worlds opening

## Scope

Replace the home opening's three existing microletter previews with a production React canvas component derived from `docs/legacy/ecosat-letter-worlds.html`. The legacy file remains a reference only; no runtime import or dependency on `docs/legacy` is permitted.

## Component boundary

`apps/web/src/components/ui/LetterWorldsCanvas.tsx` is the smallest client component. It draws the three letter worlds, their orbits, and pointer-responsive rotation on a canvas. It owns resize and animation lifecycle cleanup, caps device pixel ratio at 2, and limits rendering to 24 FPS.

The component accepts no content or navigation props. `CoreOpening` remains server-rendered and composes the component with the existing localized heading, official Ecosat logo, statement, and values.

## Presentation

The home opening retains its current fixed navigation. A feature-local SVG draws the physical and digital connector paths with moving dots. CSS positions the main blue world centrally and the purple and green worlds at the lower edges, with the centered copy above them. The existing responsive breakpoints keep the outer worlds out of the narrow mobile composition.

## Accessibility and motion

The canvas, paths, and decorative halo are hidden from assistive technology. The localized `h1`, statement, and values remain semantic HTML. When reduced motion is requested, the canvas renders a static frame and the connector movement stops. Pointer interaction is optional and does not alter meaning or navigation.

## Validation

Run `pnpm lint` and `pnpm build` from the repository root. Confirm `/es/` and `/en/` render the opening, navigation remains operable, desktop pointer movement is smooth, and reduced-motion renders a stable equivalent scene.
