// postcss.config.js - Tailwind CSS v3 compatible
export default {
  plugins: {
    tailwindcss: {},  // v3 uses 'tailwindcss' directly, not '@tailwindcss/postcss'
    autoprefixer: {},
  },
}