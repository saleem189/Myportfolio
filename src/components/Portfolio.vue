<template>
  <Section id="portfolio" title="My Projects" :nightMode="props.nightMode">
    <!-- Filter Buttons -->
    <div class="mb-8 flex flex-wrap gap-3 justify-center">
      <button
        v-for="category in categories"
        :key="category"
        @click="setFilter(category)"
        :class="[
          'sketchy-border px-4 py-2 text-sm font-bold transition-colors',
          filter === category
            ? 'bg-blue-600 text-white'
            : props.nightMode
              ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              : 'bg-white text-gray-700 hover:bg-gray-50'
        ]"
      >
        {{ category }}
      </button>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id || project.name" 
        class="transform hover:rotate-1 transition-transform duration-300"
      >
        <IndexCard 
          :name="project.name"
          :title="project.title || project.name"
          :type="project.type"
          :category="project.category"
          :technologies="project.technologies"
          :description="project.description"
          :visit="project.visit"
          :github="project.github"
          :pictures="project.pictures"
          :nightMode="props.nightMode"
          @show-modal="showModalFn"
        />
      </div>
    </div>

    <!-- Modal for Project Details - Teleported to body -->
    <Teleport to="body">
      <transition name="modal">
        <ProjectModal
          v-if="showModal"
          :portfolio="modalInfo"
          :nightMode="props.nightMode"
          @close="closeModal"
        />
      </transition>
    </Teleport>
  </Section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Section from './helpers/Section.vue';
import IndexCard from './helpers/IndexCard.vue';
import ProjectModal from './helpers/ProjectModal.vue';
import info from "../../info";

const props = defineProps({
  nightMode: Boolean
});

const filter = ref('All');
const projects = info.portfolio;
const showModal = ref(false);
const modalInfo = ref({});

const categories = computed(() => {
  const allCategories = new Set();
  projects.forEach(p => {
    // Support both single category and multiple categories
    if (p.categories && Array.isArray(p.categories)) {
      p.categories.forEach(cat => allCategories.add(cat));
    } else if (p.category) {
      allCategories.add(p.category);
    } else if (p.type) {
      allCategories.add(p.type);
    }
  });
  return ['All', ...Array.from(allCategories)].filter(c => c);
});

const filteredProjects = computed(() => {
  if (filter.value === 'All') {
    return projects;
  }
  return projects.filter(p => {
    // Check if project belongs to the selected category
    if (p.categories && Array.isArray(p.categories)) {
      return p.categories.includes(filter.value);
    }
    return (p.category || p.type) === filter.value;
  });
});

const setFilter = (category) => {
  filter.value = category;
  
  // Track filter usage
  if (window.gtag) {
    window.gtag('event', 'portfolio_filter', {
      filter_category: category,
      page_location: window.location.href
    });
  }
};

const showModalFn = (project) => {
  modalInfo.value = project;
  showModal.value = true;
  document.body.classList.add('modal-open');
  
  // Track portfolio project click
  if (window.gtag) {
    window.gtag('event', 'portfolio_project_click', {
      project_name: project.name,
      project_category: 'development',
      page_location: window.location.href,
      timestamp: new Date().toISOString()
    });
  }
};

const closeModal = () => {
  showModal.value = false;
  document.body.classList.remove('modal-open');
};

// Track portfolio section view
onMounted(() => {
  if (window.gtag) {
    window.gtag('event', 'section_view', {
      section_name: 'portfolio',
      section_title: 'Portfolio Section',
      page_location: window.location.href,
      timestamp: new Date().toISOString()
    });
  }
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
