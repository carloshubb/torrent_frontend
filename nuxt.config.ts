// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  compatibilityDate: "latest",
  ssr: true,
  css: ['~/assets/css/main.css','~/assets/css/icons.css'],
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api'
    }
  },
  app: {
    head: {
      // link: [
      //   // Preload CSS so it loads before HTML flashes
      //   { rel: "preload", as: "style", href: "/_nuxt/assets/app.css" }
      // ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ]
    }
  }
})