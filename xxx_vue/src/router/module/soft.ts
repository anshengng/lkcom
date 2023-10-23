import { RouteRecordRaw } from 'vue-router';
export default {
    path: '/soft',
    name: 'soft',
    component: () => import('@/layouts/soft.vue'),
    meta: { menu: { title: '作品集', icon: 'fab fa-etsy', active: true }, auth: true },
    children: [
        {
            path: '',
            name: 'soft_center',
            component: () => import('@/views/soft/index.vue'),
            meta: { menu: { title: '作品管理' } },
        },
        {
            path: 'update',
            name: 'soft_update',
            component: () => import('@/views/soft/update.vue'),
            meta: { menu: { title: '更新作品' } },
        },
        
    ]
} as RouteRecordRaw