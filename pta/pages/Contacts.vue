<template>
  <div id="container" class="mt-9 flex flex-col justify-center">
    <h1 id="heading" class="text-4xl sm:text-5xl font-bold text-center">CONTACTS</h1>
    <div id="buttons" class="text-3xl mt-8 font-semibold text-center">
      <button
        id="join"
        @click="buttonClick($event)"
        :class="{ 'bg-white': buttonType === 'join' }"
        class="mx-1 hover:opacity-70 duration-500 text-lg md:text-2xl xl:text-3xl w-1/4 md:w-1/6 xl:w-1/6 py-2 rounded-xl xl:mx-6">
        Join Us
      </button>
      <button
        id="staff"
        @click="buttonClick($event)"
        :class="{ 'bg-white': buttonType === 'staff' }"
        class="mx-1 hover:opacity-70 duration-500 text-lg md:text-2xl xl:text-3xl w-1/4 md:w-1/6 xl:w-1/6 py-2 rounded-xl xl:mx-6">
        Staff
      </button>
      <button
        id="slt"
        @click="buttonClick($event)"
        :class="{ 'bg-white': buttonType === 'slt' }"
        class="mx-1 hover:opacity-70 duration-500 text-lg md:text-2xl xl:text-3xl w-1/4 md:w-1/6 xl:w-1/6 py-2 rounded-xl xl:mx-6">
        The SLT
      </button>
    </div>
    <div id="description" class="flex justify-center my-6">
      <div v-if="buttonType === 'join'" class="bg-white rounded-3xl w-5/6 md:w-3/4 xl:w-7/12 p-4 md:p-12">
        <JoinUs />
      </div>
      <div v-if="buttonType === 'staff'" class="bg-white rounded-3xl w-11/12 md:w-3/4 xl:w-7/12 pt-4 md:p-12">
        <Staff :pta-members="staffMembers.sort((a, b) => a.order - b.order)" />
      </div>
      <div v-if="buttonType === 'slt'" class="bg-white rounded-3xl w-11/12 md:w-3/4 xl:w-7/12 pt-4 md:p-12">
        <Staff :pta-members="sltMembers.sort((a, b) => a.order - b.order)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";

const buttonType = ref("join");
function buttonClick(event) {
  buttonType.value = event.target.id;
}
const { staffMembers, sltMembers } = await useWebsiteData();
console.log(staffMembers, sltMembers);
onMounted(() => {
  var tl = gsap.timeline();
  tl.from("#heading", { opacity: 0, y: 70, duration: 0.5 }).from("#buttons", { opacity: 0, y: 50, duration: 0.5 }).from("#description", { opacity: 0, y: 50, duration: 0.5 });
});
</script>

<style scoped></style>
