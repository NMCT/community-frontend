import { useFirebase } from '@/composables/useFirebase.ts'

const { firebaseUser } = useFirebase()

export function useFirstLogin() {
  const baseUrl = import.meta.env.VITE_BASE_URL
  console.log(baseUrl)
  const postFirstLogin = async () => {
    if (!firebaseUser.value) return
    const idString = await firebaseUser.value.getIdToken()

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
