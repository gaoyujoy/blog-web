import { onMounted, onUnmounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { postsApi } from '../api';
import TagPill from '../components/TagPill.vue';
const posts = ref([]);
const keyword = ref('');
const page = ref(1);
const hasMore = ref(true);
const loading = ref(false);
const sentinel = ref();
const escapeReg = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const highlight = (value) => keyword.value.trim() ? value.replace(new RegExp(`(${escapeReg(keyword.value.trim())})`, 'ig'), '<mark class="highlight">$1</mark>') : value;
const resultText = (post) => {
    const query = keyword.value.trim();
    if (!query || post.title.toLowerCase().includes(query.toLowerCase()) || post.excerpt.toLowerCase().includes(query.toLowerCase()))
        return post.excerpt;
    const index = post.content.toLowerCase().indexOf(query.toLowerCase());
    if (index < 0)
        return post.excerpt;
    return `${index > 50 ? '…' : ''}${post.content.slice(Math.max(0, index - 50), index + 110)}${index + 110 < post.content.length ? '…' : ''}`;
};
const fetchPosts = async (reset = false) => { if (loading.value || (!hasMore.value && !reset))
    return; if (reset) {
    page.value = 1;
    posts.value = [];
    hasMore.value = true;
} loading.value = true; try {
    const result = await postsApi.list({ keyword: keyword.value, page: page.value, limit: 8 });
    posts.value.push(...result.data.items);
    hasMore.value = result.data.hasMore;
    page.value++;
}
finally {
    loading.value = false;
} };
let timer;
watch(keyword, () => { window.clearTimeout(timer); timer = window.setTimeout(() => fetchPosts(true), 300); });
const onScroll = () => { if (sentinel.value && sentinel.value.getBoundingClientRect().top < window.innerHeight + 200)
    fetchPosts(); };
const formatDate = (date) => new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
onMounted(() => { fetchPosts(); window.addEventListener('scroll', onScroll); });
onUnmounted(() => window.removeEventListener('scroll', onScroll));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "list-heading" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "toolbar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ class: "search-box" },
    placeholder: "搜索标题或文章内容…",
});
(__VLS_ctx.keyword);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "muted" },
    ...{ style: {} },
});
(__VLS_ctx.posts.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "post-list" },
});
for (const [post] of __VLS_getVForSourceType((__VLS_ctx.posts))) {
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        key: (post._id),
        to: (`/posts/${post.slug}`),
        ...{ class: "post-row" },
    }));
    const __VLS_2 = __VLS_1({
        key: (post._id),
        to: (`/posts/${post.slug}`),
        ...{ class: "post-row" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "date" },
    });
    (__VLS_ctx.formatDate(post.createdAt));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.highlight(post.title)) }, null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.highlight(__VLS_ctx.resultText(post))) }, null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tags" },
    });
    for (const [tag] of __VLS_getVForSourceType((post.tags))) {
        /** @type {[typeof TagPill, ]} */ ;
        // @ts-ignore
        const __VLS_4 = __VLS_asFunctionalComponent(TagPill, new TagPill({
            key: (tag),
            label: (tag),
        }));
        const __VLS_5 = __VLS_4({
            key: (tag),
            label: (tag),
        }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    }
    var __VLS_3;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "sentinel",
    ...{ class: "load-more" },
});
/** @type {typeof __VLS_ctx.sentinel} */ ;
(__VLS_ctx.loading ? '正在加载…' : __VLS_ctx.hasMore ? '向下滚动加载更多' : __VLS_ctx.posts.length ? '已经到底了' : '没有找到匹配文章');
/** @type {__VLS_StyleScopedClasses['list-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['search-box']} */ ;
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
/** @type {__VLS_StyleScopedClasses['post-list']} */ ;
/** @type {__VLS_StyleScopedClasses['post-row']} */ ;
/** @type {__VLS_StyleScopedClasses['date']} */ ;
/** @type {__VLS_StyleScopedClasses['tags']} */ ;
/** @type {__VLS_StyleScopedClasses['load-more']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterLink: RouterLink,
            TagPill: TagPill,
            posts: posts,
            keyword: keyword,
            hasMore: hasMore,
            loading: loading,
            sentinel: sentinel,
            highlight: highlight,
            resultText: resultText,
            formatDate: formatDate,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
