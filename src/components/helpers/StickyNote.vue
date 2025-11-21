<template>
  <div :class="[
    bgColor,
    textColor,
    'p-6',
    'sketchy-border',
    'transform',
    'hover:-translate-y-1',
    'transition-all',
    'duration-300',
    'relative',
    nightMode ? 'dark-shadow' : ''
  ]">
    <div :class="['absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6', nightMode ? 'tape-dark' : 'tape']"></div>
    <h3 :class="[
      'text-xl font-bold mb-3 border-b-2 pb-1',
      nightMode ? 'border-gray-700' : 'border-gray-800/10'
    ]">{{ title }}</h3>
    <div class="text-lg leading-relaxed">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  colorLight: {
    type: String,
    default: 'bg-yellow-100'
  },
  colorDark: {
    type: String,
    default: 'bg-yellow-900/50'
  },
  nightMode: {
    type: Boolean,
    default: false
  }
});

const bgColor = computed(() => props.nightMode ? props.colorDark : props.colorLight);
const textColor = computed(() => props.nightMode ? 'text-gray-200' : 'text-gray-800');
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>

