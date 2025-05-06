<template>
  <div id="aboutUs">
    <h2 class="text-xl md:text-2xl lg:text-4xl font-bold">ABOUT US</h2>
    <div class="text-base md:text-lg lg:text-2xl mt-2 lg:my-6">
      <PortableText :value="aboutUs" />
    </div>
  </div>
  <div id="activities">
    <h2 class="text-xl md:text-2xl lg:text-4xl font-bold mt-6">ACTIVITIES</h2>
    <div class="flex flex-wrap lg:flex-nowrap lg:items-start lg:space-x-6">
      <div class="text-base md:text-lg lg:text-2xl mt-2 lg:my-6 lg:w-2/3">
        <PortableText :value="activitiesContent" />
      </div>
      <Carousel class="w-full lg:w-1/3"/>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap';
import { PortableText } from '@portabletext/vue';

const props = defineProps({
  aboutUs: { type: Array, required: true },
  activitiesContent: { type: Array, required: true }
});

onMounted(() => {
   gsap.from("#aboutUs", { opacity:0, x: 100, duration: 1 });
   gsap.from("#activities", { opacity:0, x: 100, duration: 1 });
});
</script>

<style scoped>
</style>