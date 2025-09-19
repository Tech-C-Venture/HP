<template>
  <header class="navbar">
    <div class="container">
      <nav class="navbar-container">
        <NuxtLink to="/" class="navbar-brand">
          <img src="/images/logo/logo.png" alt="Tech.C Venture" class="logo" />
          <span class="brand-text">Tech.C Venture</span>
        </NuxtLink>

        <!-- ハンバーガーメニューボタン -->
        <button
          class="hamburger-btn"
          :class="{ 'is-open': isMenuOpen }"
          @click="toggleMenu"
          aria-label="メニューを開く"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <!-- ナビゲーションメニュー -->
        <ul class="navbar-nav" :class="{ 'is-open': isMenuOpen }">
          <li>
            <NuxtLink to="/" @click="closeMenu">ホーム</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" @click="closeMenu">団体について</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/blog" @click="closeMenu">記事</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/partners" @click="closeMenu">協力企業</NuxtLink>
          </li>
        </ul>

        <!-- オーバーレイ -->
        <div
          class="navbar-overlay"
          :class="{ 'is-open': isMenuOpen }"
          @click="closeMenu"
        ></div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// ESCキーでメニューを閉じる
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>