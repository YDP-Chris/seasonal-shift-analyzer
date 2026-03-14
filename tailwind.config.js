/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // TempTrack Brand Colors
        primary: {
          50: '#f0f8ff',
          100: '#e0f0fe',
          200: '#bbe1fa',
          300: '#7dc8f5',
          400: '#3282b8',
          500: '#1a5c87',
          600: '#0f4c75',
          700: '#0c3d5e',
          800: '#0a3148',
          900: '#082638'
        },
        secondary: {
          50: '#f0f8ff',
          100: '#ddf2ff',
          200: '#bbe1fa',
          300: '#7dc8f5',
          400: '#3282b8',
          500: '#2774a3',
          600: '#1d5c87',
          700: '#134567',
          800: '#0f3654',
          900: '#0c2940'
        },
        accent: {
          50: '#fff7f0',
          100: '#ffede0',
          200: '#ffd6bb',
          300: '#ffb87d',
          400: '#ff8c3d',
          500: '#ff6b35',
          600: '#e55a2e',
          700: '#cc4a26',
          800: '#b33b1e',
          900: '#992d16'
        },
        success: {
          50: '#f3f9f5',
          100: '#e8f5e9',
          200: '#c8e6c9',
          300: '#81c784',
          400: '#4caf50',
          500: '#27ae60',
          600: '#229954',
          700: '#1e8449',
          800: '#196f3d',
          900: '#145a32'
        },
        warning: {
          50: '#fffbf0',
          100: '#fff2cc',
          200: '#ffe8d6',
          300: '#ffd6bb',
          400: '#ffb87d',
          500: '#ff8c3d',
          600: '#ff6b35',
          700: '#e55a2e',
          800: '#cc4a26',
          900: '#b33b1e'
        },
        alert: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },
        // Semantic seasonal colors
        winter: {
          50: '#f0f8ff',
          100: '#ddf2ff',
          200: '#bbe1fa',
          300: '#7dc8f5',
          400: '#3282b8',
          500: '#0f4c75'
        },
        spring: {
          50: '#f3f9f5',
          100: '#e8f5e9',
          200: '#c8e6c9',
          300: '#81c784',
          400: '#4caf50',
          500: '#27ae60'
        },
        summer: {
          50: '#fff7f0',
          100: '#fff2cc',
          200: '#ffe8d6',
          300: '#ffb87d',
          400: '#ff8c3d',
          500: '#3282b8'
        },
        autumn: {
          50: '#fff7f0',
          100: '#ffede0',
          200: '#ffd6bb',
          300: '#ffb87d',
          400: '#ff8c3d',
          500: '#ff6b35'
        }
      }
    },
  },
  plugins: [],
}