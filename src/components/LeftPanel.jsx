import React from 'react';
import Layout from './Layout';
import ExportComponent from './ExportComponent';  // Import the existing ExportComponent
import SaveNotification from './SaveNotification';  // Import the SaveNotification component
import TemplatePreviewTooltip from './TemplatePreviewTooltip';



function LeftPanel({ magazines, onMagazineSelect, selectedMagazine, onTemplateSelect, selectedTemplates, templates, templateRefs, onExportStart, onExportEnd, onSaveDraft, onDiscardDraft, user, showSaveNotification, isSaving }) {
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
            <TemplatePreviewTooltip 
              key={template.id}
              templateName={template.name}
              magazineStyle={selectedMagazine.name}
            >
              <button onClick={() => handleNewTemplateSelect(template)}>
                {template.name}
              </button>
            </TemplatePreviewTooltip>
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
              <button 
                onClick={onSaveDraft} 
                className={`save-draft-button ${isSaving ? 'saving' : ''}`}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save as Draft'}
              </button>
              <button 
                onClick={onDiscardDraft} 
                className="discard-draft-button"
                disabled={isSaving}
              >
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