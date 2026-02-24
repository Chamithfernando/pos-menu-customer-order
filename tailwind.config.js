/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f48c25',
          light: '#ffa94d',
          dark: '#d97706',
        },
        surface: {
          light: '#ffffff',
          dark: '#242424',
        },
        bg: {
          light: '#f8f9fa',
          dark: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      keyframes: {
        floatToCart: {
          '0%': { transform: 'translate(-50%, -50%) scale(0.5)', opacity: '0' },
          '20%': { transform: 'translate(-50%, -50%) scale(1.2)', opacity: '1' },
          '100%': { transform: 'translate(20vw, -80vh) scale(0.2)', opacity: '0' },
        },
        slideUp: {
          'from': { transform: 'translateY(30px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        badgePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
        },
        toggleSlider: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'float-to-cart': 'floatToCart 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards',
        'slide-up': 'slideUp 0.3s ease',
        'badge-pulse': 'badgePulse 0.3s ease',
      },
      boxShadow: {
        'premium': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'premium-lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        'glow-orange': '0 4px 12px rgba(244, 140, 37, 0.35)',
        'glow-green': '0 4px 12px rgba(39, 174, 96, 0.35)',
      },
    },
  },
  plugins: [],
}
