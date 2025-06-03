<template>
    <div>
        <PortableText :value="joinUsContent" />
    </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'
const { joinUsContent } = await fetchTextData();
console.log(joinUsContent.value?.[1]?.children?.[0].text)
</script>