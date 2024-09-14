import React, { useState, useCallback } from 'react';
import Canvas from './Canvas';

function Editor({ templates, onImageUpload }) {
  const [uploadedImages, setUploadedImages] = useState({});

  const handleImageUpload = useCallback((templateUniqueId, imageId, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImages(prev => ({
        ...prev,
        [templateUniqueId]: {
          ...prev[templateUniqueId],
          [imageId]: e.target.result
        }
      }));
      onImageUpload(templateUniqueId, imageId, file);
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  return (
    <div className="editor-container">
      {templates.length > 0 ? (
        templates.map((template) => (
          <Canvas
            key={template.uniqueId}
            template={template}
            onImageUpload={handleImageUpload}
            uploadedImages={uploadedImages[template.uniqueId] || {}}
          />
        ))
      ) : (
        <div className="placeholder-text">Select a template to start editing</div>
      )}
    </div>
  );
}

export default Editor;