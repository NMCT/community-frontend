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
import { LucideMapPin, LucidePencil } from 'lucide-vue-next'

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
          uid
        }
        interested {
          profilePicture
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

const parseDate = (date: string): string => {
  const dayOfWeek = new Date(date).toLocaleString('en-us', {
    weekday: 'long',
  })
  const day = new Date(date).toLocaleString('en-us', {
    day: 'numeric',
  })
  const month = new Date(date).toLocaleString('en-us', {
    month: 'long',
  })
  const year = new Date(date).toLocaleString('en-us', {
    year: 'numeric',
  })
  const time = new Date(date).toLocaleString('en-us', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
  return `${dayOfWeek}, ${day} ${month} ${year} at ${time}`
}
</script>

<template>
  <div v-if="loading"></div>
  <div v-else-if="error"></div>
  <div v-else-if="result" class="lg:mx-a mx-12 max-w-4xl">
    <div class="background/">
      <h2 class="font-title leading-19 text-4xl text-neutral-700">
        {{ result.event.title }}
      </h2>
      <div class="hosted-by flex flex-row items-center gap-x-2">
        <img
          class="row-start-1 row-end-3 h-16 w-16 rounded-full"
          :src="
            result.event.organizer.profilePicture ??
            'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
          "
          alt="Organiser profile picture"
        />
        <div>
          Hosted by
          <div>{{ result.event.organizer.name }}</div>
        </div>
        <div
          v-if="result.event.organizer.uid === firebaseUser?.uid"
          class="ml-a mr-8"
        >
          <RouterLink :to="`/events/${result.event.id}/edit`">
            <LucidePencil />
          </RouterLink>
        </div>
      </div>
    </div>
    <div>
      {{ parseDate(result.event.startDate) }} to
      {{ parseDate(result.event.endDate) }}
    </div>
    <div class="flex flex-row items-center gap-x-2">
      <LucideMapPin />
      {{ result.event.location }}
    </div>
    <div class="flex flex-row">
      <attending
        :id="id"
        :isAttending="isAttending"
        :class="{
          'bg-green-6': isAttending,
        }"
      />
      <Interested :id="id" :is-interested="isInterested" />
    </div>

    <div v-html="description" class="md"></div>

    <div class="attendees">
      <div>
        <!-- // todo -->
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
