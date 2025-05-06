<template>
    <Landing/>
    <div class="mx-10">
        <MiddleSection
          :aboutUs="aboutUsContent"
          :activitiesContent="activitiesContent"
        />
    </div>
</template>

<script setup>
import { fetchTextData } from "@/composables/fetchText";
const { aboutUsContent, activitiesContent } = fetchTextData();
</script>

<style scoped></style>