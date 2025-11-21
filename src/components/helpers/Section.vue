<template>
  <section :id="id" :class="['py-12', 'relative', 'z-10', 'pl-12', 'md:pl-24', 'pr-4', className]">
    <div v-if="title" class="mb-8 inline-block relative">
      <h2 :class="[
        'text-4xl font-bold relative z-10 transition-colors',
        nightMode ? 'text-blue-300' : 'text-blue-800'
      ]">{{ title }}</h2>
      <div :class="[
        'absolute bottom-1 left-0 w-full h-3 -z-0 opacity-60 transform -rotate-1 transition-colors',
        nightMode ? 'bg-blue-900' : 'bg-yellow-200'
      ]"></div>
    </div>
    <slot></slot>
  </section>
</template>

<script setup>
defineProps({
  id: String,
  title: String,
  className: {
    type: String,
    default: ''
  },
  nightMode: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>

