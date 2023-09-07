<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { Event } from '@/gql/graphql'
import CtaSubtile from '@/components/elements/CtaSubtile.vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
})

const attendeeCount = computed(() => {
  // check if props.event.attendees is not undefined
  return props.event.attendees?.length
})
const amountOfDisplayAttendees = computed(() => {
  if (attendeeCount.value == undefined) return 0
  if (attendeeCount.value == 4) return 4
  return Math.min(3, attendeeCount.value)
})

const startDate = computed(() => {
  const date = new Date(props.event.startDate)
  // format DD/MM/YYYY with leading zero
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
})
</script>

<template>
  <router-link
    :to="`/events/${props.event.id}`"
    class="rounded-2 p4 w-md flex flex-col gap-6 border-4 border-neutral-300"
  >
    <div class="flex flex-row justify-between">
      <div class="max-w-[60%]">
        <div class="font-title text-3xl leading-10 text-neutral-700">
          {{ event.title }}
        </div>
        <div class="font-menlo text-xs leading-8 text-neutral-500">
          {{ event.location }} voor {{ event.audience }}
        </div>
      </div>
      <div class="font-menlo leading-10 text-neutral-500">
        {{ startDate }}
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <div v-if="attendeeCount > 0" class="flex flex-row">
        <div
          v-for="index of amountOfDisplayAttendees"
          :class="index !== 1 ? '-ml-3' : ''"
        >
          <img
            class="h-10 w-10 rounded-full"
            :src="event.attendees[index - 1].profilePicture"
            alt=""
          />
        </div>
        <div v-if="attendeeCount > 4">
          <div
            class="-ml3 grid h-10 w-10 place-items-center rounded-full bg-neutral-300"
          >
            <div>+{{ attendeeCount - 3 }}</div>
          </div>
        </div>

        <div class="bg- ml-4 self-center text-lg">
          {{ attendeeCount }} aanwezigen
        </div>
      </div>
      <div v-else>
        <!--       Todo: text update niemand is ingeschreven /-->
        nog niemand ingeschreven
      </div>
      <CtaSubtile> ook gaan?</CtaSubtile>
    </div>
  </router-link>
</template>

<style scoped></style>
