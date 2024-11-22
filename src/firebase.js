import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  // Add GoogleAuthProvider here
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  remove, 
  push, 
  runTransaction, 
  serverTimestamp,
  update,
  onValue  // Add this 
} from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
import { 
  getStorage, 
  ref as storageRef, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll  // Add this import
} from 'firebase/storage';
import { PDFDocument } from 'pdf-lib';

async function createLowResVersion(pdfBlob) {
  const arrayBuffer = await pdfBlob.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  const lowResDoc = await PDFDocument.create();
  
  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const [page] = await lowResDoc.copyPages(pdfDoc, [i]);
    lowResDoc.addPage(page);
  }
  
  const lowResBytes = await lowResDoc.save({
    useObjectStreams: false,
    addDefaultPage: false,
    compress: true,
    objectsPerTick: 20,
    updateFieldAppearances: false
  });
  
  return new Blob([lowResBytes], { type: 'application/pdf' });
}

export const loadCreatorSubscription = async (userId) => {
  const db = getDatabase();
  const subscriptionRef = ref(db, `users/${userId}/subscription`);
  
  try {
    const snapshot = await get(subscriptionRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error loading subscription:', error);
    throw error;
  }
};

// Add the new function here
export const subscribeToCreatorSubscription = (userId, callback) => {
  const db = getDatabase();
  const subscriptionRef = ref(db, `users/${userId}/subscription`);
  
  // Return the unsubscribe function
  return onValue(subscriptionRef, (snapshot) => {
    callback(snapshot.exists() ? snapshot.val() : null);
  }, (error) => {
    console.error('Error subscribing to subscription:', error);
    callback(null);
  });
};

export const updateCreatorSubscription = async (userId, subscriptionData) => {
  const db = getDatabase();
  const subscriptionRef = ref(db, `users/${userId}/subscription`);
  
  try {
    await set(subscriptionRef, {
      ...subscriptionData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

// In firebase.js, update this existing function
export const loadTemplateStickers = async (userId, templateId) => {
  const db = getDatabase();
  const stickersRef = ref(
    db, 
    `users/${userId}/customTemplates/published/${templateId}/stickers`
  );
  
  try {
    const snapshot = await get(stickersRef);
    if (snapshot.exists()) {
      const stickers = Object.entries(snapshot.val()).map(([key, sticker]) => ({
        ...sticker,
        id: key, // Use Firebase key as ID
        paymentIntentId: sticker.paymentIntentId // Include payment ID
      }));
      return stickers;
    }
    return [];
  } catch (error) {
    console.error('Error loading stickers:', error);
    throw error;
  }
};

export const isStickerSupportEnabled = async (userId, templateId) => {
  const db = getDatabase();
  const templateRef = ref(
    db, 
    `users/${userId}/customTemplates/published/${templateId}/stickerSupport`
  );
  
  try {
    const snapshot = await get(templateRef);
    return snapshot.exists() ? snapshot.val() : false;
  } catch (error) {
    console.error('Error checking sticker support:', error);
    throw error;
  }
};

export const publishMagazine = async (userId, magazineData) => {
  const db = getDatabase();
  const storage = getStorage();
  const magazineId = Date.now().toString();
  
  try {
    // Save magazine data
    const magazineRef = ref(db, `users/${userId}/magazines/${magazineId}`);
    
    // Ensure we have a title that's not the default
    if (!magazineData.title || magazineData.title.trim() === 'My Magazine') {
      throw new Error('Please provide a custom title for your magazine');
    }

    // Save magazine preview image if provided
    let previewImageUrl = null;
    if (magazineData.previewImage) {
      const imageRef = storageRef(storage, `users/${userId}/magazines/${magazineId}/preview.jpg`);
      await uploadBytes(imageRef, magazineData.previewImage);
      previewImageUrl = await getDownloadURL(imageRef);
    }

    const magazineMetadata = {
      id: magazineId,
      title: magazineData.title.trim(),
      previewImageUrl,
      templates: magazineData.templates,
      publishedAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
      userId
    };

    await set(magazineRef, magazineMetadata);
    await deleteDraft(userId); // Clear the draft after publishing
    return magazineMetadata;
  } catch (error) {
    console.error('Error in publishMagazine:', error);
    throw error;
  }
};

// Add this function for updating magazine metadata
export const updateMagazineMetadata = async (userId, magazineId, updates) => {
  const db = getDatabase();
  const storage = getStorage();
  const magazineRef = ref(db, `users/${userId}/magazines/${magazineId}`);
  
  try {
    // Handle preview image update if provided
    if (updates.previewImage) {
      const imageRef = storageRef(storage, `users/${userId}/magazines/${magazineId}/preview.jpg`);
      await uploadBytes(imageRef, updates.previewImage);
      updates.previewImageUrl = await getDownloadURL(imageRef);
      delete updates.previewImage;
    }

    // Handle title update
    if (updates.title && updates.title.trim() === 'My Magazine') {
      throw new Error('Please provide a custom title for your magazine');
    }

    const updatedData = {
      ...updates,
      lastUpdated: serverTimestamp()
    };

    await update(magazineRef, updatedData);
    return updatedData;
  } catch (error) {
    console.error('Error updating magazine metadata:', error);
    throw error;
  }
};

// Modify your existing deleteMagazine function to explicitly handle preview images
export const deleteMagazine = async (userId, magazineId) => {
  const db = getDatabase();
  const storage = getStorage();

  // Delete from Realtime Database
  const magazineRef = ref(db, `users/${userId}/magazines/${magazineId}`);
  
  // Get the magazine data first to check for preview image
  const snapshot = await get(magazineRef);
  const magazineData = snapshot.val();
  
  // Delete the database entry
  await remove(magazineRef);

  // Delete from Storage (both magazine content and preview image)
  const magazineStorageRef = storageRef(storage, `users/${userId}/magazines/${magazineId}`);
  const listResults = await listAll(magazineStorageRef);
  const deletePromises = listResults.items.map(item => deleteObject(item));
  await Promise.all(deletePromises);
};

export const saveDraft = async (userId, draftData) => {
  const db = getDatabase();
  const draftRef = ref(db, `users/${userId}/draft`);
  
  // Ensure there's always a title
  const enhancedDraftData = {
    ...draftData,
    title: draftData.title || 'My Magazine',
    lastUpdated: serverTimestamp()
  };
  
  await set(draftRef, enhancedDraftData);
  return enhancedDraftData;
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

  try {
    const snapshot = await get(publishedMagazineRef);
    const magazineData = snapshot.val();

    if (!magazineData) {
      throw new Error("Magazine not found");
    }

    if (magazineData.isCustomTemplate) {
      throw new Error("Custom template magazines cannot be edited");
    }

    // Log the raw template data to debug
    console.log('Published magazine templates:', magazineData.templates);

    // Transform templates with null checks
    const templatesArray = Object.entries(magazineData.templates || {})
      .map(([index, template]) => {
        // Log each template to debug
        console.log(`Processing template ${index}:`, template);

        const templateContent = template.htmlContent || template.content || '';
        
        if (!templateContent) {
          console.warn(`No content found for template ${index}`);
        }

        return {
          ...template,
          uniqueId: template.uniqueId || template.id || Date.now().toString(),
          content: templateContent,
          // Remove fields we don't need in draft, but don't set to undefined
          contentUrl: null,
          htmlContent: null
        };
      })
      .filter(template => template !== null); // Remove any null templates

    console.log('Processed templates:', templatesArray);

    const draftData = {
      title: magazineData.title || 'Untitled Magazine',
      templates: templatesArray,
      uploadedImages: magazineData.uploadedImages || {},
      textStyles: magazineData.textStyles || {},
      backgroundStyles: magazineData.backgroundStyles || {},
      lastUpdated: serverTimestamp()
    };

    // Log the final draft data
    console.log('Final draft data:', draftData);

    // Delete any existing draft first
    await deleteDraft(userId);

    // Save as new draft
    await set(draftRef, draftData);

    // Delete the published version
    await remove(publishedMagazineRef);

    return draftData;
  } catch (error) {
    console.error('Error moving magazine to draft:', error);
    throw error;
  }
};

export const updateMagazineTitle = async (userId, magazineId, newTitle) => {
  const db = getDatabase();
  const magazineRef = ref(db, `users/${userId}/magazines/${magazineId}`);
  
  try {
    // Validate the new title
    if (!newTitle || newTitle.trim() === '') {
      throw new Error('Magazine title is required');
    }
    if (newTitle.trim() === 'My Magazine') {
      throw new Error('Please provide a custom magazine title');
    }
    if (newTitle.length > 100) {
      throw new Error('Magazine title must be less than 100 characters');
    }

    // Update the title and lastUpdated timestamp
    await update(magazineRef, {
      title: newTitle.trim(),
      lastUpdated: serverTimestamp()
    });

    return { title: newTitle.trim() };
  } catch (error) {
    console.error('Error updating magazine title:', error);
    throw error;
  }
};

export const updateMagazinePreview = async (userId, magazineId, imageFile) => {
  const db = getDatabase();
  const storage = getStorage();
  const magazineRef = ref(db, `users/${userId}/magazines/${magazineId}`);
  
  try {
    // Validate the image file
    if (!imageFile) {
      throw new Error('Image file is required');
    }
    if (imageFile.size > 5 * 1024 * 1024) { // 5MB limit
      throw new Error('Image file must be less than 5MB');
    }

    // Upload new preview image
    const imageRef = storageRef(storage, `users/${userId}/magazines/${magazineId}/preview.jpg`);
    await uploadBytes(imageRef, imageFile);
    const previewImageUrl = await getDownloadURL(imageRef);

    // Update the preview URL and lastUpdated timestamp
    await update(magazineRef, {
      previewImageUrl,
      lastUpdated: serverTimestamp()
    });

    return { previewImageUrl };
  } catch (error) {
    console.error('Error updating magazine preview:', error);
    throw error;
  }
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

// In firebase.js, update the publishCustomTemplate function:
export const publishCustomTemplate = async (userId, templateData) => {
  const subscription = await loadCreatorSubscription(userId);
  const stickerSupportEnabled = subscription?.status === 'active';
  console.log('Publishing template with data:', templateData);
  const db = getDatabase();
  const storage = getStorage();
  const templateId = templateData.id || Date.now().toString();
  
  try {
    // Get PDF data
    let pdfBlob;
    if (templateData.pdfUrl) {
      const response = await fetch(templateData.pdfUrl);
      pdfBlob = await response.blob();
    } else if (templateData.pdfFile) {
      pdfBlob = templateData.pdfFile;
    } else {
      throw new Error('No PDF file found');
    }

    // Create and upload low-res version
    const lowResBlob = await createLowResVersion(pdfBlob);
    const lowResRef = storageRef(
      storage, 
      `users/${userId}/customTemplates/published/${templateId}/template-lowres.pdf`
    );
    await uploadBytes(lowResRef, lowResBlob);
    const lowResUrl = await getDownloadURL(lowResRef);

    // Upload original high-res version
    const publishedPdfRef = storageRef(
      storage, 
      `users/${userId}/customTemplates/published/${templateId}/template.pdf`
    );
    await uploadBytes(publishedPdfRef, pdfBlob);
    const publishedPdfUrl = await getDownloadURL(publishedPdfRef);

    // Handle preview image if provided
    let previewImageUrl = null;
    if (templateData.previewImage) {
      const previewImageRef = storageRef(
        storage, 
        `users/${userId}/customTemplates/published/${templateId}/preview.jpg`
      );
      await uploadBytes(previewImageRef, templateData.previewImage);
      previewImageUrl = await getDownloadURL(previewImageRef);
    }

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
      pdfUrl: publishedPdfUrl,        // High-res version
      pdfLowResUrl: lowResUrl,        // Low-res version
      previewImageUrl,
      dimensions: templateData.dimensions || null,
      elements: cleanElements,
      publishedAt: serverTimestamp(),
      userId,
      stickerSupport: stickerSupportEnabled
    };

    console.log('Saving published data:', publishedData);
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
  const data = snapshot.val();
  
  // Ensure both URLs are available in the returned data
  return data ? {
    ...data,
    pdfUrl: data.pdfUrl || null,
    pdfLowResUrl: data.pdfLowResUrl || data.pdfUrl || null  // Fallback to high-res if low-res not available
  } : null;
};

export const deletePublishedCustomTemplate = async (userId, templateId) => {
  const db = getDatabase();
  const storage = getStorage();
  
  // Delete from Database
  const publishedRef = ref(db, `users/${userId}/customTemplates/published/${templateId}`);
  await remove(publishedRef);
  
  // Delete from Storage
  const pdfRef = storageRef(storage, `users/${userId}/customTemplates/published/${templateId}/template.pdf`);
  const lowResPdfRef = storageRef(storage, `users/${userId}/customTemplates/published/${templateId}/template-lowres.pdf`);
  
  try {
    await deleteObject(pdfRef);
    await deleteObject(lowResPdfRef);
  } catch (error) {
    console.log('One or more PDF files may not exist:', error);
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

