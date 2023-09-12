<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts'
import { useMutations } from '@/composables/useMutations.ts'
import CtaBold from '@/components/elements/CtaBold.vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  isInterested: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const { firebaseUser } = useFirebase()
const {
  interestEvent: interestEventMutation,
  uninterestEvent: UninterestEventMutation,
} = useMutations()

const showInterestInEvent = async () => {
  if (!firebaseUser.value) return
  const res = await interestEventMutation({
    eventId: props.id,
  })
}

const unInterestedInEvent = async () => {
  if (!firebaseUser.value) return
  const res = await UninterestEventMutation({
    eventId: props.id,
  })
}
</script>

<template>
  <cta-bold
    @click="
      () => (isInterested ? unInterestedInEvent() : showInterestInEvent())
    "
  >
    {{ !isInterested ? 'Show interest' : 'Interested' }}
  </cta-bold>
</template>

<style scoped></style>
