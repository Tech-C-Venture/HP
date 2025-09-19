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
            :key="partner.name"
            class="partner-card"
          >
            <a
              :href="partner.url"
              :title="partner.name"
              target="_blank"
              rel="noopener noreferrer"
              class="partner-link"
            >
              <div class="partner-logo-container">
                <img
                  :src="partner.logo"
                  :alt="partner.name"
                  class="partner-logo"
                />
              </div>
              <div class="partner-info">
                <h3 class="partner-name">{{ partner.name }}</h3>
                <p class="partner-description">{{ partner.description }}</p>
                <div class="partner-meta">
                  <span class="partner-type">{{ partner.type }}</span>
                  <span class="partner-support">{{ partner.support }}</span>
                </div>
              </div>
            </a>
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

          <div class="partnership-types">
            <div class="partnership-card">
              <h3>ゴールドパートナー</h3>
              <div class="partnership-price">年間 50万円〜</div>
              <ul class="partnership-benefits">
                <li>企業ロゴの優先掲載</li>
                <li>技術セミナー・勉強会の開催権</li>
                <li>学生への直接的なメンタリング機会</li>
                <li>優先的な学生紹介・採用支援</li>
                <li>プロジェクトへの技術アドバイザー参加</li>
              </ul>
              <a href="mailto:partner@techc-venture.com?subject=ゴールドパートナーについて" class="btn btn-primary">
                お問い合わせ
              </a>
            </div>

            <div class="partnership-card">
              <h3>シルバーパートナー</h3>
              <div class="partnership-price">年間 20万円〜</div>
              <ul class="partnership-benefits">
                <li>企業ロゴの掲載</li>
                <li>イベント共催の機会</li>
                <li>学生との交流イベント参加</li>
                <li>採用情報の優先的な告知</li>
                <li>技術ブログでの企業紹介</li>
              </ul>
              <a href="mailto:partner@techc-venture.com?subject=シルバーパートナーについて" class="btn btn-primary">
                お問い合わせ
              </a>
            </div>

            <div class="partnership-card">
              <h3>サポートパートナー</h3>
              <div class="partnership-price">年間 5万円〜</div>
              <ul class="partnership-benefits">
                <li>企業ロゴの掲載</li>
                <li>採用情報の掲載</li>
                <li>学生向けセミナー参加</li>
                <li>技術ブログでの記事投稿機会</li>
                <li>コミュニティへの参加権</li>
              </ul>
              <a href="mailto:partner@techc-venture.com?subject=サポートパートナーについて" class="btn btn-secondary">
                お問い合わせ
              </a>
            </div>
          </div>

          <div class="text-center" style="margin-top: 3rem;">
            <p class="contact-note">
              その他のご協力方法についても、お気軽にご相談ください。<br>
              学生の成長と技術教育の発展に、ぜひご協力をお願いいたします。
            </p>
            <a href="mailto:partner@techc-venture.com" class="btn btn-primary btn-lg">
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

// 協力企業データ（実際の運用時はCMSから取得）
const partners = ref([
  {
    name: 'テックカンパニーA',
    logo: '/images/partners/company-a.png',
    url: 'https://example-a.com',
    description: 'AI・機械学習領域でのイノベーションを推進する技術企業',
    type: 'ゴールドパートナー',
    support: '技術メンタリング・インターン提供'
  },
  {
    name: 'スタートアップB',
    logo: '/images/partners/company-b.png',
    url: 'https://example-b.com',
    description: 'Web3・ブロックチェーン技術の開発を手がけるスタートアップ',
    type: 'シルバーパートナー',
    support: 'プロジェクト協力・勉強会開催'
  },
  {
    name: 'ITコンサルC',
    logo: '/images/partners/company-c.png',
    url: 'https://example-c.com',
    description: '企業のDX推進を支援するITコンサルティング企業',
    type: 'シルバーパートナー',
    support: '業界知識提供・キャリア相談'
  },
  {
    name: 'ソフトウェア企業D',
    logo: '/images/partners/company-d.png',
    url: 'https://example-d.com',
    description: 'エンタープライズ向けソフトウェア開発企業',
    type: 'サポートパートナー',
    support: '技術ブログ協力・採用情報提供'
  },
  {
    name: 'クラウド企業E',
    logo: '/images/partners/company-e.png',
    url: 'https://example-e.com',
    description: 'クラウドインフラとDevOpsソリューションの提供企業',
    type: 'サポートパートナー',
    support: 'インフラ提供・技術セミナー'
  },
  {
    name: 'フィンテック企業F',
    logo: '/images/partners/company-f.png',
    url: 'https://example-f.com',
    description: '金融テクノロジーでイノベーションを起こすフィンテック企業',
    type: 'ゴールドパートナー',
    support: '実プロジェクト参加・技術指導'
  }
])
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

.partner-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.partner-type {
  display: inline-block;
  background-color: var(--color-accent);
  color: white;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  width: fit-content;
}

.partner-support {
  color: var(--color-text-muted);
  font-size: 0.875rem;
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

.partnership-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.partnership-card {
  background: white;
  padding: var(--space-2xl);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  position: relative;
}

.partnership-card h3 {
  font-size: 1.5rem;
  color: var(--color-accent);
  margin-bottom: var(--space-md);
}

.partnership-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-lg);
  padding: var(--space-md);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
}

.partnership-benefits {
  list-style: none;
  padding: 0;
  margin-bottom: var(--space-xl);
  text-align: left;
}

.partnership-benefits li {
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--color-border);
  position: relative;
  padding-left: var(--space-lg);
}

.partnership-benefits li:last-child {
  border-bottom: none;
}

.partnership-benefits li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: bold;
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

  .partnership-types {
    grid-template-columns: 1fr;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>