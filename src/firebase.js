import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  // Add GoogleAuthProvider here
import { getDatabase, ref, set, get, remove, push, runTransaction, serverTimestamp } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { ref as storageRef, listAll, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';

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

// Custom Template Management Functions
export const saveCustomTemplateDraft = async (userId, templateData) => {
  const db = getDatabase();
  const storage = getStorage();
  
  // Upload PDF if provided
  let pdfUrl = templateData.pdfUrl;
  if (templateData.pdfFile) {
    const pdfRef = storageRef(storage, `users/${userId}/customTemplates/draft/template.pdf`);
    await uploadBytes(pdfRef, templateData.pdfFile);
    pdfUrl = await getDownloadURL(pdfRef);
  }
  
  // Save to Realtime Database
  const draftRef = ref(db, `users/${userId}/customTemplates/draft`);
  const draftData = {
    id: templateData.id || Date.now().toString(),
    name: templateData.name || 'Untitled Template',
    pdfUrl,
    dimensions: templateData.dimensions,
    elements: templateData.elements || [],
    updatedAt: serverTimestamp()
  };
  
  await set(draftRef, draftData);
  return draftData;
};

export const loadCustomTemplateDraft = async (userId) => {
  const db = getDatabase();
  const draftRef = ref(db, `users/${userId}/customTemplates/draft`);
  const snapshot = await get(draftRef);
  return snapshot.val();
};

export const deleteCustomTemplateDraft = async (userId) => {
  const db = getDatabase();
  const storage = getStorage();
  
  // Delete from Database
  const draftRef = ref(db, `users/${userId}/customTemplates/draft`);
  await remove(draftRef);
  
  // Delete PDF from Storage
  const pdfRef = storageRef(storage, `users/${userId}/customTemplates/draft/template.pdf`);
  try {
    await deleteObject(pdfRef);
  } catch (error) {
    console.log('PDF file may not exist:', error);
  }
};

export const publishCustomTemplate = async (userId, templateData) => {
  console.log('Publishing template with data:', templateData); // Debug log

  const db = getDatabase();
  const storage = getStorage();
  
  const templateId = templateData.id || Date.now().toString();
  
  // Move PDF to published location
  const publishedPdfRef = storageRef(
    storage, 
    `users/${userId}/customTemplates/published/${templateId}/template.pdf`
  );
  
  if (templateData.pdfUrl) {
    const response = await fetch(templateData.pdfUrl);
    const pdfBlob = await response.blob();
    await uploadBytes(publishedPdfRef, pdfBlob);
  }
  
  const publishedPdfUrl = await getDownloadURL(publishedPdfRef);
  
  // Clean and validate elements array
  const cleanElements = (templateData.elements || []).map(element => ({
    id: element.id,
    type: element.type,
    pageNumber: element.pageNumber,
    x: element.x,
    y: element.y,
    url: element.url || ''
  })).filter(element => 
    element.type && 
    typeof element.x === 'number' && 
    typeof element.y === 'number' && 
    typeof element.pageNumber === 'number'
  );

  // Save to Database
  const publishedRef = ref(db, `users/${userId}/customTemplates/published/${templateId}`);
  const publishedData = {
    id: templateId,
    name: templateData.name || 'Untitled Template',
    pdfUrl: publishedPdfUrl,
    dimensions: templateData.dimensions || null,
    elements: cleanElements,
    publishedAt: serverTimestamp(),
    userId
  };

  console.log('Saving published data:', publishedData); // Debug log
  
  try {
    await set(publishedRef, publishedData);
    await deleteCustomTemplateDraft(userId);
    return publishedData;
  } catch (error) {
    console.error('Error in publishCustomTemplate:', error);
    throw error;
  }
};

export const loadPublishedCustomTemplate = async (userId, templateId) => {
  const db = getDatabase();
  const publishedRef = ref(db, `users/${userId}/customTemplates/published/${templateId}`);
  const snapshot = await get(publishedRef);
  return snapshot.val();
};

export const deletePublishedCustomTemplate = async (userId, templateId) => {
  const db = getDatabase();
  const storage = getStorage();
  
  // Delete from Database
  const publishedRef = ref(db, `users/${userId}/customTemplates/published/${templateId}`);
  await remove(publishedRef);
  
  // Delete from Storage
  const pdfRef = storageRef(storage, `users/${userId}/customTemplates/published/${templateId}/template.pdf`);
  try {
    await deleteObject(pdfRef);
  } catch (error) {
    console.log('PDF file may not exist:', error);
  }
};

export const moveCustomTemplateToDraft = async (userId, templateId) => {
  const publishedTemplate = await loadPublishedCustomTemplate(userId, templateId);
  
  if (!publishedTemplate) {
    throw new Error("Template not found");
  }
  
  await saveCustomTemplateDraft(userId, publishedTemplate);
  await deletePublishedCustomTemplate(userId, templateId);
  
  return publishedTemplate;
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

