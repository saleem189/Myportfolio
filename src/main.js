
import { createApp, h } from 'vue'
import App from './App.vue'
import VueCookie from 'vue3-cookies';
import { createWebHistory, createMemoryHistory ,createRouter } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import VTooltip from 'v-tooltip'
import VueScrollTo from 'vue-scrollto'
// import About from '@/components/About.vue';
// import Skills from '@/components/Skills.vue';
// import Portfolio from '@/components/Portfolio.vue';
// import Contact from '@/components/Contact.vue';



// const routes = [
//     { path: '/', component: About },
//     { path: '/about', component: About },
//     { path: '/skills', component: Skills }, 
//     { path: '/portfolio', component: Portfolio },
//     { path: '/contact', component: Contact },
//   ];



const routes = [
    { path: '/'}
];
const router = createRouter({
    // history: createWebHistory(),
    history: createMemoryHistory(),
    routes,
});

let Vue = createApp(App);
Vue.use(VueCookie);
Vue.use(router)
Vue.use(VTooltip)
Vue.use(VueScrollTo)
Vue.mount('#app')
AOS.init()


