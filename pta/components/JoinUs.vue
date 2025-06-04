<template>
    <div>
        <PortableText 
            :value="joinUsContent" :components="myPortableTextComponents"/>
    </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'
const { joinUsContent } = await fetchTextData();

const myPortableTextComponents = {
    marks: {
        link: ({ value }, { slots }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return h('a', { href: value.href, rel, style: 'color: blue; text-decoration: underline;' }, slots.default?.());
        },
    },
};
console.log(joinUsContent.value?.[1]?.children?.[0].text)
</script>