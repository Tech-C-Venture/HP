<template>
  <div>
    <article v-if="article" class="article-detail">
      <!-- Article Header -->
      <header class="article-header">
        <div class="container">
          <!-- Breadcrumb -->
          <nav class="breadcrumb">
            <NuxtLink to="/">ホーム</NuxtLink>
            <span class="breadcrumb-separator">›</span>
            <NuxtLink to="/blog">記事一覧</NuxtLink>
            <span class="breadcrumb-separator">›</span>
            <span class="breadcrumb-current">{{ article.title }}</span>
          </nav>

          <div class="article-meta">
            <time class="article-date">
              {{ formatDate(article.date) }}
            </time>
            <span v-if="article.tag && article.tag.length > 0" class="article-category">
              {{ article.tag[0] }}
            </span>
          </div>

          <h1 class="article-title">{{ article.title }}</h1>

          <!-- 概要はスキーマにないため非表示 -->

        </div>
      </header>

      <!-- Article Content -->
      <main class="article-main">
        <div class="container">
          <div class="article-layout">
            <!-- Content -->
            <div class="article-content">
              <div class="prose" v-html="article.body"></div>
            </div>

            <!-- Table of Contents -->
            <aside class="article-sidebar">
              <div class="toc-container">
                <h3>目次</h3>
                <!-- TOCは後で実装 -->
                <div class="toc-placeholder">目次機能は準備中です</div>
              </div>

              <!-- Share buttons -->
              <div class="share-buttons">
                <h4>この記事をシェア</h4>
                <div class="share-links">
                  <a
                    :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="share-btn x"
                  >
                    X
                  </a>
                  <a
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="share-btn facebook"
                  >
                    Facebook
                  </a>
                  <button
                    @click="copyToClipboard"
                    class="share-btn copy"
                  >
                    URLをコピー
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <!-- Related Articles -->
      <section v-if="relatedArticles && relatedArticles.length > 0" class="related-articles">
        <div class="container">
          <h2>関連記事</h2>
          <div class="related-grid">
            <article
              v-for="relatedArticle in relatedArticles"
              :key="relatedArticle.id"
              class="related-card"
            >
              <NuxtLink :to="`/blog/${relatedArticle.id}`" class="related-link">
                <div class="related-content">
                  <h3 class="related-title">{{ relatedArticle.title }}</h3>
                  <p class="related-description">{{ extractDescription(relatedArticle.body) }}</p>
                  <time class="related-date">
                    {{ formatDate(relatedArticle.date) }}
                  </time>
                </div>
              </NuxtLink>
            </article>
          </div>
        </div>
      </section>

      <!-- Back to Blog -->
      <section class="back-to-blog">
        <div class="container">
          <NuxtLink to="/blog" class="btn btn-secondary">
            ← 記事一覧に戻る
          </NuxtLink>
        </div>
      </section>
    </article>

    <!-- 404 fallback -->
    <div v-else class="not-found">
      <div class="container">
        <h1>記事が見つかりません</h1>
        <p>指定された記事が存在しないか、削除されている可能性があります。</p>
        <NuxtLink to="/blog" class="btn btn-primary">
          記事一覧に戻る
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const route = useRoute()
const articleUrl = ref('')
const { getBlogDetail, getBlogsByTag } = useMicroCMS()

// 記事データを取得
const { data: article } = await useAsyncData(`blog-${route.params.id}`, async () => {
  try {
    const articleData = await getBlogDetail(route.params.id)
    return articleData
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Article not found'
    })
  }
})

// 関連記事を取得（同じタグの記事を3件）
const { data: relatedArticles } = await useAsyncData(`related-${route.params.id}`, async () => {
  if (!article.value?.tag || article.value.tag.length === 0) return []

  const related = await getBlogsByTag(article.value.tag[0], {
    limit: 3,
    filters: `id[not_equals]${route.params.id}`
  })

  return related.contents || []
})

// SEO設定
if (article.value) {
  useSeoMeta({
    title: `${article.value.title} | Tech.C Venture`,
    description: article.value.description || '',
    ogTitle: article.value.title,
    ogDescription: article.value.description || '',
    ogType: 'article',
    ogImage: '',
    articlePublishedTime: article.value.date,
    articleAuthor: article.value.author || 'Tech.C Venture',
    articleSection: article.value.category || '',
    twitterCard: 'summary_large_image'
  })

  // 構造化データは後で追加
}

// マウント時にURLを設定
onMounted(() => {
  articleUrl.value = window.location.href
})

// ユーティリティ関数
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(articleUrl.value)
    alert('URLをクリップボードにコピーしました')
  } catch (err) {
    console.error('コピーに失敗しました:', err)
  }
}

// 本文から概要を抽出する関数
const extractDescription = (body) => {
  if (!body) return ''
  // HTMLタグを除去してテキストのみを取得
  const text = body.replace(/<[^>]*>/g, '')
  // 最初の100文字を取得
  return text.length > 100 ? text.substring(0, 100) + '...' : text
}
</script>

<style scoped>
.article-header {
  background-color: var(--color-surface);
  padding: var(--space-xl) 0 var(--space-2xl);
  border-bottom: 1px solid var(--color-border);
}

.breadcrumb {
  font-size: 0.875rem;
  margin-bottom: var(--space-md);
  color: var(--color-text-muted);
}

.breadcrumb a {
  color: var(--color-accent);
  text-decoration: none;
}

.breadcrumb-separator {
  margin: 0 var(--space-sm);
}

.breadcrumb-current {
  color: var(--color-text-muted);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  font-size: 0.875rem;
}

.article-date {
  color: var(--color-text-muted);
}

.article-category {
  background-color: var(--color-accent);
  color: white;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-lg);
}

.article-description {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: var(--space-xl);
}


.article-main {
  padding: var(--space-3xl) 0;
}

.article-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--space-3xl);
}

.article-content {
  max-width: none;
}

.article-sidebar {
  position: sticky;
  top: var(--space-xl);
  height: fit-content;
}

.toc-container {
  background-color: var(--color-surface);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-xl);
  border: 1px solid var(--color-border);
}

.toc-container h3 {
  margin-bottom: var(--space-md);
  font-size: 1rem;
  font-weight: 600;
}

.share-buttons {
  background-color: var(--color-surface);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.share-buttons h4 {
  margin-bottom: var(--space-md);
  font-size: 1rem;
  font-weight: 600;
}

.share-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.share-btn {
  padding: var(--space-sm) var(--space-md);
  border: none;
  border-radius: var(--radius-md);
  text-decoration: none;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.share-btn.x {
  background-color: #000000;
  color: white;
}

.share-btn.facebook {
  background-color: #4267B2;
  color: white;
}

.share-btn.copy {
  background-color: var(--color-border);
  color: var(--color-text);
}

.share-btn:hover {
  opacity: 0.8;
}

.related-articles {
  padding: var(--space-3xl) 0;
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.related-articles h2 {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-xl);
}

.related-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.related-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.related-link {
  display: block;
  color: inherit;
  text-decoration: none;
}


.related-content {
  padding: var(--space-lg);
}

.related-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--space-sm);
  line-height: 1.4;
}

.related-description {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: var(--space-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-date {
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.back-to-blog {
  padding: var(--space-xl) 0;
  text-align: center;
}

.not-found {
  padding: var(--space-3xl) 0;
  text-align: center;
}

.not-found h1 {
  margin-bottom: var(--space-lg);
}

.not-found p {
  margin-bottom: var(--space-xl);
  color: var(--color-text-muted);
}

/* Prose styling for content */
.prose {
  max-width: none;
  color: var(--color-text);
  line-height: 1.7;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  font-weight: 600;
  margin-top: var(--space-xl);
  margin-bottom: var(--space-md);
  color: var(--color-text);
}

.prose h2 {
  font-size: 1.875rem;
  border-bottom: 2px solid var(--color-border);
  padding-bottom: var(--space-sm);
}

.prose h3 {
  font-size: 1.5rem;
}

.prose p {
  margin-bottom: var(--space-md);
  color: var(--color-text);
}

.prose a {
  color: var(--color-accent);
  text-decoration: underline;
}

.prose ul,
.prose ol {
  margin-bottom: var(--space-md);
  padding-left: var(--space-lg);
}

.prose li {
  margin-bottom: var(--space-xs);
}

.prose code {
  background-color: var(--color-surface);
  padding: 0.125rem 0.25rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.875em;
  color: var(--color-accent);
}

.prose pre {
  background-color: var(--color-surface);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin-bottom: var(--space-md);
}

.prose pre code {
  background: none;
  padding: 0;
  color: var(--color-text);
}

.prose blockquote {
  border-left: 4px solid var(--color-accent);
  padding-left: var(--space-lg);
  margin: var(--space-lg) 0;
  font-style: italic;
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .article-layout {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .article-sidebar {
    position: static;
    order: -1;
  }

  .toc-container,
  .share-buttons {
    margin-bottom: var(--space-md);
  }
}

@media (max-width: 768px) {
  .article-title {
    font-size: 2rem;
  }

  .article-description {
    font-size: 1rem;
  }

  .article-main {
    padding: var(--space-xl) 0;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>