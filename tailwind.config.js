/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#111827',
        secondary: '#1f2937',
        accent: '#f3f4f6',
      },
    },
  },
  plugins: [],
}