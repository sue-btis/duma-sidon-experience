# Company evolution

Insert a fourth home-page scene between the opening and map scenes. It mirrors the supplied legacy scroll-map template: a sticky, pale-blue map surface, four positioned phase images, a connected route, story panel, station controls, and progress indicator.

Desktop scroll advances through the four stages and updates the focused image, copy, route traveler, and controls. Phase and station buttons scroll to their corresponding stage. The four supplied images are the only imagery. Temporary Latin copy is used for all phases.

On small screens the composition follows the legacy template's mobile layout: the story panel moves to the top, phase controls become a bottom row, and the journey remains vertically scrollable. Reduced-motion users receive the same content and controls without camera interpolation or animated transitions.

The feature is local to `features/home`, is composed by `HomeExperience`, and is registered under the home message namespace. Validation: `pnpm lint` and `pnpm build` from the repository root.
