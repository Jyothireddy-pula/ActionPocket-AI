/** @type {import('postcss').Config} */
const config = {
  plugins: {
    tailwindcss: { config: "./config/tailwind.config.ts" },
  },
};

export default config;
