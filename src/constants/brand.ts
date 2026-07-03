/**
 * Brand constants — mirrors brand.css for use in JS/Canvas contexts.
 * For CSS: import brand.css and use CSS variables.
 * For JS (canvas, WebGL, Three.js): use these constants.
 */
export const BRAND = {
  blue:          '#0072CE',  // Pantone 285 C
  blueDark:      '#0058A3',  // Pantone 286 C
  blueLight:     '#3395D6',  // Pantone 285 U
  orange:        '#FF6900',  // Pantone 1505 C
  orangeDark:    '#D45500',
  orangeLight:   '#FF8F3E',
  cyan:          '#00B5CC',  // Pantone 3125 C
  cyanDark:      '#0093A8',
  black:         '#0A0A0A',  // Pantone Black C
  blackSurface:  '#111111',
  blackElevated: '#1A1A1A',
  white:         '#F5F5F5',  // Pantone 11-0601 TPG
} as const

/** WebGL-ready vec3 (0–1 range) */
export const BRAND_GL = {
  blue:    [0.000, 0.447, 0.808] as const,
  orange:  [1.000, 0.412, 0.000] as const,
  cyan:    [0.000, 0.710, 0.800] as const,
  black:   [0.039, 0.039, 0.039] as const,
  navy:    [0.020, 0.035, 0.075] as const,
} as const

export type BrandColor = keyof typeof BRAND
