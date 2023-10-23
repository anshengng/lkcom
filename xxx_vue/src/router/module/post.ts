import { RouteRecordRaw } from 'vue-router';
export default {
    path: '/post',
    name: 'post',
    component: () => import('@/layouts/post.vue'),
    meta: { menu: { title: '帖子管理', icon: 'fab fa-etsy', active: true }, auth: true },
    children: [
        {
            path: '',
            name: 'post_center',
            component: () => import('@/views/post/index.vue'),
            meta: { menu: { title: '帖子管理' } },
        },
        {
            path: 'detail',
            name: 'post_detail',
            component: () => import('@/views/post/postDetail.vue'),
            meta: { menu: { title: '帖子详情' } },
        },
        {
            path: 'update',
            name: 'post_update',
            component: () => import('@/views/post/updatePost.vue'),
            meta: { menu: { title: '更新帖子' } },
        }
        
    ]
} as RouteRecordRaw