/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1150px",
      // "2xl": "1100px",
    },
    extend: {
      container: {
        center: true,
        padding: "0.1rem",
      },
      fontFamily: {
        'John' : ['Jhon Halend'],
        'Jet' : ['JetBrains Mono'],
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.no-scroll': {
          overflow: 'hidden',
        },
      });
    },
  ],
}