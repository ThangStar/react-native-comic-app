/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ["./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#17181C"
      }
    },
  },
  plugins: [],
}

