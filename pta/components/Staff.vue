<template>
  <div>
    <div v-if="sortedMembers.length > 0" class="flex flex-wrap justify-around px-2">
      <MemberProfile
        v-for="member in sortedMembers"
        :key="member._id"
        :member="member"
      />
    </div>
  </div>
</template>

<script setup>
import MemberProfile from './MemberProfile.vue'

const props = defineProps({
  ptaMembers: { type: Array, required: true, default: () => [] }
})

const sortedMembers = computed(() => {
  return [...props.ptaMembers].sort((a, b) => {
    if (a.order !== b.order) {
      return (a.order || Infinity) - (b.order || Infinity);
    }
    return (a.name || '').localeCompare(b.name || '');
  });
});
</script>
