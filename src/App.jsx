import React, { useState, useCallback, useRef } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Editor from './components/Editor';
import { magazineTemplates } from './templates.js';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [selectedMagazine, setSelectedMagazine] = useState(null);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [uploadedImages, setUploadedImages] = useState({});
  const templateRefs = useRef({});

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

  return (
    <div className="main-content">
      <Editor 
        templates={selectedTemplates}
        onImageUpload={handleImageUpload}
        uploadedImages={uploadedImages}
        onReorderTemplates={handleReorderTemplates}
        onDeleteTemplate={handleDeleteTemplate}
        registerTemplateRef={registerTemplateRef}
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
        <RightPanel />
      </div>
    </div>
  );
}

export default App;