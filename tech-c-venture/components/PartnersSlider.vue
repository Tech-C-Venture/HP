<template>
  <div class="partners-slider">
    <div class="slider-container">
      <div class="slider-track" ref="trackRef">
        <div
          v-for="item in displayItems"
          :key="item._key"
          :aria-hidden="item._copy > 0"
          class="partner-item"
        >
          <component
            :is="item.url ? 'a' : 'div'"
            v-bind="item.url ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
            :title="item.company"
            class="partner-link"
          >
            <img
              v-if="item.companyImage"
              :src="item.companyImage.url"
              :alt="item.company"
              class="partner-logo"
            />
            <div v-else class="partner-logo-placeholder">
              {{ item.company }}
            </div>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const COPIES = 4

const props = defineProps({
  partners: {
    type: Array,
    default: () => []
  }
})

// 4コピー分フラットに展開。firstSetWidth = scrollWidth / COPIES で1セット幅を計算
const displayItems = computed(() => {
  if (!props.partners.length) return []
  return Array.from({ length: COPIES }, (_, copy) =>
    props.partners.map((p, i) => ({ ...p, _key: `${copy}-${i}`, _copy: copy }))
  ).flat()
})

const trackRef = ref(null)
let animationId = null
let offset = 0
let firstSetWidth = 0

onMounted(() => {
  nextTick(() => {
    if (!trackRef.value || props.partners.length === 0) return
    firstSetWidth = trackRef.value.scrollWidth / COPIES

    const step = () => {
      offset += 0.5
      if (offset >= firstSetWidth) {
        offset -= firstSetWidth
      }
      if (trackRef.value) {
        trackRef.value.style.transform = `translateX(-${offset}px)`
      }
      animationId = requestAnimationFrame(step)
    }

    animationId = requestAnimationFrame(step)
  })
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
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
  width: max-content;
  will-change: transform;
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
  display: flex;
  width: 100%;
  height: 80px;
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

@media (max-width: 768px) {
  .partner-item {
    width: 150px;
    margin: 0 var(--space-sm);
  }

  .partner-logo {
    max-height: 50px;
  }
}
</style>
