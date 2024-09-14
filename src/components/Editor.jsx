import React, { useState, useCallback } from 'react';
import Canvas from './Canvas';

function Editor({ templates, onImageUpload }) {
  const [templateHeights, setTemplateHeights] = useState({});

  const handleTemplateHeightChange = useCallback((templateId, height) => {
    setTemplateHeights(prev => ({
      ...prev,
      [templateId]: height
    }));
  }, []);

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
        templates.map((template, index) => (
          <Canvas
            key={template.uniqueId}
            template={template}
            onImageUpload={handleImageUpload}
            onHeightChange={handleTemplateHeightChange}
            style={{
              marginTop: index > 0 ? '20px' : '0', // Add space between templates
              minHeight: '812px', // Minimum height
              height: templateHeights[template.uniqueId] || 'auto'
            }}
          />
        ))
      ) : (
        <div className="placeholder-text">Select a template to start editing</div>
      )}
    </div>
  );
}

export default Editor;