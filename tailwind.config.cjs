/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      flex: {
        '2': '2',
        '2.5': '2.5',
        '3': '3',
        '4': '4',
    }
  },
  plugins: [],
}
}
