<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import Social from './Social.vue'
import General from './General.vue'
const { width } = useWindowSize()

const route = useRoute()
const section = computed(() => route.path.split('/')[2])
</script>

<template>
  <div
    v-if="width > 1024"
    class="b-3 b-neutral-300 rounded-2 2xl:mx-a mt-4xl min-h[80vh] mx-8 flex max-w-6xl flex-row bg-neutral-50"
  >
    <div
      class="b-r-neutral-300 b-r-2 p4 min-w-48 flex flex-col justify-between"
    >
      <div>
        <div class="font-title mb-4 text-lg leading-7">My account</div>
        <div
          class="font-title text-lg leading-7"
          :class="{
            'text-primary-500': section === 'general',
          }"
        >
          <RouterLink to="/account/general"> General</RouterLink>
        </div>
        <div
          class="font-title text-lg leading-7"
          :class="{
            'text-primary-500': section === 'social',
          }"
        >
          <RouterLink to="/account/social"> Socials</RouterLink>
        </div>
      </div>

      <RouterLink to="/logout">
        <div class="font-title text-red-5 text-lg">Logout</div>
      </RouterLink>
    </div>

    <RouterView></RouterView>
  </div>
  <div v-else>
    <General></General>
    <Social></Social>
  </div>
</template>

<style scoped></style>
