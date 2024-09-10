import React, { useEffect, useRef, useCallback } from 'react';
import styles from '../styles/magazineStyles.module.css';

function Canvas({ template, uploadedImage, onImageUpload }) {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && uploadedImage) {
      console.log('Updating image for template:', template.uniqueId);
      const img = canvasRef.current.querySelector('[data-upload-target="true"]');
      if (img) {
        img.src = uploadedImage;
        console.log('Image updated successfully');
      } else {
        console.error('Image element not found');
      }
    }
  }, [template.uniqueId, uploadedImage]);

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Image upload initiated:', { templateUniqueId: template.uniqueId, fileName: file.name });
      onImageUpload(template.uniqueId, 'coverImage', file);
    }
  }, [template.uniqueId, onImageUpload]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const handleAddItem = useCallback(() => {
    const tocContainer = canvasRef.current.querySelector('#tocContainer');
    if (tocContainer) {
      const newItem = document.createElement('div');
      newItem.className = styles['toc-item'];
      newItem.innerHTML = `
        <span class="${styles['toc-title']} ${styles.editable}" contenteditable="true">New Section</span>
        <span class="${styles['toc-page']} ${styles.editable}" contenteditable="true">00</span>
      `;
      tocContainer.appendChild(newItem);
    }
  }, []);

  return (
    <div className={styles['canvas-container']} style={{ position: 'relative' }}>
      <div ref={canvasRef} dangerouslySetInnerHTML={{ __html: template.content }} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      {template.id === 'cover' && (
        <button
          onClick={handleUploadClick}
          className={styles['upload-button']}
        >
          Upload Image
        </button>
      )}
      {template.id === 'contents' && (
        <button
          onClick={handleAddItem}
          className={styles['add-item-button']}
        >
          Add Item
        </button>
      )}
    </div>
  );
}

export default Canvas;