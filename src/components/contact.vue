<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { icons } from '@/data/icons'

const { t } = useI18n()

const form = reactive({ name: '', email: '', subject: '', message: '', website: '' })
const submitted = ref(false)
const errorMessage = ref('')
const submitting = ref(false)
const selectedFile = ref<File | null>(null)

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

    if (!response.ok) throw new Error('Contact request failed')

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

function openEmail() {
  window.location.href = 'mailto:yaza9036@gmail.com'
}

function openLocation() {
  window.open('https://maps.app.goo.gl/TYkxLRSmYVxAEXKG7', '_blank')
}

function openGitHub() {
  window.open('https://github.com/zay-yar-lin-htut', '_blank')
}

function openLinkedIn() {
  window.open('https://www.linkedin.com/in/zay-yar-lin-htut-290785326', '_blank')
}

function openFacebook() {
  window.open('https://www.facebook.com/linn34thant.maung', '_blank')
}

function openTwitter() {
  window.open('https://x.com/ZaYa05787606', '_blank')
}

function openReddit() {
  window.open('https://www.reddit.com/user/ZAWwanaHTOO', '_blank')
}

function openPhone(number: string) {
  window.location.href = `tel:${number.replace(/\s/g, '')}`
}

const contactIcons = {
  mail: 'M3 5h18v14H3V5Zm1 1 8 6 8-6',
  phone: 'M6.6 2.9 9 2.3l1.5 4.4-2 1.5a15.6 15.6 0 0 0 7.3 7.3l1.5-2 4.4 1.5-.6 2.4a2.4 2.4 0 0 1-2.7 1.8C10.6 18 6 13.4 4.8 7.6A2.4 2.4 0 0 1 6.6 2.9Z',
  location: 'M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Zm0-9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z',
  linkedin: 'M5 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 10h4v11H3V10Zm6 0h3.8v1.5h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21H9V10Z',
  facebook: 'M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1Z',
  twitter: 'M21 6.2c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.5.7-2.4.9A3.7 3.7 0 0 0 11.7 8c0 .3 0 .6.1.8a10.5 10.5 0 0 1-7.6-3.9 3.7 3.7 0 0 0 1.1 5 3.7 3.7 0 0 1-1.7-.5v.1c0 1.8 1.3 3.3 3.1 3.7-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.6 3.5 2.6A7.4 7.4 0 0 1 3 17.3 10.4 10.4 0 0 0 8.7 19c6.8 0 10.5-5.6 10.5-10.5v-.5c.7-.5 1.3-1.1 1.8-1.8Z',
  reddit: 'M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z'
}

function getContactIcon(icon: string) {
  return icon === 'github' ? icons.github : contactIcons[icon as keyof typeof contactIcons]
}

const channels = [
  { id: 'email', icon: 'mail', label: 'Email', value: 'yaza9036@gmail.com', action: openEmail },
  { id: 'phone-1', icon: 'phone', label: 'Phone', value: '+959 973944946', action: () => openPhone('+959973944946') },
  { id: 'phone-2', icon: 'phone', label: 'Phone', value: '+959 767520288', action: () => openPhone('+959767520288') },
  { id: 'location', icon: 'location', label: 'Location', value: 'Yangon, Myanmar', action: openLocation },
  { id: 'github', icon: 'github', label: 'GitHub', value: 'Zay Yar Lin Htut', action: openGitHub },
  { id: 'linkedin', icon: 'linkedin', label: 'LinkedIn', value: 'Zay Yar Lin Htut', action: openLinkedIn },
  { id: 'facebook', icon: 'facebook', label: 'Facebook', value: 'Zay Yar Lin Htut', action: openFacebook },
  { id: 'twitter', icon: 'twitter', label: 'Twitter / X', value: 'Zay Yar Lin Htut', action: openTwitter },
  { id: 'reddit', icon: 'reddit', label: 'Reddit', value: 'Ronim Hertz', action: openReddit }
]
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
          <button
            v-for="channel in channels"
            :key="channel.id"
            @click="channel.action()"
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
                <span class="block font-mono text-xs mb-1" style="color: var(--color-text-secondary);">{{ channel.label }}</span>
                <span class="block font-mono text-sm truncate group-hover:underline" style="color: var(--color-text-primary);">{{ channel.value }}</span>
              </span>
            </span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: var(--color-text-secondary);">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </button>
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
