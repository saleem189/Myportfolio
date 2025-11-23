<template>
  <div class="gallery-container">
    <div class="prow">
      <div
        class="pcolumn"
        v-for="(image, idx) in images"
        :key="image.title || idx"
        :class="{
          'flex-100': design,
          'flex-50': !design
        }"
      >
        <img
          :src="image.img"
          :alt="image.title || 'Gallery image'"
          class="g-img"
          @click="openModal(idx)"
          loading="lazy"
        />
        <div class="mt-1">
          <p :class="['font-weight-500 transition-colors', themeClasses.classes.text()]">
            {{ image.title }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- Modal using Vue patterns -->
    <Teleport to="body">
      <Transition name="modal">
        <dialog
          v-if="isModalOpen"
          ref="dialogRef"
          class="gallery-modal-dialog"
          @click.self="closeModal"
          @close="closeModal"
        >
          <button
            ref="closeButtonRef"
            class="close"
            @click="closeModal"
            aria-label="Close image modal"
          >
            &times;
          </button>
          <img
            ref="modalImgRef"
            :src="currentImage?.img"
            :alt="currentImage?.title || 'Gallery image'"
            class="modal-content"
          />
          <div v-if="currentImage?.title" class="caption">
            {{ currentImage.title }}
          </div>
        </dialog>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useThemeClasses } from '@/composables/useThemeClasses';
import { useModal } from '@/composables/useModal';

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  },
  design: {
    type: Boolean,
    default: false
  }
});

const themeClasses = useThemeClasses();

const isModalOpen = ref(false);
const currentImageIndex = ref(0);
const dialogRef = ref(null);
const modalImgRef = ref(null);
const closeButtonRef = ref(null);

const currentImage = computed(() => {
  return props.images[currentImageIndex.value] || null;
});

const openModal = (index) => {
  currentImageIndex.value = index;
  isModalOpen.value = true;
  nextTick(() => {
    if (dialogRef.value) {
      dialogRef.value.showModal();
    }
  });
};

const closeModal = () => {
  if (dialogRef.value) {
    dialogRef.value.close();
  }
  isModalOpen.value = false;
};

// Watch for modal open/close
watch(isModalOpen, (isOpen) => {
  nextTick(() => {
    if (dialogRef.value) {
      if (isOpen) {
        dialogRef.value.showModal();
      } else {
        dialogRef.value.close();
      }
    }
  });
});

// Keyboard navigation for image gallery (extends modal functionality)
const handleKeyDown = (event) => {
  if (!isModalOpen.value) return;
  
  if (event.key === 'Escape') {
    closeModal();
  } else if (event.key === 'ArrowLeft') {
    navigateImage(-1);
  } else if (event.key === 'ArrowRight') {
    navigateImage(1);
  }
};

const navigateImage = (direction) => {
  const newIndex = currentImageIndex.value + direction;
  if (newIndex >= 0 && newIndex < props.images.length) {
    currentImageIndex.value = newIndex;
  }
};

// Use modal composable for common functionality (ESC key, focus, scroll lock)
useModal({
  isOpen: isModalOpen,
  onClose: closeModal,
  closeButtonRef
});

// Add arrow key navigation
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>


<style scoped>
.gallery-container {
  overflow: visible;
  position: relative;
}

.prow {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

.pcolumn {
  padding: 0 4px;
}

.pcolumn.flex-100 {
  flex: 0 0 100%;
  max-width: 100%;
}

.pcolumn.flex-50 {
  flex: 0 0 50%;
  max-width: 50%;
}

.pcolumn img {
  border-radius: 5px;
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
  height: auto;
}

/* Responsive layout */
@media screen and (max-width: 800px) {
  .pcolumn.flex-50 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media screen and (max-width: 600px) {
  .pcolumn {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
}

.g-img {
  cursor: pointer;
  transition: all 0.5s;
}

.g-img:hover {
  opacity: 0.7;
  transform: scale(1.02);
}

/* Modal Styles */
.gallery-modal-dialog {
  position: fixed;
  z-index: 10000;
  padding: 0;
  margin: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border: none;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

.gallery-modal-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.9);
}

.modal-enter-active {
  animation: modalOpen 0.2s ease-out;
}

.modal-leave-active {
  animation: modalClose 0.2s ease-in;
}

@keyframes modalOpen {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalClose {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.modal-content {
  margin: auto;
  display: block;
  width: 100%;
  max-width: 1200px;
  max-height: 80vh;
  object-fit: contain;
  animation: zoom 0.2s ease-out;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.caption {
  margin: 20px auto 0;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  font-size: 1.1rem;
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10001;
}

.close:hover,
.close:focus {
  color: #bbb;
  transform: scale(1.1);
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* Responsive modal */
@media only screen and (max-width: 700px) {
  .modal {
    padding-top: 50px;
  }
  
  .modal-content {
    width: 95%;
  }
  
  .close {
    top: 10px;
    right: 20px;
    font-size: 30px;
  }
  
  .caption {
    font-size: 0.9rem;
    padding: 5px 0;
  }
}
</style>