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
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage'
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
const storage = getStorage(app)

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
  const login = async (email: string, password: string): Promise<User> => {
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
      const microsoftAccessToken = credential.accessToken
      console.debug({ accessToken: microsoftAccessToken })
      if (microsoftAccessToken) {
        localStorage.setItem('accessToken', microsoftAccessToken)
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

  /*
   * Restores the login of the user
   * Should be called on app startup
   * @returns the user if the user is logged in, null if the user is not logged in
   */
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

  const getProfilePictureUrl = async (): Promise<string | null> => {
    const user = firebaseUser.value
    if (!user) {
      console.log('no user')
      return null
    }
    return user.photoURL
  }

  /*
   * Gets the profile picture of the user, use Microsoft access token from local storage if available
   * Stores the profile picture in firebase storage
   * @returns the download url of the uploaded file or undefined if no file was found
   */
  const DownloadProfilePicture = async () => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      console.log('no access token')
      return
    }
    return await lookupMsAzureProfilePhoto(accessToken)
  }

  /*
   * Looks up the profile picture of the user in Microsoft Azure
   * If the profile picture is found, it will be uploaded to firebase storage
   * @param MICROSOFT accessToken the access token to use for the request
   * @returns the download url of the uploaded file or undefined if no file was found
   */
  const lookupMsAzureProfilePhoto = async (accessToken: string) => {
    const response = await fetch(
      'https://graph.microsoft.com/v1.0/me/photo/$value',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'image/jpg',
        },
      },
    )
    if (response.status === 401) {
      console.log('no access')
      // invalid access token
      localStorage.removeItem('accessToken')
      return
    }
    if (response.ok) {
      const data = await response.blob()
      return await uploadProfilePicture(data)
    } else {
      console.log('no profile picture found')
      return
    }
  }

  /*
   * Uploads a profile picture to firebase storage
   * @param blob the blob to upload
   * @returns the download url of the uploaded file
   */
  const uploadProfilePicture = async (blob: Blob): Promise<string> => {
    const storageReference = storageRef(
      storage,
      'profilePictures/' + firebaseUser.value?.uid,
    )

    const snapshot = await uploadBytes(storageReference, blob)
    console.log('Uploaded a blob or file!', snapshot)
    // get download url
    const downloadUrl = await getDownloadURL(storageReference)

    // update profile picture
    // todo: decide if i should do this here or in backend
    if (firebaseUser.value) {
      await updateProfile(firebaseUser.value, {
        photoURL: downloadUrl,
      })
    }

    return downloadUrl
  }

  return {
    auth,
    firebaseUser,
    currentUser: auth.currentUser,

    MicrosoftLogin,
    MicrosoftLoginResult,
    getUserType,
    login,
    logout,
    passwordReset,
    register,
    restoreLogin,
    DownloadProfilePicture,
    getProfilePictureUrl,
  }
}
