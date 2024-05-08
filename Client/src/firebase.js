// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "user-management-4300f.firebaseapp.com",
  projectId: "user-management-4300f",
  storageBucket: "user-management-4300f.appspot.com",
  messagingSenderId: "996855199214",
  appId: "1:996855199214:web:e98fcadbfc0f880cc04aff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);