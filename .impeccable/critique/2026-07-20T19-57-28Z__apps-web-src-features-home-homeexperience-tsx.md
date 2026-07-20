---
target: home implementation
total_score: 14
p0_count: 0
p1_count: 3
timestamp: 2026-07-20T19-57-28Z
slug: apps-web-src-features-home-homeexperience-tsx
---
## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 2 | No indication of progress or available destinations. |
| 2 | Match between system and real world | 2 | The physical world is not named Integración. |
| 3 | User control and freedom | 1 | Only a scroll anchor is actionable. |
| 4 | Consistency and standards | 2 | Physical-world color semantics conflict with the design system. |
| 5 | Error prevention | 2 | Logo authorization is pending but marks are rendered. |
| 6 | Recognition rather than recall | 2 | Inert tiles imply choices without destinations. |
| 7 | Flexibility and efficiency | 1 | No direct route for known-intent visitors. |
| 8 | Aesthetic and minimalist design | 2 | Repeated outlined cards make a brochure-like sequence. |
| 9 | Error recovery | 0 | No commercial or support route is available. |
| 10 | Help and documentation | 0 | No contextual next step explains key terms. |
| **Total** | | **14/40** | **Poor** |

## Anti-Patterns Verdict

The orbital opening is on-brief, but the repeated icon tiles, logo cards, capability cells, and outlined panels make the page read as a generic corporate explainer rather than a progressively explorable Ecosat experience. The deterministic detector found 0 hits in the submitted home source and stylesheet, so these are design-level observations rather than detector-rule matches.

## Priority Issues

- **[P1] Missing conversion and exploration paths.** The only action is a scroll anchor. This misses the product's stated conversation and world-exploration intents. Add only approved destinations/actions.
- **[P1] Failing brand-color text contrast.** `--ecosat` on the map narrative is 2.39:1 and `--sidon` for SIDÓN is 2.83:1 on `--surface-alt`; both fail WCAG large-text 3:1. Use verified deep structural tokens.
- **[P1] Two-world model is not faithful.** The physical panel uses blue and calls itself “Special systems,” while the system defines purple Integración. Sidón is static and Duma is absent from its intended contained role.
- **[P2] No page-level h1.** The cover has a logo and paragraph, then starts h2 headings; screen-reader heading navigation has no primary title.
- **[P2] Logo wall and unapproved proof.** Repetitive logo-card grids conflict with the brief and project context says authorization must be reconfirmed before launch.
- **[P2] Home-level literal tokens.** Component CSS introduces undocumented colors/material values instead of extending the design token system.

## Strengths

- The opening preserves the exact two-orbit, two-node constraint and motion remains nonessential.
- Focus styling, reduced-motion support, responsive column collapse, and 48px start-link height are implemented.
- The feature stays in the correct feature module and static export, lint, and build pass.

## Persona Red Flags

- **Jordan:** “Start the journey” describes a tour, not a business outcome; pillars look selectable but are inert.
- **Riley:** Unqualified customer and partner marks present an authorization risk; Spanish copy contains a hard-coded English “HQ.”
- **Casey:** Four viewport-high scenes have no persistent or in-flow commercial action; the connector disappears on mobile.

## Questions to Consider

- What should an operations executive choose within ten seconds: a conversation, Integración, or Sidón?
- If logos cannot be authorized for launch, what approved proof replaces the entire wall?
- Can one relevance moment replace the map-and-logo sequence so the final fold becomes genuinely explorable?
