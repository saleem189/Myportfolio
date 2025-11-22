<template>
  <nav :class="[
    'sticky top-0 z-50 border-b-2 px-6 py-4 flex justify-between items-center shadow-sm transition-colors',
    themeClasses.themeClass('bg-[#fdfbf7] border-gray-800', 'bg-[#1a202c] border-slate-600')
  ]">
      <div class="text-2xl font-bold flex items-center gap-2">
      <PenTool :size="24" :class="themeClasses.themeClass('text-blue-700', 'text-blue-400')" />
      <span :class="themeClasses.classes.textHeading()">
        {{ info.logo_name }}<span :class="themeClasses.themeClass('text-blue-600', 'text-blue-300')">.notes</span>
      </span>
    </div>
    
    <!-- Desktop Menu -->
    <div class="hidden md:flex gap-6 text-xl">
      <a 
        v-for="item in navItems" 
        :key="item"
        :href="`#${item.toLowerCase()}`"
        @click.prevent="handleSmoothScroll($event, item.toLowerCase())"
        :class="[
          'nav-link transition-colors',
          themeClasses.classes.linkNav()
        ]"
      >
        {{ item }}
      </a>
    </div>

    <!-- Mobile Menu Button -->
    <Button
      :class="'md:hidden'"
      size="lg"
      @click="toggleMenu"
      aria-label="Toggle menu"
    >
      <template #icon-left>
        <X v-if="isMenuOpen" :size="20" />
        <Menu v-else :size="20" />
      </template>
    </Button>

    <!-- Desktop Actions -->
    <div class="hidden md:flex items-center gap-4">
      <!-- Night Mode Toggle -->
      <button
        @click="toggleNightMode"
        :class="[
          'sketchy-border px-3 py-1 transition-all',
          themeClasses.themeClass(
            'bg-white text-gray-800 hover:bg-gray-50 border-gray-800',
            'bg-slate-800 text-yellow-400 hover:bg-slate-700 border-yellow-400'
          )
        ]"
        aria-label="Toggle Theme"
      >
        <Sun v-if="theme.nightMode.value" :size="20" />
        <Moon v-else :size="20" />
      </button>
      <!-- Resume Button -->
      <Button
        size="lg"
        @click="openResumeModal"
      >
        <template #icon-right>
          <Download :size="18" />
        </template>
        Resume
      </Button>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" :class="[
      'absolute top-full left-0 right-0 border-b-2 shadow-lg md:hidden transition-colors',
      themeClasses.themeClass('bg-[#fdfbf7] border-gray-800', 'bg-[#1a202c] border-slate-600')
    ]">
      <div class="flex flex-col p-4 gap-4">
        <a 
          v-for="item in navItems"
          :key="item"
          :href="`#${item.toLowerCase()}`"
          @click.prevent="handleSmoothScroll($event, item.toLowerCase())"
          :class="[
            'text-xl py-2 nav-link transition-colors',
            themeClasses.classes.linkNav()
          ]"
        >
          {{ item }}
        </a>
        <Button
          size="lg"
          @click="toggleNightMode"
        >
          <template #icon-left>
            <Sun v-if="theme.nightMode.value" :size="20" />
            <Moon v-else :size="20" />
          </template>
          {{ themeClasses.isDark.value ? 'Light Mode' : 'Dark Mode' }}
        </Button>
        <Button
          size="lg"
          @click="openResumeModal"
        >
          <template #icon-right>
            <Download :size="18" />
          </template>
          Resume
        </Button>
      </div>
    </div>
  </nav>

  <!-- Resume Modal -->
  <ResumeModal
    :isOpen="isResumeModalOpen"
    :resumeUrl="info.links.resume"
    @close="closeResumeModal"
  />
</template>

<script setup>
import { ref, inject } from 'vue';
import { PenTool, Moon, Sun, Download, Menu, X } from 'lucide-vue-next';
import info from "../../info";
import ResumeModal from "./helpers/ResumeModal.vue";
import Button from "./helpers/Button.vue";
import { useThemeClasses } from '@/composables/useThemeClasses';

const emit = defineEmits(['scroll']);

// Inject theme from Provider
const theme = inject('theme', {
  nightMode: ref(false),
  toggleNightMode: () => {}
});

// Use theme classes utility
const themeClasses = useThemeClasses();

const navItems = ['Skills', 'Experience', 'Portfolio', 'Education', 'Contact'];
const isMenuOpen = ref(false);
const isResumeModalOpen = ref(false);

const openResumeModal = (event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  isResumeModalOpen.value = true;
  isMenuOpen.value = false;
};

const closeResumeModal = () => {
  isResumeModalOpen.value = false;
};

const toggleNightMode = () => {
  if (theme && theme.toggleNightMode) {
    theme.toggleNightMode();
  }
  // Close mobile menu
  isMenuOpen.value = false;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleSmoothScroll = (e, targetId) => {
  e.preventDefault();
  // Map "Portfolio" to "portfolio" section ID
  const sectionId = targetId === 'portfolio' ? 'portfolio' : targetId;
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = 80; // Approximate navbar height
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    isMenuOpen.value = false;
    emit('scroll', sectionId);
  }
};
</script>

<style scoped>
/* Navbar styles are handled by Tailwind classes and global styles */
</style>
