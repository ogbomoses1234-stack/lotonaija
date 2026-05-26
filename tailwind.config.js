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
          primary: '#2563eb',    // blue-600
          success: '#10b981',    // emerald-500
          accent: '#f59e0b',     // amber-500
          transfer: '#a855f7'    // purple-500
        },
        base: {
          dark: '#0f172a'        // slate-900
        }
      },
      borderRadius: {
        card: '30px'
      },
      screens: {
        'mobile-max': { max: '480px' }
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        shake: 'shake 0.4s ease-in-out',
        'laser-sweep': 'laser-sweep 1.2s ease-in-out forwards',
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
        'laser-sweep': {
          '0%': { left: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { left: '100%', opacity: '0' }
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