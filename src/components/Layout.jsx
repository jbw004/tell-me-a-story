import React from 'react';

function Layout({ templates, onTemplateSelect }) {
  return (
    <div className="layout-section">
      <h2>Layout</h2>
      <ul className="template-list">
        {templates.map((template, index) => (
          <li key={template.uniqueId} className="template-item">
            <button onClick={() => onTemplateSelect(template)}>
              {index + 1}. {template.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Layout;