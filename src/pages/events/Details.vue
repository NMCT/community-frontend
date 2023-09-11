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

    <attending :id="id" :isAttending="isAttending" />
    <Interested :id="id" :is-interested="isInterested" />

    <div v-html="description"></div>
  </div>
</template>

<style scoped></style>
