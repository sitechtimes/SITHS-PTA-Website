<template>
    <div v-if="joinUsContent" class="text-md md:text-xl my-4">
      <PortableText :value="joinUsContent" :components="myPortableTextComponents" />
    </div>
</template>

<script setup>
import { h } from 'vue';
import { PortableText } from '@portabletext/vue';

const { joinUsContent } = await fetchTextData(); 

const myPortableTextComponents = {
    block: {
        normal: ({ index }, { slots }) => {
            if (index === 0) {
                return h('p', { style: 'font-weight: bold; font-size: 1.5rem' }, slots.default?.());
            }
            else {
                return h('p', { class: 'my-4' }, slots.default?.());
            }
        },
        h2: (_, { slots }) => {
            return h('h2', { class: 'font-bold text-lg md:text-2xl' }, slots.default?.());
        }
    },
    marks: {
        link: ({ value }, { slots }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return h('a', { href: value.href, rel, class: 'hover:underline font-medium text-blue-600' }, slots.default?.());
        },
    },
};
</script>

<style scoped>
</style>