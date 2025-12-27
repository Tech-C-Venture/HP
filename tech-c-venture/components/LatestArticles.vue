<template>
  <div>
    <div v-if="pending" class="text-center">
      <p>記事を読み込み中...</p>
    </div>

    <div v-else-if="articles && articles.length > 0" class="grid grid-cols-3">
      <article
        v-for="(article, index) in articles"
        :key="index"
        class="card"
      >
        <div class="article-meta mb-sm">
          <time class="article-date">
            {{ formatDate(article.pubDate) }}
          </time>
          <span class="article-author">
            {{ article.creator }}
          </span>
        </div>

        <h3 class="article-title">
          <a :href="article.link" target="_blank" rel="noopener noreferrer" class="article-link">
            {{ article.title }}
          </a>
        </h3>

        <p class="article-description">
          {{ extractDescription(article.description) }}
        </p>

        <div class="article-footer">
          <a :href="article.link" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            続きを読む
          </a>
        </div>
      </article>
    </div>

    <div v-else class="text-center">
      <p class="text-muted">記事がまだありません。</p>
    </div>
  </div>
</template>

<script setup>
// ZennのRSSフィードから最新記事を3件取得
const { data: articlesData, pending } = await useAsyncData('zenn-articles', async () => {
  const response = await $fetch('/api/zenn-articles')
  return response
})

// 記事を最新3件に制限
const articles = computed(() => {
  const allArticles = articlesData.value?.articles || []
  return allArticles.slice(0, 3)
})

// 日付フォーマット関数
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 本文から概要を抽出する関数
const extractDescription = (description) => {
  if (!description) return ''
  // HTMLタグを除去してテキストのみを取得
  const text = description.replace(/<[^>]*>/g, '')
  // 最初の100文字を取得
  return text.length > 100 ? text.substring(0, 100) + '...' : text
}
</script>

<style scoped>

.article-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  font-size: 0.875rem;
}

.article-date {
  color: var(--color-text-muted);
}

.article-author {
  background-color: var(--color-accent);
  color: white;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.article-title {
  margin-bottom: var(--space-sm);
  font-size: 1.25rem;
}

.article-link {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.article-link:hover {
  color: var(--color-accent);
}

.article-description {
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: var(--space-lg);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  margin-top: auto;
}
</style>