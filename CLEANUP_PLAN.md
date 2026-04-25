# Portfolio Project — Cleanup & Restructure Plan

> Analysis date: April 7, 2026  
> Stack: Vue 3 · Vite · Tailwind CSS v4 · vue-i18n · vue-tippy

---

## 1. Identified Issues

### 1.1 Bugs / Broken Things

| # | File | Issue |
|---|------|-------|
| B1 | `index.html` | `<html lang="">` — `lang` attribute is empty, breaks accessibility & SEO |
| B2 | `index.html` | Favicon path `href="@/../public/hertz.ico"` is invalid. Should be `/hertz.ico` |
| B3 | `index.html` | `style.css` is loaded **twice**: once via `<link>` in HTML and again via `import` in `main.js` |
| B4 | `main.js` | `useTheme()` is called outside a Vue component after the app is mounted — `watch` registered at module scope will not be cleaned up |
| B5 | `pages/main.vue` | `window.addEventListener('resize', …)` has no cleanup (`onUnmounted`), causing a memory leak |
| B6 | `src/components/heroSection.vue` | Hard-coded placeholder text `[Feature 2]` and `[Feature Detail]` still in template |
| B7 | `src/components/contact.vue` | Contact form `@submit.prevent` has **no handler** — form is completely non-functional |
| B8 | `src/local/eng.json` | Real hero description is `"I'm rapper, BRUH!"` — obvious test string left in production copy |

---

### 1.2 Data Duplication

| # | Symptom |
|---|---------|
| D1 | `src/data/index.js` exports `projectsData` but `projects.vue` ignores it and defines its **own local `projects` array** (identical content) |
| D2 | `src/data/index.js` exports `skillsData` but `skills.vue` ignores it and defines its **own local `skills` array** (identical content) |
| D3 | `src/data/index.js` exports `navData` but `navBar.vue` ignores it and defines its **own local `navItems` array** |
| D4 | `educationData` has a nested `skills` array that **duplicates the same four icons/keys** already in `skillsData` |

---

### 1.3 CSS Duplication & Conflicts

| # | Symptom |
|---|---------|
| C1 | `.card` is defined in **both** `theme.css` (global) **and** `contentBox.vue` `<style scoped>` — scoped version wins unpredictably |
| C2 | `.liquid-glass` is defined in **both** `liquid-glass.css` **and** `theme.css` — two conflicting declarations |
| C3 | `style.css` only imports other files; serves no purpose other than an entry point — importing from two places causes the double-load in B3 |
| C4 | `tailwind.config.js` content glob misses the root `index.html` (should be `["index.html", "./src/**/*.{vue,js,ts}"]`) |
| C5 | With Tailwind v4 + `@tailwindcss/vite`, `tailwind.config.js` font config should be moved to CSS `@theme` block — the JS config file is largely redundant |

---

### 1.4 Code Quality / Architecture

| # | File | Issue |
|---|------|-------|
| Q1 | `pages/main.vue` | Mixes `@/` alias and relative `../components/` imports in the same file |
| Q2 | `navBar.vue` | Hover indicator logic is **duplicated inline** — the `useHoverIndicator` composable already exists for this purpose |
| Q3 | `projects.vue` | Imports `projectsData` from `@/data` at the top but **never uses it** (uses local array instead) — dead import |
| Q4 | `src/data/index.js` | Single monolithic file exporting 6+ data objects — should be split into one file per section |
| Q5 | `src/local/` | Directory is named `local` instead of the conventional `locales` |
| Q6 | `contentBox.vue` | `hoverColor` prop accepts a string like `'cyan'` and uses Tailwind's `hover:border-${hoverColor}-500/50` — dynamic class strings are **purged by Tailwind** in production builds |
| Q7 | `heroSection.vue` | `bite()` animation toggles between two circles, but one circle still contains "DEVOPS" and placeholder text — business logic is unclear |
| Q8 | All components | Inline `style` attributes used for theming (e.g. `:style="{ color: 'var(--text-secondary)' }"`) when CSS custom property classes already exist in `theme.css` |
| Q9 | `main.js` | `useTheme` is imported but `initTheme()` must be called manually after mount — should be auto-initialised |

---

### 1.5 Junk / Orphan Files

| File | Reason to Remove / Move |
|------|--------------------------|
| `temp.md` | Temporary scratch file — delete |
| `public/arrays.ts` | TypeScript source file in `public/` makes no sense — either move to `src/` or delete |
| `profile/README.md` | Empty placeholder stub — delete or replace with real content |
| `jsconfig.json` | Redundant if you migrate to `tsconfig.json` (or keep but verify paths match `vite.config.js`) |

---

## 2. Restructure Plan

### 2.1 Target Folder Structure

```
portfolio/
├── index.html                    ← fix lang, favicon, remove duplicate CSS link
├── vite.config.js
├── tailwind.config.js            ← remove (migrate font config to CSS)
├── package.json
├── jsconfig.json
│
└── src/
    ├── main.js                   ← clean bootstrap, move theme init here properly
    ├── assets/
    │   ├── main.css              ← single entry (rename from style.css)
    │   ├── theme.css             ← keep, fix card/liquid-glass duplicates
    │   ├── liquid-glass.css      ← keep (deduplicated)
    │   └── fonts/
    │       └── LavishlyYours-Regular.ttf
    │
    ├── components/
    │   ├── NavBar.vue            ← rename to PascalCase, use composable
    │   ├── HeroSection.vue
    │   ├── AboutMe.vue
    │   ├── Education.vue
    │   ├── Experience.vue
    │   ├── Skills.vue
    │   ├── Projects.vue
    │   ├── Contact.vue
    │   └── ui/                   ← shared UI primitives
    │       └── ContentBox.vue    ← fix dynamic class purge issue
    │
    ├── composables/
    │   ├── useTheme.js           ← fix watch scope
    │   └── useHoverIndicator.js  ← already clean
    │
    ├── data/                     ← split into per-section files
    │   ├── index.js              ← re-exports everything
    │   ├── hero.js
    │   ├── about.js
    │   ├── experience.js
    │   ├── education.js
    │   ├── skills.js
    │   ├── projects.js
    │   └── nav.js
    │
    ├── locales/                  ← rename from local/
    │   ├── en.json               ← rename from eng.json
    │   └── mm.json
    │
    └── pages/
        └── MainPage.vue          ← rename, fix leak, consistent imports
```

---

## 3. Phase-by-Phase Execution Plan

### Phase 1 — Remove Junk & Fix Critical Bugs
_Low risk, no functional changes_

- [ ] **1.1** Delete `temp.md`, `public/arrays.ts`, `profile/README.md`
- [ ] **1.2** Fix `index.html`: set `lang="en"`, fix favicon to `/hertz.ico`, remove duplicate `<link>` for `style.css`
- [ ] **1.3** Fix `main.js`: remove double CSS import (keep only the JS import), fix `useTheme` scope by calling `initTheme()` inside the app setup properly
- [ ] **1.4** Fix memory leak in `pages/main.vue`: add `onUnmounted` cleanup for resize listener
- [ ] **1.5** Fix `eng.json`: replace `"I'm rapper, BRUH!"` with real/placeholder description

---

### Phase 2 — Eliminate Data Duplication
_Medium risk — component data sources change_

- [ ] **2.1** Split `src/data/index.js` into `hero.js`, `about.js`, `experience.js`, `education.js`, `skills.js`, `projects.js`, `nav.js` — create barrel `index.js`
- [ ] **2.2** Update `skills.vue` to import from `@/data/skills` instead of defining local array
- [ ] **2.3** Update `projects.vue` to import from `@/data/projects`, remove dead import, remove local duplicate array
- [ ] **2.4** Update `navBar.vue` to import from `@/data/nav` and use composable for hover indicator
- [ ] **2.5** Remove the duplicate `skills` array from `educationData` in `education.js`

---

### Phase 3 — Fix CSS Duplication & Conflicts
_Medium risk — visual regression possible, needs testing_

- [ ] **3.1** Remove `.card` block from `contentBox.vue` `<style scoped>` (keep only in `theme.css`)
- [ ] **3.2** Remove duplicate `.liquid-glass` definition from `theme.css` (keep only in `liquid-glass.css`)
- [ ] **3.3** Rename `style.css` → `main.css`, update import in `main.js`
- [ ] **3.4** Fix `tailwind.config.js` content glob to include root `index.html`
- [ ] **3.5** Migrate font family config from `tailwind.config.js` to `@theme` block in `main.css` (Tailwind v4 way), then delete `tailwind.config.js`
- [ ] **3.6** Fix `contentBox.vue` dynamic Tailwind class purge bug — replace `hover:border-${color}-500/50` with explicit safelist entries or CSS variables

---

### Phase 4 — Architecture & Code Quality
_Higher risk — refactoring, needs full component re-test_

- [ ] **4.1** Rename files to PascalCase consistently: `navBar.vue` → `NavBar.vue`, `contentBox.vue` → `ContentBox.vue`, update all imports
- [ ] **4.2** Rename `src/local/` → `src/locales/`, rename `eng.json` → `en.json`, update `main.js` imports
- [ ] **4.3** Move `ContentBox.vue` to `src/components/ui/ContentBox.vue`
- [ ] **4.4** Fix all component imports to use `@/` alias (no relative `../` paths)
- [ ] **4.5** Replace inline `:style="{ color: 'var(--text-secondary)' }"` patterns with utility classes from `theme.css` (`.text-secondary`, `.text-muted`, etc.)
- [ ] **4.6** Implement contact form handler (at minimum a `mailto:` fallback or basic validation + `console` stub clearly marked as `TODO`)
- [ ] **4.7** Clean up `heroSection.vue` placeholder content — define real second circle content or remove it

---

### Phase 5 — Verification
- [ ] **5.1** Run `vite build` — check for zero errors and zero purged-class warnings
- [ ] **5.2** Test dark/light theme toggle
- [ ] **5.3** Test language switcher (EN / MM)
- [ ] **5.4** Test all nav links scroll correctly
- [ ] **5.5** Verify no 404s in network tab (favicon, fonts, images)
- [ ] **5.6** Run `vite preview` and test on mobile viewport

---

## 4. Priority Summary

| Priority | Items |
|----------|-------|
| 🔴 Critical (fix now) | B1 B2 B3 B4 B5 B8 Q3 |
| 🟡 High (fix before ship) | D1 D2 D3 C1 C2 Q1 Q2 Q6 B6 B7 |
| 🟢 Nice to have | C5 Q4 Q5 Q8 Q9 D4 |
| 🗑️ Delete | `temp.md` · `public/arrays.ts` · `profile/README.md` |

---

## 5. Files Touched Per Phase

| Phase | Files Modified | Files Created | Files Deleted |
|-------|---------------|---------------|---------------|
| 1 | `index.html`, `main.js`, `pages/main.vue`, `locales/en.json` | — | `temp.md`, `public/arrays.ts`, `profile/README.md` |
| 2 | `skills.vue`, `projects.vue`, `navBar.vue`, `data/index.js` | `data/hero.js` … `data/nav.js` | — |
| 3 | `theme.css`, `liquid-glass.css`, `main.css`, `contentBox.vue`, `tailwind.config.js` | — | `tailwind.config.js` (after migration) |
| 4 | All components, `main.js`, all data files | `components/ui/ContentBox.vue` | `navBar.vue` (renamed), `contentBox.vue` (renamed) |
| 5 | — | — | — |
