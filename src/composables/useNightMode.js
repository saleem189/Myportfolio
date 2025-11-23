import { ref, watch } from 'vue';
import { useCookies } from 'vue3-cookies';
import info from '../../info';

/**
 * Composable for managing dark/light theme mode
 * Handles theme state, persistence via cookies, and CSS variable updates
 *
 * @returns {Object} Night mode utilities
 * @returns {Ref<boolean>} nightMode - Reactive night mode state
 * @returns {Function} toggleNightMode - Toggle between light and dark mode
 * @returns {Function} setNightMode - Set night mode to specific value
 * @returns {Function} updateBodyClass - Manually update body classes and CSS variables
 *
 * @example
 * const { nightMode, toggleNightMode } = useNightMode()
 * // Toggle theme
 * toggleNightMode()
 * // Check current theme
 * if (nightMode.value) { ... }
 */
export function useNightMode() {
  const { cookies } = useCookies();
  const nightMode = ref(false);

  // Initialize from cookies if enabled
  if (info.config.use_cookies) {
    nightMode.value = cookies.get('nightMode') === 'true';
  }

  /**
   * Update CSS variables and body class based on current theme
   * Sets appropriate colors for light or dark mode
   * @private
   */
  const updateBodyClass = () => {
    const root = document.documentElement;
    const body = document.body;

    if (nightMode.value) {
      // Dark mode colors (slate theme)
      root.style.setProperty('--bg-color', '#1a202c');
      root.style.setProperty('--text-color', '#e2e8f0');
      root.style.setProperty('--line-color', '#2d3748');
      root.style.setProperty('--border-color', '#a0aec0');
      root.style.setProperty('--margin-color', '#ef4444');
      // Add night-mode class to body
      body.classList.add('night-mode');
    } else {
      // Light mode colors
      root.style.setProperty('--bg-color', '#fdfbf7');
      root.style.setProperty('--text-color', '#2d3748');
      root.style.setProperty('--line-color', '#e1e1e1');
      root.style.setProperty('--border-color', '#2d3748');
      root.style.setProperty('--margin-color', '#fca5a5');
      // Remove night-mode class from body
      body.classList.remove('night-mode');
    }
  };

  // Watch for changes and update
  watch(
    nightMode,
    () => {
      updateBodyClass();
      if (info.config.use_cookies) {
        cookies.set('nightMode', nightMode.value);
      }
    },
    { immediate: true }
  );

  /**
   * Toggle between light and dark mode
   */
  const toggleNightMode = () => {
    nightMode.value = !nightMode.value;
  };

  /**
   * Set night mode to a specific value
   * @param {boolean} value - True for dark mode, false for light mode
   */
  const setNightMode = (value) => {
    nightMode.value = value;
  };

  return {
    nightMode,
    toggleNightMode,
    setNightMode,
    updateBodyClass,
  };
}
