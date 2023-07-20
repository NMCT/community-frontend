import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  Auth,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  signInWithRedirect,
  getRedirectResult,
  User,
  OAuthProvider,
} from 'firebase/auth'

const provider = new OAuthProvider('microsoft.com')

provider.setCustomParameters({
  // Force re-consent.
  prompt: 'consent',
  // Target specific email with login hint.
  login_hint: 'user@student.howest.be',
})

import { userStore } from '../store/stores.ts'

const app: FirebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
})
console.log({ app })
const auth: Auth = getAuth(app)

setPersistence(auth, browserLocalPersistence)
  .then(r => console.log('setPersistence', r))
  .catch(e => console.log('setPersistence', e))

export const useFirebase = () => {
  const register = async (
    email: string,
    password: string,
    nickname: string,
  ): Promise<User | { code: string; message: string }> => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async userCredential => {
        // Signed in
        const user = userCredential.user
        await updateProfile(user, {
          displayName: nickname,
        })
        return user
      },
    )
  }
  const login = async (
    email: string,
    password: string,
    remember: boolean,
  ): Promise<User> => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user
          userStore.user = user
          setTimeout(() => {
            resolve(user)
          })
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          reject({ code: errorCode, message: errorMessage })
        })
    })
  }
  const logout = async (): Promise<void> => {
    return signOut(auth).then(() => {
      // Sign-out successful.
      console.log('logout successful')
    })
  }

  const passwordReset = async (email: string): Promise<void> => {
    new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          resolve(true)
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          reject({ code: errorCode, message: errorMessage })
        })
    })
  }

  const MicrosoftLogin = async (): Promise<void> => {
    await signInWithRedirect(auth, provider)
  }
  const MicrosoftLoginResult = async (): Promise<User> => {
    new Promise((resolve, reject) => {
      getRedirectResult(auth)
        .then(result => {
          if (!result) reject({ code: 'no result', message: 'no result' })
          else {
            const credential = OAuthProvider.credentialFromResult(result)
            if (!credential) {
              reject({ code: 'no credential', message: 'no credential' })
              return
            }
            const accessToken = credential.accessToken
            const idToken = credential.idToken
            const user = result.user
            resolve(user)
          }
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          reject({ code: errorCode, message: errorMessage })
        })
    })
  }
  return {
    register,
    login,
    auth,
    logout,
    passwordReset,
    MicrosoftLogin,
  }
}
