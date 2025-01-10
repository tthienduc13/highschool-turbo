import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    backgroundImage: {
      "custom-gradient":
        "linear-gradient(211.35deg, #DC03FF 22.42%, rgba(10, 152, 255, 0.74) 70.33%)",
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "game-winter": "linear-gradient(to bottom, #2980b9, #6dd5fa, #f2f2f2)",
    },
    transitionTimingFunction: {
      "cubic-ease": "cubic-bezier(0.25, 1, 0.5, 1)",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sofia)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        gray: {
          50: "#F7FAFC",
          900: "#171923",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        progress: {
          "0%": {
            transform: "translateX(0) scaleX(0)",
          },
          "40%": {
            transform: "translateX(0) scaleX(0.4)",
          },
          "100%": {
            transform: "translateX(100%) scaleX(0.5)",
          },
        },
        rainbow: {
          "0%": {
            "background-position": "0%",
          },
          "100%": {
            "background-position": "200%",
          },
        },
        loading: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "80%": {
            color: "#ffbf7d",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        progress: "progress 1s infinite linear",
        loading: "loading 1.25s cubic-bezier(.54,-0.18,.39,.97) infinite",
      },
      boxShadow: {
        "inset-gray-shadow": "inset 0 -10px #00000033",
        "inset-gray-shadow-md": "inset 0 -6px #00000033",
        "inset-gray-shadow-sm": "inset 0 -2px #00000033",
        "3d": "2px 2px 0px 0px #123BAA",
        "3d-light": "1px 1px 0px 0px #1A4ED6",
        "3d-dark": "4px 4px 0px 0px #123BAA",
        "3d-hover": "4px 4px 0px 0px #0F2E89",
        "3d-active": "0px 0px 0px 0px transparent",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [tailwindcssAnimate, require("tailwindcss-highlights")],
} satisfies Config;

export default config;
