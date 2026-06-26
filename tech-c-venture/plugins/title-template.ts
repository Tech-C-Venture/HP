export default defineNuxtPlugin(() => {
  useHead({
    titleTemplate: (title) => title ?? 'Tech.C Venture'
  })
})
