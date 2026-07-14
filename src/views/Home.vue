<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { postsApi } from "../api";
import type { Post } from "../types";
import TagPill from "../components/TagPill.vue";
const posts = ref<Post[]>([]);
onMounted(async () => {
  try {
    posts.value = (await postsApi.list({ page: 1, limit: 3 })).data.items;
  } catch {
    /* 后端未启动时保留空状态 */
  }
});
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
</script>
<template>
  <section class="hero">
    <div>
      <div class="eyebrow">// notes from the terminal</div>
      <h1>写代码，<br /><em>也写下思考。</em></h1>
      <p>
        我是高宇，一名喜欢把复杂问题拆开、把灵感变成可运行代码的开发者。这里记录前端、工程实践和那些值得复盘的瞬间。
      </p>
      <div class="hero-links">
        <RouterLink to="/posts" class="button primary"> 浏览文章 → </RouterLink
        ><RouterLink to="/archive" class="button"> 查看归档 </RouterLink>
      </div>
    </div>
    <div class="terminal">
      <div class="terminal-top"><i /><i /><i /></div>
      <div><span class="key">const</span> author = {</div>
      <div>&nbsp;&nbsp;name: <span class="string">'gaoyu'</span>,</div>
      <div>&nbsp;&nbsp;focus: <span class="string">'build & learn'</span>,</div>
      <div>&nbsp;&nbsp;status: <span class="string">'always coding'</span></div>
      <div>};</div>
      <br />
      <div><span class="key">while</span> (true) {</div>
      <div>&nbsp;&nbsp;author.write();<span class="muted">_</span></div>
      <div>}</div>
    </div>
  </section>
  <section>
    <div class="section-head">
      <h2>最近写了什么</h2>
      <RouterLink to="/posts" class="more"> 全部文章 → </RouterLink>
    </div>
    <div v-if="posts.length" class="post-grid">
      <RouterLink
        v-for="post in posts"
        :key="post._id"
        :to="`/posts/${post.slug}`"
        class="post-card"
      >
        <span class="date">{{ formatDate(post.createdAt) }}</span>
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt }}</p>
        <div class="tags">
          <TagPill v-for="tag in post.tags" :key="tag" :label="tag" />
        </div>
      </RouterLink>
    </div>
    <div v-else class="post-card">
      <p>文章正在准备中，连接后端并创建第一篇记录吧。</p>
    </div>
  </section>
</template>
