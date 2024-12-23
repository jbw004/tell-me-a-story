import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref as dbRef, push, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadString, uploadBytes, getDownloadURL } from 'firebase/storage';
import { runTransaction, serverTimestamp } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../AuthContext';
import { Oval } from 'react-loader-spinner';
import MagazineMetadataModal from './MagazineMetadataModal';
import { auth } from '../firebase'; // Make sure this path is correct



const ExportComponent = ({ templates, templateRefs, isEditing, editedMagazineId }) => {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, login, loading } = useAuth();
  const [showMetadataModal, setShowMetadataModal] = useState(false);

  const saveMagazine = async (userId, magazineData) => {
    const db = getDatabase();
    const newMagazineRef = push(dbRef(db, `users/${userId}/magazines`));
    
    try {
      await runTransaction(newMagazineRef, (currentData) => {
        if (currentData === null) {
          return {
            ...magazineData,
            title: magazineData.title || 'My Magazine',
            previewImageUrl: magazineData.previewImageUrl,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
        } else {
          console.warn("Magazine already exists, not overwriting");
          return;
        }
      });
      return newMagazineRef.key;
    } catch (error) {
      console.error("Error saving magazine:", error);
      throw new Error("Failed to save magazine. Please try again.");
    }
  };

  const handlePublishClick = async () => {
    console.log('Publish clicked'); // Add this log
    if (!user) {
      try {
        await login();
      } catch (error) {
        setError("Login failed. Please try again.");
        console.error("Login failed", error);
        return;
      }
    }
    
    console.log('Setting modal to true'); // Add this log
    setShowMetadataModal(true);
  };

  const handleMetadataSave = async (metadata) => {
    if (!user) {
      try {
        await login();
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
        
        // Remove all control elements
        const controlsToRemove = [
          '.canvas-controls',
          '.reorder-controls',
          '.add-toc-item-button',  // Add this
          '.remove-toc-item-button', // Add this
          '[data-toc-control]'  // Add this if you use this attribute
        ];
    
        controlsToRemove.forEach(selector => {
          const elements = clonedTemplate.querySelectorAll(selector);
          elements.forEach(el => el.remove());
        });
    
        // Special handling for table of contents
        if (template.id === 'contents-mobile') {
          // Remove any TOC-specific controls
          const tocControls = clonedTemplate.querySelectorAll('.toc-controls, .toc-item button');
          tocControls.forEach(el => el.remove());
    
          // Make TOC items static
          const tocItems = clonedTemplate.querySelectorAll('.toc-item');
          tocItems.forEach(item => {
            item.removeAttribute('contenteditable');
            item.removeAttribute('data-deletable');
            item.style.cursor = 'default';
          });
        }
    
        // Make all content non-editable
        clonedTemplate.querySelectorAll('*').forEach(element => {
          element.contentEditable = 'false';
          element.removeAttribute('data-text-id');
          element.removeAttribute('data-deletable');
          element.removeAttribute('data-object-id');
          // Remove any interactive classes
          element.classList.remove('editable', 'deletable', 'selected');
        });
    
        return {
          ...template,
          content: clonedTemplate.innerHTML
        };
      }
      return template;
    });
  

    // Add a script to define and render our React component
    // Add a script to define and render our React component
const appScript = exportDoc.createElement('script');
appScript.textContent = `
  const ExportedMagazineView = ({ templates }) => {
    const [showFullMagazine, setShowFullMagazine] = React.useState(false);
  
    const coverTemplate = templates[0];
  
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
        React.createElement('div', { 
          className: 'exported-view',
          dangerouslySetInnerHTML: { __html: coverTemplate.content.replace(/data-[^\\s>]+="[^"]*"/g, '') }
        }),
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
            className: "template exported-view",
            dangerouslySetInnerHTML: { 
              __html: template.content.replace(/data-[^\\s>]+="[^"]*"/g, '')
            }
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
      let magazineId;
      let previewImageUrl = null;
    
      // Add this section to handle preview image
      if (metadata.previewImage) {
        const imageRef = storageRef(storage, `users/${user.uid}/magazines/${isEditing ? editedMagazineId : 'temp'}/preview.jpg`);
        await uploadBytes(imageRef, metadata.previewImage); // Use uploadBytes instead of uploadString
        previewImageUrl = await getDownloadURL(imageRef);
      }
    
      if (isEditing) {
        // If editing, use the existing magazine ID
        magazineId = editedMagazineId;
        // Update the existing magazine instead of creating a new one
        await set(dbRef(db, `users/${user.uid}/magazines/${magazineId}`), {
          title: metadata.title, // Use metadata title instead of "My Magazine"
          previewImageUrl, // Add the preview image URL
          updatedAt: serverTimestamp(),
          userId: user.uid
        });
      } else {
        // If creating a new magazine, generate a new ID
        magazineId = await saveMagazine(user.uid, {
          title: metadata.title, // Use metadata title instead of "My Magazine"
          previewImageUrl, // Add the preview image URL
          userId: user.uid
        });
      }
    
      // Save each template separately
      for (let i = 0; i < processedTemplates.length; i++) {
        const template = processedTemplates[i];
        const templateRef = dbRef(db, `users/${user.uid}/magazines/${magazineId}/templates/${i}`);
        
        // Upload content to Cloud Storage
        const contentRef = storageRef(storage, `users/${user.uid}/magazines/${magazineId}/templates/${i}/content`);
        await uploadString(contentRef, template.content, 'raw');
        const contentUrl = await getDownloadURL(contentRef);
      
        // Save template metadata, content URL, and HTML to Realtime Database
        await set(templateRef, {
          ...template,
          content: null,  // Keep this to avoid storing HTML in the main database
          contentUrl: contentUrl,
          htmlContent: template.content // Store the HTML content for future editing
        });
      }
    
      const magazineUrl = `/magazine/${user.uid}/${magazineId}`;
      window.open(magazineUrl, '_blank');
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Error saving magazine to Firebase:", error);
      setError("Failed to save magazine. Please try again.");
    }

    setExporting(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="export-container">
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <button
        onClick={handlePublishClick} // Change this line
        disabled={exporting || !user}
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
          user ? 'Publish' : 'Login to Publish'
        )}
      </button>
      <MagazineMetadataModal
      isOpen={showMetadataModal}
      onClose={() => setShowMetadataModal(false)}
      onSave={handleMetadataSave}
      initialTitle="My Magazine"
      showPreviewImageOption={true}
    />
    </div>
  );
};

export default ExportComponent;