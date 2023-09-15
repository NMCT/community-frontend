<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts'
import { useMutations } from '@/composables/useMutations.ts'
import Loader from '@/components/elements/Loader.vue'
import { PropType, ref } from 'vue'
import { LucideCalendarCheck2, LucideCalendarHeart } from 'lucide-vue-next'

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
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String as PropType<'mobile' | 'desktop'>,
    required: false,
    default: 'desktop',
  },
})

const isLoadingMutation = ref<boolean>(false)
const { firebaseUser } = useFirebase()
const {
  interestEvent: interestEventMutation,
  uninterestEvent: UninterestEventMutation,
} = useMutations()

const showInterestInEvent = async () => {
  isLoadingMutation.value = true
  if (!firebaseUser.value) return
  const res = await interestEventMutation({
    eventId: props.id,
  })
  setTimeout(() => {
    isLoadingMutation.value = false
  }, 500)
}

const unInterestedInEvent = async () => {
  isLoadingMutation.value = true
  if (!firebaseUser.value) return
  const res = await UninterestEventMutation({
    eventId: props.id,
  })
  setTimeout(() => {
    isLoadingMutation.value = false
  }, 500)
}
</script>

<template>
  <button
    v-if="type == 'desktop'"
    class="b-3 rounded-2 b-neutral-300 bg-white px-6 py-2 text-neutral-700"
    @click="
      () => (isInterested ? unInterestedInEvent() : showInterestInEvent())
    "
  >
    <Loader v-if="isLoading || isLoadingMutation" />
    <div v-else class="flex flex-row items-center gap-4">
      <LucideCalendarHeart v-if="!isInterested" />
      <LucideCalendarCheck2 v-else />
      {{ !isInterested ? 'interested?' : 'Interested' }}
    </div>
  </button>

  <button
    v-else
    @click="
      () => (isInterested ? unInterestedInEvent() : showInterestInEvent())
    "
  >
    <Loader v-if="isLoading || isLoadingMutation" />
    <div v-else class="flex flex-row items-center justify-center gap-4">
      <LucideCalendarHeart v-if="!isInterested" />
      <LucideCalendarCheck2 v-else />
      {{ !isInterested ? 'interested?' : 'Interested' }}
    </div>
  </button>
</template>

<style scoped></style>
