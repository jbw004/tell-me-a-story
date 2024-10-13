import React from 'react';
import Layout from './Layout';
import ExportComponent from './ExportComponent';  // Import the existing ExportComponent
import SaveNotification from './SaveNotification';  // Import the SaveNotification component


function LeftPanel({ magazines, onMagazineSelect, selectedMagazine, onTemplateSelect, selectedTemplates, templates, templateRefs, onExportStart, onExportEnd, onSaveDraft, onDiscardDraft, user, showSaveNotification }) {
  const handleNewTemplateSelect = (template) => {
    onTemplateSelect(template, false);
  };

  const handleExistingTemplateSelect = (template) => {
    onTemplateSelect(template, true);
  };

  return (
    <div className="LeftPanel">
      <h2>Styles</h2>
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
          {user && (
            <>
              <button onClick={onSaveDraft} className="save-draft-button">
                Save as Draft
              </button>
              <button onClick={onDiscardDraft} className="discard-draft-button">
                Discard Draft
              </button>
              {showSaveNotification && (
                <SaveNotification 
                  message="Progress saved!" 
                  position="in-panel"
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default LeftPanel;