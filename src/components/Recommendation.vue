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
          >Recommendations.</span
        >
      </div>
      <hr
        width="50%"
        :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
      />
      <div class="row">
        <div
          class="col-xl-6 col-bg-6 col-md-6 col-sm-12 py-3 px-4"
          v-for="recommendation in recommendations"
          :key="recommendation.author"
        >
          <div class="recommendation-card" :class="{ 'dark-card': nightMode }">
            <div
              class="title2"
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
            >
              <span>"{{ recommendation.title }}"</span>
            </div>
            <div
              class="title3"
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
            >
              <span>
                – {{ recommendation.author }}, {{ recommendation.position }}, {{ recommendation.company }},
                {{ recommendation.location }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import info from "../../info";
import { ref, defineProps } from 'vue';

const props = defineProps({
  nightMode: {
    type: Boolean,
    required: true
  }
});

const recommendations = info.recommendations;
</script>

<style scoped>
.title {
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 1rem;
}

.title2 {
  font-size: 18px;
  font-weight: 400;
  font-style: italic;
  text-align: justify;
  margin-bottom: 1rem;
  line-height: 1.6;
  color: inherit;
}

.title3 {
  opacity: 0.8;
  font-size: 16px;
  font-weight: 400;
  text-align: right;
  margin-top: 1rem;
  color: inherit;
}

hr {
  margin: 1.5rem auto;
  opacity: 0.2;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.row {
  margin-top: 2rem;
}

.recommendation-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  height: 100%;
  transition: all 0.3s ease;
  border: 1px solid rgba(102, 157, 179, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.dark-card {
  background: rgba(38, 44, 48, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.recommendation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .recommendation-card {
    padding: 1.5rem;
  }
  
  .title2 {
    font-size: 16px;
  }
  
  .title3 {
    font-size: 14px;
  }
}
</style>
