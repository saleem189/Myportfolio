<template>
  <Section
    id="training"
    title="Training & Certifications"
  >
    <div
      :class="[
        'relative border-l-4 ml-4 space-y-12 transition-colors',
        themeClasses.classes.border(),
      ]"
    >
      <article
        v-for="training in trainingExperience"
        :key="training.id || training.name"
        class="relative pl-8"
      >
        <!-- Timeline Dot -->
        <div
          :class="[
            'absolute -left-[14px] top-2 w-6 h-6 border-4 rounded-full transition-colors',
            themeClasses.themeClass('bg-white border-gray-800', 'bg-slate-900 border-slate-500'),
          ]"
        />

        <div class="mb-2">
          <h3 :class="['text-2xl font-bold transition-colors', themeClasses.classes.textHeading()]">
            {{ training.role || training.position }}
          </h3>
          <div
            :class="[
              'text-lg flex items-center gap-2 flex-wrap transition-colors',
              themeClasses.classes.textMuted(),
            ]"
          >
            <span :class="['font-bold', themeClasses.themeClass('text-blue-700', 'text-blue-400')]">@ {{ training.company || training.name }}</span>
            <time
              v-if="training.period || training.date"
              :datetime="training.period || training.date"
              :class="['text-sm border px-2 rounded-full', themeClasses.classes.borderSecondary()]"
            >{{ training.period || training.date }}</time>
            <span
              v-if="training.location"
              :class="['text-sm', themeClasses.classes.textMuted()]"
            >📍 {{ training.location }}</span>
          </div>
        </div>

        <p
          v-if="training.description"
          :class="[
            'mb-4 leading-relaxed text-lg transition-colors',
            themeClasses.classes.textSecondary(),
          ]"
        >
          {{ training.description }}
        </p>

        <div
          v-if="training.achievements && training.achievements.length > 0"
          class="mb-4"
        >
          <h4 :class="['font-bold text-lg mb-2 transition-colors', themeClasses.classes.text()]">
            Key Achievements:
          </h4>
          <ul class="space-y-2 text-lg">
            <li
              v-for="(item, i) in training.achievements"
              :key="i"
              :class="[
                'flex items-start gap-2 transition-colors',
                themeClasses.classes.textSecondary(),
              ]"
            >
              <span
                :class="[
                  'font-bold text-xl leading-none',
                  themeClasses.themeClass('text-blue-500', 'text-blue-400'),
                ]"
              >→</span>
              <span class="leading-relaxed">{{ item }}</span>
            </li>
          </ul>
        </div>

        <div
          v-if="training.skills && training.skills.length > 0"
          class="mt-4"
        >
          <h4
            :class="['font-bold text-sm mb-2 transition-colors', themeClasses.classes.textMuted()]"
          >
            Technologies Learned:
          </h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(skill, idx) in training.skills"
              :key="idx"
              :class="[
                'text-xs border px-2 py-1 rounded transition-colors',
                themeClasses.themeClass(
                  'bg-gray-100 border-gray-300 text-gray-600',
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
import { computed, onMounted } from 'vue';
import info from '../../info';
import { useAnalytics } from '@/composables/useAnalytics';
import { useThemeClasses } from '@/composables/useThemeClasses';

const themeClasses = useThemeClasses();

// Filter only training experiences
const trainingExperience = computed(() => {
  return info.experience.filter(
    (exp) =>
      exp.position?.toLowerCase().includes('trainee') ||
      exp.position?.toLowerCase().includes('training') ||
      exp.role?.toLowerCase().includes('trainee') ||
      exp.role?.toLowerCase().includes('training')
  );
});

const { trackSectionView } = useAnalytics();

// Track training section view
onMounted(() => {
  trackSectionView('training', 'Training Section');
});
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>
