import { XMLParser } from 'fast-xml-parser'

export default defineEventHandler(async (event) => {
  try {
    // ZennのRSSフィードを取得
    const response = await $fetch('https://zenn.dev/p/tcv_tech_blog/feed', {
      method: 'GET',
    })

    // XMLをパース
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    })
    const result = parser.parse(response as string)

    // RSS形式のデータから記事情報を抽出
    const items = result.rss?.channel?.item || []
    const articles = Array.isArray(items) ? items : [items]

    // 記事データを整形
    const formattedArticles = articles.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      creator: item['dc:creator'] || 'Tech.C Venture',
      description: item.description,
    }))

    return {
      success: true,
      articles: formattedArticles,
    }
  } catch (error) {
    console.error('Zenn RSS fetch error:', error)
    return {
      success: false,
      articles: [],
      error: 'Failed to fetch Zenn articles',
    }
  }
})
