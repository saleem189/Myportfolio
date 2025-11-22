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
    themeClasses.isDark.value ? 'dark-shadow' : ''
  ]">
    <div :class="['absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6', themeClasses.isDark.value ? 'tape-dark' : 'tape']"></div>
    <h3 :class="[
      'text-xl font-bold mb-3 border-b-2 pb-1',
      themeClasses.classes.borderSecondary()
    ]">{{ title }}</h3>
    <div class="text-lg leading-relaxed">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useThemeClasses } from '@/composables/useThemeClasses';

const props = defineProps({
  title: String,
  colorLight: {
    type: String,
    default: 'bg-yellow-100'
  },
  colorDark: {
    type: String,
    default: 'bg-yellow-900/50'
  }
});

const themeClasses = useThemeClasses();
const bgColor = computed(() => themeClasses.isDark.value ? props.colorDark : props.colorLight);
const textColor = computed(() => themeClasses.classes.text());
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>

