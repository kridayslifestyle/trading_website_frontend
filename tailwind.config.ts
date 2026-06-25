import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          400: "#3b82f6",
          500: "#1a5cf2",
          600: "#0e37b0",
          900: "#020e47",
        },
      },
    },
  },
  plugins: [],
};

export default config;