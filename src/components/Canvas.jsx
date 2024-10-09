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
  onBackgroundSelect,
  backgroundStyles,
  textStyles,
  onObjectDelete,
  isExporting,  // New prop for export state
  onAddTocItem,  // New prop
  onRemoveTocItem  // New prop
}) {
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedObject) {
        const activeElement = document.activeElement;
        const isEditingText = activeElement.isContentEditable || 
                              activeElement.tagName === 'INPUT' || 
                              activeElement.tagName === 'TEXTAREA';
        
        if (!isEditingText) {
          console.log('Delete or Backspace key pressed with selected object');
          event.preventDefault();
          setDeleteAction('object');
          setIsDeleteModalOpen(true);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedObject]);


  useEffect(() => {
    if (canvasRef.current) {
      registerRef(template.uniqueId, canvasRef.current);
    }
  }, [template.uniqueId, registerRef]);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current && canvasRef.current) {
        const height = contentRef.current.scrollHeight;
        onHeightChange(template.uniqueId, height);
        canvasRef.current.style.height = `${height}px`;
      }
    };

    let resizeObserver;
    if (contentRef.current) {
      updateHeight();
      resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [template.uniqueId, onHeightChange]);

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

  const handleDeleteConfirm = () => {
    console.log('Delete confirmed. Action:', deleteAction, 'Selected object:', selectedObject);
    if (deleteAction === 'template') {
      onDelete(template.uniqueId);
    } else if (deleteAction === 'object' && selectedObject) {
      console.log('Deleting object:', selectedObject, 'from template:', template.uniqueId);
      onObjectDelete(selectedObject); // Remove template.uniqueId from here
    }
    setIsDeleteModalOpen(false);
    setDeleteAction(null);
    setSelectedObject(null);
    document.querySelectorAll('[data-deletable="true"]').forEach(el => {
      el.classList.remove('selected');
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      const textElements = canvasRef.current.querySelectorAll('[data-text-id]');
      textElements.forEach(element => {
        const textId = element.getAttribute('data-text-id');
        const style = textStyles[textId];
        if (style) {
          Object.assign(element.style, style);
          // Ensure background color is applied
          if (style.backgroundColor) {
            element.style.backgroundColor = style.backgroundColor;
          }
        }
      });
      const backgroundElements = canvasRef.current.querySelectorAll('[data-background-id]');
      backgroundElements.forEach(element => {
        const backgroundId = element.getAttribute('data-background-id');
        const style = backgroundStyles[backgroundId];
        if (style) {
          Object.assign(element.style, style);
        }
      });
    }
  }, [textStyles, backgroundStyles]);

  const handleObjectSelect = (event) => {
    if (isExporting) return; // Disable selection during export
    const target = event.target.closest('[data-deletable="true"]');
    if (target) {
      event.preventDefault(); // Prevent text selection
      document.querySelectorAll('[data-deletable="true"]').forEach(el => {
        el.classList.remove('selected');
      });
      const objectId = target.getAttribute('data-object-id');
      console.log('Object selected:', objectId);
      console.log('Object attributes:', target.getAttributeNames().map(attr => `${attr}="${target.getAttribute(attr)}"`));
      setSelectedObject(objectId);
      target.classList.add('selected');
  
      if (target.hasAttribute('data-background-id')) {
        onBackgroundSelect(objectId);
      }
    } else {
      setSelectedObject(null);
      document.querySelectorAll('[data-deletable="true"]').forEach(el => {
        el.classList.remove('selected');
      });
    }
  };

  const handleTextEdit = (event) => {
    if (isExporting) return; // Disable editing during export
    const textElement = event.target.closest('[data-text-id]');
    if (textElement) {
      const textId = textElement.getAttribute('data-text-id');
      onTextSelect(textId, textElement.textContent);
      // Remove selection when entering edit mode
      setSelectedObject(null);
      document.querySelectorAll('[data-deletable="true"]').forEach(el => {
        el.classList.remove('selected');
      });
      // Make the text editable
      textElement.contentEditable = true;
      textElement.focus();
  
      // Set cursor to the end of the text
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(textElement);
      range.collapse(false); // false means collapse to end
      selection.removeAllRanges();
      selection.addRange(range);
  
      // Prevent default behavior to allow custom cursor positioning
      event.preventDefault();
    }
  };

  const handleTextEditEnd = (event) => {
  const textElement = event.target.closest('[data-text-id]');
  if (textElement) {
    textElement.contentEditable = false;
    const textId = textElement.getAttribute('data-text-id');
    onTextSelect(textId, textElement.textContent);
  }
};

  const handleContentChange = (event) => {
    const textElement = event.target.closest('[data-text-id]');
    if (textElement) {
      const textId = textElement.getAttribute('data-text-id');
      onTextSelect(template.uniqueId, textId, textElement.textContent);
    }
  };

  const handleAddTocItem = () => {
    if (template.id === 'contents-mobile') {
      onAddTocItem(template.uniqueId);
    }
  };

  const handleRemoveTocItem = () => {
    if (template.id === 'contents-mobile') {
      onRemoveTocItem(template.uniqueId);
    }
  };

  return (
    <div className={`canvas-wrapper ${isExporting ? 'exporting' : ''}`} style={style} ref={canvasRef}>
      {!isExporting && (
      <div className="canvas-controls">
        <button onClick={() => onReorder(template.uniqueId, 'up')}>↑</button>
        <button onClick={() => onReorder(template.uniqueId, 'down')}>↓</button>
        <button onClick={() => { setDeleteAction('template'); setIsDeleteModalOpen(true); }}>🗑️</button>
        {template.id === 'contents-mobile' && (
            <>
              <button onClick={handleAddTocItem}>+</button>
              <button onClick={handleRemoveTocItem}>-</button>
            </>
          )}
      </div>
      )}
      <div className="canvas-item">
        <div 
          dangerouslySetInnerHTML={{ __html: template.content }} 
          onMouseDown={handleObjectSelect}
          onDoubleClick={handleTextEdit}
          onBlur={handleTextEditEnd}
          onInput={handleContentChange}
          onClick={(e) => {
            if (isExporting) return; // Disable image upload during export
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
      {!isExporting && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          message={deleteAction === 'template' 
            ? "Are you sure you want to delete this page?" 
            : "Are you sure you want to delete this object?"}
        />
      )}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={deleteAction === 'template' 
          ? "Are you sure you want to delete this page?" 
          : "Are you sure you want to delete this object?"}
      />
    </div>
  );
}

export default Canvas;