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
  <section class="section min-h-screen flex items-center" id="hero-section">
    <div class="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-center py-24">
      <!-- Left: text -->
      <div class="hero-reveal">
        <span
          class="inline-flex items-center gap-2 font-mono text-sm px-3 py-1.5 rounded-sm"
          style="border: 1px solid var(--color-border); color: var(--color-text-secondary);"
        >
          <span class="w-1.5 h-1.5 rounded-full" style="background: var(--color-accent);"></span>
          {{ t(heroData.notAvailable) }}
        </span>

        <h1
          class="font-display mt-6 text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.02]"
          style="color: var(--color-text-primary);"
        >
          {{ t(heroData.title) }}
        </h1>

        <p class="mt-5 font-mono text-sm sm:text-base" style="color: var(--color-accent);">
          &lt;{{ t(heroData.subtitle) }}&gt;
        </p>

        <p class="mt-6 text-base sm:text-lg leading-relaxed max-w-xl" style="color: var(--color-text-secondary);">
          {{ t(heroData.description) }}
        </p>

        <!-- Inline typographic stats — no boxes -->
        <div class="mt-10 flex flex-wrap gap-x-10 gap-y-5">
          <div v-for="stat in heroData.stats" :key="stat.labelKey" class="flex items-baseline gap-2">
            <span class="font-display text-3xl sm:text-4xl" style="color: var(--color-text-primary);">{{ stat.value }}</span>
            <span class="font-mono text-xs sm:text-sm" style="color: var(--color-text-secondary);">{{ t(stat.labelKey) }}</span>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            @click.prevent="scrollToSection('#projects')"
            class="inline-flex items-center justify-center px-6 h-12 font-medium text-sm transition-colors"
            :style="{ backgroundColor: 'var(--color-accent)', color: '#0E1116' }"
          >
            {{ t('hero.viewProjectsBtn') }}
          </a>
          <a
            href="#contact"
            @click.prevent="scrollToSection('#contact')"
            class="inline-flex items-center justify-center px-6 h-12 font-medium text-sm transition-colors"
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
              src="https://media.licdn.com/dms/image/v2/D5603AQGUP1PXpAq9bw/profile-displayphoto-scale_400_400/B56Z3vRsGTKgAg-/0/1777835886575?e=1790208000&v=beta&t=ruDy25NZPpeQR1GbeRWjtxzhGIdmxhhC0hHA1YH1ZPo"
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