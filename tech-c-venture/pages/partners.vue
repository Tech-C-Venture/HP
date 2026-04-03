<template>
  <div>
    <!-- Hero Section -->
    <section class="hero section-padding">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">協力企業</h1>
          <p class="hero-description">
            Tech.C Ventureの活動をサポートしていただいている企業様をご紹介します。
          </p>
        </div>
      </div>
    </section>

    <!-- Partners Grid -->
    <section class="section-padding">
      <div class="container">
        <div class="partners-grid">
          <div
            v-for="partner in partners"
            :key="partner.id"
            class="partner-card"
          >
            <component
              :is="partner.url ? 'a' : 'NuxtLink'"
              v-bind="partner.url ? { href: partner.url, target: '_blank', rel: 'noopener noreferrer' } : { to: `/partners/${partner.id}` }"
              :title="partner.company"
              class="partner-link"
            >
              <div class="partner-logo-container">
                <img
                  v-if="partner.companyImage"
                  :src="partner.companyImage.url"
                  :alt="partner.company"
                  class="partner-logo"
                />
                <div v-else class="partner-logo-placeholder">
                  {{ partner.company }}
                </div>
              </div>
              <div class="partner-info">
                <h3 class="partner-name">{{ partner.company }}</h3>
              </div>
            </component>
          </div>
        </div>
      </div>
    </section>

    <!-- Partner Benefits -->
    <section class="section-padding" style="background-color: var(--color-surface);">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2>協力企業の皆様への感謝</h2>
          <p class="text-muted">
            Tech.C Ventureの活動は、多くの企業様のご支援により成り立っています。
          </p>
        </div>

        <div class="benefits-grid">
          <div class="benefit-item">
            <div class="benefit-icon">🎓</div>
            <h3>教育支援</h3>
            <p>
              実践的な技術教育プログラムの提供により、学生のスキル向上を支援していただいています。
            </p>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">💼</div>
            <h3>キャリア支援</h3>
            <p>
              インターンシップの機会提供や就職活動サポートにより、学生の将来をサポートしていただいています。
            </p>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">🚀</div>
            <h3>プロジェクト支援</h3>
            <p>
              実際の開発プロジェクトへの参画機会や技術的なアドバイスをいただいています。
            </p>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">🤝</div>
            <h3>ネットワーキング</h3>
            <p>
              業界のプロフェッショナルとの交流機会を提供していただき、学生の視野を広げています。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Become a Partner -->
    <section class="section-padding">
      <div class="container">
        <div class="become-partner">
          <div class="text-center mb-2xl">
            <h2>協力企業募集</h2>
            <p class="text-muted">
              Tech.C Ventureの活動にご協力いただける企業様を募集しています。
            </p>
          </div>


          <div class="text-center" style="margin-top: 3rem;">
            <p class="contact-note">
              その他のご協力方法についても、お気軽にご相談ください。<br>
              学生の成長と技術教育の発展に、ぜひご協力をお願いいたします。
            </p>
            <a href="https://forms.gle/8NjDuEtRBN14kEXS9" class="btn btn-primary btn-lg" target="_blank">
              協力企業について相談する
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO設定
useSeoMeta({
  title: '協力企業 | Tech.C Venture',
  description: 'Tech.C Ventureの活動をサポートしていただいている協力企業様をご紹介します。',
  ogTitle: '協力企業 | Tech.C Venture',
  ogDescription: 'Tech.C Ventureの活動をサポートしていただいている協力企業様をご紹介します。',
  ogType: 'website'
})

// 構造化データは後で追加

// MicroCMSからスポンサー一覧を取得
const { getSponsorsList } = useMicroCMS()

const { data: sponsorsData } = await useAsyncData('sponsors-partners', () =>
  getSponsorsList()
)

// スポンサー.contentsを使用（MicroCMSのレスポンス形式）
const partners = computed(() => sponsorsData.value?.contents || [])
</script>

<style scoped>
.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.partner-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.partner-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.partner-link {
  display: block;
  color: inherit;
  text-decoration: none;
  padding: var(--space-xl);
}

.partner-logo-container {
  text-align: center;
  margin-bottom: var(--space-lg);
  padding: var(--space-lg);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
}

.partner-logo {
  max-width: 200px;
  max-height: 80px;
  width: auto;
  height: auto;
  object-fit: contain;
}

.partner-logo-placeholder {
  width: 200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-border) 100%);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-align: center;
  padding: var(--space-sm);
}

.partner-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--space-sm);
  color: var(--color-text);
}

.partner-description {
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: var(--space-md);
}


.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-xl);
}

.benefit-item {
  text-align: center;
  padding: var(--space-xl);
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.benefit-icon {
  font-size: 3rem;
  margin-bottom: var(--space-md);
}

.benefit-item h3 {
  color: var(--color-accent);
  margin-bottom: var(--space-md);
}

.become-partner {
  max-width: 1000px;
  margin: 0 auto;
}


.contact-note {
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: var(--space-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .partners-grid {
    grid-template-columns: 1fr;
  }


  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>