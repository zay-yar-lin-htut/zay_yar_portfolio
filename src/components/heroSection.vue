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
  <div ref="root" class="flex justify-center items-center mx-auto p-4 sm:p-6 md:p-10">

    <!-- Mobile: Stack layout, Desktop: Side-by-side -->
    <div class="flex flex-col lg:flex-row w-full max-w-7xl items-center justify-center gap-8 lg:gap-12">

      <!-- LEFT: Text Content -->
      <div class="flex w-full lg:w-3/5 justify-center items-center text-center lg:text-left">
        <div class="space-y-4">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Welcome to My Portfolio
          </h1>
          <p class="text-lg sm:text-xl" :class="roleClass">
            I'm Zay Yar Lin Htut, a passionate {{ displayRole }}.
          </p>
          <p class="text-lg sm:text-xl mt-4">
            <span class="font-mono text-green-400 bg-black/80 px-3 py-2 rounded inline-block">
              Your scrolling: {{ wheelPercent }}%
            </span>
          </p>
        </div>
      </div>

      <!-- RIGHT: Interactive Circles -->
      <div class="relative flex justify-center items-center w-full lg:w-2/5 h-[300px] sm:h-[350px] md:h-[400px]">

        <!-- BLACK -->
        <div
          class="circle black"
          :class="{ front: front === 'black', back: front !== 'black' }"
          @click="bite('black')"
        >
          <div v-if="biting && front === 'orange'" class="mouth"></div> 
        </div>

        <!-- ORANGE -->
        <div
          class="circle orange"
          :class="{ front: front === 'orange', back: front !== 'orange' }"
          @click="bite('orange')"
        >
          <div v-if="biting && front === 'black'" class="mouth"></div>
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
  transition: transform 0.3s ease;
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

/* Circle positioning */
.black {
  background: black;
  left: 20%;
  transform: translateX(-50%);
}

.orange {
  background: orange;
  right: 20%;
  transform: translateX(50%);
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
  border-left: 40px solid white;
  animation: bite 0.5s ease;
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
