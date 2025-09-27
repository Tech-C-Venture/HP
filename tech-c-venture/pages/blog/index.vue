<template>
  <div>
    <!-- Hero Section -->
    <section class="hero section-padding">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">記事一覧</h1>
          <p class="hero-description">
            Tech.C Ventureメンバーによる技術ブログや開発情報をお届けします。
          </p>
        </div>
      </div>
    </section>

    <!-- Search and Filter -->
    <section class="section-padding" style="padding-top: 1rem;">
      <div class="container">
        <div class="search-filters">
          <div class="search-box">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="記事を検索..."
              class="search-input"
            />
          </div>

          <div class="filter-categories">
            <button
              v-for="category in categories"
              :key="category"
              :class="['filter-btn', { active: selectedCategory === category }]"
              @click="selectedCategory = selectedCategory === category ? '' : category"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="section-padding" style="padding-top: 1rem;">
      <div class="container">
        <div v-if="pending" class="text-center">
          <p>記事を読み込み中...</p>
        </div>

        <div v-else-if="filteredArticles && filteredArticles.length > 0">
          <div class="grid grid-cols-3 articles-grid">
            <article
              v-for="article in paginatedArticles"
              :key="article.id"
              class="article-card"
            >
              <NuxtLink :to="`/blog/${article.id}`" class="article-link">

                <div class="article-content">
                  <div class="article-meta">
                    <time class="article-date">
                      {{ formatDate(article.date) }}
                    </time>
                    <span v-if="article.tag && article.tag.length > 0" class="article-category">
                      {{ article.tag[0] }}
                    </span>
                  </div>

                  <h2 class="article-title">{{ article.title }}</h2>
                  <!-- 概要は本文から抽出 -->
                  <p class="article-description">{{ extractDescription(article.body) }}</p>
                </div>
              </NuxtLink>
            </article>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="pagination">
            <button
              :disabled="currentPage === 1"
              @click="currentPage--"
              class="pagination-btn"
            >
              前へ
            </button>

            <span class="pagination-info">
              {{ currentPage }} / {{ totalPages }}
            </span>

            <button
              :disabled="currentPage === totalPages"
              @click="currentPage++"
              class="pagination-btn"
            >
              次へ
            </button>
          </div>
        </div>

        <div v-else class="text-center">
          <p class="text-muted">該当する記事が見つかりません。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// SEO設定
useSeoMeta({
  title: '記事一覧 | Tech.C Venture',
  description: 'Tech.C Ventureメンバーによる技術ブログや開発情報の記事一覧です。',
  ogTitle: '記事一覧 | Tech.C Venture',
  ogDescription: 'Tech.C Ventureメンバーによる技術ブログや開発情報の記事一覧です。',
  ogType: 'website'
})

// パンくずリスト
// 構造化データは後で追加

// MicroCMSからデータ取得
const { getBlogList } = useMicroCMS()

const { data: articlesData, pending } = await useAsyncData('blog-articles', () =>
  getBlogList()
)

// articles.contentsを使用（MicroCMSのレスポンス形式）
const articles = computed(() => articlesData.value?.contents || [])

// リアクティブな状態
const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const articlesPerPage = 9

// タグ一覧を取得
const categories = computed(() => {
  if (!articles.value) return []
  const allTags = articles.value.flatMap(article => article.tag || [])
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags
})

// フィルタリングされた記事
const filteredArticles = computed(() => {
  if (!articles.value) return []

  let filtered = articles.value

  // 検索クエリでフィルタ
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query)
    )
  }

  // タグでフィルタ
  if (selectedCategory.value) {
    filtered = filtered.filter(article =>
      article.tag && article.tag.includes(selectedCategory.value)
    )
  }

  return filtered
})

// ページネーション
const totalPages = computed(() => Math.ceil(filteredArticles.value.length / articlesPerPage))

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * articlesPerPage
  const end = start + articlesPerPage
  return filteredArticles.value.slice(start, end)
})

// フィルタが変更されたらページを1に戻す
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
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
const extractDescription = (body) => {
  if (!body) return ''
  // HTMLタグを除去してテキストのみを取得
  const text = body.replace(/<[^>]*>/g, '')
  // 最初の100文字を取得
  return text.length > 100 ? text.substring(0, 100) + '...' : text
}
</script>

<style scoped>
.search-filters {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
}

.search-box {
  max-width: 400px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.filter-categories {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  justify-content: center;
}

.filter-btn {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  background-color: white;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background-color: var(--color-surface);
}

.filter-btn.active {
  background-color: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
}

.articles-grid {
  margin-bottom: var(--space-2xl);
}

.article-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.article-link {
  display: block;
  color: inherit;
  text-decoration: none;
}


.article-content {
  padding: var(--space-xl);
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
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--space-sm);
  line-height: 1.4;
}

.article-description {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  margin-top: var(--space-2xl);
}

.pagination-btn {
  padding: var(--space-sm) var(--space-lg);
  border: 1px solid var(--color-border);
  background-color: white;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: var(--color-surface);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .search-filters {
    gap: var(--space-md);
  }

  .filter-categories {
    justify-content: flex-start;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    gap: var(--space-md);
  }
}
</style>