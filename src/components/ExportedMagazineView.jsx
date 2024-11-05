import React, { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom'; // Add this import


const ExportedMagazineView = ({ templates, onDelete, onEdit, isOwner }) => {
  const navigate = useNavigate(); // Add this hook
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
      {isOwner && (
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Dashboard
        </button>
      )}
      <div className="full-magazine" style={{ 
        padding: '0', 
        maxHeight: '100vh', 
        overflowY: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
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