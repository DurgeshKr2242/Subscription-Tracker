import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "subscription-tracker-994c0.firebaseapp.com",
  projectId: "subscription-tracker-994c0",
  storageBucket: "subscription-tracker-994c0.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASEURMENT_ID,
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();
