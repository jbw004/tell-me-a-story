import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  // Add GoogleAuthProvider here
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { ref, remove } from 'firebase/database';
import { ref as storageRef, listAll, deleteObject } from 'firebase/storage';

export const deleteMagazine = async (userId, magazineId) => {
  const db = getDatabase();
  const storage = getStorage();

  // Delete from Realtime Database
  const magazineRef = ref(db, `users/${userId}/magazines/${magazineId}`);
  await remove(magazineRef);

  // Delete from Storage
  const magazineStorageRef = storageRef(storage, `users/${userId}/magazines/${magazineId}`);
  const listResults = await listAll(magazineStorageRef);
  const deletePromises = listResults.items.map(item => deleteObject(item));
  await Promise.all(deletePromises);
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);
export const storage = getStorage(app);

