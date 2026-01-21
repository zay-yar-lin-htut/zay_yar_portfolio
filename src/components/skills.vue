<template>
  <section class="w-full px-6 sm:px-8 lg:px-12 py-20 lg:py-32">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <span class="text-sm font-mono text-purple-400 uppercase tracking-wider">What I Work With</span>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-3">
          Technical <span class="text-purple-400">Skills</span>
        </h2>
      </div>

      <!-- Skills Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <!-- Backend -->
        <div class="card p-8 hover:border-cyan-500/50 transition-all duration-300 group">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
              <span class="text-2xl">💻</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Backend</h3>
              <p class="text-sm font-mono text-gray-500">Server-side development</p>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">Node.js</span>
              <span class="text-cyan-400 font-mono text-sm">[90%]</span>
            </div>
            <div class="h-2 rounded-full bg-gray-700">
              <div class="h-full rounded-full" style="width: 90%; background: linear-gradient(90deg, #06b6d4, #22d3ee);"></div>
            </div>
          </div>
          <div class="space-y-3 mt-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">Python</span>
              <span class="text-cyan-400 font-mono text-sm">[80%]</span>
            </div>
            <div class="h-2 rounded-full bg-gray-700">
              <div class="h-full rounded-full" style="width: 80%; background: linear-gradient(90deg, #06b6d4, #22d3ee);"></div>
            </div>
          </div>
          <div class="space-y-3 mt-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">Go</span>
              <span class="text-cyan-400 font-mono text-sm">[70%]</span>
            </div>
            <div class="h-2 rounded-full bg-gray-700">
              <div class="h-full rounded-full" style="width: 70%; background: linear-gradient(90deg, #06b6d4, #22d3ee);"></div>
            </div>
          </div>
        </div>

        <!-- Frontend -->
        <div class="card p-8 hover:border-purple-500/50 transition-all duration-300 group">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #a855f7, #c084fc);">
              <span class="text-2xl">🎨</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Frontend</h3>
              <p class="text-sm font-mono text-gray-500">User interface development</p>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">Vue.js</span>
              <span class="text-purple-400 font-mono text-sm">[90%]</span>
            </div>
            <div class="h-2 rounded-full bg-gray-700">
              <div class="h-full rounded-full" style="width: 90%; background: linear-gradient(90deg, #a855f7, #c084fc);"></div>
            </div>
          </div>
          <div class="space-y-3 mt-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">React</span>
              <span class="text-purple-400 font-mono text-sm">[80%]</span>
            </div>
            <div class="h-2 rounded-full bg-gray-700">
              <div class="h-full rounded-full" style="width: 80%; background: linear-gradient(90deg, #a855f7, #c084fc);"></div>
            </div>
          </div>
          <div class="space-y-3 mt-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">Tailwind CSS</span>
              <span class="text-purple-400 font-mono text-sm">[85%]</span>
            </div>
            <div class="h-2 rounded-full bg-gray-700">
              <div class="h-full rounded-full" style="width: 85%; background: linear-gradient(90deg, #a855f7, #c084fc);"></div>
            </div>
          </div>
        </div>

        <!-- DevOps -->
        <div class="card p-8 hover:border-cyan-500/50 transition-all duration-300 group">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
              <span class="text-2xl">☁️</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">DevOps</h3>
              <p class="text-sm font-mono text-gray-500">Cloud & Infrastructure</p>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">Docker</span>
              <span class="text-cyan-400 font-mono text-sm">[85%]</span>
            </div>
            <div class="h-2 rounded-full bg-gray-700">
              <div class="h-full rounded-full" style="width: 85%; background: linear-gradient(90deg, #06b6d4, #22d3ee);"></div>
            </div>
          </div>
          <div class="space-y-3 mt-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">AWS</span>
              <span class="text-cyan-400 font-mono text-sm">[80%]</span>
            </div>
            <div class="h-2 rounded-full bg-gray-700">
              <div class="h-full rounded-full" style="width: 80%; background: linear-gradient(90deg, #06b6d4, #22d3ee);"></div>
            </div>
          </div>
          <div class="space-y-3 mt-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">CI/CD</span>
              <span class="text-cyan-400 font-mono text-sm">[75%]</span>
            </div>
            <div class="h-2 rounded-full bg-gray-700">
              <div class="h-full rounded-full" style="width: 75%; background: linear-gradient(90deg, #06b6d4, #22d3ee);"></div>
            </div>
          </div>
        </div>

        <!-- Database -->
        <div class="card p-8 hover:border-purple-500/50 transition-all duration-300 group">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #a855f7, #c084fc);">
              <span class="text-2xl">🗄️</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Database</h3>
              <p class="text-sm font-mono text-gray-500">Data management</p>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">PostgreSQL</span>
              <span class="text-purple-400 font-mono text-sm">[85%]</span>
            </div>
            <div class="h-2 rounded-full bg-gray-700">
              <div class="h-full rounded-full" style="width: 85%; background: linear-gradient(90deg, #a855f7, #c084fc);"></div>
            </div>
          </div>
          <div class="space-y-3 mt-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">MongoDB</span>
              <span class="text-purple-400 font-mono text-sm">[80%]</span>
            </div>
            <div class="h-2 rounded-full bg-gray-700">
              <div class="h-full rounded-full" style="width: 80%; background: linear-gradient(90deg, #a855f7, #c084fc);"></div>
            </div>
          </div>
          <div class="space-y-3 mt-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">Redis</span>
              <span class="text-purple-400 font-mono text-sm">[70%]</span>
            </div>
            <div class="h-2 rounded-full bg-gray-700">
              <div class="h-full rounded-full" style="width: 70%; background: linear-gradient(90deg, #a855f7, #c084fc);"></div>
            </div>
          </div>
        </div>

        <!-- Tools -->
        <div class="card p-8 hover:border-cyan-500/50 transition-all duration-300 group">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
              <span class="text-2xl">🛠️</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Tools</h3>
              <p class="text-sm font-mono text-gray-500">Development tools</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 text-sm font-mono rounded border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">Git</span>
            <span class="px-3 py-1 text-sm font-mono rounded border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">VS Code</span>
            <span class="px-3 py-1 text-sm font-mono rounded border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">Postman</span>
            <span class="px-3 py-1 text-sm font-mono rounded border" style="border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1);">Figma</span>
          </div>
        </div>

        <!-- Soft Skills -->
        <div class="card p-8 hover:border-purple-500/50 transition-all duration-300 group">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #a855f7, #c084fc);">
              <span class="text-2xl">🤝</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Soft Skills</h3>
              <p class="text-sm font-mono text-gray-500">Personal qualities</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 text-sm font-mono rounded border" style="border-color: rgba(168, 85, 247, 0.3); color: #c084fc; background: rgba(168, 85, 247, 0.1);">Teamwork</span>
            <span class="px-3 py-1 text-sm font-mono rounded border" style="border-color: rgba(168, 85, 247, 0.3); color: #c084fc; background: rgba(168, 85, 247, 0.1);">Problem Solving</span>
            <span class="px-3 py-1 text-sm font-mono rounded border" style="border-color: rgba(168, 85, 247, 0.3); color: #c084fc; background: rgba(168, 85, 247, 0.1);">Communication</span>
            <span class="px-3 py-1 text-sm font-mono rounded border" style="border-color: rgba(168, 85, 247, 0.3); color: #c084fc; background: rgba(168, 85, 247, 0.1);">Adaptability</span>
          </div>
        </div>
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
