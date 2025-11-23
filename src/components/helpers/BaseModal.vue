<template>
  <Teleport to="body">
    <Transition name="modal">
      <dialog
        v-if="props.isOpen"
        ref="dialogRef"
        class="base-modal-dialog"
        @click.self="handleClose"
        @close="handleClose"
      >
        <div
          :class="[
            'base-modal-content sketchy-border transition-colors',
            themeClasses.classes.modalBg(),
          ]"
        >
          <!-- Header Slot -->
          <div
            v-if="$slots.header"
            :class="[
              'base-modal-header flex justify-between items-center mb-4 pb-4 border-b-2 transition-colors',
              themeClasses.classes.modalHeader(),
            ]"
          >
            <slot name="header" />
          </div>

          <!-- Default Header (if no header slot) -->
          <div
            v-else-if="title"
            :class="[
              'base-modal-header flex justify-between items-center mb-4 pb-4 border-b-2 transition-colors',
              themeClasses.classes.modalHeader(),
            ]"
          >
            <h3
              :class="['text-2xl font-bold transition-colors', themeClasses.classes.textHeading()]"
            >
              {{ title }}
            </h3>
            <button
              ref="closeButtonRef"
              :class="[
                'text-2xl font-bold transition-colors hover:opacity-70',
                themeClasses.classes.textMuted(),
              ]"
              aria-label="Close modal"
              @click="handleClose"
            >
              <X :size="24" />
            </button>
          </div>

          <!-- Body Slot -->
          <div :class="['base-modal-body', themeClasses.classes.textSecondary()]">
            <slot />
          </div>

          <!-- Footer Slot -->
          <div
            v-if="$slots.footer"
            :class="[
              'base-modal-footer mt-4 pt-4 border-t-2 transition-colors',
              themeClasses.classes.modalHeader(),
            ]"
          >
            <slot name="footer" />
          </div>
        </div>
      </dialog>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { X } from 'lucide-vue-next';
import { useModal } from '@/composables/useModal';
import { useThemeClasses } from '@/composables/useThemeClasses';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close']);

const themeClasses = useThemeClasses();
const closeButtonRef = ref(null);
const dialogRef = ref(null);

const handleClose = () => {
  if (dialogRef.value) {
    dialogRef.value.close();
  }
  emit('close');
};

// Watch for isOpen changes and show/hide dialog
watch(
  () => props.isOpen,
  (isOpen) => {
    nextTick(() => {
      if (dialogRef.value) {
        if (isOpen) {
          dialogRef.value.showModal();
        } else {
          dialogRef.value.close();
        }
      }
    });
  }
);

// Use modal composable for common functionality
// Create a computed ref for isOpen
const isOpenRef = computed(() => props.isOpen);
useModal({
  isOpen: isOpenRef,
  onClose: handleClose,
  closeButtonRef,
});
</script>

<style scoped>
.base-modal-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  padding: 1rem;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.base-modal-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.base-modal-content {
  max-width: 500px;
  width: 100%;
  padding: 2rem;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.8);
  animation: modalSlideIn 0.3s ease-out;
}

.base-modal-body {
  min-height: 0;
}

.base-modal-header,
.base-modal-footer {
  flex-shrink: 0;
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
  .base-modal-content {
    padding: 1.5rem;
  }
}
</style>
