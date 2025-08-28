<template>
  <div
    class="py-4 p-st"
    :class="{
      'bg-light': !nightMode,
      'bg-dark2': nightMode,
      'text-light': nightMode,
    }"
  >
    <div class="container">
      <div
        class="text-center"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="1000"
      >
        <span
          class="title text-center"
          :class="{ pgray: !nightMode, 'text-light': nightMode }"
        >Professional Summary.</span>
      </div>
      <hr
        width="50%"
        :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
      />
      <div class="row">
        <div class="col-xl-6 col-bg-6 col-md-6 col-sm-12">
          <Timeline :data="education" :nightMode="nightMode" />
        </div>
        <div class="col-xl-6 col-bg-6 col-md-6 col-sm-12">
          <Timeline :data="experience" :nightMode="nightMode" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Timeline from "./helpers/Timeline.vue";
import { defineProps, ref, onMounted } from 'vue'
import info from "../../info";

let { nightMode } = defineProps({
  nightMode: Boolean,
});

let education = ref({
  title: "education",
  data: info.education,
});

let experience = ref({
  title: "Professional Experience",
  data: info.experience,
});

// Track about section view
onMounted(() => {
  if (window.gtag) {
    window.gtag('event', 'section_view', {
      section_name: 'about',
      section_title: 'About Section',
      page_location: window.location.href,
      timestamp: new Date().toISOString()
    });
  }
});
</script>

<style scoped>
.title {
  font-size: 30px;
  font-weight: 500;
}
</style>
