// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  css: ["@/assets/styles/main.scss"],
  nitro: {
    preset: "node",
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/coffee-beans.ico" }],
      title: "Coffee Shop",
      meta: [{ name: "description", content: "Лучший кофе в городе!" }],
    },
  },
});
