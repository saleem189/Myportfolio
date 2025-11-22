<template>
  <div class="min-h-[80vh] flex flex-col justify-center pl-4 sm:pl-6 md:pl-12 lg:pl-24 pr-4 sm:pr-6 relative">
    <div class="max-w-3xl">
      <div :class="[
        'inline-block border px-3 py-1 rounded-full text-sm font-bold mb-4 transform -rotate-2 transition-colors',
        nightMode ? 'bg-blue-900 border-blue-700 text-blue-300' : 'bg-blue-100 border-blue-300 text-blue-800'
      ]">
        Hello World! 👋
      </div>
      
      <h1 :class="[
        'text-6xl md:text-8xl font-bold mb-6 leading-tight transition-colors',
        nightMode ? 'text-gray-100' : 'text-gray-800'
      ]">
        I Build <span class="relative inline-block">
          Scalable
          <svg :class="[
            'absolute w-full h-3 -bottom-1 left-0',
            nightMode ? 'text-blue-400' : 'text-blue-500'
          ]" viewBox="0 0 100 10" preserveAspectRatio="none">
             <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
          </svg>
        </span> <br/>
        Web Systems.
      </h1>
      
      <p :class="[
        'text-2xl mb-8 leading-loose max-w-2xl p-4 rounded border shadow-sm transform rotate-1 transition-colors',
        nightMode ? 'bg-slate-800/50 border-slate-700 text-gray-300' : 'bg-white/50 border-gray-200 text-gray-600'
      ]">
        I'm <span :class="['font-bold', nightMode ? 'text-white' : 'text-black']">{{ info.name }}</span>. 
        A <span :class="nightMode ? 'text-gray-300' : 'text-gray-600'">{{ info.role }}</span> with <span :class="['font-bold', nightMode ? 'text-white' : 'text-blue-700']">{{ info.totalExperience.years }}+ years</span> of experience who loves turning messy problems into clean, 
        <span :class="[
          'px-1 mx-1',
          nightMode ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-200 text-gray-900'
        ]">optimized code.</span>
        Specializing in <span :class="['font-semibold', nightMode ? 'text-gray-300' : 'text-gray-600']">Laravel, Vue.js, Node.js, React</span> and modern cloud technologies. Currently based in <span :class="nightMode ? 'text-gray-300' : 'text-gray-600'">{{ info.contact.location }}</span>.
      </p>

      <div class="flex gap-4 flex-wrap">
        <a href="#contact" :class="[
          'sketchy-border text-white px-8 py-3 text-xl transition-colors',
          nightMode 
            ? 'bg-blue-700 hover:bg-blue-600 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]' 
            : 'bg-blue-600 hover:bg-blue-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
        ]">
          Hire Me
        </a>
        <a :href="info.links.github" target="_blank" rel="noopener noreferrer" :class="[
          'sketchy-border px-8 py-3 text-xl flex items-center gap-2 transition-colors',
          nightMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-black hover:bg-gray-50'
        ]">
          <Github :size="20" /> Github
        </a>
        <a :href="info.links.linkedin" target="_blank" rel="noopener noreferrer" :class="[
          'sketchy-border px-8 py-3 text-xl flex items-center gap-2 transition-colors',
          nightMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-black hover:bg-gray-50'
        ]">
          <Linkedin :size="20" /> LinkedIn
        </a>
      </div>
    </div>

    <!-- Decorative Doodles -->
    <div :class="[
      'absolute right-10 top-1/3 hidden lg:block opacity-20 rotate-12 transition-colors',
      nightMode ? 'text-slate-600' : 'text-gray-400'
    ]">
      <Cpu :size="200" :stroke-width="1" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Github, Linkedin, Cpu } from 'lucide-vue-next';
import info from "../../info";
import { useAnalytics } from "@/composables/useAnalytics";

const props = defineProps({
  nightMode: {
    type: Boolean,
    default: false
  }
});

const { trackSectionView } = useAnalytics();

// Track home section view
onMounted(() => {
  trackSectionView('home', 'Home Section');
});
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>
