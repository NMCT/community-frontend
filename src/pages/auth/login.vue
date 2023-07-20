<script lang="ts">
import GuestLogin from '@/components/Login/GuestLogin.vue'
import MicrosoftLogin from '@/components/Login/MicrosoftLogin.vue'
export default {
  name: 'Login',
  components: {
    GuestLogin,
    MicrosoftLogin,
  },
  data() {
    return {}
  },
}
</script>

<template>
  <MicrosoftLogin />
  <GuestLogin />
</template>

<style scoped></style>
