// magazineMetadata.js
import { getDatabase, ref, set, get, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const PREVIEW_IMAGE_SIZES = {
  width: 400,
  height: 300,
  maxSizeBytes: 5 * 1024 * 1024 // 5MB
};

export const validateMagazineTitle = (title) => {
  if (!title || title.trim() === '') {
    return 'Magazine title is required';
  }
  if (title.trim() === 'My Magazine') {
    return 'Please provide a custom magazine title';
  }
  if (title.length > 100) {
    return 'Magazine title must be less than 100 characters';
  }
  return null;
};

export const updateMagazineMetadata = async (userId, magazineId, metadata) => {
  if (!userId || !magazineId) {
    throw new Error('User ID and Magazine ID are required');
  }

  const db = getDatabase();
  const magazineRef = ref(db, `users/${userId}/magazines/${magazineId}/metadata`);
  
  const updates = {};
  
  if (metadata.title) {
    const titleError = validateMagazineTitle(metadata.title);
    if (titleError) {
      throw new Error(titleError);
    }
    updates.title = metadata.title.trim();
  }

  if (metadata.lastUpdated) {
    updates.lastUpdated = metadata.lastUpdated;
  }

  await update(magazineRef, updates);
  return updates;
};

export const uploadMagazinePreview = async (userId, magazineId, imageFile) => {
  if (!userId || !magazineId) {
    throw new Error('User ID and Magazine ID are required');
  }

  if (!imageFile) {
    throw new Error('Image file is required');
  }

  if (imageFile.size > PREVIEW_IMAGE_SIZES.maxSizeBytes) {
    throw new Error('Image file size must be less than 5MB');
  }

  const storage = getStorage();
  const imageRef = storageRef(storage, `users/${userId}/magazines/${magazineId}/preview.jpg`);
  
  // Upload the image
  await uploadBytes(imageRef, imageFile);
  const imageUrl = await getDownloadURL(imageRef);
  
  // Update the magazine metadata with the new image URL
  const db = getDatabase();
  const magazineRef = ref(db, `users/${userId}/magazines/${magazineId}/metadata`);
  
  await update(magazineRef, {
    previewImageUrl: imageUrl,
    lastUpdated: Date.now()
  });

  return imageUrl;
};

export const deleteMagazinePreview = async (userId, magazineId) => {
  if (!userId || !magazineId) {
    throw new Error('User ID and Magazine ID are required');
  }

  const storage = getStorage();
  const imageRef = storageRef(storage, `users/${userId}/magazines/${magazineId}/preview.jpg`);
  
  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.log('Preview image may not exist:', error);
  }
  
  const db = getDatabase();
  const magazineRef = ref(db, `users/${userId}/magazines/${magazineId}/metadata`);
  
  await update(magazineRef, {
    previewImageUrl: null,
    lastUpdated: Date.now()
  });
};

export const getMagazineMetadata = async (userId, magazineId) => {
  const db = getDatabase();
  const magazineRef = ref(db, `users/${userId}/magazines/${magazineId}/metadata`);
  const snapshot = await get(magazineRef);
  return snapshot.val() || {
    title: 'My Magazine',
    createdAt: Date.now(),
    lastUpdated: Date.now(),
    previewImageUrl: null
  };
};