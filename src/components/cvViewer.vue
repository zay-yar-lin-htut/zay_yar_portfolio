<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const props = defineProps<{
  visible: boolean
  title: string
  source: string
}>()

const emit = defineEmits<{ close: [] }>()

const pagesContainer = ref<HTMLDivElement | null>(null)
const isLoading = ref(false)
const loadError = ref(false)
const pageCount = ref(0)

let loadingTask: PDFDocumentLoadingTask | null = null
let pdfDoc: PDFDocumentProxy | null = null
let activeRenderTasks: RenderTask[] = []
let renderToken = 0
let resizeTimer: ReturnType<typeof setTimeout> | null = null
let lastRenderedWidth = 0

function cancelActiveRenders() {
  for (const task of activeRenderTasks) {
    try {
      task.cancel()
    } catch {
      // Ignore already finished render tasks.
    }
  }
  activeRenderTasks = []
}

function clearPages() {
  cancelActiveRenders()
  if (pagesContainer.value) {
    pagesContainer.value.innerHTML = ''
  }
}

async function cleanupPdf() {
  renderToken++
  clearPages()
  pageCount.value = 0
  if (pdfDoc) {
    try {
      await pdfDoc.cleanup()
    } catch {
      // Ignore cleanup errors.
    }
    pdfDoc = null
  }
  if (loadingTask) {
    try {
      await loadingTask.destroy()
    } catch {
      // Ignore cleanup errors.
    }
    loadingTask = null
  }
}

async function renderPages(doc: PDFDocumentProxy, token: number) {
  const container = pagesContainer.value
  if (!container) return

  clearPages()

  const containerStyle = window.getComputedStyle(container)
  const paddingX = parseFloat(containerStyle.paddingLeft) + parseFloat(containerStyle.paddingRight)
  const availableWidth = Math.max(240, Math.min(container.clientWidth - paddingX, 900))
  lastRenderedWidth = container.clientWidth

  const dpr = Math.min(window.devicePixelRatio || 1, 2.5)
  const fragment = document.createDocumentFragment()
  const canvases: { canvas: HTMLCanvasElement; pageNumber: number; targetWidth: number }[] = []

  for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
    const pageWrapper = document.createElement('div')
    pageWrapper.className = 'pdf-page-sheet'

    const canvas = document.createElement('canvas')
    canvas.className = 'pdf-page-canvas'
    pageWrapper.appendChild(canvas)
    fragment.appendChild(pageWrapper)
    canvases.push({ canvas, pageNumber, targetWidth: availableWidth })
  }

  container.appendChild(fragment)

  for (const item of canvases) {
    if (token !== renderToken) return

    const page = await doc.getPage(item.pageNumber)
    if (token !== renderToken) return

    const unscaledViewport = page.getViewport({ scale: 1 })
    const scale = item.targetWidth / unscaledViewport.width
    const viewport = page.getViewport({ scale })

    item.canvas.width = Math.floor(viewport.width * dpr)
    item.canvas.height = Math.floor(viewport.height * dpr)
    item.canvas.style.width = `${Math.floor(viewport.width)}px`
    item.canvas.style.height = `${Math.floor(viewport.height)}px`

    const renderTask = page.render({
      canvas: item.canvas,
      viewport,
      transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
    })
    activeRenderTasks.push(renderTask)

    try {
      await renderTask.promise
    } catch (error) {
      if ((error as { name?: string })?.name === 'RenderingCancelledException') return
      throw error
    }
  }
}

async function loadAndRenderPdf() {
  const token = ++renderToken
  isLoading.value = true
  loadError.value = false
  clearPages()

  try {
    if (pdfDoc) {
      await pdfDoc.cleanup()
      pdfDoc = null
    }
    if (loadingTask) {
      await loadingTask.destroy()
      loadingTask = null
    }

    const task = pdfjsLib.getDocument({ url: props.source })
    loadingTask = task
    const doc = await task.promise

    if (token !== renderToken) {
      await doc.cleanup()
      await task.destroy()
      return
    }

    pdfDoc = doc
    pageCount.value = doc.numPages
    await nextTick()
    await renderPages(doc, token)
  } catch {
    if (token === renderToken) {
      loadError.value = true
    }
  } finally {
    if (token === renderToken) {
      isLoading.value = false
    }
  }
}

function handleResize() {
  if (!props.visible || !pdfDoc || !pagesContainer.value) return
  if (Math.abs(pagesContainer.value.clientWidth - lastRenderedWidth) < 12) return

  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    if (!props.visible || !pdfDoc) return
    const token = ++renderToken
    renderPages(pdfDoc, token).catch(() => {
      if (token === renderToken) loadError.value = true
    })
  }, 150)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.visible) emit('close')
}

watch(() => props.visible, async (visible) => {
  if (visible) {
    document.addEventListener('keydown', handleKeydown)
    window.addEventListener('resize', handleResize)
    await nextTick()
    loadAndRenderPdf()
  } else {
    document.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('resize', handleResize)
    if (resizeTimer) {
      clearTimeout(resizeTimer)
      resizeTimer = null
    }
    cleanupPdf()
  }
})

watch(() => props.source, () => {
  if (props.visible) {
    loadAndRenderPdf()
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
  if (resizeTimer) clearTimeout(resizeTimer)
  cleanupPdf()
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="cv-viewer fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-8"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
      @click.self="emit('close')"
    >
      <div class="cv-viewer-panel relative flex h-full max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col overflow-hidden">
        <div class="flex shrink-0 items-center justify-between gap-4 border-b px-4 py-3 sm:px-6" style="border-color: var(--color-border);">
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <p class="font-mono text-[10px] uppercase tracking-[0.18em]" style="color: var(--color-accent);">Document</p>
              <span v-if="pageCount > 0" class="font-mono text-[10px]" style="color: var(--color-text-secondary);">
                · {{ pageCount }} {{ pageCount === 1 ? 'page' : 'pages' }}
              </span>
            </div>
            <h2 class="truncate font-display text-lg" style="color: var(--color-text-primary);">{{ title }}</h2>
          </div>

          <div class="flex shrink-0 items-center gap-2">
            <a
              :href="source"
              download
              class="cv-viewer-download px-3 py-2 font-mono text-xs"
            >
              Download ↓
            </a>
            <button type="button" class="cv-viewer-close" aria-label="Close CV viewer" @click="emit('close')">
              <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>

        <div class="cv-viewer-scroll relative min-h-0 flex-1 overflow-y-auto">
          <div v-if="isLoading" class="loading-overlay">
            <div class="loading-state" role="status">
              <span class="loading-spinner" aria-hidden="true"></span>
              <span class="font-mono text-xs" style="color: var(--color-text-secondary);">Loading PDF...</span>
            </div>
          </div>

          <div v-else-if="loadError" class="flex h-full min-h-[260px] flex-col items-center justify-center gap-4 p-6 text-center">
            <p class="font-mono text-xs" style="color: var(--color-text-secondary);">Could not render PDF inline.</p>
            <a :href="source" target="_blank" rel="noopener noreferrer" class="cv-viewer-download px-4 py-2 font-mono text-xs">
              Open PDF ↗
            </a>
          </div>

          <div ref="pagesContainer" class="pdf-pages-container flex flex-col items-center gap-4 p-3 sm:p-6"></div>
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

.cv-viewer-scroll {
  background: color-mix(in srgb, var(--color-background) 70%, #0b0f15);
  -webkit-overflow-scrolling: touch;
}

.loading-overlay {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-surface-raised) 88%, transparent);
  backdrop-filter: blur(8px);
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: pdf-spin 700ms linear infinite;
}

@keyframes pdf-spin {
  to { transform: rotate(360deg); }
}

.cv-viewer-scroll :deep(.pdf-page-sheet) {
  background: #ffffff;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.32);
  line-height: 0;
  max-width: 100%;
}

.cv-viewer-scroll :deep(.pdf-page-canvas) {
  display: block;
  max-width: 100%;
  height: auto;
}

.cv-viewer-close,
.cv-viewer-download {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 160ms ease, color 160ms ease, background-color 160ms ease;
}

.cv-viewer-download {
  border: 1px solid color-mix(in srgb, var(--color-accent) 48%, transparent);
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 9%, transparent);
}

.cv-viewer-close {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid color-mix(in srgb, var(--color-text-primary) 25%, transparent);
  color: var(--color-text-primary);
  background: color-mix(in srgb, var(--color-surface-raised) 72%, transparent);
}

.close-icon {
  width: 1.125rem;
  height: 1.125rem;
  display: block;
  transform-origin: center;
  transition: transform 220ms cubic-bezier(0.2, 0, 0, 1);
}

.cv-viewer-close:hover,
.cv-viewer-download:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 12%, var(--color-surface-raised));
}

@media (min-width: 768px) and (hover: hover) and (pointer: fine) {
  .cv-viewer-close:hover .close-icon {
    transform: rotate(90deg);
  }
}
</style>
