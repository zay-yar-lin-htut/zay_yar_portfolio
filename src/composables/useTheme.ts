import { ref } from 'vue'

const isDark = ref(true)

export function useTheme() {
  const applyTheme = () => {
    if (typeof document === 'undefined') return
    if (isDark.value) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
  }

  const initTheme = () => {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        isDark.value = savedTheme === 'dark'
      }
    }
    applyTheme()
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
    applyTheme()
  }

  return {
    isDark,
    toggleTheme,
    initTheme
  }
}
