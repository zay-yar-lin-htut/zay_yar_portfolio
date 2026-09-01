<script setup lang="ts">
import ContentBox from '@/components/ui/ContentBox.vue'
import { useI18n } from 'vue-i18n'
import { skillsData } from '@/data'

const { t } = useI18n()
</script>

<template>
  <section class="w-full px-6 sm:px-8 lg:px-12 py-20 lg:py-32 border-t" style="border-color: var(--border-color);" id="skills">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20">
        <span class="text-sm font-mono uppercase tracking-wider section-subtitle">{{ t(skillsData.subtitle) }}</span>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 section-title">
          {{ t(skillsData.title) }}
        </h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <ContentBox
          v-for="skill in skillsData.categories"
          :key="skill.id"
          :hover-effect="true"
          :hover-color="skill.color"
        >
          <div class="flex items-center gap-4 mb-6">
            <div
              class="w-14 h-14 rounded-xl flex items-center justify-center"
              :style="{ background: skill.color === 'cyan' ? 'linear-gradient(135deg, #06b6d4, #22d3ee)' : 'linear-gradient(135deg, #a855f7, #c084fc)' }"
            >
              <!-- code-bracket -->
              <svg v-if="skill.icon === 'code'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
              </svg>
              <!-- computer-desktop (frontend) -->
              <svg v-else-if="skill.icon === 'palette'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
              </svg>
              <!-- cloud -->
              <svg v-else-if="skill.icon === 'cloud'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 .573-7.473 5.585 5.585 0 0 0-1.299-5.054C15.196 4.9 12.832 4.5 10.5 4.5a5.25 5.25 0 0 0-5.056 3.641A4.5 4.5 0 0 0 2.25 15Z" />
              </svg>
              <!-- circle-stack (database) -->
              <svg v-else-if="skill.icon === 'database'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
              <!-- wrench-screwdriver (tools) -->
              <svg v-else-if="skill.icon === 'tools'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
              </svg>
              <!-- user-group (team) -->
              <svg v-else class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold section-title">{{ t(skill.title) }}</h3>
              <p class="text-sm font-mono" :style="{ color: 'var(--text-muted)' }">{{ t(skill.subtitle) }}</p>
            </div>
          </div>

          <!-- Skills with progress bars -->
          <template v-if="skill.items.length && typeof skill.items[0] === 'object'">
            <div v-for="item in skill.items" :key="item.name" class="mb-3 space-y-1">
              <div class="flex items-center justify-between">
                <span class="section-title">{{ item.name }}</span>
                <span class="font-mono text-sm" :style="{ color: skill.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)' }">{{ item.level }}%</span>
              </div>
              <div class="h-2 rounded-full" style="background: var(--border-color);">
                <div
                  class="h-full rounded-full"
                  :style="{
                    width: item.level + '%',
                    background: skill.color === 'cyan' ? 'linear-gradient(90deg, #06b6d4, #22d3ee)' : 'linear-gradient(90deg, #a855f7, #c084fc)'
                  }"
                ></div>
              </div>
            </div>
          </template>

          <!-- Tag-style skills -->
          <template v-else>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in skill.items"
                :key="item"
                class="px-3 py-1 text-sm font-mono rounded-lg border"
                :style="{
                  borderColor: skill.color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(168, 85, 247, 0.3)',
                  color: skill.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)',
                  background: skill.color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(168, 85, 247, 0.1)'
                }"
              >
                {{ item }}
              </span>
            </div>
          </template>
        </ContentBox>
      </div>
    </div>
  </section>
</template>

