<template>
    <Landing/>
    <div class="mx-10">
        <MiddleSection
          :about-us="aboutUsContent"
          :activities-content="activitiesContent"
        />
    </div>
</template>

<script setup>
import { useWebsiteData } from "@/composables/websiteData";
const { aboutUsContent, activitiesContent } = useWebsiteData();
</script>

<style scoped></style>