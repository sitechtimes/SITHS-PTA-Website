import { h } from 'vue';

const portableTextComponents = {
    marks: {
        link: ({ value }, { slots }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return h('a', { href: value.href, rel, style: 'color: blue; text-decoration: underline;' }, slots.default?.());
        },
    },
};

export default portableTextComponents;
