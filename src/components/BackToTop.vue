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
      nightMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
    ]"
    aria-label="Scroll to top"
  >
    <ArrowUp :size="20" />
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const props = defineProps({
  nightMode: {
    type: Boolean,
    default: false
  }
})

const isVisible = ref(false)

const toggleVisibility = () => {
  if (window.pageYOffset > 300) {
    isVisible.value = true
  } else {
    isVisible.value = false
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
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
