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

    // Light surfaces (consulting sections)
    chalk: '#F7F7F5',
    chalk2: '#EEEEEC',
    ink: '#0D0D10',
    ink2: '#3A3A40',
    ink3: '#7A7A82',

    // Brand Accents
    teal: '#5FC1D1',
    tealMid: '#4AAFBF',
    green: '#6DBD4E',
    greenMid: '#58A83E',
    purple: '#C084FC',
    amber: '#FFAA33',

    // Text (Apple-inspired palette)
    text1: '#F5F5F7', // Primary white
    text2: '#86868B', // Secondary grey
    text3: '#48484A', // Tertiary dark grey

    // Admin Portal Colors
    adminBg: '#F4F6F9',
    adminSurface: '#FFFFFF',
    adminSurfaceHover: '#FAFBFC',
    prussianBlue: '#030D1A',        // Darker Sidebar background
    prussianBlue2: '#081729',       // Sidebar hover states
    prussianBlueBorder: 'rgba(255,255,255,0.07)',
    prussianBlueText: 'rgba(255,255,255,0.60)',
    adminText: '#0F172A',
    adminTextMuted: '#64748B',
    adminTextLight: '#94A3B8',
    adminBorder: '#E2E8F0',
    adminBorderStrong: '#CBD5E1',
    adminAccent: '#2946c8a3',         // Teal accent
    adminAccentBg: 'rgba(81, 106, 176, 0.08)',
    adminDanger: '#EF4444',
    adminSuccess: '#10B981',
    adminWarning: '#F59E0B',

    // Borders
    border: 'rgba(255, 255, 255, 0.08)',
    borderMd: 'rgba(255, 255, 255, 0.14)',
    borderChalk: 'rgba(0, 0, 0, 0.08)',

    // Glows
    glowTeal: 'rgba(95, 193, 209, 0.14)',
    glowGreen: 'rgba(109, 189, 78, 0.11)',
  },

  typography: {
    fontDisplay: "'DM Serif Display', Georgia, serif",
    fontBody: "'DM Sans', 'Inter', -apple-system, sans-serif",
    fontData: "'Sora', 'Plus Jakarta Sans', sans-serif",
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
