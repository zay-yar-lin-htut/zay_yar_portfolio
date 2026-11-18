<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { educationData } from '@/data';
import SecureCertificateViewer from '@/components/secureCertificateViewer.vue';

const { t } = useI18n();
const certificateSources = ref<readonly string[]>([]);
const certificateVerificationLinks = ref<readonly (string | undefined)[]>([]);
const certificateTitle = ref('');

function openCertificates(education: typeof educationData.educations[number]) {
  const certificates = education.certificates;
  certificateSources.value = certificates
    ? [certificates.cer, certificates.tran].filter((source): source is string => Boolean(source))
    : [];
  certificateVerificationLinks.value = certificates
    ? [certificates.cer_verification, certificates.tran_verification]
    : [];
  certificateTitle.value = t(education.title);
}

function closeCertificates() {
  certificateSources.value = [];
  certificateVerificationLinks.value = [];
  certificateTitle.value = '';
}
</script>

<template>
  <section class="section py-24 lg:py-32" style="border-top: 1px solid var(--color-border);" id="education">
    <div class="max-w-7xl mx-auto">
      <div class="section-head">
        <h2>{{ t(educationData.title) }}</h2>
        <p>{{ t(educationData.subtitle) }}</p>
      </div>

      <!-- Vertical timeline -->
      <div class="timeline">
        <div
          v-for="(edu, index) in educationData.educations"
          :key="edu.id"
          class="timeline-item"
        >
          <div class="timeline-dot" style="border-color: var(--color-accent);">
            <span class="timeline-dot-inner" style="background: var(--color-accent);"></span>
          </div>

          <div class="timeline-card education-card">
            <button
              v-if="edu.certificates"
              type="button"
              class="certificate-trigger"
              :aria-label="`View certificates for ${t(edu.title)}`"
              @click="openCertificates(edu)"
            >
              <span class="arrow-clip" aria-hidden="true">
                <svg class="arrow-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <span class="font-mono text-sm" style="color: var(--color-accent);">/* {{ t(edu.period) }} */</span>
              <span class="font-mono text-xs" style="color: var(--color-text-secondary);">0{{ index + 1 }}</span>
            </div>
            <h3 class="font-display text-xl mb-1" style="color: var(--color-text-primary);">{{ t(edu.title) }}</h3>
            <p class="font-mono text-sm mb-4" style="color: var(--color-text-secondary);">@ {{ t(edu.school) }}</p>
            <p class="text-sm leading-relaxed" style="color: var(--color-text-secondary);">
              {{ t(edu.description) }}
            </p>
            <div class="flex flex-wrap gap-2 mt-5">
              <span
                v-for="tag in edu.tags"
                :key="tag"
                class="px-3 py-1.5 font-mono text-xs"
                style="border: 1px solid var(--color-border); color: var(--color-text-secondary);"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Expertise — inline list, no card boxes -->
      <div class="mt-24">
        <h2 class="font-display" style="font-size: 1.5rem; margin-bottom: 1.5rem; color: var(--color-text-primary);">{{ t(educationData.expertise) }}</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style="background: var(--color-background);">
          <div
            v-for="skill in educationData.expertiseCards"
            :key="skill.id"
            class="p-6"
            style="background: var(--color-surface);"
          >
            <span class="font-mono text-sm" style="color: var(--color-accent);">0{{ skill.id }}</span>
            <h3 class="font-display text-lg mt-3 mb-1" style="color: var(--color-text-primary);">{{ t(skill.title) }}</h3>
            <p class="text-sm" style="color: var(--color-text-secondary);">{{ t(skill.subtitle) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <SecureCertificateViewer
    :sources="certificateSources"
    :verification-links="certificateVerificationLinks"
    :visible="certificateSources.length > 0"
    :title="certificateTitle"
    @close="closeCertificates"
  />
</template>

<style scoped>
.timeline {
  position: relative;
  margin-left: 0.625rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--color-border);
}

.timeline-item {
  position: relative;
  padding-left: 2.5rem;
  padding-bottom: 3.5rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -0.625rem;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-dot-inner {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.timeline-card {
  padding: 1.5rem;
}

.education-card {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding-right: 5rem;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
}

.education-card::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), transparent 42%);
  opacity: 0;
  transition: opacity 220ms ease;
}

.education-card:hover {
  z-index: 1;
  transform: translateY(-2px);
  background: color-mix(in srgb, var(--color-surface-raised) 38%, transparent) !important;
  border-color: color-mix(in srgb, var(--color-accent) 42%, transparent);
  backdrop-filter: blur(14px) saturate(145%);
  -webkit-backdrop-filter: blur(14px) saturate(145%);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(255, 255, 255, 0.06);
}

.education-card:hover::before {
  opacity: 1;
}

.certificate-trigger {
  position: absolute;
  top: 50%;
  right: 1.5rem;
  z-index: 2;
  display: inline-flex;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  color: var(--color-accent);
  background: transparent;
  opacity: 0;
  cursor: pointer;
  transform: translate(0, -50%);
  transition: opacity 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 220ms ease, transform 220ms ease;
}

.arrow-clip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  overflow: hidden;
}

.arrow-svg {
  width: 1.15rem;
  height: 1.15rem;
  display: block;
  flex-shrink: 0;
}

.education-card:hover .certificate-trigger,
.certificate-trigger:focus-visible {
  opacity: 1;
  border-color: color-mix(in srgb, var(--color-accent) 60%, transparent);
  background: color-mix(in srgb, var(--color-accent) 12%, transparent);
  transform: translate(0, -50%);
}

.certificate-trigger:hover {
  border-color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 22%, transparent);
  box-shadow: 0 0 18px color-mix(in srgb, var(--color-accent) 32%, transparent);
  transform: translate(2px, -50%);
  animation: trigger-pulse 1.2s ease-in-out infinite;
}

.certificate-trigger:hover .arrow-svg {
  animation: arrow-glide 1.05s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

@keyframes arrow-glide {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  38% {
    transform: translateX(135%);
    opacity: 0;
  }
  42% {
    transform: translateX(-135%);
    opacity: 0;
  }
  82%, 100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes trigger-pulse {
  0%, 100% {
    box-shadow: 0 0 12px color-mix(in srgb, var(--color-accent) 26%, transparent);
  }
  50% {
    box-shadow: 0 0 22px color-mix(in srgb, var(--color-accent) 48%, transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .certificate-trigger:hover,
  .certificate-trigger:hover .arrow-svg {
    animation: none;
  }
}

@media (max-width: 639px) {
  .certificate-trigger {
    right: 1rem;
    opacity: 0.8;
  }
}
</style>
