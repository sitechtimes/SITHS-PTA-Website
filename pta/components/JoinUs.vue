<template>
    <div>
        <PortableText :value="joinUsContent" />
    </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'
const { joinUsContent } = await fetchTextData();
</script>