// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/ui', '@nuxtjs/supabase'],
  supabase: {
    redirect: false,
  },
  colorMode: {
    preference: 'dark'
  },
  css: ['/assets/css/styles.css'],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
    },
  }
})
