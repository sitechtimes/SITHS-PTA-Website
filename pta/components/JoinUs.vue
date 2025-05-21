<template>
    <div>
        <ul>
            <li v-for="(item, index) in joinUsContent.children[0].text" :key="index">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script setup>
const { joinUsContent } = fetchTextData();
</script>