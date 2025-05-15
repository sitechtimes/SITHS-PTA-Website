<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
      <button class="absolute top-4 right-4 text-2xl" @click="$emit('close')">&times;</button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
</script>