<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase.ts'
import { useMutation } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import gql from 'graphql-tag'
import Error from '@/components/error.vue'

const { login, firebaseUser } = useFirebase()

const msg = ref('')
const router = useRouter()

// Mutation to register login
const { mutate: registerLoginMutation } = useMutation(
  graphql(`
    mutation registerLogin($idToken: String!) {
      firstLogin(idToken: $idToken) {
        id
        email
        type
      }
    }
  `),
)

async function registerLogin() {
  console.log('registerLogin', firebaseUser.value)
  if (!firebaseUser.value) throw new Error('not logged in')
  const user = await firebaseUser.value
  const idToken = await user?.getIdToken()
  console.log(idToken)
  const mutationResult = await registerLoginMutation({ idToken })
}

async function submitLogin(data) {
  msg.value = ''
  console.log('submitLogin', data)
  try {
    await login(data.email, data.password, data.remember)
    await registerLogin()
    await router.push('/events')
  } catch (error) {
    console.warn('error', error)
    msg.value = error.message
  }
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
