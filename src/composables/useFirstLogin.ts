import { userStore } from '@/store/stores.ts'

export function useFirstLogin() {
  const baseUrl = import.meta.env.VITE_BASE_URL
  console.log(baseUrl)
  const postFirstLogin = async () => {
    if (!userStore.firebaseUser) return
    const idString = await userStore.firebaseUser.getIdToken()

    fetch(baseUrl + '/api/user/first-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idString),
    })
  }

  return { postFirstLogin }
}
