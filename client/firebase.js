import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDSjBjYGFuYCRgkzdxqlrSx7Eq9WhLgKPc",
  authDomain: "subscription-tracker-994c0.firebaseapp.com",
  projectId: "subscription-tracker-994c0",
  storageBucket: "subscription-tracker-994c0.appspot.com",
  messagingSenderId: "53391414849",
  appId: "1:53391414849:web:54d2c53baf376d636cd8c0",
  measurementId: "G-20PF7F3QEJ",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();
