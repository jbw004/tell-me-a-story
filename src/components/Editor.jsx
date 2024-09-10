import React, { useState, useCallback, useEffect } from 'react';
import Canvas from './Canvas';

function Editor({ templates = [] }) {
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [uploadedImages, setUploadedImages] = useState({});

  const addTemplate = useCallback((template) => {
    const newTemplateId = `${template.id}-${Date.now()}`;
    const newTemplate = { ...template, uniqueId: newTemplateId };
    setSelectedTemplates(prev => [...prev, newTemplate]);
  }, []);

  const handleImageUpload = useCallback((templateUniqueId, imageId, file) => {
    console.log('Image upload triggered:', { templateUniqueId, imageId, fileName: file.name });
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('Image loaded, updating state for template:', templateUniqueId);
      setUploadedImages(prev => ({
        ...prev,
        [templateUniqueId]: {
          ...prev[templateUniqueId],
          [imageId]: e.target.result
        }
      }));
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    reader.readAsDataURL(file);
  }, []);

  useEffect(() => {
    console.log('Current uploadedImages state:', uploadedImages);
  }, [uploadedImages]);

  return (
    <div>
      <div>
        <h3>Available Templates</h3>
        {templates.map(template => (
          <button key={template.id} onClick={() => addTemplate(template)}>
            Add {template.name}
          </button>
        ))}
      </div>
      {selectedTemplates.map((template) => (
        <Canvas
          key={template.uniqueId}
          template={template}
          uploadedImage={uploadedImages[template.uniqueId]?.coverImage}
          onImageUpload={handleImageUpload}
        />
      ))}
      <button>Download Magazine</button>
    </div>
  );
}

export default Editor;