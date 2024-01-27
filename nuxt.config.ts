// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    apiSecret: {
      MONGODB_URI: process.env.MONGODB_URI,
    },
  },
});
