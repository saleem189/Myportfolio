<template>
  <div 
    :class="[
      'sketchy-border shadow-md relative group overflow-hidden cursor-pointer transition-all duration-300 h-full flex flex-col hover:rotate-1',
      props.nightMode ? 'bg-slate-800' : 'bg-white'
    ]"
    :style="{ backgroundImage: props.nightMode ? 'linear-gradient(#374151 1px, transparent 1px)' : 'linear-gradient(#f0f0f0 1px, transparent 1px)', backgroundSize: '100% 1.5rem' }"
    @click="handleCardClick"
  >
    <!-- Project Image -->
    <div v-if="firstImage" :class="[
      'w-full h-48 flex-shrink-0 overflow-hidden transition-colors',
      props.nightMode ? 'bg-slate-700' : 'bg-gray-100'
    ]">
      <img 
        :src="firstImage" 
        :alt="displayTitle"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        @error="handleImageError"
        loading="lazy"
      />
    </div>
    
    <div class="p-4 sm:p-6 flex-1 flex flex-col">
      <div class="flex justify-between items-start mb-2 gap-2">
        <h3 :class="[
          'text-lg sm:text-xl font-bold group-hover:underline decoration-wavy transition-colors flex-1',
          props.nightMode ? 'text-blue-300 decoration-blue-400' : 'text-blue-900 decoration-blue-400'
        ]">
          {{ displayTitle }}
        </h3>
        <span :class="[
          'text-xs font-mono border px-2 py-1 rounded uppercase whitespace-nowrap flex-shrink-0 transition-colors',
          props.nightMode ? 'border-slate-500 bg-slate-700 text-slate-300' : 'border-gray-400 bg-gray-50 text-gray-500'
        ]">
          {{ displayType }}
        </span>
      </div>
      
      <p :class="[
        'mb-4 leading-6 text-sm transition-colors flex-1',
        props.nightMode ? 'text-gray-300' : 'text-gray-700'
      ]" style="line-height: 1.5rem; display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
        {{ truncatedDescription }}
      </p>

      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="(t, idx) in displayTech.slice(0, 5)" 
          :key="idx" 
          :class="['text-xs font-bold transition-colors', props.nightMode ? 'text-gray-400' : 'text-gray-500']"
        >
          #{{ t }}
        </span>
        <span v-if="displayTech.length > 5" :class="['text-xs font-bold transition-colors', props.nightMode ? 'text-gray-400' : 'text-gray-400']">
          +{{ displayTech.length - 5 }} more
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2 mt-auto">
        <button
          :class="[
            'flex-1 sketchy-border text-white px-4 py-2 text-sm font-bold transition-colors flex items-center justify-center gap-1',
            props.nightMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
          ]"
          @click.stop="handleReadMore"
        >
          <BookOpen :size="16" /> Read More
        </button>
        <a 
          v-if="visit"
          :href="visit" 
          target="_blank" 
          rel="noopener noreferrer"
          :class="[
            'flex-1 sketchy-border px-4 py-2 text-sm font-bold transition-colors flex items-center justify-center gap-1',
            props.nightMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-black hover:bg-gray-50'
          ]"
          @click.stop
        >
          <ExternalLink :size="16" /> Visit
        </a>
      </div>
    </div>
    
    <!-- Pin Effect -->
    <div class="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-red-500 shadow-sm border border-red-700 z-20"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { BookOpen, ExternalLink } from 'lucide-vue-next';

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
  nightMode: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['show-modal']);

const displayTitle = computed(() => props.title || props.name);
const displayType = computed(() => props.type || props.category);
const displayTech = computed(() => props.technologies || props.tech || []);
const firstImage = computed(() => {
  if (props.pictures && props.pictures.length > 0) {
    return typeof props.pictures[0].img === 'string' ? props.pictures[0].img : props.pictures[0].img;
  }
  return null;
});

const truncatedDescription = computed(() => {
  if (!props.description) return '';
  // Show first 150 characters
  return props.description.length > 150 
    ? props.description.substring(0, 150) + '...' 
    : props.description;
});

const handleImageError = (e) => {
  e.target.style.display = 'none';
};

const handleCardClick = () => {
  emit('show-modal', props);
};

const handleReadMore = () => {
  emit('show-modal', props);
};
</script>

<style scoped>
/* Styles are handled inline */
</style>
