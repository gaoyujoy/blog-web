import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const rssProxy = { target: 'http://localhost:3000', changeOrigin: true };

export default defineConfig({
  plugins: [vue()],
  server: { proxy: { '/rss.xml': rssProxy } },
  preview: { proxy: { '/rss.xml': rssProxy } },
});
