// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd1YIPxh6FwReOjYKdwW5WRN6CeOfbK4A",
  authDomain: "image-conversion-projection.firebaseapp.com",
  projectId: "image-conversion-projection",
  storageBucket: "image-conversion-projection.firebasestorage.app",
  messagingSenderId: "207635529042",
  appId: "1:207635529042:web:c0923c20f48dce6bbdce8b",
  measurementId: "G-7CK32WVQK2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
