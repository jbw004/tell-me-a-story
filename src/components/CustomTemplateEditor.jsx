import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { useAuth } from '../AuthContext';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const LeftPanel = () => {
  return (
    <div className="LeftPanel">
      <h2>Tools</h2>
      <div className="tool-section">
        <h3>Interactive Elements</h3>
        <button className="tool-button">Add Instagram Link</button>
        <button className="tool-button">Add Spotify Link</button>
        <button className="tool-button">Add Donation Link</button>
      </div>
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className="floating-panel right-panel">
      <h2>Properties</h2>
      <div className="property-group">
        <label>URL</label>
        <input type="text" placeholder="Enter link URL..." />
      </div>
    </div>
  );
};

const CustomTemplateEditor = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfError, setPdfError] = useState(null);
  const { user } = useAuth();

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!user) {
      setError('Please log in to upload PDFs');
      return;
    }

    const file = acceptedFiles[0];
    setPdfError(null);
    
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError('File size must be less than 15MB');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
      
      const templateId = Date.now().toString();
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      
      const storageRef = ref(
        storage, 
        `users/${user.uid}/custom-templates/${templateId}/${cleanFileName}`
      );
      
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      console.log('PDF uploaded:', downloadUrl);
      
    } catch (err) {
      console.error('Error uploading PDF:', err);
      setError('Failed to upload PDF');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setPdfError('Failed to load PDF document. Please try uploading again.');
  };

  return (
    <div className="App">
      <LeftPanel />
      
      <div className="main-content">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: '100%',
          width: '100%',
          padding: '20px 0'
        }}>
          {isLoading ? (
            <div className="text-center py-4">Uploading PDF...</div>
          ) : !pdfFile ? (
            <div 
              {...getRootProps()} 
              style={{
                width: '700px',
                border: '2px dashed #cccccc',
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#6200ee'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#cccccc'}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the PDF file here...</p>
              ) : (
                <p>Drag and drop a PDF file here, or click to select one</p>
              )}
              {error && (
                <p style={{ color: '#ff0000', marginTop: '0.5rem' }}>{error}</p>
              )}
            </div>
          ) : (
            <div style={{
              width: '700px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<div className="text-center py-4">Loading PDF...</div>}
              >
                {pdfError ? (
                  <div style={{ color: '#ff0000', textAlign: 'center', padding: '1rem 0' }}>
                    {pdfError}
                  </div>
                ) : (
                  Array.from(new Array(numPages), (el, index) => (
                    <div 
                      key={`page_${index + 1}`} 
                      style={{
                        marginBottom: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}>
                        <Page
                          pageNumber={index + 1}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          width={700}
                        />
                      </div>
                      <div style={{
                        marginTop: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        Page {index + 1} of {numPages}
                      </div>
                    </div>
                  ))
                )}
              </Document>
            </div>
          )}
        </div>
      </div>

      <RightPanel />
    </div>
  );
};

export default CustomTemplateEditor;