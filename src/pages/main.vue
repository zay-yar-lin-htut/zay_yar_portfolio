<script setup>
import { ref, onMounted } from 'vue';
import HeroSection from '@/components/heroSection.vue';
import NavBar from '../components/navBar.vue';
import Education from '@/components/education.vue';

const heroRef = ref(null)
const heroHeightPx = ref(100) // Default to full viewport height

onMounted(() => {
    // Set hero height to full viewport height
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
        <Education/>
    </div>
</template>