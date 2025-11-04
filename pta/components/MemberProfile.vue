<template>
  <div
    id="profile"
    class="content-center w-1/2 my-4 flex items-center text-center text-wrap flex-col px-1"
  >
    <img
      :src="member.profilePhotoUrl || '/pfps/default-profile.webp'"
      :alt="member.name"
      class="rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover"
    />
    <h2 class="text-sm sm:text-xl mt-2 font-bold">{{ member.name }}</h2>
    <p v-if="member.role" class="text-sm sm:text-xl mt-2">
      {{ member.role }}
    </p>
    <p v-if="member.email" class="text-xs sm:text-lg mt-2">
      {{ member.email }}
    </p>
    <p v-if="member.phone" class="text-xs sm:text-lg mt-2 mb-4">
      {{ member.phone }}
    </p>
    <p v-if="member.optionalText" class="text-xs sm:text-lg mb-4">
      {{ member.optionalText }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  member: {
    type: Object,
    required: true
  }
});
</script>
