<script setup>
import { ref, reactive, computed } from "vue";
import { navItems } from "../../public/arrays.ts";

// State to track if the mobile menu is open
const isMenuOpen = ref(false);

// Animated indicator that follows hovered nav items
const navContainer = ref(null);
const indicator = reactive({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  show: false,
});

const indicatorStyle = computed(() => ({
  left: `${indicator.left - 8}px`,
  top: `${indicator.top - 4}px`,
  width: `${indicator.width + 16}px`,
  height: `${indicator.height + 8}px`,
  opacity: indicator.show ? 1 : 0,
}));

function onEnter(e) {
  const target = e.currentTarget;
  const tRect = target.getBoundingClientRect();
  const cRect = navContainer.value?.getBoundingClientRect() ?? {
    left: 0,
    top: 0,
  };
  indicator.left = tRect.left - cRect.left;
  indicator.top = tRect.top - cRect.top;
  indicator.width = tRect.width;
  indicator.height = tRect.height;
  indicator.show = true;
}
function onLeave() {
  indicator.show = false;
}
</script>

<template>
  <nav class="nav-glass w-full absolute top-0 left-0 z-50">
    <div class="flex justify-between items-center p-4 md:px-8">
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <div class="card w-10 h-10 flex items-center justify-center">
          <span class="text-black font-bold text-xl">Z</span>
        </div>
        <div>
          <h1 class="font-display text-lg md:text-xl text-black">Zay Yar Lin Htut</h1>
          <p class="text-xs md:text-sm text-gray-600 font-body">Full Stack Developer</p>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <div  
          ref="navContainer"
          class="relative flex space-x-6"
        >
          <div
            :style="indicatorStyle"
            class="pointer-events-none absolute rounded-full card transition-all duration-300"
          ></div>
          <a
            v-for="item in navItems"
            :key="item"
            href="#"
            @mouseenter="onEnter"
            @mouseleave="onLeave"
            class="relative px-4 py-2 text-gray-700 hover:text-black font-medium text-sm md:text-base transition-all duration-300 font-body"
          >
            {{ item }}
          </a>
        </div>
        
        <!-- CTA Button -->
        <button class="liquid-button px-6 py-2 font-medium text-sm font-body">
          Contact Me
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden p-2 text-gray-600 hover:text-black transition-colors duration-300"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="isMenuOpen"
      class="md:hidden nav-glass border-t border-gray-700/50"
    >
      <div class="px-4 py-4 space-y-3">
        <a
          v-for="item in navItems"
          :key="item"
          href="#"
          class="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 font-medium font-body"
        >
          {{ item }}
        </a>
        <button class="w-full liquid-button px-6 py-3 text-white font-medium font-body mt-4">
          Contact Me
        </button>
      </div>
    </div>
  </nav>
</template>
