/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./summaries/**/*.md",
    "./app.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Merriweather', 'Noto Serif JP', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

