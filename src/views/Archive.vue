<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { postsApi, tagsApi } from "../api";
import type { Post } from "../types";
const posts = ref<Post[]>([]);
const tagNames = ref<string[]>([]);
const selectedTags = ref<string[]>([]);
const filteredPosts = computed(() =>
  selectedTags.value.length
    ? posts.value.filter((post) =>
        selectedTags.value.every((tag) => post.tags.includes(tag)),
      )
    : posts.value,
);
const grouped = computed(() => {
  const years: Record<string, Post[]> = {};
  [...filteredPosts.value]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .forEach((post) => {
      const year = new Date(post.createdAt).getFullYear().toString();
      (years[year] ||= []).push(post);
    });
  return years;
});
const toggleTag = (tag: string) => {
  selectedTags.value = selectedTags.value.includes(tag)
    ? selectedTags.value.filter((item) => item !== tag)
    : [...selectedTags.value, tag];
};
const clearTags = () => {
  selectedTags.value = [];
};
onMounted(async () => {
  try {
    const [list, tags] = await Promise.all([
      postsApi.list({ page: 1, limit: 100 }),
      tagsApi.list(),
    ]);
    posts.value = list.data.items;
    tagNames.value = tags.data.map((item) => item.name);
  } catch {
    posts.value = [];
    tagNames.value = [];
  }
});
</script>
<template>
  <section class="list-heading">
    <div class="eyebrow">// organized by time & tag</div>
    <h1>归档</h1>
    <p>按年份和标签，找到曾经写下的每一段代码记忆。</p>
  </section>
  <section v-if="tagNames.length" class="archive-filters" aria-label="按标签筛选">
    <div class="archive-filter-head">
      <span class="muted">标签筛选</span>
      <button
        v-if="selectedTags.length"
        type="button"
        class="archive-clear"
        @click="clearTags"
      >
        清除筛选
      </button>
    </div>
    <div class="archive-tags">
      <button
        v-for="tag in tagNames"
        :key="tag"
        type="button"
        class="archive-tag-button"
        :class="{ selected: selectedTags.includes(tag) }"
        :aria-pressed="selectedTags.includes(tag)"
        @click="toggleTag(tag)"
      >
        # {{ tag }}
      </button>
    </div>
    <p v-if="selectedTags.length" class="archive-filter-hint">
      已选择 {{ selectedTags.length }} 个标签，将显示同时包含这些标签的文章。
    </p>
  </section>
  <section v-for="(items, year) in grouped" :key="year">
    <h2 class="archive-year">
      {{ year }}
    </h2>
    <RouterLink
      v-for="post in items"
      :key="post._id"
      :to="`/posts/${post.slug}`"
      class="archive-item"
    >
      <span>{{ post.title }}</span
      ><span class="date">{{
        new Date(post.createdAt).toLocaleDateString("zh-CN")
      }}</span>
    </RouterLink>
  </section>
  <p v-if="!Object.keys(grouped).length" class="muted archive-empty">
    {{ selectedTags.length ? "没有找到匹配的归档内容。" : "暂无归档内容。" }}
  </p>
</template>
