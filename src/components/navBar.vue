<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import { useHoverIndicator } from '@/composables/useHoverIndicator'
import { navItems } from '@/data/nav'

const { locale, t } = useI18n()
const { isDark, toggleTheme } = useTheme()
const { container: navContainer, indicatorStyle, onEnter, onLeave } = useHoverIndicator()

const isMenuOpen = ref(false)

function scrollToSection(href: string) {
  isMenuOpen.value = false
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function toggleLanguage() {
  locale.value = locale.value === 'en' ? 'mm' : 'en'
}
</script>

<template>
  <nav class="liquid-glass fixed top-5 left-5 right-5 z-50">
    <div class="flex justify-between items-center p-4 md:px-8 h-16">
      <div @click="scrollToSection('#hero-section')" class="cursor-pointer">
        <h1
          class="font-mono text-lg md:text-2xl"
          style="color: var(--text-primary);"
        >
          Zay&nbsp;&nbsp;&nbsp;Yar&nbsp;&nbsp;&nbsp;Lin&nbsp;&nbsp;&nbsp;Htut
        </h1>
      </div>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center space-x-2">
        <div
          ref="navContainer"
          class="relative flex space-x-1 items-center px-2 py-1"
        >
          <div
            :style="indicatorStyle"
            class="pointer-events-none absolute rounded transition-all duration-300"
            style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2)); border: 1px solid rgba(6, 182, 212, 0.3);"
          ></div>
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click.prevent="scrollToSection(item.href)"
            @mouseenter="onEnter"
            @mouseleave="onLeave"
            class="relative px-4 py-2 font-mono text-sm md:text-base transition-colors duration-200 cursor-pointer"
            :style="{ color: 'var(--text-secondary)' }"
          >
            {{ t(item.name) }}
          </a>
        </div>

        <button
          @click="scrollToSection('#contact')"
          class="ml-4 px-6 py-2 text-black font-mono font-bold rounded-4xl text-sm transition-all duration-200 hover:opacity-90"
          style="background: linear-gradient(135deg, #06b6d4, #22d3ee);"
        >
          {{ t('nav.contact') }}
        </button>

        <button
          @click="toggleLanguage"
          class="ml-2 px-4 py-2 border font-mono text-sm rounded-xl transition-colors duration-200"
          style="border-color: var(--border-color); color: var(--text-secondary);"
        >
          {{ locale === 'en' ? 'MM' : 'EN' }}
        </button>

        <button
          @click="toggleTheme"
          class="ml-2 px-4 py-2 border font-mono text-sm rounded-xl transition-colors duration-200"
          style="border-color: var(--border-color); color: var(--text-secondary);"
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
        class="md:hidden p-2 transition-colors duration-200"
        :style="{ color: 'var(--text-secondary)' }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-show="isMenuOpen" class="md:hidden border-t" style="border-color: var(--border-color);">
      <div class="px-4 py-4 space-y-2">
        <a
          v-for="item in navItems"
          :key="item.name"
          :href="item.href"
          @click.prevent="scrollToSection(item.href)"
          class="block px-4 py-3 font-mono transition-colors duration-200 cursor-pointer border-b"
          :style="{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }"
        >
          {{ t(item.name) }}
        </a>
        <button
          @click="scrollToSection('#contact')"
          class="w-full mt-4 px-6 py-3 text-black font-mono font-bold rounded-4xl transition-all duration-200"
          style="background: linear-gradient(135deg, #06b6d4, #22d3ee);"
        >
          {{ t('nav.contact') }}
        </button>
        <button
          @click="toggleLanguage"
          class="w-full mt-2 px-6 py-3 border font-mono rounded-xl transition-colors duration-200"
          style="border-color: var(--border-color); color: var(--text-secondary);"
        >
          {{ locale === 'en' ? 'Switch to Myanmar' : 'Switch to English' }}
        </button>
        <button
          @click="toggleTheme"
          class="w-full mt-2 px-6 py-3 border font-mono rounded-xl transition-colors duration-200"
          style="border-color: var(--border-color); color: var(--text-secondary);"
        >
          {{ isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
        </button>
      </div>
    </div>
  </nav>
</template>

