/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- New Strict Palette ---
        'deep-black': '#0B0F0D',
        'soft-black': '#151A17',
        'charcoal': '#232A26',
        'dark-gray': '#3F4742',
        'medium-gray': '#747D77',
        'light-gray': '#E7EBE8',
        'soft-gray': '#F3F6F4',
        'warm-white': '#FAFCFB',
        'deep-green': '#064E2B',
        'forest-green': '#08743C',
        'primary-green': '#0E8F4D',
        'bright-green': '#19B965',
        'mint-green': '#9EE6BC',
        'pale-green': '#EAF8EF',

        // --- Legacy Colors (kept to prevent immediate breakage during transition) ---
        'deep-forest': '#064E2B', // Mapped to deep-green
        'premium-green': '#0E8F4D', // Mapped to primary-green
        'dark-navy': '#0B0F0D', // Mapped to deep-black
        'ivory': '#FAFCFB', // Mapped to warm-white
        'slate-gray': '#747D77', // Mapped to medium-gray
        'light-border': '#E7EBE8', // Mapped to light-gray
        'warm-gold': '#C8A45D', // Kept temporarily if needed for specific icons, though requested to avoid. We'll phase this out.

        primary: {
          50: '#EAF8EF',  // pale-green
          100: '#9EE6BC', // mint-green
          200: '#C6EBCF',
          300: '#19B965', // bright-green
          400: '#6DC487',
          500: '#0E8F4D', // primary-green
          600: '#08743C', // forest-green
          700: '#064E2B', // deep-green
          800: '#042218',
          900: '#031911',
        },
        navy: {
          DEFAULT: '#151A17', // soft-black
          800: '#232A26', // charcoal
          900: '#0B0F0D', // deep-black
        },
        gray: {
          50: '#F3F6F4', // soft-gray
          100: '#FAFCFB',
          200: '#E7EBE8', // light-gray
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#747D77', // medium-gray
          600: '#3F4742', // dark-gray
          700: '#232A26', // charcoal
          800: '#151A17', // soft-black
          900: '#0B0F0D', // deep-black
        },
      },
      fontFamily: {
        sans: ['"Manrope"', '"Anuphan"', 'sans-serif'],
        thai: ['"Anuphan"', 'sans-serif'],
        eng: ['"Manrope"', 'sans-serif'],
        num: ['"Manrope"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #064E2B 0%, #0E8F4D 100%)',
        'gradient-primary-hover': 'linear-gradient(135deg, #08743C 0%, #19B965 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0B0F0D 0%, #151A17 100%)',
        'gradient-light': 'linear-gradient(135deg, #FAFCFB 0%, #EAF8EF 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(11, 15, 13, 0.04)',
        'card-hover': '0 12px 30px rgba(6, 78, 43, 0.08)',
        'card-dark': '0 8px 30px rgba(0, 0, 0, 0.3)',
        'btn': '0 4px 14px rgba(14, 143, 77, 0.2)',
        'btn-hover': '0 6px 20px rgba(14, 143, 77, 0.35)',
        'floating': '0 12px 40px rgba(11, 15, 13, 0.1)',
        'glow-green': '0 0 20px rgba(25, 185, 101, 0.4)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'mask-reveal': 'maskReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'number-roll': 'numberRoll 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'light-border': 'lightBorder 4s linear infinite',
        'shine': 'shine 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        maskReveal: {
          '0%': { clipPath: 'inset(100% 0 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        numberRoll: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        lightBorder: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
