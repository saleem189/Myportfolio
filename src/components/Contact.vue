<template>
  <Section
    id="contact"
    title="Reach Out"
  >
    <div
      :class="[
        'p-8 sketchy-border max-w-2xl mx-auto transform rotate-1 transition-colors',
        themeClasses.themeClass('bg-white text-gray-800', 'bg-slate-800 text-gray-200'),
      ]"
    >
      <div class="flex flex-col items-center text-center">
        <div
          :class="[
            'w-16 h-16 rounded-full flex items-center justify-center border-2 border-dashed mb-4 transition-colors',
            themeClasses.themeClass('bg-gray-100 border-gray-400', 'bg-slate-700 border-slate-500'),
          ]"
        >
          <Mail
            :size="32"
            :class="themeClasses.classes.textMuted()"
          />
        </div>
        <h3 :class="['text-2xl font-bold mb-2 transition-colors', themeClasses.classes.text()]">
          Keep in Touch!
        </h3>
        <p :class="['text-xl mb-4 transition-colors', themeClasses.classes.textSecondary()]">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of
          your visions.
        </p>
        <p
          :class="[
            'text-lg mb-8 px-4 py-2 rounded border inline-block transition-colors',
            themeClasses.themeClass(
              'bg-blue-100 border-blue-300 text-blue-800',
              'bg-blue-900/30 border-blue-700 text-blue-300'
            ),
          ]"
        >
          ✈️ Available for remote opportunities
        </p>

        <!-- Contact Form (shown when showForm is true) -->
        <div
          v-if="showForm"
          class="w-full mb-4"
        >
          <form
            :action="formspreeUrl"
            method="POST"
            class="w-full space-y-4 text-left"
            data-formspree-redirect="false"
            @submit="handleSubmit"
          >
            <div>
              <label
                for="name"
                :class="['block mb-2 font-bold text-lg', themeClasses.classes.text()]"
              >
                Name
              </label>
              <input
                id="name"
                v-model="name"
                type="text"
                name="name"
                placeholder="Please enter your name here"
                :class="[
                  'w-full px-4 py-3 sketchy-border transition-colors',
                  themeClasses.themeClass(
                    'bg-white border-gray-800 text-gray-800 placeholder-gray-500',
                    'bg-slate-700 border-slate-600 text-gray-200 placeholder-gray-400'
                  ),
                  nameError ? 'invalid border-red-500' : ''
                ]"
                required
                @focus="trackFormInteraction('contact_form', 'name'); nameError = ''"
                @input="nameError = ''"
              >
              <p
                v-if="nameError"
                :class="['mt-1 text-sm text-red-600', themeClasses.isDark.value ? 'text-red-400' : 'text-red-600']"
              >
                {{ nameError }}
              </p>
            </div>

            <div>
              <label
                for="email"
                :class="['block mb-2 font-bold text-lg', themeClasses.classes.text()]"
              >
                Email
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                placeholder="Please write your email here"
                :class="[
                  'w-full px-4 py-3 sketchy-border transition-colors',
                  themeClasses.themeClass(
                    'bg-white border-gray-800 text-gray-800 placeholder-gray-500',
                    'bg-slate-700 border-slate-600 text-gray-200 placeholder-gray-400'
                  ),
                  emailError ? 'invalid border-red-500' : ''
                ]"
                required
                @focus="trackFormInteraction('contact_form', 'email'); emailError = ''"
                @input="emailError = ''"
              >
              <p
                v-if="emailError"
                :class="['mt-1 text-sm text-red-600', themeClasses.isDark.value ? 'text-red-400' : 'text-red-600']"
              >
                {{ emailError }}
              </p>
            </div>

            <div>
              <label
                for="message"
                :class="['block mb-2 font-bold text-lg', themeClasses.classes.text()]"
              >
                Message
              </label>
              <textarea
                id="message"
                v-model="text"
                name="message"
                placeholder="Please write your message here"
                rows="4"
                :class="[
                  'w-full px-4 py-3 sketchy-border transition-colors resize-none',
                  themeClasses.themeClass(
                    'bg-white border-gray-800 text-gray-800 placeholder-gray-500',
                    'bg-slate-700 border-slate-600 text-gray-200 placeholder-gray-400'
                  ),
                  messageError ? 'invalid border-red-500' : ''
                ]"
                required
                @focus="trackFormInteraction('contact_form', 'message'); messageError = ''"
                @input="messageError = ''"
              />
              <p
                v-if="messageError"
                :class="['mt-1 text-sm text-red-600', themeClasses.isDark.value ? 'text-red-400' : 'text-red-600']"
              >
                {{ messageError }}
              </p>
            </div>

            <div class="flex gap-3">
              <Button
                type="submit"
                :disabled="isSubmitting"
                variant="primary"
                size="lg"
                class="flex-1"
              >
                <template #icon-left>
                  <Mail :size="20" />
                </template>
                <span v-if="isSubmitting">Sending...</span>
                <span v-else>Send Message</span>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                @click="showForm = false"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>

        <!-- Action Buttons (shown when form is hidden) -->
        <div
          v-else
          class="flex flex-col md:flex-row gap-4 w-full"
        >
          <Button
            variant="warning"
            size="lg"
            class="flex-1"
            @click="showForm = true"
          >
            <template #icon-left>
              <Mail :size="20" />
            </template>
            Email Me
          </Button>
          <Button
            tag="a"
            :href="`tel:${contactInfo.phone}`"
            variant="default"
            size="lg"
            class="flex-1"
          >
            <template #icon-left>
              <Phone :size="20" />
            </template>
            Call Me
          </Button>
        </div>

        <div class="mt-8 flex gap-6">
          <a
            :href="info.links.linkedin"
            :class="['transition-colors', themeClasses.classes.link()]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin :size="32" />
          </a>
          <a
            :href="info.links.github"
            :class="['transition-colors', themeClasses.classes.link()]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github :size="32" />
          </a>
        </div>
      </div>
    </div>

    <footer
      :class="['text-center mt-12 text-lg transition-colors', themeClasses.classes.textMuted()]"
    >
      <p>&copy; {{ new Date().getFullYear() }} {{ info.name }}.</p>
    </footer>

    <Snackbar
      :show-snackbar="showSnackbar"
      :snackbar-message="snackbarMessage"
      :snackbar-color="snackbarColor"
      @close="closeSnackbar"
    />
  </Section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Mail, Phone, Linkedin, Github } from 'lucide-vue-next';
import Section from './helpers/Section.vue';
import Snackbar from './helpers/Snackbar.vue';
import Button from './helpers/Button.vue';
import info from '../../info';
import { useAnalytics } from '@/composables/useAnalytics';
import { useThemeClasses } from '@/composables/useThemeClasses';
import { validateEmail, validateName, validateMessage } from '@/utils/validators';

const themeClasses = useThemeClasses();

const email = ref('');
const name = ref('');
const text = ref('');
const showSnackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');
const isSubmitting = ref(false);
const showForm = ref(false);
// Validation error refs (optional, can be used for UI feedback)
const nameError = ref('');
const emailError = ref('');
const messageError = ref('');

const formspreeUrl = computed(() => {
  // Use environment variable if available, otherwise fallback to info.js
  return (
    import.meta.env.VITE_FORMSPREE_FORM_URL ||
    info.contact?.formspreeEndpoint ||
    'https://formspree.io/f/YOUR_FORM_ID'
  );
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

  // Run validators
  const nameResult = validateName(name.value);
  const emailResult = validateEmail(email.value);
  const messageResult = validateMessage(text.value);

  if (!nameResult.valid) {
    nameError.value = nameResult.message;
  } else {
    nameError.value = '';
  }
  if (!emailResult.valid) {
    emailError.value = emailResult.message;
  } else {
    emailError.value = '';
  }
  if (!messageResult.valid) {
    messageError.value = messageResult.message;
  } else {
    messageError.value = '';
  }

  if (!nameResult.valid || !emailResult.valid || !messageResult.valid) {
    // Errors are shown below fields, no need for snackbar
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
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      showSnackbar.value = true;
      snackbarMessage.value = 'Thanks! Message received.';
      snackbarColor.value = '#1aa260';
      trackFormSubmit('contact_form', 1);

      // Reset form
      email.value = '';
      text.value = '';
      name.value = '';

      // Close form after successful submission
      setTimeout(() => {
        showForm.value = false;
      }, 2000);
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    showSnackbar.value = true;
    snackbarMessage.value = 'Oops! Something went wrong.';
    snackbarColor.value = 'rgb(212, 149, 97)';
    trackFormError('contact_form', 'submission_error');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Styles are handled by Tailwind classes */
</style>
