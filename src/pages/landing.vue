<script setup lang="ts">
import WrapBalancer from 'vue-wrap-balancer'
import CallToAction from '@/components/elements/CtaBold.vue'
import CtaSubtile from '@/components/elements/CtaSubtile.vue'
import Event from '@/components/cards/Event.vue'
import { Event as IEvent, EventType } from '@/gql/graphql'
import { useRouter } from 'vue-router'
import CalendarSvg from '@/components/svg/CalendarSvg.vue'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'

const router = useRouter()

const { result, error, loading } = useQuery(
  graphql(`
    query getUpcomingEvents($afterDate: DateTime) {
      eventsGuest(where: { startDate: { gt: $afterDate } }, take: 3) {
        items {
          id
          startDate
          attendees {
            profilePicture
            uid
          }
          interested {
            profilePicture
            uid
          }
          audience
          title
          location
        }
      }
    }
  `),
  {
    afterDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
)
</script>

<template>
  <section
    class="my-20 flex flex-col items-center justify-center md:mb-52 md:mt-48"
  >
    <h2 class="font-title text-4xl text-neutral-700 md:text-8xl">
      Get sh*t done!
    </h2>
    <div class="mt-6 max-w-md text-center font-sans md:text-lg">
      <wrap-balancer :ratio="0.7">
        With some help from fellow students, you will find extra motivation,
        learn more and get to meet new people!
      </wrap-balancer>
    </div>
    <call-to-action class="mt-6" @click="router.push('/events')">
      <CalendarSvg />

      <span class="font-sans">See coming events</span>
    </call-to-action>
  </section>
  <section class="md:mb-70 my-20 flex flex-col items-center justify-center">
    <h3 class="font-title text-3xl text-neutral-700 md:text-6xl">
      How it works.
    </h3>
    <div class="mt-6 max-w-md text-center font-sans md:text-lg">
      <wrap-balancer :ratio="0.7">
        You are stronger with some help... Work with other students and get more
        done.
      </wrap-balancer>

      <!--      TODO: Illustration here-->
    </div>
  </section>
  <section class="md:mb-70 mb-20 flex flex-col items-center justify-center">
    <h3 class="font-title text-3xl text-neutral-700 md:text-6xl">Coming up</h3>
    <div class="mt-8 text-center text-lg">
      Events to help you to become a better version of you.
    </div>
    <CtaSubtile>
      <span>Check out all events</span>
    </CtaSubtile>
    <div
      class="mt-13 layout grid gap-8 md:flex md:flex-row md:flex-wrap md:justify-center"
      v-if="result && result.eventsGuest"
    >
      <Event
        class="md:w-md"
        :event="event as IEvent"
        v-for="event of result.eventsGuest.items"
        :key="event.id"
      />
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 768px) {
  .layout {
    grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
    grid-template-rows: max-content;
  }
}
</style>
