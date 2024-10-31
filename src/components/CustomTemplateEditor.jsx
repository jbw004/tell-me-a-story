// At the top of CustomTemplateEditor.jsx, update the imports and worker configuration
import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { useAuth } from '../AuthContext';

// Important: Set worker here
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const CustomTemplateEditor = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    // Validate file size (15MB limit)
    if (file.size > 15 * 1024 * 1024) {
      setError('File size must be less than 15MB');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create a temporary URL for preview
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

  const changePage = (offset) => {
    setCurrentPage(prevPage => {
      const newPage = prevPage + offset;
      return Math.min(Math.max(1, newPage), numPages);
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
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
        <div>
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div>Loading PDF...</div>}
          >
            {pdfError ? (
              <div className="text-red-500 text-center py-4">{pdfError}</div>
            ) : (
              <Page 
                pageNumber={currentPage} 
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="mx-auto"
              />
            )}
          </Document>
          
          {numPages > 1 && !pdfError && (
            <div className="flex justify-center gap-4 mt-4">
              <button 
                onClick={() => changePage(-1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="py-2">
                Page {currentPage} of {numPages}
              </span>
              <button 
                onClick={() => changePage(1)}
                disabled={currentPage >= numPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomTemplateEditor;