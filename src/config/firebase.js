// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeg87f-LM3BZBf7W7-Hk0DVQDfYDFvkCc",
  authDomain: "vite-contact-87291.firebaseapp.com",
  projectId: "vite-contact-87291",
  storageBucket: "vite-contact-87291.appspot.com",
  messagingSenderId: "809476624216",
  appId: "1:809476624216:web:9842b236033b0d3e125f2d",
  measurementId: "G-LDY19VSQ2E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
const analytics = getAnalytics(app);