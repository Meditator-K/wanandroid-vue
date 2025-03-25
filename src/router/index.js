
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import QA from '../views/QA.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { keepAlive: true }
    },
    {
        path: '/qa',
        name: 'qa',
        component: QA,
        meta: { keepAlive: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;