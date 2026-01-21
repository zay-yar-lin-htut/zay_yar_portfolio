<script setup>
import { ref, onMounted } from 'vue';
import HeroSection from '@/components/heroSection.vue';
import NavBar from '../components/navBar.vue';
import AboutMe from '@/components/aboutMe.vue';
import Education from '@/components/education.vue';
import Experience from '@/components/experience.vue';
import Skills from '@/components/skills.vue';
import Projects from '@/components/projects.vue';
import Contact from '@/components/contact.vue';

const heroRef = ref(null)
const heroHeightPx = ref(100)

onMounted(() => {
    heroHeightPx.value = window.innerHeight
    window.addEventListener('resize', () => {
        heroHeightPx.value = window.innerHeight
    })
})
</script>
<template>
    <div class="relative">
        <NavBar/>
        <HeroSection ref="heroRef" :style="{height: '100vh'}" :hero-height-px="heroHeightPx"/>
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
    background: linear-gradient(to bottom, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0));
    pointer-events: none;
    z-index: 10;
}

.blurred-sections > * {
    backdrop-filter: blur(20px);
    background: rgba(15, 23, 42, 0.95);
}
</style>
