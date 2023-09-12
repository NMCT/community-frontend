<script lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts'
import LoginWithMicrosoftSvg from '@/components/svg/LoginWithMicrosoftSvg.vue'

const { microsoftLogin } = useFirebase()
export default {
  name: 'MicrosoftLogin',
  components: { LoginWithMicrosoftSvg },
  data() {
    return {}
  },
  methods: {
    login() {
      console.log('login')
      microsoftLogin()
    },
  },
}
</script>

<template>
  <div>
    <div class="pb-6 pt-4">
      <p class="b-b-1 w-full border-neutral-700 text-center leading-[0.1em]">
        <span class="bg-white px-3">of</span>
      </p>
    </div>
    <button
      @click="login"
      class="border-3 rounded-2 b-neutral-300 w-full py-2 text-center"
    >
      <LoginWithMicrosoftSvg class="mr-2 inline" />
      <span> Sign in with Microsoft </span>
    </button>
  </div>
</template>

<style scoped>
h2 {
  margin: 10px 0 20px;
}
</style>
