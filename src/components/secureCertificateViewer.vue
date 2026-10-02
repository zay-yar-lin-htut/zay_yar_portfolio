<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  sources: readonly string[]
  verificationLinks?: readonly (string | undefined)[]
  visible: boolean
  title: string
}>()

const emit = defineEmits<{ close: [] }>()
const certificateCanvas = ref<HTMLCanvasElement | null>(null)
const currentIndex = ref(0)
const isLoading = ref(false)
const loadError = ref(false)
let renderToken = 0

function currentVerificationLink() {
  return props.verificationLinks?.[currentIndex.value]
}

function blockCanvasExtraction(canvas: HTMLCanvasElement) {
  canvas.toDataURL = () => ''
  canvas.toBlob = () => null
}

function clearCanvas() {
  const canvas = certificateCanvas.value
  const context = canvas?.getContext('2d')
  if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height)
}

function drawWatermark(context: CanvasRenderingContext2D, width: number, height: number) {
  context.save()
  context.translate(width / 2, height / 2)
  context.rotate(-Math.PI / 6)
  context.font = `600 ${Math.max(18, Math.round(Math.min(width, height) / 18))}px Arial`
  context.fillStyle = 'rgba(0, 80, 110, 0.22)'
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  const spacingX = Math.max(260, width / 2.4)
  const spacingY = Math.max(150, height / 6)
  for (let y = -height; y <= height; y += spacingY) {
    for (let x = -width; x <= width; x += spacingX) {
      context.fillText("Certificate of Ronim", x, y)
    }
  }
  context.restore()
}

async function drawCertificate() {
  const canvas = certificateCanvas.value
  const source = props.sources[currentIndex.value]
  if (!canvas || !source) {
    isLoading.value = false
    return
  }

  const token = ++renderToken
  isLoading.value = true
  loadError.value = false
  clearCanvas()
  const image = new Image()

  image.onload = () => {
    if (token !== renderToken) {
      image.onload = null
      image.onerror = null
      image.src = ''
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      isLoading.value = false
      loadError.value = true
      return
    }

    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    context.drawImage(image, 0, 0)
    drawWatermark(context, canvas.width, canvas.height)

    // Remove the decoded image reference immediately after drawing.
    image.onload = null
    image.onerror = null
    image.src = ''
    blockCanvasExtraction(canvas)
    isLoading.value = false
  }

  image.onerror = () => {
    image.onload = null
    image.onerror = null
    image.src = ''
    if (token === renderToken) {
      isLoading.value = false
      loadError.value = true
    }
  }

  image.src = source
}

async function openCurrentCertificate() {
  await nextTick()
  drawCertificate()
}

function closeViewer() {
  renderToken++
  clearCanvas()
  isLoading.value = false
  emit('close')
}

function showPrevious() {
  currentIndex.value = (currentIndex.value - 1 + props.sources.length) % props.sources.length
}

function showNext() {
  currentIndex.value = (currentIndex.value + 1) % props.sources.length
}

watch(() => props.visible, (visible) => {
  if (visible) {
    currentIndex.value = 0
    openCurrentCertificate()
  } else {
    clearCanvas()
  }
})

watch(currentIndex, () => {
  if (props.visible) openCurrentCertificate()
})

onMounted(() => {
  if (props.visible) openCurrentCertificate()
})

onBeforeUnmount(clearCanvas)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="secure-viewer fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
      @contextmenu.prevent
      @click.self="closeViewer"
    >
      <div class="secure-viewer-panel relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden">
        <div class="flex shrink-0 items-center justify-between gap-4 border-b px-4 py-3 sm:px-6" style="border-color: var(--color-border);">
          <div class="min-w-0">
            <p class="font-mono text-[10px] uppercase tracking-[0.18em]" style="color: var(--color-accent);">Certificate</p>
            <h2 class="truncate font-display text-lg" style="color: var(--color-text-primary);">{{ title }}</h2>
          </div>
          <div class="flex shrink-0 items-center gap-2">
            <a
              v-if="currentVerificationLink()"
              :href="currentVerificationLink()"
              target="_blank"
              rel="noopener noreferrer"
              class="viewer-verify px-3 py-2 font-mono text-xs"
            >
              {{ t('education.verify') }} ↗
            </a>
            <button type="button" class="viewer-close" aria-label="Close certificate viewer" @click="closeViewer">×</button>
          </div>
        </div>

        <div class="relative flex min-h-0 flex-1 items-center justify-center overflow-auto p-4 sm:p-8">
          <div v-if="isLoading" class="loading-state" role="status">
            <span class="loading-spinner" aria-hidden="true"></span>
            <span class="font-mono text-xs" style="color: var(--color-text-secondary);">{{ t('education.loading') }}</span>
          </div>
          <div v-else-if="loadError" class="font-mono text-xs" style="color: var(--color-text-secondary);">{{ t('education.loadError') }}</div>
          <canvas ref="certificateCanvas" class="protected-canvas" aria-hidden="true"></canvas>

          <button v-if="sources.length > 1" type="button" class="viewer-arrow viewer-arrow-left" aria-label="Previous certificate" @click="showPrevious">‹</button>
          <button v-if="sources.length > 1" type="button" class="viewer-arrow viewer-arrow-right" aria-label="Next certificate" @click="showNext">›</button>
        </div>

        <div v-if="sources.length > 1" class="shrink-0 border-t px-4 py-2 text-center font-mono text-xs" style="border-color: var(--color-border); color: var(--color-text-secondary);">
          {{ currentIndex + 1 }} / {{ sources.length }}
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.secure-viewer {
  background: rgba(5, 8, 12, 0.78);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  user-select: none;
}

.secure-viewer-panel {
  max-height: calc(100dvh - 2rem);
  background: color-mix(in srgb, var(--color-surface) 88%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px) saturate(135%);
  -webkit-backdrop-filter: blur(20px) saturate(135%);
}

.protected-canvas {
  display: block;
  max-width: 100%;
  max-height: calc(100dvh - 10rem);
  height: auto;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

.loading-state {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-surface-raised) 78%, transparent);
  backdrop-filter: blur(8px);
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: certificate-spin 700ms linear infinite;
}

@keyframes certificate-spin {
  to { transform: rotate(360deg); }
}

.viewer-close,
.viewer-verify,
.viewer-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--color-text-primary) 25%, transparent);
  color: var(--color-text-primary);
  background: color-mix(in srgb, var(--color-surface-raised) 72%, transparent);
  cursor: pointer;
  transition: border-color 160ms ease, color 160ms ease, background-color 160ms ease;
}

.viewer-verify {
  border: 1px solid color-mix(in srgb, var(--color-accent) 48%, transparent);
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 9%, transparent);
}

.viewer-close {
  width: 2.25rem;
  height: 2.25rem;
  font-size: 1.5rem;
  line-height: 1;
}

.viewer-arrow {
  position: absolute;
  top: 50%;
  width: 2.5rem;
  height: 2.5rem;
  transform: translateY(-50%);
  font-size: 2rem;
  line-height: 1;
}

.viewer-arrow-left { left: 1rem; }
.viewer-arrow-right { right: 1rem; }

.viewer-close:hover,
.viewer-verify:hover,
.viewer-arrow:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 12%, var(--color-surface-raised));
}
</style>
