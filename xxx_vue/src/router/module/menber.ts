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
        {
            path: 'bind',
            name: 'member_bind',
            component: () => import('@/views/member/bind.vue'),
            meta: { menu: { title: '绑定账号' } },
        },
        {
            path: 'subscribe',
            name: 'member_subscribe',
            component: () => import('@/views/member/subscribe.vue'),
            meta: { menu: { title: '订阅信息' } },
        },
        {
            path: 'config',
            name: 'member_config',
            component: () => import('@/views/member/config.vue'),
            meta: { menu: { title: '用户设置' } },
        },
    ]
} as RouteRecordRaw