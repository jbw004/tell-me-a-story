import React, { useState, useCallback } from 'react';
import Canvas from './Canvas';

function Editor({ templates, onImageUpload, uploadedImages, onReorderTemplates, onDeleteTemplate, registerTemplateRef }) {
  const [templateHeights, setTemplateHeights] = useState({});

  const handleTemplateHeightChange = useCallback((templateId, height) => {
    setTemplateHeights(prev => ({
      ...prev,
      [templateId]: height
    }));
  }, []);

  const handleReorder = useCallback((templateId, direction) => {
    const currentIndex = templates.findIndex(t => t.uniqueId === templateId);
    const newTemplates = [...templates];
    let newIndex;

    if (direction === 'up') {
      newIndex = currentIndex === 0 ? newTemplates.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === newTemplates.length - 1 ? 0 : currentIndex + 1;
    }

    const [reorderedTemplate] = newTemplates.splice(currentIndex, 1);
    newTemplates.splice(newIndex, 0, reorderedTemplate);

    onReorderTemplates(newTemplates);
  }, [templates, onReorderTemplates]);

  return (
    <div className="editor-container">
      {templates.length > 0 ? (
        templates.map((template, index) => (
          <Canvas
            key={template.uniqueId}
            template={template}
            onImageUpload={onImageUpload}
            onHeightChange={handleTemplateHeightChange}
            onReorder={handleReorder}
            onDelete={onDeleteTemplate}
            uploadedImages={uploadedImages[template.uniqueId] || {}}
            registerRef={registerTemplateRef}
            style={{
              marginTop: index > 0 ? '20px' : '0',
              minHeight: '812px',
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