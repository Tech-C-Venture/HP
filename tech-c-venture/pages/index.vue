<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-brand">
            <img src="/images/logo/logo-v.png" alt="Tech.C Venture" class="hero-logo" />
          </div>
          <h1 class="hero-title">自走できるエンジニアを育成する</h1>
          <p class="hero-description">
            Tech.C.Ventureはメンバー全員が高め合い、学校の領域を超えて自走できるエンジニアを育成する団体です。
          </p>
          <div class="hero-actions">
            <NuxtLink to="/about#join" class="btn btn-primary btn-lg">
              参加申し込み
            </NuxtLink>
            <NuxtLink to="/about#sponsor" class="btn btn-secondary btn-lg">
              協賛について
            </NuxtLink>
            <NuxtLink to="/blog" class="btn btn-secondary btn-lg">
              記事を読む
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2>私たちのミッション</h2>
          <p class="text-muted">
            Tech.C.Ventureは常に最新情報を追い求め、自分の力で社会に貢献できる人材を育成します。
          </p>
        </div>

        <div class="grid grid-cols-3">
          <div class="card text-center">
            <h3>基礎学習</h3>
            <p>
              プログラミングの基礎から学習し、確実な技術力を身につけます。
            </p>
          </div>

          <div class="card text-center">
            <h3>プロジェクト実践</h3>
            <p>
              外部プロジェクトや各学年でのプロジェクトを牽引できる人材を育成します。
            </p>
          </div>

          <div class="card text-center">
            <h3>継続的成長</h3>
            <p>
              メンバーは止まりません。常に最新技術を追い求め成長し続けます。
            </p>
          </div>
        </div>

        <div class="text-center" style="margin-top: 2rem;">
          <NuxtLink to="/about" class="btn btn-primary">
            団体について詳しく見る
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Latest Articles -->
    <section class="section-padding" style="background-color: var(--color-surface);">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2>最新記事</h2>
          <p class="text-muted">
            メンバーによる開発ブログや技術情報をお届けします。
          </p>
        </div>

        <LatestArticles />

        <div class="text-center" style="margin-top: 2rem;">
          <NuxtLink to="/blog" class="btn btn-secondary">
            すべての記事を見る
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Partners -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2>協力企業</h2>
          <p class="text-muted">
            Tech.C.Ventureの活動をサポートしていただいている企業様です。
          </p>
        </div>

        <PartnersSlider />

        <div class="text-center" style="margin-top: 2rem;">
          <NuxtLink to="/partners" class="btn btn-secondary">
            協力企業一覧を見る
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO設定
useSeoMeta({
  title: 'Tech.C Venture - 自走できるエンジニアを育成する',
  description: 'Tech.C.Ventureはメンバー全員が高め合い、学校の領域を超えて自走できるエンジニアを育成する団体です。',
  ogTitle: 'Tech.C Venture - 自走できるエンジニアを育成する',
  ogDescription: 'Tech.C.Ventureはメンバー全員が高め合い、学校の領域を超えて自走できるエンジニアを育成する団体です。',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

// 構造化データは後で追加
</script>