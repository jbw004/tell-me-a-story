import React, { useState, useEffect } from 'react';
import logo from '/tellmeastory_clean_vector_logo.png'; // Adjust the path as needed

const Header = () => (
  <header style={{
    width: '100%',
    height: '29px',
    backgroundColor: 'rgba(250, 249, 246, 0.95)',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
  }}>
    <a 
      href="https://tellmeastory.press" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ height: '100%', display: 'flex', alignItems: 'center' }}
    >
      <img 
        src={logo} 
        alt="Tellmeastory.press" 
        style={{ height: '100%', width: 'auto' }} 
      />
    </a>
  </header>
);

const ExportedMagazineView = ({ templates, onViewFull, showFull, onDelete, isOwner }) => {
  const [loadedTemplates, setLoadedTemplates] = useState([]);

  useEffect(() => {
    const loadContent = async () => {
      const loaded = await Promise.all(templates.map(async (template) => {
        if (template.contentUrl) {
          try {
            const response = await fetch(`/firebase-storage${new URL(template.contentUrl).pathname}${new URL(template.contentUrl).search}`, {
              mode: 'cors',
              headers: {
                'Origin': window.location.origin
              }
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            return { ...template, content };
          } catch (error) {
            console.error("Error fetching template content:", error);
            return { ...template, content: "Failed to load content" };
          }
        }
        return template;
      }));
      setLoadedTemplates(loaded);
    };

    loadContent();
  }, [templates]);

  console.log("ExportedMagazineView render. showFull:", showFull);
  console.log("Received templates:", templates);

  if (!loadedTemplates || loadedTemplates.length === 0) {
    console.error("No templates provided to ExportedMagazineView");
    return <div>No magazine content available.</div>;
  }
  
  const coverTemplate = loadedTemplates[0];
  console.log("Cover template:", coverTemplate);

  const DeleteButton = () => (
    isOwner && (
      <button 
        onClick={onDelete}
        style={{
          position: 'absolute',
          top: '20px',
          right: showFull ? '80px' : '20px',
          zIndex: 1000,
          background: 'red',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    )
  );
  
  const CoverCard = () => (
    <div 
      className="cover-card"
      onClick={onViewFull}
      style={{
        width: '375px',
        height: '812px',
        margin: '0',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Header />
      <div 
        dangerouslySetInnerHTML={{ __html: coverTemplate.content }} 
        style={{ width: '100%', height: '100%' }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '229px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        Click to view full magazine
      </div>
      <DeleteButton />
    </div>
  );

  const FullMagazine = () => (
    <div className="full-magazine" style={{ padding: '0', maxHeight: '100vh', overflowY: 'auto' }}>
      <Header />
      <button 
        onClick={onViewFull}
        style={{
          position: 'fixed',
          top: '49px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        Close
      </button>
      <DeleteButton />
      {loadedTemplates.map((template, index) => (
        <div 
          key={index}
          className="magazine-page"
          style={{
            width: '375px',
            margin: '20px auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <div 
            dangerouslySetInnerHTML={{ __html: template.content }}
            style={{ width: '100%' }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="exported-magazine-view" style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0, margin: 0 }}>
      {showFull ? <FullMagazine /> : <CoverCard />}
    </div>
  );
};

export default ExportedMagazineView;