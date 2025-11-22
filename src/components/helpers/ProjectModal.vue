<template>
  <div class="modal-mask" @click.self="closeModal">
    <div class="modal-wrapper">
      <div :class="[
        'modal-container sketchy-border transition-colors',
        props.nightMode ? 'bg-slate-800' : 'bg-white'
      ]">
        <!-- Header -->
        <div :class="[
          'px-6 pt-6 pb-4 border-b-2 transition-colors',
          props.nightMode ? 'border-slate-600' : 'border-gray-800'
        ]">
          <div class="flex justify-between items-start mb-2">
            <h2 :class="[
              'text-3xl font-bold transition-colors',
              props.nightMode ? 'text-blue-300' : 'text-blue-800'
            ]">
              {{ portfolio.title || portfolio.name }}
            </h2>
            <button
              @click="closeModal"
              :class="[
                'text-2xl font-bold transition-colors',
                props.nightMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
              ]"
              aria-label="Close modal"
            >
              <X :size="24" />
            </button>
          </div>
          <div :class="[
            'flex items-center gap-3 text-sm transition-colors',
            props.nightMode ? 'text-gray-300' : 'text-gray-600'
          ]">
            <span :class="[
              'px-3 py-1 border rounded-full',
              props.nightMode ? 'border-slate-500' : 'border-gray-600'
            ]">
              {{ portfolio.category || portfolio.type }}
            </span>
            <span v-if="portfolio.date">{{ portfolio.date }}</span>
          </div>
        </div>

        <!-- Body -->
        <div :class="[
          'modal-body px-6 py-6 overflow-y-auto flex-shrink',
          props.nightMode ? 'modal-body-dark' : ''
        ]" style="min-height: 0;">
          <!-- Description -->
          <div class="mb-6">
            <h3 :class="[
              'text-xl font-bold mb-3 transition-colors',
              props.nightMode ? 'text-gray-100' : 'text-gray-800'
            ]">About This Project</h3>
            <p :class="[
              'leading-relaxed text-lg transition-colors',
              props.nightMode ? 'text-gray-300' : 'text-gray-700'
            ]">
              {{ portfolio.description }}
            </p>
          </div>

          <!-- Technologies -->
          <div class="mb-6">
            <h3 :class="[
              'text-xl font-bold mb-3 transition-colors',
              props.nightMode ? 'text-gray-100' : 'text-gray-800'
            ]">Technologies Used</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tech, idx) in portfolio.technologies"
                :key="idx"
                :class="[
                  'px-3 py-1 border rounded text-sm font-medium transition-colors',
                  props.nightMode ? 'bg-slate-700 border-slate-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-700'
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
              props.nightMode ? 'text-gray-100' : 'text-gray-800'
            ]">Project Screenshots</h3>
            <Gallery :images="portfolio.pictures" :nightMode="props.nightMode" />
          </div>
        </div>

        <!-- Footer -->
        <div :class="[
          'px-6 py-4 border-t-2 flex gap-3 justify-end transition-colors relative z-10 flex-shrink-0',
          props.nightMode ? 'border-slate-600' : 'border-gray-800'
        ]">
          <a
            v-if="portfolio.github"
            :href="portfolio.github"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'sketchy-border px-6 py-2 text-sm font-bold transition-colors flex items-center gap-2 relative z-20',
              props.nightMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-black hover:bg-gray-50'
            ]"
            @click.stop
          >
            <Github :size="16" /> View Code
          </a>
          <a
            v-if="portfolio.visit"
            :href="portfolio.visit"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'sketchy-border text-white px-6 py-2 text-sm font-bold transition-colors flex items-center gap-2 relative z-20',
              props.nightMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
            ]"
            @click.stop
          >
            <ExternalLink :size="16" /> Visit Site
          </a>
          <button
            @click.stop="closeModal"
            :class="[
              'sketchy-border px-6 py-2 text-sm font-bold transition-colors relative z-20',
              props.nightMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            ]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X, Github, ExternalLink } from 'lucide-vue-next';
import Gallery from './Gallery.vue';

const props = defineProps({
  portfolio: {
    type: Object,
    required: true
  },
  nightMode: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
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

