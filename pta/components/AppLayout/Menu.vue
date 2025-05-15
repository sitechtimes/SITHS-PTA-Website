<template>
  <div class="menu fixed top-0 left-0 right-0 z-80">
    <div class="check fixed lg:top-10 lg:left-85 lg:right-5 top-10 lg-left-60 right-20 z-10">
      <label for="active" class="menu-btn flex flex-col gap-y-1 w-10 pt-2 cursor-pointer relative">
        <input id="active" v-model="show" type="checkbox"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        <div :class="{ 'opacity-0': show }" class="bg-[#483221] h-1 rounded-md"></div>
        <Transition name="rotate-mid">
          <div v-if="show" class="rotate-mid -rotate-45 bg-[#483221] h-1 rounded-md"></div>
          <div v-else class="bg-[#483221] h-1 rounded-md"></div>
        </Transition>
        <Transition name="rotate-bot">
          <div v-if="show" class="rotate-45 -translate-y-[7px] bg-[#483221] h-1 rounded-md"></div>
          <div v-else class="bg-[#483221] h-1 rounded-md"></div>
        </Transition>
      </label>
    </div>

    <Transition name="slide">
      <div v-if="show"
        class="justify-self-auto bg-gradient-to-b from-[#ffb393] via-[#fff1d7] to-[#fff] w-screen h-dvh absolute z-0">
        <div class="mt-36 ml-16 space-y-8">
          <NuxtLink to="/" @click="closeMenu" class="w-11 hover:opacity-50 flex flex-row self-center text-lg font-bold">
            <img class="icon" id="home" src="/public/navbarIcons/house.svg">
            <div class="self-center ml-2">HOME</div>
          </NuxtLink>
          <NuxtLink to="/events" @click="closeMenu" class="w-11 hover:opacity-50 flex flex-row self-center text-lg font-bold">
            <img class="icon" id="events" src="/public/navbarIcons/calendar.svg">
            <div class="self-center ml-2">EVENTS</div>
          </NuxtLink>
          <NuxtLink to="/contacts" @click="closeMenu" class="w-11 hover:opacity-50 flex flex-row self-center text-lg font-bold">
            <img class=" icon" id="contacts" src="/public/navbarIcons/envelope.svg">
            <div class="self-center ml-2 whitespace-nowrap">JOIN US</div>
          </NuxtLink>
          <NuxtLink to="/donate" @click="closeMenu" class="w-11 hover:opacity-50 flex flex-row self-center text-lg font-bold">
            <img class="icon" id="donate" src="/public/navbarIcons/creditCard.svg">
            <div class="self-center ml-2">DONATE</div>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);

const closeMenu = () => {
  setTimeout(() => {
    show.value = false;
  }, 300); //delay for UX
};
</script>



<style scoped>
@keyframes slide-right {
  0% {
    right: -100%;
  }

  50% {
    right: -100%;
  }

  100% {
    right: 0;
  }
}

@keyframes slide-left {
  0% {
    right: 0%;
  }

  50% {
    right: -100%;
  }

  100% {
    right: -100%;
  }
}

.slide-enter-active,
.slide-leave-active {
  animation: slide-right 0.4s;
}

.slide-enter-from,
.slide-leave-to {
  animation: slide-left 0.3s
}
</style>