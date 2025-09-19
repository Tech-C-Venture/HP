<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-1">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'ja'
  }
})
</script>