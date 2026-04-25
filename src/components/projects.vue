<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHoverIndicator } from '@/composables/useHoverIndicator'
import { projectsData } from '@/data'

const { t } = useI18n()
const { container: projectsContainer, indicatorStyle, onEnter, onLeave } = useHoverIndicator()
</script>

<template>
  <section class="w-full px-6 sm:px-8 lg:px-12 py-20 lg:py-32" id="projects">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20">
        <span class="text-sm font-mono uppercase tracking-wider section-subtitle">{{ t(projectsData.subtitle) }}</span>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 section-title">
          My <span class="section-subtitle">{{ t(projectsData.title) }}</span>
        </h2>
      </div>

      <div ref="projectsContainer" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        <div
          :style="indicatorStyle"
          class="pointer-events-none absolute rounded-2xl transition-all duration-300"
          style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1)); border: 1px solid rgba(6, 182, 212, 0.3); z-index: 0;"
        ></div>

        <div
          v-for="project in projectsData.projects"
          :key="project.id"
          class="card overflow-hidden cursor-pointer group relative z-10"
          :style="{ borderColor: project.color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(168, 85, 247, 0.3)' }"
          @mouseenter="onEnter"
          @mouseleave="onLeave"
        >
          <div
            class="aspect-video flex items-center justify-center"
            style="background: linear-gradient(135deg, var(--bg-card), var(--bg-primary)); border-bottom: 1px solid var(--border-color);"
          >
            <!-- rocket-launch -->
            <svg v-if="project.icon === 'rocket'" class="w-16 h-16 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)' }">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
            <!-- bolt -->
            <svg v-else-if="project.icon === 'zap'" class="w-16 h-16 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)' }">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5 14.25 2.25 12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
            <!-- device-phone-mobile -->
            <svg v-else-if="project.icon === 'mobile'" class="w-16 h-16 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)' }">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            <!-- wrench-screwdriver -->
            <svg v-else-if="project.icon === 'tools'" class="w-16 h-16 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)' }">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
            </svg>
            <!-- cloud-arrow-up -->
            <svg v-else-if="project.icon === 'cloud'" class="w-16 h-16 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)' }">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.338-2.32 5.75 5.75 0 0 1 .988 5.395A5.25 5.25 0 0 1 17.25 19.5H6.75Z" />
            </svg>
            <!-- chart-bar -->
            <svg v-else class="w-16 h-16 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)' }">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          </div>

          <div class="p-8">
            <div class="flex items-center gap-2 mb-3">
              <span
                class="px-2 py-1 text-xs font-mono rounded border"
                :style="{
                  borderColor: project.color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(168, 85, 247, 0.3)',
                  color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)',
                  background: project.color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(168, 85, 247, 0.1)'
                }"
              >
                {{ t(project.type) }}
              </span>
              <span class="px-2 py-1 text-xs font-mono" :style="{ color: 'var(--text-muted)' }">{{ project.year }}</span>
            </div>

            <h3 class="text-xl font-bold group-hover:text-cyan-400 transition-colors section-title">
              {{ t(project.title) }}
            </h3>
            <p class="text-sm mt-3 leading-relaxed" :style="{ color: 'var(--text-secondary)' }">
              {{ t(project.description) }}
            </p>

            <div class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-2 py-1 text-xs font-mono rounded border"
                :style="{
                  borderColor: project.color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(168, 85, 247, 0.3)',
                  color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)',
                  background: project.color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(168, 85, 247, 0.1)'
                }"
              >
                {{ tech }}
              </span>
            </div>

            <div class="flex gap-4 mt-6">
              <a
                :href="project.codeLink"
                class="text-sm font-mono flex items-center gap-1 transition-colors"
                :style="{ color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)' }"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {{ t('projects.code') }}
              </a>
              <a
                :href="project.demoLink"
                class="text-sm font-mono flex items-center gap-1 transition-colors"
                :style="{ color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)' }"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                {{ t('projects.demo') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  background: var(--bg-card-hover);
}
</style>

