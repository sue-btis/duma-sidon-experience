# Animation keyframe strip

Canonical reference: C:\Users\Josue Escobar\Documents\projects\duma-sidon-experience\apps\web\src\features\head-agent-pet\pack\references\canonical-pet.png
Pet: Ecosat Head Agent Pet
Stable identity: The detached round teal-and-black head of the supplied Ecosat mascot: a thick teal circular rim, nearly black face, two tall white oval eyes without pupils, and two small teal brow marks. No torso or body segments.
Style: clean 2D illustrated mascot matching the supplied reference exactly, flat removable background, no text
Logical state: idle
Variant: blink-look
Motion: Blink once in place, then return smoothly to the starting pose without moving the head or eyes sideways.

Generate one horizontal strip containing exactly 8 equal-width animation cells in left-to-right temporal order.

Hard requirements:
- use the attached canonical image as authoritative
- exactly one character in every cell
- same camera, scale, silhouette, face, proportions, palette, costume, and accessories
- change only the pose and expression needed for this motion
- keep both eyes as solid white ovals with no pupils, irises, or dots
- adjacent cells must be nearby poses suitable for local interpolation
- full silhouette visible in every cell with consistent padding
- transparent background when supported; otherwise one flat removable background color
- no labels, numbers, arrows, borders, gutters, grids, captions, or extra poses
- no duplicated limbs, faces, accessories, or detached body parts
- keep procedural orbiting objects, particles, and shadows absent or static
- The motion is cyclic. The final pose must lead naturally back to the first pose.
