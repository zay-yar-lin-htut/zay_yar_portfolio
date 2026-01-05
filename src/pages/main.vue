<script setup>
import { ref, onMounted } from 'vue';
import HeroSection from '@/components/heroSection.vue';
import NavBar from '../components/navBar.vue';
import Education from '@/components/education.vue';

const navRef = ref(null)
const heroHeight = ref('100vh')

onMounted(() => {
    const navHeight = navRef.value.$el.offsetHeight
    heroHeight.value = `calc(100vh - ${navHeight}px)`
})
</script>
<template>
    <NavBar ref="navRef"/>
    <HeroSection :style="{height: heroHeight}"/>
    <Education/>
</template>