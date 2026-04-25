import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from '@/pages/main.vue'
import '@/assets/main.css'
import { useTheme } from '@/composables/useTheme'

import en from '@/locales/en.json'
import mm from '@/locales/mm.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, mm }
})

const { initTheme } = useTheme()

const app = createApp(App)
app.use(i18n)
app.mount('#app')

initTheme()
