<script setup>
import { ref } from 'vue';

const showCertModal = ref(false);
const selectedCert = ref(null);

const certificates = [
  {
    id: 1,
    title: '[Certification Name]',
    issuer: '[Issuing Organization]',
    date: '2023',
    image: '/cert-placeholder.png',
    description: '[Description of the certification and what you learned.]',
    skills: ['AWS', 'Cloud']
  },
  {
    id: 2,
    title: '[Certification Name]',
    issuer: '[Issuing Organization]',
    date: '2023',
    image: '/cert-placeholder.png',
    description: '[Description of the certification and what you learned.]',
    skills: ['Docker', 'Kubernetes']
  },
  {
    id: 3,
    title: '[Certification Name]',
    issuer: '[Issuing Organization]',
    date: '2024',
    image: '/cert-placeholder.png',
    description: '[Description of the certification and what you learned.]',
    skills: ['JavaScript', 'TypeScript']
  }
];

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
  <section class="w-full px-6 sm:px-8 lg:px-12 py-20 lg:py-32">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <span class="text-sm font-mono text-cyan-400 uppercase tracking-wider">My Background</span>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-3">
          Education <span class="text-cyan-400">&</span> Certifications
        </h2>
      </div>

      <!-- Education Cards -->
      <div class="grid md:grid-cols-2 gap-8 mb-20">
        <!-- Education Card 1 -->
        <div class="card p-8 sm:p-10 hover:border-cyan-500/50 transition-all duration-300 group">
          <div class="flex items-start gap-5">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
              <span class="text-black font-mono font-bold text-2xl">🎓</span>
            </div>
            <div class="flex-1">
              <span class="text-base font-mono text-cyan-400">2020 - 2024</span>
              <h3 class="text-2xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">
                [Degree Name]
              </h3>
              <p class="text-gray-400 font-mono text-lg mt-1">[University Name]</p>
              <p class="text-gray-500 text-base mt-4 leading-relaxed">
                [Description of your degree, relevant coursework, achievements, or any honors.]
              </p>
              <div class="flex flex-wrap gap-3 mt-5">
                <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">Relevant Course</span>
                <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">GPA: X.XX</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Education Card 2 -->
        <div class="card p-8 sm:p-10 hover:border-purple-500/50 transition-all duration-300 group">
          <div class="flex items-start gap-5">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style="background: linear-gradient(135deg, #a855f7, #c084fc);">
              <span class="text-white font-mono font-bold text-2xl">📜</span>
            </div>
            <div class="flex-1">
              <span class="text-base font-mono text-purple-400">2023 - Present</span>
              <h3 class="text-2xl font-bold text-white mt-1 group-hover:text-purple-400 transition-colors">
                [Online Course / Bootcamp]
              </h3>
              <p class="text-gray-400 font-mono text-lg mt-1">[Platform / Institution]</p>
              <p class="text-gray-500 text-base mt-4 leading-relaxed">
                [Description of what you learned or any projects completed.]
              </p>
              <div class="flex flex-wrap gap-3 mt-5">
                <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(168, 85, 247, 0.3); color: #c084fc; background: rgba(168, 85, 247, 0.1);">Web Development</span>
                <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(168, 85, 247, 0.3); color: #c084fc; background: rgba(168, 85, 247, 0.1);">Programming</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Education Card 3 -->
        <div class="card p-8 sm:p-10 hover:border-cyan-500/50 transition-all duration-300 group">
          <div class="flex items-start gap-5">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
              <span class="text-black font-mono font-bold text-2xl">📚</span>
            </div>
            <div class="flex-1">
              <span class="text-base font-mono text-cyan-400">2019 - 2020</span>
              <h3 class="text-2xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">
                [High School / Foundation]
              </h3>
              <p class="text-gray-400 font-mono text-lg mt-1">[School Name]</p>
              <p class="text-gray-500 text-base mt-4 leading-relaxed">
                [Description of your high school education or foundation program.]
              </p>
              <div class="flex flex-wrap gap-3 mt-5">
                <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">Science</span>
                <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">Mathematics</span>
              </div>
            </div>
          </div>
        </div>

        <!-- View All Certifications Card -->
        <div class="card p-8 sm:p-10 hover:border-cyan-500/50 transition-all duration-300 group cursor-pointer" @click="showCertModal = true">
          <div class="flex items-start gap-5">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
              <span class="text-black font-mono font-bold text-2xl">🏆</span>
            </div>
            <div class="flex-1">
              <span class="text-base font-mono text-cyan-400">View All</span>
              <h3 class="text-2xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">
                Certifications
              </h3>
              <p class="text-gray-400 font-mono text-lg mt-1">[Click to view]</p>
              <p class="text-gray-500 text-base mt-4 leading-relaxed">
                Click to explore all my professional certifications and achievements in detail.
              </p>
              <div class="flex flex-wrap gap-3 mt-5">
                <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">AWS</span>
                <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">Cloud</span>
                <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">+ More</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Grid -->
      <div>
        <h3 class="text-3xl font-bold text-white mb-10 text-center">
          Technical <span class="text-cyan-400">Expertise</span>
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="card p-8 text-center hover:border-cyan-500/50 transition-all duration-300 group cursor-pointer">
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">💻</div>
            <h4 class="font-bold text-white text-xl">Backend</h4>
            <p class="text-base font-mono text-gray-500 mt-2">Node.js, Python, Go</p>
          </div>
          <div class="card p-8 text-center hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎨</div>
            <h4 class="font-bold text-white text-xl">Frontend</h4>
            <p class="text-base font-mono text-gray-500 mt-2">Vue.js, React, Tailwind</p>
          </div>
          <div class="card p-8 text-center hover:border-cyan-500/50 transition-all duration-300 group cursor-pointer">
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">☁️</div>
            <h4 class="font-bold text-white text-xl">DevOps</h4>
            <p class="text-base font-mono text-gray-500 mt-2">Docker, AWS, CI/CD</p>
          </div>
          <div class="card p-8 text-center hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🗄️</div>
            <h4 class="font-bold text-white text-xl">Database</h4>
            <p class="text-base font-mono text-gray-500 mt-2">PostgreSQL, MongoDB</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Certifications Modal -->
    <Teleport to="body">
      <div v-if="showCertModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="closeCertModal"></div>
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl" style="background: #0f172a; border: 1px solid #334155;">
          <!-- Modal Header -->
          <div class="sticky top-0 flex items-center justify-between p-6 border-b border-gray-700" style="background: #0f172a;">
            <h2 class="text-2xl font-bold text-white">
              My <span class="text-cyan-400">Certifications</span>
            </h2>
            <button @click="closeCertModal" class="p-2 text-gray-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Modal Body -->
          <div class="p-6 space-y-6">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="cert in certificates" :key="cert.id" 
                   class="card p-6 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
                   @click="openCertModal(cert)">
                <div class="aspect-video rounded-lg mb-4 flex items-center justify-center" style="background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid #334155;">
                  <span class="text-4xl">📜</span>
                </div>
                <h4 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{{ cert.title }}</h4>
                <p class="text-sm font-mono text-gray-400 mt-1">{{ cert.issuer }}</p>
                <p class="text-xs font-mono text-gray-500 mt-2">{{ cert.date }}</p>
                <div class="flex flex-wrap gap-2 mt-3">
                  <span v-for="skill in cert.skills" :key="skill" 
                        class="px-2 py-1 text-xs font-mono rounded border"
                        style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">
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
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.card:hover {
  background: #1e293b;
}

.card:hover {
  transform: translateY(-3px);
}

/* Modal scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #1e293b;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #06b6d4, #a855f7);
  border-radius: 4px;
}
</style>
