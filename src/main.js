import { createApp } from 'vue'
import App from './App.vue'
import VueCookie from 'vue3-cookies';
import { createWebHistory, createRouter } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import VTooltip from 'v-tooltip'
import VueScrollTo from 'vue-scrollto'

// Import color variables
import './assets/styles/colors.css'

// Single route for SPA
const routes = [
    { path: '/', name: 'Home', component: App }
];

const router = createRouter({
    history: createWebHistory('/Myportfolio/'),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // If there's a hash, scroll to the element
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' };
        }
        // Saved scroll position (back/forward navigation)
        if (savedPosition) {
            return savedPosition;
        }
        // Default to top
        return { top: 0 };
    }
});

const app = createApp(App);
app.use(VueCookie);
app.use(router);
app.use(VTooltip);
app.use(VueScrollTo);
app.mount('#app');

AOS.init();
