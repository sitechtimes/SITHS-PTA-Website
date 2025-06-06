<template>
  <div>
    <div v-if="leadershipMembers.length > 0" class="flex flex-wrap justify-around px-2">
      <MemberProfile
        v-for="member in leadershipMembers"
        :key="member._id"
        :member="member"
      />
    </div>
    <div v-if="otherMembers.length > 0" class="flex flex-wrap justify-around px-2">
      <MemberProfile
        v-for="member in otherMembers"
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

const { leadershipMembers, otherMembers } = computed(() => {
  const leadershipRoles = { President: 1, 'Co-Vice President': 2 }
  const leadership = [], other = []

  for (const member of props.ptaMembers) {
    (leadershipRoles[member.role?.trim()] ? leadership : other).push(member)
  }

  const sorted = leadership.sort((a, b) => leadershipRoles[a.role?.trim()] - leadershipRoles[b.role?.trim()] || (a.name || '').localeCompare(b.name || ''))
  other.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
  console.log(sorted, other)
  return { leadershipMembers: leadership, otherMembers: other }
}).value
</script>
