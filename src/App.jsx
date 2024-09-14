import React, { useState, useCallback } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Editor from './components/Editor';
import BottomToolbar from './components/BottomToolbar';
import { magazineTemplates } from './templates.js';
import './App.css';

function App() {
  const [selectedMagazine, setSelectedMagazine] = useState(null);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [uploadedImages, setUploadedImages] = useState({});

  const handleMagazineSelect = (magazineId) => {
    const selected = magazineTemplates.find(mag => mag.id === magazineId);
    setSelectedMagazine(selected);
  };

  const handleTemplateSelect = (template) => {
    const newTemplateId = `${template.id}-${Date.now()}`;
    const newTemplate = { ...template, uniqueId: newTemplateId };
    setSelectedTemplates(prev => [...prev, newTemplate]);
  };

  const handleImageUpload = useCallback((templateUniqueId, imageId, file) => {
    console.log('Image uploaded:', templateUniqueId, imageId, file);
    // Here you can implement any additional logic for image upload,
    // such as sending the file to a server
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

  return (
    <div className="App">
      <LeftPanel 
        magazines={magazineTemplates} 
        onMagazineSelect={handleMagazineSelect}
        selectedMagazine={selectedMagazine}
        onTemplateSelect={handleTemplateSelect}
      />
      <div className="main-content">
        <Editor 
          templates={selectedTemplates}
          onImageUpload={handleImageUpload}
          uploadedImages={uploadedImages}
        />
      </div>
      <div className="right-panel">
        <RightPanel />
      </div>
      <BottomToolbar />
    </div>
  );
}

export default App;