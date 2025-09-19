export default defineEventHandler(async (event) => {
  try {
    // クエリパラメータを取得
    const query = getQuery(event)
    const limit = query.limit ? parseInt(query.limit as string) : undefined
    const category = query.category as string
    const published = query.published !== 'false' // デフォルトは公開済みのみ

    // Nuxt Contentを使用してブログ記事を取得
    let contentQuery = queryContent('/blog')

    // 公開状態でフィルタ
    if (published) {
      contentQuery = contentQuery.where({ published: { $ne: false } })
    }

    // カテゴリでフィルタ
    if (category) {
      contentQuery = contentQuery.where({ category })
    }

    // 日付順でソート
    contentQuery = contentQuery.sort({ date: -1 })

    // 件数制限
    if (limit) {
      contentQuery = contentQuery.limit(limit)
    }

    const posts = await contentQuery.find()

    // レスポンス用にデータを整形
    const formattedPosts = posts.map(post => ({
      _path: post._path,
      title: post.title,
      description: post.description,
      date: post.date,
      category: post.category,
      published: post.published,
      image: post.image,
      author: post.author,
      tags: post.tags
    }))

    return formattedPosts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch blog posts'
    })
  }
})