<template>
    <div>
        <ul>
            <li
                v-for="(item, index) in joinUsContent"
                :key="index"
                style="margin-bottom: 1em;"
            >
                <span v-if="index === 0" style="font-size: 2em;"><b>{{ item.children[0].text }}</b></span>
                <span v-else>{{ item.children[0].text }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
const { joinUsContent } = await fetchTextData();
</script>