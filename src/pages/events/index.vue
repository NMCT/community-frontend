<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { Event as IEvent, EventInput, SortEnumType } from '@/gql/graphql.ts'
import { ref, watch } from 'vue'
import { useFirebase } from '@/composables/useFirebase.ts'
import Event from '@/components/cards/Event.vue'
import CtaBold from '@/components/elements/CtaBold.vue'
import CalendarSvg from '@/components/CalendarSvg.vue'
import WrapBalancer from 'vue-wrap-balancer'
import Loader from '@/components/elements/Loader.vue'
import AudienceSelector from '@/components/elements/AudienceSelector.vue'

const { firebaseUser } = useFirebase()

const audience = ref<string>('')
const order = ref<SortEnumType>(SortEnumType.Desc)

interface IEvents {
  events: {
    items: IEvent[]
  }
}

const { result, loading, error, refetch } = useQuery<IEvents>(
  graphql(`
    query getEvents(
      $afterDate: DateTime
      $audience: String
      $order: SortEnumType
    ) {
      events(
        where: {
          startDate: { gt: $afterDate }
          audience: { contains: $audience }
        }
        order: { startDate: $order }
      ) {
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
  () => ({
    // todo: set afterDate to decided time before now
    afterDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    audience: audience.value,
    order: order.value,
  }),
)
console.log(result)

const toggleOrder = () => {
  if (order.value === SortEnumType.Desc) {
    order.value = SortEnumType.Asc
  } else {
    order.value = SortEnumType.Desc
  }
}

const input = ref<EventInput | null>(null)
const token = ref<string>()

if (!firebaseUser.value) throw new Error()

watch(token, async () => {
  console.log('your token', token.value)
})

const updateAudience = (e: any) => {
  if (e.target) {
    return
  }
  console.log(e)
  refetch({
    audience: e,
  })
}
</script>

<template>
  <section class="mx-a max-w-[90rem]">
    <div
      class="mt-40 grid grid-flow-col grid-cols-2 grid-rows-2 justify-between gap-y-10"
    >
      <h2 class="font-title text-8xl text-neutral-700">Events</h2>

      <p class="max-w-md text-lg">
        <wrap-balancer>
          Pick events that you like. Specify the year or semesters that you are
          in, for better suggestions.
        </wrap-balancer>
      </p>

      <RouterLink to="/new" class="self-end justify-self-end">
        <CtaBold>
          <CalendarSvg />
          Create an event
        </CtaBold>
      </RouterLink>
      <div class="flex flex-row self-end justify-self-end">
        <AudienceSelector
          class="p2 b-3 rounded-2 w-min"
          @change="updateAudience"
        />
        <button @click="toggleOrder">{{ order }}</button>
      </div>
    </div>
    <Loader v-if="loading"></Loader>
    <div v-else-if="result" class="werk mt-16">
      <Event
        class="min-h-full"
        v-for="event of result.events.items"
        :event="event"
        :key="event.id"
      ></Event>
    </div>
  </section>
</template>
<style scoped>
.werk {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  grid-template-rows: max-content;
}
</style>
