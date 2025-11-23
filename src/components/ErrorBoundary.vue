<template>
  <div
    v-if="hasError"
    :class="[
      'fixed inset-0 z-50 flex items-center justify-center p-4',
      'bg-black/50 backdrop-blur-sm',
    ]"
  >
    <div
      :class="[
        'max-w-md w-full p-6 sketchy-border transform -rotate-1',
        'bg-red-50 border-red-600 dark:bg-red-900/20 dark:border-red-500',
      ]"
    >
      <div class="flex items-start gap-4">
        <AlertCircle
          :size="32"
          class="text-red-600 dark:text-red-400 flex-shrink-0"
        />
        <div class="flex-1">
          <h3 class="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
            Oops! Something went wrong
          </h3>
          <p class="text-red-800 dark:text-red-200 mb-4">
            {{ errorMessage }}
          </p>
          <div class="flex gap-3">
            <button
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              @click="handleReload"
            >
              Reload Page
            </button>
            <button
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors"
              @click="handleDismiss"
            >
              Dismiss
            </button>
          </div>
          <details
            v-if="errorDetails"
            class="mt-4"
          >
            <summary class="cursor-pointer text-sm text-red-700 dark:text-red-300">
              Technical Details
            </summary>
            <pre class="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded text-xs overflow-auto">{{
              errorDetails
            }}</pre>
          </details>
        </div>
      </div>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured, onMounted } from 'vue';
import { AlertCircle } from 'lucide-vue-next';

const hasError = ref(false);
const errorMessage = ref('');
const errorDetails = ref('');

// Capture Vue component errors
onErrorCaptured((err, instance, info) => {
  console.error('Error captured:', err, info);
  hasError.value = true;
  errorMessage.value = 'A component error occurred. Please try reloading the page.';
  errorDetails.value = `${err.message}\n\nComponent: ${instance?.$options?.name || 'Unknown'}\nInfo: ${info}`;
  return false; // Prevent error from propagating
});

// Capture global JavaScript errors
onMounted(() => {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    hasError.value = true;
    errorMessage.value = 'An unexpected error occurred. Please try reloading the page.';
    errorDetails.value = event.error?.stack || event.message;
  });

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    hasError.value = true;
    errorMessage.value =
      'An error occurred while loading data. Please check your connection and try again.';
    errorDetails.value = event.reason?.stack || String(event.reason);
  });
});

const handleReload = () => {
  window.location.reload();
};

const handleDismiss = () => {
  hasError.value = false;
  errorMessage.value = '';
  errorDetails.value = '';
};
</script>

<style scoped>
/* Styles handled by Tailwind classes */
</style>
