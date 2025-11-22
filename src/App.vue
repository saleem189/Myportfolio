<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from "@/components/Navbar.vue";
import Home from "@/components/Home.vue";
import SEOHead from "@/components/SEOHead.vue";
import ViewCounter from "@/components/ViewCounter.vue";
import BackToTop from "@/components/BackToTop.vue";
import { useNightMode } from "@/composables/useNightMode";
import { useScrollTo } from "@/composables/useScrollTo";

// Lazy load below-the-fold components for better performance
const Skills = defineAsyncComponent(() => import("@/components/Skills.vue"));
const About = defineAsyncComponent(() => import("@/components/About.vue"));
const Portfolio = defineAsyncComponent(() => import("@/components/Portfolio.vue"));
const Education = defineAsyncComponent(() => import("@/components/Education.vue"));
const Contact = defineAsyncComponent(() => import("@/components/Contact.vue"));

const { nightMode, setNightMode } = useNightMode();
const { scrollToSection } = useScrollTo();
const route = useRoute();

onMounted(() => {
  if (route.hash) {
    const element = document.querySelector(route.hash);
    if (element) {
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - 35,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});

const switchMode = (mode) => {
  setNightMode(mode);
};

const scrollTo = (ele) => {
  scrollToSection(ele);
};


</script>

<template>
  <div class="notebook-paper min-h-screen overflow-x-hidden w-full max-w-full">
    <SEOHead />
    <Navbar @scroll="scrollTo" @nightMode="switchMode" :nightMode="nightMode" />
    <main class="max-w-6xl mx-auto">
      <section class="section home-section">
        <Home :nightMode="nightMode" />
      </section>
      
      <section id="skills" class="section skills-section">
        <Skills :nightMode="nightMode" />
      </section>

      <section id="experience" class="section experience-section">
        <About :nightMode="nightMode" />
      </section>
      
      <section id="portfolio" class="section portfolio-section">
        <Portfolio :nightMode="nightMode" />
      </section>

      <section id="education" class="section education-section">
        <Education :nightMode="nightMode" />
      </section>

      
      <section id="contact" class="section contact-section">
        <Contact :nightMode="nightMode" />
      </section>
    </main>

    <aside class="floating-elements">
      <ViewCounter class="view-counter-container" :nightMode="nightMode" />
      <BackToTop :nightMode="nightMode" />
    </aside>
  </div>
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

.parent {
  margin-top: 38px;
  padding-top: 40px;
  position: relative;
}

.pgray {
  color: var(--medium-grey);
}

.pblue {
  color: var(--light-blue);
}

.bg-dark2 {
  background-color: var(--bg-dark2) !important;
}

.text-light {
  color: var(--text-light) !important;
}

.p-st {
  transition: all 0.5s !important;
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

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: var(--error-color);
  color: var(--pure-white);
  border-radius: 8px;
  font-size: 10px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: var(--error-color);
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 10px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s, visibility 0.5s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.5s;
}

.view-counter-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
}

.recommendations-section {
  background-color: var(--very-light-grey);
}
</style>