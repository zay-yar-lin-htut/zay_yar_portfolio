<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = reactive({ name: '', email: '', subject: '', message: '' })
const submitted = ref(false)

function handleSubmit() {
  // TODO: Replace with your preferred form API (e.g. EmailJS, Formspree, etc.)
  console.log('Form submitted:', { ...form })
  submitted.value = true
  setTimeout(() => { submitted.value = false }, 4000)
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
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

const channels = [
  { id: 'email', label: 'Email', value: 'yaza9036@gmail.com', action: openEmail },
  { id: 'location', label: 'Location', value: 'Yangon, Myanmar', action: openLocation },
  { id: 'github', label: 'GitHub', value: 'zay-yar-lin-htut', action: openGitHub },
  { id: 'linkedin', label: 'LinkedIn', value: 'in/zay-yar-lin-htut', action: openLinkedIn }
]
</script>

<template>
  <section class="section py-24 lg:py-32" style="border-top: 1px solid var(--color-border);" id="contact">
    <div class="max-w-7xl mx-auto">
      <div class="section-head">
        <h2>{{ t('contact.title') }}</h2>
        <p>{{ t('contact.subtitle') }}</p>
      </div>

      <div class="grid lg:grid-cols-[0.9fr_1.4fr] gap-12 lg:gap-20">
        <!-- Contact channels -->
        <div class="space-y-3 self-start">
          <button
            v-for="channel in channels"
            :key="channel.id"
            @click="channel.action()"
            class="w-full text-left flex items-center justify-between gap-4 px-5 h-16 group cursor-pointer"
            style="border: 1px solid var(--color-border);"
          >
            <span>
              <span class="block font-mono text-xs mb-1" style="color: var(--color-text-secondary);">{{ channel.label }}</span>
              <span class="block font-mono text-sm group-hover:underline" style="color: var(--color-text-primary);">{{ channel.value }}</span>
            </span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: var(--color-text-secondary);">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>

        <!-- Minimal form -->
        <div class="max-w-xl">
          <div
            v-if="submitted"
            class="mb-6 px-4 py-3 font-mono text-sm"
            style="background: rgba(63, 185, 80, 0.1); border: 1px solid rgba(63, 185, 80, 0.35); color: #3FB950;"
          >
            {{ t('contact.submitted') }}
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="space-y-6">
              <div class="grid sm:grid-cols-2 gap-6">
                <div>
                  <label class="block font-mono text-sm mb-2" style="color: var(--color-text-secondary);">{{ t('contact.name') }}</label>
                  <input
                    v-model="form.name"
                    type="text"
                    :placeholder="t('contact.namePlaceholder')"
                    required
                    class="w-full px-4 h-12"
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
                    class="w-full px-4 h-12"
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
                  class="w-full px-4 h-12"
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
                  class="w-full px-4 py-3 resize-none"
                  style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary);"
                ></textarea>
              </div>

              <button
                type="submit"
                class="h-12 px-8 font-medium text-sm transition-opacity hover:opacity-85"
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