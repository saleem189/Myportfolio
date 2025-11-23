<template>
  <div
    :class="[
      'sketchy-border shadow-md relative group overflow-hidden cursor-pointer transition-all duration-300 h-full flex flex-col hover:rotate-1',
      themeClasses.classes.bg(),
    ]"
    :style="{
      backgroundImage: themeClasses.isDark.value
        ? 'linear-gradient(#374151 1px, transparent 1px)'
        : 'linear-gradient(#f0f0f0 1px, transparent 1px)',
      backgroundSize: '100% 1.5rem',
    }"
    @click="handleCardClick"
  >
    <!-- Project Image -->
    <div
      v-if="firstImage"
      :class="[
        'w-full h-48 flex-shrink-0 overflow-hidden transition-colors',
        themeClasses.classes.bgSecondary(),
      ]"
    >
      <img
        :src="firstImage"
        :alt="displayTitle"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
        @error="handleImageError"
      >
    </div>

    <div class="p-4 sm:p-6 flex-1 flex flex-col">
      <div class="flex justify-between items-start mb-2 gap-2">
        <h3
          :class="[
            'text-lg sm:text-xl font-bold group-hover:underline decoration-wavy transition-colors flex-1',
            themeClasses.themeClass(
              'text-blue-900 decoration-blue-400',
              'text-blue-300 decoration-blue-400'
            ),
          ]"
        >
          {{ displayTitle }}
        </h3>
        <span
          :class="[
            'text-xs font-mono border px-2 py-1 rounded uppercase whitespace-nowrap flex-shrink-0 transition-colors',
            themeClasses.themeClass(
              'border-gray-400 bg-gray-50 text-gray-500',
              'border-slate-500 bg-slate-700 text-slate-300'
            ),
          ]"
        >
          {{ displayType }}
        </span>
      </div>

      <p
        :class="[
          'mb-4 leading-6 text-sm transition-colors flex-1',
          themeClasses.classes.textSecondary(),
        ]"
        style="
          line-height: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        "
      >
        {{ truncatedDescription }}
      </p>

      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="(t, idx) in displayTech.slice(0, 5)"
          :key="idx"
          :class="['text-xs font-bold transition-colors', themeClasses.classes.textMuted()]"
        >
          #{{ t }}
        </span>
        <span
          v-if="displayTech.length > 5"
          :class="['text-xs font-bold transition-colors', themeClasses.classes.textMuted()]"
        >
          +{{ displayTech.length - 5 }} more
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2 mt-auto">
        <Button
          variant="primary"
          size="sm"
          class="flex-1"
          @click.stop="handleReadMore"
        >
          <template #icon-left>
            <BookOpen :size="16" />
          </template>
          Read More
        </Button>
        <Button
          v-if="visit"
          tag="a"
          :href="visit"
          target="_blank"
          rel="noopener noreferrer"
          variant="default"
          size="sm"
          class="flex-1"
          @click.stop
        >
          <template #icon-left>
            <ExternalLink :size="16" />
          </template>
          Visit
        </Button>
      </div>
    </div>

    <!-- Pin Effect -->
    <div
      class="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-red-500 shadow-sm border border-red-700 z-20"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { BookOpen, ExternalLink } from 'lucide-vue-next';
import Button from './Button.vue';
import { useThemeClasses } from '@/composables/useThemeClasses';

const props = defineProps({
  name: String,
  title: String,
  type: String,
  category: String,
  tech: Array,
  technologies: Array,
  description: String,
  visit: String,
  github: String,
  pictures: Array,
});

const themeClasses = useThemeClasses();

const emit = defineEmits(['showModal']);

const displayTitle = computed(() => props.title || props.name);
const displayType = computed(() => props.type || props.category);
const displayTech = computed(() => props.technologies || props.tech || []);
const firstImage = computed(() => {
  if (props.pictures && props.pictures.length > 0) {
    return typeof props.pictures[0].img === 'string'
      ? props.pictures[0].img
      : props.pictures[0].img;
  }
  return null;
});

const truncatedDescription = computed(() => {
  if (!props.description) {
    return '';
  }
  // Show first 150 characters
  return props.description.length > 150
    ? props.description.substring(0, 150) + '...'
    : props.description;
});

const handleImageError = (e) => {
  e.target.style.display = 'none';
};

const handleCardClick = () => {
  emit('showModal', props);
};

const handleReadMore = () => {
  emit('showModal', props);
};
</script>

<style scoped>
/* Styles are handled inline */
</style>
