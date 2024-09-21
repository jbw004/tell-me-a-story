import React, { useState } from 'react';

const ExportComponent = ({ templates, templateRefs }) => {
  const [exporting, setExporting] = useState(false);

  const exportTemplates = () => {
    setExporting(true);

    // Create a new document for the export view
    const exportDoc = document.implementation.createHTMLDocument('Export View');

    // Add necessary styles to the new document
    const style = exportDoc.createElement('style');
    style.textContent = `
      body { 
        background-color: #FAF9F6; 
        display: flex;
        justify-content: center;
        padding: 20px;
        margin: 0;
        font-family: Arial, sans-serif;
      }
      .export-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }
      .template {
        background-color: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
        margin: 0;
      }
      @media print {
        body {
          background-color: white;
        }
        .export-container {
          gap: 0;
        }
        .template {
          box-shadow: none;
          border-bottom: 1px solid #ccc;
          page-break-inside: avoid;
        }
        .template:last-child {
          border-bottom: none;
        }
      }
    `;
    exportDoc.head.appendChild(style);

    // Create a container for the templates
    const container = exportDoc.createElement('div');
    container.className = 'export-container';
    exportDoc.body.appendChild(container);

    // Clone and append each template to the new document
    templates.forEach((template) => {
      const templateElement = templateRefs.current[template.uniqueId];
      if (templateElement) {
        const clonedTemplate = templateElement.cloneNode(true);
        
        // Remove the canvas controls
        const canvasControls = clonedTemplate.querySelector('.canvas-controls');
        if (canvasControls) {
          canvasControls.remove();
        }

        clonedTemplate.className = 'template';
        container.appendChild(clonedTemplate);
      }
    });

    // Open the new document in a new tab
    const newTab = window.open();
    newTab.document.write(exportDoc.documentElement.outerHTML);
    newTab.document.close();

    setExporting(false);
  };

  return (
    <div className="export-container">
      <button
        onClick={exportTemplates}
        disabled={exporting}
        className={`export-button ${exporting ? 'exporting' : ''}`}
      >
        {exporting ? 'Exporting...' : 'Export Templates'}
      </button>
    </div>
  );
};

export default ExportComponent;