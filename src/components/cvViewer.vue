<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  title: string
  source: string
}>()

const emit = defineEmits<{ close: [] }>()

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.visible) emit('close')
}

watch(() => props.visible, (visible) => {
  if (visible) document.addEventListener('keydown', handleKeydown)
  else document.removeEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => document.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="cv-viewer fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
      @click.self="emit('close')"
    >
      <div class="cv-viewer-panel relative flex h-full max-h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col overflow-hidden">
        <div class="flex shrink-0 items-center justify-between gap-4 border-b px-4 py-3 sm:px-6" style="border-color: var(--color-border);">
          <div class="min-w-0">
            <p class="font-mono text-[10px] uppercase tracking-[0.18em]" style="color: var(--color-accent);">Document</p>
            <h2 class="truncate font-display text-lg" style="color: var(--color-text-primary);">{{ title }}</h2>
          </div>
          <button type="button" class="cv-viewer-close" aria-label="Close CV viewer" @click="emit('close')">×</button>
        </div>

        <div class="min-h-0 flex-1 bg-white">
          <iframe :src="source" :title="title" class="h-full w-full border-0" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.cv-viewer {
  background: rgba(5, 8, 12, 0.78);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.cv-viewer-panel {
  background: color-mix(in srgb, var(--color-surface) 88%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
}

.cv-viewer-close {
  display: inline-flex;
  width: 2.25rem;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--color-text-primary) 25%, transparent);
  color: var(--color-text-primary);
  background: color-mix(in srgb, var(--color-surface-raised) 72%, transparent);
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
}

.cv-viewer-close:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
</style>
