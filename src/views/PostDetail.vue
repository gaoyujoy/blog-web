<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { marked } from "marked";
import hljs from "highlight.js/lib/common";
import "highlight.js/styles/github-dark.css";
import { useRoute } from "vue-router";
import { commentsApi, postsApi } from "../api";
import type { Comment, Post } from "../types";
import TagPill from "../components/TagPill.vue";

const route = useRoute();
const post = ref<Post>();
const comments = ref<Comment[]>([]);
const nickname = ref("");
const content = ref("");
const submitting = ref(false);
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-|-$/g, "");
const toc = computed(() => {
  if (!post.value) return [];
  return [...post.value.content.matchAll(/^(#{1,3})\s+(.+)$/gm)].map(
    ([, hashes, text]) => ({
      level: hashes.length,
      text: text.trim(),
      id: slugify(text.trim()),
    }),
  );
});
const html = computed(() => {
  if (!post.value) return "";
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = tokens
      .map((token) => ("raw" in token ? token.raw : ""))
      .join("");
    return `<h${depth} id="${slugify(text)}">${text}</h${depth}>`;
  };
  renderer.code = ({ text, lang }) => {
    const language = (lang || "")
      .trim()
      .split(/\s+/)[0]
      .toLowerCase()
      .replace(/[^a-z0-9_+-]/g, "");
    const highlighted =
      language && hljs.getLanguage(language)
        ? hljs.highlight(text, { language }).value
        : hljs.highlightAuto(text).value;
    const className = language
      ? ` class="hljs language-${language}"`
      : ' class="hljs"';
    return `<pre><code${className}>${highlighted}</code></pre>`;
  };
  return marked.parse(post.value.content, { renderer }) as string;
});
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
const submit = async () => {
  if (!post.value || !nickname.value.trim() || !content.value.trim()) return;
  submitting.value = true;
  try {
    await commentsApi.create(post.value._id, {
      nickname: nickname.value,
      content: content.value,
    });
    content.value = "";
    comments.value = (await commentsApi.list(post.value._id)).data;
  } finally {
    submitting.value = false;
  }
};
onMounted(async () => {
  try {
    post.value = (await postsApi.detail(String(route.params.slug))).data;
    if (post.value)
      comments.value = (await commentsApi.list(post.value._id)).data;
  } catch {
    post.value = undefined;
  }
});
</script>
<template>
  <div v-if="post" class="detail-layout">
    <article>
      <header class="article-header">
        <span class="date">{{ formatDate(post.createdAt) }}</span>
        <h1>{{ post.title }}</h1>
        <p class="muted">
          {{ post.excerpt }}
        </p>
        <div class="tags">
          <TagPill v-for="tag in post.tags" :key="tag" :label="tag" />
        </div>
      </header>
      <div class="article-body" v-html="html" />
      <section class="comments">
        <h2>匿名评论 · {{ comments.length }}</h2>
        <form class="comment-form" @submit.prevent="submit">
          <input
            v-model="nickname"
            maxlength="30"
            placeholder="你的昵称"
          /><textarea
            v-model="content"
            maxlength="500"
            placeholder="留下你的想法…"
          /><button class="button primary" type="submit" :disabled="submitting">
            {{ submitting ? "提交中…" : "发布评论" }}
          </button>
        </form>
        <div v-for="comment in comments" :key="comment._id" class="comment">
          <div class="comment-meta">
            <strong>{{ comment.nickname }}</strong
            ><span>{{ formatDate(comment.createdAt) }}</span>
          </div>
          <p>{{ comment.content }}</p>
        </div>
      </section>
    </article>
    <aside class="toc">
      <div class="toc-title">ON THIS PAGE</div>
      <a
        v-for="item in toc"
        :key="item.id"
        :class="`level-${item.level}`"
        :href="`#${item.id}`"
        >{{ item.text }}</a
      >
    </aside>
  </div>
  <div v-else class="list-heading">
    <h1>文章不存在</h1>
    <p>这篇记录可能还没有发布。</p>
  </div>
</template>
