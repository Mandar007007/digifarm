// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5UDPMxtudWunLnmOF_mKznVM6bjluXsI",
  authDomain: "oauthregister.firebaseapp.com",
  projectId: "oauthregister",
  storageBucket: "oauthregister.appspot.com",
  messagingSenderId: "974491495282",
  appId: "1:974491495282:web:4c92a1479d530601df4beb",
  measurementId: "G-Q7FED4H29N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app