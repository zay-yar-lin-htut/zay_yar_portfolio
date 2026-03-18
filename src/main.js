import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from '@/pages/main.vue'
import '@/assets/style.css'
import { useTheme } from '@/composables/useTheme'

import eng from '@/local/eng.json'
import mm from '@/local/mm.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: eng,
    mm: mm
  }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')

const { initTheme } = useTheme()
initTheme()
