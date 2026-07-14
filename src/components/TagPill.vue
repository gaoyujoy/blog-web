<script setup lang="ts">
defineProps<{ label: string }>();
</script>
<template>
  <span class="tag-pill"># {{ label }}</span>
</template>
