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
        "../../apps/web/node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        transitionTimingFunction: {
            "cubic-ease": "cubic-bezier(0.25, 1, 0.5, 1)",
        },
        extend: {
            boxShadow: {
                // light
                "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                "tremor-card":
                    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                "tremor-dropdown":
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                // dark
                "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                "dark-tremor-card":
                    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                "dark-tremor-dropdown":
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            },
            fontSize: {
                "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
                "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
                "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
                "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
            },
            fontFamily: {
                sans: ["var(--font-sofia)"],
                display: ["var(--font-outfit)"],
            },
            transitionDuration: {
                "2000": "2000ms",
                "3000": "3000ms",
            },
            backgroundImage: {
                "custom-gradient":
                    "linear-gradient(211.35deg, #DC03FF 22.42%, rgba(10, 152, 255, 0.74) 70.33%)",
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "game-winter":
                    "linear-gradient(to bottom, #2980b9, #6dd5fa, #f2f2f2)",
                "gradient-to-t":
                    "linear-gradient(to top, var(--tw-gradient-stops))",
                "gradient-to-tr":
                    "linear-gradient(to top right, var(--tw-gradient-stops))",
                "gradient-to-r":
                    "linear-gradient(to right, var(--tw-gradient-stops))",
                "gradient-to-br":
                    "linear-gradient(to bottom right, var(--tw-gradient-stops))",
                "gradient-to-b":
                    "linear-gradient(to bottom, var(--tw-gradient-stops))",
                "gradient-to-bl":
                    "linear-gradient(to bottom left, var(--tw-gradient-stops))",
                "gradient-to-l":
                    "linear-gradient(to left, var(--tw-gradient-stops))",
                "gradient-to-tl":
                    "linear-gradient(to top left, var(--tw-gradient-stops))",
            },
            colors: {
                gray: {
                    50: "#F7FAFC",
                    900: "#171923",
                },
                orange: {
                    500: "#ff8b1a",
                },
                tremor: {
                    brand: {
                        faint: "#e0edff", // blue-50
                        muted: "#4b83ff25", // blue-200
                        subtle: "#4b83ff25", // blue-400
                        DEFAULT: "#0042da", // blue-500
                        emphasis: "#806200", // blue-700
                        inverted: "#ffffff", // white
                    },
                    background: {
                        muted: "#F7FAFC", // gray-50
                        subtle: "#EDF2F7", // gray-100
                        DEFAULT: "#ffffff", // white
                        emphasis: "#2D3748", // gray-700
                    },
                    border: {
                        DEFAULT: "#E2E8F0", // gray-200
                    },
                    ring: {
                        DEFAULT: "#E2E8F0", // gray-200
                    },
                    content: {
                        subtle: "#A0AEC0", // gray-400
                        DEFAULT: "#718096", // gray-500
                        emphasis: "#2D3748", // gray-700
                        strong: "#718096", // gray-900
                        inverted: "#ffffff", // white
                    },
                },
                // dark mode
                "dark-tremor": {
                    brand: {
                        faint: "#0B1229", // custom
                        muted: "#4b83ff25", // blue-950
                        subtle: "#4b83ff25", // blue-300
                        DEFAULT: "#0042da", // blue-500
                        emphasis: "#1a5fff", // blue-400
                        inverted: "#1a202c", // gray-950
                    },
                    background: {
                        muted: "#131A2B", // custom
                        subtle: "#1A202C", // gray-800 --> gray-700
                        DEFAULT: "#1A202C", // gray-900 --> gray-800
                        emphasis: "#CBD5E0", // gray-300
                    },
                    border: {
                        DEFAULT: "#242C3A", // gray-800 --> gray-750
                    },
                    ring: {
                        DEFAULT: "#242C3A", // gray-800 --> gray-750
                    },
                    content: {
                        subtle: "#4A5568", // gray-600
                        DEFAULT: "#718096", // gray-500
                        emphasis: "#E2E8F0", // gray-200
                        strong: "#F7FAFC", // gray-50
                        inverted: "#000000", // black
                    },
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground":
                        "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground":
                        "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
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
                "tremor-small": "0.375rem",
                "tremor-default": "0.5rem",
                "tremor-full": "9999px",
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
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
                shine: {
                    "0%": {
                        "background-position": "0% 0%",
                    },
                    "50%": {
                        "background-position": "100% 100%",
                    },
                    to: {
                        "background-position": "0% 0%",
                    },
                },
                flame: {
                    from: { r: "1px", opacity: ".8" },
                    to: { r: "28px", opacity: "0" },
                },
                flameodd: {
                    "0%, 100%": { width: "0%", height: "0%" },
                    "25%": { width: "100%", height: "100%" },
                    "0%": {
                        backgroundColor: "#FFDC01",
                        zIndex: "1000000",
                        right: "0%",
                        bottom: "0%",
                    },
                    "40%": {
                        backgroundColor: "#FDAC01",
                        zIndex: "1000000",
                        right: "1%",
                        bottom: "2%",
                    },
                    "100%": {
                        backgroundColor: "#F73B01",
                        zIndex: "-10",
                        right: "150%",
                        bottom: "170%",
                    },
                },
                flameeven: {
                    "0%, 100%": { width: "0%", height: "0%" },
                    "25%": { width: "100%", height: "100%" },
                    "0%": {
                        backgroundColor: "#FFDC01",
                        zIndex: "1000000",
                        right: "0%",
                        bottom: "0%",
                    },
                    "40%": {
                        backgroundColor: "#FDAC01",
                        zIndex: "1000000",
                        right: "2%",
                        bottom: "1%",
                    },
                    "100%": {
                        backgroundColor: "#F73B01",
                        zIndex: "-10",
                        right: "150%",
                        bottom: "170%",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                progress: "progress 1s infinite linear",
                loading:
                    "loading 1.25s cubic-bezier(.54,-0.18,.39,.97) infinite",
                shine: "shine var(--duration) infinite linear",
                flameodd: "flameodd 1.5s ease-in infinite",
                flameeven: "flameeven 1.5s ease-in infinite",
            },
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [tailwindcssAnimate, require("tailwindcss-highlights")],
} satisfies Config;

export default config;
