<template>
  <div class="carousel h-60 w-auto sm:h-80 sm:w-3/4 mx-auto mt-6 lg:mt-0 lg:float-right flex rounded-3xl">
    <div
      v-for="(image, index) in galleryImages"
      :key="index"
      :id="'slide' + (index + 1)"
      class="carousel-item relative w-full lg:h-80"
    >
      <img
        :src="image.src"
        class="w-full h-full object-cover"
        :alt="image.alt"
      />
      <div class="absolute left-5 right-5 top-1/2 flex justify-between">
        <a :href="'#slide' + (index === 0 ? galleryImages.length : index)" class="btn btn-circle">❮</a>
        <a :href="'#slide' + ((index + 1) % galleryImages.length + 1)" class="btn btn-circle">❯</a>
      </div>
    </div>
  </div>
</template>
<script setup>
const { galleryImages } = useGallery()
</script>