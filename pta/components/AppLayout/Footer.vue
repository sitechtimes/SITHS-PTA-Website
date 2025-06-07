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
      <div class="flex-1 lg:w-auto mb-8 flex flex-col justify-center">
        <div class="flex flex-col flex-wrap content-start justify-start max-h-50">
          <div v-for="(info, index) in websiteInformation" :key="index">
            <div v-if="info.title" class="flex items-center py-1">
              <img :src="info.imageUrl" :alt="info.title" class="w-8 h-8 m-2 shrink-0">
              <a v-if="info.link" :href="info.link" class="text-left text-sm">{{ info.title }}</a>
              <span v-else class="text-left text-sm">{{ info.title }}</span>
            </div>
          </div>
        </div>
        <div class="flex mt-4 space-x-3">
          <div v-for="(info, index) in websiteInformation" :key="index">
            <div v-if="!info.title" class="p-1">
              <a :href="info.link" target="_blank" rel="noopener noreferrer" :aria-label="info.link || 'External Link'">
                <img :src="info.imageUrl" :alt="info.link || 'Icon'" class="w-8" aria-hidden="true">
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="thirdSection" class="flex-1 w-full lg:w-auto mx-4">
        <h2 class="font-bold">About Us</h2>
        <ClientOnly>
          <p class="text-sm mb-8">
            <PortableText v-if="aboutUsContent && aboutUsContent[0]" :value="aboutUsContent[0]" />
          </p>
        </ClientOnly>
        <NuxtLink to="/Donate" class="bg-dark-brown text-white p-3 text-sm rounded-lg">Donate Now!</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'
const { websiteInformation } = await useWebsiteData()
const { aboutUsContent } = await fetchTextData()
</script>

<style scoped>
</style>