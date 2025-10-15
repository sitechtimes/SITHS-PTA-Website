<template>
<header
  :class="[
    'grid grid-cols-5 z-100 w-full justify-end h-fit pb-5 fixed top-0 transition-colors duration-500',
    'bg-gradient-to-b from-[#ffb393]/100 via-[#ffb393]/60 to-screen' 
  ]"
  id="navbar"
>
        <div id="logoContainer" class="col-span-2">
            <NuxtLink to="/">
                <img class="ml-2 mt-1 sm:mt-2 sm:ml-6 scale-75" id="ptaLogo" alt="PTA Logo" src="/public/navbarIcons/pta-logo.png">
            </NuxtLink>
        </div>
        <div id="naV" class="hidden lg:grid grid-cols-4 col-span-3"> 
             <div>
                <NuxtLink to="/" 
                    class="w-8 mt-10 hover:opacity-80 hover:transition-ease-in hover:underline hover:underline-offset-2 duration-150 flex flex-row text-lg font-bold">
                    <img class="icon" alt="Go to Home Page" id="home" src="/public/navbarIcons/house.svg"> 
                    <div class="self-end ml-2">HOME</div>
                </NuxtLink>
             </div>
            <div>
                <NuxtLink to="/events" 
                    class="w-8 mt-10 hover:opacity-80 hover:transition-ease-in hover:underline hover:underline-offset-2 duration-150 flex flex-row text-lg font-bold">
                    <img class="icon" alt="Go to Events" id="events" src="/public/navbarIcons/calendar.svg">
                    <div class="self-end ml-2">EVENTS</div>
            </NuxtLink>
            </div>
            <div>
                <NuxtLink to="/contacts" 
                    class="w-8 mt-10 hover:opacity-80 hover:transition-ease-in hover:underline hover:underline-offset-2 duration-150 flex flex-row text-lg font-bold whitespace-nowrap">
                    <img class="icon" alt="Go to Join Us" id="contacts" src="/public/navbarIcons/envelope.svg">
                    <div class="self-center ml-2">JOIN US</div>
                </NuxtLink>
            </div>
            <div>
                <NuxtLink to="/donate" 
                    class="w-8 mt-10 hover:opacity-80 hover:underline hover:underline-offset-2 hover:transition-ease-in flex flex-row text-lg font-bold">
                    <img class="icon" alt="Go to Donate" id="donate" src="/public/navbarIcons/creditCard.svg">
                    <div class="self-end ml-2">DONATE</div>
                </NuxtLink>
            </div>  
        </div>
        <AppLayoutMenu class="lg:hidden"></AppLayoutMenu>
    </header>
</template>

<script setup>
const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > window.innerHeight/2; 
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>


<style scoped>

</style>