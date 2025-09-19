export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl

  // ブログ記事を取得（最新20件）
  const blogPosts = await $fetch('/api/blog-posts?limit=20')

  // RSSフィードを生成
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tech.C Venture ブログ</title>
    <description>自走できるエンジニアを育成する団体 Tech.C Venture の公式ブログ</description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>info@techc-venture.com (Tech.C Venture)</managingEditor>
    <webMaster>info@techc-venture.com (Tech.C Venture)</webMaster>

${blogPosts.map((post: any) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description || ''}]]></description>
      <link>${siteUrl}${post._path}</link>
      <guid isPermaLink="true">${siteUrl}${post._path}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.category || ''}]]></category>
      ${post.author ? `<author>info@techc-venture.com (${post.author})</author>` : ''}
      ${post.image ? `<enclosure url="${siteUrl}${post.image}" type="image/jpeg" />` : ''}
    </item>`).join('\n')}
  </channel>
</rss>`

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600') // 1時間キャッシュ

  return rss
})