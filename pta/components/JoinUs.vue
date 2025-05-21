<template>
    <div>
        <ul>
            <li v-for="(item, index) in joinUsContent" :key="index">
                <!-- Access individual children and their text -->
                <p v-for="(child, childIndex) in item.children" :key="childIndex">
                    {{ child.text }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { joinUsContent } = fetchTextData();
console.log(joinUsContent);
</script>