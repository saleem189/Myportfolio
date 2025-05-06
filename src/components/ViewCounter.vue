<template>
  <div class="view-counter" :class="{ 'loading': isLoading, 'view-counter-dark': nightMode }">
    <i class="fa fa-eye"></i>
    <span v-if="!isLoading">{{ viewCount }}</span>
    <span v-else>...</span>
    <span>visitors</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { incrementViewCount, getViewCount } from '../firebase'

const props = defineProps({
  nightMode: {
    type: Boolean,
    default: false
  }
})

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
  gap: 5px;
  font-size: 0.9rem;
  color: #2c3e50;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.view-counter-dark {
  background: rgba(38, 44, 48, 0.9);
  color: #d3d2d2;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.view-counter i {
  color: #669db3ff;
  transition: all 0.3s ease;
}

.view-counter-dark i {
  color: #8ab3c4;
}

.view-counter.loading {
  opacity: 0.7;
}

.view-counter span {
  font-weight: 500;
}

.view-counter:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.view-counter-dark:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}
</style> 