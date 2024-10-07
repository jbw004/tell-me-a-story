import React from 'react';
import Layout from './Layout';
import ExportComponent from './ExportComponent';  // Import the existing ExportComponent

function LeftPanel({ magazines, onMagazineSelect, selectedMagazine, onTemplateSelect, selectedTemplates, templates, templateRefs, onExportStart, onExportEnd }) {
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
        <>
          <Layout templates={selectedTemplates} onTemplateSelect={handleExistingTemplateSelect} />
          <ExportComponent 
            templates={templates}
            templateRefs={templateRefs}
            onExportStart={onExportStart}
            onExportEnd={onExportEnd}
          />
        </>
      )}
    </div>
  );
}

export default LeftPanel;