/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        sage: {
          50: '#E2F1EC',
          100: '#CFE7DD',
          200: '#B0DCC9',
          300: '#8CCBB0',
          400: '#6BB89A',
          500: '#4FA080',
          600: '#3B8568',
          700: '#2F6A53',
          800: '#275543',
          900: '#1F4536',
        },
        blush: {
          50: '#FDF2F4',
          100: '#FCE7EB',
          200: '#F9D0D9',
          300: '#F4AEC0',
          400: '#EE85A0',
          500: '#E25678',
          600: '#C93F60',
          700: '#A82F4E',
          800: '#87293F',
          900: '#6E2435',
        },
        gold: {
          50: '#FBF7EC',
          100: '#F6ECCF',
          200: '#EDD89E',
          300: '#E4C66D',
          400: '#D9AF3E',
          500: '#C49A2A',
          600: '#9E7A20',
          700: '#785C1A',
          800: '#523E12',
          900: '#2C2009',
        },
      },
    },
  },
  plugins: [],
};
