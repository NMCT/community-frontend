import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  Auth,
  browserSessionPersistence,
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
  OAuthProvider, onAuthStateChanged,
} from 'firebase/auth'

const microsoftProvider = new OAuthProvider('microsoft.com')

microsoftProvider.setCustomParameters({
  // Force re-consent.
  // prompt: 'consent',
  // Target specific email with login hint.
  // login_hint: 'user@student.howest.be',
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

setPersistence(auth, browserSessionPersistence)
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
          userStore.firebaseUser = user
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
    await signInWithRedirect(auth, microsoftProvider)
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
            // const accessToken = credential.accessToken
            // const idToken = credential.idToken
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

  const getUserType = async (): Promise<string> => {
    // get claims
    if (auth.currentUser === null) throw new Error('no user')
    const idTokenResult = await auth.currentUser.getIdTokenResult()
    const claims = idTokenResult.claims
    if (claims === undefined) throw new Error('no claims')
    console.log({ claims })
    if (claims.Admin === true) return 'Admin'
    if (claims.User === true) return 'User'
    if (claims.Guest === true) return 'Guest'
    throw new Error('no user type')
  }

  const restoreLogin = async (): Promise<User | null> => {
      console.log("restoreLogin")
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        userStore.firebaseUser = user;
        resolve(user)
      });
    })
  }

  return {
    register,
    login,
    auth,
    logout,
    passwordReset,
    MicrosoftLogin,
    MicrosoftLoginResult,
    getUserType,
    restoreLogin,
  }
}
