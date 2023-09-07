<template>
  <h2 class="font-title text-8xl text-neutral-700">Events</h2>

  <p class="max-w-md text-lg">
    <wrap-balancer>
      Pick events that you like. Specify the year or semesters that you are in,
      for better suggestions.
    </wrap-balancer>
  </p>

  <RouterLink to="/new">
    <CtaBold>
      <CalendarSvg />
      Create an event
    </CtaBold>
  </RouterLink>
  <div class="p2 border-3 rounded-2 w-min">SortPlaceholder</div>
  <div class="p2 border-3 rounded-2 w-min">FilterPlaceholder</div>

  <div v-if="loading">...</div>
  <div v-else-if="result">
    <Event
      v-for="event of result.events.items"
      :event="event"
      :key="event.id"
    ></Event>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { Event as IEvent, EventInput } from '@/gql/graphql.ts'
import { ref, watch } from 'vue'
import { useFirebase } from '@/composables/useFirebase.ts'
import Event from '@/components/cards/Event.vue'
import CtaBold from '@/components/elements/CtaBold.vue'
import CalendarSvg from '@/components/CalendarSvg.vue'

const { firebaseUser } = useFirebase()

console.log(firebaseUser.value?.uid)

interface IEvents {
  events: {
    items: IEvent[]
  }
}

const { result, loading, error } = useQuery<IEvents>(
  graphql(`
    query getEvents($afterDate: DateTime) {
      events(where: { startDate: { gt: $afterDate } }) {
        items {
          id
          startDate
          attendees {
            profilePicture
          }
          audience
          title
          location
        }
      }
    }
  `),
  () => ({
    // todo: set afterDate to decided time before now
    afterDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
  }),
)
console.log(result)

const input = ref<EventInput | null>(null)
const token = ref<string>()

if (!firebaseUser.value) throw new Error()

watch(token, async () => {
  console.log('your token', token.value)
})
</script>

<style scoped></style>
