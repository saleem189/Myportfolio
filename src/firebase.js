// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, increment } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

/**
 * Get user-friendly error message based on Firebase error code
 * @param {Error} error - Firebase error object
 * @returns {string} User-friendly error message
 */
const getFirebaseErrorMessage = (error) => {
  const errorMessages = {
    'permission-denied': 'Access denied. Please check your permissions.',
    unavailable: 'Service temporarily unavailable. Please try again later.',
    'not-found': 'Requested data not found.',
    'already-exists': 'This data already exists.',
    'resource-exhausted': 'Too many requests. Please try again later.',
    unauthenticated: 'Authentication required.',
    'deadline-exceeded': 'Request timeout. Please try again.',
  };

  return errorMessages[error.code] || 'An unexpected error occurred. Please try again.';
};

/**
 * Increment the view count with retry logic
 * @param {number} retries - Number of retry attempts (default: 3)
 * @returns {Promise<boolean>} Success status
 */
const incrementViewCount = async (retries = 3) => {
  const viewCountRef = doc(db, 'siteStats', 'totalCount');

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const docSnap = await getDoc(viewCountRef);

      if (docSnap.exists()) {
        // If document exists, increment the count
        await setDoc(
          viewCountRef,
          {
            count: increment(1),
          },
          { merge: true }
        );
      } else {
        // If document doesn't exist, create it with initial count of 1
        await setDoc(viewCountRef, {
          count: 1,
        });
      }
      return true;
    } catch (error) {
      console.error(`Error updating view count (attempt ${attempt + 1}/${retries}):`, error);

      // If this is the last attempt or a non-retryable error, throw
      if (attempt === retries - 1 || error.code === 'permission-denied') {
        console.error('Failed to update view count:', getFirebaseErrorMessage(error));
        return false;
      }

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  return false;
};

/**
 * Get current view count with error handling
 * @returns {Promise<number>} View count or 0 if error
 */
const getViewCount = async () => {
  const viewCountRef = doc(db, 'siteStats', 'totalCount');

  try {
    const docSnap = await getDoc(viewCountRef);
    if (docSnap.exists()) {
      return docSnap.data().count;
    }
    return 0;
  } catch (error) {
    console.error('Error getting view count:', getFirebaseErrorMessage(error));
    return 0;
  }
};

export { app, db, incrementViewCount, getViewCount };
