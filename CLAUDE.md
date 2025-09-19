# Tech.C Venture HP開発プロジェクト

## プロジェクト概要
Tech.C Ventureのコーポレートサイト開発プロジェクト。自走できるエンジニアを育成する団体のWebサイトを構築します。

## 技術スタック
- **フロントエンド**: Nuxt 3（SSR/SSG）
- **ビルドツール**: Vite
- **CMS**: Nuxt Content + Decap CMS（GitHubリポ連携）
- **画像ストレージ**: Cloudflare R2 + Workers
- **デプロイ**: Cloudflare Pages

## サイト構成

### ページ構成
1. **トップページ**
   - キャッチコピー：「自走できるエンジニアを育成する」
   - 3CTA（参加／協賛／記事を読む）
   - Aboutページへの遷移ボタン
   - 投稿記事最新3件表示
   - 協力企業ロゴスライド

2. **Aboutページ**
   - 団体ミッション
   - 活動実績
   - メンター紹介
   - 参加フロー
   - FAQ

3. **記事画面**
   - 開発ブログ・公式情報
   - カテゴリ・タグ・検索・RSS・関連記事・パンくず
   - OGP自動生成

4. **協力企業一覧ページ**
   - ロゴクリック→外部サイト遷移

## デザイン指針
- シンプルかつ洗練されたデザイン
- Claudeのホームページ風のベーシックなフォントと配色

## SEO対策
- 構造化データ（Organization, Article, Breadcrumb）
- サイトマップ自動生成
- OGP自動生成
- パンくずリスト

## 開発タスク

### フェーズ1: 基盤構築 ✅
- [x] プロジェクト構成とタスクまとめ
- [x] Nuxt 3プロジェクトセットアップ
- [x] 基本的なプロジェクト構成作成

### フェーズ2: ページ実装 ✅
- [x] トップページ実装
- [x] Aboutページ実装
- [x] 記事機能（Nuxt Content）実装

### フェーズ3: CMS・インフラ ✅
- [x] Decap CMS設定
- [x] Cloudflare R2連携設定
- [x] SEO対策実装
- [x] Cloudflare Pagesデプロイ設定

## 完成した機能

### 🏠 サイト構成
- **トップページ**: ヒーローセクション、ミッション紹介、最新記事、協力企業スライダー
- **Aboutページ**: 団体概要、活動実績、メンター紹介、参加フロー、FAQ、協賛情報
- **記事システム**: 一覧表示、詳細表示、検索・フィルタ、目次、関連記事
- **協力企業ページ**: 企業一覧、協力プラン、お問い合わせ

### 🎨 デザイン・UI
- Claude風のシンプルで洗練されたデザイン
- レスポンシブ対応（モバイル・タブレット・デスクトップ）
- 統一されたカラーパレットとタイポグラフィ
- アクセシブルなUI設計

### 📝 コンテンツ管理
- **Nuxt Content**: Markdownベースの記事管理
- **Decap CMS**: Git連携のヘッドレスCMS
- **エディトリアルワークフロー**: 下書き→レビュー→公開
- **カテゴリ・タグ管理**: 記事の分類・整理

### 🖼️ 画像管理
- **Cloudflare R2**: 高速・低コストなオブジェクトストレージ
- **画像最適化Worker**: WebP/AVIF対応、リサイズ、圧縮
- **CMSアップロード**: 管理画面から直接アップロード

### 🔍 SEO対策
- **自動サイトマップ**: `/sitemap.xml`
- **RSSフィード**: `/rss.xml`
- **構造化データ**: Organization、Article、Breadcrumb
- **OGP自動生成**: SNSシェア対応
- **robots.txt**: 検索エンジン最適化

### ⚡ パフォーマンス
- **SSR/SSG**: Nuxt 3の高速レンダリング
- **画像最適化**: 次世代フォーマット対応
- **CDN配信**: Cloudflareの高速配信
- **キャッシュ戦略**: 効率的なキャッシュ制御

### 🚀 デプロイ・CI/CD
- **GitHub Actions**: 自動ビルド・デプロイ
- **Cloudflare Pages**: エッジ配信
- **Lighthouse CI**: パフォーマンス監視
- **環境変数管理**: セキュアな設定管理

## 手動作業指示書

### 1. GitHub設定
1. **リポジトリの作成**
   - GitHubで新しいリポジトリを作成
   - リポジトリ名: `techc-venture-website`

2. **Decap CMS用のGitHub App設定**
   - GitHub Settings → Developer settings → OAuth Apps
   - 新しいOAuth Appを作成
   - Application name: `Tech.C Venture CMS`
   - Homepage URL: `https://techc-venture.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Client IDとClient Secretを保存

### 2. Netlify Identity設定
1. **Netlifyアカウント作成・サイト接続**
   - Netlifyにサインアップ
   - GitHubリポジトリと連携
   - サイトをデプロイ

2. **Identity機能の有効化**
   - Netlify管理画面 → Identity → Enable Identity
   - Registration: `Invite only` に設定
   - External providers: GitHub を追加
   - Git Gateway を有効化

3. **管理者ユーザーの招待**
   - Identity → Invite users
   - 管理者のメールアドレスを入力して招待

### 3. Cloudflare関連の手動設定
1. **Cloudflare R2バケット作成**
   - Cloudflareダッシュボード → R2 Object Storage
   - バケット名: `techc-venture-images`
   - パブリックアクセス設定
   - CORS設定を追加

2. **Cloudflare Pages設定**
   - Cloudflare Pages → GitHubリポジトリと連携
   - Framework preset: `Nuxt.js`
   - Build command: `npm run build`
   - Build output directory: `.output/public`
   - Node.js version: `20.18.3`

3. **環境変数設定**
   - Cloudflare Pages → Settings → Environment variables
   - 以下の変数を設定:
     - `R2_ACCOUNT_ID`: CloudflareのAccount ID
     - `R2_ACCESS_KEY_ID`: R2のAccess Key ID
     - `R2_SECRET_ACCESS_KEY`: R2のSecret Access Key
     - `R2_BUCKET_NAME`: `techc-venture-images`
     - `NUXT_PUBLIC_SITE_URL`: `https://techc-venture.com`

### 4. DNS設定
1. **Cloudflareドメイン設定**
   - ドメインをCloudflareに追加
   - Cloudflare Pagesでカスタムドメインを設定
   - SSL/TLS設定: `Full (strict)`

### 5. CMS利用方法
1. **管理画面アクセス**
   - `https://yoursite.com/admin` にアクセス
   - Netlify Identityでログイン

2. **記事投稿フロー**
   - Draft → In Review → Ready → Published
   - プレビュー機能で確認してから公開

3. **画像アップロード**
   - Decap CMSから直接アップロード
   - Cloudflare R2に自動保存

## プロジェクト進行状況
- ✅ **完了**: 全ての開発タスクが完了しました
- 🚀 **次のステップ**: 手動作業指示書に従ってデプロイ作業を実行
- 📝 **状況**: 開発サーバー `http://localhost:3000` で動作確認可能

## 次に実行すべき手動作業
1. **GitHub リポジトリ作成・プッシュ**
2. **Netlify Identity 設定** (Decap CMS用)
3. **Cloudflare R2 バケット作成**
4. **Cloudflare Pages デプロイ設定**
5. **環境変数の設定**
6. **DNS・ドメイン設定**