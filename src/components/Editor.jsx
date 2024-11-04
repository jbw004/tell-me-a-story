import React, { useState, useCallback } from 'react';
import Canvas from './Canvas';

function Editor({ 
  templates = [],  // Provide default empty array
  onImageUpload, 
  uploadedImages = {},  // Provide default empty object
  onReorderTemplates, 
  onDeleteTemplate, 
  registerTemplateRef,
  onTextSelect,
  onBackgroundSelect,
  textStyles = {},  // Provide default empty object
  backgroundStyles = {},  // Provide default empty object
  onObjectDelete,
  isExporting,
  onAddTocItem,
  onRemoveTocItem
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
    <div className="editor-container">
      {templates.length > 0 ? (
        templates.map((template) => (
          <Canvas
          key={template.uniqueId || template.id} // Added fallback to template.id
          template={template}
          onImageUpload={onImageUpload}
          onHeightChange={handleTemplateHeightChange}
          onReorder={handleReorder}
          onDelete={onDeleteTemplate}
          uploadedImages={uploadedImages[template.uniqueId] || {}}
          registerRef={registerTemplateRef}
          onTextSelect={(textId, text) => onTextSelect(template.uniqueId, textId, text)}
          onBackgroundSelect={(backgroundId) => onBackgroundSelect(template.uniqueId, backgroundId)}
          textStyles={textStyles[template.uniqueId] || {}}
          backgroundStyles={backgroundStyles[template.uniqueId] || {}}
          onObjectDelete={(objectId) => onObjectDelete(template.uniqueId, objectId)}
          isExporting={isExporting}
          className={isExporting ? 'exported-view' : ''} // Add this line
          onAddTocItem={() => onAddTocItem(template.uniqueId)}
          onRemoveTocItem={() => onRemoveTocItem(template.uniqueId)}
        />
        ))
      ) : (
        <div className="placeholder-text">Select a style & template to start editing...</div>
      )}
    </div>
  );
}

export default Editor;
