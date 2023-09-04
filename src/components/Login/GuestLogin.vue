<script setup lang="ts">
import { ref, defineProps } from 'vue';
import {useRouter} from "vue-router";
import {userStore} from "@/store/stores.ts";
import {useFirebase} from "@/hooks/useFirebase.ts";
import {useMutation} from "@vue/apollo-composable";
import { graphql } from '@/gql'
const { login } = useFirebase();


const msg = ref('');
const router = useRouter()

// Mutation to register login
const { mutate: registerLoginMutation } = useMutation(graphql(`
  mutation registerLogin($idToken: String!) {
        firstLogin(idToken: $idToken) {
            id
            email
            type
        }
    }`))




async function registerLogin() {

  console.log('registerLogin', userStore.firebaseUser)
  if (!userStore.firebaseUser) throw new Error('not logged in');
  const idToken = await userStore.firebaseUser.getIdToken();
  const mutationResult = await registerLoginMutation({idToken});
}

async function submitLogin(data) {
  msg.value = '';
  console.log('submitLogin', data);
  try {
    await login(data.email, data.password, data.remember);
    await registerLogin();
    await router.push('/')
  } catch (error) {
    console.warn('error', error);
    msg.value = error.message;
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

<style scoped></style>
