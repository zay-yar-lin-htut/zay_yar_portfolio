<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const dev_photo = 'https://pub-64f9509f377f4746abc03aba2add5b1c.r2.dev/ProfileImages/dev%20(1).png';
const ops_photo = 'https://pub-64f9509f377f4746abc03aba2add5b1c.r2.dev/ProfileImages/dev%20(2).png';
const backend = 'backend developer'; 
const devops = 'devops engineer';

// Wheel-based scroll percentage (0 - 100)
const wheelPercent = ref(0);
const sensitivity = 0.2; // tune to make wheel feel natural (smaller = slower)
const wheelPos = ref(0); // current virtual scroll position in px (0 = top)
const virtualScreens = 1.5; // number of viewport-heights that represent 100%
let virtualHeight = 0;

function calcVirtualHeight() {
  virtualHeight = Math.max(0, window.innerHeight * virtualScreens);
}

function updateVirtualMapping() {
  calcVirtualHeight();
  const scrollable = Math.max(0, virtualHeight - window.innerHeight);
  wheelPos.value = Math.min(scrollable, Math.max(0, wheelPos.value));
  // show one decimal place so small deltas are visible
  wheelPercent.value = scrollable > 0 ? Math.round((wheelPos.value / scrollable) * 1000) / 10 : 0;
}

// Root ref and lock state for section snap behavior
const root = ref(null);
const isLocked = ref(false);
const lockDuration = 800; // ms
let lockTimer = null;
const prevWheelPercent = ref(0);

function scrollToSibling(direction) {
  if (!root.value) return;
  const target = direction === 'next' ? root.value.nextElementSibling : root.value.previousElementSibling;
  if (!target) return;
  isLocked.value = true;
  target.scrollIntoView({ behavior: 'smooth' });
  clearTimeout(lockTimer);
  lockTimer = setTimeout(() => (isLocked.value = false), lockDuration);
}

function updateScrollFallback() {
  // If the page actually scrolls (not common here), map the real scroll to percent
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  if (scrollHeight > 0) {
    wheelPos.value = Math.min(scrollHeight, Math.max(0, scrollTop));
    wheelPercent.value = Math.round((wheelPos.value / Math.max(1, scrollHeight)) * 100);
  } else {
    // otherwise keep the virtual mapping
    updateVirtualMapping();
  }
}

function onWheel(e) {
  if (isLocked.value) return;

  let delta = e.deltaY;
  if (e.deltaMode === 1) delta *= 16;     // lines -> px (approx)
  else if (e.deltaMode === 2) delta *= window.innerHeight; // pages -> px

  const scrollable = Math.max(0, virtualHeight - window.innerHeight);
  wheelPos.value = Math.min(Math.max(0, wheelPos.value + delta * sensitivity), scrollable);
  // show one decimal place so small deltas are visible
  wheelPercent.value = scrollable > 0 ? Math.round((wheelPos.value / scrollable) * 1000) / 10 : 0;

  // detect crossing top/bottom and trigger scroll to sibling
  if (prevWheelPercent.value < 100 && wheelPercent.value >= 100 && delta > 0) {
    scrollToSibling('next');
  } else if (prevWheelPercent.value > 0 && wheelPercent.value <= 0 && delta < 0) {
    scrollToSibling('prev');
  }
  prevWheelPercent.value = wheelPercent.value;
} 

onMounted(() => {
  // initialize mapping
  calcVirtualHeight();
  updateVirtualMapping();
  window.addEventListener('wheel', onWheel, { passive: true });
  window.addEventListener('scroll', updateScrollFallback, { passive: true });
  window.addEventListener('resize', updateVirtualMapping);
});

onBeforeUnmount(() => {
  window.removeEventListener('wheel', onWheel);
  window.removeEventListener('scroll', updateScrollFallback);
  window.removeEventListener('resize', updateVirtualMapping);
  clearTimeout(lockTimer);
});
</script>
<template>
    <div ref="root" class="flex justify-center items-center mx-auto p-10">
        <div class="flex flex-start w-3/5 justify-center items-center">
            <div class="text-center">
                <h1 class="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
                <p class="text-xl">I'm Zay Yar Lin Htut, a passionate {{ backend }}.</p>
                <p class="text-xl mb-6">
                  <span class="font-mono text-green-400 bg-black/80 px-3 py-1 rounded tracking-widest shadow-[0_2px_8px_rgba(16,185,129,0.12)]">
                    Your scrolling: {{ wheelPercent }}%
                  </span>
                </p>
            </div>
        </div>
        <div>

        </div>
        <div class="relative flex justify-center items-center w-2/5 h-9/10"> 
            <div class="absolute h-25/40 w-25/40 bg-black z-7" style="border-radius: 50%;"></div>
            <div class="absolute h-25/40 w-25/40 bg-orange-500 z-10" style="border-radius: 50%;"></div>
            <!-- <img 
                class="absolute h-4/5 w-4/5 drop-shadow-[0_6px_10px_rgba(239,68,68,0.4)] z-1" 
                :src="dev_photo" 
                alt="Developer Photo"
            >
            <img 
                class="absolute h-4/5 w-4/5 drop-shadow-[0_6px_10px_rgba(239,68,68,0.4)] z-2" 
                :src="ops_photo" 
                alt="Ops Photo"
            > -->
        </div>
    </div>
</template>