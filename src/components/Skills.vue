<template>
  <Section id="skills" title="My Toolbelt" :nightMode="nightMode">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <StickyNote 
        v-for="(skill, idx) in skills" 
        :key="skill.title || skill.category" 
        :title="skill.title || skill.category"
        :colorLight="lightColors[idx % lightColors.length]"
        :colorDark="darkColors[idx % darkColors.length]"
        :nightMode="nightMode"
      >
        <ul class="list-disc pl-5 space-y-1">
          <li v-for="(item, itemIdx) in skill.info" :key="itemIdx">{{ item }}</li>
        </ul>
      </StickyNote>
    </div>
  </Section>
</template>

<script setup>
import Section from './helpers/Section.vue';
import StickyNote from './helpers/StickyNote.vue';
import { defineProps, onMounted } from 'vue';
import info from "../../info";


const props = defineProps({
  nightMode: Boolean,
});

const skills = info.skills;
const lightColors = ["bg-yellow-100", "bg-blue-100", "bg-green-100", "bg-pink-100", "bg-purple-100", "bg-orange-100", "bg-cyan-100"];
const darkColors = ["bg-yellow-900/50", "bg-blue-900/50", "bg-green-900/50", "bg-pink-900/50", "bg-purple-900/50", "bg-orange-900/50", "bg-cyan-900/50"];

// Track skills section view
onMounted(() => {
  if (window.gtag) {
    window.gtag('event', 'section_view', {
      section_name: 'skills',
      section_title: 'Skills Section',
      page_location: window.location.href,
      timestamp: new Date().toISOString()
    });
  }
});
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>
