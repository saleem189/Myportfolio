<script setup>
import { defineAsyncComponent, onMounted, provide } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Home from '@/components/Home.vue';
import SEOHead from '@/components/SEOHead.vue';
import ViewCounter from '@/components/ViewCounter.vue';
import BackToTop from '@/components/BackToTop.vue';
import ErrorBoundary from '@/components/ErrorBoundary.vue';
import { useNightMode } from '@/composables/useNightMode';
import { useScrollTo } from '@/composables/useScrollTo';

// Lazy load below-the-fold components for better performance
const Skills = defineAsyncComponent(() => import('@/components/Skills.vue'));
const About = defineAsyncComponent(() => import('@/components/About.vue'));
const Portfolio = defineAsyncComponent(() => import('@/components/Portfolio.vue'));
const Education = defineAsyncComponent(() => import('@/components/Education.vue'));
const Contact = defineAsyncComponent(() => import('@/components/Contact.vue'));

const { nightMode, setNightMode, toggleNightMode } = useNightMode();
const { scrollToSection } = useScrollTo();
const route = useRoute();

// Provide theme to all child components using Provider pattern
provide('theme', {
  nightMode,
  setNightMode,
  toggleNightMode,
});

onMounted(() => {
  if (route.hash) {
    const element = document.querySelector(route.hash);
    if (element) {
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - 35,
          behavior: 'smooth',
        });
      }, 100);
    }
  }
});

const scrollTo = (ele) => {
  scrollToSection(ele);
};
</script>

<template>
  <ErrorBoundary>
    <div class="notebook-paper min-h-screen overflow-x-hidden w-full max-w-full">
      <SEOHead />
      <Navbar @scroll="scrollTo" />
      <main class="max-w-6xl mx-auto">
        <section class="section home-section">
          <Home />
        </section>

        <section
          id="skills"
          class="section skills-section"
        >
          <Skills />
        </section>

        <section
          id="experience"
          class="section experience-section"
        >
          <About />
        </section>

        <section
          id="portfolio"
          class="section portfolio-section"
        >
          <Portfolio />
        </section>

        <section
          id="education"
          class="section education-section"
        >
          <Education />
        </section>

        <section
          id="contact"
          class="section contact-section"
        >
          <Contact />
        </section>
      </main>

      <aside class="floating-elements">
        <ViewCounter class="view-counter-container" />
        <BackToTop />
      </aside>
    </div>
  </ErrorBoundary>
</template>

<style>
#app {
  font-family: 'Patrick Hand', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  width: 100%;
}

@media screen and (max-width: 580px) {
  #app {
    width: 100%;
    max-width: 100%;
  }
}

/* To set scrollbar width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--very-light-grey);
  border-radius: 9px;
  border: 2px solid var(--off-white);
  background-clip: content-box;
  transition: background-color 0.3s ease;
}

body.night-mode ::-webkit-scrollbar-track {
  background: #1a202c; /* slate-800 */
  border-color: #1a202c;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--light-grey);
  border-radius: 9px;
  transition: background-color 0.3s ease;
}

body.night-mode ::-webkit-scrollbar-thumb {
  background: #4a5568; /* slate-600 */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--medium-grey);
}

body.night-mode ::-webkit-scrollbar-thumb:hover {
  background: #718096; /* slate-500 */
}

.view-counter-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
}
</style>
