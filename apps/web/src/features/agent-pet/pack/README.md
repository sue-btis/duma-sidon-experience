# Portable agent pet pack

`dist/` is the self-contained generated pack. It includes the React runtime,
CSS, manifest, animated WebP files, PNG spritesheets, source frames, preview,
normalized run specification, and strict validation report.

To migrate it:

1. Copy `dist/AgentPet.tsx`, `dist/pet-manifest.ts`, and
   `dist/agent-pet.css` into the target React or Next.js source tree.
2. Copy `dist/animations/` into the target public directory as
   `public/pet/animations/`.
3. Render `<AgentPet state="idle" variant="auto" size={192} />`.

The component accepts `idle`, `working`, `waiting`, `success`, and `error`.
Use `variant="auto"` to rotate the long-running state variants without an
immediate repeat.

When rebuilding the pack, run `clean_strips.py` before `build_pack.py`, then
run `check_frames.py` and `check_orbits.py`. The first script repacks the eight
detected poses into isolated cells; the checks reject edge bleed, anchor drift,
or an invalid two-sphere orbit contract.
