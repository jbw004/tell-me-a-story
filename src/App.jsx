import React, { useState } from 'react';
import TemplateSelector from './components/TemplateSelector';
import Editor from './components/Editor';
import { magazineTemplates } from './templates.js';

function App() {
  const [selectedMagazine, setSelectedMagazine] = useState(null);

  const handleMagazineSelect = (magazineId) => {
    const selected = magazineTemplates.find(mag => mag.id === magazineId);
    setSelectedMagazine(selected);
  };

  return (
    <div className="App">
      <h1>Magazine Layout Editor</h1>
      <TemplateSelector 
        magazines={magazineTemplates} 
        onSelect={handleMagazineSelect} 
      />
      {selectedMagazine ? (
        <Editor templates={selectedMagazine.templates} />
      ) : (
        <p>Please select a magazine style to start editing.</p>
      )}
    </div>
  );
}

export default App;