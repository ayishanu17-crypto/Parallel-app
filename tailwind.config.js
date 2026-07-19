/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Professional Light Palette
        app: {
          bg: '#FFFFFF',      // Pure white canvas
          card: '#F9FAFB',    // Very subtle grey for cards
          border: '#E5E7EB',  // Perfect light-grey border
          text: '#111827',    // Near-black text for high contrast
          muted: '#6B7280',   // Subtle grey for metadata
        },
        accent: {
          blue: '#2563EB',    // Deep, professional blue
        }
      },
      fontFamily: {
        // Add this to make text look sharper
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: [],
}