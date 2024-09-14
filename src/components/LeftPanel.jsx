import React from 'react';

function LeftPanel({ magazines, onMagazineSelect, selectedMagazine, onTemplateSelect }) {
  return (
    <div className="LeftPanel">
      <h2>Magazine Styles</h2>
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
        <>
          <h2>Available Templates</h2>
          {selectedMagazine.templates.map(template => (
            <button 
              key={template.id} 
              onClick={() => onTemplateSelect(template)}
            >
              {template.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
}

export default LeftPanel;