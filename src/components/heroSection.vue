<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

// Static role texts
const backendRole = 'backend developer';
const devopsRole = 'devops engineer';

// Encryption transformation logic
function encryptText(percentage) {
  const transformationProgress = (percentage - 5) / 90; // Map 5-95% to 0-1
  
  if (transformationProgress <= 0) return backendRole;
  if (transformationProgress >= 1) return devopsRole;
  
  // Create mixed encryption during transformation
  const maxLength = Math.max(backendRole.length, devopsRole.length);
  let result = '';
  
  for (let i = 0; i < maxLength; i++) {
    const backendChar = backendRole[i] || '';
    const devopsChar = devopsRole[i] || '';
    
    if (Math.random() < transformationProgress) {
      // Use DevOps character or hex encoding
      if (Math.random() < 0.7) {
        result += devopsChar;
      } else {
        // Hex encoding effect
        result += devopsChar ? devopsChar.charCodeAt(0).toString(16).toUpperCase().slice(0, 2) : '??';
      }
    } else {
      // Use Backend character or glitch effect
      if (Math.random() < 0.7) {
        result += backendChar;
      } else {
        // Glitch characters
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
    }
  }
  
  return result;
}

// Computed role based on scroll percentage
const displayRole = computed(() => {
  if (wheelPercent.value <= 5) return backendRole;
  if (wheelPercent.value >= 95) return devopsRole;
  return encryptText(wheelPercent.value);
});

// Computed class for transformation effects
const roleClass = computed(() => {
  if (wheelPercent.value > 5 && wheelPercent.value < 95) {
    return 'text-transform animate-pulse';
  }
  return '';
});

/* =========================
   PAC-MAN CLICK LOGIC
========================= */
const front = ref('orange');
const biting = ref(false);

function bite(color) {
  if (biting.value) return;
  if (front.value === color) return;

  biting.value = true;

  // Immediate visual feedback
  setTimeout(() => {
    front.value = color;
    biting.value = false;
  }, 500);
}

/* =========================
   SCROLL LOGIC (UNCHANGED)
========================= */
const wheelPercent = ref(0);
const sensitivity = 0.6;
const wheelPos = ref(0);
const virtualScreens = 2.0;
let virtualHeight = 0;

function calcVirtualHeight() {
  virtualHeight = window.innerHeight * virtualScreens;
}

function updateVirtualMapping() {
  calcVirtualHeight();
  const scrollable = Math.max(0, virtualHeight - window.innerHeight);
  wheelPos.value = Math.min(scrollable, Math.max(0, wheelPos.value));
  wheelPercent.value =
    scrollable > 0
      ? Math.round((wheelPos.value / scrollable) * 1000) / 10
      : 0;
}

const root = ref(null);
const isLocked = ref(false);
let lockTimer = null;
const prevWheelPercent = ref(0);

function scrollToSibling(direction) {
  if (!root.value) return;
  const target =
    direction === 'next'
      ? root.value.nextElementSibling
      : root.value.previousElementSibling;
  if (!target) return;

  isLocked.value = true;
  target.scrollIntoView({ behavior: 'smooth' });
  clearTimeout(lockTimer);
  lockTimer = setTimeout(() => (isLocked.value = false), 800);
}

function onWheel(e) {
  if (isLocked.value) return;

  let delta = e.deltaY;
  const scrollable = Math.max(0, virtualHeight - window.innerHeight);

  // Check if we're in Education section and scrolling up
  const inEducation = root.value && root.value.nextElementSibling && 
    root.value.nextElementSibling.getBoundingClientRect().top < window.innerHeight;

  if (inEducation && delta < 0) {
    // Scrolling up from Education - check if hero is fully visible
    const heroRect = root.value.getBoundingClientRect();
    if (heroRect.top >= 0) {
      // Hero is fully visible, start decreasing percentage
      wheelPos.value = Math.max(0, wheelPos.value + delta * sensitivity);
      wheelPercent.value =
        scrollable > 0
          ? Math.round((wheelPos.value / scrollable) * 1000) / 10
          : 0;
      e.preventDefault();
    } else {
      // Hero not fully visible yet, keep percentage at 100%
      wheelPercent.value = 100;
    }
  } else {
    // Normal scrolling within hero section
    wheelPos.value = Math.min(
      Math.max(0, wheelPos.value + delta * sensitivity),
      scrollable
    );

    wheelPercent.value =
      scrollable > 0
        ? Math.round((wheelPos.value / scrollable) * 1000) / 10
        : 0;

// Prevent real page scrolling until 100% is reached
  if (wheelPercent.value < 100) {
    e.preventDefault();
  }
  // After 100%, allow natural scrolling to Education section
  }

  // Allow natural scrolling after 100% - no auto-transition
  // Education section will be reached through normal scrolling

  prevWheelPercent.value = wheelPercent.value;
}

onMounted(() => {
  updateVirtualMapping();
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('resize', updateVirtualMapping);
});

onBeforeUnmount(() => {
  window.removeEventListener('wheel', onWheel);
  window.removeEventListener('resize', updateVirtualMapping);
  clearTimeout(lockTimer);
});
</script>

<template>
  <div ref="root" class="flex justify-center items-center h-full w-full px-4 sm:px-6 lg:px-10">

    <!-- Mobile: Stack layout, Desktop: Side-by-side -->
    <div class="flex flex-col lg:flex-row w-full max-w-7xl items-center justify-center gap-6 lg:gap-12 xl:gap-16">

      <!-- LEFT: Text Content -->
      <div class="flex w-full lg:w-3/5 xl:w-1/2 justify-center items-center text-center lg:text-left">
        <div class="space-y-6 sm:space-y-8">
          <!-- Animated greeting -->
          <div class="space-y-4">
            <div class="inline-block">
              <span class="text-base sm:text-lg text-gray-700 font-medium tracking-wide">Hello, I'm</span>
            </div>
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-black leading-tight">
              Zay Yar Lin Htut
            </h1>
          </div>
          
          <!-- Dynamic role with intro text -->
          <div class="space-y-4">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-lg sm:text-xl text-gray-700 font-body">Passionate</span>
              <span class="text-2xl sm:text-3xl md:text-4xl font-bold text-black" :class="roleClass">
                {{ displayRole }}
              </span>
            </div>
            <p class="text-base sm:text-lg text-gray-600 font-body leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Building scalable digital experiences with clean code and modern architecture. 
              Specializing in backend systems, cloud deployment, and creating seamless solutions 
              that bridge the gap between complex requirements and elegant implementations.
            </p>
          </div>
          
          <!-- Scroll indicator -->
          <div class="pt-8">
            <div class="flex items-center justify-center lg:justify-start space-x-4">
              <span class="text-sm text-gray-500 font-body">
                Scroll to explore journey
              </span>
              <div class="card px-4 py-2 flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="font-mono text-sm font-bold gradient-text">
                  {{ wheelPercent }}%
                </span>
              </div>
            </div>
            <div class="mt-6 flex justify-center lg:justify-start">
              <div class="w-8 h-12 border-2 border-gray-600 rounded-full flex justify-center">
                <div class="w-1.5 h-4 bg-gradient-to-b from-blue-500 to-orange-500 rounded-full mt-3 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Interactive Circles -->
      <div class="relative flex justify-center items-center w-full lg:w-2/5 xl:w-1/2 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">

        <!-- BLACK - Backend -->
        <div
          class="card circle hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden"
          :class="{ front: front === 'black', back: front !== 'black' }"
          @click="bite('black')"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center relative z-10">
              <span class="text-white text-xs sm:text-sm font-bold block">BACKEND</span>
              <span class="text-white/70 text-xs block mt-1">Systems</span>
            </div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
          <div v-if="biting && front === 'orange'" class="mouth"></div> 
        </div>

        <!-- ORANGE - DevOps -->
        <div
          class="card circle hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden"
          :class="{ front: front === 'orange', back: front !== 'orange' }"
          @click="bite('orange')"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center relative z-10">
              <span class="text-white text-xs sm:text-sm font-bold block">DEVOPS</span>
              <span class="text-white/70 text-xs block mt-1">Infrastructure</span>
            </div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20"></div>
          <div v-if="biting && front === 'black'" class="mouth"></div>
        </div>

        <!-- Click instruction -->
        <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-gray-500 text-center">
          Click circles to switch
        </div>

      </div>
    </div>
  </div>
</template>

<style>
.circle {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Responsive circle sizes */
@media (min-width: 640px) {
  .circle {
    width: 160px;
    height: 160px;
  }
}

@media (min-width: 768px) {
  .circle {
    width: 190px;
    height: 190px;
  }
}

@media (min-width: 1024px) {
  .circle {
    width: 220px;
    height: 220px;
  }
}

/* Circle positioning with dark theme */
.black {
  background: linear-gradient(135deg, #1a1a2e, #0f0f1e);
  left: 20%;
  transform: translateX(-50%);
}

.orange {
  background: linear-gradient(135deg, #2d1b69, #0f3460);
  right: 20%;
  transform: translateX(50%);
}

/* Dark theme backgrounds */
.black.back {
  background: linear-gradient(135deg, #1a1a2e, #0f0f1e);
  opacity: 0.7;
}

.orange.back {
  background: linear-gradient(135deg, #2d1b69, #0f3460);
  opacity: 0.7;
}

/* Front circle gets enhanced dark color */
.black.front {
  background: linear-gradient(135deg, #0f0f1e, #1a1a2e);
  box-shadow: 
    0 20px 40px rgba(26, 26, 46, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.orange.front {
  background: linear-gradient(135deg, #0f3460, #2d1b69);
  box-shadow: 
    0 20px 40px rgba(45, 27, 105, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Desktop positioning */
@media (min-width: 1024px) {
  .black {
    left: 25%;
  }
  
  .orange {
    right: 25%;
  }
}

/* Add glow effect on hover */
.circle:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.1);
}

/* Front circle enhancement */
.front {
  z-index: 10;
  transform: scale(1.1);
}

.back {
  z-index: 5;
  transform: scale(1);
}

.front {
  z-index: 10;
}

.back {
  z-index: 5;
}

/* mouth triangle - responsive */
.mouth {
  position: absolute;
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 40px solid rgba(255, 255, 255, 0.9);
  animation: bite 0.5s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Responsive mouth sizes */
@media (min-width: 640px) {
  .mouth {
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-left: 60px solid white;
    right: -8px;
  }
}

@media (min-width: 1024px) {
  .mouth {
    border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
    border-left: 80px solid white;
    right: -10px;
  }
}

@keyframes bite {
  0% { transform: translateY(-50%) scaleY(0.2); }
  50% { transform: translateY(-50%) scaleY(1); }
  100% { transform: translateY(-50%) scaleY(0.2); }
}

/* Transformation effects */
.text-transform {
  background: linear-gradient(45deg, #ef4444, #3b82f6, #10b981);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 2s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Mobile-specific optimizations */
@media (max-width: 640px) {
  .text-transform {
    background-size: 300% 300%;
  }
  
  /* Reduce animation intensity on mobile for better performance */
  .animate-pulse {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
}
</style>
