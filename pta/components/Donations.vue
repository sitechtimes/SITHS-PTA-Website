<template>
  <div class="mx-10 lg:mx-22 lg:mt-9">
    <h1 id="title" class="text-4xl sm:text-5xl font-bold text-center">DONATIONS</h1>
    <div class="my-12">
      <h2 id="bake" class="text-3xl sm:text-4xl font-bold">Bake Sales</h2>
      <div v-if="bakeSales && bakeSales.length > 0" class="text-lg sm:text-xl lg:text-2xl my-6">
        <PortableText :value="bakeSales" />
      </div>
      <a id="button" href="https://docs.google.com/forms/d/e/1FAIpQLSfoRbBX2iCx20Kxcud0IcjT2UhmpjaNxDda78V3BIfN_Mw3Dg/viewform" target="_blank" rel="noopener noreferrer">
        <button class="py-3 px-4 font-bold rounded-lg my-2 bg-dark-brown text-white text-lg">Donate Item</button>
      </a>
    </div>
    <div class="my-16">
      <h2 id="monetary" class="text-3xl sm:text-4xl font-bold">Monetary Donations</h2>
      <div v-if="monetaryDonations && monetaryDonations.length > 0" class="text-lg sm:text-xl lg:text-2xl my-6">
        <PortableText :value="monetaryDonations" />
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { PortableText } from "@portabletext/vue";

const props = defineProps({
  bakeSales: { type: Array, required: true },
  monetaryDonations: { type: Array, required: true },
});
</script>

<style scoped></style>
