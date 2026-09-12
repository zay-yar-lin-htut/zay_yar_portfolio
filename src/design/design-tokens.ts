/**
 * Design Tokens — Electric Cyan / Dark
 *
 * Palette: deep near-black + electric cyan-blue.
 * Typography: Space Grotesk (display), IBM Plex Sans (body), JetBrains Mono (code).
 * No warm tints. No cream. No terracotta.
 */

const primitive = {
  dark: {
    950: '#0E1116',
    900: '#161B22',
    800: '#1C2128',
    700: '#30363D',
    600: '#484F58',
  },
  neutral: {
    50: '#F7F7F5',
    100: '#EAEAE6',
    200: '#D0D7DE',
    300: '#B0B8C1',
  },
  gray: {
    100: '#E6EDF3',
    300: '#8B949E',
    500: '#656D76',
    700: '#3D4450',
  },
  cyan: {
    400: '#33DDFF',
    500: '#00D4FF',
    600: '#0077B6',
    700: '#005F99',
  },
  signal: {
    success: '#3FB950',
    warning: '#D29922',
    danger: '#F85149',
  },
} as const;

const color = {
  dark: {
    background: primitive.dark[950],
    surface: primitive.dark[900],
    surfaceRaised: primitive.dark[800],
    border: primitive.dark[700],
    textPrimary: primitive.gray[100],
    textSecondary: primitive.gray[300],
    accent: {
      default: primitive.cyan[500],
      hover: primitive.cyan[400],
    },
  },
  light: {
    background: primitive.neutral[50],
    surface: '#FFFFFF',
    surfaceRaised: '#FFFFFF',
    border: primitive.neutral[200],
    textPrimary: primitive.dark[950],
    textSecondary: primitive.gray[500],
    accent: {
      default: primitive.cyan[600],
      hover: primitive.cyan[700],
    },
  },
  status: primitive.signal,
} as const;

const typography = {
  fontFamily: {
    display: `'Space Grotesk', -apple-system, sans-serif`,
    body: `'IBM Plex Sans', -apple-system, sans-serif`,
    mono: `'JetBrains Mono', 'IBM Plex Mono', monospace`,
  },
} as const;

export const tokens = { color, typography } as const;

export type Tokens = typeof tokens;
export type ColorMode = 'dark' | 'light';

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
