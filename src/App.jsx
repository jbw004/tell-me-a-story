import React, { useState } from 'react';
import Editor from './components/Editor';
import TemplateSelector from './components/TemplateSelector';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="App">
      <h1>Magazine Layout Editor</h1>
      <TemplateSelector onSelect={setSelectedTemplate} />
      {selectedTemplate && <Editor template={selectedTemplate} />}
    </div>
  );
}

export default App;