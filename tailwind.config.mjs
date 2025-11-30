/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // 2026 Epic Fantasy Color Palette - Based on hero image
        'black-olive': '#1a2332', // Deep navy blue background
        'midnight-blue': '#0f1827', // Darkest blue
        'rust': {
          50: '#fff4ed',
          100: '#ffe6d5',
          200: '#fecdaa',
          300: '#fdab74',
          400: '#fb8043',
          500: '#f85d1f', // Vibrant orange
          600: '#e94310',
          700: '#c2320f',
          800: '#9a2915', // Primary orange-red
          900: '#7c2414'
        },
        'flame': {
          100: '#fff3e0',
          200: '#ffe0b2',
          300: '#ffcc80',
          400: '#ffb74d',
          500: '#ffa726', // Golden flame
          600: '#fb8c00',
          700: '#f57c00',
          800: '#ef6c00', // Primary flame orange
          900: '#e65100'
        },
        'steel-blue': '#4a5f7f', // Metal/ship color
        'champaign': {
          100: '#f5e6d3', // Warm parchment for text
          200: '#ede1cf',
          300: '#e5dccb',
          400: '#d9cdb8',
          500: '#cdbea5',
          600: '#c1af92',
          700: '#b5a07f', // Primary warm beige for text
          800: '#a39070',
          900: '#918061'
        },
        // Legacy compatibility
        'scholar-blue': '#4a5f7f',
        red: {
          50: '#fff4ed',
          100: '#ffe6d5',
          800: '#9a2915',
          900: '#7c2414'
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