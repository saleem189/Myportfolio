<template>
  <section
    :id="id"
    :class="[
      'py-8',
      'sm:py-12',
      'relative',
      'z-10',
      'pl-4',
      'sm:pl-6',
      'md:pl-12',
      'lg:pl-24',
      'pr-4',
      'sm:pr-6',
      className,
    ]"
  >
    <div
      v-if="title"
      class="mb-8 inline-block relative"
    >
      <h2
        :class="[
          'text-4xl font-bold relative z-10 transition-colors',
          themeClasses.themeClass('text-blue-800', 'text-blue-300'),
        ]"
      >
        {{ title }}
      </h2>
      <div
        :class="[
          'absolute bottom-1 left-0 w-full h-3 -z-0 opacity-60 transform -rotate-1 transition-colors',
          themeClasses.themeClass('bg-yellow-200', 'bg-blue-900'),
        ]"
      />
    </div>
    <slot />
  </section>
</template>

<script setup>
import { useThemeClasses } from '@/composables/useThemeClasses';

defineProps({
  id: String,
  title: String,
  className: {
    type: String,
    default: '',
  },
});

const themeClasses = useThemeClasses();
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>
