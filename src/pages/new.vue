<script setup lang="ts">
import { graphql } from '@/gql'
import { useMutation } from '@vue/apollo-composable'
import Editor from '@/components/markdown/editor.vue'
import { onMounted, ref, watch } from 'vue'
import Switch from '@/components/headlessui/switch.vue'
import { useFirebase } from '@/composables/useFirebase.ts'
import { EventType } from '@/gql/graphql.ts'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const errors = ref<string[]>([])
const gql = graphql(`
  mutation createNewEvent($input: EventInput!) {
    createEvent(eventInput: $input) {
      id
      title
      location
      type
      description
      startDate
      endDate
      maxAttendees
      openToGuests
    }
  }
`)
const { mutate, error, loading } = useMutation(gql)
watch(error, () => {
  console.log(error.value)
  errors.value = error.value?.graphQLErrors.map((e: any) => e.message)
})
const body = ref('')

const editorViewMode = ref(false)

const { getUserType } = useFirebase()

const userType = ref<string | undefined>()
onMounted(async () => {
  userType.value = await getUserType()
})

const submitForm = async (e: any) => {
  console.log(e)

  if (body.value === '') {
    errors.value = ['Beschrijving is verplicht']
    return
  }
  const isOpenToGuests = e.openToGuests === undefined ? false : e.openToGuests
  try {
    const result = await mutate(
      {
        input: {
          title: e.title,
          location: e.location,
          startDate: e.startDate,
          endDate: e.endDate,
          maxAttendees: Number(e.maxAttendees),
          openToGuests: isOpenToGuests,
          description: body.value,
          type:
            e.type === 'Officieel' ? EventType.Official : EventType.Community,
          audience: e.audience ?? 'None specified',
        },
      },
      {
        errorPolicy: 'all',
      },
    )
    if (result?.data) {
      push(`/events/${result?.data.createEvent.id}`)
    }
  } catch (e) {
    console.log('catch')
    console.log(e)
    errors.value = [e.message]
  }
}
</script>
<!--todo: submit-->
<template>
  <h2>Create new event</h2>
  <FormKit
    type="form"
    v-if="userType !== 'Guest'"
    @submit="submitForm"
    preserve="preserve"
    :errors="errors"
  >
    <FormKit
      type="text"
      name="title"
      label="Titel"
      validation="required|length:3"
    />
    <FormKit
      type="text"
      name="location"
      label="Locatie"
      validation="required|length:3"
    />
    <div>
      Preview
      <Switch v-model="editorViewMode" screenReader="Toggle editor mode" />
    </div>
    <editor
      label="Beschrijving"
      :view="editorViewMode ? 'viewer' : 'editor'"
      @update="body = $event"
      placeholder="Beschrijving"
    />
    <div v-if="userType === 'Admin'">
      <FormKit
        type="radio"
        name="type"
        label="Evenement type"
        :options="['Officieel', 'Community']"
        help="Officieel: Evenementen georganiseerd door de school. Community: Evenementen georganiseerd door de community."
      />
    </div>
    <FormKit
      type="text"
      name="audience"
      label="Doelpubliek"
      help="Voor wie is dit evenement bedoeld?"
    />

    <FormKit
      type="datetime-local"
      name="startDate"
      label="Start datum"
      validation="required|date_after"
    />
    <FormKit
      type="datetime-local"
      name="endDate"
      label="Eind datum"
      validation="required|date_after"
    />
    <FormKit
      type="number"
      name="maxAttendees"
      label="Maximale aantal deelnemers"
      validation="required|number"
      min="1"
      max="1000"
    />
    <FormKit
      type="checkbox"
      name="openToGuests"
      label="Open voor gasten"
      help="Sta toe om niet-Howest-studenten toe te laten tot het evenement"
    />
  </FormKit>
  <div v-else>
    <p>Je hebt geen rechten om een evenement aan te maken</p>
  </div>
</template>

<style scoped></style>
