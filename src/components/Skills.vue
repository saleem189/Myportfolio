<template>
  <Section
    id="skills"
    title="My Toolbelt"
  >
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <StickyNote
        v-for="(skill, idx) in skills"
        :key="skill.title || skill.category"
        :title="skill.title || skill.category"
        :color-light="lightColors[idx % lightColors.length]"
        :color-dark="darkColors[idx % darkColors.length]"
      >
        <ul class="list-disc pl-5 space-y-1">
          <li
            v-for="(item, itemIdx) in skill.info"
            :key="itemIdx"
          >
            {{ item }}
          </li>
        </ul>
      </StickyNote>
    </div>
  </Section>
</template>

<script setup>
import Section from './helpers/Section.vue';
import StickyNote from './helpers/StickyNote.vue';
import { onMounted } from 'vue';
import info from '../../info';
import { useAnalytics } from '@/composables/useAnalytics';

const skills = info.skills;
const lightColors = [
  'bg-yellow-100',
  'bg-blue-100',
  'bg-green-100',
  'bg-pink-100',
  'bg-purple-100',
  'bg-orange-100',
  'bg-cyan-100',
];
const darkColors = [
  'bg-yellow-900/50',
  'bg-blue-900/50',
  'bg-green-900/50',
  'bg-pink-900/50',
  'bg-purple-900/50',
  'bg-orange-900/50',
  'bg-cyan-900/50',
];

const { trackSectionView } = useAnalytics();

// Track skills section view
onMounted(() => {
  trackSectionView('skills', 'Skills Section');
});
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>
