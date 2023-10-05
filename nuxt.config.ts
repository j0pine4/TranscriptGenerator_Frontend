// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt',],
  css: ['/assets/css/styles.css'],
  app: {
    head: {
        script: [{
            src: '/assets/preline/preline.js',
            body: true,
            defer: true
        }]
    }
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL
    },
  },
  build: {
    transpile: ['@heroicons/vue']
  }
})
