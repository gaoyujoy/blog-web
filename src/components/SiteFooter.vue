<script setup lang="ts">
defineProps<{ home?: boolean }>();
const rssUrl = import.meta.env.VITE_RSS_URL || "/rss.xml";
</script>
<template>
  <footer class="site-footer">
    <div v-if="home" class="record">渝ICP备18012981号</div>
    <template v-else>
      <span>© {{ new Date().getFullYear() }} gaoyu</span
      ><a href="#" aria-label="GitHub"
        ><svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.65-5.49 5.94.43.37.81 1.1.81 2.22v3.28c0 .32.22.69.82.57A12 12 0 0 0 12 .5Z"
          />
        </svg>
        GitHub</a
      ><a :href="rssUrl" target="_blank" rel="noopener">RSS</a
      ><span>渝ICP备18012981号</span>
    </template>
  </footer>
</template>
