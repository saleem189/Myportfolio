<template>
  <div class="skeleton" :class="{ 'dark': nightMode }">
    <div class="skeleton-header"></div>
    <div class="skeleton-content">
      <div class="skeleton-line" v-for="n in lines" :key="n"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nightMode: {
    type: Boolean,
    default: false
  },
  lines: {
    type: Number,
    default: 3
  }
})
</script>

<style scoped>
.skeleton {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  animation: pulse 1.5s infinite;
}

.skeleton.dark {
  background: #262c30;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.skeleton-header {
  height: 24px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 16px;
  width: 60%;
}

.skeleton.dark .skeleton-header {
  background: #3a4247;
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-line {
  height: 16px;
  background: #f0f0f0;
  border-radius: 4px;
  width: 100%;
}

.skeleton.dark .skeleton-line {
  background: #3a4247;
}

.skeleton-line:nth-child(2) {
  width: 90%;
}

.skeleton-line:nth-child(3) {
  width: 80%;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style> 