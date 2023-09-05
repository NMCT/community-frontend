<script lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts'
import { onMounted } from 'vue'

const { MicrosoftLogin, MicrosoftLoginResult } = useFirebase()
export default {
  name: 'MicrosoftLogin',
  components: {},
  data() {
    return {}
  },
  methods: {
    login() {
      console.log('login')
      MicrosoftLogin()
    },
  },
  setup() {
    onMounted(() => {
      MicrosoftLoginResult().catch((error: any) => {
        console.warn('error while checking microsoft login', error)
      })
    })
  },
}
</script>

<template>
  <div>
    <h3>Microsoft Login</h3>
    <button @click="login">Log in with Microsoft</button>
  </div>
</template>

<style scoped></style>
