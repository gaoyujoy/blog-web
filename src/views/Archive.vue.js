import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { postsApi, tagsApi } from '../api';
const posts = ref([]);
const tagNames = ref([]);
const grouped = computed(() => { const years = {}; [...posts.value].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).forEach(post => { const year = new Date(post.createdAt).getFullYear().toString(); years[year] || (years[year] = {}); (post.tags.length ? post.tags : ['未分类']).forEach(tag => { var _a; return ((_a = years[year])[tag] || (_a[tag] = [])).push(post); }); }); return years; });
onMounted(async () => { try {
    const [list, tags] = await Promise.all([postsApi.list({ page: 1, limit: 100 }), tagsApi.list()]);
    posts.value = list.data.items;
    tagNames.value = tags.data.map(item => item.name);
}
catch { } });
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
for (const [tags, year] of __VLS_getVForSourceType((__VLS_ctx.grouped))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        key: (year),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "archive-year" },
    });
    (year);
    for (const [items, tag] of __VLS_getVForSourceType((tags))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (tag),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "archive-tag" },
        });
        (tag);
        for (const [post] of __VLS_getVForSourceType((items))) {
            const __VLS_0 = {}.RouterLink;
            /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
                key: (post._id),
                to: (`/posts/${post.slug}`),
                ...{ class: "archive-item" },
            }));
            const __VLS_2 = __VLS_1({
                key: (post._id),
                to: (`/posts/${post.slug}`),
                ...{ class: "archive-item" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            __VLS_3.slots.default;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (post.title);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "date" },
            });
            (new Date(post.createdAt).toLocaleDateString('zh-CN'));
            var __VLS_3;
        }
    }
}
if (!Object.keys(__VLS_ctx.grouped).length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "muted" },
        ...{ style: {} },
    });
}
/** @type {__VLS_StyleScopedClasses['list-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['archive-year']} */ ;
/** @type {__VLS_StyleScopedClasses['archive-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['archive-item']} */ ;
/** @type {__VLS_StyleScopedClasses['date']} */ ;
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterLink: RouterLink,
            grouped: grouped,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
