import { initializeApp } from "firebase/app"

let app = null
let isInitialized = false

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
}

const validateFirebaseConfig = () => {
  const requiredKeys = ['VITE_API_KEY', 'VITE_AUTH_DOMAIN', 'VITE_PROJECT_ID', 'VITE_STORAGE_BUCKET', 'VITE_MESSAGING_SENDER_ID', 'VITE_APP_ID']
  const missingKeys = requiredKeys.filter(key => !import.meta.env[key])
  
  if (missingKeys.length > 0) {
    throw new Error(`Missing Firebase environment variables: ${missingKeys.join(', ')}`)
  }
}

export const getFirebaseApp = () => {
  if (!isInitialized) {
    try {
      validateFirebaseConfig()
      app = initializeApp(firebaseConfig)
      isInitialized = true
    } catch (error) {
      console.error('Firebase initialization failed:', error.message)
      throw error
    }
  }
  return app
}

export default getFirebaseApp
