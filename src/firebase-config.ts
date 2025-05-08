// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrrnLUs4Sr4EXxdY2ZARRzLzNsSuJbxgw",
  authDomain: "siap-2eaff.firebaseapp.com",
  projectId: "siap-2eaff",
  storageBucket: "siap-2eaff.appspot.com",
  messagingSenderId: "41044438109",
  appId: "1:41044438109:web:c85f9083852810ef9b71b4",
  measurementId: "G-B09ZNSW7S0"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Get Firebase services
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);
const analytics: Analytics | null = typeof window !== 'undefined' ? getAnalytics(app) : null; // Conditionally initialize Analytics for browser environment

export { app, auth, db, storage, analytics };
