<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <img src="/images/logo/logo.png" alt="Tech.C Venture" class="footer-logo" />
            <h3 class="footer-title">Tech.C Venture</h3>
          </div>
          <p class="footer-description">
            自走できるエンジニアを育成する団体
          </p>
        </div>

        <div class="footer-section">
          <h4 class="footer-subtitle">リンク</h4>
          <ul class="footer-links">
            <li>
              <NuxtLink to="/about">団体について</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog">記事</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/partners">協力企業</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-subtitle">お問い合わせ</h4>
          <p class="footer-contact">
            info@techc-venture.com
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Tech.C Venture. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: var(--space-3xl) 0 var(--space-xl);
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: var(--space-md);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.footer-logo {
  height: 40px;
  width: auto;
  object-fit: contain;
  transform: translateY(-11px);
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0;
}

.footer-subtitle {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
}

.footer-description {
  color: var(--color-text-muted);
  margin-bottom: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: var(--space-sm);
}

.footer-links a {
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--color-accent);
}

.footer-contact {
  color: var(--color-text-muted);
  margin-bottom: 0;
}

.footer-bottom {
  text-align: center;
  padding-top: var(--space-xl);
  border-top: 1px solid var(--color-border);
}

.footer-bottom p {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
}
</style>