---
title: "Nuxt 3で始めるモダンWebアプリケーション開発"
description: "Nuxt 3の基本的な使い方から実践的な開発手法まで、初心者向けに詳しく解説します。"
date: 2024-01-20T14:30:00.000Z
category: "技術"
published: true
image: "/images/uploads/nuxt3-tutorial.jpg"
author: "山田太郎"
tags:
  - "Nuxt3"
  - "Vue.js"
  - "フロントエンド"
  - "SSR"
---

# Nuxt 3入門：モダンWebアプリケーションを作ろう

最近のWeb開発では、**Nuxt 3**が注目を集めています。Vue.jsベースの強力なフレームワークで、SSR（Server-Side Rendering）やSSG（Static Site Generation）を簡単に実現できます。

## Nuxt 3とは？

Nuxt 3は、Vue.jsアプリケーションを簡単に構築するための**メタフレームワーク**です。

### 主な特徴

- **🚀 高性能**: Viteベースの高速な開発体験
- **🔧 TypeScript**: ファーストクラスのTypeScriptサポート
- **📱 ユニバーサル**: SSR、SSG、SPAすべてに対応
- **🎨 モジュール**: 豊富なモジュールエコシステム

## 環境構築

### 前提条件
- Node.js 16.10.0以上
- npm、yarn、またはpnpm

### プロジェクト作成

```bash
# プロジェクトを作成
npx nuxi@latest init my-app

# ディレクトリに移動
cd my-app

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## 基本的なディレクトリ構造

```
my-app/
├── components/     # Vue コンポーネント
├── layouts/        # レイアウトテンプレート
├── pages/          # ページコンポーネント（自動ルーティング）
├── plugins/        # プラグイン
├── public/         # 静的ファイル
├── server/         # サーバーサイドAPI
├── nuxt.config.ts  # 設定ファイル
└── app.vue         # ルートコンポーネント
```

## ページの作成

Nuxt 3では、`pages/`ディレクトリにVueファイルを作成するだけで自動的にルーティングが設定されます。

### 基本的なページ

```vue
<!-- pages/index.vue -->
<template>
  <div>
    <h1>Welcome to Nuxt 3!</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
const message = ref('Hello, World!')
</script>
```

### 動的ルーティング

```vue
<!-- pages/blog/[slug].vue -->
<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: post } = await $fetch(`/api/posts/${route.params.slug}`)
</script>
```

## コンポーネントの活用

### 自動インポート

Nuxt 3では、`components/`ディレクトリのコンポーネントが自動的にインポートされます。

```vue
<!-- components/TheHeader.vue -->
<template>
  <header class="header">
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
    </nav>
  </header>
</template>
```

```vue
<!-- pages/index.vue -->
<template>
  <div>
    <!-- 自動的にインポートされる -->
    <TheHeader />
    <main>
      <!-- コンテンツ -->
    </main>
  </div>
</template>
```

## データフェッチング

### useFetch

```vue
<script setup>
// リアクティブなデータフェッチング
const { data: posts, pending, error } = await useFetch('/api/posts')
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <article v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.excerpt }}</p>
      </article>
    </div>
  </div>
</template>
```

### $fetch

```vue
<script setup>
// シンプルなAPIコール
const handleSubmit = async (formData) => {
  try {
    const result = await $fetch('/api/contact', {
      method: 'POST',
      body: formData
    })
    console.log('Success:', result)
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>
```

## スタイリング

### CSS Modules

```vue
<template>
  <div :class="$style.container">
    <h1 :class="$style.title">Hello Nuxt 3</h1>
  </div>
</template>

<style module>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2.5rem;
  color: #00dc82;
}
</style>
```

### Tailwind CSS

```bash
# Tailwind CSS モジュールをインストール
npm install --save-dev @nuxtjs/tailwindcss

# nuxt.config.ts に追加
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss']
})
```

## SEO対策

### useSeoMeta

```vue
<script setup>
useSeoMeta({
  title: 'Nuxt 3入門 | Tech.C Venture',
  description: 'Nuxt 3の基本的な使い方から実践的な開発手法まで解説',
  ogTitle: 'Nuxt 3入門',
  ogDescription: 'モダンWebアプリケーション開発を学ぼう',
  ogImage: '/images/nuxt3-tutorial.jpg'
})
</script>
```

## 実践的な例：ブログシステム

```vue
<!-- pages/blog/index.vue -->
<template>
  <div class="blog-list">
    <h1>Tech Blog</h1>
    <article v-for="post in posts" :key="post.slug" class="post-card">
      <NuxtImg :src="post.image" :alt="post.title" />
      <div class="content">
        <h2>
          <NuxtLink :to="`/blog/${post.slug}`">
            {{ post.title }}
          </NuxtLink>
        </h2>
        <p>{{ post.description }}</p>
        <time>{{ formatDate(post.date) }}</time>
      </div>
    </article>
  </div>
</template>

<script setup>
// コンテンツを取得
const { data: posts } = await queryContent('/blog')
  .where({ published: true })
  .sort({ date: -1 })
  .find()

// 日付フォーマット関数
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ja-JP')
}

// SEO設定
useSeoMeta({
  title: 'Tech Blog | Tech.C Venture',
  description: '技術記事やプロジェクト情報をお届けします'
})
</script>
```

## まとめ

Nuxt 3は、モダンなWeb開発のためのすべてが揃った強力なフレームワークです。

### メリット
- **開発体験**: 高速な開発サーバーと優れたDX
- **パフォーマンス**: 最適化されたバンドルとレンダリング
- **SEO**: 組み込まれたSEO対策機能
- **スケーラビリティ**: 小規模から大規模まで対応

### 次のステップ
1. 公式ドキュメントを読む
2. 実際にプロジェクトを作ってみる
3. Nuxt Content でブログを構築
4. デプロイしてみる（Netlify、Vercel、Cloudflare Pages）

Tech.C Ventureでは、このようなモダンな技術を使った実践的な開発プロジェクトを行っています。興味のある方は、ぜひ参加をご検討ください！

## 参考リンク

- [Nuxt 3 公式ドキュメント](https://nuxt.com/)
- [Vue.js 公式ドキュメント](https://vuejs.org/)
- [Nuxt Content](https://content.nuxtjs.org/)
- [Nuxt Modules](https://modules.nuxtjs.org/)