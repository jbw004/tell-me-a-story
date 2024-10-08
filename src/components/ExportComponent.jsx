import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref as dbRef, push, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../AuthContext';
import { Oval } from 'react-loader-spinner';

const ExportComponent = ({ templates, templateRefs }) => {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const exportTemplates = async () => {
    if (!user) {
      try {
        await login();
        if (!user) {
          setError("Login failed. Please try again.");
          return;
        }
      } catch (error) {
        setError("Login failed. Please try again.");
        console.error("Login failed", error);
        return;
      }
    }
  
    setExporting(true);
    setError(null);
  

    // Create a new document for the export view
    const exportDoc = document.implementation.createHTMLDocument('Export View');

    // Add necessary styles to the new document
    const style = exportDoc.createElement('style');
    style.textContent = `
      body { 
        background-color: #f0f0f0; 
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
      }
      .export-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 20px;
      }
      .template {
        background-color: white;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
        margin: 0;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
      }
      .template * {
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
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

    // Create a container for the React app
    const container = exportDoc.createElement('div');
    container.id = 'root';
    exportDoc.body.appendChild(container);

    // Add React and ReactDOM scripts
    const reactScript = exportDoc.createElement('script');
    reactScript.src = 'https://unpkg.com/react@17/umd/react.production.min.js';
    reactScript.defer = true;
    const reactDOMScript = exportDoc.createElement('script');
    reactDOMScript.src = 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js';
    reactDOMScript.defer = true;
    exportDoc.head.appendChild(reactScript);
    exportDoc.head.appendChild(reactDOMScript);

    // Process templates
  const processedTemplates = templates.map((template) => {
    const templateElement = templateRefs.current[template.uniqueId];
    if (templateElement) {
      const clonedTemplate = templateElement.cloneNode(true);
      
      // Remove the canvas controls
      const canvasControls = clonedTemplate.querySelector('.canvas-controls');
      if (canvasControls) {
        canvasControls.remove();
      }

      // Make all content non-editable
      clonedTemplate.querySelectorAll('*').forEach(element => {
        element.contentEditable = 'false';
        element.removeAttribute('data-text-id');
        element.removeAttribute('data-deletable');
      });

      return {
        ...template,
        content: clonedTemplate.innerHTML // Store only the inner HTML
      };
    }
    return template;
  });
  

    // Add a script to define and render our React component
    const appScript = exportDoc.createElement('script');
    appScript.textContent = `
      const ExportedMagazineView = ({ templates }) => {
        const [showFullMagazine, setShowFullMagazine] = React.useState(false);
      
        const coverTemplate = templates[0]; // Assuming the first template is always the cover
      
        const CoverCard = () => (
          React.createElement('div', {
            className: "cover-card",
            onClick: () => setShowFullMagazine(true),
            style: {
              width: '375px',
              height: '812px',
              margin: '20px auto',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              position: 'relative',
            }
          },
            React.createElement('div', { dangerouslySetInnerHTML: { __html: coverTemplate.content } }),
            React.createElement('div', {
              style: {
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
              }
            }, "Click to view full magazine")
          )
        );
      
        const FullMagazine = () => (
          React.createElement('div', { className: "export-container" },
            React.createElement('button', {
              onClick: () => setShowFullMagazine(false),
              style: {
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000,
              }
            }, "Close"),
            templates.map((template, index) => (
              React.createElement('div', {
                key: index,
                className: "template",
                dangerouslySetInnerHTML: { __html: template.content }
              })
            ))
          )
        );
      
        return React.createElement('div', { className: "exported-magazine-view" },
          showFullMagazine ? React.createElement(FullMagazine) : React.createElement(CoverCard)
        );
      };

      const templates = ${JSON.stringify(processedTemplates)};
      window.addEventListener('load', function() {
        ReactDOM.render(
          React.createElement(ExportedMagazineView, { templates: templates }),
          document.getElementById('root')
        );
      });
    `;
    exportDoc.body.appendChild(appScript);

    // Generate a unique ID for the magazine
    const db = getDatabase();
    const storage = getStorage();
    const magazinesRef = dbRef(db, `users/${user.uid}/magazines`);

    try {
      const newMagazineRef = push(dbRef(db, `users/${user.uid}/magazines`));
      
      // Save magazine metadata
      await set(newMagazineRef, {
        title: "My Magazine",
        createdAt: new Date().toISOString(),
        userId: user.uid
      });

      // Save each template separately
      for (let i = 0; i < processedTemplates.length; i++) {
        const template = processedTemplates[i];
        const templateRef = dbRef(db, `users/${user.uid}/magazines/${newMagazineRef.key}/templates/${i}`);
        
        // Upload content to Cloud Storage
        const contentRef = storageRef(storage, `users/${user.uid}/magazines/${newMagazineRef.key}/templates/${i}/content`);
        await uploadString(contentRef, template.content, 'raw');
        const contentUrl = await getDownloadURL(contentRef);

        // Save template metadata and content URL to Realtime Database
        await set(templateRef, {
          ...template,
          content: null,
          contentUrl: contentUrl
        });
      }

      const galleryUrl = `/gallery/${user.uid}/${newMagazineRef.key}`;
      window.open(galleryUrl, '_blank');
    } catch (error) {
      console.error("Error saving magazine to Firebase:", error);
      // You might want to show an error message to the user here
    }

    try {
      // ... Firebase saving logic ...

      const galleryUrl = `/gallery/${user.uid}/${newMagazineRef.key}`;
      window.open(galleryUrl, '_blank');
    } catch (error) {
      console.error("Error saving magazine to Firebase:", error);
      setError("Failed to save magazine. Please try again.");
    }

    setExporting(false);
  };
  

  return (
    <div className="export-container">
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <button
        onClick={exportTemplates}
        disabled={exporting}
        className={`export-button ${exporting ? 'exporting' : ''}`}
      >
        {exporting ? (
          <Oval
            height={20}
            width={20}
            color="#ffffff"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : (
          'Publish to Gallery'
        )}
      </button>
    </div>
  );
};

export default ExportComponent;