/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Ancient Library Color Palette
        'black-olive': '#393d32',
        'rust': {
          50: '#fdf4f2',
          100: '#fbe8e3',
          200: '#f6d5cd',
          300: '#eeb8a9',
          400: '#e29277',
          500: '#d4704f',
          600: '#c15637',
          700: '#a24429',
          800: '#aa3d1d', // Primary rust red
          900: '#7c2f17'
        },
        'scholar-blue': '#5c80bc',
        'champaign': {
          100: '#f1e3c8', // Light champaign for backgrounds
          200: '#ebe0c5',
          300: '#e3d8c0',
          400: '#d8c8a8',
          500: '#cdb896',
          600: '#c2a885',
          700: '#b49a67', // Primary champaign for text
          800: '#a08a5a',
          900: '#8c7a4d'
        },
        // Legacy red colors for compatibility
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          800: '#aa3d1d', // Map to rust
          900: '#7c2f17'  // Map to darker rust
        }
      },
      fontFamily: {
        'headline': ['Cinzel', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      backgroundColor: {
        'parchment': '#f1e3c8',
        'aged-paper': '#ebe0c5'
      }
    },
  },
  plugins: [],
}