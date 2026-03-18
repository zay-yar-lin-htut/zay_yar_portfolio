<script setup>
import { ref } from 'vue';
import contentBox from './contentBox.vue';
import { useI18n } from 'vue-i18n';
import { educationData } from '@/data';

const { t } = useI18n();

const showCertModal = ref(false);
const selectedCert = ref(null);

function openCertModal(cert) {
  selectedCert.value = cert;
  showCertModal.value = true;
}

function closeCertModal() {
  showCertModal.value = false;
  selectedCert.value = null;
}
</script>

<template>
  <section class="w-full px-6 sm:px-8 lg:px-12 py-20 lg:py-32" id="education">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20">
        <span class="text-sm font-mono uppercase tracking-wider section-subtitle">My Background</span>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 section-title">
          Education <span class="section-subtitle">&</span> Certifications
        </h2>
      </div>

      <div class="grid md:grid-cols-2 gap-8 mb-20">
        <contentBox v-for="(edu, index) in educationData.educations" :key="edu.id" 
                    padding="p-8 sm:p-10" 
                    :hover-effect="true" 
                    :hover-color="index % 2 === 0 ? 'cyan' : 'purple'">
          <div class="flex items-start gap-5">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" 
                 :style="{ background: index % 2 === 0 ? 'linear-gradient(135deg, #06b6d4, #22d3ee)' : 'linear-gradient(135deg, #a855f7, #c084fc)' }">
              <span class="text-2xl">{{ index === 0 ? '🎓' : index === 1 ? '📜' : '📚' }}</span>
            </div>
            <div class="flex-1">
              <span class="font-mono" :style="{ color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)' }">{{ edu.period }}</span>
              <h3 class="text-2xl font-bold mt-1 section-title">
                {{ t(edu.title) }}
              </h3>
              <p class="font-mono mt-1" :style="{ color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)' }">{{ edu.school }}</p>
              <p class="mt-4 leading-relaxed" :style="{ color: 'var(--text-secondary)' }">
                {{ t(edu.description) }}
              </p>
              <div class="flex flex-wrap gap-3 mt-5">
                <span v-for="tag in edu.tags" :key="tag" 
                      class="px-4 py-2 text-sm font-mono rounded-lg border"
                      :style="{ 
                        borderColor: index % 2 === 0 ? 'rgba(6, 182, 212, 0.3)' : 'rgba(168, 85, 247, 0.3)', 
                        color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)',
                        background: index % 2 === 0 ? 'rgba(6, 182, 212, 0.1)' : 'rgba(168, 85, 247, 0.1)'
                      }">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </contentBox>

        <contentBox padding="p-8 sm:p-10" :hover-effect="true" hover-color="cyan" :custom-class="'cursor-pointer'" @click="showCertModal = true">
          <div class="flex items-start gap-5">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" 
                 style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
              <span class="text-2xl">🏆</span>
            </div>
            <div class="flex-1">
              <span class="font-mono section-subtitle">View All</span>
              <h3 class="text-2xl font-bold mt-1 section-title">
                Certifications
              </h3>
              <p class="font-mono mt-1 section-subtitle">[Click to view]</p>
              <p class="mt-4 leading-relaxed" :style="{ color: 'var(--text-secondary)' }">
                Click to explore all my professional certifications and achievements in detail.
              </p>
              <div class="flex flex-wrap gap-3 mt-5">
                <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: var(--cyan); background: rgba(6, 182, 212, 0.1);">AWS</span>
                <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: var(--cyan); background: rgba(6, 182, 212, 0.1);">Cloud</span>
                <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: var(--cyan); background: rgba(6, 182, 212, 0.1);">+ More</span>
              </div>
            </div>
          </div>
        </contentBox>
      </div>

      <div>
        <h3 class="text-3xl font-bold mb-10 text-center section-title">
          Technical <span class="section-subtitle">Expertise</span>
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <contentBox v-for="(skill, index) in educationData.skills" :key="skill.id" 
                      padding="p-8" 
                      :hover-effect="true" 
                      :hover-color="index % 2 === 0 ? 'cyan' : 'purple'"
                      :custom-class="'text-center cursor-pointer'">
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{{ skill.icon }}</div>
            <h4 class="font-bold text-xl section-title">{{ t(skill.title) }}</h4>
            <p class="font-mono mt-2" :style="{ color: 'var(--text-muted)' }">{{ t(skill.subtitle) }}</p>
          </contentBox>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showCertModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="closeCertModal"></div>
        
        <div class="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl card" style="background: var(--bg-card); border: 1px solid var(--border-color);">
          <div class="sticky top-0 flex items-center justify-between p-6 border-b" style="background: var(--bg-card); border-color: var(--border-color);">
            <h2 class="text-2xl font-bold section-title">
              My <span class="section-subtitle">Certifications</span>
            </h2>
            <button @click="closeCertModal" class="p-2 transition-colors" :style="{ color: 'var(--text-secondary)' }">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-6 space-y-6">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="cert in educationData.certificates" :key="cert.id" 
                   class="card p-6 cursor-pointer group"
                   style="border-color: var(--border-color);"
                   @click="openCertModal(cert)">
                <div class="aspect-video rounded-lg mb-4 flex items-center justify-center" 
                     style="background: var(--bg-primary); border: 1px solid var(--border-color);">
                  <span class="text-4xl">📜</span>
                </div>
                <h4 class="text-lg font-bold group-hover:text-cyan-400 transition-colors section-title">{{ t(cert.title) }}</h4>
                <p class="font-mono mt-1" :style="{ color: 'var(--text-secondary)' }">{{ t(cert.issuer) }}</p>
                <p class="font-mono mt-2 text-sm" :style="{ color: 'var(--text-muted)' }">{{ cert.date }}</p>
                <div class="flex flex-wrap gap-2 mt-3">
                  <span v-for="skill in cert.skills" :key="skill" 
                        class="px-2 py-1 text-xs font-mono rounded border"
                        style="border-color: rgba(6, 182, 212, 0.3); color: var(--cyan); background: rgba(6, 182, 212, 0.1);">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
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
  transform: translateY(-3px);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: var(--bg-card);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #06b6d4, #a855f7);
  border-radius: 4px;
}
</style>
