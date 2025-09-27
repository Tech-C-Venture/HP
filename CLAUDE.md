# Tech.C Venture HP開発プロジェクト

## プロジェクト概要
Tech.C Ventureのコーポレートサイト開発プロジェクト。自走できるエンジニアを育成する団体のWebサイトを構築します。

## 技術スタック
- **フロントエンド**: Nuxt 3（SSR/SSG）
- **ビルドツール**: Vite
- **CMS**: MicroCMS（ヘッドレスCMS）
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

### 1. MicroCMS設定
1. **MicroCMSアカウント作成・サービス作成**
   - MicroCMSにサインアップ
   - 新しいサービスを作成
   - サービス名: `techc-venture`

2. **ブログAPIの作成**
   - API作成 → リスト形式を選択
   - API ID: `blog`
   - 以下のスキーマで設定:
     - `title` (テキストフィールド/必須): タイトル
     - `date` (日時/必須): 投稿日
     - `tag` (セレクト/必須/複数選択): タグ
       - 選択肢: "ブログ", "活動報告"
     - `body` (リッチエディタV2/必須): 本文

3. **スポンサーAPIの作成**
   - API作成 → リスト形式を選択
   - API ID: `sponsor`
   - 以下のスキーマで設定:
     - `company` (テキストフィールド/必須): 会社名
     - `companyImage` (メディア/必須): 会社ロゴ
     - `body` (テキストエリア/必須): 紹介文
     - `url` (テキストフィールド): 会社URL

4. **API設定**
   - APIキーを取得（読み取り専用推奨）
   - エンドポイントURL確認:
     - ブログ: `https://[service-domain].microcms.io/api/v1/blog`
     - スポンサー: `https://[service-domain].microcms.io/api/v1/sponsor`

### 2. Cloudflare関連の手動設定
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
     - `NUXT_PUBLIC_MICROCMS_SERVICE_DOMAIN`: MicroCMSのサービスドメイン
     - `NUXT_PUBLIC_MICROCMS_API_KEY`: MicroCMSのAPIキー
     - `R2_ACCOUNT_ID`: CloudflareのAccount ID
     - `R2_ACCESS_KEY_ID`: R2のAccess Key ID
     - `R2_SECRET_ACCESS_KEY`: R2のSecret Access Key
     - `R2_BUCKET_NAME`: `techc-venture-images`
     - `R2_ENDPOINT`: R2のエンドポイントURL
     - `R2_PUBLIC_URL`: 公開URL
     - `NUXT_PUBLIC_SITE_URL`: `https://techc-venture.com`

### 4. DNS設定
1. **Cloudflareドメイン設定**
   - ドメインをCloudflareに追加
   - Cloudflare Pagesでカスタムドメインを設定
   - SSL/TLS設定: `Full (strict)`

### 4. CMS利用方法
1. **管理画面アクセス**
   - MicroCMSの管理画面にアクセス
   - `https://[service-domain].microcms.io`

2. **記事投稿フロー**
   - コンテンツ作成 → プレビュー確認 → 公開
   - `published`フィールドで公開状態制御

3. **画像管理**
   - MicroCMSのメディアライブラリを使用
   - 必要に応じてCloudflare R2と連携

## プロジェクト進行状況
- ✅ **完了**: 全ての開発タスクが完了しました
- 🚀 **次のステップ**: 手動作業指示書に従ってデプロイ作業を実行
- 📝 **状況**: 開発サーバー `http://localhost:3000` で動作確認可能

## 次に実行すべき手動作業
1. **MicroCMS サービス・API作成**
2. **GitHub リポジトリ作成・プッシュ**
3. **Cloudflare R2 バケット作成**
4. **Cloudflare Pages デプロイ設定**
5. **環境変数の設定** (MicroCMS APIキーを含む)
6. **DNS・ドメイン設定**