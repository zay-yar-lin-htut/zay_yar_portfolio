<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { skillsData } from '@/data'

const { t } = useI18n()
</script>

<template>
  <section class="section py-24 lg:py-32" style="border-top: 1px solid var(--color-border);" id="skills">
    <div class="max-w-7xl mx-auto">
      <div class="section-head">
        <h2>{{ t(skillsData.title) }}</h2>
        <p>{{ t(skillsData.subtitle) }}</p>
      </div>

      <div class="space-y-14">
        <div
          v-for="category in skillsData.categories"
          :key="category.id"
          class="grid lg:grid-cols-[0.35fr_0.65fr] gap-6 lg:gap-16"
        >
          <div>
            <h3 class="font-display text-lg" style="color: var(--color-text-primary);">{{ t(category.title) }}</h3>
            <p class="font-mono text-sm mt-1" style="color: var(--color-text-secondary);">{{ t(category.subtitle) }}</p>
          </div>

          <div class="flex flex-wrap gap-2.5 content-start">
            <span
              v-for="item in category.items"
              :key="item"
              class="skill-tag px-4 py-2 font-mono text-sm"
              style="border: 1px solid var(--color-border); color: var(--color-text-primary);"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-tag {
  cursor: default;
  transition: border-color 0.2s ease, color 0.2s ease;
  border-radius: 2px;
}

.skill-tag:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
</style>