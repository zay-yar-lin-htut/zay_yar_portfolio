<template>
    <div class="card min-h-screen w-full border-t border-gray-700/50">
        <div class="container mx-auto px-4 py-16">
            <div class="max-w-4xl mx-auto">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-display gradient-text mb-4">Education</h2>
                    <p class="text-lg text-gray-400 font-body max-w-2xl mx-auto">
                        Continuous learning and professional development have been the foundation of my technical journey
                    </p>
                </div>

                <!-- Education Cards -->
                <div class="grid md:grid-cols-2 gap-8 mb-12">
                    <div class="card p-8 hover:scale-105 transition-all duration-300 group">
                        <div class="flex items-start space-x-4">
                            <div class="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                                <span class="text-black font-bold text-lg">B</span>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-black mb-2 group-hover:text-blue-600 transition-colors">
                                    Bachelor of Computer Science
                                </h3>
                                <p class="text-gray-600 font-body mb-2">University of Technology</p>
                                <p class="text-sm text-gray-500 font-body">2020 - 2024</p>
                                <div class="mt-4 flex flex-wrap gap-2">
                                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                        Algorithms
                                    </span>
                                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                        Data Structures
                                    </span>
                                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                        Software Engineering
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card p-8 hover:scale-105 transition-all duration-300 group">
                        <div class="flex items-start space-x-4">
                            <div class="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                                <span class="text-white font-bold text-lg">C</span>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                    Cloud Architecture Certification
                                </h3>
                                <p class="text-gray-400 font-body mb-2">AWS / Google Cloud</p>
                                <p class="text-sm text-gray-500 font-body">2023 - Present</p>
                                <div class="mt-4 flex flex-wrap gap-2">
                                    <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                                        AWS
                                    </span>
                                    <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                                        Docker
                                    </span>
                                    <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                                        Kubernetes
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Skills Section -->
                <div class="text-center">
                    <h3 class="text-2xl font-bold text-white mb-8">Technical Expertise</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="card p-6 text-center hover:scale-105 transition-transform duration-300">
                            <div class="text-3xl mb-2">💻</div>
                            <h4 class="font-bold text-white">Backend Dev</h4>
                            <p class="text-sm text-gray-400 font-body">Node.js, Python, Go</p>
                        </div>
                        <div class="card p-6 text-center hover:scale-105 transition-transform duration-300">
                            <div class="text-3xl mb-2">☁️</div>
                            <h4 class="font-bold text-white">Cloud & DevOps</h4>
                            <p class="text-sm text-gray-400 font-body">AWS, Docker, K8s</p>
                        </div>
                        <div class="card p-6 text-center hover:scale-105 transition-transform duration-300">
                            <div class="text-3xl mb-2">🗄️</div>
                            <h4 class="font-bold text-white">Databases</h4>
                            <p class="text-sm text-gray-400 font-body">PostgreSQL, MongoDB</p>
                        </div>
                        <div class="card p-6 text-center hover:scale-105 transition-transform duration-300">
                            <div class="text-3xl mb-2">⚡</div>
                            <h4 class="font-bold text-white">Performance</h4>
                            <p class="text-sm text-gray-400 font-body">Caching, Optimization</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>