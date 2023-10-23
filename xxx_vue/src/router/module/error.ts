import { RouteRecordRaw } from 'vue-router';

export default {
    name: 'error',
    path: '/error',
    redirect: '/error/404',
    component: () => import('@/layouts/admin.vue'),
    meta: { menu: { title: '错误页面', icon: 'fab fa-audible', active: true } },
    children: [
        {
            name: '404',
            path: '404',
            component: () => import('@/views/error/404.vue'),
            meta: { menu: { title: '404页面', icon: 'fab fa-audible' } },
        },
        {
            name: '403',
            path: '403',
            component: () => import('@/views/error/403.vue'),
            meta: { menu: { title: '403页面', icon: 'fab fa-audible' } },
        },
        {
            name: '505',
            path: '505',
            component: () => import('@/views/error/505.vue'),
            meta: { menu: { title: '505页面', icon: 'fab fa-audible', } },
        }
    ]
} as RouteRecordRaw