import React from 'react';

const CustomTemplateRightPanel = ({ selectedElement, onUpdateElement }) => {
  return (
    <div className="floating-panel right-panel">
      <h2 className="panel-header">Properties</h2>
      
      {selectedElement ? (
        <div className="panel-section">
          <div className="property-group">
            <h3 className="section-header">Link Settings</h3>
            <label>
              URL
              <input 
                type="url" 
                value={selectedElement.url || ''} 
                onChange={(e) => onUpdateElement({
                  ...selectedElement,
                  url: e.target.value
                })}
                placeholder="Enter link URL..."
                className="property-input"
              />
            </label>
            
            {/* Optional: Position settings */}
            <h3 className="section-header">Position</h3>
            <div className="position-group">
              <label>
                X
                <input 
                  type="number" 
                  value={Math.round(selectedElement.x) || 0}
                  onChange={(e) => onUpdateElement({
                    ...selectedElement,
                    x: Number(e.target.value)
                  })}
                  className="property-input"
                />
              </label>
              <label>
                Y
                <input 
                  type="number" 
                  value={Math.round(selectedElement.y) || 0}
                  onChange={(e) => onUpdateElement({
                    ...selectedElement,
                    x: Number(e.target.value)
                  })}
                  className="property-input"
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="panel-section">
          <p className="empty-state-message">
            Select an element to edit its properties
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomTemplateRightPanel;