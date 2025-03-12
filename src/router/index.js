import { createRouter, createWebHistory } from 'vue-router';
import Vue8of1 from '../views/Vue8of1.vue';
import Vue8of2 from '../views/Vue8of2.vue';
import Vue8of3 from '../views/Vue8of3.vue';
import Vue8of4 from '../views/Vue8of4.vue';
import Vue8of5 from '../views/Vue8of5.vue';
import Vue8of6 from '../views/Vue8of6.vue';
import Vue8of7 from '../views/Vue8of7.vue';

const routes = [
    {
        path: '/',
        name: Vue8of1,
        component: Vue8of1
    },
    {
        path: '/Vue8of2',
        name: Vue8of1,
        component: Vue8of2
    },
    {
        path: '/Vue8of3',
        name: Vue8of3,
        component: Vue8of3
    },
    {
        path: '/Vue8of4',
        name: Vue8of4,
        component: Vue8of4
    },
    {
        path: '/Vue8of5',
        name: Vue8of5,
        component: Vue8of5
    },
    {
        path: '/Vue8of6',
        name: Vue8of6,
        component: Vue8of6
    },
    {
        path: '/Vue8of7',
        name: Vue8of7,
        component: Vue8of7
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});

export default router;
