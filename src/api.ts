import axios from "axios";
import type { Comment, PageResult, Post } from "./types";

const api = axios.create({ baseURL: "/api", timeout: 8000 });
export const postsApi = {
  list: (params: Record<string, unknown>) =>
    api.get<PageResult<Post>>("/posts", { params }),
  detail: (slug: string) =>
    api.get<Post>(`/posts/slug/${encodeURIComponent(slug)}`),
};
export const tagsApi = {
  list: () => api.get<{ _id: string; name: string }[]>("/tags"),
};
export const commentsApi = {
  list: (postId: string) => api.get<Comment[]>(`/posts/${postId}/comments`),
  create: (postId: string, data: { nickname: string; content: string }) =>
    api.post(`/posts/${postId}/comments`, data),
};
