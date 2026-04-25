<script setup lang="ts">
const props = defineProps({
  padding: {
    type: String,
    default: 'p-8'
  },
  hoverEffect: {
    type: Boolean,
    default: false
  },
  /**
   * Accent colour applied to the hover border.
   * Accepts 'cyan' | 'purple'. Explicit class map prevents Tailwind purge.
   */
  hoverColor: {
    type: String,
    default: 'cyan',
    validator: (v: unknown) => typeof v === 'string' && ['cyan', 'purple'].includes(v as string)
  },
  customClass: {
    type: String,
    default: ''
  }
})

const hoverBorderClass = {
  cyan: 'hover:border-cyan-500/50',
  purple: 'hover:border-purple-500/50'
}
</script>

<template>
  <div
    :class="[
      'card transition-all duration-300',
      padding,
      hoverEffect ? hoverBorderClass[hoverColor] : '',
      customClass
    ]"
  >
    <slot />
  </div>
</template>

