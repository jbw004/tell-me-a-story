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

// New components for the panels
const LeftPanel = () => {
  return (
    <div className="LeftPanel">
      <h2>Tools</h2>
      {/* We'll add specific controls for custom templates here */}
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
      {/* We'll add properties for selected interactive elements here */}
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

  // Use inline styles for critical layout properties to ensure they're applied
  const containerStyle = {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    position: 'relative',
    paddingTop: '29px' // Match EditorPage padding
  };

  const mainContentStyle = {
    flex: 1,
    marginLeft: '290px',  // Match LeftPanel width + padding
    marginRight: '290px', // Match RightPanel width + padding
    overflow: 'auto',
    padding: '20px',
    display: 'flex',  // Add this
    justifyContent: 'center'  // Add this
  };

  return (
    <div style={containerStyle}>
      <LeftPanel />
      
      <div style={mainContentStyle}>
        {isLoading && <div className="text-center py-4">Uploading PDF...</div>}
        {!pdfFile ? (
          <div 
            {...getRootProps()} 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the PDF file here...</p>
            ) : (
              <p>Drag and drop a PDF file here, or click to select one</p>
            )}
            {error && (
              <p className="text-red-500 mt-2">{error}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full max-w-[700px]">
            <Document
              file={pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<div className="text-center py-4">Loading PDF...</div>}
            >
              {pdfError ? (
                <div className="text-red-500 text-center py-4">{pdfError}</div>
              ) : (
                Array.from(new Array(numPages), (el, index) => (
                  <div 
                    key={`page_${index + 1}`} 
                    style={{ 
                      marginBottom: '2rem',
                      display: 'flex',
                      flexDirection: 'column', // Change to column to stack page and number
                      alignItems: 'center'     // Center both page and number
                    }}
                  >
                    <Page
                      pageNumber={index + 1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={700}
                    />
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

      <RightPanel />
    </div>
  );
};

export default CustomTemplateEditor;