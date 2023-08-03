import { reactive } from 'vue'
import { User } from 'firebase/auth'
import {User as backendUser} from "@/gql/graphql.ts"

export interface UserStore {
  firebaseUser: User | null
  backendUser: backendUser | null
}

export const userStore = reactive<UserStore>({
  firebaseUser: null,
  backendUser: null
})
