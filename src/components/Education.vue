<template>
  <Section
    id="education"
    title="Education"
  >
    <div class="grid md:grid-cols-2 gap-8">
      <article
        v-for="edu in education"
        :key="edu.id"
        :class="[
          'p-6 sketchy-border transform hover:-translate-y-1 transition-all duration-300 relative',
          themeClasses.themeClass('bg-white text-gray-800', 'bg-slate-800 text-gray-200'),
        ]"
      >
        <div
          :class="[
            'absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6',
            themeClasses.isDark.value ? 'tape-dark' : 'tape',
          ]"
        />

        <h3
          :class="[
            'text-2xl font-bold mb-2 transition-colors',
            themeClasses.themeClass('text-blue-800', 'text-blue-300'),
          ]"
        >
          {{ edu.degree }}
        </h3>
        <h4
          :class="[
            'text-xl font-semibold mb-2 transition-colors',
            themeClasses.classes.textSecondary(),
          ]"
        >
          {{ edu.name || edu.school }}
        </h4>

        <div :class="['mb-3 transition-colors', themeClasses.classes.textMuted()]">
          <p class="text-sm">
            📍 {{ edu.place }}
          </p>
          <p class="text-sm">
            📅
            <time
              v-if="edu.date || edu.year"
              :datetime="edu.date || edu.year"
            >{{
              edu.date || edu.year
            }}</time>
            <span v-else>📅 Date not specified</span>
          </p>
        </div>

        <p
          v-if="edu.description"
          :class="['mb-4 leading-relaxed transition-colors', themeClasses.classes.textSecondary()]"
        >
          {{ edu.description }}
        </p>

        <div v-if="edu.skills && edu.skills.length > 0">
          <h5
            :class="['font-bold text-sm mb-2 transition-colors', themeClasses.classes.textMuted()]"
          >
            Key Focus Areas:
          </h5>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(skill, idx) in edu.skills"
              :key="idx"
              :class="[
                'text-xs border px-2 py-1 rounded transition-colors',
                themeClasses.themeClass(
                  'bg-blue-100 border-blue-300 text-blue-700',
                  'bg-slate-700 border-slate-600 text-gray-300'
                ),
              ]"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </Section>
</template>

<script setup>
import Section from './helpers/Section.vue';
import { onMounted } from 'vue';
import info from '../../info';
import { useAnalytics } from '@/composables/useAnalytics';
import { useThemeClasses } from '@/composables/useThemeClasses';

const themeClasses = useThemeClasses();

const education = info.education;

const { trackSectionView } = useAnalytics();

// Track education section view
onMounted(() => {
  trackSectionView('education', 'Education Section');
});
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>
