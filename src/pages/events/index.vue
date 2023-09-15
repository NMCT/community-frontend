<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { Event as IEvent, EventInput, SortEnumType } from '@/gql/graphql.ts'
import { ref, watch } from 'vue'
import { useFirebase } from '@/composables/useFirebase.ts'
import Event from '@/components/cards/Event.vue'
import CtaBold from '@/components/elements/CtaBold.vue'
import CalendarSvg from '@/components/svg/CalendarSvg.vue'
import WrapBalancer from 'vue-wrap-balancer'
import Loader from '@/components/elements/Loader.vue'
import AudienceSelector from '@/components/elements/AudienceSelector.vue'
import { LucideArrowDown, LucideArrowUp, LucideSearch } from 'lucide-vue-next'
import { debounce } from 'lodash'

const { firebaseUser } = useFirebase()

const audience = ref<string>('')
const order = ref<SortEnumType>(SortEnumType.Desc)
const searchQuery = ref<string>('')

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
      $query: String
    ) {
      events(
        where: {
          title: { contains: $query }
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
    query: searchQuery.value,
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
  refetch({
    audience: e,
  })
}

const search = (e: any) => {
  console.log(e)
  searchQuery.value = e.target.value
  refetch({
    searchQuery: searchQuery.value,
  })
}

const debouncedSearch = debounce(search, 500)
</script>

<template>
  <section class="2xl:mx-a mx-4 max-w-[90rem] md:mx-8">
    <div
      class="mt-8 grid-flow-col grid-cols-2 grid-rows-2 lg:mt-40 lg:grid lg:justify-between lg:gap-y-10"
    >
      <h2
        class="font-title leading-15 lg:leading-30 text-4xl text-neutral-700 lg:text-8xl"
      >
        Events
      </h2>

      <p class="max-w-md text-lg">
        <wrap-balancer>
          Pick events that you like. Specify the year or semesters that you are
          in, for better suggestions.
        </wrap-balancer>
      </p>

      <RouterLink to="/new" class="self-end justify-self-end">
        <CtaBold class="my-4">
          <CalendarSvg />
          Create an event
        </CtaBold>
      </RouterLink>
      <div class="flex flex-row flex-wrap gap-4 self-end justify-self-end">
        <div class="grid">
          <input
            type="text"
            @input="debouncedSearch"
            placeholder="Search.."
            name="search"
            class="rounded-2 b-3 b-neutral-300 max-w-32 col-start-1 row-start-1 p-1 px-2 md:w-64"
          />
          <LucideSearch
            class="col-start-1 row-start-1 mr-2 h-6 w-6 self-center justify-self-end"
          />
        </div>
        <AudienceSelector
          class="p2 b-3 rounded-2 w-min"
          @change="updateAudience"
        />
        <button class="b-3 b-neutral-300 rounded-2 px-2" @click="toggleOrder">
          <LucideArrowDown v-if="order === SortEnumType.Desc" />
          <LucideArrowUp v-else />
        </button>
      </div>
    </div>
    <Loader v-if="loading"></Loader>
    <div v-else-if="result" class="layout mt-16 grid gap-8">
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
@media (min-width: 768px) {
  .layout {
    grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
    grid-template-rows: max-content;
  }
}
</style>
