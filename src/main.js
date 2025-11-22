import { createApp } from 'vue'
import App from './App.vue'
import VueCookie from 'vue3-cookies';
import { createWebHistory, createRouter } from 'vue-router'

// Import color variables
import './assets/styles/colors.css'
// Import Tailwind and notebook paper styles
import './assets/styles/main.css'

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
app.mount('#app');
