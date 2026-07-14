<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { postsApi } from '../api';
import type { Post } from '../types';
import TagPill from '../components/TagPill.vue';

const posts = ref<Post[]>([]); const keyword = ref(''); const page = ref(1); const hasMore = ref(true); const loading = ref(false); const sentinel = ref<HTMLElement>();
const escapeReg = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const highlight = (value: string) => keyword.value.trim() ? value.replace(new RegExp(`(${escapeReg(keyword.value.trim())})`, 'ig'), '<mark class="highlight">$1</mark>') : value;
const resultText = (post: Post) => {
  const query = keyword.value.trim();
  if (!query || post.title.toLowerCase().includes(query.toLowerCase()) || post.excerpt.toLowerCase().includes(query.toLowerCase())) return post.excerpt;
  const index = post.content.toLowerCase().indexOf(query.toLowerCase());
  if (index < 0) return post.excerpt;
  return `${index > 50 ? '…' : ''}${post.content.slice(Math.max(0, index - 50), index + 110)}${index + 110 < post.content.length ? '…' : ''}`;
};
const fetchPosts = async (reset = false) => { if (loading.value || (!hasMore.value && !reset)) return; if (reset) { page.value = 1; posts.value = []; hasMore.value = true; } loading.value = true; try { const result = await postsApi.list({ keyword: keyword.value, page: page.value, limit: 8 }); posts.value.push(...result.data.items); hasMore.value = result.data.hasMore; page.value++; } finally { loading.value = false; } };
let timer: number | undefined; watch(keyword, () => { window.clearTimeout(timer); timer = window.setTimeout(() => fetchPosts(true), 300); });
const onScroll = () => { if (sentinel.value && sentinel.value.getBoundingClientRect().top < window.innerHeight + 200) fetchPosts(); };
const formatDate = (date: string) => new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
onMounted(() => { fetchPosts(); window.addEventListener('scroll', onScroll); }); onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>
<template>
  <section class="list-heading"><div class="eyebrow">// all notes</div><h1>文章</h1><p>把踩过的坑、做过的实验和仍在思考的问题，写成可检索的记录。</p></section>
  <div class="toolbar"><input v-model="keyword" class="search-box" placeholder="搜索标题或文章内容…" /><span class="muted" style="align-self:center;font-size:13px">{{ posts.length }} 篇已加载</span></div>
  <section class="post-list"><RouterLink v-for="post in posts" :key="post._id" :to="`/posts/${post.slug}`" class="post-row"><span class="date">{{ formatDate(post.createdAt) }}</span><h2 v-html="highlight(post.title)"></h2><p v-html="highlight(resultText(post))"></p><div class="tags"><TagPill v-for="tag in post.tags" :key="tag" :label="tag" /></div></RouterLink></section>
  <div ref="sentinel" class="load-more">{{ loading ? '正在加载…' : hasMore ? '向下滚动加载更多' : posts.length ? '已经到底了' : '没有找到匹配文章' }}</div>
</template>
