/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary)',     /* Maps directly to #6AD09D (Green) */
          secondary: 'var(--brand-secondary)', /* Maps directly to #1B1C1E (Charcoal) */
          success: 'var(--brand-success)',     /* Maps directly to #6AD09D (Green) */
          danger: 'var(--brand-danger)',       /* Maps directly to #EF4444 (Red) */
          warning: 'var(--brand-warning)',     /* Maps directly to #F59E0B (Amber) */
        },
        base: {
          body: 'var(--bg-body)',              /* Maps directly to #FFFFFF (White) */
          container: 'var(--bg-container)',    /* Maps directly to #FFFFFF (White) */
          panel: 'var(--bg-panel)',            /* Maps directly to #1B1C1E (Charcoal) */
          card: 'var(--bg-card)',              /* Maps directly to #000000 (Black) */
        },
        border: {
          flat: 'var(--border-flat)',          /* Maps directly to #2E3033 */
          light: 'var(--border-light)',        /* Maps directly to #E5E7EB */
        }
      },
      borderRadius: {
        card: '16px'                           /* Updated from 30px to align with your index.css specifications */
      },
      screens: {
        'mobile-max': { max: '480px' }
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        shake: 'shake 0.4s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: []
};