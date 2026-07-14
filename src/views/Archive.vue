<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { postsApi, tagsApi } from '../api';
import type { Post } from '../types';
const posts = ref<Post[]>([]); const tagNames = ref<string[]>([]);
const grouped = computed(() => { const years: Record<string, Record<string, Post[]>> = {}; [...posts.value].sort((a,b) => +new Date(b.createdAt)-+new Date(a.createdAt)).forEach(post => { const year = new Date(post.createdAt).getFullYear().toString(); years[year] ||= {}; (post.tags.length ? post.tags : ['未分类']).forEach(tag => (years[year][tag] ||= []).push(post)); }); return years; });
onMounted(async () => { try { const [list, tags] = await Promise.all([postsApi.list({ page: 1, limit: 100 }), tagsApi.list()]); posts.value = list.data.items; tagNames.value = tags.data.map(item => item.name); } catch {} });
</script>
<template>
  <section class="list-heading"><div class="eyebrow">// organized by time & tag</div><h1>归档</h1><p>按年份和标签，找到曾经写下的每一段代码记忆。</p></section>
  <section v-for="(tags, year) in grouped" :key="year"><h2 class="archive-year">{{ year }}</h2><div v-for="(items, tag) in tags" :key="tag"><h3 class="archive-tag"># {{ tag }}</h3><RouterLink v-for="post in items" :key="post._id" :to="`/posts/${post.slug}`" class="archive-item"><span>{{ post.title }}</span><span class="date">{{ new Date(post.createdAt).toLocaleDateString('zh-CN') }}</span></RouterLink></div></section>
  <p v-if="!Object.keys(grouped).length" class="muted" style="padding:40px 0">暂无归档内容。</p>
</template>
