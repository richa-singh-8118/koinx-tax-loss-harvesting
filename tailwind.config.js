/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#090D1A',
        darkCard: '#121829',
        darkBorder: '#1E293B',
        brandBlue: {
          50: '#F0F5FF',
          100: '#E1E9FF',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        brandGreen: {
          50: '#ECFDF5',
          500: '#10B981',
          600: '#059669',
        },
        brandRed: {
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
        },
        brandYellow: {
          50: '#FFFBEB',
          500: '#F59E0B',
          600: '#D97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
        cardGlow: '0 0 15px rgba(59, 130, 246, 0.05)',
      }
    },
  },
  plugins: [],
}
