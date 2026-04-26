<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import HeroSection from '@/components/heroSection.vue';
import NavBar from '@/components/navBar.vue';
import AboutMe from '@/components/aboutMe.vue';
import Education from '@/components/education.vue';
import Experience from '@/components/experience.vue';
import Skills from '@/components/skills.vue';
import Projects from '@/components/projects.vue';
import Contact from '@/components/contact.vue';

const heroHeightPx = ref(window.innerHeight)

function onResize() {
  heroHeightPx.value = window.innerHeight
}

onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => window.removeEventListener('resize', onResize))
</script>
<template>
    <div class="relative">
        <NavBar/>
        <HeroSection id="hero-section" :style="{height: '100vh'}" :hero-height-px="heroHeightPx"/>
        <div class="blurred-sections">
            <AboutMe id="about-me"/>
            <Education id="education"/>
            <Experience id="experience"/>
            <Skills id="skills"/>
            <Projects id="projects"/>
            <Contact id="contact"/>
        </div>
    </div>
</template>

<style scoped>
.blurred-sections {
    position: relative;
}

.blurred-sections::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to bottom, color-mix(in srgb, var(--bg-primary) 96%, transparent), transparent);
    pointer-events: none;
    z-index: 10;
}

.blurred-sections > * {
    backdrop-filter: blur(16px);
    background: color-mix(in srgb, var(--bg-primary) 92%, transparent);
}
</style>
