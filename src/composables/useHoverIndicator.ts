import { ref, reactive, computed } from 'vue'

export function useHoverIndicator() {
  const container = ref<HTMLElement | null>(null)
  const indicator = reactive({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    show: false,
  })

  const indicatorStyle = computed(() => ({
    left: `${indicator.left}px`,
    top: `${indicator.top}px`,
    width: `${indicator.width}px`,
    height: `${indicator.height}px`,
    opacity: indicator.show ? 1 : 0,
    borderRadius: '12px',
  }))

  function onEnter(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement | null
    if (!target) return
    const tRect = target.getBoundingClientRect()
    const cRect = container.value?.getBoundingClientRect() ?? {
      left: 0,
      top: 0,
    }
    indicator.left = tRect.left - cRect.left
    indicator.top = tRect.top - cRect.top
    indicator.width = tRect.width
    indicator.height = tRect.height
    indicator.show = true
  }

  function onLeave() {
    indicator.show = false
  }

  return {
    container,
    indicator,
    indicatorStyle,
    onEnter,
    onLeave,
  }
}
