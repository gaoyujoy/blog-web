import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3000/api', timeout: 8000 });
export const postsApi = {
    list: (params) => api.get('/posts', { params }),
    detail: (slug) => api.get(`/posts/slug/${encodeURIComponent(slug)}`),
};
export const tagsApi = { list: () => api.get('/tags') };
export const commentsApi = {
    list: (postId) => api.get(`/posts/${postId}/comments`),
    create: (postId, data) => api.post(`/posts/${postId}/comments`, data),
};
