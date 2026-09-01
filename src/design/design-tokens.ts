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
