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
      <div id="secondSection" class="flex-1 w-full lg:w-auto mx-4 mb-8 lg:mb-0">
        <div v-for="info in websiteInformation" id="email" class="flex my-4">
          <img src="/icons/envelope.svg" alt="Email" class="w-6">
          <p class="ml-3">{{ info.title }}</p>
        </div>
      </div>
      <div id="thirdSection" class="flex-1 w-full lg:w-auto mx-4">
        <h2 class="font-bold">About Us</h2>
        <p class="text-sm mb-8">
          {{ websiteInformation.about }}
        </p>
        <NuxtLink to="/Donate" class="bg-dark-brown text-white p-3 text-sm rounded-lg">Donate Now!</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { websiteInformation } = await useWebsiteData()
</script>

<style scoped>
</style>