<template>
  <div>
    <article v-if="sponsor" class="sponsor-detail">
      <!-- Sponsor Header -->
      <header class="sponsor-header">
        <div class="container">
          <!-- Breadcrumb -->
          <nav class="breadcrumb">
            <NuxtLink to="/">ホーム</NuxtLink>
            <span class="breadcrumb-separator">›</span>
            <NuxtLink to="/partners">協力企業</NuxtLink>
            <span class="breadcrumb-separator">›</span>
            <span class="breadcrumb-current">{{ sponsor.company }}</span>
          </nav>

          <div class="sponsor-hero">
            <div class="sponsor-logo-container">
              <img
                v-if="sponsor.companyImage"
                :src="sponsor.companyImage.url"
                :alt="sponsor.company"
                class="sponsor-logo"
              />
              <div v-else class="sponsor-logo-placeholder">
                {{ sponsor.company }}
              </div>
            </div>
            <div class="sponsor-info">
              <h1 class="sponsor-title">{{ sponsor.company }}</h1>
              <a
                v-if="sponsor.url"
                :href="sponsor.url"
                target="_blank"
                rel="noopener noreferrer"
                class="sponsor-url"
              >
                {{ sponsor.url }}
              </a>
            </div>
          </div>
        </div>
      </header>

      <!-- Sponsor Content -->
      <main class="sponsor-main">
        <div class="container">
          <div class="sponsor-content">
            <div class="sponsor-description">
              <h2>会社について</h2>
              <div class="description-text">
                {{ sponsor.body }}
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Back to Partners -->
      <section class="back-to-partners">
        <div class="container">
          <NuxtLink to="/partners" class="btn btn-secondary">
            ← 協力企業一覧に戻る
          </NuxtLink>
        </div>
      </section>
    </article>

    <!-- 404 fallback -->
    <div v-else class="not-found">
      <div class="container">
        <h1>企業が見つかりません</h1>
        <p>指定された企業が存在しないか、削除されている可能性があります。</p>
        <NuxtLink to="/partners" class="btn btn-primary">
          協力企業一覧に戻る
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { getSponsorDetail } = useMicroCMS()

// スポンサーデータを取得
const { data: sponsor } = await useAsyncData(`sponsor-${route.params.id}`, async () => {
  try {
    const sponsorData = await getSponsorDetail(route.params.id)
    return sponsorData
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Sponsor not found'
    })
  }
}, {
  watch: [() => route.params.id]
})

// SEO設定
watchEffect(() => {
  if (sponsor.value) {
    useSeoMeta({
      title: `${sponsor.value.company} | Tech.C Venture`,
      description: sponsor.value.body || '',
      ogTitle: sponsor.value.company,
      ogDescription: sponsor.value.body || '',
      ogType: 'website',
      ogImage: sponsor.value.companyImage?.url || ''
    })
  }
})
</script>

<style scoped>
.sponsor-header {
  background-color: var(--color-surface);
  padding: var(--space-xl) 0 var(--space-2xl);
  border-bottom: 1px solid var(--color-border);
}

.breadcrumb {
  font-size: 0.875rem;
  margin-bottom: var(--space-lg);
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

.sponsor-hero {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
}

.sponsor-logo-container {
  flex-shrink: 0;
}

.sponsor-logo {
  max-width: 200px;
  max-height: 120px;
  width: auto;
  height: auto;
  object-fit: contain;
}

.sponsor-logo-placeholder {
  width: 200px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-border) 100%);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-align: center;
  padding: var(--space-md);
}

.sponsor-info {
  flex: 1;
}

.sponsor-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-md);
  color: var(--color-text);
}

.sponsor-url {
  color: var(--color-accent);
  text-decoration: none;
  font-size: 1.125rem;
  transition: color 0.2s ease;
}

.sponsor-url:hover {
  color: var(--color-accent-hover);
}

.sponsor-main {
  padding: var(--space-3xl) 0;
}

.sponsor-content {
  max-width: 800px;
  margin: 0 auto;
}

.sponsor-description h2 {
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: var(--space-lg);
  color: var(--color-text);
}

.description-text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text);
  white-space: pre-line;
}

.back-to-partners {
  padding: var(--space-xl) 0;
  text-align: center;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
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

@media (max-width: 768px) {
  .sponsor-hero {
    flex-direction: column;
    text-align: center;
    gap: var(--space-lg);
  }

  .sponsor-title {
    font-size: 2rem;
  }

  .sponsor-logo {
    max-width: 150px;
    max-height: 90px;
  }

  .sponsor-logo-placeholder {
    width: 150px;
    height: 90px;
  }

  .sponsor-main {
    padding: var(--space-xl) 0;
  }
}
</style>