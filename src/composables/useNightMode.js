import { ref, watch } from 'vue'
import { useCookies } from 'vue3-cookies'
import info from '../../info'

export function useNightMode() {
  const { cookies } = useCookies()
  const nightMode = ref(false)

  // Initialize from cookies if enabled
  if (info.config.use_cookies) {
    nightMode.value = cookies.get("nightMode") === "true"
  }

  // Update CSS variables and body class when night mode changes
  const updateBodyClass = () => {
    const root = document.documentElement
    const body = document.body
    
    if (nightMode.value) {
      // Dark mode colors (slate theme)
      root.style.setProperty('--bg-color', '#1a202c')
      root.style.setProperty('--text-color', '#e2e8f0')
      root.style.setProperty('--line-color', '#2d3748')
      root.style.setProperty('--border-color', '#a0aec0')
      root.style.setProperty('--margin-color', '#ef4444')
      // Add night-mode class to body
      body.classList.add('night-mode')
    } else {
      // Light mode colors
      root.style.setProperty('--bg-color', '#fdfbf7')
      root.style.setProperty('--text-color', '#2d3748')
      root.style.setProperty('--line-color', '#e1e1e1')
      root.style.setProperty('--border-color', '#2d3748')
      root.style.setProperty('--margin-color', '#fca5a5')
      // Remove night-mode class from body
      body.classList.remove('night-mode')
    }
  }

  // Watch for changes and update
  watch(nightMode, () => {
    updateBodyClass()
    if (info.config.use_cookies) {
      cookies.set("nightMode", nightMode.value)
    }
  }, { immediate: true })

  const toggleNightMode = () => {
    nightMode.value = !nightMode.value
  }

  const setNightMode = (value) => {
    nightMode.value = value
  }

  return {
    nightMode,
    toggleNightMode,
    setNightMode,
    updateBodyClass
  }
}

