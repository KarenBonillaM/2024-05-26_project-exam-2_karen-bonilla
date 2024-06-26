/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-background": "rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
}

