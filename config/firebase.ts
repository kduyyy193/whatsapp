// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU9MNa9BVDuXxFPx28NJiugO-Jxlj-4Ds",
  authDomain: "whatsapp-clone-85a20.firebaseapp.com",
  projectId: "whatsapp-clone-85a20",
  storageBucket: "whatsapp-clone-85a20.appspot.com",
  messagingSenderId: "473857943679",
  appId: "1:473857943679:web:378d36e29eff334713374a",
  measurementId: "G-PQEDJ1TZNE"
};

// Initialize Firebase
const app = getApps().length?  getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)

const auth  = getAuth(app)
const provider = new GoogleAuthProvider()

export {db, auth, provider}
