# Tech.C Venture CMS セットアップガイド

## 概要

Tech.C VentureのウェブサイトでDecap CMS（旧Netlify CMS）とCloudflare R2を使用した記事投稿システムが実装されました。

## 実装内容

### ✅ 完了済み機能

1. **Decap CMS設定**
   - `public/admin/config.yml` - CMS設定ファイル
   - `public/admin/index.html` - 管理画面
   - 日本語対応、プレビュー機能付き

2. **コンテンツ構造**
   - `content/blog/` - ブログ記事
   - `content/partners/` - 協力企業
   - `content/mentors/` - メンター情報
   - `content/settings/` - サイト設定

3. **Cloudflare R2連携**
   - `server/api/upload/image.post.ts` - 画像アップロードAPI
   - AWS SDK S3互換クライアント使用
   - 自動ファイル名生成、サイズ制限付き

4. **プレビュー機能**
   - リアルタイムプレビュー
   - Claude風デザインシステム適用
   - `public/admin/preview-styles.css` - プレビュー専用スタイル

## セットアップ手順

### 1. 環境変数設定

`.env`ファイルを作成し、以下を設定：

```bash
# Cloudflare R2 設定
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=techc-venture-images
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://your-custom-domain.com

# サイト設定
NUXT_PUBLIC_SITE_URL=https://f-tcv.com
```

### 2. Cloudflare R2バケット作成

1. Cloudflareダッシュボードでアカウントを選択
2. 「R2 Object Storage」を開く
3. 新しいバケットを作成（例：`techc-venture-images`）
4. カスタムドメインを設定（CDN用）

### 3. API Token作成

1. Cloudflareダッシュボードで「My Profile」→「API Tokens」
2. 「Create Token」でR2用の権限を設定
3. 作成されたAccess KeyとSecret Keyを環境変数に設定

### 4. Git Gateway設定（本番環境）

1. GitHub Appを作成
2. リポジトリにWebhookを設定
3. `public/admin/config.yml`で`local_backend: true`をコメントアウト

### 5. 管理画面アクセス

- 開発環境：`http://localhost:3002/admin/`
- 本番環境：`https://your-domain.com/admin/`

## 使用方法

### 記事投稿

1. `/admin/`にアクセス
2. 「ブログ記事」→「New ブログ記事」
3. 必要項目を入力：
   - タイトル
   - 説明
   - カテゴリ（お知らせ、技術、開発、イベント、メンバー）
   - アイキャッチ画像（R2に自動アップロード）
   - 本文（Markdownエディタ）

### 画像管理

- ドラッグ&ドロップでアップロード
- 自動リサイズ・最適化
- Cloudflare R2への直接保存
- CDN経由での高速配信

### プレビュー

- リアルタイムプレビュー機能
- 実際のサイトデザインで表示
- モバイル・デスクトップ対応確認

## ファイル構造

```
tech-c-venture/
├── public/
│   └── admin/
│       ├── index.html          # 管理画面HTML
│       ├── config.yml          # CMS設定
│       └── preview-styles.css  # プレビュー用CSS
├── content/
│   ├── blog/                   # ブログ記事
│   ├── partners/               # 協力企業
│   ├── mentors/                # メンター
│   └── settings/               # サイト設定
├── server/
│   └── api/
│       └── upload/
│           └── image.post.ts   # 画像アップロードAPI
└── nuxt.config.ts              # Nuxt設定（R2設定含む）
```

## トラブルシューティング

### 画像アップロードエラー

1. R2の認証情報を確認
2. バケット名とエンドポイントを確認
3. CORS設定を確認

### 管理画面にアクセスできない

1. `local_backend: true`の設定を確認
2. Git Gateway設定を確認（本番環境）
3. ネットワーク設定を確認

### プレビューが表示されない

1. `preview-styles.css`の読み込みを確認
2. プレビューテンプレートの登録を確認
3. ブラウザのコンソールエラーを確認

## 本番デプロイ時の注意点

1. `public/admin/config.yml`で`local_backend: true`をコメントアウト
2. 環境変数をCloudflare Pagesに設定
3. Git Gatewayの認証設定
4. R2バケットのCORS設定

## サポート

問題が発生した場合は、以下を確認してください：

1. Nuxt 3の開発サーバーが正常に動作している
2. 環境変数が正しく設定されている
3. Cloudflare R2の設定が正しい
4. ネットワーク接続が正常

詳細な設定については、Decap CMSとCloudflare R2の公式ドキュメントを参照してください。