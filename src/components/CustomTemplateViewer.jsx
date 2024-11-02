import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { Oval } from 'react-loader-spinner';
import { useAuth } from '../AuthContext';
import { 
  loadPublishedCustomTemplate, 
  deletePublishedCustomTemplate, 
  moveCustomTemplateToDraft 
} from '../firebase';
import ConfirmationModal from './ConfirmationModal';
import logo from '/tellmeastory_clean_vector_logo.png';

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

const CustomTemplateViewer = () => {
  const [template, setTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const navigate = useNavigate();
  const { userId, templateId } = useParams();
  const { user } = useAuth();

  const isOwner = user && user.uid === userId;

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!userId || !templateId) {
        setError("Invalid URL");
        setIsLoading(false);
        return;
      }

      try {
        const templateData = await loadPublishedCustomTemplate(userId, templateId);
        
        if (!templateData) {
          setError("Template not found");
          setIsLoading(false);
          return;
        }

        // Ensure elements exists with a default empty array
        setTemplate({
          ...templateData,
          elements: templateData.elements || []
        });
      } catch (err) {
        console.error("Error fetching template:", err);
        setError("Failed to load template");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplate();
  }, [userId, templateId]);

  const handleDelete = async () => {
    if (!isOwner) return;

    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await deletePublishedCustomTemplate(userId, templateId);
        navigate('/dashboard');
      } catch (error) {
        console.error("Error deleting template:", error);
        setError("Failed to delete template");
      }
    }
  };

  const handleEdit = () => {
    setShowEditConfirmation(true);
  };

  const confirmEdit = async () => {
    try {
      await moveCustomTemplateToDraft(userId, templateId);
      navigate('/custom-template', { 
        state: { fromEdit: true, editedTemplateId: templateId } 
      });
    } catch (error) {
      console.error("Error moving template to draft:", error);
      setError("Failed to edit template");
    }
    setShowEditConfirmation(false);
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-xl text-gray-700 mb-4">{error}</div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-500 hover:text-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (!template) return null;

  return (
    <div className="exported-magazine-view" style={{ 
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 0,
      margin: 0,
      backgroundColor: '#faf9f6'
    }}>
      <Header />
      
      {isOwner && (
        <div style={{
          position: 'fixed',
          top: '49px',
          right: '20px',
          display: 'flex',
          gap: '10px',
          zIndex: 1000
        }}>
          <button 
            onClick={handleEdit}
            className="edit-button"
            style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className="delete-button"
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      )}

<div className="main-content">
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100%',
    width: '100%',
    padding: '20px 0'
  }}>
    <div className="pdf-viewer">
      <Document
        file={template.pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <Oval height={40} width={40} color="#4fa94d" />
          </div>
        }
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div 
            key={`page_${index + 1}`} 
            className="pdf-page-container"
            style={{
              position: 'relative',
              margin: '20px 0',
            }}
          >
            <Page
              pageNumber={index + 1}
              width={700}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
            {template.elements
              ?.filter(elem => elem.pageNumber === index + 1)
              .map(elem => (
                  <a
                  key={elem.id}
                  href={elem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'absolute',
                    left: elem.x,
                    top: elem.y,
                    cursor: 'pointer'
                  }}
                >
                  <img 
                    src={`/images/${elem.type}_logo.png`}
                    alt={elem.type}
                    style={{
                      width: '32px',
                      height: '32px'
                    }}
                  />
                </a>
              ))}
          </div>
        ))}
      </Document>
    </div>
  </div>
  </div>

  <ConfirmationModal
    isOpen={showEditConfirmation}
    onClose={() => setShowEditConfirmation(false)}
    onConfirm={confirmEdit}
    message="Editing this template will move it to 'draft', overriding any existing draft. Would you like to proceed?"
  />
    </div>
  );
};

export default CustomTemplateViewer;