import React, { useEffect, useRef, useCallback, useState } from 'react';

function Canvas({ template, onImageUpload, onHeightChange, style }) {
  const canvasRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState({});

  useEffect(() => {
    if (canvasRef.current) {
      const updateHeight = () => {
        const height = canvasRef.current.scrollHeight;
        onHeightChange(template.uniqueId, height);
      };

      updateHeight(); // Initial height update

      // Set up a ResizeObserver to detect content changes
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(canvasRef.current);

      return () => resizeObserver.disconnect();
    }
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
        setUploadedImages(prev => ({
          ...prev,
          [imageId]: e.target.result
        }));
        onImageUpload(template.uniqueId, imageId, file);
      };
      reader.readAsDataURL(file);
    }
  }, [template.uniqueId, onImageUpload]);

  return (
    <div className="canvas-item" style={style}>
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
    </div>
  );
}

export default Canvas;