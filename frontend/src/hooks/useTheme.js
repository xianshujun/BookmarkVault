import { ref } from 'vue'

export function useTheme() {
  const isDayMode = ref(true)

  function initTheme() {
    const savedMode = localStorage.getItem('themeMode')
    if (savedMode) {
      isDayMode.value = savedMode === 'day'
    }
  }

  function toggleMode() {
    isDayMode.value = !isDayMode.value
    localStorage.setItem('themeMode', isDayMode.value ? 'day' : 'night')
  }

  return {
    isDayMode,
    initTheme,
    toggleMode
  }
}
