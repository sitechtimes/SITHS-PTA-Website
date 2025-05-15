<template>
  <div class="min-h-screen py-8 px-4">
    <h1 class="text-5xl font-bold text-center mb-10 tracking-wide text-[#4b3a23]">EVENTS</h1>
    <div class="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      <div class="flex-1 lg:w-1/2 w-full">
        <h2 class="text-2xl font-bold mb-8 text-[#4b3a23] tracking-wide">UPCOMING EVENTS</h2>
        <ul v-if="events.length">
          <li
            v-for="event in events"
            :key="event.id"
            class="bg-white rounded-xl mb-6 px-8 py-6 flex items-center justify-between shadow transition hover:shadow-lg text-lg"
          >
            <div class="font-semibold">{{ event.summary }}</div>
            <div class="ml-8 text-right font-medium text-[#4b3a23]">
              <span v-if="event.start?.dateTime">
                {{ new Date(event.start.dateTime).toLocaleDateString() }}
              </span>
              <span v-else-if="event.start?.date">
                {{ new Date(event.start.date).toLocaleDateString() }}
              </span>
            </div>
          </li>
        </ul>
        <div v-else class="text-lg text-gray-500 mt-8">No events found.</div>
      </div>
      <div class="flex-1 lg:w-1/2 w-full flex justify-center items-start">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=6451dd61d5cf381222e6f6c765ac5e326847743184a91af0f854ca6fd3920764%40group.calendar.google.com&ctz=America%2FNew_York"
          style="border: 0"
          width="100%"
          height="600"
          frameborder="0"
          scrolling="no"
          class="rounded-2xl shadow"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const events = ref([]);

onMounted(async () => {
  const url = 'https://www.googleapis.com/calendar/v3/calendars/6451dd61d5cf381222e6f6c765ac5e326847743184a91af0f854ca6fd3920764@group.calendar.google.com/events?key=AIzaSyDVFq2-peB2fQA3Oiezt-ihZqzII49pWAU';
  try {
    const res = await fetch(url);
    const data = await res.json();
    events.value = data.items || [];
  } catch (e) {
    events.value = [];
  }

  gsap.from("h1", { delay: 0.5, duration: 0.7, y: 100, opacity: 0 });
});
</script>