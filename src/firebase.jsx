// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { 
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  connectAuthEmulator  // Add this
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3BfKa2IDbBYiCWpiwUw7me_G0a5VOT_s",
  authDomain: "attendence-tracker-90940.firebaseapp.com",
  projectId: "attendence-tracker-90940",
  storageBucket: "attendence-tracker-90940.firebasestorage.app",
  messagingSenderId: "575531776559",
  appId: "1:575531776559:web:fb14ef4839e1a79fa564da",
  measurementId: "G-BDEPT9DS5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// FOR DEVELOPMENT ONLY - Enable emulator
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  console.log("Using Firebase Emulator");
  
  // Connect to Auth Emulator
  // connectAuthEmulator(auth, "http://localhost:9099");
  
  // Connect to Firestore Emulator
  // connectFirestoreEmulator(db, 'localhost', 8080);
  
  // Enable offline persistence for Firestore
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.log("Multiple tabs open, persistence can only be enabled in one tab at a time.");
      } else if (err.code === 'unimplemented') {
        console.log("The current browser doesn't support persistence.");
      }
    });
}

// Set auth language code
if (typeof window !== "undefined") {
  auth.languageCode = 'en';
  
  // For testing without real OTP (Development only)
  // WARNING: Only for testing with mock phone numbers
  auth.settings.appVerificationDisabledForTesting = false; // Keep false for production
}

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { 
  app, 
  db, 
  auth, 
  storage, 
  analytics,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
};