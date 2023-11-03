import { RouteRecordRaw } from 'vue-router';
export default {
    path: '/center',
    name: 'center',
    component: () => import('@/layouts/center.vue'),
    meta: { menu: { title: '个人空间', icon: 'fab fa-etsy', active: true }, auth: true },
    children: [
        
    ]
} as RouteRecordRaw