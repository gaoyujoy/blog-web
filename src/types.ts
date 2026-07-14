export interface Post { _id: string; title: string; slug: string; content: string; excerpt: string; tags: string[]; published: boolean; createdAt: string; updatedAt: string; }
export interface Comment { _id: string; postId: string; nickname: string; content: string; visible: boolean; createdAt: string; }
export interface PageResult<T> { items: T[]; total: number; page: number; limit: number; hasMore: boolean; }
