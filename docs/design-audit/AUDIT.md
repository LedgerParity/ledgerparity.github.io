# Web design audit — 14 September 2026

Scope: existing LedgerParity documentation/landing page. Applied the locally created apple-design skill, based on the user's audit workflow. Pixel values are project decisions, not official Apple requirements. Baseline: 47ff985. Original line references below point to that revision. Existing brand palette and product limitations retained.

## Ranked findings (captured before changes)

1. **Hierarchy** — index.html:30, assets/style.css:91. A 900px banner duplicates the product name and competes with a 38.4px headline; eight navigation links distract from a plain download link below the hero. Replace the banner with a 64px headline (44px mobile), one 48px-high download CTA, four main navigation links, and a three-step workflow. Keep the remaining section anchors in secondary navigation.
2. **Type scale** — assets/style.css:31, 47, 113. Sixteen computed sizes include 11.008px nested code. Replace with 14px captions/code, 16px body, 20px subheads, 32px section headings, 64px desktop/44px mobile hero. Body line-height: 26.4px → 24px; hero: 48px → 72px desktop/49.5px mobile. Relative rem tokens preserve browser text sizing.
3. **Spacing** — assets/style.css:91, 105. Arbitrary rem/em values create inconsistent rhythm. Use a 4px base: section padding 64px desktop/48px mobile, card padding 32px/24px, grid gap 24px, body gaps 16px, list gaps 8px. Preserve 1px borders, 2px focus rings, optical letter spacing, fluid widths, and pill radii as intentional exceptions. Complete original spacing declarations appear below; batch 1 diff gives exact replacements.
4. **Density** — index.html:97, 140. Full-width technical prose and source-building instructions precede the usable CLI example. Cap prose at 72ch, use native disclosures for six concepts and source examples, move the existing CLI example first, and remove the duplicate download paragraph. Security and community guidance remain available in labeled disclosures; preview and evidence limitations remain visible.
5. **Contrast and focus** — assets/style.css:28. Violet #7a5cff body hover text measures 4.38:1 on ink and 3.90:1 on cards, below 4.5:1. Replace text hover shade with #b6a6ff (9.02:1 / 8.03:1). Keep the violet logo. Add a 2px teal focus outline with 4px offset, a skip link, and 44px navigation hit areas.
6. **Motion** — assets/style.css:16. No CSS transitions/animations exist, but smooth scrolling persists with reduced motion. Add 150ms color/background-color transitions with cubic-bezier(.4,0,.2,1); reduced-motion uses transition:none and scroll-behavior:auto. No linear/over-300ms transition remains; normal anchor scrolling is browser-timed.

## Original computed type inventory

16px, 14.72px, 38.4px, 17.92px, 13.44px, 27.2px, 18.4px, 13.76px, 15.04px, 12.9344px, 12.8px, 11.008px, 11.8336px, 12.6592px, 14.4px, 12.384px.

Exact role mapping: nav 14.72 → 14; hero 38.4 → 64/44; lead 17.92 → 20; tag 13.44 → 14 preview caption; h2 27.2 → 32; h3 18.4 → 20; card body 15.04 → 16; meta 12.8 → 14; small 14.4 → 14; all nested code variants 11.008/11.8336/12.384/12.6592/12.9344/13.76 → 14; body stays 16.

## Original spacing inventory

All margin/padding/gap declarations are included so intentional and off-grid values can be distinguished. Nonmultiples of 4 at the original 16px root include 41.6, 6.4, 25.6, 9.6, 20.8, 5.6, 19.2, 11.2, 17.6, 54.4, 6.016, 12.8, 8.8. Relative em padding also varied by inherited code/tag font size. See the exact diff for replacement or removal.

```css
19: margin: 0;
33: margin: 2.6rem 0 1rem;
36: padding-bottom: .4rem;
38: h3 { font-size: 1.15rem; margin: 1.6rem 0 .6rem; color: var(--teal); }
41: ul { padding-left: 1.3rem; }
42: li { margin: .35rem 0; }
51: padding: .1rem .35rem;
58: padding: 1rem 1.2rem;
63: pre code { background: none; border: 0; padding: 0; }
76: margin: 0 auto;
77: padding: .7rem 1.5rem;
80: gap: 1rem;
84: .topbar nav { display: flex; gap: 1.1rem; flex-wrap: wrap; margin-left: auto; font-size: .92rem; }
88: main { max-width: var(--maxw); margin: 0 auto; padding: 0 1.5rem 4rem; }
91: .hero { text-align: center; padding: 3.4rem 0 1rem; }
93: .hero h1 { font-size: 2.4rem; margin: 1.6rem 0 .4rem; }
95: .hero p.lead { font-size: 1.12rem; color: var(--slate); max-width: 46em; margin: 0 auto; }
97: display: inline-block; margin-top: 1.1rem;
100: padding: .25em .8em; border-radius: 999px; font-size: .84rem;
104: .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1rem 0; }
109: padding: 1.1rem 1.2rem;
111: .card h3 { margin-top: 0; }
112: .card p { margin: .4rem 0; color: var(--slate); font-size: .94rem; }
113: .card .meta { font-size: .8rem; color: var(--slate); border-top: 1px solid var(--line); margin-top: .8rem; padding-top: .6rem; }
120: padding: .8rem 1rem;
122: margin: 1.2rem 0;
124: .note p { margin: .3rem 0; }
126: table { border-collapse: collapse; width: 100%; margin: 1rem 0; font-size: .92rem; }
127: th, td { text-align: left; padding: .55rem .7rem; border: 1px solid var(--line); }
134: padding: 1.6rem 1.5rem;
```

## Normal-state contrast measurements

Alpha backgrounds are composited over their ancestors before sRGB luminance calculations. Repeated identical pairs are deduplicated; body threshold is 4.5:1 and large text threshold is 3:1. Raster logo content was visually checked, not reported as measured text.

### Before

| Pair | Ratio | Result |
|---|---|---|
| rgb(154, 163, 192) on 11,14,30 (body) | 7.64:1 | Pass |
| rgb(243, 241, 231) on 11,14,30 (large) | 16.93:1 | Pass |
| rgb(122, 92, 255) on 11,14,30 (large) | 4.38:1 | Pass |
| rgb(255, 184, 74) on 31,28,34 (body) | 9.83:1 | Pass |
| rgb(243, 241, 231) on 11,14,30 (body) | 16.93:1 | Pass |
| rgb(63, 224, 196) on 11,14,30 (body) | 11.56:1 | Pass |
| rgb(243, 241, 231) on 13,17,38 (body) | 16.48:1 | Pass |
| rgb(243, 241, 231) on 28,26,33 (body) | 15.22:1 | Pass |
| rgb(63, 224, 196) on 20,26,54 (body) | 10.29:1 | Pass |
| rgb(154, 163, 192) on 20,26,54 (body) | 6.8:1 | Pass |
| rgb(154, 163, 192) on 13,17,38 (body) | 7.44:1 | Pass |
| rgb(243, 241, 231) on 20,26,54 (body) | 15.07:1 | Pass |

### After

| Pair | Ratio | Result |
|---|---|---|
| rgb(63, 224, 196) on 11,14,30 (body) | 11.56:1 | Pass |
| rgb(154, 163, 192) on 11,14,30 (body) | 7.64:1 | Pass |
| rgb(243, 241, 231) on 11,14,30 (large) | 16.93:1 | Pass |
| rgb(63, 224, 196) on 11,14,30 (large) | 11.56:1 | Pass |
| rgb(11, 14, 30) on 63,224,196 (body) | 11.56:1 | Pass |
| rgb(243, 241, 231) on 11,14,30 (body) | 16.93:1 | Pass |
| rgb(63, 224, 196) on 20,26,54 (body) | 10.29:1 | Pass |
| rgb(243, 241, 231) on 20,26,54 (large) | 15.07:1 | Pass |
| rgb(154, 163, 192) on 20,26,54 (body) | 6.8:1 | Pass |
| rgb(243, 241, 231) on 13,17,38 (body) | 16.48:1 | Pass |
| rgb(243, 241, 231) on 28,26,33 (body) | 15.22:1 | Pass |
| rgb(154, 163, 192) on 13,17,38 (body) | 7.44:1 | Pass |
| rgb(243, 241, 231) on 20,26,54 (body) | 15.07:1 | Pass |

### Hover states

Primary ink on #73ecd7: 13.42:1. Secondary text on card: 15.07:1. Navigation/summary teal on ink: 11.56:1. Card violet-text on card: 8.03:1. Footer violet-text on ink: 9.02:1. All pass 4.5:1.

## Fix batches and re-audit

- Batch 1: findings 1–3. [Exact before/after lines](batch1.diff). Pass: five named sizes per viewport, 4px-based component spacing, headline and primary CTA win in inspected desktop/mobile screenshots. Contrast/motion/density intentionally remained for batch 2.
- Batch 2: findings 4–6. [Exact before/after lines](batch2.diff). Pass: readable prose measure, native disclosures, hover contrast, visible keyboard focus, reduced-motion override.
- Chromium checks passed at 320, 390, 768, and 1440px: no page overflow, broken images, or missing internal anchors. Expanded disclosures also tested at each width.
- Keyboard: skip link moves focus to main; Enter opens a focused disclosure. 200% text sizing at 720px passes overflow checks. No browser script errors. This is focused verification, not a full assistive-technology certification.
- Skill frontmatter/name/description and absence of unfinished placeholders checked locally. The bundled Python validator could not run because Python is not installed.

## Screenshots and reusable skill

[Desktop after](after-desktop.png) · [Mobile after](after-mobile.png). The complete original and intermediate screenshots remain in workspace .local-checks/web-design. Portable skill: [SKILL.md](../../.agents/skills/apple-design/SKILL.md); personal copy installed at ~/.codex/skills/apple-design/SKILL.md.

References: [user-linked native-platform skill](https://github.com/NutshellEngineering/apple-design-skill), [Apple HIG](https://developer.apple.com/design/human-interface-guidelines), [WCAG contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
