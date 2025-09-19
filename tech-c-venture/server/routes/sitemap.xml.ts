export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl

  // 静的ページのURL
  const staticPages = [
    '/',
    '/about',
    '/blog',
    '/partners'
  ]

  // ブログ記事のURLを取得
  const blogPosts = await $fetch('/api/blog-posts')
  const blogUrls = blogPosts.map((post: any) => post._path)

  // 協力企業のURLを取得（必要に応じて）
  // const partners = await $fetch('/api/partners')
  // const partnerUrls = partners.map((partner: any) => `/partners/${partner.slug}`)

  const allUrls = [...staticPages, ...blogUrls]

  // XMLサイトマップを生成
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${url === '/' ? 'daily' : url.includes('/blog/') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === '/' ? '1.0' : url.includes('/blog/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'public, max-age=3600') // 1時間キャッシュ

  return sitemap
})