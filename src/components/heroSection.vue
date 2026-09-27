<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { heroData } from '@/data';

const { t } = useI18n();

function scrollToSection(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="section min-h-[100svh] flex items-center" id="hero-section">
    <div class="max-w-7xl mx-auto w-full min-w-0 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20 items-center pt-24 pb-16 sm:py-24">
      <!-- Left: text -->
      <div class="hero-reveal">
        <span
          class="inline-flex items-center gap-2 font-mono text-xs sm:text-sm px-3 py-1.5 rounded-sm"
          style="border: 1px solid var(--color-border); color: var(--color-text-secondary);"
        >
          <span class="w-1.5 h-1.5 rounded-full" style="background: var(--color-accent);"></span>
          {{ t(heroData.notAvailable) }}
        </span>

        <h1
          class="font-display mt-6 break-words text-[clamp(2.4rem,11vw,5.5rem)] leading-[1.04]"
          style="color: var(--color-text-primary);"
        >
          {{ t(heroData.title) }}
        </h1>

        <p class="mt-4 font-mono text-xs sm:text-base" style="color: var(--color-accent);">
          &lt;{{ t(heroData.subtitle) }}&gt;
        </p>

        <p class="mt-5 text-sm sm:text-lg leading-7 sm:leading-relaxed max-w-xl" style="color: var(--color-text-secondary);">
          {{ t(heroData.description) }}
        </p>

        <!-- Inline typographic stats — no boxes -->
        <div class="mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-5">
          <div v-for="stat in heroData.stats" :key="stat.labelKey" class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 min-w-0">
            <span class="font-display text-2xl sm:text-4xl" style="color: var(--color-text-primary);">{{ stat.value }}</span>
            <span class="font-mono text-[10px] sm:text-sm leading-tight" style="color: var(--color-text-secondary);">{{ t(stat.labelKey) }}</span>
          </div>
        </div>

        <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="#projects"
            @click.prevent="scrollToSection('#projects')"
            class="w-full sm:w-auto inline-flex items-center justify-center px-6 h-12 font-medium text-sm transition-colors"
            :style="{ backgroundColor: 'var(--color-accent)', color: '#0E1116' }"
          >
            {{ t('hero.viewProjectsBtn') }}
          </a>
          <a
            href="#contact"
            @click.prevent="scrollToSection('#contact')"
            class="w-full sm:w-auto inline-flex items-center justify-center px-6 h-12 font-medium text-sm transition-colors"
            style="border: 1px solid var(--color-border); color: var(--color-text-primary);"
          >
            {{ t('hero.contactBtn') }}
          </a>
        </div>
      </div>

      <!-- Right: photo -->
      <div class="hero-reveal hero-photo">
        <div class="relative inline-block">
          <div class="photo-frame overflow-hidden" style="border: 1px solid var(--color-border);">
            <img
              :src="heroData.profile"
              alt="Profile photo of Zay Yar Lin Htut"
              class="w-full h-full object-cover"
            >
          </div>
          <!-- offset corner accent -->
          <span class="absolute -top-2 -left-2 w-8 h-8" style="border-top: 2px solid var(--color-accent); border-left: 2px solid var(--color-accent);"></span>
        </div>

        <p class="mt-5 font-mono text-xs sm:text-sm text-center">
          <span style="color: var(--color-accent);">//&nbsp;</span>
          <span style="color: var(--color-text-secondary);">Backend · Frontend · DevOps · Cloud</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.photo-frame {
  width: min(72vw, 340px);
  aspect-ratio: 4 / 5;
  border-radius: 6px;
  margin-inline: auto;
}

@media (min-width: 1024px) {
  .photo-frame {
    width: 340px;
  }
}

/* Single orchestrated intro on page load */
.hero-reveal {
  opacity: 0;
  animation: rise 0.7s cubic-bezier(0.2, 0, 0, 1) forwards;
}

.hero-photo {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation-delay: 150ms;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-reveal {
    animation: none;
    opacity: 1;
  }
}
</style>
