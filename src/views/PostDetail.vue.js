import { computed, onMounted, ref } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';
import { useRoute } from 'vue-router';
import { commentsApi, postsApi } from '../api';
import TagPill from '../components/TagPill.vue';
const route = useRoute();
const post = ref();
const comments = ref([]);
const nickname = ref('');
const content = ref('');
const submitting = ref(false);
const slugify = (text) => text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-|-$/g, '');
const toc = computed(() => { if (!post.value)
    return []; return [...post.value.content.matchAll(/^(#{1,3})\s+(.+)$/gm)].map(([_, hashes, text]) => ({ level: hashes.length, text: text.trim(), id: slugify(text.trim()) })); });
const html = computed(() => { if (!post.value)
    return ''; const renderer = new marked.Renderer(); renderer.heading = ({ tokens, depth }) => { const text = tokens.map(token => 'raw' in token ? token.raw : '').join(''); return `<h${depth} id="${slugify(text)}">${text}</h${depth}>`; }; renderer.code = ({ text, lang }) => { const language = (lang || '').trim().split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9_+-]/g, ''); const highlighted = language && hljs.getLanguage(language) ? hljs.highlight(text, { language }).value : hljs.highlightAuto(text).value; const className = language ? ` class="hljs language-${language}"` : ' class="hljs"'; return `<pre><code${className}>${highlighted}</code></pre>`; }; return marked.parse(post.value.content, { renderer }); });
const formatDate = (date) => new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
const submit = async () => { if (!post.value || !nickname.value.trim() || !content.value.trim())
    return; submitting.value = true; try {
    await commentsApi.create(post.value._id, { nickname: nickname.value, content: content.value });
    content.value = '';
    comments.value = (await commentsApi.list(post.value._id)).data;
}
finally {
    submitting.value = false;
} };
onMounted(async () => { try {
    post.value = (await postsApi.detail(String(route.params.slug))).data;
    if (post.value)
        comments.value = (await commentsApi.list(post.value._id)).data;
}
catch {
    post.value = undefined;
} });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.post) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-layout" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
        ...{ class: "article-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "date" },
    });
    (__VLS_ctx.formatDate(__VLS_ctx.post.createdAt));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    (__VLS_ctx.post.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "muted" },
    });
    (__VLS_ctx.post.excerpt);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tags" },
    });
    for (const [tag] of __VLS_getVForSourceType((__VLS_ctx.post.tags))) {
        /** @type {[typeof TagPill, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(TagPill, new TagPill({
            key: (tag),
            label: (tag),
        }));
        const __VLS_1 = __VLS_0({
            key: (tag),
            label: (tag),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "article-body" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.html) }, null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "comments" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    (__VLS_ctx.comments.length);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.submit) },
        ...{ class: "comment-form" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        maxlength: "30",
        placeholder: "你的昵称",
    });
    (__VLS_ctx.nickname);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
        value: (__VLS_ctx.content),
        maxlength: "500",
        placeholder: "留下你的想法…",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ class: "button primary" },
        type: "submit",
        disabled: (__VLS_ctx.submitting),
    });
    (__VLS_ctx.submitting ? '提交中…' : '发布评论');
    for (const [comment] of __VLS_getVForSourceType((__VLS_ctx.comments))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (comment._id),
            ...{ class: "comment" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "comment-meta" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (comment.nickname);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.formatDate(comment.createdAt));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (comment.content);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({
        ...{ class: "toc" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "toc-title" },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.toc))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            key: (item.id),
            ...{ class: (`level-${item.level}`) },
            href: (`#${item.id}`),
        });
        (item.text);
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "list-heading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
/** @type {__VLS_StyleScopedClasses['detail-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['article-header']} */ ;
/** @type {__VLS_StyleScopedClasses['date']} */ ;
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
/** @type {__VLS_StyleScopedClasses['tags']} */ ;
/** @type {__VLS_StyleScopedClasses['article-body']} */ ;
/** @type {__VLS_StyleScopedClasses['comments']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-form']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['comment']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['toc']} */ ;
/** @type {__VLS_StyleScopedClasses['toc-title']} */ ;
/** @type {__VLS_StyleScopedClasses['list-heading']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TagPill: TagPill,
            post: post,
            comments: comments,
            nickname: nickname,
            content: content,
            submitting: submitting,
            toc: toc,
            html: html,
            formatDate: formatDate,
            submit: submit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
