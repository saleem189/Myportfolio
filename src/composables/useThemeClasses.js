import { computed, inject } from 'vue';

/**
 * Composable for theme-aware class bindings
 * Reduces repetition of theme.nightMode.value ? 'dark-class' : 'light-class' patterns
 *
 * @returns {Object} Theme class utilities
 */
export function useThemeClasses() {
  const theme = inject('theme', {
    nightMode: { value: false },
  });

  const isDark = computed(() => theme.nightMode.value);

  /**
   * Returns the appropriate class based on theme
   * @param {string|Object} light - Light mode class or object with light/dark keys
   * @param {string} dark - Dark mode class (optional if light is object)
   * @returns {string} The appropriate class string
   *
   * @example
   * // Simple usage
   * themeClass('bg-white', 'bg-slate-800')
   *
   * // Object usage
   * themeClass({ light: 'text-gray-800', dark: 'text-gray-100' })
   *
   * // With multiple classes
   * themeClass('bg-white text-gray-800', 'bg-slate-800 text-gray-100')
   */
  const themeClass = (light, dark) => {
    if (typeof light === 'object' && light !== null) {
      return isDark.value ? light.dark : light.light;
    }
    return isDark.value ? dark : light;
  };

  /**
   * Returns classes for common UI elements
   */
  const classes = {
    // Backgrounds
    bg: () => themeClass('bg-white', 'bg-slate-800'),
    bgSecondary: () => themeClass('bg-gray-50', 'bg-slate-900'),
    bgOverlay: () => themeClass('bg-[#fdfbf7]', 'bg-[#1a202c]'),

    // Text colors
    text: () => themeClass('text-gray-800', 'text-gray-100'),
    textSecondary: () => themeClass('text-gray-700', 'text-gray-300'),
    textMuted: () => themeClass('text-gray-600', 'text-gray-400'),
    textHeading: () => themeClass('text-gray-900', 'text-gray-100'),

    // Borders
    border: () => themeClass('border-gray-800', 'border-slate-600'),
    borderSecondary: () => themeClass('border-gray-600', 'border-slate-500'),

    // Buttons
    button: () =>
      themeClass(
        'bg-white text-gray-800 hover:bg-gray-50 border-gray-800',
        'bg-slate-800 text-white hover:bg-slate-700 border-slate-600'
      ),
    buttonPrimary: () =>
      themeClass(
        'bg-blue-600 hover:bg-blue-700 text-white',
        'bg-blue-700 hover:bg-blue-600 text-white'
      ),
    buttonSecondary: () =>
      themeClass(
        'bg-gray-200 hover:bg-gray-300 text-gray-800',
        'bg-slate-700 hover:bg-slate-600 text-white'
      ),
    buttonWarning: () =>
      themeClass(
        'bg-yellow-300 hover:bg-yellow-400 text-gray-900',
        'bg-yellow-600 hover:bg-yellow-500 text-white'
      ),

    // Modal
    modalBg: () => themeClass('bg-white border-gray-800', 'bg-slate-800 border-slate-600'),
    modalHeader: () => themeClass('border-gray-800', 'border-slate-600'),

    // Links
    link: () =>
      themeClass('text-gray-700 hover:text-blue-700', 'text-gray-300 hover:text-blue-300'),
    linkNav: () =>
      themeClass(
        'text-gray-700 hover:text-blue-700 nav-link',
        'text-gray-300 hover:text-blue-300 nav-link-dark'
      ),
  };

  return {
    isDark,
    themeClass,
    classes,
  };
}
