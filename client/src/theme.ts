/**
 * Bowling Planet — Design System Theme
 * ──────────────────────────────────────
 * Centralized design tokens for inline styles. 
 * These match the CSS variables defined in index.css.
 * Use these constants to maintain visual consistency across pages.
 */

export const theme = {
  colors: {
    // Surfaces
    void: '#000000',
    surface: '#0A0A0F',
    surface2: '#111118',
    surface3: '#1A1A24',
    
    // Brand Accents
    teal: '#5FC1D1',
    tealMid: '#4AAFBF',
    green: '#6DBD4E',
    greenMid: '#58A83E',
    purple: '#C084FC',
    
    // Text (Apple-inspired palette)
    text1: '#F5F5F7', // Primary white
    text2: '#86868B', // Secondary grey
    text3: '#48484A', // Tertiary dark grey
    
    // Borders
    border: 'rgba(255, 255, 255, 0.08)',
    borderMd: 'rgba(255, 255, 255, 0.14)',
    
    // Glows
    glowTeal: 'rgba(95, 193, 209, 0.14)',
    glowGreen: 'rgba(109, 189, 78, 0.11)',
  },
  
  typography: {
    fontDisplay: '"Plus Jakarta Sans", "Sora", "SF Pro Display", -apple-system, sans-serif',
    fontBody: '"Inter", -apple-system, "SF Pro Text", sans-serif',
  },
  
  layout: {
    maxWidth: 1320,
    sectionPadding: '160px 28px',
    sectionPaddingMobile: '80px 16px',
  },
  
  easing: {
    default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  }
}
