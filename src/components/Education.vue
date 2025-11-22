<template>
  <Section id="education" title="Education" :nightMode="nightMode">
    <div class="grid md:grid-cols-2 gap-8">
      <div 
        v-for="edu in education" 
        :key="edu.id" 
        :class="[
          'p-6 sketchy-border transform hover:-translate-y-1 transition-all duration-300 relative',
          nightMode ? 'bg-slate-800 text-gray-200' : 'bg-white text-gray-800'
        ]"
      >
        <div :class="['absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6', nightMode ? 'tape-dark' : 'tape']"></div>
        
        <h3 :class="['text-2xl font-bold mb-2 transition-colors', nightMode ? 'text-blue-300' : 'text-blue-800']">{{ edu.degree }}</h3>
        <h4 :class="['text-xl font-semibold mb-2 transition-colors', nightMode ? 'text-gray-200' : 'text-gray-700']">{{ edu.name || edu.school }}</h4>
        
        <div :class="['mb-3 transition-colors', nightMode ? 'text-gray-300' : 'text-gray-600']">
          <p class="text-sm">📍 {{ edu.place }}</p>
          <p class="text-sm">📅 {{ edu.date || edu.year }}</p>
        </div>
        
        <p v-if="edu.description" :class="['mb-4 leading-relaxed transition-colors', nightMode ? 'text-gray-300' : 'text-gray-700']">
          {{ edu.description }}
        </p>
        
        <div v-if="edu.skills && edu.skills.length > 0">
          <h5 :class="['font-bold text-sm mb-2 transition-colors', nightMode ? 'text-gray-300' : 'text-gray-600']">Key Focus Areas:</h5>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(skill, idx) in edu.skills" 
              :key="idx" 
              :class="[
                'text-xs border px-2 py-1 rounded transition-colors',
                nightMode ? 'bg-slate-700 border-slate-600 text-gray-300' : 'bg-blue-100 border-blue-300 text-blue-700'
              ]"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup>
import Section from './helpers/Section.vue';
import { onMounted } from 'vue';
import info from "../../info";

const props = defineProps({
  nightMode: Boolean
});

const education = info.education;

// Track education section view
onMounted(() => {
  if (window.gtag) {
    window.gtag('event', 'section_view', {
      section_name: 'education',
      section_title: 'Education Section',
      page_location: window.location.href,
      timestamp: new Date().toISOString()
    });
  }
});
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>

