import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  // Add GoogleAuthProvider here
import { getDatabase, ref, set, get, remove, push, runTransaction, serverTimestamp } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
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

export const saveDraft = async (userId, draftData) => {
  const db = getDatabase();
  const draftRef = ref(db, `users/${userId}/draft`);
  await set(draftRef, draftData);
};

export const loadDraft = async (userId) => {
  const db = getDatabase();
  const draftRef = ref(db, `users/${userId}/draft`);
  const snapshot = await get(draftRef);
  return snapshot.val();
};

export const deleteDraft = async (userId) => {
  const db = getDatabase();
  const draftRef = ref(db, `users/${userId}/draft`);
  await remove(draftRef);
};

export const moveMagazineToDraft = async (userId, magazineId) => {
  const db = getDatabase();
  const publishedMagazineRef = ref(db, `users/${userId}/magazines/${magazineId}`);
  const draftRef = ref(db, `users/${userId}/draft`);

  // Read the published magazine
  const snapshot = await get(publishedMagazineRef);
  const magazineData = snapshot.val();

  if (!magazineData) {
    throw new Error("Magazine not found");
  }

  // Prepare the draft data
  const draftData = {
    title: magazineData.title,
    userId: magazineData.userId,
    templates: Object.values(magazineData.templates || {}).map(template => ({
      ...template,
      content: template.htmlContent || template.content // Use HTML content if available, fall back to URL content
    }))
  };

  // Save as draft
  await set(draftRef, draftData);

  // Delete the published version
  await remove(publishedMagazineRef);

  return draftData;
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

