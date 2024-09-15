import React from 'react';
import Layout from './Layout';

function LeftPanel({ magazines, onMagazineSelect, selectedMagazine, onTemplateSelect, selectedTemplates }) {
  const handleNewTemplateSelect = (template) => {
    onTemplateSelect(template, false);
  };

  const handleExistingTemplateSelect = (template) => {
    onTemplateSelect(template, true);
  };

  return (
    <div className="LeftPanel">
      <h2>Magazines</h2>
      {magazines.map(magazine => (
        <button
          key={magazine.id}
          onClick={() => onMagazineSelect(magazine.id)}
          className={selectedMagazine && selectedMagazine.id === magazine.id ? 'selected' : ''}
        >
          {magazine.name}
        </button>
      ))}
      
      {selectedMagazine && (
        <div>
          <h2>Templates</h2>
          {selectedMagazine.templates.map(template => (
            <button key={template.id} onClick={() => handleNewTemplateSelect(template)}>
              {template.name}
            </button>
          ))}
        </div>
      )}

      {selectedTemplates.length > 0 && (
        <Layout templates={selectedTemplates} onTemplateSelect={handleExistingTemplateSelect} />
      )}
    </div>
  );
}

export default LeftPanel;