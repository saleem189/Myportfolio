<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-overlay"
        @click.self="close"
        @keydown.esc="close"
        tabindex="-1"
        ref="modalRef"
      >
        <div
          :class="[
            'modal-content sketchy-border transition-colors',
            nightMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-800'
          ]"
        >
          <div :class="[
            'flex justify-between items-center mb-4 pb-4 border-b-2 transition-colors',
            nightMode ? 'border-slate-600' : 'border-gray-800'
          ]">
            <h3 :class="[
              'text-2xl font-bold transition-colors',
              nightMode ? 'text-gray-100' : 'text-gray-800'
            ]">
              Resume Options
            </h3>
            <button
              @click="close"
              :class="[
                'text-2xl font-bold transition-colors hover:opacity-70',
                nightMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
              ]"
              aria-label="Close modal"
              ref="closeButtonRef"
            >
              <X :size="24" />
            </button>
          </div>

          <p :class="[
            'mb-6 text-lg transition-colors',
            nightMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            Choose how you'd like to access my resume:
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              @click.stop="handleDownload"
              :class="[
                'flex-1 sketchy-border px-6 py-4 text-center text-lg font-bold transition-colors flex items-center justify-center gap-2',
                nightMode
                  ? 'bg-blue-700 hover:bg-blue-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              ]"
            >
              <Download :size="20" />
              Download PDF
            </button>
            <a
              :href="viewUrl"
              target="_blank"
              rel="noopener noreferrer"
              @click.stop="close"
              :class="[
                'flex-1 sketchy-border px-6 py-4 text-center text-lg font-bold transition-colors flex items-center justify-center gap-2',
                nightMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              ]"
            >
              <ExternalLink :size="20" />
              View Online
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { Download, ExternalLink, X } from 'lucide-vue-next';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  nightMode: {
    type: Boolean,
    default: false
  },
  resumeUrl: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close']);
const modalRef = ref(null);
const closeButtonRef = ref(null);

// Extract file ID from Google Drive URL
const getFileId = (url) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const fileId = getFileId(props.resumeUrl);

const downloadUrl = fileId
  ? `https://drive.google.com/uc?export=download&id=${fileId}`
  : props.resumeUrl;

const viewUrl = props.resumeUrl;

const close = () => {
  emit('close');
};

const handleDownload = () => {
  // Create a temporary anchor element to trigger download
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'resume.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  close();
};

// Focus management
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      if (closeButtonRef.value) {
        closeButtonRef.value.focus();
      }
      document.body.style.overflow = 'hidden';
    });
  } else {
    document.body.style.overflow = '';
  }
});

// Keyboard navigation
const handleKeyDown = (event) => {
  if (!props.isOpen) return;
  if (event.key === 'Escape') {
    close();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
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
  z-index: 10000;
  padding: 1rem;
}

.modal-content {
  max-width: 500px;
  width: 100%;
  padding: 2rem;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.8);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-enter-active {
  animation: fadeIn 0.3s ease-out;
}

.modal-leave-active {
  animation: fadeOut 0.2s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media (max-width: 640px) {
  .modal-content {
    padding: 1.5rem;
  }
}
</style>

