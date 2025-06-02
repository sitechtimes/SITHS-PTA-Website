<template>
  <footer>
    <div id="sections" class="flex flex-col items-center sm:flex-row my-7 mx-4 xl:mx-14 p-4">
      <div id="firstSection" class="flex-1 w-full lg:w-auto mx-4 mb-8 lg:mb-0">
        <img src="/logo/pta-logo.png" alt="PTA Logo" class="w-4/11" />
        <div id="links" class="mt-5 text-md">
          <NuxtLink to="/">Home</NuxtLink> |
          <NuxtLink to="/events">Events</NuxtLink> |
          <NuxtLink to="/contacts">Contact Us</NuxtLink> |
          <NuxtLink to="/donate">Donate</NuxtLink>
        </div>
        <p class="text-xs mt-2">SITHS PTA @2024</p>
      </div>
      <div class="flex-1 lg:w-auto mb-8 lg:mb-90 flex flex-col flex-wrap justify-center max-w-96 max-h-80">
        <div v-for="info in websiteInformation" id="email" class="flex flex-col items-center my-1 sm:w-1/3 max-w-64">
          <img :src="info.imageUrl" :alt="info.title" class="w-8 mb-2">
          <a :href="info.link" class="text-center">{{ info.title }}</a>
        </div>
      </div>
      <div id="thirdSection" class="flex-1 w-full lg:w-auto mx-4">
        <h2 class="font-bold">About Us</h2>
        <p class="text-sm mb-8">
          {{ homePageContent.about }}
        </p>
        <NuxtLink to="/Donate" class="bg-dark-brown text-white p-3 text-sm rounded-lg">Donate Now!</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { websiteInformation, homePageContent } = await useWebsiteData()
</script>

<style scoped>
</style>