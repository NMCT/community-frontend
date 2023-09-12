<script setup lang="ts">
import { graphql } from '@/gql'
import { useMutation } from '@vue/apollo-composable'
import Editor from '@/components/markdown/editor.vue'
import { onMounted, ref, watch } from 'vue'
import Switch from '@/components/headlessui/switch.vue'
import { useFirebase } from '@/composables/useFirebase.ts'
import { EventType } from '@/gql/graphql.ts'
import { useRouter } from 'vue-router'
import useAudiences from '@/composables/useAudiences.ts'

const { push } = useRouter()
const { audiences } = useAudiences()
const errors = ref<any[] | undefined>([])
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
const md = ref('')

const editorViewMode = ref(false)

const { getUserType } = useFirebase()

const userType = ref<string | undefined>()
onMounted(async () => {
  userType.value = await getUserType()
})

const submitForm = async (e: any) => {
  console.log(e)

  if (md.value === '') {
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
          description: md.value,
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
      await push(`/events/${result?.data.createEvent.id}`)
    }
  } catch (e: any) {
    errors.value = [e.message]
  }
}

watch(md, () => {
  console.info(md.value)
})
</script>
<template>
  <div class="grid min-h-full place-items-center">
    <div class="b-3 b-neutral-300 rounded-2 min-w-md p-6">
      <h2 class="font-title mb-4 text-lg">Create new event</h2>
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
          label="Title"
          validation="required|length:3"
          :classes="{
            outer: 'w-full',
            wrapper: ' $reset w-full',
          }"
        />
        <FormKit
          type="text"
          name="location"
          label="Location"
          validation="required|length:3"
          :classes="{
            outer: 'w-full',
            wrapper: ' $reset w-full',
          }"
        />
        <div class="flex max-w-md flex-row gap-4">
          <FormKit
            type="select"
            name="audience"
            label="Audience"
            help="Select the audience for this event"
            :classes="{
              outer: 'w-3/5',
            }"
            :options="audiences"
          />
          <FormKit
            type="number"
            name="maxAttendees"
            label=" max attendee count"
            validation="required|number"
            :classes="{
              outer: 'w-2/5',
            }"
            min="1"
            max="1000"
          />
        </div>
        <FormKit
          type="datetime-local"
          name="startDate"
          label="Start date"
          validation="required|date_after"
        />
        <FormKit
          type="datetime-local"
          name="endDate"
          label="End date"
          validation="required|date_after"
        />

        <div class="mb-3 mt-2 flex justify-between">
          <span class="font-bold">Preview</span>
          <Switch v-model="editorViewMode" screenReader="Toggle editor mode" />
        </div>
        <editor
          label="Description"
          :view="editorViewMode ? 'viewer' : 'editor'"
          @update="body = $event"
          @updateInput="md = $event"
          placeholder="Description"
          class="mb-4"
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
          type="checkbox"
          name="openToGuests"
          label="Open to guests"
          help="Allow Non-Howest students to attend this event"
        />
      </FormKit>
      <div v-else>
        <p>403: Not authorized</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
