<script setup lang="ts">
import type { PropType } from 'vue'
import { Event } from '@/gql/graphql'
import { computed } from 'vue'
import CtaSubtile from '@/components/elements/CtaSubtile.vue'

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
})

const attendeeCount = computed(() => {
  return props.event.attendees.length
})
</script>

<template>
  <div>
    <div>{{ event.title }}</div>
    <div>{{ event.location }} voor {{ event.audience }}</div>
    <div>{{ event.startDate }}</div>
    <div v-if="attendeeCount > 0">
      <div v-for="index of attendeeCount <= 4 ? attendeeCount : 4">
        <img :src="event.attendees[index].profilePicture" alt="" />
      </div>
    </div>

    <div>{{ attendeeCount }} aanwezigen</div>
    <CtaSubtile> ook gaan?</CtaSubtile>
  </div>
</template>

<style scoped></style>
