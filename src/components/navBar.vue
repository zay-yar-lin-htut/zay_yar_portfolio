<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import { navItems } from '@/data/nav'

const { locale, t } = useI18n()
const { isDark, toggleTheme } = useTheme()

const isMenuOpen = ref(false)
const activeHref = ref('')

function updateActiveSection() {
  const viewportMarker = window.innerHeight * 0.4

  for (const item of navItems) {
    const section = document.querySelector(item.href) as HTMLElement | null

    if (!section) continue

    const rect = section.getBoundingClientRect()

    if (rect.top <= viewportMarker && rect.bottom > viewportMarker) {
      activeHref.value = item.href
      return
    }
  }

  activeHref.value = ''
}

function scrollToSection(href: string) {
  isMenuOpen.value = false
  activeHref.value = href
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function toggleLanguage() {
  locale.value = locale.value === 'en' ? 'mm' : 'en'
}

onMounted(() => {
  updateActiveSection()
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  window.addEventListener('resize', updateActiveSection)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveSection)
  window.removeEventListener('resize', updateActiveSection)
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50"
    style="background: color-mix(in srgb, var(--color-background) 88%, transparent); backdrop-filter: blur(10px); border-bottom: 1px solid var(--color-border);"
  >
    <div class="section">
      <div class="max-w-7xl mx-auto flex justify-between items-center h-16">
        <button @click="scrollToSection('#hero-section')" class="font-display text-lg cursor-pointer" style="color: var(--color-text-primary);">
          <span style="color: var(--color-accent);">~</span> H.&nbsp;Zayar
        </button>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-1">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click.prevent="scrollToSection(item.href)"
            class="px-4 h-11 inline-flex items-center text-sm font-mono transition-colors duration-200 cursor-pointer"
            :style="{
              color: activeHref === item.href ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              backgroundColor: activeHref === item.href ? 'rgba(0, 212, 255, 0.08)' : 'transparent'
            }"
          >
            {{ t(item.name) }}
          </a>

          <button
            @click="toggleLanguage"
            class="ml-3 px-3 h-11 text-sm font-mono cursor-pointer transition-colors duration-200"
            style="border: 1px solid var(--color-border); color: var(--color-text-secondary);"
          >
            <svg v-if="locale === 'en'" class="flag-svg" viewBox="0 0 24 16" aria-label="Myanmar flag" role="img">
              <rect width="24" height="16" fill="#34B233" />
              <rect width="24" height="5.33" fill="#FECB00" />
              <rect y="10.67" width="24" height="5.33" fill="#EA2839" />
              <polygon fill="#fff" points="12,2.1 13.35,6.15 17.62,6.15 14.17,8.65 15.49,12.7 12,10.2 8.51,12.7 9.83,8.65 6.38,6.15 10.65,6.15" />
            </svg>
            <svg v-else class="flag-svg" viewBox="0 0 24 16" aria-label="United Kingdom flag" role="img">
              <rect width="24" height="16" fill="#012169" />
              <path fill="#fff" d="M0 0h3l21 13v3h-3L0 3zM21 0h3v3L3 16H0v-3z" />
              <path fill="#C8102E" d="M0 0h1.5L24 14v2h-1.5L0 2zM22.5 0H24v2L1.5 16H0v-2z" />
              <path fill="#fff" d="M10 0h4v16h-4zM0 6h24v4H0z" />
              <path fill="#C8102E" d="M11 0h2v16h-2zM0 7h24v2H0z" />
            </svg>
            <span class="ml-1">{{ locale === 'en' ? 'MM' : 'EN' }}</span>
          </button>

          <button
            @click="toggleTheme"
            class="ml-2 h-11 w-11 inline-flex items-center justify-center cursor-pointer transition-colors duration-200"
            :style="{ color: 'var(--color-text-secondary)' }"
            aria-label="Toggle theme"
          >
            <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          </button>
        </div>

        <!-- Mobile hamburger -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden h-11 w-11 inline-flex items-center justify-center cursor-pointer transition-colors duration-200"
          :style="{ color: 'var(--color-text-primary)' }"
          aria-label="Toggle menu"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-navigation"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-navigation" v-show="isMenuOpen" class="md:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto" style="border-top: 1px solid var(--color-border); background: var(--color-background);">
      <div class="section">
        <div class="mobile-menu-content py-3 px-1">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click.prevent="scrollToSection(item.href)"
            class="mobile-nav-link font-mono text-sm cursor-pointer transition-colors duration-200"
            style="border-bottom: 1px solid var(--color-border);"
            :style="{ color: activeHref === item.href ? 'var(--color-accent)' : 'var(--color-text-secondary)' }"
          >
            {{ t(item.name) }}
          </a>
          <div class="flex gap-3 py-3">
            <button
              @click="toggleLanguage"
              class="h-11 flex-1 font-mono text-sm cursor-pointer transition-colors duration-200"
              style="border: 1px solid var(--color-border); color: var(--color-text-secondary);"
            >
              <svg v-if="locale === 'en'" class="flag-svg mr-2" viewBox="0 0 24 16" aria-label="Myanmar flag" role="img">
                <rect width="24" height="16" fill="#34B233" /><rect width="24" height="5.33" fill="#FECB00" /><rect y="10.67" width="24" height="5.33" fill="#EA2839" />
                <polygon fill="#fff" points="12,2.1 13.35,6.15 17.62,6.15 14.17,8.65 15.49,12.7 12,10.2 8.51,12.7 9.83,8.65 6.38,6.15 10.65,6.15" />
              </svg>
              <svg v-else class="flag-svg mr-2" viewBox="0 0 24 16" aria-label="United Kingdom flag" role="img">
                <rect width="24" height="16" fill="#012169" /><path fill="#fff" d="M0 0h3l21 13v3h-3L0 3zM21 0h3v3L3 16H0v-3z" /><path fill="#C8102E" d="M0 0h1.5L24 14v2h-1.5L0 2zM22.5 0H24v2L1.5 16H0v-2z" /><path fill="#fff" d="M10 0h4v16h-4zM0 6h24v4H0z" /><path fill="#C8102E" d="M11 0h2v16h-2zM0 7h24v2H0z" />
              </svg>
              {{ locale === 'en' ? 'Switch to Myanmar' : 'Switch to English' }}
            </button>
            <button
              @click="toggleTheme"
              class="h-11 flex-1 font-mono text-sm cursor-pointer transition-colors duration-200"
              style="border: 1px solid var(--color-border); color: var(--color-text-secondary);"
            >
              {{ isDark ? 'Light Mode' : 'Dark Mode' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.flag-svg {
  display: inline-block;
  width: 1.25rem;
  height: 0.875rem;
  flex: 0 0 auto;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-text-secondary) 45%, transparent);
  vertical-align: middle;
}

@media (max-width: 767px) {
  .mobile-nav-link {
    display: flex;
    width: 100%;
    height: 3rem;
    align-items: center;
    padding: 0 0.75rem;
    text-align: left;
  }
}
</style>
