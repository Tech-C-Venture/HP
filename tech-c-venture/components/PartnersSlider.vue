<template>
  <div class="partners-slider">
    <div class="slider-container" ref="sliderContainer">
      <div class="slider-track" :style="{ transform: `translateX(-${currentOffset}px)` }">
        <!-- 最初のセット -->
        <div
          v-for="partner in partners"
          :key="`first-${partner.name}`"
          class="partner-item"
        >
          <a
            :href="partner.url"
            :title="partner.name"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-link"
          >
            <div class="partner-logo-placeholder">
              {{ partner.name }}
            </div>
          </a>
        </div>
        <!-- 無限ループのための複製セット -->
        <div
          v-for="partner in partners"
          :key="`second-${partner.name}`"
          class="partner-item"
        >
          <a
            :href="partner.url"
            :title="partner.name"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-link"
          >
            <div class="partner-logo-placeholder">
              {{ partner.name }}
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// パートナー企業のサンプルデータ
const partners = ref([
  {
    name: 'サンプル企業A',
    logo: '/images/partners/sample-a.png',
    url: 'https://example.com'
  },
  {
    name: 'サンプル企業B',
    logo: '/images/partners/sample-b.png',
    url: 'https://example.com'
  },
  {
    name: 'サンプル企業C',
    logo: '/images/partners/sample-c.png',
    url: 'https://example.com'
  },
  {
    name: 'サンプル企業D',
    logo: '/images/partners/sample-d.png',
    url: 'https://example.com'
  },
  {
    name: 'サンプル企業E',
    logo: '/images/partners/sample-e.png',
    url: 'https://example.com'
  }
])

const sliderContainer = ref(null)
const currentOffset = ref(0)
const itemWidth = 200 // ロゴの幅 + マージン
const slideSpeed = 0.5 // px/frame（少し遅くして滑らかに）

let animationId = null

// 無限スクロールアニメーション
const animate = () => {
  currentOffset.value += slideSpeed

  // 最初のセットが完全に隠れたら、オフセットをリセット
  // これにより第2セットが第1セットの位置に来て、途切れなく続く
  const totalWidth = itemWidth * partners.value.length
  if (currentOffset.value >= totalWidth) {
    currentOffset.value = 0
  }

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  // アニメーション開始
  animationId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.partners-slider {
  width: 100%;
  overflow: hidden;
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-xl) 0;
}

.slider-container {
  width: 100%;
  overflow: hidden;
}

.slider-track {
  display: flex;
  width: fit-content;
  transition: none;
}

.partner-item {
  flex: 0 0 auto;
  width: 180px;
  margin: 0 var(--space-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-link {
  display: block;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.partner-link:hover {
  transform: scale(1.05);
  opacity: 0.8;
}

.partner-logo {
  max-width: 100%;
  max-height: 60px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter 0.2s ease;
}

.partner-link:hover .partner-logo {
  filter: grayscale(0%);
}

.partner-logo-placeholder {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-border) 100%);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-align: center;
  padding: var(--space-sm);
  transition: all 0.2s ease;
}

.partner-link:hover .partner-logo-placeholder {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%);
  color: white;
  border-color: var(--color-accent);
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .partner-item {
    width: 150px;
    margin: 0 var(--space-sm);
  }

  .partner-logo {
    max-height: 50px;
  }
}

/* 無限ループのために複製要素を追加 */
.slider-track::after {
  content: '';
  display: flex;
}
</style>