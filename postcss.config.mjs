/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Tailwind v4's PostCSS plugin handles vendor prefixing itself — no autoprefixer needed.
    '@tailwindcss/postcss': {},
  },
};

export default config;
