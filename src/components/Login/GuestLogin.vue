<script lang="ts">
import { useFirebase } from '@/hooks/useFirebase.ts'
import Error from '@/components/error.vue'
const { login } = useFirebase()
console.log('login', login)
export default {
  methods: {
    async submitLogin(data: any) {
      this.msg = ''
      console.log('submitLogin', data)
      try {
        await login(data.email, data.password, data.remember)
        this.$router.push('/')
      } catch (error) {
        console.warn('error', error)
        this.msg = error.message
      }
    },
  },
  components: {
    Error,
  },
  data() {
    return {
      msg: '',
    }
  },
}
</script>

<template>
  <h3>Login Als Gast</h3>
  <Error title="Login failed" :msg="msg" v-if="msg !== ''"></Error>
  <FormKit type="form" submit-label="Login" @submit="submitLogin">
    <FormKit
      type="email"
      name="email"
      id="email"
      label="Email"
      validation="required|email"
    />
    <FormKit
      type="password"
      name="password"
      id="password"
      label="Wachtwoord"
      validation="required|length:8"
    ></FormKit>
    <FormKit
      type="checkbox"
      name="remember"
      id="remember"
      label="Remember me"
    />
  </FormKit>
  <p>
    <router-link to="/password-reset">Wachtwoord vergeten?</router-link>
  </p>
  <p>
    <router-link to="/register">Nog geen gast account? Registreer</router-link>
  </p>
</template>

<style scoped></style>
