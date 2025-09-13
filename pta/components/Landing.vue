<template>
  <div class="grid lg:grid-cols-2 my-16 mx-2">
    <div class="mx-4 md:mx-16">
      <h2 class="font-normal lg:text-2xl md:xl" id="PTA">
        Parent Teacher Association @
      </h2>
      <h1
        class="font-bold tracking-tight text-6xl md:text-7xl xl:text-8xl"
        id="SITHS"
      >
        STATEN ISLAND TECHNICAL HIGH SCHOOL
      </h1>
      <h2 class="font-normal my-4 lg:text-2xl md:xl" id="address">
        485 Clawson Street, Staten Island, NY 10306
      </h2>
    </div>
    <div class="mx-4 md:mx-16 lg:mx-10 flex flex-col justify-center">
      <div id="upcomingEvents">
        <h1
          class="subh flex items-center justify-start gap-2 font-bold text-2xl lg:text-4xl mb-3 text-[#4b3a23]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            class="size-5 lg:size-8 fill-current"
          >
            <path
              d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75H192 160 64c-35.3 0-64 28.7-64 64v96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V352l8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V300.4c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4V32zm-64 76.7V240 371.3C357.2 317.8 280.5 288 200.7 288H192V192h8.7c79.8 0 156.5-29.8 215.3-83.3z" />
          </svg>
          Upcoming Events
        </h1>
        <ul class="space-y-2">
          <li
            v-for="event in events.slice(0, 4)"
            :key="event.id"
            class="upcoming-event-li bg-white rounded-lg px-4 py-3 flex items-center justify-between shadow text-base hover:shadow-lg transition cursor-pointer"
            @click="openPopup(event)">
            <div class="flex-1 flex items-center gap-4">
              <div>
                <h5 class="font-semibold">{{ event.summary }}</h5>
                <h5 class="text-gray-500 text-sm">
                  {{ formatDateRange(event.start, event.end) }}
                </h5>
              </div>
            </div>
          </li>
        </ul>
        <Popup v-if="showPopup" @close="showPopup = false">
          <h2 class="text-xl font-bold mb-2">{{ selectedEvent?.summary }}</h2>
          <p class="mb-4 text-gray-700 whitespace-pre-line">{{ selectedEvent?.description || "No description available." }}</p>
          <div v-if="selectedEvent?.location" class="mb-2 text-sm text-gray-500">Location: {{ selectedEvent.location }}</div>
          <div v-if="selectedEvent?.start?.dateTime" class="mb-2 text-sm text-gray-500">Start: {{ new Date(selectedEvent.start.dateTime).toLocaleString() }}</div>
          <div v-if="selectedEvent?.end?.dateTime" class="mb-2 text-sm text-gray-500">End: {{ new Date(selectedEvent.end.dateTime).toLocaleString() }}</div>
        </Popup>
        <div v-if="!events.length" class="text-base text-gray-500 mt-4">No events found.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import Popup from "./Popup.vue";

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

onMounted(async () => {
  const url =
    "https://www.googleapis.com/calendar/v3/calendars/6451dd61d5cf381222e6f6c765ac5e326847743184a91af0f854ca6fd3920764@group.calendar.google.com/events?key=AIzaSyDVFq2-peB2fQA3Oiezt-ihZqzII49pWAU";
  try {
    const res = await fetch(url);
    const data = await res.json();
    events.value = data.items || [];
  } catch (e) {
    events.value = [];
  }
  gsap.from("#PTA, #SITHS, #address", {
    delay: 0.5,
    duration: 0.7,
    y: 100,
    opacity: 0,
  });
});
</script>
