<script setup>
import { useI18n } from 'vue-i18n';
import { projectsData } from '@/data';
import { useHoverIndicator } from '@/composables/useHoverIndicator';
import { ref } from 'vue';

const { t } = useI18n();

const projects = [
  { id: 1, icon: '🚀', type: 'projects.type.webapp', year: '2024', title: 'projects.project1.title', description: 'projects.project1.description', technologies: ['Vue.js', 'Node.js'], color: 'cyan' },
  { id: 2, icon: '⚡', type: 'projects.type.api', year: '2024', title: 'projects.project2.title', description: 'projects.project2.description', technologies: ['Python', 'FastAPI'], color: 'purple' },
  { id: 3, icon: '📱', type: 'projects.type.mobile', year: '2023', title: 'projects.project3.title', description: 'projects.project3.description', technologies: ['React Native', 'Firebase'], color: 'cyan' },
  { id: 4, icon: '🔧', type: 'projects.type.tool', year: '2023', title: 'projects.project4.title', description: 'projects.project4.description', technologies: ['Go', 'CLI'], color: 'purple' },
  { id: 5, icon: '☁️', type: 'projects.type.cloud', year: '2023', title: 'projects.project5.title', description: 'projects.project5.description', technologies: ['AWS', 'Terraform'], color: 'cyan' },
  { id: 6, icon: '📊', type: 'projects.type.data', year: '2022', title: 'projects.project6.title', description: 'projects.project6.description', technologies: ['Python', 'ML'], color: 'purple' },
];

const projectsContainer = ref(null);
const { container: projectsContainerRef, indicator: projectIndicator, indicatorStyle: projectIndicatorStyle, onEnter: projectOnEnter, onLeave: projectOnLeave } = useHoverIndicator();
</script>

<template>
  <section class="w-full px-6 sm:px-8 lg:px-12 py-20 lg:py-32" id="projects">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20">
        <span class="text-sm font-mono uppercase tracking-wider section-subtitle">Recent Work</span>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 section-title">
          My <span class="section-subtitle">Projects</span>
        </h2>
      </div>

      <div ref="projectsContainerRef" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        <div
          :style="projectIndicatorStyle"
          class="pointer-events-none absolute rounded-2xl transition-all duration-300"
          style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1)); border: 1px solid rgba(6, 182, 212, 0.3); z-index: 0;"
        ></div>
        <div v-for="project in projects" :key="project.id" 
             class="card overflow-hidden cursor-pointer group relative z-10"
             :style="{ borderColor: project.color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(168, 85, 247, 0.3)' }"
             @mouseenter="projectOnEnter"
             @mouseleave="projectOnLeave">
          <div class="aspect-video flex items-center justify-center" 
               style="background: linear-gradient(135deg, var(--bg-card), var(--bg-primary)); border-bottom: 1px solid var(--border-color);">
            <span class="text-6xl group-hover:scale-110 transition-transform duration-300">{{ project.icon }}</span>
          </div>
          <div class="p-8">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-1 text-xs font-mono rounded border" 
                    :style="{ 
                      borderColor: project.color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(168, 85, 247, 0.3)', 
                      color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)',
                      background: project.color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(168, 85, 247, 0.1)'
                    }">
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
              <span v-for="tech in project.technologies" :key="tech" 
                    class="px-2 py-1 text-xs font-mono rounded border"
                    :style="{ 
                      borderColor: project.color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(168, 85, 247, 0.3)', 
                      color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)',
                      background: project.color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(168, 85, 247, 0.1)'
                    }">
                {{ tech }}
              </span>
            </div>
            <div class="flex gap-4 mt-6">
              <a href="#" class="text-sm font-mono flex items-center gap-1 transition-colors" 
                 :style="{ color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)' }">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Code
              </a>
              <a href="#" class="text-sm font-mono flex items-center gap-1 transition-colors" 
                 :style="{ color: project.color === 'cyan' ? 'var(--cyan)' : 'var(--purple)' }">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                Demo
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
