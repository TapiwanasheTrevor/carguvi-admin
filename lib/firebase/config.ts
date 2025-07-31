import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Debug: Log environment variables to verify they're loaded correctly
console.log("🔍 Environment Variables Debug:")
console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
console.log("Auth Domain:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)
console.log("Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
console.log("Storage Bucket:", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
console.log("Messaging Sender ID:", process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID)
console.log("App ID:", process.env.NEXT_PUBLIC_FIREBASE_APP_ID)
console.log("Database URL:", process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL)

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
}

console.log("🔥 Firebase Config Object:", firebaseConfig)

// Initialize Firebase
let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
