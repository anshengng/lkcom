import { RouteRecordRaw } from 'vue-router';

export default {
    name: 'admin',
    path: '/admin',
    redirect: '/admin/home',
    component: () => import('@/layouts/admin.vue'),
    meta: { menu: { title: 'DashBoard', icon: 'fas fa-house-user', active: true, }, auth: true },
    children: [
        {
            name: 'admin/home',
            path: 'home',
            component: () => import('@/views/admin/home.vue'),
            meta: { menu: { title: '主页', icon: 'fab fa-audible', active: true } },
        }
    ]
} as RouteRecordRaw