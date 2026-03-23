/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Inter untuk body text (otomatis menggantikan font default Tailwind)
        sans: ['Inter', 'sans-serif'],
        // Montserrat khusus untuk heading
        heading: ['Montserrat', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}