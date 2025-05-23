
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import QA from '../views/QA.vue';
import Navigation from '../views/Navigation.vue';
import Project from '../views/Project.vue';
import Tool from '../views/Tool.vue';

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
    },
    {
        path: '/navi',
        name: 'navi',
        component: Navigation,
        meta: { keepAlive: true }
    },
    {
        path: '/project',
        name: 'project',
        component: Project,
        meta: { keepAlive: true }
    },
    {
        path: '/allProject/:id',
        name: 'allProject',
        component: () => import('../views/AllProject.vue'),
    },
    {
        path: '/tool',
        name: 'tool',
        component: Tool,
        meta: { keepAlive: true }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('../views/Search.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;