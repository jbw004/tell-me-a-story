import React from 'react';

function TemplateSelector({ magazines, onSelect }) {
  return (
    <div>
      <h2>Select a Magazine Style</h2>
      {magazines.map(magazine => (
        <button key={magazine.id} onClick={() => onSelect(magazine.id)}>
          {magazine.name}
        </button>
      ))}
    </div>
  );
}

export default TemplateSelector;