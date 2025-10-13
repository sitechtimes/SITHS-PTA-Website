<template>
  <Landing />
    <div class="mx-10">
        <MiddleSection
          :aboutUs="aboutUsContent"
          :activitiesContent="activitiesContent"
        />
        <Resources/>
    </div>
</template>

<script setup>
const { aboutUsContent, activitiesContent } = await fetchTextData();



</script>
<style scoped></style>