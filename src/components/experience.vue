<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { experienceData } from '@/data';

const { t } = useI18n();
</script>

<template>
  <section class="section py-24 lg:py-32" style="border-top: 1px solid var(--color-border);" id="experience">
    <div class="max-w-7xl mx-auto">
      <div class="section-head">
        <h2>{{ t(experienceData.title) }}</h2>
        <p>{{ t(experienceData.subtitle) }}</p>
      </div>

      <div class="exp-list">
        <div
          v-for="(exp, index) in experienceData.experiences"
          :key="exp.id"
          class="exp-row"
        >
          <div class="exp-meta">
            <span class="font-mono text-sm" style="color: var(--color-accent);">{{ t(exp.period) }}</span>
            <span class="font-mono text-xs mt-2" style="color: var(--color-text-secondary);">#0{{ index + 1 }}</span>
          </div>

          <div class="exp-body">
            <div class="exp-marker" style="background: var(--color-accent);"></div>
            <h3 class="font-display text-xl mb-1" style="color: var(--color-text-primary);">{{ t(exp.jobTitle) }}</h3>
            <p class="font-mono text-sm mb-4" style="color: var(--color-text-secondary);">@ {{ t(exp.company) }}</p>
            <p class="text-sm leading-relaxed mb-5" style="color: var(--color-text-secondary);">
              {{ t(exp.description) }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in exp.skills"
                :key="skill"
                class="px-3 py-1.5 font-mono text-xs"
                style="border: 1px solid var(--color-border); color: var(--color-text-secondary);"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.exp-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
}

.exp-meta {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 0.25rem;
  min-width: 120px;
  text-align: right;
}

.exp-body {
  position: relative;
  padding-left: 1.75rem;
  padding-bottom: 3.5rem;
}

.exp-body::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 0;
  width: 1px;
  background: var(--color-border);
}

.exp-marker {
  position: absolute;
  left: -3px;
  top: 8px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

@media (max-width: 639px) {
  .exp-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .exp-meta {
    flex-direction: row;
    align-items: baseline;
    gap: 0.5rem;
    text-align: left;
    min-width: 0;
  }

  .exp-meta .font-mono {
    margin-top: 0;
  }

  .exp-body {
    padding-left: 1.5rem;
  }
}
</style>