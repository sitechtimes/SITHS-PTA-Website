<template>
    <div>
        <PortableText 
            :value="joinUsContent" 
            :components="myPortableTextComponents"
        />
    </div>
</template>

<script setup>
const { joinUsContent } = await fetchTextData(); 

const myPortableTextComponents = {
    block: {
        normal: ({ index }, { slots }) => {
            if (index === 0) {
                return h('p', { style: 'font-weight: bold; font-size: 1.5rem;' }, slots.default?.());
            }
            return h('p', slots.default?.());
        },
    },
    marks: {
        link: ({ value }, { slots }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return h('a', { href: value.href, rel, style: 'color: blue; text-decoration: underline;' }, slots.default?.());
        },
    },
};
</script>

<style scoped>
</style>
