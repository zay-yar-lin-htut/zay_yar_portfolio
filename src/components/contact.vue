<script setup lang="ts">
import { reactive, ref } from 'vue'
import ContentBox from '@/components/ui/ContentBox.vue'
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
</script>

<template>
  <section class="w-full px-6 sm:px-8 lg:px-12 py-20 lg:py-32 border-t" style="border-color: var(--border-color);" id="contact">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20">
        <span class="text-sm font-mono uppercase tracking-wider" style="color: var(--purple);">{{ t('contact.subtitle') }}</span>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 section-title">
          {{ t('contact.title') }}
        </h2>
      </div>

      <div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
        <!-- Contact info -->
        <div class="lg:w-1/2">
          <ContentBox padding="p-8" custom-class="h-full">
            <h3 class="text-2xl font-bold mb-6 section-title">Let's work together</h3>
            <p class="text-lg leading-relaxed mb-8" :style="{ color: 'var(--text-secondary)' }">
              [Add a brief message about how you can help others or what kind of opportunities you're looking for.]
            </p>

            <div class="space-y-6">
              <!-- Email -->
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
                  <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-mono" :style="{ color: 'var(--text-muted)' }">Email</p>
                  <p class="section-title">[your.email@example.com]</p>
                </div>
              </div>

              <!-- Location -->
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #a855f7, #c084fc);">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-mono" :style="{ color: 'var(--text-muted)' }">Location</p>
                  <p class="section-title">[Your City, Country]</p>
                </div>
              </div>

              <!-- GitHub -->
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
                  <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-mono" :style="{ color: 'var(--text-muted)' }">GitHub</p>
                  <p class="section-title">[github.com/yourusername]</p>
                </div>
              </div>

              <!-- LinkedIn -->
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #a855f7, #c084fc);">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-mono" :style="{ color: 'var(--text-muted)' }">LinkedIn</p>
                  <p class="section-title">[linkedin.com/in/yourusername]</p>
                </div>
              </div>
            </div>
          </ContentBox>
        </div>

        <!-- Contact form -->
        <div class="lg:w-1/2">
          <ContentBox padding="p-8">
            <div v-if="submitted" class="mb-6 p-4 rounded-lg text-center font-mono" style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); color: var(--cyan);">
              Message sent! I'll get back to you soon.
            </div>
            <form @submit.prevent="handleSubmit">
              <div class="space-y-6">
                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-mono mb-2" :style="{ color: 'var(--text-secondary)' }">{{ t('contact.name') }}</label>
                    <input
                      v-model="form.name"
                      type="text"
                      :placeholder="t('contact.namePlaceholder')"
                      required
                      class="w-full px-4 py-3 rounded-lg input-field"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-mono mb-2" :style="{ color: 'var(--text-secondary)' }">{{ t('contact.email') }}</label>
                    <input
                      v-model="form.email"
                      type="email"
                      :placeholder="t('contact.emailPlaceholder')"
                      required
                      class="w-full px-4 py-3 rounded-lg input-field"
                    >
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-mono mb-2" :style="{ color: 'var(--text-secondary)' }">{{ t('contact.subject') }}</label>
                  <input
                    v-model="form.subject"
                    type="text"
                    :placeholder="t('contact.subjectPlaceholder')"
                    required
                    class="w-full px-4 py-3 rounded-lg input-field"
                  >
                </div>

                <div>
                  <label class="block text-sm font-mono mb-2" :style="{ color: 'var(--text-secondary)' }">{{ t('contact.message') }}</label>
                  <textarea
                    v-model="form.message"
                    rows="5"
                    :placeholder="t('contact.messagePlaceholder')"
                    required
                    class="w-full px-4 py-3 rounded-lg input-field resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="w-full py-4 rounded-lg font-mono font-bold text-white transition-all duration-200 hover:opacity-90"
                  style="background: linear-gradient(135deg, #a855f7, #c084fc);"
                >
                  {{ t('contact.sendBtn') }}
                </button>
              </div>
            </form>
          </ContentBox>
        </div>
      </div>
    </div>
  </section>
</template>

