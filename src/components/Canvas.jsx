import React, { useEffect, useRef, useCallback, useState } from 'react';

function Canvas({ template, onImageUpload }) {
  const canvasRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState({});

  useEffect(() => {
    if (canvasRef.current) {
      const uploadTargets = canvasRef.current.querySelectorAll('[data-upload-target="true"]');
      uploadTargets.forEach(target => {
        const imageId = target.id;
        if (uploadedImages[imageId]) {
          target.src = uploadedImages[imageId];
        }
      });
    }
  }, [template.uniqueId, uploadedImages]);

  const handleImageUpload = useCallback((event, imageId) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages(prev => ({
          ...prev,
          [imageId]: e.target.result
        }));
        onImageUpload(template.uniqueId, imageId, file);
      };
      reader.readAsDataURL(file);
    }
  }, [template.uniqueId, onImageUpload]);

  const handleAddItem = useCallback(() => {
    const tocContainer = canvasRef.current.querySelector('#tocContainer');
    if (tocContainer) {
      const newItem = document.createElement('div');
      newItem.className = 'toc-item';
      newItem.innerHTML = `
        <span class="toc-title editable" contenteditable="true">New Section</span>
        <span class="toc-page editable" contenteditable="true">00</span>
      `;
      tocContainer.appendChild(newItem);
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div 
        ref={canvasRef} 
        dangerouslySetInnerHTML={{ __html: template.content }} 
        onClick={(e) => {
          const target = e.target.closest('[data-upload-target="true"]');
          if (target) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (event) => handleImageUpload(event, target.id);
            input.click();
          }
        }}
      />
      {template.id === 'contents' && (
        <button
          onClick={handleAddItem}
          style={{ position: 'absolute', bottom: '20px', left: '20px', padding: '5px 10px' }}
        >
          Add Item
        </button>
      )}
    </div>
  );
}

export default Canvas;