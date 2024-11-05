import { React, useState, useCallback, useEffect } from 'react';  // Fixed import
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { useAuth } from '../AuthContext';
import CustomTemplateLeftPanel from './CustomTemplateLeftPanel';
import CustomTemplateRightPanel from './CustomTemplateRightPanel';
import { saveCustomTemplateDraft, loadCustomTemplateDraft } from '../firebase';



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
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const loadDraft = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const draftData = await loadCustomTemplateDraft(user.uid);
        if (draftData) {
          // Set PDF file
          if (draftData.pdfUrl) {
            setPdfFile(draftData.pdfUrl);
          }
          
          // Set elements
          if (draftData.elements) {
            setElements(draftData.elements);
          }
          
          // Set dimensions
          if (draftData.dimensions) {
            setDimensions(draftData.dimensions);
          }
        }
      } catch (err) {
        console.error('Error loading draft:', err);
        setError('Failed to load saved draft');
      } finally {
        setIsLoading(false);
      }
    };

    loadDraft();
  }, [user]);

  const handleUpdateElement = (updatedElement) => {
    setElements(prev => prev.map(elem => 
      elem.id === updatedElement.id ? updatedElement : elem
    ));
    setSelectedElement(updatedElement);
  };

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
      // Upload to Firebase Storage
      const storageRef = ref(
        storage, 
        `users/${user.uid}/customTemplates/draft/template.pdf`
      );
      
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      
      // Set the Firebase URL instead of blob URL
      setPdfFile(downloadUrl);
      
      // Save draft immediately after upload
      await saveCustomTemplateDraft(user.uid, {
        pdfUrl: downloadUrl,
        elements: elements,
        dimensions: dimensions,
        name: 'Custom Template'
      });
      
    } catch (err) {
      console.error('Error uploading PDF:', err);
      setError('Failed to upload PDF');
    } finally {
      setIsLoading(false);
    }
  }, [user, elements, dimensions]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  // Handle interactive element drops
  const handleElementDrop = (e, pageNumber) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('elementType');
    if (!elementType) return;

    // Get position relative to the PDF page
    const pdfPage = e.currentTarget;
    const rect = pdfPage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement = {
      id: Date.now().toString(),
      type: elementType,
      pageNumber,
      x,
      y,
      url: ''
    };

    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
  };

  // Handle element selection
  const handleElementClick = (element, e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  // Handle element dragging
  const handleElementDrag = (e, element) => {
    const pdfPage = e.currentTarget.closest('.pdf-page-container');
    if (!pdfPage) return;

    const rect = pdfPage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    handleUpdateElement({
      ...element,
      x,
      y
    });
  };

  // Clear selection when clicking on PDF
  const handlePDFClick = () => {
    setSelectedElement(null);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfError(null);
    
    // Get dimensions from the first page
  const page = document.querySelector('.react-pdf__Page');
  if (page) {
    setDimensions({
      width: page.clientWidth,
      height: page.clientHeight
    });
  }
};

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setPdfError('Failed to load PDF document. Please try uploading again.');
  };

  const handleSaveDraft = async () => {
    if (!user || !pdfFile) return;
  
    setIsLoading(true);
    try {
      await saveCustomTemplateDraft(user.uid, {
        pdfUrl: pdfFile, // This will now be the Firebase Storage URL
        elements,
        dimensions,
        name: 'Custom Template'
      });
      // Optional: Add success notification
    } catch (err) {
      console.error('Error saving draft:', err);
      setError('Failed to save draft');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadDraft = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const draftData = await loadCustomTemplateDraft(user.uid);
        if (draftData) {
          // Set PDF file from Firebase Storage URL
          if (draftData.pdfUrl) {
            setPdfFile(draftData.pdfUrl);
          }
          
          // Set elements
          if (draftData.elements) {
            setElements(draftData.elements);
          }
          
          // Set dimensions
          if (draftData.dimensions) {
            setDimensions(draftData.dimensions);
          }
        }
      } catch (err) {
        console.error('Error loading draft:', err);
        setError('Failed to load saved draft');
      } finally {
        setIsLoading(false);
      }
    };

    loadDraft();
  }, [user]);

  return (
    <div className="App">
      <CustomTemplateLeftPanel 
      onSaveDraft={handleSaveDraft}
      isLoading={isLoading}
      elements={elements}  // Add this
      pdfFile={pdfFile}   // Add this
      dimensions={dimensions}  // Add this
      />
      
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
              className="pdf-dropzone"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the PDF file here...</p>
              ) : (
                <p>Drag and drop a PDF file here, or click to select one</p>
              )}
              {error && (
                <p className="error-message">{error}</p>
              )}
            </div>
          ) : (
            <div className="pdf-viewer">
              <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<div className="text-center py-4">Loading PDF...</div>}
              >
                {pdfError ? (
                  <div className="error-message">{pdfError}</div>
                ) : (
                  Array.from(new Array(numPages), (el, index) => (
                    <div 
                      key={`page_${index + 1}`} 
                      className="pdf-page-container"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleElementDrop(e, index + 1)}
                      onClick={handlePDFClick}
                    >
                      <Page
                        pageNumber={index + 1}
                        width={700}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                      {/* Render interactive elements */}
                      {elements
                        .filter(elem => elem.pageNumber === index + 1)
                        .map(elem => (
                          <div
                            key={elem.id}
                            className={`interactive-element ${selectedElement?.id === elem.id ? 'selected' : ''}`}
                            style={{
                              left: elem.x,
                              top: elem.y,
                              position: 'absolute',
                              cursor: 'move'
                            }}
                            onClick={(e) => handleElementClick(elem, e)}
                            draggable
                            onDragEnd={(e) => handleElementDrag(e, elem)}
                          >
                            <img 
                              src={`/images/${elem.type}_logo.png`}
                              alt={elem.type}
                              style={{
                                width: '32px',
                                height: '32px',
                                pointerEvents: 'none'
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  ))
                )}
              </Document>
            </div>
          )}
        </div>
      </div>

      <CustomTemplateRightPanel 
        selectedElement={selectedElement}
        onUpdateElement={handleUpdateElement}
      />
    </div>
  );
};

export default CustomTemplateEditor;