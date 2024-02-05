/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        base: 'var(--bg)',
        text: 'var(--fg)',
        subtle: 'var(--a9)',
        muted: 'var(--a4)',
      },
    },
  },
  plugins: [],
}
