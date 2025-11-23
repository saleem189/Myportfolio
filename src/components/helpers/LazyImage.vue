<template>
  <component
    :is="tag"
    :src="currentSrc"
    :alt="alt"
    :class="[
      'transition-opacity duration-300',
      imageClass,
      { 'opacity-0': !loaded, 'opacity-100': loaded },
    ]"
    @load="handleLoad"
    @error="handleError"
  />
  <div
    v-if="loading && !error"
    :class="[
      'flex items-center justify-center',
      placeholderClass || 'bg-gray-200 dark:bg-gray-700',
    ]"
    :style="{ width: width, height: height }"
  >
    <div class="animate-pulse">
      <div class="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  </div>
  <div
    v-if="error"
    :class="[
      'flex flex-col items-center justify-center p-4',
      'bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded',
      placeholderClass,
    ]"
    :style="{ width: width, height: height }"
  >
    <ImageOff
      :size="32"
      class="text-red-500 mb-2"
    />
    <p class="text-sm text-red-600 dark:text-red-400">
      Failed to load image
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ImageOff } from 'lucide-vue-next';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: 'img',
    validator: (value) => ['img', 'picture'].includes(value),
  },
  placeholderSrc: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: 'auto',
  },
  height: {
    type: String,
    default: 'auto',
  },
  imageClass: {
    type: String,
    default: '',
  },
  placeholderClass: {
    type: String,
    default: '',
  },
  // Lazy loading threshold (in pixels)
  threshold: {
    type: Number,
    default: 100,
  },
});

const loading = ref(true);
const loaded = ref(false);
const error = ref(false);
const currentSrc = ref(props.placeholderSrc || '');
const observer = ref(null);
const imgElement = ref(null);

const handleLoad = () => {
  loading.value = false;
  loaded.value = true;
  error.value = false;
};

const handleError = () => {
  loading.value = false;
  loaded.value = false;
  error.value = true;
};

const loadImage = () => {
  currentSrc.value = props.src;
};

onMounted(() => {
  // Use Intersection Observer for lazy loading
  if ('IntersectionObserver' in window) {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            observer.value?.disconnect();
          }
        });
      },
      {
        rootMargin: `${props.threshold}px`,
      }
    );

    // Observe the component's root element
    const element = imgElement.value?.$el || imgElement.value;
    if (element) {
      observer.value.observe(element);
    }
  } else {
    // Fallback for browsers without Intersection Observer
    loadImage();
  }
});

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>

<style scoped>
/* Styles handled by Tailwind classes */
</style>
