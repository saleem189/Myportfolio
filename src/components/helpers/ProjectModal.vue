<template>
  <div 
    class="modal-mask" 
    @click.self="closeModal"
    @keydown.esc="closeModal"
    tabindex="-1"
    ref="modalRef"
  >
    <div class="modal-wrapper">
      <div :class="[
        'modal-container sketchy-border transition-colors',
        themeClasses.classes.bg()
      ]">
        <!-- Header -->
        <div :class="[
          'px-6 pt-6 pb-4 border-b-2 transition-colors',
          themeClasses.classes.border()
        ]">
          <div class="flex justify-between items-start mb-2">
            <h2 :class="[
              'text-3xl font-bold transition-colors',
              themeClasses.themeClass('text-blue-800', 'text-blue-300')
            ]">
              {{ portfolio.title || portfolio.name }}
            </h2>
            <button
              ref="closeButtonRef"
              @click="closeModal"
              :class="[
                'text-2xl font-bold transition-colors hover:opacity-70',
                themeClasses.classes.textMuted()
              ]"
              aria-label="Close modal"
            >
              <X :size="24" />
            </button>
          </div>
          <div :class="[
            'flex items-center gap-3 text-sm transition-colors',
            themeClasses.classes.textMuted()
          ]">
            <span :class="[
              'px-3 py-1 border rounded-full',
              themeClasses.classes.borderSecondary()
            ]">
              {{ portfolio.category || portfolio.type }}
            </span>
            <span v-if="portfolio.date">{{ portfolio.date }}</span>
          </div>
        </div>

        <!-- Body -->
        <div :class="[
          'modal-body px-6 py-6 overflow-y-auto flex-shrink',
          themeClasses.isDark.value ? 'modal-body-dark' : ''
        ]" style="min-height: 0;">
          <!-- Description -->
          <div class="mb-6">
            <h3 :class="[
              'text-xl font-bold mb-3 transition-colors',
              themeClasses.classes.text()
            ]">About This Project</h3>
            <p :class="[
              'leading-relaxed text-lg transition-colors',
              themeClasses.classes.textSecondary()
            ]">
              {{ portfolio.description }}
            </p>
          </div>

          <!-- Technologies -->
          <div class="mb-6">
            <h3 :class="[
              'text-xl font-bold mb-3 transition-colors',
              themeClasses.classes.text()
            ]">Technologies Used</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tech, idx) in portfolio.technologies"
                :key="idx"
                :class="[
                  'px-3 py-1 border rounded text-sm font-medium transition-colors',
                  themeClasses.themeClass('bg-gray-100 border-gray-300 text-gray-700', 'bg-slate-700 border-slate-600 text-gray-300')
                ]"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Gallery -->
          <div v-if="portfolio.pictures && portfolio.pictures.length > 0" class="mb-6">
            <h3 :class="[
              'text-xl font-bold mb-3 transition-colors',
              themeClasses.classes.text()
            ]">Project Screenshots</h3>
            <Gallery :images="portfolio.pictures" />
          </div>
        </div>

        <!-- Footer -->
        <div :class="[
          'px-6 py-4 border-t-2 flex gap-3 justify-end transition-colors relative z-10 flex-shrink-0',
          themeClasses.classes.border()
        ]">
          <Button
            v-if="portfolio.github"
            tag="a"
            :href="portfolio.github"
            target="_blank"
            rel="noopener noreferrer"
            variant="default"
            size="sm"
            class="relative z-20"
            @click.stop
          >
            <template #icon-left>
              <Github :size="16" />
            </template>
            View Code
          </Button>
          <Button
            v-if="portfolio.visit"
            tag="a"
            :href="portfolio.visit"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
            class="relative z-20"
            @click.stop
          >
            <template #icon-left>
              <ExternalLink :size="16" />
            </template>
            Visit Site
          </Button>
          <Button
            variant="secondary"
            size="sm"
            class="relative z-20"
            @click.stop="closeModal"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { X, Github, ExternalLink } from 'lucide-vue-next';
import Gallery from './Gallery.vue';
import Button from './Button.vue';
import { useThemeClasses } from '@/composables/useThemeClasses';
import { useModal } from '@/composables/useModal';

const props = defineProps({
  portfolio: {
    type: Object,
    required: true
  }
});

const themeClasses = useThemeClasses();
const emit = defineEmits(['close']);

const modalRef = ref(null);
const closeButtonRef = ref(null);
const isOpen = computed(() => true); // This modal is always open when rendered

const closeModal = () => {
  emit('close');
};

// Use modal composable for common functionality
useModal({
  isOpen,
  onClose: closeModal,
  closeButtonRef
});
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.modal-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  z-index: 99999;
  pointer-events: none;
  overflow-y: auto;
}

.modal-container {
  width: 90%;
  max-width: 900px;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.8);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  z-index: 99999;
  pointer-events: auto;
  overflow: hidden;
  margin: auto;
}

/* Dark mode box shadow */
.bg-slate-800 {
  box-shadow: 4px 4px 0px 0px rgba(255,255,255,0.1);
}

/* Dark mode styles are handled by conditional classes */

.modal-body {
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  position: relative;
}

/* Custom scrollbar */
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  transition: background-color 0.3s ease;
}

.modal-body-dark::-webkit-scrollbar-track {
  background: #1a202c; /* slate-800 */
  transition: background-color 0.3s ease;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.modal-body-dark::-webkit-scrollbar-thumb {
  background: #4a5568; /* slate-600 */
  transition: background-color 0.3s ease;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.modal-body-dark::-webkit-scrollbar-thumb:hover {
  background: #718096; /* slate-500 */
}

@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    max-height: calc(100vh - 1rem);
  }
  
  .modal-wrapper {
    padding: 0.5rem;
  }
}
</style>

