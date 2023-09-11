<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts'
import { useRouter } from 'vue-router'
import { LucideArrowLeft } from 'lucide-vue-next'

const { passwordReset } = useFirebase()

const { go, push } = useRouter()
const submitPasswordReset = (data: any) => {
  passwordReset(data.email)
    .then(() => {
      push('/login')
    })
    .catch((error: any) => {
      console.warn('error', error)
    })
}
</script>

<template>
  <div class="grid min-h-[80vh] place-items-center">
    <div class="b-3 b-neutral-300 rounded-2 min-w-md form p-6">
      <h2 class="font-title mb-4 text-lg">
        <a @click="go(-1)">
          <lucide-arrow-left class="hover:text-primary-500 inline" />
        </a>

        Reset je wachtwoord
      </h2>
      <FormKit
        type="form"
        submit-label="Verstuur"
        @submit="submitPasswordReset"
      >
        <form-kit
          type="email"
          name="email"
          id="email"
          label="Email"
          validation="required|email"
        />
      </FormKit>
    </div>
  </div>
</template>

<style scoped></style>
