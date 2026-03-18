<script setup>
import { ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "@/composables/useTheme";

const { locale, t } = useI18n();
const { isDark, toggleTheme } = useTheme();

const navItems = [
  { name: "nav.about", href: "#about-me" },
  { name: "nav.education", href: "#education" },
  { name: "nav.experience", href: "#experience" },
  { name: "nav.skills", href: "#skills" },
  { name: "nav.projects", href: "#projects" },
  { name: "nav.contact", href: "#contact" },
];

const isMenuOpen = ref(false);

const navContainer = ref(null);
const indicator = reactive({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  show: false,
});

const indicatorStyle = computed(() => ({
  left: `${indicator.left}px`,
  top: `${indicator.top}px`,
  width: `${indicator.width}px`,
  height: `${indicator.height}px`,
  opacity: indicator.show ? 1 : 0,
  borderRadius: "12px",
}));

function onEnter(e) {
  const target = e.currentTarget;
  const tRect = target.getBoundingClientRect();
  const cRect = navContainer.value?.getBoundingClientRect() ?? {
    left: 0,
    top: 0,
  };
  indicator.left = tRect.left - cRect.left;
  indicator.top = tRect.top - cRect.top;
  indicator.width = tRect.width;
  indicator.height = tRect.height;
  indicator.show = true;
}
function onLeave() {
  indicator.show = false;
}

function scrollToSection(href) {
  isMenuOpen.value = false;
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function toggleLanguage() {
  locale.value = locale.value === 'en' ? 'mm' : 'en';
}
</script>

<template>
  <nav class="liquid-glass fixed top-5 left-5 right-5 z-50">
    <div class="flex justify-between items-center p-4 md:px-8 h-16 border-gray-800">
      <div class="flex space-x-3">
        <div @click="scrollToSection('#hero-section')" class="cursor-pointer">
          <h1 
          class="font-mono text-lg md:text-2xl" 
          style="font-family: 'Lavishly Your'; color: var(--text-primary);">
            Zay&nbsp;&nbsp;&nbsp;Yar&nbsp;&nbsp;&nbsp;Lin&nbsp;&nbsp;&nbsp;Htut
          </h1>
        </div>
      </div>

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
        
        <button @click="scrollToSection('#contact')" class="ml-4 px-6 py-2 text-black font-mono font-bold rounded-4xl text-sm transition-all duration-200 hover:opacity-90" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
          {{ t('nav.contact') }}
        </button>

        <button 
          @click="toggleLanguage" 
          class="ml-2 px-4 py-2 border font-mono text-sm rounded-xl transition-colors duration-200"
          style="border-color: var(--dark-border); color: var(--text-secondary);"
        >
          {{ locale === 'en' ? 'MM' : 'EN' }}
        </button>

        <button 
          @click="toggleTheme" 
          class="ml-2 px-4 py-2 border font-mono text-sm rounded-xl transition-colors duration-200"
          style="border-color: var(--dark-border); color: var(--text-secondary);"
        >
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>
      </div>

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

    <div v-show="isMenuOpen" class="md:hidden border-t" style="border-color: var(--dark-border);">
      <div class="px-4 py-4 space-y-2">
        <a
          v-for="item in navItems"
          :key="item.name"
          :href="item.href"
          @click.prevent="scrollToSection(item.href)"
          class="block px-4 py-3 font-mono transition-colors duration-200 cursor-pointer border-b"
          :style="{ color: 'var(--text-secondary)', borderColor: 'var(--dark-border)' }"
        >
          {{ t(item.name) }}
        </a>
        <button @click="scrollToSection('#contact')" class="w-full mt-4 px-6 py-3 text-black font-mono font-bold rounded-4xl transition-all duration-200" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
          {{ t('nav.contact') }}
        </button>
        <button 
          @click="toggleLanguage" 
          class="w-full mt-2 px-6 py-3 border font-mono rounded-xl transition-colors duration-200"
          style="border-color: var(--dark-border); color: var(--text-secondary);"
        >
          {{ locale === 'en' ? 'Switch to Myanmar' : 'Switch to English' }}
        </button>
        <button 
          @click="toggleTheme" 
          class="w-full mt-2 px-6 py-3 border font-mono rounded-xl transition-colors duration-200"
          style="border-color: var(--dark-border); color: var(--text-secondary);"
        >
          {{ isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
        </button>
      </div>
    </div>
  </nav>
</template>
