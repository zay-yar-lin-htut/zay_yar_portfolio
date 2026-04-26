<script setup lang="ts">
import contentBox from '@/components/ui/ContentBox.vue'
import { useI18n } from 'vue-i18n';
import { experienceData } from '@/data';

const { t } = useI18n();
</script>

<template>
  <section class="w-full px-6 sm:px-8 lg:px-12 py-20 lg:py-32 border-t" style="border-color: var(--border-color);" id="experience">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20">
        <span class="text-sm font-mono uppercase tracking-wider" style="color: var(--purple);">My Journey</span>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 section-title">
          Work <span style="color: var(--purple);">&</span> Experience
        </h2>
      </div>

      <div class="space-y-8">
        <contentBox v-for="(exp, index) in experienceData.experiences" :key="exp.id" 
                    padding="p-8 sm:p-10" 
                    :hover-effect="true" 
                    :hover-color="index % 2 === 0 ? 'cyan' : 'purple'">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 class="text-2xl font-bold section-title">{{ t(exp.jobTitle) }}</h4>
              <p class="font-mono text-lg" :style="{ color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)' }">{{ t(exp.company) }}</p>
            </div>
            <span class="font-mono px-4 py-2 rounded-lg border" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }">{{ t(exp.period) }}</span>
          </div>
          <p class="text-lg leading-relaxed mb-6" :style="{ color: 'var(--text-secondary)' }">
            {{ t(exp.description) }}
          </p>
          <div class="flex flex-wrap gap-3">
            <span v-for="skill in exp.skills" :key="skill" 
                  class="px-4 py-2 text-sm font-mono rounded-lg border"
                  :style="{ 
                    borderColor: index % 2 === 0 ? 'rgba(6, 182, 212, 0.3)' : 'rgba(168, 85, 247, 0.3)', 
                    color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)',
                    background: index % 2 === 0 ? 'rgba(6, 182, 212, 0.1)' : 'rgba(168, 85, 247, 0.1)'
                  }">
              {{ skill }}
            </span>
          </div>
        </contentBox>
      </div>
    </div>
  </section>
</template>

