import React, { useEffect, useRef, useCallback, useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

function Canvas({ 
  template, 
  onImageUpload, 
  onHeightChange, 
  onReorder, 
  onDelete, 
  uploadedImages, 
  style, 
  registerRef,
  onTextSelect,
  textStyles
}) {
  const canvasRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      registerRef(template.uniqueId, canvasRef.current);

      const updateHeight = () => {
        const height = canvasRef.current.scrollHeight;
        onHeightChange(template.uniqueId, height);
      };

      updateHeight();
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(canvasRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [template.uniqueId, onHeightChange, registerRef]);

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
  }, [uploadedImages]);

  const handleImageUpload = useCallback((event, imageId) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(template.uniqueId, imageId, file);
      };
      reader.readAsDataURL(file);
    }
  }, [template.uniqueId, onImageUpload]);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(template.uniqueId);
    setIsDeleteModalOpen(false);
  };

  const handleTextClick = (event) => {
    const textElement = event.target.closest('[data-text-id]');
    if (textElement) {
      const textId = textElement.getAttribute('data-text-id');
      onTextSelect(template.uniqueId, textId, textElement.textContent);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const textElements = canvasRef.current.querySelectorAll('[data-text-id]');
      textElements.forEach(element => {
        const textId = element.getAttribute('data-text-id');
        const style = textStyles[textId];
        if (style) {
          Object.assign(element.style, style);
        }
      });
    }
  }, [textStyles]);

  return (
    <div className="canvas-wrapper" style={style} ref={canvasRef}>
      <div className="canvas-controls">
        <button onClick={() => onReorder(template.uniqueId, 'up')}>↑</button>
        <button onClick={() => onReorder(template.uniqueId, 'down')}>↓</button>
        <button onClick={handleDeleteClick}>🗑️</button>
      </div>
      <div className="canvas-item">
        <div 
          dangerouslySetInnerHTML={{ __html: template.content }} 
          onClick={(e) => {
            handleTextClick(e);
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
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this page?"
      />
    </div>
  );
}

export default Canvas;