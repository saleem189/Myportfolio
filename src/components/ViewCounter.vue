<template>
  <div class="view-counter sketchy-border" :class="{ 'loading': isLoading, 'view-counter-dark': themeClasses.isDark.value }">
    <Users :size="18" />
    <span v-if="!isLoading">{{ viewCount }}</span>
    <span v-else>...</span>
    <span>visitors</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Users } from 'lucide-vue-next'
import { incrementViewCount, getViewCount } from '../firebase'
import { useThemeClasses } from '@/composables/useThemeClasses'

const themeClasses = useThemeClasses()

const viewCount = ref(0)
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    // Increment the view count when component is mounted
    await incrementViewCount()
    // Get and display the current count
    viewCount.value = await getViewCount()
  } catch (err) {
    console.error('Error updating view count:', err)
    error.value = err
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.view-counter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #2d3748;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 14px;
  font-family: 'Patrick Hand', cursive;
  font-weight: 500;
}

.view-counter-dark {
  background: rgba(26, 32, 44, 0.95); /* slate-800 with opacity */
  color: #e2e8f0; /* slate-200 */
}

.view-counter svg {
  color: #2563eb;
  transition: all 0.3s ease;
}

.view-counter-dark svg {
  color: #63b3ed; /* blue-400 for dark mode */
}

.view-counter.loading {
  opacity: 0.7;
}

.view-counter span {
  font-weight: 500;
}

.view-counter:hover {
  transform: translateY(-2px) rotate(1deg);
}

.view-counter-dark:hover {
  transform: translateY(-2px) rotate(1deg);
}
</style> 