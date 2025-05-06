<template>
  <button 
    class="back-to-top" 
    :class="{ 'show': showButton, 'dark': nightMode }"
    @click="scrollToTop"
    aria-label="Back to top"
  >
    <i class="fa fa-arrow-up"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  nightMode: {
    type: Boolean,
    default: false
  }
})

const showButton = ref(false)

const checkScroll = () => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #669db3ff;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background: #5a8a9c;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.back-to-top.dark {
  background: #4a7a8c;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}

.back-to-top.dark:hover {
  background: #3a6a7c;
  box-shadow: 0 4px 8px rgba(0,0,0,0.4);
}

.back-to-top i {
  font-size: 16px;
}
</style> 