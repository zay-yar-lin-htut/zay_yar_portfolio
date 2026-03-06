<script setup>
import contentBox from './contentBox.vue'
</script>

<template>
  <section class="w-full px-6 sm:px-8 lg:px-12 py-20 lg:py-32">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20">
        <span class="text-sm font-mono text-purple-400 uppercase tracking-wider">My Journey</span>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-3">
          Work <span class="text-purple-400">&</span> Experience
        </h2>
      </div>

      <div class="space-y-8">
        <contentBox padding="p-8 sm:p-10" hover-effect hover-color="cyan">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 class="text-2xl font-bold text-white">[Job Title]</h4>
              <p class="text-cyan-400 font-mono text-lg">[Company Name]</p>
            </div>
            <span class="text-base font-mono text-gray-500 px-4 py-2 rounded-lg border border-gray-700">Jan 2023 - Present</span>
          </div>
          <p class="text-gray-400 text-lg leading-relaxed mb-6">
            [Description of your role, responsibilities, and achievements. Mention technologies used and impact made.]
          </p>
          <div class="flex flex-wrap gap-3">
            <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">Vue.js</span>
            <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">Node.js</span>
            <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">Docker</span>
            <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">AWS</span>
          </div>
        </contentBox>

        <contentBox padding="p-8 sm:p-10" hover-effect hover-color="purple">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 class="text-2xl font-bold text-white">[Previous Job Title]</h4>
              <p class="text-purple-400 font-mono text-lg">[Previous Company]</p>
            </div>
            <span class="text-base font-mono text-gray-500 px-4 py-2 rounded-lg border border-gray-700">Jan 2022 - Dec 2023</span>
          </div>
          <p class="text-gray-400 text-lg leading-relaxed mb-6">
            [Description of your role, responsibilities, and achievements.]
          </p>
          <div class="flex flex-wrap gap-3">
            <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(168, 85, 247, 0.3); color: #c084fc; background: rgba(168, 85, 247, 0.1);">React</span>
            <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(168, 85, 247, 0.3); color: #c084fc; background: rgba(168, 85, 247, 0.1);">Python</span>
            <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(168, 85, 247, 0.3); color: #c084fc; background: rgba(168, 85, 247, 0.1);">AWS</span>
            <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(168, 85, 247, 0.3); color: #c084fc; background: rgba(168, 85, 247, 0.1);">PostgreSQL</span>
          </div>
        </contentBox>

        <contentBox padding="p-8 sm:p-10" hover-effect hover-color="cyan">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 class="text-2xl font-bold text-white">[Internship/Project Title]</h4>
              <p class="text-cyan-400 font-mono text-lg">[Company/Organization]</p>
            </div>
            <span class="text-base font-mono text-gray-500 px-4 py-2 rounded-lg border border-gray-700">Jan 2021 - Dec 2021</span>
          </div>
          <p class="text-gray-400 text-lg leading-relaxed mb-6">
            [Description of your role or project work.]
          </p>
          <div class="flex flex-wrap gap-3">
            <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">JavaScript</span>
            <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">MongoDB</span>
            <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">Git</span>
            <span class="px-4 py-2 text-sm font-mono rounded-lg border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">REST API</span>
          </div>
        </contentBox>
      </div>
    </div>
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
  transform: translateY(-3px);
}
</style>
