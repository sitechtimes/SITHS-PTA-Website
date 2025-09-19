<template>
  <div class="mx-10 lg:mx-22 lg:mt-9">
    <h1 id="title" class="text-4xl sm:text-5xl font-bold text-center">DONATIONS</h1>
    <div class="my-12">
      <h2 id="bake" class="text-3xl sm:text-4xl font-bold">Bake Sales</h2>
      <div v-if="bakeSales && bakeSales.length > 0" class="text-lg sm:text-xl lg:text-2xl my-6">
          <PortableText :value="bakeSales" />

        <div v-if="donationLink">
        <a id="button" target="_blank" :href="donationLink" rel="noopener noreferrer" >
          <button class="py-3 px-4 font-bold rounded-lg my-2 bg-dark-brown text-white text-lg">Donate Item</button>
        </a>
        </div>
      
    </div>

      
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
  donationLink: { type: String, required: false },
});

onMounted(() => {
  const tl = gsap.timeline();
  tl.from("#title", { opacity: 0, y: 20, duration: 0.5 })
    .from("#bake", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
    .from("#paragraph1", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
    .from("#paragraph2", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
    .from("#paragraph3", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
    .from("button", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
    .from("#monetary", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
    .from("#paragraph5", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
    .from("#paragraph6", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3");
});
</script>

<style scoped></style>
