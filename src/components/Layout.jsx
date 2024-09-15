import React from 'react';

function Layout({ templates, onTemplateSelect }) {
  return (
    <div className="layout-section">
      <h3>Layout</h3>
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