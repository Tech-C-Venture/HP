# Tech.C Venture Website

Tech.C Ventureの公式Webサイトです。自走できるエンジニアを育成する団体として、メンバーの活動や記事を発信しています。

## 🚀 技術スタック

- **フレームワーク**: [Nuxt 3](https://nuxt.com/)
- **UI/CSS**: カスタムCSS（Claude風デザイン）
- **CMS**: [Nuxt Content](https://content.nuxt.com/) + [Decap CMS](https://decapcms.org/)
- **画像ストレージ**: [Cloudflare R2](https://developers.cloudflare.com/r2/)
- **ホスティング**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **SEO**: [@nuxtjs/seo](https://github.com/nuxt-modules/seo)

## 📁 プロジェクト構成

```
tech-c-venture/
├── assets/css/           # CSSファイル
├── components/           # Vueコンポーネント
├── content/             # Markdown記事・設定
│   ├── blog/           # ブログ記事
│   ├── settings/       # サイト設定
│   └── partners/       # 協力企業情報
├── layouts/             # レイアウトコンポーネント
├── pages/              # ページコンポーネント
├── public/             # 静的ファイル
│   └── admin/         # Decap CMS管理画面
├── server/             # サーバーサイドAPI
└── cloudflare-worker.js # 画像最適化Worker
```

## 🛠️ 開発環境のセットアップ

### 前提条件

- Node.js 20.18.3 以上
- npm

### セットアップ手順

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/your-org/techc-venture-website.git
   cd techc-venture-website
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **環境変数を設定**
   ```bash
   cp .env.example .env
   # .envファイルを編集して必要な値を設定
   ```

4. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

   ブラウザで `http://localhost:3000` を開いてサイトを確認できます。

### 利用可能なコマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# プレビューサーバー起動
npm run preview

# 型チェック
npm run typecheck
```

## 📝 記事の投稿方法

### 1. Decap CMS（推奨）

1. `/admin` にアクセス
2. GitHub認証でログイン
3. ダッシュボードから記事を作成・編集
4. プレビューで確認後、公開

### 2. 直接編集

1. `content/blog/` に Markdown ファイルを作成
2. 必要なフロントマターを記述
3. Git でコミット・プッシュ

#### フロントマター例

```yaml
---
title: "記事タイトル"
description: "記事の説明"
date: "2024-09-19"
category: "技術"
published: true
image: "/images/blog/sample.jpg"
author: "執筆者名"
tags: ["タグ1", "タグ2"]
---
```

## 🚀 デプロイ

### 自動デプロイ

- `main` ブランチへのプッシュで自動的にCloudflare Pagesにデプロイ
- GitHub Actionsがビルド・デプロイを実行
- Lighthouse CIによるパフォーマンス測定も自動実行

### 手動デプロイ

1. **ビルド**
   ```bash
   npm run build
   ```

2. **Cloudflare Pagesにアップロード**
   - `.output/public` ディレクトリをアップロード

## 🖼️ 画像管理

### アップロード

- Decap CMSから直接アップロード
- 自動的にCloudflare R2に保存
- 最適化・配信はCloudflare Workerで処理

### ディレクトリ構成

```
public/images/
├── blog/          # ブログ記事用画像
├── partners/      # 協力企業ロゴ
├── mentors/       # メンター写真
└── uploads/       # CMS経由アップロード画像
```

## 🔧 設定・カスタマイズ

### サイト基本情報

`content/settings/site.yml` でサイトの基本情報を編集

### ナビゲーション

`content/settings/navigation.yml` でメニュー項目を編集

### ソーシャルメディア

`content/settings/social.yml` でソーシャルリンクを編集

## 📊 SEO対策

- 自動サイトマップ生成 (`/sitemap.xml`)
- RSSフィード (`/rss.xml`)
- 構造化データ（Organization, Article, Breadcrumb）
- OGP自動生成
- パンくずリスト

## 🤝 コントリビューション

1. Issueを作成して変更内容を議論
2. フォークして新しいブランチを作成
3. 変更を実装してテスト
4. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) のもとで公開されています。

## 📞 お問い合わせ

- Email: info@dokkiitech.com
- Website: https://techc-venture.com

---

**Tech.C Venture** - 自走できるエンジニアを育成する
