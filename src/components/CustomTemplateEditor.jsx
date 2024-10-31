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
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  const scrollContainerStyle = {
    flex: 1,
    overflow: 'auto',
    padding: '1rem'
  };

  const pageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto'
  };

  return (
    <div style={containerStyle}>
      <div style={scrollContainerStyle}>
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
          <div style={pageContainerStyle}>
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
                    style={{ marginBottom: '2rem' }}
                  >
                    <Page
                      pageNumber={index + 1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={700}
                    />
                    <div className="text-center text-sm text-gray-500 mt-2">
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
  );
};

export default CustomTemplateEditor;