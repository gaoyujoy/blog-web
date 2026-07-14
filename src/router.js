import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Posts from './views/Posts.vue';
import PostDetail from './views/PostDetail.vue';
import Archive from './views/Archive.vue';
export default createRouter({ history: createWebHistory(), scrollBehavior: () => ({ top: 0 }), routes: [
        { path: '/', component: Home },
        { path: '/posts', component: Posts },
        { path: '/posts/:slug', component: PostDetail },
        { path: '/archive', component: Archive },
    ] });
