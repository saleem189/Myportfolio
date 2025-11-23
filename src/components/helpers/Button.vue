<template>
  <component
    :is="tag"
    :class="[
      'sketchy-border transition-colors font-bold flex items-center justify-center gap-2',
      buttonClasses,
      sizeClasses,
      variantClasses,
      customClass,
    ]"
    :disabled="disabled"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useThemeClasses } from '@/composables/useThemeClasses';

const props = defineProps({
  variant: {
    type: String,
    default: 'default', // 'default', 'primary', 'secondary', 'danger', 'warning'
    validator: (value) => ['default', 'primary', 'secondary', 'danger', 'warning'].includes(value),
  },
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg'
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'button', // 'button', 'a'
  },
  customClass: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);

const themeClasses = useThemeClasses();

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  return sizes[props.size] || sizes.md;
});

const variantClasses = computed(() => {
  const variants = {
    default: themeClasses.classes.button(),
    primary: themeClasses.classes.buttonPrimary(),
    secondary: themeClasses.classes.buttonSecondary(),
    warning: themeClasses.classes.buttonWarning(),
    danger: themeClasses.themeClass(
      'bg-red-600 hover:bg-red-700 text-white',
      'bg-red-700 hover:bg-red-600 text-white'
    ),
  };
  return variants[props.variant] || variants.default;
});

const buttonClasses = computed(() => {
  if (props.disabled) {
    return 'opacity-50 cursor-not-allowed';
  }
  return '';
});

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
/* Button styles are handled by Tailwind classes */
</style>
