<template>
  <Section id="experience" title="Work History" :nightMode="nightMode">
    <div :class="[
      'relative border-l-4 ml-4 space-y-12 transition-colors',
      nightMode ? 'border-slate-600' : 'border-gray-800'
    ]">
      <div v-for="job in professionalExperience" :key="job.id || job.name" class="relative pl-8">
        <!-- Timeline Dot -->
        <div :class="[
          'absolute -left-[14px] top-2 w-6 h-6 border-4 rounded-full transition-colors',
          nightMode ? 'bg-slate-900 border-slate-500' : 'bg-white border-gray-800'
        ]"></div>
        
        <div class="mb-2">
          <h3 :class="[
            'text-2xl font-bold transition-colors',
            nightMode ? 'text-gray-100' : 'text-gray-900'
          ]">{{ job.role || job.position }}</h3>
          <div :class="[
            'text-lg flex items-center gap-2 flex-wrap transition-colors',
            nightMode ? 'text-gray-400' : 'text-gray-600'
          ]">
            <span :class="['font-bold', nightMode ? 'text-blue-400' : 'text-blue-700']">@ {{ job.company || job.name }}</span>
            <span :class="[
              'text-sm border px-2 rounded-full',
              nightMode ? 'border-slate-600' : 'border-gray-600'
            ]">{{ job.period || job.date }}</span>
            <span v-if="job.location" :class="['text-sm', nightMode ? 'text-gray-400' : 'text-gray-500']">📍 {{ job.location }}</span>
          </div>
      </div>
        
        <p v-if="job.description" :class="[
          'mb-4 leading-relaxed text-lg transition-colors',
          nightMode ? 'text-gray-300' : 'text-gray-800'
        ]">
          {{ job.description }}
        </p>
        
        <div v-if="job.achievements && job.achievements.length > 0" class="mb-4">
          <h4 :class="[
            'font-bold text-lg mb-2 transition-colors',
            nightMode ? 'text-gray-100' : 'text-gray-800'
          ]">Key Achievements:</h4>
          <ul class="space-y-2 text-lg">
            <li v-for="(item, i) in job.achievements" :key="i" :class="[
              'flex items-start gap-2 transition-colors',
              nightMode ? 'text-gray-300' : 'text-gray-800'
            ]">
              <span :class="['font-bold text-xl leading-none', nightMode ? 'text-blue-400' : 'text-blue-500']">→</span>
              <span class="leading-relaxed">{{ item }}</span>
            </li>
          </ul>
        </div>

        <div v-if="job.skills && job.skills.length > 0" class="mt-4">
          <h4 :class="[
            'font-bold text-sm mb-2 transition-colors',
            nightMode ? 'text-gray-400' : 'text-gray-600'
          ]">Technologies Used:</h4>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(skill, idx) in job.skills.slice(0, 10)" 
              :key="idx" 
              :class="[
                'text-xs border px-2 py-1 rounded transition-colors',
                nightMode ? 'bg-slate-700 border-slate-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-600'
              ]"
            >
              {{ skill }}
            </span>
            <span :class="['text-xs px-2 py-1', nightMode ? 'text-gray-400' : 'text-gray-400']">
              +{{ job.skills.length - 10 }} more
            </span>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup>
import Section from './helpers/Section.vue';
import { defineProps, computed, onMounted } from 'vue'
import info from "../../info";

const props = defineProps({
  nightMode: Boolean
});

// Filter out training experiences for main display
const professionalExperience = computed(() => {
  return info.experience.filter(exp => 
    !exp.position?.toLowerCase().includes('trainee') && 
    !exp.position?.toLowerCase().includes('training') &&
    !exp.role?.toLowerCase().includes('trainee') &&
    !exp.role?.toLowerCase().includes('training')
  );
});

// Track experience section view
onMounted(() => {
  if (window.gtag) {
    window.gtag('event', 'section_view', {
      section_name: 'experience',
      section_title: 'Experience Section',
      page_location: window.location.href,
      timestamp: new Date().toISOString()
    });
  }
});
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>
