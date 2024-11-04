/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        retool: {
          sidebar: '#1a1f36',
          hover: '#2a2f46',
          active: '#3a3f56',
          border: '#2d3343',
          text: '#6b7280',
          heading: '#111827',
          primary: '#3b82f6',
          'primary-hover': '#2563eb',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};