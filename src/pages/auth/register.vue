<script lang="ts">
import Error from '../../components/error.vue'
import { useFirebase } from '@/composables/useFirebase.ts'

const { register } = useFirebase()

export default {
  components: {
    Error,
  },
  data() {
    return {
      msg: '',
    }
  },
  methods: {
    async submitSignup(data: any) {
      const email = data.email
      const password = data.password
      register(email, password, data.username)
        .then(() => {
          this.$router.push('/events')
        })
        .catch((error: any) => {
          this.msg = error.message
        })
    },
    handleIconClick(node: any) {
      node.props.suffixIcon =
        node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
      node.props.type = node.props.type === 'password' ? 'text' : 'password'
    },
  },
}
</script>

<template>
  <div class="grid min-h-full place-items-center">
    <div class="b-3 b-neutral-300 rounded-2 min-w-md form p-6">
      <h2 class="font-title mb-4 text-lg">Registreer als gast</h2>
      <Error title="Login failed" :msg="msg" v-if="msg !== ''"></Error>
      <FormKit type="form" submit-label="Registreer" @submit="submitSignup">
        <FormKit
          type="email"
          name="email"
          id="email"
          label="Email"
          validation="required|email"
        />
        <FormKit
          type="text"
          name="username"
          id="username"
          label="Gebruikersnaam"
          validation="required|length:3"
        ></FormKit>
        <FormKit
          type="password"
          name="password"
          label="Wachtwoord"
          validation="required|length:8"
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick"
        ></FormKit>
      </FormKit>
      <router-link to="/login"
        >Al een account? <span class="underline">Meld aan</span>
      </router-link>
    </div>
  </div>
</template>

<style></style>
