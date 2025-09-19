<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-content">
        <div class="auth-card">
          <div class="auth-icon">
            <img src="/images/logo/logo.png" alt="Tech.C Venture" class="logo" />
          </div>

          <h1 class="auth-title">CMS認証処理中</h1>

          <div v-if="status === 'processing'" class="auth-status processing">
            <div class="spinner"></div>
            <p>GitHubからの認証情報を処理しています...</p>
          </div>

          <div v-else-if="status === 'success'" class="auth-status success">
            <div class="success-icon">✓</div>
            <p>認証が完了しました。画面を閉じます。</p>
          </div>

          <div v-else-if="status === 'error'" class="auth-status error">
            <div class="error-icon">✗</div>
            <p>認証に失敗しました。再度お試しください。</p>
            <details class="error-details">
              <summary>エラー詳細</summary>
              <code>{{ errorMessage }}</code>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// SEO設定
useSeoMeta({
  title: 'CMS認証 | Tech.C Venture',
  description: 'Tech.C Venture CMS認証ページ',
  robots: 'noindex, nofollow'
})

const status = ref('processing')
const errorMessage = ref('')

const processAuth = () => {
  try {
    // URLからパラメータを取得
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const state = urlParams.get('state')
    const error = urlParams.get('error')

    if (error) {
      throw new Error(`GitHub OAuth Error: ${error}`)
    }

    if (!code) {
      throw new Error('Authorization code not found in URL parameters')
    }

    console.log('Auth processing:', { code: code.substring(0, 10) + '...', state })

    // 親ウィンドウ（CMS）にメッセージを送信
    if (window.opener) {
      window.opener.postMessage({
        type: 'authorization_github',
        payload: {
          code,
          state: state || 'default'
        }
      }, window.location.origin)

      status.value = 'success'

      // 3秒後にウィンドウを閉じる
      setTimeout(() => {
        window.close()
      }, 3000)

    } else {
      // ポップアップでない場合はリダイレクト
      console.warn('Not opened as popup, redirecting to admin')
      setTimeout(() => {
        window.location.href = '/admin/'
      }, 2000)
      status.value = 'success'
    }

  } catch (error) {
    console.error('Auth processing error:', error)
    status.value = 'error'
    errorMessage.value = error.message
  }
}

onMounted(() => {
  // 少し遅延させて処理を開始
  setTimeout(processAuth, 500)
})
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%);
  padding: var(--space-xl);
}

.auth-content {
  width: 100%;
  max-width: 400px;
}

.auth-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-3xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  text-align: center;
}

.auth-icon {
  margin-bottom: var(--space-xl);
}

.auth-icon .logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}

.auth-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-xl);
}

.auth-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.auth-status p {
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}

/* Processing状態 */
.processing {
  color: var(--color-accent);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top: 3px solid var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Success状態 */
.success {
  color: #22c55e;
}

.success-icon {
  width: 40px;
  height: 40px;
  background: #22c55e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Error状態 */
.error {
  color: #ef4444;
}

.error-icon {
  width: 40px;
  height: 40px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.error-details {
  margin-top: var(--space-md);
  text-align: left;
  background: var(--color-surface);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.error-details summary {
  cursor: pointer;
  font-weight: 500;
  margin-bottom: var(--space-sm);
}

.error-details code {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: #ef4444;
  word-break: break-all;
}

@media (max-width: 768px) {
  .auth-page {
    padding: var(--space-md);
  }

  .auth-card {
    padding: var(--space-2xl);
  }

  .auth-title {
    font-size: 1.25rem;
  }
}
</style>