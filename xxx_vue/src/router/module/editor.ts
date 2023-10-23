import { RouteRecordRaw } from 'vue-router';
export default {
    path: '/editor',
    name: 'editor',
    redirect: '/editor/base',
    component: () => import('@/layouts/admin.vue'),
    meta: { menu: { title: '编辑器', icon: 'fab fa-etsy' }, auth: true },
    children: [
        {
            path: 'base',
            name: 'base',
            component: () => import('@/views/editor/base.vue'),
            meta: { permission: 'editor_base', menu: { title: '富文本编辑器' } },
        },
        {
            path: 'markdown',
            name: 'markdown',
            component: () => import('@/views/editor/markdown.vue'),
            meta: { menu: { title: 'markdown编辑器' }, permission: 'editor_markdown' },
        }
    ]
} as RouteRecordRaw