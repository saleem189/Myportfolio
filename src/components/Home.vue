<template>
  <div class="min-h-[80vh] flex flex-col justify-center pl-4 sm:pl-6 md:pl-12 lg:pl-24 pr-4 sm:pr-6 relative">
    <div class="max-w-3xl">
      <div :class="[
        'inline-block border px-3 py-1 rounded-full text-sm font-bold mb-4 transform -rotate-2 transition-colors',
        themeClasses.themeClass('bg-blue-100 border-blue-300 text-blue-800', 'bg-blue-900 border-blue-700 text-blue-300')
      ]">
        Hello World! 👋
      </div>
      
      <h1 :class="[
        'text-6xl md:text-8xl font-bold mb-6 leading-tight transition-colors',
        themeClasses.classes.textHeading()
      ]">
        I Build <span class="relative inline-block">
          Scalable
          <svg :class="[
            'absolute w-full h-3 -bottom-1 left-0',
            themeClasses.themeClass('text-blue-500', 'text-blue-400')
          ]" viewBox="0 0 100 10" preserveAspectRatio="none">
             <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
          </svg>
        </span> <br/>
        Web Systems.
      </h1>
      
      <p :class="[
        'text-2xl mb-8 leading-loose max-w-2xl p-4 rounded border shadow-sm transform rotate-1 transition-colors',
        themeClasses.themeClass('bg-white/50 border-gray-200 text-gray-600', 'bg-slate-800/50 border-slate-700 text-gray-300')
      ]">
        I'm <span :class="['font-bold', themeClasses.themeClass('text-black', 'text-white')]">{{ info.name }}</span>. 
        A <span :class="themeClasses.classes.textMuted()">{{ info.role }}</span> with <span :class="['font-bold', themeClasses.themeClass('text-blue-700', 'text-white')]">{{ info.totalExperience.years }}+ years</span> of experience who loves turning messy problems into clean, 
        <span :class="[
          'px-1 mx-1',
          themeClasses.themeClass('bg-yellow-200 text-gray-900', 'bg-yellow-900 text-yellow-100')
        ]">optimized code.</span>
        Specializing in <span :class="['font-semibold', themeClasses.classes.textMuted()]">Laravel, Vue.js, Node.js, React</span> and modern cloud technologies. Currently based in <span :class="themeClasses.classes.textMuted()">{{ info.contact.location }}</span>.
      </p>

      <div class="flex gap-4 flex-wrap">
        <Button
          tag="a"
          href="#contact"
          variant="primary"
          size="lg"
          :class="themeClasses.themeClass('shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]', 'shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]')"
        >
          Hire Me
        </Button>
        <Button
          tag="a"
          :href="info.links.github"
          target="_blank"
          rel="noopener noreferrer"
          variant="default"
          size="lg"
        >
          <template #icon-left>
            <Github :size="20" />
          </template>
          Github
        </Button>
        <Button
          tag="a"
          :href="info.links.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          variant="default"
          size="lg"
        >
          <template #icon-left>
            <Linkedin :size="20" />
          </template>
          LinkedIn
        </Button>
      </div>
    </div>

    <!-- Decorative Doodles -->
    <div :class="[
      'absolute right-10 top-1/3 hidden lg:block opacity-20 rotate-12 transition-colors',
      themeClasses.classes.textMuted()
    ]">
      <Cpu :size="200" :stroke-width="1" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Github, Linkedin, Cpu } from 'lucide-vue-next';
import Button from './helpers/Button.vue';
import info from "../../info";
import { useAnalytics } from "@/composables/useAnalytics";
import { useThemeClasses } from "@/composables/useThemeClasses";

const themeClasses = useThemeClasses();
const { trackSectionView } = useAnalytics();

// Track home section view
onMounted(() => {
  trackSectionView('home', 'Home Section');
});
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>
