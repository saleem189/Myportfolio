<template>
  <Section id="portfolio" title="My Projects">
    <!-- Filter Buttons -->
    <div class="mb-8 flex flex-wrap gap-3 justify-center">
      <Button
        v-for="category in categories"
        :key="category"
        @click="setFilter(category)"
        :variant="filter === category ? 'primary' : 'default'"
        size="sm"
      >
        {{ category }}
      </Button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      <article 
        v-for="project in filteredProjects" 
        :key="project.id || project.name" 
        class="h-full flex"
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
          @show-modal="showModalFn"
        />
      </article>
    </div>

    <!-- Modal for Project Details - Teleported to body -->
    <Teleport to="body">
      <transition name="modal">
        <ProjectModal
          v-if="showModal"
          :portfolio="modalInfo"
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
import Button from './helpers/Button.vue';
import info from "../../info";
import { useAnalytics } from "@/composables/useAnalytics";

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

const { trackPortfolioFilter, trackPortfolioClick, trackSectionView } = useAnalytics();

const setFilter = (category) => {
  filter.value = category;
  trackPortfolioFilter(category);
};

const showModalFn = (project) => {
  modalInfo.value = project;
  showModal.value = true;
  document.body.classList.add('modal-open');
  trackPortfolioClick(project.name, 'development');
};

const closeModal = () => {
  showModal.value = false;
  document.body.classList.remove('modal-open');
};

// Track portfolio section view
onMounted(() => {
  trackSectionView('portfolio', 'Portfolio Section');
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
