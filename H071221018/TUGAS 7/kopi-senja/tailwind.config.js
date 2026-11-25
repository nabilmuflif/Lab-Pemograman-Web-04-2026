/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#faf5f0",
          100: "#f1e5d8",
          200: "#e2c9b0",
          500: "#a66a43",
          600: "#87502f",
          700: "#633b27",
          800: "#42291e",
          900: "#2b1b15",
        },
      },
    },
  },
  plugins: [],
};