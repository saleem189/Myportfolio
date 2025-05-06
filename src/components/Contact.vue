<template>
  <div
    class="py-4 p-st contact-section"
    :class="{
      'bg-light': !nightMode,
      'bg-dark2': nightMode,
      'text-light': nightMode,
    }"
  >
    <div class="container">
      <div
        class="text-center mb-4"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="1000"
      >
        <h1
          class="title text-center"
          :class="{ pgray: !nightMode, 'text-light': nightMode }"
        >Get in Touch</h1>
        <p class="subtitle" :class="{ pgray: !nightMode, 'text-light': nightMode }">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </div>
      <hr
        width="50%"
        :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
      />
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <form
            :action="formspreeUrl"
            method="POST"
            @submit="handleSubmit"
            class="contact-form"
            data-formspree-redirect="false"
          >
            <div
              class="form-group mb-4"
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-duration="1000"
            >
              <label for="name" class="form-label" :class="{ 'text-light': nightMode }">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                v-model="name"
                placeholder="Your name"
                class="pinput"
                :class="{
                  pgray: !nightMode,
                  'pgray-dark': nightMode,
                  'text-light': nightMode,
                }"
                style="transition-delay: 0.2s"
                required
              />
            </div>

            <div
              class="form-group mb-4"
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-duration="1000"
            >
              <label for="email" class="form-label" :class="{ 'text-light': nightMode }">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                v-model="email"
                placeholder="your.email@example.com"
                class="pinput"
                :class="{
                  pgray: !nightMode,
                  'pgray-dark': nightMode,
                  'text-light': nightMode,
                }"
                style="transition-delay: 0.4s"
                required
              />
            </div>

            <div
              class="form-group mb-4"
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-duration="1000"
            >
              <label for="message" class="form-label" :class="{ 'text-light': nightMode }">Message</label>
              <textarea
                id="message"
                name="message"
                v-model="text"
                placeholder="Your message here..."
                class="pinput"
                rows="4"
                :class="{
                  pgray: !nightMode,
                  'pgray-dark': nightMode,
                  'text-light': nightMode,
                }"
                style="transition-delay: 0.6s"
                required
              ></textarea>
            </div>

            <div class="text-center">
              <button
                type="submit"
                class="btn submit-btn"
                data-aos="fade"
                data-aos-once="true"
                data-aos-duration="1000"
                data-aos-offset="50"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Snackbar
        :showSnackbar="showSnackbar"
        @close="closeSnackbar"
        :snackbarMessage="snackbarMessage"
        :snackbarColor="snackbarColor"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
import Snackbar from "@/components/helpers/Snackbar.vue";

let email = ref("");
let name = ref("");
let text = ref("");
let showSnackbar = ref(false);
let snackbarMessage = ref("");
let snackbarColor = ref("");
let isSubmitting = ref(false);
let { nightMode } = defineProps({
  nightMode: Boolean,
});

const formspreeUrl = computed(() => import.meta.env.VITE_FORMSPREE_FORM_URL);

let closeSnackbar = (val) => {
  if (!val) {
    setTimeout(() => {
      showSnackbar.value = val;
    }, 1000);
  }
};

let handleSubmit = async (event) => {
  event.preventDefault();
  
  if (!email.value || !name.value || !text.value) {
    showSnackbar.value = true;
    snackbarMessage.value = "Please fill in all the fields";
    snackbarColor.value = "rgb(212, 149, 97)";
    setTimeout(() => {
      showSnackbar.value = false;
    }, 3000);
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
      
      // Reset form
      email.value = "";
      text.value = "";
      name.value = "";
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    showSnackbar.value = true;
    snackbarMessage.value = "Oops! Something went wrong.";
    snackbarColor.value = "rgb(212, 149, 97)";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 2rem;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
  text-align: left;
}

.pinput {
  font-size: 1rem;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 12px 16px;
  width: 100%;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.9);
}

.pinput:focus {
  border-color: #669db3ff;
  box-shadow: 0 0 0 2px rgba(102, 157, 179, 0.2);
}

.pgray-dark {
  background-color: #3c4148 !important;
  border-color: rgba(255, 255, 255, 0.1);
}

.pgray-dark:focus {
  border-color: #669db3ff;
  box-shadow: 0 0 0 2px rgba(102, 157, 179, 0.2);
}

.submit-btn {
  border-color: #669db3ff;
  color: #669db3ff;
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: transparent;
  min-width: 200px;
}

.submit-btn:hover {
  background-color: #669db3ff;
  border-color: #669db3ff;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 157, 179, 0.2);
}

.submit-btn:focus {
  background-color: #669db3ff;
  border-color: #669db3ff;
  color: white;
  box-shadow: 0 0 0 2px rgba(102, 157, 179, 0.2);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media screen and (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .pinput {
    font-size: 0.95rem;
  }
  
  .submit-btn {
    width: 100%;
  }
}
</style>
