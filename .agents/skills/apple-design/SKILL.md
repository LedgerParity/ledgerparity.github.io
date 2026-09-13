---
name: apple-design
description: Audit and refine an existing webpage using measured typography, spacing, hierarchy, contrast, motion, and density. Use for an Apple-inspired design audit or a brand-preserving webpage rebuild.
---

# Apple-inspired web design audit

Apply structural discipline while retaining the site's brand, product facts, and working behavior. This skill implements the user's Apple Design Audit workflow for websites. It is not an official Apple standard or a native-platform compliance checker.

## Audit before editing

Read applicable repository instructions and inspect source plus browser-rendered desktop and mobile views. Save a before screenshot and source snapshot. Audit in this order:

1. Type: inventory computed font sizes, weights, and line heights. Propose a small named scale with exact replacements.
2. Spacing: inventory margins, padding, gaps, and section rhythm against a chosen 4px or 8px base. Record intentional exceptions such as 1px borders, optical offsets, fluid widths, and pill radii.
3. Hierarchy: identify one primary focal point and action per screen. Check whether decoration, navigation, and notices compete with them.
4. Contrast: measure each rendered text/background pair, including hover, nested code, and translucent layers. Use relative sRGB luminance after alpha compositing; require 4.5:1 for ordinary text and 3:1 for large text (24px regular or approximately 18.67px bold). Record unmeasurable image/gradient cases for visual inspection; never invent a measurement.
5. Motion: list transitions/animations with property, duration, easing, and reduced-motion behavior. For this audit, flag durations over 300ms and linear curves for review, not automatic failure. Prefer specific-property transitions of 150–200ms with easing; disable nonessential motion under prefers-reduced-motion.
6. Density: check readable line lengths, repeated information, wrapping, touch targets, tables, and scroll behavior at 320px, 390px, 768px, and desktop widths, plus zoom.

Produce numbered findings ranked by visual impact, with file/line, observed value, one-sentence problem, and exact replacement. Choose values for the actual product; the example 15/20/28/44px scale is not an Apple mandate. Preserve necessary technical content with accessible disclosure when useful.

## Fix loop

For audit-only requests, stop after the findings. For an authorized rebuild, proceed through ranked findings in batches of three without requesting approval again. Restrict each batch to its findings. Save exact before/after diffs and re-audit those areas after each batch; record pass/fail and remaining limitations. If the user specifies a subset, stop at that subset.

Keep existing colors and brand assets, adjusting shades only where contrast requires it. Preserve links, section anchors, product scope, truthful limitations, and keyboard operation. Use semantic HTML and visible focus indicators. Prefer native controls and static HTML/CSS when sufficient.

Check desktop/mobile screenshots, text contrast in all states, broken assets/anchors, overflow, keyboard navigation, and reduced motion. Report what changed, verification results, and any unverified deployment. Commit/push only within existing user authorization.

## Provenance

Workflow supplied by the user in “The Apple Design Audit.” The related upstream skill at https://github.com/NutshellEngineering/apple-design-skill targets native Apple platforms and does not prescribe this website's pixel scale. Consult https://developer.apple.com/design/human-interface-guidelines for any actual Apple-specific claim, and https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html for web contrast criteria. Do not copy Apple's branding or imply endorsement.
