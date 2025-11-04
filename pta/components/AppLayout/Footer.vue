<template>
  <footer>
    <div id="sections" class="flex flex-col items-center sm:flex-row my-7 mx-4 xl:mx-14 p-4">
      <div id="firstSection" class="flex-1 w-full lg:w-auto mx-4 mb-8 lg:mb-0">
        <img src="/logo/pta-logo.png" alt="PTA Logo" class="w-4/11" />
        <div id="links" class="mt-5 text-l">
          <NuxtLink to="/">Home</NuxtLink> | <NuxtLink to="/events">Events</NuxtLink> | <NuxtLink to="/contacts">Contact Us</NuxtLink> |
          <NuxtLink to="/donate">Donate</NuxtLink>
        </div>
        <p class="text-md mt-2">SITHS PTA @{{ new Date().getFullYear() }}</p>
        <a href="mailto: sitechpta@gmail.com" target="_blank" rel="noopener noreferrer"> sitechpta@gmail.com</a>
              <p>
          {{ studentCredit }}
        </p>
      </div>
      <div class="flex-1 lg:w-auto mb-8 flex flex-col justify-center">
        <div class="flex flex-col flex-wrap content-start justify-start max-h-50">
          <div v-for="info in websiteInformation" :key="info.title">
            <div v-if="info.title" class="flex items-center py-1 text-sm">
              <img :src="info.imageUrl" alt="" class="w-8 h-8 m-2 shrink-0" />
              <a v-if="info.link" :href="info.link" target="_blank" >{{ info.title }}</a>
              <span v-else>{{ info.title }}</span>
            </div>
          </div>
        </div>
        <div class="flex mt-4 space-x-3">
          <div v-for="info in websiteInformation" :key="info.title">
            <div v-if="!info.title" class="p-1">
              <a :href="info.link" target="_blank" rel="noopener noreferrer" :aria-label="info.link || 'External Link'">
                <img :src="info.imageUrl" class="w-8" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="thirdSection" class="flex-1 w-full lg:w-auto mx-4">
        <h2 class="font-bold">About Us</h2>
        <div class="text-sm mb-8">
          <PortableText v-if="footerAboutUsText && footerAboutUsText.length" :value="footerAboutUsText" />
        </div>
        <NuxtLink
          v-if="footerAboutUsButtonText && footerAboutUsButtonLink"
          :to="footerAboutUsButtonLink"
          class="bg-dark-brown text-white p-3 text-sm rounded-lg mr-2"
        >
          {{ footerAboutUsButtonText }}
        </NuxtLink>
        <a
          v-if="footerDonateButtonText && footerDonateButtonLink"
          :href="footerDonateButtonLink"
          class="bg-dark-brown text-white p-3 text-sm rounded-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ footerDonateButtonText }}
        </a>
      </div>
    </div>
    <div id="footer-bottom" class="w-full text-sm py-2 px-6 text-left">
  <p>{{ footerStudentCredit }}</p>
</div>
  </footer>
</template>

<script setup type="ts">
import { PortableText } from '@portabletext/vue'
const { websiteInformation } = await useWebsiteData()
const {
  footerAboutUsText,
  footerAboutUsButtonText,
  footerAboutUsButtonLink,
  footerDonateButtonText,
  footerDonateButtonLink,
  studentCredit
} = await fetchTextData();
</script>

<style scoped></style>
