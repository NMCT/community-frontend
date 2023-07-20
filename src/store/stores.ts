import { reactive } from 'vue'
import { User } from 'firebase/auth'

export interface UserStore {
  user: User | null
}

export const userStore = reactive<UserStore>({
  user: null,
})
