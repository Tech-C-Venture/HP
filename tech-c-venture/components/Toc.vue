<template>
  <nav v-if="links && links.length > 0" class="toc">
    <ul class="toc-list">
      <li
        v-for="link in links"
        :key="link.id"
        :class="`toc-item toc-level-${link.depth}`"
      >
        <a
          :href="`#${link.id}`"
          :class="['toc-link', { active: activeId === link.id }]"
          @click="scrollToHeading(link.id)"
        >
          {{ link.text }}
        </a>
        <Toc
          v-if="link.children && link.children.length > 0"
          :links="link.children"
          :active-id="activeId"
        />
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  links: {
    type: Array,
    default: () => []
  },
  activeId: {
    type: String,
    default: ''
  }
})

const activeId = ref('')

const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// スクロール位置に基づいてアクティブな見出しを更新
const updateActiveId = () => {
  const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
  const scrollTop = window.scrollY + 100

  let current = ''

  headings.forEach((heading) => {
    const top = heading.offsetTop
    if (scrollTop >= top) {
      current = heading.id
    }
  })

  activeId.value = current
}

onMounted(() => {
  updateActiveId()
  window.addEventListener('scroll', updateActiveId)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveId)
})
</script>

<style scoped>
.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: var(--space-xs);
}

.toc-level-2 {
  padding-left: 0;
}

.toc-level-3 {
  padding-left: var(--space-md);
}

.toc-level-4 {
  padding-left: var(--space-lg);
}

.toc-level-5,
.toc-level-6 {
  padding-left: var(--space-xl);
}

.toc-link {
  display: block;
  padding: var(--space-xs) var(--space-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.4;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.toc-link:hover {
  color: var(--color-accent);
  background-color: var(--color-surface);
}

.toc-link.active {
  color: var(--color-accent);
  background-color: var(--color-surface);
  font-weight: 500;
}

/* ネストした目次のスタイル */
.toc-item .toc {
  margin-top: var(--space-xs);
}

.toc-item .toc .toc-list {
  border-left: 1px solid var(--color-border);
  margin-left: var(--space-sm);
  padding-left: var(--space-sm);
}
</style>