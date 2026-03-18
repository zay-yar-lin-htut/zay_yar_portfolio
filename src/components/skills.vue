<script setup>
import contentBox from './contentBox.vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const skills = [
  { id: 1, icon: '💻', title: 'skills.backend.title', subtitle: 'skills.backend.subtitle', color: 'cyan', items: [{ name: 'Node.js', level: 90 }, { name: 'Python', level: 80 }, { name: 'Go', level: 70 }] },
  { id: 2, icon: '🎨', title: 'skills.frontend.title', subtitle: 'skills.frontend.subtitle', color: 'purple', items: [{ name: 'Vue.js', level: 90 }, { name: 'React', level: 80 }, { name: 'Tailwind CSS', level: 85 }] },
  { id: 3, icon: '☁️', title: 'skills.devops.title', subtitle: 'skills.devops.subtitle', color: 'cyan', items: [{ name: 'Docker', level: 85 }, { name: 'AWS', level: 80 }, { name: 'CI/CD', level: 75 }] },
  { id: 4, icon: '🗄️', title: 'skills.database.title', subtitle: 'skills.database.subtitle', color: 'purple', items: [{ name: 'PostgreSQL', level: 85 }, { name: 'MongoDB', level: 80 }, { name: 'Redis', level: 70 }] },
  { id: 5, icon: '🛠️', title: 'skills.tools.title', subtitle: 'skills.tools.subtitle', color: 'cyan', items: ['Git', 'VS Code', 'Postman', 'Figma'] },
  { id: 6, icon: '🤝', title: 'skills.soft.title', subtitle: 'skills.soft.subtitle', color: 'purple', items: ['Teamwork', 'Problem Solving', 'Communication', 'Adaptability'] },
];
</script>

<template>
  <section class="w-full px-6 sm:px-8 lg:px-12 py-20 lg:py-32" id="skills">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20">
        <span class="text-sm font-mono uppercase tracking-wider" style="color: var(--purple);">What I Work With</span>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 section-title">
          Technical <span style="color: var(--purple);">Skills</span>
        </h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <contentBox v-for="skill in skills" :key="skill.id" :hover-effect="true" :hover-color="skill.color">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 rounded-xl flex items-center justify-center" 
                 :style="{ background: skill.color === 'cyan' ? 'linear-gradient(135deg, #06b6d4, #22d3ee)' : 'linear-gradient(135deg, #a855f7, #c084fc)' }">
              <span class="text-2xl">{{ skill.icon }}</span>
            </div>
            <div>
              <h3 class="text-xl font-bold section-title">{{ t(skill.title) }}</h3>
              <p class="text-sm font-mono" :style="{ color: 'var(--text-muted)' }">{{ t(skill.subtitle) }}</p>
            </div>
          </div>
          
          <template v-if="skill.items && typeof skill.items[0] === 'object'">
            <div v-for="item in skill.items" :key="item.name" class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="section-title">{{ item.name }}</span>
                <span class="font-mono text-sm" :style="{ color: skill.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)' }">[{{ item.level }}%]</span>
              </div>
              <div class="h-2 rounded-full" style="background: var(--border-color);">
                <div class="h-full rounded-full" :style="{ width: item.level + '%', background: skill.color === 'cyan' ? 'linear-gradient(90deg, #06b6d4, #22d3ee)' : 'linear-gradient(90deg, #a855f7, #c084fc)' }"></div>
              </div>
            </div>
          </template>
          
          <template v-else>
            <div class="flex flex-wrap gap-2">
              <span v-for="item in skill.items" :key="item" 
                    class="px-3 py-1 text-sm font-mono rounded border"
                    :style="{ 
                      borderColor: skill.color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(168, 85, 247, 0.3)', 
                      color: skill.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)',
                      background: skill.color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(168, 85, 247, 0.1)'
                    }">
                {{ item }}
              </span>
            </div>
          </template>
        </contentBox>
      </div>
    </div>
  </section>
</template>
