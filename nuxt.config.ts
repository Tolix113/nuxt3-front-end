// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "vue3-carousel-nuxt"],
  runtimeConfig: {
    apiSecret: {
      MONGODB_URI: process.env.MONGODB_URI,
    },
  },
});
