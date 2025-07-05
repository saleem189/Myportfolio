<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from "@/components/Navbar.vue";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import Skills from "@/components/Skills.vue";
import Portfolio from "@/components/Portfolio.vue";
import Recommendation from "@/components/Recommendation.vue";
import Contact from "@/components/Contact.vue";
import Footer from "@/components/Footer.vue";
import ViewCounter from "@/components/ViewCounter.vue";
import BackToTop from "@/components/BackToTop.vue";
import SEOHead from "@/components/SEOHead.vue";
import { useCookies } from "vue3-cookies";
import info from "../info";

const { cookies } = useCookies();
const router = useRouter()
const route = useRoute()

const nightMode = ref(false);
if (info.config.use_cookies) {
  nightMode.value = cookies.get("nightMode") === "true" ? true : false;
}

onMounted(() => {
  // Handle initial route
  const path = route.path;
  if (path !== '/') {
    const section = path.substring(1); // Remove leading slash
    const element = document.getElementById(section);
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
  if (info.config.use_cookies) {
    cookies.set("nightMode", mode);
  }
  nightMode.value = mode;
};

const scrollTo = (ele) => {
  if (ele === "home") {
    router.push('/');
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    router.push(`/${ele}`);
    const element = document.getElementById(ele);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 35,
        behavior: "smooth"
      });
    }
  }
};
</script>

<template>
  <div :class="{ 'text-dark': !nightMode, 'text-light': nightMode }" class="app-container">
    <SEOHead />
    <Navbar @scroll="scrollTo" @nightMode="switchMode" :nightMode="nightMode" />
    <main class="main-content">
      <section class="section home-section">
        <Home :nightMode="nightMode" />
      </section>
      
      <section id="about" class="section about-section">
        <About :nightMode="nightMode" />
      </section>
      
      <section id="skills" class="section skills-section">
        <Skills :nightMode="nightMode" />
      </section>

      <section v-if="info.config.show_recommendations" id="recommendations" class="section recommendations-section">
        <Recommendation :nightMode="nightMode" />
      </section>
      
      <section id="portfolio" class="section portfolio-section">
        <Portfolio :nightMode="nightMode" />
      </section>
      
      <section id="contact" class="section contact-section">
        <Contact :nightMode="nightMode" />
      </section>
    </main>

    <aside class="floating-elements">
      <ViewCounter class="view-counter-container" :nightMode="nightMode" />
      <BackToTop :nightMode="nightMode" />
    </aside>

    <Footer :nightMode="nightMode" />
  </div>
</template>

<style>
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-dark);
  width: 100%;
}

@media screen and (max-width: 580px) {
  #app {
    width: fit-content;
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
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--light-grey);
  border-radius: 9px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--medium-grey);
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
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.text-light .view-counter-container {
  background: rgba(31, 41, 55, 0.9);
}

.recommendations-section {
  background-color: var(--very-light-grey);
}

.text-light .recommendations-section {
  background-color: var(--bg-dark2);
}
</style>