/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3f1142',
        'primary-hover': '#4338ca',
        'primary-dark': '#2d0c30',
        'secondary': '#10b981',
        'light-bg': '#f3f4f6',
        'dark-text': '#1f2937',
        'light-text': '#6b7280',
      },
    },
  },
  plugins: [],
}
