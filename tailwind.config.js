/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Core neutrals ── */
        ink:       '#0d1b2a',   /* Deep navy – primary headings */
        inkLight:  '#1e293b',   /* Secondary dark text */
        paper:     '#ffffff',   /* Pure white */
        paperMid:  '#f8fafc',   /* Off-white sections */
        paperLow:  '#f1f5f9',   /* Subtle grey sections */
        muted:     '#64748b',   /* Body / muted text */
        border:    'rgba(0,0,0,0.08)',

        /* ── Brand palette ── */
        sapphire:  '#1e40af',   /* Primary CTA – deep sapphire */
        cobalt:    '#2563eb',   /* Hover / interactive blue */
        sky:       '#0ea5e9',   /* Accent sky blue */
        teal:      '#0d9488',   /* Italic / em accent */
        gold:      '#f59e0b',   /* Warm highlight gold */

        /* ── Legacy aliases (keep existing class names working) ── */
        cyan:        '#0ea5e9',
        magenta:     '#2563eb',
        neonPurple:  '#0d9488',
      },
      fontFamily: {
        display:   ['DM Sans',           'sans-serif'],
        editorial: ['Cormorant Garamond', 'serif'],
        body:      ['Manrope',            'sans-serif'],
      },
      boxShadow: {
        'soft-xl':      '0 28px 70px rgba(4, 11, 22, 0.10)',
        'card':         '0 4px 24px rgba(4, 11, 22, 0.07)',
        'card-hover':   '0 16px 48px rgba(4, 11, 22, 0.14)',
        'glow-sapphire':'0 0 24px rgba(30, 64, 175, 0.35)',
        'glow-teal':    '0 0 20px rgba(13, 148, 136, 0.30)',
        'glow-cyan':    '0 0 20px rgba(14, 165, 233, 0.30)',
        'glow-magenta': '0 0 20px rgba(37, 99, 235, 0.30)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    }
  },
  plugins: [],
};
