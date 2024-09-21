import React, { useState, useCallback, useRef } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Editor from './components/Editor';
import ExportComponent from './components/ExportComponent';
import { magazineTemplates } from './templates.js';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [selectedMagazine, setSelectedMagazine] = useState(null);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [uploadedImages, setUploadedImages] = useState({});
  const templateRefs = useRef({});
  const [selectedText, setSelectedText] = useState(null);
  const [textStyles, setTextStyles] = useState({});
  const [isExporting, setIsExporting] = useState(false);

  const handleExportStart = useCallback(() => {
    setIsExporting(true);
  }, []);

  const handleExportEnd = useCallback(() => {
    setIsExporting(false);
  }, []);

  const handleMagazineSelect = (magazineId) => {
    const selected = magazineTemplates.find(mag => mag.id === magazineId);
    setSelectedMagazine(selected);
  };

  const handleTemplateSelect = (template, isExisting = false) => {
    if (isExisting) {
      scrollToTemplate(template.uniqueId);
    } else {
      const newTemplateId = uuidv4();
      const newTemplate = { ...template, uniqueId: newTemplateId };
      setSelectedTemplates(prev => [...prev, newTemplate]);
      // Scroll to the newly added template after a short delay to ensure it's rendered
      setTimeout(() => scrollToTemplate(newTemplateId), 100);
    }
  };

  const scrollToTemplate = (templateId) => {
    const ref = templateRefs.current[templateId];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const registerTemplateRef = useCallback((id, ref) => {
    templateRefs.current[id] = ref;
  }, []);

  const handleImageUpload = useCallback((templateUniqueId, imageId, file) => {
    console.log('Image uploaded:', templateUniqueId, imageId, file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImages(prev => ({
        ...prev,
        [templateUniqueId]: {
          ...prev[templateUniqueId],
          [imageId]: e.target.result
        }
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleReorderTemplates = useCallback((reorderedTemplates) => {
    setSelectedTemplates(reorderedTemplates);
  }, []);

  const handleDeleteTemplate = useCallback((templateId) => {
    setSelectedTemplates(prev => prev.filter(template => template.uniqueId !== templateId));
    setUploadedImages(prev => {
      const newUploadedImages = { ...prev };
      delete newUploadedImages[templateId];
      return newUploadedImages;
    });
  }, []);

  const handleTextSelect = useCallback((templateId, textId, text) => {
    setSelectedText({ templateId, textId, text });
  }, []);

  const handleTextStyleChange = useCallback((style) => {
    if (selectedText) {
      setTextStyles(prev => ({
        ...prev,
        [selectedText.templateId]: {
          ...prev[selectedText.templateId],
          [selectedText.textId]: {
            ...prev[selectedText.templateId]?.[selectedText.textId],
            ...style
          }
        }
      }));
    }
  }, [selectedText]);

  const handleObjectDelete = useCallback((templateId, objectId) => {
    setSelectedTemplates(prevTemplates => 
      prevTemplates.map(template => {
        if (template.uniqueId === templateId) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(template.content, 'text/html');
          const elementToDelete = doc.querySelector(`[data-object-id="${objectId}"]`);
          if (elementToDelete) {
            elementToDelete.remove();
            return {
              ...template,
              content: doc.body.innerHTML
            };
          }
        }
        return template;
      })
    );
  }, []);

  const handleAddTocItem = useCallback((templateId) => {
    setSelectedTemplates(prevTemplates => 
      prevTemplates.map(template => {
        if (template.uniqueId === templateId && template.id === 'contents-mobile') {
          const parser = new DOMParser();
          const doc = parser.parseFromString(template.content, 'text/html');
          const tocContainer = doc.getElementById('tocContainer');
          
          if (tocContainer) {
            const newItem = doc.createElement('div');
            newItem.className = 'toc-item';
            newItem.innerHTML = `
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-new-title" data-object-id="contents-item-new-title" data-deletable="true">New Item</span>
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-new-page" data-object-id="contents-item-new-page" data-deletable="true">00</span>
            `;
            tocContainer.appendChild(newItem);

            return {
              ...template,
              content: doc.body.innerHTML
            };
          }
        }
        return template;
      })
    );
  }, []);

  const handleRemoveTocItem = useCallback((templateId) => {
    setSelectedTemplates(prevTemplates => 
      prevTemplates.map(template => {
        if (template.uniqueId === templateId && template.id === 'contents-mobile') {
          const parser = new DOMParser();
          const doc = parser.parseFromString(template.content, 'text/html');
          const tocContainer = doc.getElementById('tocContainer');
          
          if (tocContainer && tocContainer.lastElementChild) {
            tocContainer.removeChild(tocContainer.lastElementChild);

            return {
              ...template,
              content: doc.body.innerHTML
            };
          }
        }
        return template;
      })
    );
  }, []);

  return (
    <div className="main-content">
      <Editor 
        templates={selectedTemplates}
        onImageUpload={handleImageUpload}
        uploadedImages={uploadedImages}
        onReorderTemplates={handleReorderTemplates}
        onDeleteTemplate={handleDeleteTemplate}
        registerTemplateRef={registerTemplateRef}
        onTextSelect={handleTextSelect}
        textStyles={textStyles}
        onObjectDelete={handleObjectDelete} // Pass down the new handler
        isExporting={isExporting}
        onAddTocItem={handleAddTocItem}  // New prop
        onRemoveTocItem={handleRemoveTocItem}  // New prop
      />
      <ExportComponent 
        templates={selectedTemplates}
        templateRefs={templateRefs}
        onExportStart={handleExportStart}
        onExportEnd={handleExportEnd}
      />
      <div className="App">
        <LeftPanel 
          magazines={magazineTemplates} 
          onMagazineSelect={handleMagazineSelect}
          selectedMagazine={selectedMagazine}
          onTemplateSelect={handleTemplateSelect}
          selectedTemplates={selectedTemplates}
        />
      </div>
      <div className="right-panel">
        <RightPanel 
          selectedText={selectedText}
          onTextStyleChange={handleTextStyleChange}
        />
      </div>
    </div>
  );
}

export default App;