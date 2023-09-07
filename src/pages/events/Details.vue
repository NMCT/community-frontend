<script setup lang="ts">
import { useRouter } from 'vue-router'
import { graphql } from '@/gql'
import { useQuery } from '@vue/apollo-composable'
import { Event } from '@/gql/graphql.ts'
import { computed, ref, watch } from 'vue'
import { marked } from 'marked'
import { useMutations } from '@/composables/useMutations.ts'
import { useFirebase } from '@/composables/useFirebase.ts'

const { currentRoute } = useRouter()
const { id } = currentRoute.value.params as { id: string }
const { firebaseUser } = useFirebase()
interface IEvent {
  event: Event
}

const {
  attendEvent: attendEventMutation,
  unattendEvent: UnattendEventMutation,
} = useMutations()

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
        }
        attendees {
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

watch(
  result,
  () => {
    if (!result.value || !result.value.event.attendees) return
    isAttending.value = result.value.event.attendees.some(
      attendee => attendee.uid === firebaseUser.value?.uid,
    )
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

const attendEvent = async () => {
  if (!firebaseUser.value) return
  const res = await attendEventMutation({
    eventId: id,
  })

  const attending = res?.data?.attendEvent?.attendees?.some(
    attendee => attendee.uid === firebaseUser.value?.uid,
  )
  if (attending === undefined) {
    console.warn('Error attending event')
    return
  }
  isAttending.value = attending
}

const unattendEvent = async () => {
  if (!firebaseUser.value) return
  const res = await UnattendEventMutation({
    eventId: id,
  })

  const attending = res?.data?.unattendEvent?.attendees?.some(
    attendee => attendee.uid === firebaseUser.value?.uid,
  )
  if (attending === undefined) {
    console.warn('Error unattending event')
    return
  }
  isAttending.value = attending
}
</script>

<template>
  <div v-if="loading"></div>
  <div v-else-if="error"></div>
  <div v-else-if="result">
    {{ result }}

    <h2 class="font-title text-8xl text-neutral-700">
      {{ result.event.title }}
    </h2>

    <div>
      {{ result.event.location }}
    </div>
    <div class="text-pink">Isattending: {{ isAttending }}</div>
    <button @click="() => (isAttending ? unattendEvent() : attendEvent())">
      {{ !isAttending ? 'Attend Event' : 'Attending' }}
    </button>

    <button>Interested</button>

    <div v-html="description"></div>
  </div>
</template>

<style scoped></style>
