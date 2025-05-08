/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure all subdirectories inside src are included
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'], // Add IBM Plex Sans as default
      },
    },
  },
  plugins: [],
};