import { createApp, h } from 'vue'
import App from './App.vue'
import VueCookie from 'vue3-cookies';
import { createWebHistory, createRouter } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import VTooltip from 'v-tooltip'
import VueScrollTo from 'vue-scrollto'

// Import color variables
import './assets/styles/colors.css'

// import About from '@/components/About.vue';
// import Skills from '@/components/Skills.vue';
// import Portfolio from '@/components/Portfolio.vue';
// import Contact from '@/components/Contact.vue;

const routes = [
    { path: '/', name: 'home' },
    { path: '/about', name: 'about' },
    { path: '/skills', name: 'skills' },
    { path: '/portfolio', name: 'portfolio' },
    { path: '/contact', name: 'contact' },
    { path: '/recommendations', name: 'recommendations' },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory('/Myportfolio/'),
    routes,
});

const app = createApp(App);
app.use(VueCookie);
app.use(router)
app.use(VTooltip)
app.use(VueScrollTo)
app.mount('#app')
AOS.init()


