<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { contactChannels, contactIcons } from '@/data/contact'

const { t } = useI18n()

const form = reactive({ name: '', email: '', subject: '', message: '', website: '' })
const submitted = ref(false)
const errorMessage = ref('')
const submitting = ref(false)
const selectedFile = ref<File | null>(null)

function handleCredentialRequest(event: Event) {
  const projectTitle = (event as CustomEvent<{ projectTitle?: string }>).detail?.projectTitle
  if (!projectTitle) return

  form.subject = t('contact.credentialSubject', { project: projectTitle })
  form.message = t('contact.credentialMessage', { project: projectTitle })
  errorMessage.value = ''
}

onMounted(() => window.addEventListener('request-credentials', handleCredentialRequest))
onBeforeUnmount(() => window.removeEventListener('request-credentials', handleCredentialRequest))

async function handleSubmit() {
  errorMessage.value = ''
  if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
    errorMessage.value = t('contact.requiredError')
    return
  }
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errorMessage.value = t('contact.emailError')
    return
  }

  submitting.value = true

  try {
    const attachment = selectedFile.value
      ? { name: selectedFile.value.name, type: selectedFile.value.type, data: await readFileAsDataUrl(selectedFile.value) }
      : undefined
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, attachment })
    })

    if (!response.ok) {
      if (response.status === 429) {
        errorMessage.value = t('contact.rateLimitError')
      } else if (response.status === 413) {
        errorMessage.value = t('contact.attachmentError')
      } else {
        errorMessage.value = t('contact.error')
      }
      return
    }

    submitted.value = true
    setTimeout(() => { submitted.value = false }, 4000)
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    form.website = ''
    selectedFile.value = null
  } catch {
    errorMessage.value = t('contact.error')
  } finally {
    submitting.value = false
  }
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  selectedFile.value = file && file.size <= 3 * 1024 * 1024 ? file : null
  errorMessage.value = file && file.size > 3 * 1024 * 1024
    ? t('contact.attachmentError')
    : ''
}

function getContactIcon(icon: keyof typeof contactIcons) {
  return contactIcons[icon]
}
</script>

<template>
  <section class="section py-24 lg:py-32" style="border-top: 1px solid var(--color-border);" id="contact">
    <div class="max-w-7xl mx-auto">
      <div class="section-head">
        <h2>{{ t('contact.title') }}</h2>
        <p>{{ t('contact.subtitle') }}</p>
      </div>

        <div class="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-12 lg:gap-20 min-w-0">
        <!-- Contact channels -->
        <div class="space-y-3 self-start">
          <a
            v-for="channel in contactChannels"
            :key="channel.id"
            :href="channel.href"
            :target="channel.external ? '_blank' : undefined"
            :rel="channel.external ? 'noopener noreferrer' : undefined"
            class="w-full text-left flex items-center justify-between gap-4 px-5 h-16 group cursor-pointer transition-colors"
            style="border: 1px solid var(--color-border);"
          >
            <span class="flex items-center gap-4 min-w-0">
              <span class="shrink-0 flex items-center justify-center w-8 h-8" style="color: var(--color-accent); background: var(--color-surface-raised);">
            <svg class="w-4 h-4" :fill="['github', 'reddit'].includes(channel.icon) ? 'currentColor' : 'none'" :stroke="['github', 'reddit'].includes(channel.icon) ? 'none' : 'currentColor'" viewBox="0 0 24 24">
                  <path :d="getContactIcon(channel.icon)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                </svg>
              </span>
              <span class="min-w-0">
              <span class="block font-mono text-xs mb-1" style="color: var(--color-text-secondary);">{{ t(channel.label) }}</span>
                <span class="block font-mono text-sm truncate group-hover:underline" style="color: var(--color-text-primary);">{{ channel.value }}</span>
              </span>
            </span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: var(--color-text-secondary);">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

        <!-- Minimal form -->
        <div
          class="form-panel w-full max-w-xl min-w-0 p-6 sm:p-8 lg:p-10"
          style="background: var(--color-surface); border: 1px solid var(--color-border); border-top: 2px solid var(--color-accent);"
        >
          <div class="mb-8">
            <!-- <p class="font-mono text-xs uppercase tracking-[0.18em] mb-3" style="color: var(--color-accent);">04 / Contact</p> -->
            <h3 class="font-display text-2xl sm:text-3xl mb-2" style="color: var(--color-text-primary);">{{ t('contact.formTitle') }}</h3>
            <p class="text-sm leading-relaxed" style="color: var(--color-text-secondary);">{{ t('contact.formSubtitle') }}</p>
          </div>
          <div
            v-if="submitted"
            class="mb-6 px-4 py-3 font-mono text-sm"
            style="background: rgba(63, 185, 80, 0.1); border: 1px solid rgba(63, 185, 80, 0.35); color: #3FB950;"
          >
            {{ t('contact.submitted') }}
          </div>
          <div
            v-if="errorMessage"
            class="mb-6 px-4 py-3 font-mono text-sm"
            style="background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.35); color: #f85149;"
          >
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleSubmit" novalidate class="w-full min-w-0">
            <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" class="absolute -left-[9999px] h-px w-px opacity-0">
            <div class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block font-mono text-sm mb-2" style="color: var(--color-text-secondary);">{{ t('contact.name') }}</label>
                  <input
                    v-model="form.name"
                    type="text"
                    :placeholder="t('contact.namePlaceholder')"
                    required
                    class="w-full min-w-0 px-4 h-12"
                    style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary);"
                  >
                </div>
                <div>
                  <label class="block font-mono text-sm mb-2" style="color: var(--color-text-secondary);">{{ t('contact.email') }}</label>
                  <input
                    v-model="form.email"
                    type="email"
                    :placeholder="t('contact.emailPlaceholder')"
                    required
                    class="w-full min-w-0 px-4 h-12"
                    style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary);"
                  >
                </div>
              </div>

              <div>
                <label class="block font-mono text-sm mb-2" style="color: var(--color-text-secondary);">{{ t('contact.subject') }}</label>
                <input
                  v-model="form.subject"
                  type="text"
                  :placeholder="t('contact.subjectPlaceholder')"
                  required
                  class="w-full min-w-0 px-4 h-12"
                  style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary);"
                >
              </div>

              <div>
                <label class="block font-mono text-sm mb-2" style="color: var(--color-text-secondary);">{{ t('contact.message') }}</label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  :placeholder="t('contact.messagePlaceholder')"
                  required
                  class="w-full min-w-0 px-4 py-3 resize-none"
                  style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary);"
                ></textarea>
              </div>

              <div>
                <label class="block font-mono text-sm mb-2" style="color: var(--color-text-secondary);">{{ t('contact.attachment') }}</label>
                <input type="file" accept="image/*,.pdf,.doc,.docx,.zip" @change="handleFileChange" class="block w-full min-w-0 text-sm" style="color: var(--color-text-secondary);">
                <p class="font-mono text-xs mt-2" style="color: var(--color-text-secondary);">{{ t('contact.attachmentHint') }}</p>
              </div>

              <button
                type="submit"
                :disabled="submitting"
                class="w-full sm:w-auto h-12 px-8 font-medium text-sm transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
                style="background: var(--color-accent); color: #0E1116;"
              >
                {{ t('contact.sendBtn') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.form-panel input:not([type='file']),
.form-panel textarea {
  transition: border-color 160ms ease, background-color 160ms ease;
}

.form-panel input:not([type='file']):focus,
.form-panel textarea:focus {
  outline: none;
  border-color: var(--color-accent) !important;
  background: var(--color-surface-raised) !important;
}

.form-panel input[type='file']::file-selector-button {
  margin-right: 0.75rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface-raised);
  color: var(--color-text-primary);
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}
</style>
