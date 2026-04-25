<script setup lang="ts">
import { ref } from 'vue';
import contentBox from '@/components/ui/ContentBox.vue';
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
  <section class="w-full min-h-screen px-6 sm:px-8 lg:px-12 py-20 lg:py-32 border-t" style="border-color: var(--border-color);" id="education">
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
              <!-- academic-cap -->
              <svg v-if="index === 0" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
              <!-- document-text -->
              <svg v-else-if="index === 1" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <!-- book-open -->
              <svg v-else class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div class="flex-1">
              <span class="font-mono" :style="{ color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)' }">{{ t(edu.period) }}</span>
              <h3 class="text-2xl font-bold mt-1 section-title">
                {{ t(edu.title) }}
              </h3>
              <p class="font-mono mt-1" :style="{ color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)' }">{{ t(edu.school) }}</p>
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
              <!-- trophy -->
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
              </svg>
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
          <contentBox v-for="(skill, index) in educationData.expertiseCards" :key="skill.id" 
                      padding="p-8" 
                      :hover-effect="true" 
                      :hover-color="index % 2 === 0 ? 'cyan' : 'purple'"
                      :custom-class="'text-center cursor-pointer'">
            <div class="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
              <!-- code-bracket -->
              <svg v-if="skill.icon === 'code'" class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)' }">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
              </svg>
              <!-- computer-desktop (frontend) -->
              <svg v-else-if="skill.icon === 'palette'" class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)' }">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
              </svg>
              <!-- cloud -->
              <svg v-else-if="skill.icon === 'cloud'" class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)' }">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 .573-7.473 5.585 5.585 0 0 0-1.299-5.054C15.196 4.9 12.832 4.5 10.5 4.5a5.25 5.25 0 0 0-5.056 3.641A4.5 4.5 0 0 0 2.25 15Z" />
              </svg>
              <!-- circle-stack (database) -->
              <svg v-else class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)' }">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
            </div>
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
                  <!-- clipboard-document-list -->
                  <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: var(--cyan);">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                  </svg>
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

