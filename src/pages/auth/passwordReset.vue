<script lang="ts">
import { useFirebase } from '@/hooks/useFirebase.ts'

const { passwordReset } = useFirebase()
export default {
  methods: {
    submitPasswordReset(data: any) {
      console.log(data)
      console.log('submitPasswordReset')
      passwordReset(data.email)
        .then(() => {
          console.log('passwordReset')
          this.$router.push('/login')
        })
        .catch((error: any) => {
          console.warn('error', error)
        })
    },
  },
}
</script>

<template>
  <div>
    <h3>Wachtwoord resetten</h3>
    <p>Voer je email adres in om een wachtwoord reset link te ontvangen.</p>
    <FormKit type="form" submit-label="Verstuur" @submit="submitPasswordReset">
      <form-kit
        type="email"
        name="email"
        id="email"
        label="Email"
        validation="required|email"
      />
    </FormKit>
  </div>
</template>

<style scoped></style>
