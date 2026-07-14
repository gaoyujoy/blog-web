<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { Moon, Sunny } from '@element-plus/icons-vue';
import SiteFooter from './components/SiteFooter.vue';

const dark = ref(localStorage.getItem('coder-theme') === 'dark');
const route = useRoute();
const active = computed(() => route.path.startsWith('/posts') ? '/posts' : route.path);
function toggleTheme() { dark.value = !dark.value; document.documentElement.classList.toggle('dark', dark.value); localStorage.setItem('coder-theme', dark.value ? 'dark' : 'light'); }
onMounted(() => document.documentElement.classList.toggle('dark', dark.value));
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink to="/" class="brand"><span class="brand-mark">&gt;_</span><span>gaoyu<span class="muted">.dev</span></span></RouterLink>
      <nav><RouterLink to="/" :class="{ active: active === '/' }">首页</RouterLink><RouterLink to="/posts" :class="{ active: active === '/posts' }">文章</RouterLink><RouterLink to="/archive" :class="{ active: active === '/archive' }">归档</RouterLink></nav>
      <button class="theme-btn" aria-label="切换主题" @click="toggleTheme"><el-icon><Moon v-if="!dark" /><Sunny v-else /></el-icon></button>
    </header>
    <main class="page-wrap"><RouterView /></main>
    <SiteFooter :home="route.path === '/'" />
  </div>
</template>
