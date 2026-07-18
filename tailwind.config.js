/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          950: '#0a0a0c',
          900: '#121216',
          800: '#1e1e24',
        },
        accent: {
          blue: '#6366f1',
        }
      }
    }
  }, // <--- The comma goes here
  plugins: [],
}