<script lang="ts">
import { useFirebase } from '@/hooks/useFirebase.ts'

const {} = useFirebase()
export default {
  name: 'MicrosoftLogin',
  components: {},
  data() {
    return {}
  },
  methods: {
    login() {
      console.log('login')
    },
  },
}
</script>

<template>
  <div>
    <h3>Microsoft Login</h3>
    <button @click="">Log in with Microsoft</button>
  </div>
</template>

<style scoped></style>
