/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00D4FF",
          50: "#E5FAFF",
          100: "#CCF5FF",
          200: "#99EBFF",
          300: "#66E1FF",
          400: "#33D7FF",
          500: "#00D4FF",
          600: "#00AACC",
          700: "#008099",
          800: "#005566",
          900: "#002B33",
        },
        secondary: {
          DEFAULT: "#FFD700",
          50: "#FFFBE5",
          100: "#FFF7CC",
          200: "#FFEF99",
          300: "#FFE766",
          400: "#FFDF33",
          500: "#FFD700",
          600: "#CCAC00",
          700: "#998100",
          800: "#665600",
          900: "#332B00",
        },
        background: "rgb(var(--background) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          light: "rgb(var(--surface-light) / <alpha-value>)",
          lighter: "rgb(var(--surface-lighter) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["8rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-lg": ["6rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-md": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-sm": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        gradient: "gradient 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
