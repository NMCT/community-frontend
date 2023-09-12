<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase.ts'
import { useMutation } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import Error from '@/components/error.vue'
import CtaSubtile from '@/components/elements/CtaSubtile.vue'

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
  const user = firebaseUser.value
  const idToken = await user?.getIdToken()
  console.log(idToken)
  const mutationResult = await registerLoginMutation({ idToken })
}

async function submitLogin(data: any) {
  msg.value = ''
  console.log('submitLogin', data)
  try {
    await login(data.email, data.password)
    await registerLogin()
    await router.push('/events')
  } catch (error: any) {
    console.warn('error', error)
    msg.value = error.message
  }
}
</script>

<template>
  <div class="form">
    <Error title="Login failed" :msg="msg" v-if="msg !== ''"></Error>
    <FormKit
      type="form"
      @submit="submitLogin"
      submit-label="Log in als gast"
      class="form"
    >
      <FormKit
        :classes="{
          label: '$reset font-title text-neutral-700 leading-7',
        }"
        type="email"
        name="email"
        id="email"
        label="Email"
        validation="required|email"
      />
      <FormKit
        :classes="{
          label: '$reset font-title text-neutral-700 leading-7',
          outer: '$reset mb-0',
        }"
        type="password"
        name="password"
        id="password"
        label="Wachtwoord"
        validation="required|length:8"
      ></FormKit>
      <p class="mb-4 text-right text-sm leading-7">
        <router-link to="/password-reset">
          <cta-subtile>Wachtwoord vergeten?</cta-subtile>
        </router-link>
      </p>
    </FormKit>
    <p></p>
    <p class="text-center text-sm">
      <router-link to="/register">
        <CtaSubtile> Gastaccount maken</CtaSubtile>
      </router-link>
    </p>
  </div>
</template>

<style>
.form [data-type='submit'] .formkit-input {
  background-color: #ff00ff;
  width: 100%;
  font-size: 1.125rem;
  padding: 0.5rem 0;
  border: solid 3px #f3f4f6;
  border-radius: 0.5rem;
}

.form [data-type='submit'] .formkit-input:is(:focus-within, :focus) {
  border-color: #44c8f5;
  outline: none;
}

.form [data-type='submit'] .formkit-input:hover {
  background-color: #ff4dff;
}

.form .formkit-actions {
  margin-top: 0;
}
</style>
