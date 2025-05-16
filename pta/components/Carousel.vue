<template>
  <div
    ref="carouselRef"
    class="carousel h-60 w-auto sm:h-80 sm:w-3/4 mx-auto mt-6 lg:mt-0 lg:float-right flex rounded-3xl"
  >
    <div
      v-for="image in galleryImages"
      class="carousel-item relative w-full lg:h-80"
    >
      <img
        :src="image.src"
        class="w-full h-full object-cover"
        :alt="image.alt"
      />
      <div class="absolute left-5 right-5 top-1/2 flex justify-between">
        <button @click.prevent="goToSlide(currentSlideIndex - 1)" class="btn btn-circle">❮</button>
        <button @click.prevent="goToSlide(currentSlideIndex + 1)" class="btn btn-circle">❯</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { galleryImages } = useWebsiteData();
const currentSlideIndex = ref(0);
const carouselRef = ref(null);

function goToSlide(index) {
  const total = galleryImages.value.length;
  if (total === 0) return;

  currentSlideIndex.value = (index + total) % total;

  const carousel = carouselRef.value;
  if (carousel) {
    const slideWidth = carousel.offsetWidth;
    carousel.scrollTo({
      left: slideWidth * currentSlideIndex.value,
      behavior: 'smooth',
    });
  }
}
</script>
