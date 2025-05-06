// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, doc, getDoc, setDoc, increment } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Function to increment view count
const incrementViewCount = async () => {
  const viewCountRef = doc(db, "siteStats", "totalCount");
  
  try {
    const docSnap = await getDoc(viewCountRef);
    
    if (docSnap.exists()) {
      // If document exists, increment the count
      await setDoc(viewCountRef, {
        count: increment(1)
      }, { merge: true });
    } else {
      // If document doesn't exist, create it with initial count of 1
      await setDoc(viewCountRef, {
        count: 1
      });
    }
  } catch (error) {
    console.error("Error updating view count:", error);
  }
};

// Function to get current view count
const getViewCount = async () => {
  const viewCountRef = doc(db, "siteStats", "totalCount");
  
  try {
    const docSnap = await getDoc(viewCountRef);
    if (docSnap.exists()) {
      return docSnap.data().count;
    }
    return 0;
  } catch (error) {
    console.error("Error getting view count:", error);
    return 0;
  }
};

export { app, db, incrementViewCount, getViewCount }; 