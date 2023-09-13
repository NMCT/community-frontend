<script setup lang="ts">
import { useUser } from '@/composables/useUser.ts'
import { useQuery } from '@vue/apollo-composable'
import { useFirebase } from '@/composables/useFirebase.ts'
import { reactive, watch } from 'vue'

const { firebaseUser } = useFirebase()
const uid = firebaseUser.value?.uid

const { getUserQuery } = useUser()
const { result } = useQuery(getUserQuery, { id: uid! })
console.log(result)

const discord = reactive({
  value: result.value?.user?.socials?.discord,
  isChanging: false,
  changed: false,
})

watch(
  result,
  () => {
    discord.value = result.value?.user?.socials?.discord
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>
discord
<template>
  <div class="mx-4 my-4 w-full">
    <div class="font-title">Socials</div>

    <div>
      <div class="b-b-1 b-neutral-400 w-full pb-2">
        <div class="flex justify-between">
          <div>
            <h3>Discord</h3>
            <p>Connect your discord account to your MCT account</p>
          </div>
          <div>
            <!--            <input type="text" v-model="discord.value" />-->
            <div>{{ discord.value }}</div>
            <!--            <button @click="changeDiscord">Save</button>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
