<template>
  <div class="md:mx-6">
    <h2 class="text-xl mt-6 mb-2 md:text-2xl lg:text-4xl font-bold">RESOURCES</h2>
    <div class="grid lg:grid-cols-2 grid-rows-2 gap-5">
      <div v-for="resource in resources" :key="resource._id"
        class="bg-white rounded-xl w-full h-full mb-2 flex flex-row border border-[#4c4038a6]">
        <img :src="resource.imageUrl || '/resources/NEWSITHSLogo.png'" :alt="resource.name" class="p-4 w-1/2 row-span-3 self-center md:w-1/3 xl:w-1/4 object-contain">
        <div class="flex flex-col p-4">
          <h3 class="text-xl md:text-2xl lg:text-4xl font-bold">{{ resource.name }}</h3>
          <p class="text-base md:text-lg lg:text-2xl">{{ resource.description }}</p>
          <a :href="resource.link" target="_blank" rel="noopener noreferrer"
            class="bg-[#C9B23A] rounded-lg px-4 py-2 w-fit md:my-8 my-2 text-center font-semibold text-black transition duration-150 ease-out hover:ease-in hover:opacity-80 text-base md:text-lg lg:text-2xl">
            Learn more
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const { resources } = await useWebsiteData();
</script>

<style scoped></style>