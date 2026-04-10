/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0a0f1e', 800: '#0d1528', 700: '#111e38', 600: '#162244' },
        cyan: { DEFAULT: '#00d4ff', dark: '#00a8cc' },
        amber: { DEFAULT: '#f59e0b', light: '#fbbf24' },
        alert: '#ef4444',
        safe: '#22c55e',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
