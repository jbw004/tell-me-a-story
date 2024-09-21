import React, { useState, useCallback } from 'react';
import Canvas from './Canvas';

function Editor({ 
  templates, 
  onImageUpload, 
  uploadedImages, 
  onReorderTemplates, 
  onDeleteTemplate, 
  registerTemplateRef,
  onTextSelect,
  textStyles,
  onObjectDelete, // New prop for object deletion
  isExporting,
  onAddTocItem,  // New prop
  onRemoveTocItem  // New prop
}) {
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
    <div className={`editor-container ${isExporting ? 'exporting' : ''}`}>
      {templates.length > 0 ? (
        templates.map((template) => (
          <Canvas
            key={template.uniqueId}
            template={template}
            onImageUpload={onImageUpload}
            onHeightChange={handleTemplateHeightChange}
            onReorder={handleReorder}
            onDelete={onDeleteTemplate}
            uploadedImages={uploadedImages[template.uniqueId] || {}}
            registerRef={registerTemplateRef}
            onTextSelect={onTextSelect}
            textStyles={textStyles[template.uniqueId] || {}}
            onObjectDelete={onObjectDelete} // Pass down the new prop
            isExporting={isExporting}
            onAddTocItem={onAddTocItem}  // New prop
            onRemoveTocItem={onRemoveTocItem}  // New prop
          />
        ))
      ) : (
        <div className="placeholder-text">Select a template to start editing</div>
      )}
    </div>
  );
}

export default Editor;