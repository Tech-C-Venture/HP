import { createClient } from 'microcms-js-sdk'

export const useMicroCMS = () => {
  const config = useRuntimeConfig()

  // 開発環境で環境変数が未設定の場合の処理
  if (!config.public.microCmsServiceDomain || !config.public.microCmsApiKey) {
    console.warn('MicroCMS configuration is missing. Please set NUXT_PUBLIC_MICROCMS_SERVICE_DOMAIN and NUXT_PUBLIC_MICROCMS_API_KEY environment variables.')

    // 開発用ダミーデータを返す
    return {
      client: null,
      async getBlogList() {
        return { contents: [], totalCount: 0 }
      },
      async getBlogDetail() {
        return null
      },
      async getLatestBlogs() {
        return { contents: [] }
      },
      async getBlogsByTag() {
        return { contents: [] }
      },
      async searchBlogs() {
        return { contents: [] }
      },
      async getSponsorsList() {
        return { contents: [] }
      },
      async getSponsorDetail() {
        return null
      }
    }
  }

  const client = createClient({
    serviceDomain: config.public.microCmsServiceDomain,
    apiKey: config.public.microCmsApiKey
  })

  return {
    client,

    // ブログ記事一覧を取得
    async getBlogList(queries = {}) {
      try {
        const defaultQueries = {
          orders: '-date',
          ...queries
        }

        const response = await client.get({
          endpoint: 'blog',
          queries: defaultQueries
        })

        return response
      } catch (error) {
        console.error('Error fetching blog list:', error)
        throw error
      }
    },

    // ブログ記事詳細を取得
    async getBlogDetail(contentId) {
      try {
        const response = await client.get({
          endpoint: 'blog',
          contentId,
          queries: {
            fields: 'id,title,date,body,tag'
          }
        })

        return response
      } catch (error) {
        console.error('Error fetching blog detail:', error)
        throw error
      }
    },

    // 最新記事を取得
    async getLatestBlogs(limit = 3) {
      try {
        const response = await client.get({
          endpoint: 'blog',
          queries: {
            orders: '-date',
            limit,
            fields: 'id,title,tag,date'
          }
        })

        return response
      } catch (error) {
        console.error('Error fetching latest blogs:', error)
        throw error
      }
    },

    // タグ別記事を取得
    async getBlogsByTag(tag, queries = {}) {
      try {
        const defaultQueries = {
          orders: '-date',
          filters: `tag[contains]${tag}`,
          ...queries
        }

        const response = await client.get({
          endpoint: 'blog',
          queries: defaultQueries
        })

        return response
      } catch (error) {
        console.error('Error fetching blogs by tag:', error)
        throw error
      }
    },

    // 検索
    async searchBlogs(query, queries = {}) {
      try {
        const defaultQueries = {
          orders: '-date',
          filters: `title[contains]${query}`,
          ...queries
        }

        const response = await client.get({
          endpoint: 'blog',
          queries: defaultQueries
        })

        return response
      } catch (error) {
        console.error('Error searching blogs:', error)
        throw error
      }
    },

    // スポンサー一覧を取得
    async getSponsorsList(queries = {}) {
      try {
        const defaultQueries = {
          orders: 'createdAt',
          ...queries
        }

        const response = await client.get({
          endpoint: 'sponsor',
          queries: defaultQueries
        })

        return response
      } catch (error) {
        console.error('Error fetching sponsors list:', error)
        throw error
      }
    },

    // スポンサー詳細を取得
    async getSponsorDetail(contentId) {
      try {
        const response = await client.get({
          endpoint: 'sponsor',
          contentId
        })

        return response
      } catch (error) {
        console.error('Error fetching sponsor detail:', error)
        throw error
      }
    }
  }
}