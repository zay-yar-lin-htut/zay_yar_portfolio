<script setup>
defineProps({
  padding: {
    type: String,
    default: 'p-8'
  },
  hoverEffect: {
    type: Boolean,
    default: false
  },
  hoverColor: {
    type: String,
    default: 'cyan'
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div :class="['card', padding, hoverEffect ? `hover:border-${hoverColor}-500/50` : '', 'transition-all duration-300', customClass]">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-card);
}

.card:hover {
  transform: translateY(-2px);
  background: var(--bg-card-hover);
}
</style>
