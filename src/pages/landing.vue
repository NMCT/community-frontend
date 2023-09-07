<script setup lang="ts">
import WrapBalancer from 'vue-wrap-balancer'
import CallToAction from '@/components/elements/CtaBold.vue'
import CtaSubtile from '@/components/elements/CtaSubtile.vue'
import Event from '@/components/cards/Event.vue'
import { Event as IEvent } from '@/gql/graphql'
import { useRouter } from 'vue-router'
const router = useRouter()

const mockupEvent: IEvent = {
  id: '1',
  title: 'Prototyping consult',
  description: 'Event description',
  location: 'A.2.301',
  audience: '2MCT',
  startDate: '12/09/2023',
  endDate: 'Event end date',
  attendees: [
    {
      uid: 'Attendee uid',
      profilePicture:
        'https://firebasestorage.googleapis.com/v0/b/community-mct.appspot.com/o/profilePictures%2FgmZ7L1T1LzPnYErPKuZcLrnksKB3?alt=media&token=795a6879-e83b-4364-9723-b2572a2435c7',
    },
    {
      uid: 'Attendee uid 2',
      profilePicture:
        'https://firebasestorage.googleapis.com/v0/b/community-mct.appspot.com/o/profilePictures%2FgmZ7L1T1LzPnYErPKuZcLrnksKB3?alt=media&token=795a6879-e83b-4364-9723-b2572a2435c7',
    },
    {
      uid: 'Attendee uid 3',
      profilePicture:
        'https://firebasestorage.googleapis.com/v0/b/community-mct.appspot.com/o/profilePictures%2FgmZ7L1T1LzPnYErPKuZcLrnksKB3?alt=media&token=795a6879-e83b-4364-9723-b2572a2435c7',
    },
    {
      uid: 'Attendee uid4 ',
      profilePicture:
        'https://firebasestorage.googleapis.com/v0/b/community-mct.appspot.com/o/profilePictures%2FgmZ7L1T1LzPnYErPKuZcLrnksKB3?alt=media&token=795a6879-e83b-4364-9723-b2572a2435c7',
    },
    {
      uid: 'Attendee uid5 ',
      profilePicture:
        'https://firebasestorage.googleapis.com/v0/b/community-mct.appspot.com/o/profilePictures%2FgmZ7L1T1LzPnYErPKuZcLrnksKB3?alt=media&token=795a6879-e83b-4364-9723-b2572a2435c7',
    },
  ],
  organizer: {
    uid: 'Organizer uid',
    name: 'Organizer name',
    email: 'Organizer email',
    profilePicture: 'Organizer profile picture uri',
  },
}
</script>

<template>
  <section class="mb-52 mt-48 flex flex-col items-center justify-center">
    <h2 class="font-title text-8xl text-neutral-700">Get sh*t done!</h2>
    <div class="mt-6 max-w-md text-center font-sans text-lg">
      <wrap-balancer :ratio="0.7">
        With some help from fellow students, you will find extra motivation,
        learn more and get to meet new people!
      </wrap-balancer>
    </div>
    <call-to-action class="mt-6" @click="router.push('/events')">
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 3H3C1.89543 3 1 3.89543 1 5V19C1 20.1046 1.89543 21 3 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14 1V5"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 1V5"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 9H19"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <span class="font-sans">See coming events</span>
    </call-to-action>
  </section>
  <section class="mb-70 flex flex-col items-center justify-center">
    <h3 class="font-title text-6xl text-neutral-700">How it works.</h3>
    <div class="mt-6 max-w-md text-center font-sans text-lg">
      <wrap-balancer :ratio="0.7">
        You are stronger with some help... Work with other students and get more
        done.
      </wrap-balancer>

      <!--      TODO: Illustration here-->
    </div>
  </section>
  <section class="mb-70 flex flex-col items-center justify-center">
    <h3 class="font-title text-6xl text-neutral-700">Coming up</h3>
    <div class="mt-8 text-center text-lg">
      Events to help you to become a better version of you.
    </div>
    <CtaSubtile>
      <span>Check out all events</span>
    </CtaSubtile>
    <div class="mt-13 flex flex-row gap-8">
      <Event :event="mockupEvent"></Event>
      <Event :event="mockupEvent"></Event>
      <Event :event="mockupEvent"></Event>
    </div>
  </section>
</template>

<style scoped></style>
