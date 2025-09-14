// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  runtimeConfig: {
    MJ_APIKEY_PUBLIC: process.env.MJ_APIKEY_PUBLIC,

    MJ_APIKEY_PRIVATE: process.env.MJ_APIKEY_PRIVATE
  },
  experimental: {
    componentIslands: true,
  },
  app: {
    head: {
      title: 'KbhSec Website', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        }
      ]
    }
  },
  content: {
    watch: {
      enabled: false,
      port: 4000,
      showURL: false
    }
  },
  prisma: {
    autoSetupPrisma: true,
  },
  build: {
    transpile: ['@prisma/client']
  },
  alias: {
    '.prisma/client/index-browser': '@prisma/client',
    '.prisma/client/default': '@prisma/client',
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/scripts',
    '@nuxt/content',
    '@prisma/nuxt',
  ],
  css: ['~/assets/css/main.css'],
})