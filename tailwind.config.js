/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode optimized colors following best practices
        'dark-bg': '#121212',      // Main dark background (not pure black)
        'dark-bg-elevated': '#1E1E1E', // Elevated surfaces
        'dark-text': '#E0E0E0',    // Primary text (off-white, not pure white)
        'dark-text-secondary': '#B0B0B0', // Secondary text
      },
    },
  },
  plugins: [],
}

