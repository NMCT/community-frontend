<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { Event } from '@/gql/graphql'
import CtaSubtile from '@/components/elements/CtaSubtile.vue'
import { RouterLink } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase.ts'

const { currentUser } = useFirebase()

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
})

const attendeeCount = computed(() => {
  return props.event.attendees?.length
})

/**
 * Amount of attendees to display
 * If there are 4 or less attendees, display all of them
 * If there are more than 4 attendees, display 3 and show the amount of attendees
 */
const amountOfDisplayAttendees = computed(() => {
  if (attendeeCount.value == undefined) return 0
  if (attendeeCount.value == 4) return 4
  return Math.min(3, attendeeCount.value)
})

/**
 * Formatted start date of the event to a readable format with leading zero's
 */
const startDate = computed(() => {
  const date = new Date(props.event.startDate)
  // format DD/MM/YYYY with leading zero
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
})

/**
 * Check if the current user is attending the event
 */
const isAttending = computed(() => {
  return props.event.attendees?.some(
    attendee => attendee.uid === currentUser?.uid,
  )
})

/**
 * Check if the current user is interested in the event
 */
const isInterested = computed(() => {
  return props.event.interested?.some(
    attendee => attendee.uid === currentUser?.uid,
  )
})

const manageRSVP = () => {
  if (isAttending.value) {
    // unattend
  } else if (isInterested.value) {
    // attend
  } else {
    // interested
  }
}
</script>

<template>
  <router-link
    :to="`/events/${props.event.id}`"
    class="rounded-2 p4 flex-col justify-between gap-6 border-4 border-neutral-300 md:flex"
  >
    <div class="flex-row justify-between md:flex">
      <div class="md:max-w-[60%]">
        <div
          class="font-title text-wrap text-xl leading-10 text-neutral-700 md:text-3xl"
        >
          {{ event.title }}
        </div>
        <div class="font-menlo text-xs leading-8 text-neutral-500">
          {{ event.location }} for {{ event.audience }}
        </div>
      </div>
      <div class="font-menlo leading-10 text-neutral-500">
        {{ startDate }}
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <div v-if="attendeeCount && attendeeCount > 0" class="flex flex-row">
        <div
          v-for="index of amountOfDisplayAttendees"
          :class="index !== 1 ? '-ml-3' : ''"
        >
          <img
            class="h-10 w-10 rounded-full"
            v-if="event.attendees"
            :src="
              event.attendees[index - 1].profilePicture ??
              'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
            "
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
          {{ attendeeCount }} {{ attendeeCount > 1 ? 'attendees' : 'attendee' }}
        </div>
      </div>
      <div v-else>
        <!--       Todo: text update niemand is ingeschreven /-->
        No attendees yet
      </div>

      <CtaSubtile @click.prevent="manageRSVP" class="hidden p-2 sm:block">
        <div v-if="isAttending">Going</div>
        <div v-else-if="isInterested">Interested</div>
        <div v-else>Attend?</div>
      </CtaSubtile>
    </div>
  </router-link>
</template>

<style scoped></style>
