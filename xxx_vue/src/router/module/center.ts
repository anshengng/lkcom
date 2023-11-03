import { RouteRecordRaw } from 'vue-router';
export default {
    path: '/member',
    name: 'member',
    redirect: '/member/mail',
    component: () => import('@/layouts/member.vue'),
    meta: { menu: { title: '会员中心', icon: 'fab fa-etsy', active: true }, auth: true },
    children: [
        {
            path: 'mail',
            name: 'member_center',
            component: () => import('@/views/member/mail.vue'),
            meta: { menu: { title: '资料管理' } },
        },
        
    ]
} as RouteRecordRaw