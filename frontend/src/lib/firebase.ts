// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHIuDipU6Qb24aeCdgrac-5J3duyurv_I",
  authDomain: "krishimitra-ai-6c5ad.firebaseapp.com",
  projectId: "krishimitra-ai-6c5ad",
  storageBucket: "krishimitra-ai-6c5ad.firebasestorage.app",
  messagingSenderId: "55708267337",
  appId: "1:55708267337:web:2ca9aad534a9103b8ee098",
  measurementId: "G-1Z106EX9Y2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
