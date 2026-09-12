<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { projectsData } from '@/data'
import { icons } from '@/data/icons'

const { t } = useI18n()
</script>

<template>
  <section class="section py-24 lg:py-32" style="border-top: 1px solid var(--color-border);" id="projects">
    <div class="max-w-7xl mx-auto">
      <div class="section-head mb-12">
        <h2>{{ t(projectsData.title) }}</h2>
      </div>

      <div class="space-y-16">
        <div v-for="(category, key) in projectsData.projects" :key="key" class="space-y-6">
          
          <!-- Section Title -->
          <div class="section-head">
            <p class="text-xl font-bold">{{ t(category.title) }}</p>
          </div>

          <!-- Projects Container -->
          <div class="space-y-8">
            <div
              v-for="project in category.projects"
              :key="project.id"
              class="grid lg:grid-cols-2 gap-0 overflow-hidden"
              style="border: 1px solid var(--color-border);"
            >
              <!-- Left Column: Details -->
              <div
                class="p-8 lg:p-12 flex flex-col justify-between gap-6"
                style="background: var(--color-surface);"
              >
                <div>
                  <div class="flex items-center gap-3 mb-4 flex-wrap">
                    <span class="font-mono text-xs px-2.5 py-1" style="background: var(--color-accent); color: #0E1116;">
                      {{ t(project.type) }}
                    </span>
                    <span class="font-mono text-xs" style="color: var(--color-text-secondary);">
                      {{ project.year }}
                    </span>
                    <span
                      class="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1"
                      style="border: 1px solid var(--color-border); color: var(--color-text-secondary);"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="project.private ? icons.private : icons.public" />
                      </svg>
                      <span>{{ project.privateStatus }}</span>
                    </span>
                  </div>

                  <h3 class="font-display text-2xl sm:text-3xl mb-4" style="color: var(--color-text-primary);">
                    {{ t(project.title) }}
                  </h3>
                  <p class="text-sm leading-relaxed max-w-prose" style="color: var(--color-text-secondary);">
                    {{ t(project.description) }}
                  </p>

                  <div class="flex flex-wrap gap-2 mt-6">
                    <span
                      v-for="tech in project.technologies"
                      :key="tech"
                      class="px-3 py-1.5 font-mono text-xs"
                      style="border: 1px solid var(--color-border); color: var(--color-text-secondary);"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <!-- Code Link (Public project ဖြစ်ပြီး codeLink ရှိရင် ပေါ်မည်) -->
                <div class="flex flex-wrap gap-6 mt-6" v-if="!project.private && project.codeLink">
                  <a
                    :href="project.codeLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 font-mono text-sm transition-colors"
                    style="color: var(--color-accent);"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path :d="icons.github"/>
                    </svg>
                    {{ t('projects.code') }}
                  </a>
                </div>
              </div>

              <!-- Right Column: Image + See Demo Overlay -->
              <div
                class="relative group min-h-[250px] lg:min-h-full flex items-center justify-center overflow-hidden"
                style="background: var(--color-surface-raised); border-top: 1px solid var(--color-border);"
              >
                <!-- Project Image (Image မရှိလျှင် Fallback Icon ပြပါမည်) -->
                <img
                  v-if="project.demoImage"
                  :src="project.demoImage"
                  :alt="t(project.title)"
                  :class="project.imageClass"
                />
                <div v-else class="flex flex-col items-center justify-center p-8 text-center opacity-60">
                  <svg class="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: var(--color-accent);">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" :d="icons.noPreview" />
                  </svg>
                  <span class="font-mono text-xs" style="color: var(--color-text-secondary);">No preview available</span>
                </div>

                <!-- See Demo Hover Overlay -->
                <div
                  v-if="!project.private && project.demoLink"
                  class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <a
                    :href="project.demoLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-6 py-3 font-mono text-sm font-semibold transition-transform transform translate-y-2 group-hover:translate-y-0"
                    style="background: var(--color-accent); color: #0E1116;"
                  >
                    See Demo &rarr;
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
