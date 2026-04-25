# Project Update Plan (Based on `PORTFOLIO_ANALYSIS.md`)

> Date: April 7, 2026  
> Goal: Modernize UI/UX while preserving current architecture and your latest constraints (TypeScript-only, single font)

---

## 1) What to Keep vs Adjust from Analysis

## Keep (High Value)
- Stronger dark/light palette with clearer contrast
- Better hero hierarchy (larger title, stronger CTA)
- Cleaner component styling (cards, pills, spacing)
- Sticky nav + smoother section navigation
- Incremental rollout in phases

## Adjust (To match your current constraints)
- Keep **Inter as the only font** across the project
- Do **not** add any new font families (no Playfair/Poppins/Jersey/Lavishly)
- Preserve current TypeScript structure (`.ts` + `lang="ts"`)
- Avoid over-animated effects that reduce performance

---

## 2) Recommended Execution Order

## Phase A — Design Tokens Refresh (Safe + High Impact)
**Target files:**
- `src/assets/theme.css`
- `src/assets/liquid-glass.css`

**Changes:**
- Update dark/light color variables to deeper contrast-safe palette
- Keep one primary accent + one secondary accent (teal-first system)
- Normalize text contrast levels (`primary`, `secondary`, `muted`)
- Refine card surface + border tokens for cleaner layering

**Acceptance criteria:**
- Text remains readable in both themes
- Buttons, links, and highlights use consistent accent hierarchy
- No hard-coded ad-hoc colors introduced outside token system

---

## Phase B — Hero & CTA Upgrade
**Target file:**
- `src/components/heroSection.vue`

**Changes:**
- Increase heading scale and tighten hierarchy
- Improve CTA prominence (`Contact` button glow/contrast)
- Refine profile visual treatment (subtle border/glow)
- Polish stats cards spacing/weight

**Acceptance criteria:**
- Hero reads clearly in first 2 seconds (name → role → CTA)
- CTA is the strongest visual action
- No layout breakage on mobile/tablet/desktop

---

## Phase C — Component Consistency (Skills / Projects / Cards)
**Target files:**
- `src/components/skills.vue`
- `src/components/projects.vue`
- `src/components/ui/ContentBox.vue`
- `src/assets/theme.css`

**Changes:**
- Standardize card hover/outline/elevation style
- Refine tag/pill visuals for stack labels
- Improve project action buttons (`Code`, `Demo`) visual hierarchy
- Reduce noisy gradients while keeping modern look

**Acceptance criteria:**
- Cards have one consistent style language
- Hover states feel unified across sections
- Skills/projects appear visually cohesive with hero/nav

---

## Phase D — Navigation & Spacing System
**Target files:**
- `src/components/navBar.vue`
- `src/pages/main.vue`
- `src/assets/theme.css`

**Changes:**
- Make nav consistently sticky with clean backdrop
- Normalize section top/bottom spacing rhythm
- Ensure anchor scrolling lands sections nicely (no clipped heading under nav)
- Keep touch target sizes mobile-friendly

**Acceptance criteria:**
- Navigation remains readable while scrolling
- Section transitions feel smooth and predictable
- Mobile nav interactions remain clear and usable

---

## Phase E — Motion Polish (Minimal + Performance-safe)
**Target files:**
- `src/assets/theme.css`
- (Optional) specific component styles where needed

**Changes:**
- Add subtle entrance/hover transitions only where valuable
- Keep motion short and calm (no heavy continuous animation)
- Respect performance on lower-end devices

**Acceptance criteria:**
- Motion improves feedback, not distraction
- No jank during scrolling/hovering
- Build size/perf impact remains small

---

## 3) Guardrails During Implementation

- Keep all new logic in TypeScript
- Keep Inter as the only font
- Prefer design tokens over inline color literals
- Avoid introducing new dependencies unless necessary
- Validate after each phase with `npm run build`

---

## 4) Validation Checklist per Phase

- [ ] `npm run build` passes
- [ ] Dark mode visual check
- [ ] Light mode visual check
- [ ] Mobile viewport check
- [ ] Hero + nav + projects interaction check

---

## 5) Delivery Strategy

- Implement phase-by-phase with small, reviewable commits
- End each phase with a short changelog summary
- Prioritize visible improvements first (A + B), then consistency (C + D), then polish (E)

---

## Suggested Next Step

Start with **Phase A + Phase B** in one pass (highest visual impact, lowest structural risk), then run build and quick visual QA before moving to Phase C.
