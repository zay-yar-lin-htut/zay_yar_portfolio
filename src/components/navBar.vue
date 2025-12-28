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
  left: `${indicator.left - 10}px`, // small padding around the text
  top: `${indicator.top - 8}px`,
  width: `${indicator.width + 20}px`,
  height: `${indicator.height + 10}px`,
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
  <nav class="bg-[#F8F9FA] w-full">
    <div class="flex justify-between p-5">
      <div
        class="border flex flex-start justify-center align-center md:text-[30px] text-red-600 w-3/10 text-center tracking-tight nav-text-common font-black drop-shadow-[0_6px_10px_rgba(239,68,68,0.4)] mx-20"
        style="border-radius:10px 0 10px 0"
      >
        <span class="font-medium mr-10"><</span>
        <span class="text-red text-5xl font-black mt-1.5">:</span>
        Zay Yar Lin Htut
        <span class="text-red text-5xl font-black mt-1.5">:</span>
        <span class="font-medium ml-10">></span>
      </div>

      <button
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden p-2 text-gray-600"
      >
        <svg
          class="w-8 h-8"
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

      <div class="flex flex-end justify-center align-center w-7/10 mt-2">
        <div  
          ref="navContainer"
          class="hidden md:flex relative space-x-8 justify-between align-center px-10 py-2"
        >
          <div
            :style="indicatorStyle"
            class="pointer-events-none absolute rounded-lg bg-red-600/10 border-red-600/20 shadow-[2px_2px_10px_0px_#EF4444] transition-all duration-300"
          ></div>
          <a
            v-for="item in navItems"
            :key="item"
            href="#"
            @mouseenter="onEnter"
            @mouseleave="onLeave"
            class="font-medium text-lg md:text-2xl transition-all duration-300 uppercase cursor-pointer font-sans"
          >
            {{ item }}
          </a>
        </div>
      </div>
    </div>

    <div
      v-show="isMenuOpen"
      class="md:hidden mt-4 flex flex-col space-y-4 border-t"
    >
      <a
        v-for="item in navItems"
        :key="item"
        href="#"
        class="font-medium text-lg uppercase text-gray-800 hover:text-red-600 font-sans"
      >
        {{ item }}
      </a>
    </div>
  </nav>
</template>
