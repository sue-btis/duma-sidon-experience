# Design System

## 1. Foundation

### Source authority

1. **Official Ecosat and Sidón identity:** `ECOSAT_ManualdeIdentidad.pdf`
   - Highest authority for official Ecosat and Sidón logos, proportions, typography, colors, and permitted identity variants.
   - When an exact brand value conflicts with another source, the PDF wins.

2. **Assets and implementation guidance:** Sidón brand-system ZIP
   - Source for supplied production assets, Duma identity guidance, and practical implementation recommendations.
   - It may supplement Ecosat and Sidón guidance, but it does not override the Identity Manual.

3. **Approved Experience System PNGs**
   - Primary visual reference for the experience itself: composition, hierarchy, orbital language, cards, nodes, interaction states, transitions, depth patterns, and brand-specific scene treatment.

4. **Structural prototype only:** `ecosat-brand-experience (1).html`
   - Reference for responsive behavior, sticky scenes, scroll progression, progressive reveals, and general interaction feasibility.
   - Its copy, colors, scene order, brand treatment, and component decisions are not canonical when they conflict with the sources or approved instructions above.

The experience-specific requirements incorporated into this `DESIGN.md` are binding. Once approved, this document becomes the implementation source for experience behavior, terminology, and visual rules. Do not rely on a separate context or decisions file.

The conflict rule is:

- Official Ecosat and Sidón identity values: Identity Manual.
- Duma assets and implementation guidance: Sidón brand-system ZIP.
- Experience-specific visual execution and behavior: approved Experience System PNGs, as codified in this `DESIGN.md`.
- Structural and responsive exploration only: HTML prototype.

### Brand roles

Ecosat is the central corporate connector between the physical and digital worlds.

The Ecosat home page and other company-level ecosystem surfaces use Ecosat as the dominant brand, including its blue primary color. Mentioning or introducing Integración and Sidón on those surfaces does not switch the surface identity.

- **Integración** is the physical world. Its identity is purple.
- **Sidón** is the digital world. Its identity is green.
- **Duma** appears only inside Sidón as its intelligence layer.

A surface has one dominant brand. Dedicated Integración routes, scenes, and controls use the Integración purple system; dedicated Sidón routes, scenes, and controls use the Sidón green system. Ecosat may connect or endorse the two worlds without recoloring or visually absorbing them.

### Color system

| Brand | Primary | Deep / structural | Use |
|---|---:|---:|---|
| Ecosat | `#00ADEF` | `#2B328C` | Corporate home, company-level ecosystem scenes, connector, and Ecosat-specific transition accents |
| Integración | `#765CA4` | `#3B2B50` | Dedicated Integración product routes, scenes, and controls |
| Integración support | `#565069` | `#6B6C8D` | Supporting labels, lines, and secondary surfaces |
| Sidón | `#00A887` | `#0D553F` | Dedicated Sidón product routes, scenes, controls, and Sidón structure |
| Duma | `#2ECC71` | `#0D5C3A` | Intelligence-specific moments within Sidón only |
| Duma support | `#B8F0D8` | `#E5FFF5` | Soft intelligence accents, highlights, and controlled glow surfaces |

Duma’s palette complements Sidón but does not replace Sidón’s primary green system. Duma remains contained within Sidón and must never be presented as a separate world or as intelligence distributed across all of Ecosat. `#2ECC71` must not be used for small text on white because it does not provide sufficient contrast.

```css
:root {
  --ink: #0F1A16;
  --ink-soft: #475A52;
  --line: #E2E8E5;
  --surface: #FFFFFF;
  --surface-alt: #F5F8F7;
}
```

These neutral tokens are shared across the experience. Do not introduce arbitrary grays, background colors, or border colors at component level without first extending the system.

The experience defaults to light surfaces. Brand colors carry identity through controlled accents, hierarchy, and orbital lines, not through dark-mode treatments, neon, or saturated gradient fields. Essential information never relies on color alone.

### Typography

Gotham remains the official identity typeface. Until licensed, self-hosted Gotham files are available, use the approved production fallback without external font requests:

```css
--font-brand: "Gotham", "Montserrat", system-ui, sans-serif;
--font-ui: "Inter", "Montserrat", system-ui, sans-serif;
--font-data: "DM Sans", "Inter", sans-serif;
--font-mono: "DM Mono", "SF Mono", ui-monospace, monospace;
```

- **Montserrat:** display typography, major scene titles, and brand-facing headings.
- **Inter:** body copy, labels, controls, navigation, and dense interface content.
- **DM Sans / DM Mono:** data-oriented or Duma-specific contexts only when they add meaning.
- Do not request Google Fonts, CDNs, or other third-party font services.

These stacks define the intended production typography but do not imply that Montserrat, Inter, DM Sans, or DM Mono are already bundled in the repository.

Required font files must be legally sourced and self-hosted before production use. Until then, the browser may resolve to the defined system fallbacks.

Remove any Google Fonts imports or other external font requests inherited from the HTML prototype.

### Spatial and material language

The experience is light, spacious, precise, and controlled. Use thin lines, restrained rounded geometry, and soft depth to support clarity rather than decoration.

- Opening scene: exactly two thin orbits, with two nodes per orbit.
- Beyond the opening, orbital lines may adapt to the approved transition and depth patterns. They must preserve visual continuity without becoming decorative noise or a literal astronomy theme.
- Orbital lines provide the primary transition language between scenes.
- UI geometry follows the approved system: fine 1px lines, selective 1.5px structural lines, and 2px focus or active-state lines.
- Radii stay restrained: 4px, 8px, 12px, and 16px for UI; avoid oversized rounded cards.
- Depth is subtle and never paired decoratively with heavy borders.

Focus states use a clearly visible 2px solid ring with a 3px offset. The ring should use the deep structural color of the dominant brand:

- Ecosat: `#2B328C`
- Integración: `#3B2B50`
- Sidón and Duma contexts: `#0D553F`

Focus must never rely on a color change, shadow, or animation alone.

### Accessibility baseline

Target WCAG 2.2 AA across desktop, tablet, and mobile. Every meaningful element must be keyboard accessible with persistent visible focus, semantic structure, clear labels, logical headings, screen-reader support, and a minimum product target of 44 by 44 CSS pixels for interactive controls. Do not convey essential meaning through color alone. Ensure compliant text and interface contrast, explicit form labels and errors, accessible confirmation after submission, correct Spanish and English language metadata, and appropriate alternative text.

The motion system must provide a complete `prefers-reduced-motion` alternative.

Scroll may drive narrative progression, but no essential content or action may depend exclusively on an animation threshold, hover state, parallax effect, or precision gesture.

Under `prefers-reduced-motion`, preserve the same content order, meaning, navigation, and interactions without orbital movement, automatic animation, pinned spatial transitions, or disorienting zoom effects. Reduced motion is an equivalent experience, not a removal of content.
