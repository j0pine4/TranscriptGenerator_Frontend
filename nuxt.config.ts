// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/ui'],
  colorMode: {
    preference: 'dark'
  },
  css: ['/assets/css/styles.css'],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL
    },
  }
})
