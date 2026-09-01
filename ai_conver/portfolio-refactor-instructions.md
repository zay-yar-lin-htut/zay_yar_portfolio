# Portfolio Refactor — Agent Instructions

**Repo:** `zay-yar-lin-htut/zay_yar_portfolio` (Vue 3 + Vite + Tailwind CSS v4 + vue-i18n)
**Scope:** Refactor the existing repo in place. Do NOT scaffold a new project — reuse the current `src/components`, `src/composables`, `src/data`, `src/locales` structure.

---

## 1. Goal

Replace all placeholder content with real profile data, fix known duplicate-heading bugs, and apply the new design token system (copper/amber accent on ink-navy / warm-paper backgrounds) in place of the current cyan→violet gradient theme.

---

## 2. Known Bugs — Fix These First

| Bug | File | Fix |
|---|---|---|
| Heading text duplicated: "My My Projects" | `src/components/projects.vue` (~line 14) | Template hardcodes `My ` before `{{ t(projectsData.title) }}`, and the locale string is already `"My Projects"`. Remove the hardcoded `My ` prefix, OR change the locale string to just `"Projects"`. Pick one — don't have both. |
| Heading text duplicated: "Technical Technical Skills" | `src/components/skills.vue` (~line 14) | Same pattern — hardcoded `Technical ` prefix + locale string `"Technical Skills"`. Fix the same way. |
| Placeholder brackets (`[Job Title]`, `[Company Name]`, `[Project Name]`, etc.) | `src/locales/en.json`, `src/locales/mm.json` | Replace with real content from Section 5 below. |

Apply the same "no duplicate prefix" check to any other section headings (`education.vue`, `experience.vue`, `contact.vue`) before assuming they're fine — verify each one against its locale string.

---

## 3. Design System

Use the token file already provided (`design-tokens.ts`) as the single source of truth. Summary for reference:

- **Background:** deep ink-navy `#0B0E14` (dark) / warm paper `#F7F5F1` (light) — not the current gray-900/gray-800
- **Accent:** single copper/amber tone (`#D9822F` light-mode default, `#E8A163`/`#D9822F` dark-mode) — replace the cyan (`#06b6d4`) + violet (`#a855f7`) two-tone gradient used throughout `navBar.vue`, buttons, and card borders
- **Typography:** sans-serif (Inter or similar) for body/headings; monospace reserved for labels, tags, nav — the repo already uses `font-mono` in places, keep that pattern but pair it with the new palette
- **Radius/shadow:** role-based, not uniform — see token file for exact values

Steps:
1. Create `src/design/design-tokens.ts` with the exact content in Section 3a below
2. Update `src/assets/theme.css` (or wherever CSS custom properties are defined) to pull from `applyCssVariables()` instead of the current hardcoded cyan/violet values
3. Search the codebase for hardcoded `#06b6d4`, `#a855f7`, `#22d3ee`, and any `linear-gradient(135deg, ...)` using those colors — replace with `var(--color-accent)` / `var(--color-accent-hover)`
4. Do not introduce a second accent color — this is a deliberate change from the current two-tone system

### 3a. `src/design/design-tokens.ts` (full file — create exactly as-is)

```typescript
/**
 * Design System Tokens
 * -----------------------------------------------------------
 * Direction: "Developer + Editorial"
 * A shift away from the generic cyan-to-violet gradient / dark
 * SaaS-card look. Base is a deep ink-navy surface, one warm
 * copper/amber accent (not a two-tone gradient), and a
 * monospace face reserved for labels/meta/code-like elements
 * to nod at the developer subject matter without turning the
 * whole page into a "terminal" pastiche.
 *
 * Usage in Vue:
 *   import { tokens } from '@/design/design-tokens'
 *   tokens.color.accent.default
 *
 * Or expose as CSS custom properties (see bottom of file) and
 * bind them once in your root App.vue / main.ts so components
 * can use var(--color-accent) etc. without importing JS.
 * -----------------------------------------------------------
 */

// ---------------------------------------------------------------
// 1. COLOR
// ---------------------------------------------------------------
const primitive = {
  ink: {
    950: '#0B0E14', // page background (dark mode)
    900: '#12161F',
    800: '#1B212C',
    700: '#262E3B',
    600: '#3A4456',
  },
  paper: {
    50: '#F7F5F1', // page background (light mode)
    100: '#EFEBE3',
    200: '#E2DCD0',
  },
  slate: {
    300: '#C7CDD6', // light text on dark
    500: '#8A93A3', // muted text
    700: '#4B5563', // muted text on light
  },
  copper: {
    400: '#E8A163', // accent, hover / light emphasis
    500: '#D9822F', // accent, primary
    600: '#B9691E', // accent, pressed / on-light emphasis
  },
  signal: {
    success: '#4FA37A',
    warning: '#D9A72F',
    danger: '#D9553A',
  },
} as const;

const color = {
  light: {
    background: primitive.paper[50],
    surface: primitive.paper[100],
    surfaceRaised: '#FFFFFF',
    border: primitive.paper[200],
    textPrimary: '#1B1B17',
    textSecondary: primitive.slate[700],
    accent: {
      default: primitive.copper[600],
      hover: primitive.copper[500],
    },
  },
  dark: {
    background: primitive.ink[950],
    surface: primitive.ink[900],
    surfaceRaised: primitive.ink[800],
    border: primitive.ink[700],
    textPrimary: '#F2EFE9',
    textSecondary: primitive.slate[300],
    accent: {
      default: primitive.copper[500],
      hover: primitive.copper[400],
    },
  },
  status: primitive.signal,
} as const;

// ---------------------------------------------------------------
// 2. TYPOGRAPHY
// ---------------------------------------------------------------
const typography = {
  fontFamily: {
    display: `'General Sans', 'Inter', -apple-system, sans-serif`,
    body: `'Inter', -apple-system, sans-serif`,
    mono: `'JetBrains Mono', 'IBM Plex Mono', monospace`,
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.375rem',
    '2xl': '1.75rem',
    '3xl': '2.25rem',
    '4xl': '3rem',
    '5xl': '4rem',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.15,
    snug: 1.35,
    normal: 1.6,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.04em',
  },
} as const;

// ---------------------------------------------------------------
// 3. SPACING (4px base unit)
// ---------------------------------------------------------------
const spacing = {
  0: '0px', 1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px',
  6: '24px', 8: '32px', 10: '40px', 12: '48px', 16: '64px',
  20: '80px', 24: '96px', 32: '128px',
} as const;

// ---------------------------------------------------------------
// 4. RADIUS
// ---------------------------------------------------------------
const radius = {
  none: '0px',
  sm: '4px', // tags, badges
  md: '8px', // buttons, inputs
  lg: '12px', // cards
  full: '9999px', // pills, avatars
} as const;

// ---------------------------------------------------------------
// 5. SHADOW
// ---------------------------------------------------------------
const shadow = {
  none: 'none',
  sm: '0 1px 2px rgba(11, 14, 20, 0.08)',
  md: '0 4px 12px rgba(11, 14, 20, 0.12)',
  lg: '0 12px 32px rgba(11, 14, 20, 0.18)',
  accentGlow: '0 0 24px rgba(217, 130, 47, 0.25)', // used once, sparingly
} as const;

// ---------------------------------------------------------------
// 6. BREAKPOINTS
// ---------------------------------------------------------------
const breakpoint = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

// ---------------------------------------------------------------
// 7. MOTION
// ---------------------------------------------------------------
const motion = {
  duration: {
    fast: '120ms',
    base: '200ms',
    slow: '400ms',
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  },
} as const;

// ---------------------------------------------------------------
// 8. Z-INDEX
// ---------------------------------------------------------------
const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
} as const;

// ---------------------------------------------------------------
// Export
// ---------------------------------------------------------------
export const tokens = {
  color,
  typography,
  spacing,
  radius,
  shadow,
  breakpoint,
  motion,
  zIndex,
} as const;

export type Tokens = typeof tokens;
export type ColorMode = 'light' | 'dark';

export function applyCssVariables(mode: ColorMode = 'dark') {
  const root = document.documentElement;
  const c = tokens.color[mode];

  root.style.setProperty('--color-background', c.background);
  root.style.setProperty('--color-surface', c.surface);
  root.style.setProperty('--color-surface-raised', c.surfaceRaised);
  root.style.setProperty('--color-border', c.border);
  root.style.setProperty('--color-text-primary', c.textPrimary);
  root.style.setProperty('--color-text-secondary', c.textSecondary);
  root.style.setProperty('--color-accent', c.accent.default);
  root.style.setProperty('--color-accent-hover', c.accent.hover);

  root.style.setProperty('--font-display', tokens.typography.fontFamily.display);
  root.style.setProperty('--font-body', tokens.typography.fontFamily.body);
  root.style.setProperty('--font-mono', tokens.typography.fontFamily.mono);
}
```

Call `applyCssVariables(mode)` once in `App.vue`'s `onMounted`, and again whenever the existing dark/light toggle composable (`useTheme.ts`) flips modes, so CSS variables stay in sync with the toggle.

⚠️ Note: `General Sans` and `JetBrains Mono` are not currently installed in this repo (checked `package.json` — only system/default fonts are used). Either add them via `@fontsource` packages or Google Fonts `<link>`, or swap them for fonts already available. I have **not verified** whether `General Sans` is free for commercial/self-hosted use — double check its license before shipping (~60% confidence it's fine, since most "Sans" variants like this are OFL-licensed, but I haven't confirmed this specific one).

---

## 4. Project Structure

This is a refactor, not a rewrite — most of this structure already exists in the repo. Verify against it and fill any gaps; don't restructure folders that are already correct.

```
src/
├── design/
│   └── design-tokens.ts       ← NEW — create from Section 3a above
├── components/
│   ├── navBar.vue              ← existing, update colors only
│   ├── heroSection.vue         ← existing
│   ├── aboutMe.vue             ← existing
│   ├── education.vue           ← existing — remove Certifications card (Section 4)
│   ├── experience.vue          ← existing
│   ├── skills.vue              ← existing — fix "Technical Technical" bug
│   ├── projects.vue            ← existing — fix "My My" bug, populate 4 cards
│   ├── contact.vue             ← existing
│   └── ui/
│       └── ContentBox.vue      ← existing shared card component
├── composables/
│   └── useTheme.ts             ← existing dark/light toggle — wire up applyCssVariables()
├── data/
│   ├── about.ts
│   ├── education.ts
│   ├── experience.ts
│   ├── hero.ts
│   ├── nav.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── index.ts                ← existing — these already correctly hold i18n *keys*, not raw text; only the locale files need real content
├── locales/
│   ├── en.json                 ← fill placeholders with Section 5/6 content
│   └── mm.json                 ← translate the same content into Burmese, keep in sync with en.json
├── assets/
│   └── theme.css                ← replace hardcoded cyan/violet CSS vars with tokens
└── App.vue                     ← call applyCssVariables() in onMounted
```

**Rules for this refactor:**
- Don't rename existing component files or change their casing (`aboutMe.vue` stays as-is) — avoid unrelated diff noise
- Don't introduce a state management library (Pinia/Vuex) for this — the site is static content, `data/*.ts` + `useTheme.ts` composable is sufficient
- Keep `en.json` and `mm.json` structurally identical (same keys, same nesting) — a missing key in one language will silently fall back and look broken
- If a new reusable UI pattern is needed (e.g. a "Private Project" badge for the client-work project cards in Section 6), add it to `components/ui/`, not inline in `projects.vue`

---

## 5. Real Profile Content

### Basic Info
- **Name:** Zay Yar Lin Htut
- **Role:** Mid-Level Full-Stack Developer
- **Location:** Yangon, Myanmar
- **Email:** yaza9036@gmail.com
- **Phone:** +959973944946 *(user has confirmed this is OK to publish as-is)*
- **GitHub:** https://github.com/zay-yar-lin-htut
- **LinkedIn:** https://www.linkedin.com/in/zay-yar-lin-htut-290785326/

### Bio / Summary

**English:**
Mid-Level Full-Stack Developer with a strong interest in Clean Architecture and exploring modern software technologies. Experienced in building scalable web applications, designing RESTful APIs, integrating AI background workflows, and managing cloud storage infrastructure. Passionate about continuous learning and writing maintainable, structured code.

**Myanmar:**
Clean Architecture ပိုင်းကို စိတ်ဝင်စားပြီး နည်းပညာအသစ်များကို အမြဲမပြတ် လေ့လာစုံစမ်းနေသော Mid-Level Full-Stack Developer တစ်ဦးဖြစ်ပါသည်။ Scalable ဖြစ်သော Web Application များ တည်ဆောက်ခြင်း၊ RESTful API များ ရေးသားခြင်း၊ AI Background Workflow များကို ချိတ်ဆက်ခြင်းနှင့် Cloud Storage Infrastructure များကို စီမံခန့်ခွဲခြင်းတို့တွင် အတွေ့အကြုံရှိပြီး Clean Code နှင့် ရေရှည် ထိန်းသိမ်းရလွယ်ကူသော Architecture များကို အလေးထား တည်ဆောက်ပါသည်။

### Work Experience

**1. Junior Developer — Thetys Myanmar** (2025 – 2026)
Location: MyaKhwarNyo Housing, No.1/A MyaKhwarNyo 3rd Street, Yangon
- Full-stack development and platform maintenance across key client products
- Built backend APIs using C# .NET Core, Vue 3 UI components, integrated Hangfire background jobs, PDF/Excel generation, and email services (OCR-processing platform)
- Updated frontend features on an HR platform and used AI-assisted workflows to migrate a client's mobile app from FlutterFlow to clean, native Flutter code
- Skills tags: `C# .NET Core`, `Vue 3`, `Flutter`, `Hangfire`

**2. Data / AI Infrastructure Intern — My Day Thu Kywal** (2025)
Location: 118/B Thanlwin Rd, Yangon
- Built infrastructure and integration pipelines for AI initiatives, working independently
- Managed Linux servers via SSH, deployed MinIO Object Storage to centralize team datasets, configured environment architecture
- Authored RESTful APIs to expose trained ML models to web applications; collaborated via Git
- Skills tags: `Linux`, `MinIO`, `REST API`, `Git`

**3. School Projects & Hands-on Practice** (2024 – 2025)
- Final-year project: cloud-deployed vehicle rental platform (see Projects section below)
- Backend Developer for a team school magazine site — REST APIs in Laravel, media assets managed via AWS S3
- Skills tags: `Laravel`, `React.js`, `Docker`, `AWS S3`

### Education
- **Bachelor of Science (Computing)** — KMD / University of Greenwich (2024 – 2025)
- **NCC L5 (Advanced Diploma in Computing)** — MST College (2023 – 2024)
- **NCC L4 (Diploma in Computing)** — MST College (2020 – 2023)

### Skills
- **Languages & Frameworks:** Laravel, Vue 3, React.js, TypeScript, C# (.NET Core), Python, Flutter
- **Databases:** MySQL, MSSQL
- **Cloud & DevOps / Tools:** AWS (S3), Cloudflare (R2), Docker, MinIO, Git, Linux/SSH

If keeping the existing skill-bar (%) UI pattern, use relative honest estimates (e.g. Vue 3 / Laravel = advanced, Flutter / Python = intermediate) rather than inventing precise numbers — or consider switching to a tag/level-badge layout instead of percentage bars, since exact percentages aren't something a developer can verify about themselves.

### Certifications section
No real certifications currently — **remove the Certifications card/section** from `education.vue` rather than leaving a "View All / [Click to view]" placeholder. Add it back later if certs are earned.

---

## 6. Projects (generalized — client confidentiality preserved)

Populate all project card slots with these four. Client/company names are omitted or referred to generically per confidentiality.

**1. Vehicle Rental Platform** *(personal/school project — can use full detail)*
- Cloud-deployed vehicle rental platform for a final-year project
- Stack: Laravel, React.js, Cloudflare R2, MySQL
- Containerized backend with Docker; hosted across Vercel, Render, and Aiven
- Links: GitHub repo if available; omit live demo link if not currently hosted

**2. Document OCR Processing Platform** *(generalized from client work — no client name)*
- Backend APIs built with C# .NET Core; Vue 3 frontend components
- Background job processing (Hangfire), automated PDF/Excel report generation, email notification service
- Stack tags: `C# .NET Core`, `Vue 3`, `Hangfire`
- No public repo/demo link (client project) — omit "Code"/"Demo" buttons or replace with "Private/Client Project" label

**3. HR Management Platform** *(generalized from client work — no client name)*
- Frontend feature development on an existing HR platform
- Used AI-assisted workflows to migrate a companion mobile app from FlutterFlow to native Flutter
- Stack tags: `Flutter`, `Frontend`, `AI-assisted migration`
- No public repo/demo link (client project) — same treatment as above

**4. School Magazine Website** *(school project — can use full detail)*
- Backend Developer role — designed REST APIs in Laravel
- Media asset management via AWS S3
- Stack tags: `Laravel`, `REST API`, `AWS S3`
- Links: GitHub repo if available

⚠️ Note: I don't have confirmation on whether "Document OCR Processing Platform" or "HR Management Platform" are under an NDA that restricts even generalized descriptions. Confidence this generalized framing is safe to publish: **~70%** — worth a quick gut-check with any employment contract before publishing, since I can't verify that from here.

---

## 7. Acceptance Criteria

- [ ] No `[bracket placeholder]` text remains anywhere in `en.json` / `mm.json`
- [ ] No duplicated heading text (verify every section heading against its locale string)
- [ ] Cyan/violet colors fully replaced by copper/amber + ink-navy token system
- [ ] Certifications section removed (or clearly marked "Coming soon" if preferred instead of removal — confirm with user)
- [ ] All 4 project cards populated; client-work cards show no fake GitHub/demo links
- [ ] Both `en.json` and `mm.json` updated in parallel (don't leave one language stale)
- [ ] Contact form phone/email display the real values above
- [ ] Site builds and runs (`npm run dev`) with no console errors after changes
