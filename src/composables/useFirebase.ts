import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  Auth,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  OAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth'
import { ref } from 'vue'

const microsoftProvider = new OAuthProvider('microsoft.com')

microsoftProvider.setCustomParameters({
  // Force re-consent.
  prompt: 'select_account',
  tenant: '4ded4bb1-6bff-42b3-aed7-6a36a503bf7a',

  // Target specific email with login hint.
  // login_hint: 'user@student.howest.be',
})

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

// region refs

const firebaseUser = ref<User | null>(null)
// endregion

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
          firebaseUser.value = user
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
    try {
      const result = await getRedirectResult(auth)
      if (!result) {
        throw { code: 'no result', message: 'no result' }
      }

      const credential = OAuthProvider.credentialFromResult(result)
      if (!credential) {
        throw { code: 'no credential', message: 'no credential' }
      }
      const accessToken = credential.accessToken
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
      }
      return result.user
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      throw { code: errorCode, message: errorMessage }
    }
  }

  const getUserType = async (): Promise<string> => {
    // get claims
    if (auth.currentUser === null) throw new Error('no user')
    const idTokenResult = await auth.currentUser.getIdTokenResult()
    const claims = idTokenResult.claims
    if (claims === undefined) throw new Error('no claims')
    console.log({ claims })
    if (claims.Admin === true) return 'Admin'
    if (claims.firebase?.sign_in_provider === 'microsoft.com') return 'User'
    return 'Guest'
  }

  const restoreLogin = async (): Promise<User | null> => {
    console.log('restoreLogin')
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      onAuthStateChanged(auth, user => {
        firebaseUser.value = user
        resolve(user)
      })
    })
  }

  const getProfilePicture = async () => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) throw new Error('no access token')
    lookupMsAzureProfilePhoto(accessToken)
  }


  // private function to get the profile photo from Microsoft Graph
  const lookupMsAzureProfilePhoto = (accessToken: string) => {
    fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'image/jpg'
      }
    })
      .then(async function(response) {
        return await response.blob();
      })
      .then(function(blob) {
        const imageObjectURL = URL.createObjectURL(blob);
        // imageObjectURL will be e.g. blob:http://localhost:3000/f123c12a-1234-4e30-4321-af32f2c5e5bc
        // so updating the <img scr=""> will present the image correctly after
        // this function runs
        // setProfilePicUrl(imageObjectURL);
      })
      .catch(e => console.log('error injecting photo'));
  };



  return {
    auth,
    firebaseUser,

    MicrosoftLogin,
    MicrosoftLoginResult,
    getUserType,
    login,
    logout,
    passwordReset,
    register,
    restoreLogin,
    getProfilePicture,
  }
}
