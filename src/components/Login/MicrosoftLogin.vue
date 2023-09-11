<script lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts'
import LoginWithMicrosoftSvg from '@/components/svg/LoginWithMicrosoftSvg.vue'

const { MicrosoftLogin } = useFirebase()
export default {
  name: 'MicrosoftLogin',
  components: { LoginWithMicrosoftSvg },
  data() {
    return {}
  },
  methods: {
    login() {
      console.log('login')
      MicrosoftLogin()
    },
  },
}
</script>

<template>
  <div>
    <p class="py-2 text-center">of</p>
    <button
      @click="login"
      class="border-3 rounded-2 b-neutral-300 w-full py-2 text-center"
    >
      <LoginWithMicrosoftSvg class="mr-2 inline" />
      <span> Sign in with Microsoft </span>
    </button>
  </div>
</template>

<style scoped></style>
