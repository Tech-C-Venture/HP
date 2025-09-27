// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/seo',
    '@vueuse/nuxt'
  ],

  seo: {
    siteName: 'Tech.C Venture',
    description: '自走できるエンジニアを育成する団体 Tech.C Venture',
    url: 'https://techc-venture.com'
  },

  app: {
    head: {
      title: 'Tech.C Venture - 自走できるエンジニアを育成する',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '自走できるエンジニアを育成する団体 Tech.C Venture' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // Private keys (only available on the server-side)
    r2: {
      accountId: process.env.R2_ACCOUNT_ID,
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      bucketName: process.env.R2_BUCKET_NAME || 'techc-venture-images',
      endpoint: process.env.R2_ENDPOINT || 'https://your-account-id.r2.cloudflarestorage.com',
      publicUrl: process.env.R2_PUBLIC_URL || 'https://your-domain.com'
    },

    // Public keys (exposed to the client-side)
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      microCmsServiceDomain: process.env.NUXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
      microCmsApiKey: process.env.NUXT_PUBLIC_MICROCMS_API_KEY
    }
  }
})
