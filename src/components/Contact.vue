<template>
  <Section id="contact" title="Reach Out" :nightMode="nightMode">
    <div :class="[
      'p-8 sketchy-border max-w-2xl mx-auto transform rotate-1 transition-colors',
      nightMode ? 'bg-slate-800 text-gray-200' : 'bg-white text-gray-800'
    ]">
      <div class="flex flex-col items-center text-center">
        <div :class="[
          'w-16 h-16 rounded-full flex items-center justify-center border-2 border-dashed mb-4 transition-colors',
          nightMode ? 'bg-slate-700 border-slate-500' : 'bg-gray-100 border-gray-400'
        ]">
          <Mail :size="32" :class="nightMode ? 'text-slate-400' : 'text-gray-500'" />
        </div>
        <h3 :class="['text-2xl font-bold mb-2 transition-colors', nightMode ? 'text-gray-200' : 'text-gray-800']">Keep in Touch!</h3>
        <p :class="['text-xl mb-4 transition-colors', nightMode ? 'text-gray-300' : 'text-gray-700']">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <p :class="[
          'text-lg mb-8 px-4 py-2 rounded border inline-block transition-colors',
          nightMode ? 'bg-blue-900/30 border-blue-700 text-blue-300' : 'bg-blue-100 border-blue-300 text-blue-800'
        ]">
          ✈️ Available for remote opportunities
        </p>

        <!-- Contact Form (shown when showForm is true) -->
        <div v-if="showForm" class="w-full mb-4">
          <form
            :action="formspreeUrl"
            method="POST"
            @submit="handleSubmit"
            class="w-full space-y-4 text-left"
            data-formspree-redirect="false"
          >
          <div>
            <label for="name" :class="['block mb-2 font-bold text-lg', nightMode ? 'text-gray-200' : 'text-gray-800']">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="name"
              placeholder="Please enter your name here"
              :class="[
                'w-full px-4 py-3 sketchy-border transition-colors',
                nightMode ? 'bg-slate-700 border-slate-600 text-gray-200 placeholder-gray-400' : 'bg-white border-gray-800 text-gray-800 placeholder-gray-500'
              ]"
              @focus="trackFormInteraction('contact_form', 'name')"
              required
            />
          </div>

          <div>
            <label for="email" :class="['block mb-2 font-bold text-lg', nightMode ? 'text-gray-200' : 'text-gray-800']">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              v-model="email"
              placeholder="Please write your email here"
              :class="[
                'w-full px-4 py-3 sketchy-border transition-colors',
                nightMode ? 'bg-slate-700 border-slate-600 text-gray-200 placeholder-gray-400' : 'bg-white border-gray-800 text-gray-800 placeholder-gray-500'
              ]"
              @focus="trackFormInteraction('contact_form', 'email')"
              required
            />
          </div>

          <div>
            <label for="message" :class="['block mb-2 font-bold text-lg', nightMode ? 'text-gray-200' : 'text-gray-800']">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              v-model="text"
              placeholder="Please write your message here"
              rows="4"
              :class="[
                'w-full px-4 py-3 sketchy-border transition-colors resize-none',
                nightMode ? 'bg-slate-700 border-slate-600 text-gray-200 placeholder-gray-400' : 'bg-white border-gray-800 text-gray-800 placeholder-gray-500'
              ]"
              @focus="trackFormInteraction('contact_form', 'message')"
              required
            ></textarea>
          </div>

            <div class="flex gap-3">
              <button
                type="submit"
                :disabled="isSubmitting"
                :class="[
                  'flex-1 sketchy-border px-6 py-3 text-lg font-bold transition-colors flex items-center justify-center gap-2',
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : nightMode
                      ? 'bg-blue-700 hover:bg-blue-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                ]"
              >
                <Mail :size="20" />
                <span v-if="isSubmitting">Sending...</span>
                <span v-else>Send Message</span>
              </button>
              <button
                type="button"
                @click="showForm = false"
                :class="[
                  'sketchy-border px-6 py-3 text-lg font-bold transition-colors',
                  nightMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                ]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        
        <!-- Action Buttons (shown when form is hidden) -->
        <div v-else class="flex flex-col md:flex-row gap-4 w-full">
          <button 
            @click="showForm = true"
            :class="[
              'flex-1 sketchy-border p-4 text-center text-xl font-bold transition-colors flex items-center justify-center gap-2',
              nightMode ? 'bg-yellow-600 hover:bg-yellow-500 text-white' : 'bg-yellow-300 hover:bg-yellow-400 text-gray-900'
            ]"
          >
            <Mail :size="20" /> Email Me
          </button>
          <a 
            :href="`tel:${contactInfo.phone}`" 
            :class="[
              'flex-1 sketchy-border p-4 text-center text-xl font-bold transition-colors flex items-center justify-center gap-2',
              nightMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-gray-50 text-black'
            ]"
          >
            <Phone :size="20" /> Call Me
          </a>
        </div>

        <div class="mt-8 flex gap-6">
          <a 
            :href="info.links.linkedin" 
            :class="[
              'transition-colors',
              nightMode ? 'text-slate-500 hover:text-blue-400' : 'text-gray-500 hover:text-blue-700'
            ]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin :size="32" />
          </a>
          <a 
            :href="info.links.github" 
            :class="[
              'transition-colors',
              nightMode ? 'text-slate-500 hover:text-white' : 'text-gray-500 hover:text-black'
            ]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github :size="32" />
          </a>
        </div>
      </div>
    </div>
    
    <div :class="['text-center mt-12 text-lg transition-colors', nightMode ? 'text-slate-500' : 'text-gray-500']">
      <p>&copy; {{ new Date().getFullYear() }} {{ info.name }}.</p>
    </div>

    <Snackbar
      :showSnackbar="showSnackbar"
      @close="closeSnackbar"
      :snackbarMessage="snackbarMessage"
      :snackbarColor="snackbarColor"
    />
  </Section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Mail, Phone, Linkedin, Github } from 'lucide-vue-next';
import Section from './helpers/Section.vue';
import Snackbar from './helpers/Snackbar.vue';
import info from "../../info";
import { useAnalytics } from "@/composables/useAnalytics";

const props = defineProps({
  nightMode: {
    type: Boolean,
    default: false
  }
});

const email = ref("");
const name = ref("");
const text = ref("");
const showSnackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("");
const isSubmitting = ref(false);
const showForm = ref(false);

const formspreeUrl = computed(() => {
  // Use environment variable if available, otherwise fallback to info.js
  return import.meta.env.VITE_FORMSPREE_FORM_URL || info.contact?.formspreeEndpoint || 'https://formspree.io/f/YOUR_FORM_ID';
});

const contactInfo = computed(() => info.contact);
const { trackSectionView, trackFormInteraction, trackFormSubmit, trackFormError } = useAnalytics();

// Track contact page view
onMounted(() => {
  trackSectionView('contact', 'Contact Section');
});

const closeSnackbar = (val) => {
  showSnackbar.value = val;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  
  if (!email.value || !name.value || !text.value) {
    showSnackbar.value = true;
    snackbarMessage.value = "Please fill in all the fields";
    snackbarColor.value = "rgb(212, 149, 97)";
    trackFormError('contact_form', 'validation_error');
    return;
  }

  isSubmitting.value = true;

  try {
    const formData = new FormData(event.target);
    const response = await fetch(event.target.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      showSnackbar.value = true;
      snackbarMessage.value = "Thanks! Message received.";
      snackbarColor.value = "#1aa260";
      trackFormSubmit('contact_form', 1);
      
      // Reset form
      email.value = "";
      text.value = "";
      name.value = "";
      
      // Close form after successful submission
      setTimeout(() => {
        showForm.value = false;
      }, 2000);
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    showSnackbar.value = true;
    snackbarMessage.value = "Oops! Something went wrong.";
    snackbarColor.value = "rgb(212, 149, 97)";
    trackFormError('contact_form', 'submission_error');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>
