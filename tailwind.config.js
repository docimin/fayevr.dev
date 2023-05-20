/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'button': '-5px 5px 0px 0px rgba(0, 98, 90, 0.4)',
        'button-half': '-2.5px 2.5px 0px 0px rgba(0, 98, 90, 0.4)',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        blurple: '#5865F2',
        darkwhite: '#424549',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
