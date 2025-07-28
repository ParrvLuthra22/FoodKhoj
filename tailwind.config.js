/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff3ed',
          100: '#ffe4d3',
          200: '#ffc7a6',
          300: '#ffa16d',
          400: '#ff7e3f',
          500: '#ff6b35', 
          600: '#f04e11',
          700: '#c73a0c',
          800: '#9e3010',
          900: '#802c12',
          950: '#451306',
        },
        secondary: {
          50: '#eefcfa',
          100: '#d5f6f2',
          200: '#aeebe3',
          300: '#77d9cc',
          400: '#3fc0b0',
          500: '#2ec4b6', 
          600: '#199186',
          700: '#17736b',
          800: '#175c56',
          900: '#174c47',
          950: '#072c29',
        },
        accent: {
          50: '#fffaec',
          100: '#fff2cd',
          200: '#ffe49b',
          300: '#ffcf5e',
          400: '#ffbf69', 
          500: '#fd9b28',
          600: '#ed7a0c',
          700: '#c3590b',
          800: '#9c4510',
          900: '#7f3a11',
          950: '#451c05',
        },
        success: {
          500: '#22c55e',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};