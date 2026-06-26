<template>
  <div class="partners-slider">
    <div class="slider-container">
      <div class="slider-track">
        <div
          v-for="partner in partners"
          :key="`a-${partner.id}`"
          class="partner-item"
        >
          <component
            :is="partner.url ? 'a' : 'div'"
            v-bind="partner.url ? { href: partner.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
            :title="partner.company"
            class="partner-link"
          >
            <img
              v-if="partner.companyImage"
              :src="partner.companyImage.url"
              :alt="partner.company"
              class="partner-logo"
            />
            <div v-else class="partner-logo-placeholder">
              {{ partner.company }}
            </div>
          </component>
        </div>
        <!-- 無限ループ用複製セット -->
        <div
          v-for="partner in partners"
          :key="`b-${partner.id}`"
          aria-hidden="true"
          class="partner-item"
        >
          <component
            :is="partner.url ? 'a' : 'div'"
            v-bind="partner.url ? { href: partner.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
            :title="partner.company"
            class="partner-link"
          >
            <img
              v-if="partner.companyImage"
              :src="partner.companyImage.url"
              :alt="partner.company"
              class="partner-logo"
            />
            <div v-else class="partner-logo-placeholder">
              {{ partner.company }}
            </div>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  partners: {
    type: Array,
    default: () => []
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
  width: max-content;
  animation: scroll 20s linear infinite;
}

.slider-track:hover {
  animation-play-state: paused;
}

@keyframes scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
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
