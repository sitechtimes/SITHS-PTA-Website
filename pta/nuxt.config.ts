// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/sanity"],

  sanity: {
    projectId: "o006ti7s",
    dataset: "pta",
    useCdn: true,
// @ts-expect-error: disable visual editing (not yet typed for boolean)
    visualEditing: false  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2025-05-03",
});