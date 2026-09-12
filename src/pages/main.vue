<script setup lang="ts">
import { onMounted } from 'vue';
import HeroSection from '@/components/heroSection.vue';
import NavBar from '@/components/navBar.vue';
import AboutMe from '@/components/aboutMe.vue';
import Education from '@/components/education.vue';
import Experience from '@/components/experience.vue';
import Skills from '@/components/skills.vue';
import Projects from '@/components/projects.vue';
import Contact from '@/components/contact.vue';
import { useTheme } from '@/composables/useTheme'
import { applyCssVariables } from '@/design/design-tokens'

const { isDark } = useTheme()

onMounted(() => {
  applyCssVariables(isDark.value ? 'dark' : 'light')
})
</script>
<template>
    <div class="relative">
        <NavBar/>
        <HeroSection id="hero-section" :style="{minHeight: '100vh'}"/>
        <AboutMe id="about-me"/>
        <Education id="education"/>
        <Experience id="experience"/>
        <Skills id="skills"/>
        <Projects id="projects"/>
        <Contact id="contact"/>
    </div>
</template>