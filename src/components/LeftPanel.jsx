import React, { useState } from 'react';  // Add useState
import Layout from './Layout';
import ExportComponent from './ExportComponent';  // Import the existing ExportComponent
import SaveNotification from './SaveNotification';  // Import the SaveNotification component
import TemplatePreviewTooltip from './TemplatePreviewTooltip';
import { useNavigate } from 'react-router-dom'; // Add this import





function LeftPanel({ magazines, onMagazineSelect, selectedMagazine, onTemplateSelect, selectedTemplates, templates, templateRefs, onExportStart, onExportEnd, onSaveDraft, onDiscardDraft, user, showSaveNotification, isSaving }) {
  const navigate = useNavigate(); // Add this
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);
  
  const handleNewTemplateSelect = (template) => {
    onTemplateSelect(template, false);
  };

  const handleExistingTemplateSelect = (template) => {
    onTemplateSelect(template, true);
  };

  return (
    <div className="LeftPanel">
      {/* Custom Template Section */}
      <div className="panel-section">
        <button 
          onClick={() => navigate('/')}
          className="custom-template-button"
        >
          <span className="custom-template-icon">✨</span>
          Create Custom Template
        </button>
      </div>
      
      {/* Styles Section */}
      <div className="panel-section">
        <h2>Choose a Style</h2>
        <div className="style-dropdown-container">
        <button 
          className={`style-dropdown-button ${selectedMagazine ? 'has-selection' : ''}`}
          onClick={() => setIsStyleDropdownOpen(!isStyleDropdownOpen)}
        >
          <span>{selectedMagazine ? selectedMagazine.name : 'Select a style'}</span>
          <span className="dropdown-icon">▼</span>
        </button>
          
          {isStyleDropdownOpen && (
            <div className="style-dropdown-menu">
              {magazines.map(magazine => (
                <button
                  key={magazine.id}
                  onClick={() => {
                    onMagazineSelect(magazine.id);
                    setIsStyleDropdownOpen(false);
                  }}
                  className={`style-dropdown-item ${selectedMagazine && selectedMagazine.id === magazine.id ? 'selected' : ''}`}
                >
                  {magazine.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Templates Section */}
      {selectedMagazine && (
        <div className="panel-section">
          <h2>Available Templates</h2>
          <div className="templates-list">
            {selectedMagazine.templates.map(template => (
              <TemplatePreviewTooltip 
                key={template.id}
                templateName={template.name}
                magazineStyle={selectedMagazine.name}
              >
                <button 
                  onClick={() => handleNewTemplateSelect(template)}
                  className="template-item-button"
                >
                  {/* The button content was missing here */}
                  <span>{template.name}</span>
                </button>
              </TemplatePreviewTooltip>
            ))}
          </div>
        </div>
      )}

      {/* Layout Section */}
      {selectedTemplates.length > 0 && (
        <div className="panel-section">
          <Layout 
            templates={selectedTemplates} 
            onTemplateSelect={handleExistingTemplateSelect} 
          />
          
          {/* Action Buttons */}
          <div className="action-buttons">
            <ExportComponent 
              templates={templates}
              templateRefs={templateRefs}
              onExportStart={onExportStart}
              onExportEnd={onExportEnd}
              className="publish-button"
            />
            
            {user && (
              <>
                <button 
                  onClick={onSaveDraft} 
                  className={`action-button save-draft-button ${isSaving ? 'saving' : ''}`}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save as Draft'}
                </button>
                <button 
                  onClick={onDiscardDraft} 
                  className="action-button discard-draft-button"
                  disabled={isSaving}
                >
                  Discard Draft
                </button>
              </>
            )}
          </div>
          
          {showSaveNotification && (
            <SaveNotification 
              message="Progress saved!" 
              position="in-panel"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default LeftPanel;