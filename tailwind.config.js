/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"Noto Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      colors: {
        reception: '#2563eb',
        doctor: '#059669',
        pharmacy: '#9333ea',
        lab: '#ea580c',
        insurance: '#0d9488',
        emergency: '#dc2626',
        admin: '#1f2937',
        finance: '#ca8a04',
        cashier: '#0891b2',
        nurse: '#db2777',
      },
    },
  },
  plugins: [],
}
