<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { educationData } from '@/data';

const { t } = useI18n();
</script>

<template>
  <section class="section py-24 lg:py-32" style="border-top: 1px solid var(--color-border);" id="education">
    <div class="max-w-7xl mx-auto">
      <div class="section-head">
        <h2>{{ t(educationData.title) }}</h2>
        <p>{{ t(educationData.subtitle) }}</p>
      </div>

      <!-- Vertical timeline -->
      <div class="timeline">
        <div
          v-for="(edu, index) in educationData.educations"
          :key="edu.id"
          class="timeline-item"
        >
          <div class="timeline-dot" style="border-color: var(--color-accent);">
            <span class="timeline-dot-inner" style="background: var(--color-accent);"></span>
          </div>

          <div class="timeline-card">
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <span class="font-mono text-sm" style="color: var(--color-accent);">/* {{ t(edu.period) }} */</span>
              <span class="font-mono text-xs" style="color: var(--color-text-secondary);">0{{ index + 1 }}</span>
            </div>
            <h3 class="font-display text-xl mb-1" style="color: var(--color-text-primary);">{{ t(edu.title) }}</h3>
            <p class="font-mono text-sm mb-4" style="color: var(--color-text-secondary);">@ {{ t(edu.school) }}</p>
            <p class="text-sm leading-relaxed" style="color: var(--color-text-secondary);">
              {{ t(edu.description) }}
            </p>
            <div class="flex flex-wrap gap-2 mt-5">
              <span
                v-for="tag in edu.tags"
                :key="tag"
                class="px-3 py-1.5 font-mono text-xs"
                style="border: 1px solid var(--color-border); color: var(--color-text-secondary);"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Expertise — inline list, no card boxes -->
      <div class="mt-24">
        <h2 class="font-display" style="font-size: 1.5rem; margin-bottom: 1.5rem; color: var(--color-text-primary);">{{ t(educationData.expertise) }}</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style="background: var(--color-background);">
          <div
            v-for="skill in educationData.expertiseCards"
            :key="skill.id"
            class="p-6"
            style="background: var(--color-surface);"
          >
            <span class="font-mono text-sm" style="color: var(--color-accent);">0{{ skill.id }}</span>
            <h4 class="font-display text-lg mt-3 mb-1" style="color: var(--color-text-primary);">{{ t(skill.title) }}</h4>
            <p class="text-sm" style="color: var(--color-text-secondary);">{{ t(skill.subtitle) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  position: relative;
  margin-left: 0.625rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--color-border);
}

.timeline-item {
  position: relative;
  padding-left: 2.5rem;
  padding-bottom: 3.5rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -0.625rem;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-dot-inner {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.timeline-card {
  padding: 1.5rem 0;
}
</style>
