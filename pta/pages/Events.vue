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
            class="bg-white rounded-xl mb-6 px-8 py-6 flex items-center justify-between shadow transition hover:shadow-lg text-lg cursor-pointer"
            @click="openPopup(event)"
          >
            <div class="font-semibold">{{ event.summary }}</div>
            <div class="ml-8 text-right font-medium text-[#4b3a23]">
              <div>
                {{ formatDateRange(event.start, event.end) }}
              </div>
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
    <Popup v-if="showPopup" @close="showPopup = false">
      <h2 class="text-xl font-bold mb-2">{{ selectedEvent?.summary }}</h2>
      <p class="mb-4 text-gray-700 whitespace-pre-line">{{ selectedEvent?.description || 'No description available.' }}</p>
      <div v-if="selectedEvent?.location" class="mb-2 text-sm text-gray-500">Location: {{ selectedEvent.location }}</div>
      <div v-if="selectedEvent?.start?.dateTime" class="mb-2 text-sm text-gray-500">
        Start: {{ new Date(selectedEvent.start.dateTime).toLocaleString() }}
      </div>
      <div v-if="selectedEvent?.end?.dateTime" class="mb-2 text-sm text-gray-500">
        End: {{ new Date(selectedEvent.end.dateTime).toLocaleString() }}
      </div>
    </Popup>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import Popup from '../components/Popup.vue';

const events = ref([]);
const showPopup = ref(false);
const selectedEvent = ref(null);

function openPopup(event) {
  selectedEvent.value = event;
  showPopup.value = true;
}

function formatDate(dateObj) {
  if (!dateObj) return 'N/A';
  
  const date = dateObj.dateTime ? new Date(dateObj.dateTime) : 
               dateObj.date ? new Date(dateObj.date) : null;
  
  if (!date) return 'N/A';
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

function formatDateRange(startObj, endObj) {
  const startDate = formatDate(startObj);
  const endDate = formatDate(endObj);
  
  return startDate === endDate ? startDate : `${startDate} → ${endDate}`;
}

function getEventStartDate(event) {
  if (!event.start) return 0;
  
  if (event.start.dateTime) {
    return new Date(event.start.dateTime).getTime();
  } else if (event.start.date) {
    return new Date(event.start.date).getTime();
  }
  
  return 0;
}

onMounted(async () => {
  const url = 'https://www.googleapis.com/calendar/v3/calendars/6451dd61d5cf381222e6f6c765ac5e326847743184a91af0f854ca6fd3920764@group.calendar.google.com/events?key=AIzaSyDVFq2-peB2fQA3Oiezt-ihZqzII49pWAU';
  try {
    const res = await fetch(url);
    const data = await res.json();
    events.value = (data.items || []).sort((a, b) => getEventStartDate(a) - getEventStartDate(b));
  } catch (e) {
    events.value = [];
  }

  gsap.from("h1", { delay: 0.5, duration: 0.7, y: 100, opacity: 0 });
});
</script>