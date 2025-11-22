import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue'

/**
 * Composable for modal functionality
 * Handles common modal patterns: keyboard navigation, focus management, body scroll lock
 * 
 * @param {Object} options - Modal options
 * @param {Ref<boolean>} options.isOpen - Reactive ref for modal open state
 * @param {Function} options.onClose - Callback when modal closes
 * @param {Ref} options.closeButtonRef - Ref to close button element
 * @returns {Object} Modal utilities
 */
export function useModal({ isOpen, onClose, closeButtonRef }) {
  const modalRef = ref(null)

  /**
   * Handle keyboard events
   */
  const handleKeyDown = (event) => {
    if (!isOpen.value) return
    
    if (event.key === 'Escape') {
      onClose()
    }
  }

  /**
   * Lock body scroll when modal is open
   */
  const lockBodyScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  /**
   * Unlock body scroll
   */
  const unlockBodyScroll = () => {
    document.body.style.overflow = ''
  }

  /**
   * Focus the close button for accessibility
   */
  const focusCloseButton = () => {
    nextTick(() => {
      if (closeButtonRef?.value) {
        closeButtonRef.value.focus()
      }
    })
  }

  // Watch for modal open/close
  watch(isOpen, (open) => {
    if (open) {
      lockBodyScroll()
      focusCloseButton()
    } else {
      unlockBodyScroll()
    }
  })

  // Setup keyboard listener
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
    unlockBodyScroll()
  })

  return {
    modalRef,
    handleKeyDown
  }
}

