import { createResolver } from "nuxt/kit";

const resolver = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-monaco-editor",
    "@unocss/nuxt",
    "notivue/nuxt",
    ["@nuxtjs/google-fonts", {
      families: {
        Inter: [400, 700],
      },
    }],
  ],
  css: ["notivue/notification.css", "notivue/animations.css"],
  unocss: {
    preflight: true,
    theme: {
      colors: {
        gray: "var(--gray)",
        light: "var(--light)",
        dark: "var(--dark)",
        accent: "var(--accent)",
      },
    },
    webFonts: {
      provider: "none",
      fonts: {
        sans: "Inter",
      },
    },
  },
  googleFonts: {
    download: true,
    inject: true,
  },
  nitro: {
    publicAssets: [
      {
        baseURL: "/fonts",
        dir: resolver.resolve("./node_modules/cal-sans/fonts/webfonts"),
        maxAge: 60 * 60 * 24 * 365,
      },
    ],
  },
  monacoEditor: {
    locale: "en",
    componentName: {
      codeEditor: "MonacoEditor",
      diffEditor: "MonacoDiffEditor",
    },
  },
});
