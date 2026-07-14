import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const rssProxy = { target: "http://localhost:3000", changeOrigin: true };
const apiProxy = { target: "http://localhost:3000", changeOrigin: true };

export default defineConfig({
  base: "/blog",
  plugins: [vue()],
  server: { proxy: { "/api": apiProxy, "/rss.xml": rssProxy } },
  preview: { proxy: { "/api": apiProxy, "/rss.xml": rssProxy } },
});
