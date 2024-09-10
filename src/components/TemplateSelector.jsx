import React from 'react';

const templates = [
  { id: 1, name: 'Template 1' },
  { id: 2, name: 'Template 2' },
  { id: 3, name: 'Template 3' },
];

function TemplateSelector({ onSelect }) {
  return (
    <div>
      <h2>Select a Template</h2>
      {templates.map(template => (
        <button key={template.id} onClick={() => onSelect(template)}>
          {template.name}
        </button>
      ))}
    </div>
  );
}

export default TemplateSelector;