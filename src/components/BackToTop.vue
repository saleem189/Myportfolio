<template>
  <button
    @click="scrollToTop"
    :class="[
      'scroll-to-top',
      'sketchy-border',
      'text-white',
      'p-3',
      'transition-all',
      { 'visible': isVisible },
      themeClasses.classes.buttonPrimary()
    ]"
    aria-label="Scroll to top"
  >
    <ArrowUp :size="20" />
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'
import { useThemeClasses } from '@/composables/useThemeClasses'
import { useScrollTo } from '@/composables/useScrollTo'

const themeClasses = useThemeClasses()
const { scrollToTop } = useScrollTo()

const isVisible = ref(false)

const toggleVisibility = () => {
  if (window.pageYOffset > 300) {
    isVisible.value = true
  } else {
    isVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility)
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleVisibility)
})
</script>

<style scoped>
/* Styles are handled by Tailwind classes and global scroll-to-top styles */
</style>
