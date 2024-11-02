import React, { useState, useEffect } from 'react';
import logo from '/tellmeastory_clean_vector_logo.png';
import { Oval } from 'react-loader-spinner';

const Header = () => (
  <header style={{
    width: '100%',
    height: '29px',
    backgroundColor: 'rgba(250, 249, 246, 0.95)',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
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

const ExportedMagazineView = ({ templates, onDelete, onEdit, isOwner }) => {
  const [loadedTemplates, setLoadedTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      const loaded = await Promise.all(templates.map(async (template) => {
        if (template.contentUrl) {
          try {
            const response = await fetch(template.contentUrl, {
              mode: 'cors',
              credentials: 'omit',
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
      setIsLoading(false);
    };

    loadContent();
  }, [templates]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%'
      }}>
        <Oval
          height={80}
          width={80}
          color="#6200ee"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#3700b3"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (!loadedTemplates || loadedTemplates.length === 0) {
    return <div>No magazine content available.</div>;
  }

  const DeleteButton = () => (
    isOwner && (
      <button 
        onClick={onDelete}
        style={{
          position: 'fixed',
          top: '49px',
          right: '80px',
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

  const EditButton = () => (
    isOwner && onEdit && (
      <button 
        onClick={onEdit}
        style={{
          position: 'fixed',
          top: '49px',
          right: '140px',
          zIndex: 1000,
          background: 'blue',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Edit
      </button>
    )
  );

  return (
    <div className="exported-magazine-view" style={{ 
      height: '100%', 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 0, 
      margin: 0 
    }}>
      <div className="full-magazine" style={{ 
        padding: '0', 
        maxHeight: '100vh', 
        overflowY: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Header />
        <DeleteButton />
        <EditButton />
        {loadedTemplates.map((template, index) => (
          <div 
            key={index}
            className="magazine-page"
            style={{
              width: '375px',
              margin: '16px auto',
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
    </div>
  );
};

export default ExportedMagazineView;