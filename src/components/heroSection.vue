<script setup>
import { ref } from 'vue';

const front = ref('cyan');
const biting = ref(false);

function bite(color) {
  if (biting.value) return;
  if (front.value === color) return;

  biting.value = true;

  setTimeout(() => {
    front.value = color;
    biting.value = false;
  }, 500);
}
</script>

<template>
  <div class="flex justify-center items-center h-full w-full px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
    <div class="flex flex-col-reverse lg:flex-row w-full max-w-7xl items-center justify-center gap-12 lg:gap-24">

      <!-- LEFT: Text Content -->
      <div class="flex w-full lg:w-3/5 justify-center items-center text-center lg:text-left">
        <div class="space-y-8">

          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-cyan-500/5">
            <span class="w-2 h-2 rounded-full bg-red-900 animate-pulse"></span>
            <span class="text-sm font-mono text-red-400">Not Available for now</span>
          </div>
          
          <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-white leading-tight">
            Zay Yar Lin Htut
          </h1>
          
          <p class="text-xl sm:text-2xl md:text-3xl font-mono text-cyan-400">
            <span>Full-Stack Developer</span>
          </p>
          
          <p class="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl">
            I'm rapper, BRUH!
          </p>
          
          <!-- Stats -->
          <div class="flex flex-wrap gap-8 justify-center lg:justify-start pt-2">
            <div>
              <p class="text-3xl sm:text-4xl font-bold text-white">[ 1+ ]</p>
              <p class="text-base font-mono text-gray-500">Years Experience</p>
            </div>
            <div>
              <p class="text-3xl sm:text-4xl font-bold text-white">[ 10+ ]</p>
              <p class="text-base font-mono text-gray-500">Projects Completed</p>
            </div>
            <div>
              <p class="text-3xl sm:text-4xl font-bold text-white">[ 2 ]</p>
              <p class="text-base font-mono text-gray-500">Companies</p>
            </div>
          </div>
          
          <div class="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
            <button class="px-8 py-4 bg-cyan-500 text-black font-mono font-bold text-base rounded-4xl hover:bg-cyan-400 transition-colors duration-200">
              Contact Me
            </button>
            <button class="px-8 py-4 border border-gray-700 text-gray-300 font-mono text-base rounded-4xl hover:border-cyan-500 hover:text-cyan-400 transition-colors duration-200">
              View Projects
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT: Interactive Circles -->
      <div class="relative flex justify-center items-center w-full lg:w-2/5 h-[280px] sm:h-[320px] md:h-[360px] lg:h-[480px]">

        <div
          class="circle hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
          :class="{ front: front === 'cyan', back: front !== 'cyan' }"
          @click="bite('cyan')"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center relative z-10">
              <img src="https://pub-64f9509f377f4746abc03aba2add5b1c.r2.dev/ProfileImages/Untitled%20design%20(5).png" alt="Shrek" class="w-25 h-25 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain">
            </div>
          </div>
          <div class="absolute inset-0 border border-cyan-500/30 rounded-full"></div>
          <div v-if="biting && front === 'purple'" class="mouth"></div> 
        </div>

        <div
          class="circle hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
          :class="{ front: front === 'purple', back: front !== 'purple' }"
          @click="bite('purple')"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center relative z-10">
              <span class="text-purple-400 text-lg sm:text-xl font-mono font-bold block">DEVOPS</span>
              <span class="text-gray-500 text-sm mt-2 font-mono block">[Feature 2]</span>
              <span class="text-gray-600 text-xs mt-1 font-mono block">[Feature Detail]</span>
            </div>
          </div>
          <div class="absolute inset-0 border border-purple-500/30 rounded-full"></div>
          <div v-if="biting && front === 'cyan'" class="mouth"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.circle {
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #0f172a;
}

@media (min-width: 640px) {
  .circle {
    width: 180px;
    height: 180px;
  }
}

@media (min-width: 768px) {
  .circle {
    width: 220px;
    height: 220px;
  }
}

@media (min-width: 1024px) {
  .circle {
    width: 280px;
    height: 280px;
  }
}

.cyan {
  left: 15%;
  transform: translateX(-50%);
}

.purple {
  right: 15%;
  transform: translateX(50%);
}

.cyan.back {
  opacity: 0.4;
  border-color: rgba(6, 182, 212, 0.2);
}

.purple.back {
  opacity: 0.4;
  border-color: rgba(168, 85, 247, 0.2);
}

.cyan.front {
  box-shadow: 0 0 60px rgba(6, 182, 212, 0.4), inset 0 0 30px rgba(6, 182, 212, 0.1);
}

.purple.front {
  box-shadow: 0 0 60px rgba(168, 85, 247, 0.4), inset 0 0 30px rgba(168, 85, 247, 0.1);
}

@media (min-width: 1024px) {
  .cyan {
    left: 20%;
  }
  
  .purple {
    right: 20%;
  }
}

.front {
  z-index: 10;
  transform: scale(1.1);
}

.back {
  z-index: 5;
  transform: scale(1);
}

.mouth {
  position: absolute;
  top: 50%;
  right: -6px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 24px solid transparent;
  border-bottom: 24px solid transparent;
  border-left: 48px solid rgba(255, 255, 255, 0.9);
  animation: bite 0.5s ease;
}

@media (min-width: 640px) {
  .mouth {
    border-top: 32px solid transparent;
    border-bottom: 32px solid transparent;
    border-left: 64px solid white;
    right: -8px;
  }
}

@media (min-width: 1024px) {
  .mouth {
    border-top: 44px solid transparent;
    border-bottom: 44px solid transparent;
    border-left: 88px solid white;
    right: -12px;
  }
}

@keyframes bite {
  0% { transform: translateY(-50%) scaleY(0.2); }
  50% { transform: translateY(-50%) scaleY(1); }
  100% { transform: translateY(-50%) scaleY(0.2); }
}
</style>
