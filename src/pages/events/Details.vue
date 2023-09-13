<script setup lang="ts">
import { useRouter } from 'vue-router'
import { graphql } from '@/gql'
import { useQuery } from '@vue/apollo-composable'
import { Event } from '@/gql/graphql.ts'
import { computed, ref, watch } from 'vue'
import { marked } from 'marked'
import { useFirebase } from '@/composables/useFirebase.ts'
import Attending from '@/components/elements/Attending.vue'
import Interested from '@/components/elements/Interested.vue'
import { LucidePencil } from 'lucide-vue-next'

const { currentRoute } = useRouter()
const { id } = currentRoute.value.params as { id: string }
const { firebaseUser } = useFirebase()

interface IEvent {
  event: Event
}

const { result, loading, error } = useQuery<IEvent>(
  graphql(`
    query getEvent($id: String!) {
      event(id: $id) {
        id
        startDate
        endDate
        maxAttendees
        updatedOn
        type
        createdOn
        organizer {
          profilePicture
          name
          uid
        }
        attendees {
          profilePicture
          name
          uid
        }
        interested {
          profilePicture
          name
          uid
        }
        description
        audience
        title
        location
      }
    }
  `),
  () => ({
    id,
  }),
)

const isAttending = ref<boolean>(false)
const isInterested = ref<boolean>(false)
watch(
  result,
  () => {
    if (result.value && result.value.event.attendees) {
      isAttending.value = result.value.event.attendees.some(
        attendee => attendee.uid === firebaseUser.value?.uid,
      )
    }
    if (result.value && result.value.event.interested) {
      isInterested.value = result.value.event.interested.some(
        attendee => attendee.uid === firebaseUser.value?.uid,
      )
    }
  },
  { immediate: true, deep: true },
)

const description = computed(() => {
  if (!result.value) return ''
  return marked(result.value.event.description, {
    gfm: true,
    breaks: true,
    smartLists: true,
    headerIds: false,
    mangle: false,
  })
})

const parseEventDate = (startDate: string, endDate: string): string => {
  const isSameDay =
    new Date(startDate).getDate() === new Date(endDate).getDate()
  if (isSameDay) {
    const ddmm = new Date(startDate).toLocaleString('nl-be', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
    })
    const startTime = new Date(startDate).toLocaleString('nl-be', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
    const endTime = new Date(endDate).toLocaleString('nl-be', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
    return `${ddmm} ${startTime} - ${endTime}`
  } else {
    const startddmm = new Date(startDate).toLocaleString('nl-be', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
    const endddmm = new Date(endDate).toLocaleString('nl-be', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
    return `${startddmm} - ${endddmm}`
  }
}

const freeSeats = computed(() => {
  if (!result.value) return 0
  const attendees = result.value.event.attendees
    ? result.value.event.attendees.length
    : 0
  return result.value.event.maxAttendees - attendees
})

const noPfpUrl = ref(
  'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
)
</script>

<template>
  <div v-if="loading"></div>
  <div v-else-if="error"></div>
  <div v-else-if="result" class="lg:mx-a mx-12 my-10 max-w-7xl">
    <div class="lg:flex lg:flex-row lg:justify-between">
      <div class="lg:max-w-3/5">
        <h2 class="font-title text-6xl text-neutral-700">
          {{ result.event.title }}
        </h2>
        <div class="my-6 flex flex-row flex-wrap gap-x-10 gap-y-2">
          <div>
            <div class="text-lg">Location</div>
            <div class="font-menlo text-neutral-500">
              {{ result.event.location }}
            </div>
          </div>
          <div>
            <div class="text-lg">Day and duration</div>
            <div class="font-menlo text-neutral-500">
              {{ parseEventDate(result.event.startDate, result.event.endDate) }}
            </div>
          </div>
          <div>
            <div class="text-lg">Group</div>
            <div class="font-menlo text-neutral-500">
              {{ result.event.audience }}
            </div>
          </div>
          <div>
            <div class="text-lg">Free seats</div>
            <div class="font-menlo text-neutral-500">
              {{ freeSeats }} / {{ result.event.maxAttendees }}
            </div>
          </div>
        </div>
      </div>
      <div class="lg:max-w-2/5">
        <div class="flex flex-row gap-6">
          <Interested
            :id="id"
            :is-loading="loading"
            :is-interested="isInterested"
          />
          <attending :id="id" :isAttending="isAttending" :isLoading="loading" />
          <div
            v-if="result.event.organizer.uid === firebaseUser?.uid"
            class="mr-8 self-center"
          >
            <RouterLink :to="`/events/${result.event.id}/edit`">
              <LucidePencil />
            </RouterLink>
          </div>
        </div>
        <div class="b-3 b-neutral-300 rounded-2 my-8 w-full px-6 py-4">
          <p class="mb-2 text-lg">organizer</p>
          <div class="hosted-by flex flex-row items-center gap-x-2">
            <img
              class="row-start-1 row-end-3 h-10 w-10 rounded-full"
              :src="result.event.organizer.profilePicture ?? noPfpUrl"
              alt="Organiser profile picture"
            />
            <div class="font-title special-font text-2xl">
              {{ result.event.organizer.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-html="description" class="md"></div>

    <div class="attendees b-t-neutral-500">
      <div class="text-lg">Attendees</div>
      <div class="layout grid">
        <!-- // todo -->
        <RouterLink
          v-for="attendee of result.event.attendees"
          :to="`/profile/${attendee.uid}`"
          :key="attendee.uid"
        >
          <img
            :src="attendee.profilePicture ?? noPfpUrl"
            :alt="attendee.name!"
            :title="attendee.name!"
            class="h-10 w-10 rounded-full object-cover"
          />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style>
.md h1,
.md h2,
.md h3,
.md h4,
.md h5,
.md h6 {
  font-family: 'Menlo', sans-serif;
  font-weight: 700;
  color: #2d3748;
}

.md h1 {
  font-size: 2.5rem;
  line-height: 2.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.md h2 {
  font-size: 2rem;
  line-height: 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.md h3 {
  font-size: 1.75rem;
  line-height: 1.75rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.md h4 {
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.md h5 {
  font-size: 1.25rem;
  line-height: 1.25rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.md h6 {
  font-size: 1rem;
  line-height: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
</style>

<style scoped>
.special-font {
  font-feature-settings: 'ss01' on;
}

.layout {
  grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
  grid-template-rows: max-content;
}
</style>
